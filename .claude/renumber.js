const fs = require('fs');
const path = require('path');
const dir = path.join(__dirname, '..', 'h5', 'js', 'chapters');

// 旧 id -> { 新 id, 新章号, 卷 }
const map = {
  ch2:  { id: 'ch04', no: 4,  vol: '卷二 · 形态学' },
  ch3:  { id: 'ch05', no: 5,  vol: '卷二 · 形态学' },
  ch4:  { id: 'ch06', no: 6,  vol: '卷二 · 形态学' },
  ch5:  { id: 'ch07', no: 7,  vol: '卷二 · 形态学' },
  ch6:  { id: 'ch08', no: 8,  vol: '卷二 · 形态学' },
  ch7:  { id: 'ch10', no: 10, vol: '卷三 · 中枢与走势' },
  ch8:  { id: 'ch11', no: 11, vol: '卷三 · 中枢与走势' },
  ch9:  { id: 'ch13', no: 13, vol: '卷三 · 中枢与走势' },
  ch10: { id: 'ch14', no: 14, vol: '卷四 · 背驰与买卖点' },
  ch11: { id: 'ch15', no: 15, vol: '卷四 · 背驰与买卖点' },
  ch12: { id: 'ch19', no: 19, vol: '卷五 · 分解与操作' },
  ch13: { id: 'ch20', no: 20, vol: '卷五 · 分解与操作' },
  ch14: { id: 'ch21', no: 21, vol: '卷五 · 分解与操作' },
  ch15: { id: 'ch26', no: 26, vol: '卷六 · 中阴与表里' },
  ch16: { id: 'ch27', no: 27, vol: '卷六 · 中阴与表里' },
  ch17: { id: 'ch30', no: 30, vol: '卷七 · 资金心态与综合' },
  ch18: { id: 'ch31', no: 31, vol: '卷七 · 资金心态与综合' },
};

// 第一步：全部读入内存并转换（不写盘）
const contents = {};
for (const [old, t] of Object.entries(map)) {
  const src = path.join(dir, old + '.js');
  if (!fs.existsSync(src)) { console.log('MISSING', src); continue; }
  let s = fs.readFileSync(src, 'utf8');

  const idOld = `id: '${old}'`;
  if (!s.includes(idOld)) { console.log('WARN no id:', old); }
  s = s.split(idOld).join(`id: '${t.id}', vol: '${t.vol}'`);

  const titleOld = `title: '第${old.replace('ch', '')}章 `;
  if (!s.includes(titleOld)) { console.log('WARN no title:', old); }
  s = s.split(titleOld).join(`title: '第${t.no}章 `);

  contents[t.id] = s;
}

// 第二步：删除所有旧文件
for (const old of Object.keys(map)) {
  const p = path.join(dir, old + '.js');
  if (fs.existsSync(p)) fs.unlinkSync(p);
}

// 第三步：写出所有新文件
for (const [id, s] of Object.entries(contents)) {
  fs.writeFileSync(path.join(dir, id + '.js'), s, 'utf8');
}

console.log('重命名完成，生成', Object.keys(contents).length, '个文件');
