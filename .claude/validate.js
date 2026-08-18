const fs = require('fs');
const path = require('path');
const vm = require('vm');

const dir = path.join(__dirname, '..', 'h5', 'js');
const chaptersDir = path.join(dir, 'chapters');

const sandbox = { console };
sandbox.window = sandbox;
sandbox.globalThis = sandbox;
sandbox.global = sandbox;
vm.createContext(sandbox);

// 加载 core.js
try {
  vm.runInContext(fs.readFileSync(path.join(dir, 'core.js'), 'utf8'), sandbox, { filename: 'core.js' });
} catch (e) {
  console.log('core.js 加载失败:', e.message);
  process.exit(1);
}

// 加载所有章节文件
const files = fs.readdirSync(chaptersDir).filter(f => /^ch\d+\.js$/.test(f)).sort((a, b) => {
  const na = parseInt(a.match(/\d+/)[0]), nb = parseInt(b.match(/\d+/)[0]);
  return na - nb;
});
let loadErr = 0;
for (const f of files) {
  try {
    vm.runInContext(fs.readFileSync(path.join(chaptersDir, f), 'utf8'), sandbox, { filename: f });
  } catch (e) {
    loadErr++;
    console.log('加载失败', f, ':', e.message);
  }
}

const chapters = sandbox.__chapters || [];
console.log('章节数 =', chapters.length, '（应为 53）');
console.log('加载失败文件数 =', loadErr);

const ids = chapters.map(c => c.id);
const dup = ids.filter((v, i) => ids.indexOf(v) !== i);
console.log('重复 id:', dup.length ? dup.join(',') : '无');

let totalFigs = 0, echartsCount = 0, totalDef = 0, defNoFig = 0, echartsErr = 0;
const vols = new Set();
const missing = [];
for (const c of chapters) {
  if (!c.id || !c.vol || !c.title || !c.source) missing.push(c.id || '(无id)');
  vols.add(c.vol);
  totalFigs += (c.figures || []).length;
  for (const s of (c.sections || [])) {
    if (s.type === 'definition') {
      for (const it of (s.items || [])) {
        totalDef++;
        if (!it.fig) { defNoFig++; console.log('缺 fig:', c.id, '→', it.term); }
      }
    }
  }
  for (const f of (c.figures || [])) {
    if (f.kind === 'echarts' && typeof f.option === 'function') {
      echartsCount++;
      try { f.option(); } catch (e) { echartsErr++; console.log('option 异常:', c.id, '→', e.message); }
    }
  }
}
console.log('缺字段章节:', missing.length ? missing.join(',') : '无');
console.log('figures 总数 =', totalFigs, '（其中 echarts =', echartsCount + '）');
console.log('definition 总数 =', totalDef, '| 缺 fig =', defNoFig);
console.log('echarts option 异常 =', echartsErr);
console.log('卷（共', vols.size, '）:');
[...vols].forEach(v => console.log('  -', v));
