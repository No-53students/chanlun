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

let allOk = true;
function load(fp) {
  try {
    vm.runInContext(fs.readFileSync(fp, 'utf8'), sandbox, { filename: path.basename(fp) });
  } catch (e) {
    allOk = false;
    console.log('加载失败', fp, ':', e.message);
  }
}

// 按 index.html 顺序加载
load(path.join(dir, 'core.js'));
const chFiles = fs.readdirSync(chaptersDir).filter(f => /^ch\d+\.js$/.test(f))
  .sort((a, b) => parseInt(a.match(/\d+/)[0]) - parseInt(b.match(/\d+/)[0]));
chFiles.forEach(f => load(path.join(chaptersDir, f)));

const extra = [
  'glossary.js',
  'anims/ch4.js', 'anims/ch5.js', 'anims/ch6.js', 'anims/ch7.js',
  'anims/ch8.js', 'anims/ch9.js', 'anims/ch10.js', 'anims/ch14.js',
  'originals/orig1.js', 'originals/orig2.js',
  'quizzes/quiz1.js', 'quizzes/quiz2.js',
];
extra.forEach(f => load(path.join(dir, f)));

console.log('=== 加载 ===');
console.log('全部成功 =', allOk);

const chapters = sandbox.__chapters || [];
console.log('\n=== 章节 ===');
console.log('章节数 =', chapters.length, '（应 53）');
const ids = chapters.map(c => c.id);
const dup = ids.filter((v, i) => ids.indexOf(v) !== i);
console.log('重复 id:', dup.length ? dup.join(',') : '无');

let totalDef = 0, defNoFig = 0, echartsErr = 0, echartsCount = 0;
for (const c of chapters) {
  for (const s of (c.sections || [])) {
    if (s.type === 'definition') for (const it of (s.items || [])) { totalDef++; if (!it.fig && !it.draw) { defNoFig++; console.log('  缺fig:', c.id, it.term); } }
  }
  for (const f of (c.figures || [])) {
    if (f.kind === 'echarts' && typeof f.option === 'function') { echartsCount++; try { f.option(); } catch (e) { echartsErr++; console.log('  option异常:', c.id, e.message); } }
  }
}
console.log('definition =', totalDef, '| 缺fig =', defNoFig);
console.log('echarts =', echartsCount, '| 异常 =', echartsErr);

console.log('\n=== 术语词典 ===');
const glossary = sandbox.__glossary || [];
const badCh = glossary.filter(g => !chapters.some(c => c.id === g.ch));
console.log('术语数 =', glossary.length);
console.log('ch 字段无效 =', badCh.length ? badCh.map(g => g.term + '→' + g.ch).join(', ') : '无');

console.log('\n=== 动画演示 ===');
const anims = sandbox.__anims || {};
const animKeys = Object.keys(anims).sort();
const animBad = animKeys.filter(k => {
  const a = anims[k];
  return !a.title || !a.steps || !a.steps.length || a.steps.some(s => !s.html || !s.label);
});
console.log('动画章 =', animKeys.length, '（', animKeys.join(','), '）');
console.log('动画异常 =', animBad.length ? animBad.join(',') : '无');
animKeys.forEach(k => console.log('  ' + k + ':', anims[k].steps.length, '步'));

console.log('\n=== 原文对照 ===');
const originals = sandbox.__originals || {};
const origMissing = chapters.filter(c => !originals[c.id]).map(c => c.id);
console.log('原文对照 =', Object.keys(originals).length, '章');
console.log('缺失 =', origMissing.length ? origMissing.join(',') : '无');

console.log('\n=== 交互练习 ===');
const quizzes = sandbox.__quizzes || {};
const quizKeys = Object.keys(quizzes);
const quizMissing = chapters.filter(c => !quizzes[c.id]).map(c => c.id);
const quizBad = [];
let totalQ = 0;
for (const k of quizKeys) {
  const qs = quizzes[k];
  if (!Array.isArray(qs) || qs.length !== 3) quizBad.push(k + '(题数' + (qs || []).length + ')');
  else for (const q of qs) {
    totalQ++;
    if (!q.q || !Array.isArray(q.options) || q.options.length !== 4 || typeof q.answer !== 'number' || q.answer < 0 || q.answer > 3 || !q.explain) quizBad.push(k + '(结构)');
  }
}
console.log('练习章 =', quizKeys.length, '| 总题数 =', totalQ, '（应 159）');
console.log('缺失 =', quizMissing.length ? quizMissing.join(',') : '无');
console.log('练习异常 =', quizBad.length ? quizBad.join(',') : '无');
