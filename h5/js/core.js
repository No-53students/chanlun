/* ============================================================
 * 缠论 H5 · 核心算法与绘图（零构建 · 经典脚本，函数挂到全局）
 * 依赖：vendor/echarts.min.js（ECharts 全局变量）
 * 章节内容由 js/chapters/*.js 以 __chapters 数组收集
 * ============================================================ */

window.__chapters = window.__chapters || [];

var upColor = '#e74c3c';   // 阳线（涨）
var downColor = '#16a34a'; // 阴线（跌）
var biColor = '#f59e0b';   // 笔

/* ---------- 数据生成 ---------- */

function genZigzag() {
  const pivots = [10, 15, 10.5, 16, 12, 18];
  const per = 4, rows = [];
  for (let s = 0; s < pivots.length - 1; s++) {
    const a = pivots[s], b = pivots[s + 1], up = b >= a;
    for (let k = 0; k < per; k++) {
      const t = (k + 1) / per, mid = a + (b - a) * t;
      rows.push({ o: +(mid - (up ? .06 : -.06)).toFixed(2), c: +(mid + (up ? .10 : -.10)).toFixed(2), l: +(mid - .14).toFixed(2), h: +(mid + .14).toFixed(2) });
    }
  }
  return rows;
}

// 真正存在包含关系的数据（向上段 k1 含 k2、k3 含 k4；向下段 k7 含 k8）
function genInclude() {
  return [
    { o: 92, c: 95, l: 88, h: 96 },    // k0 向上起点
    { o: 96, c: 99, l: 90, h: 100 },   // k1 确立向上
    { o: 97, c: 98, l: 92, h: 98 },    // k2 被 k1 包含
    { o: 100, c: 103, l: 94, h: 104 }, // k3 向上
    { o: 101, c: 102, l: 96, h: 102 }, // k4 被 k3 包含
    { o: 104, c: 107, l: 98, h: 108 }, // k5 向上
    { o: 106, c: 98, l: 96, h: 106 },  // k6 转折（阴线）
    { o: 99, c: 92, l: 90, h: 100 },   // k7 确立向下
    { o: 93, c: 91, l: 92, h: 96 },    // k8 被 k7 包含
    { o: 90, c: 87, l: 88, h: 94 },    // k9 向下
  ];
}

/* ---------- 算法 ---------- */

// 包含关系处理（方向由"之前趋势"决定，而非当前两根）
function mergeIncluded(rows) {
  const merged = [], groups = [];
  let dir = 1; // 1 向上 / -1 向下
  for (let i = 0; i < rows.length; i++) {
    let cur = rows[i], grp = [i];
    if (merged.length) {
      const prev = merged[merged.length - 1];
      const inc = (prev.h >= cur.h && prev.l <= cur.l) || (cur.h >= prev.h && cur.l <= prev.l);
      if (!inc) dir = cur.h >= prev.h ? 1 : -1; // 无包含时更新方向
    }
    while (merged.length) {
      const prev = merged[merged.length - 1];
      const inc = (prev.h >= cur.h && prev.l <= cur.l) || (cur.h >= prev.h && cur.l <= prev.l);
      if (!inc) break;
      const up = dir >= 0;
      const nh = up ? Math.max(prev.h, cur.h) : Math.min(prev.h, cur.h);
      const nl = up ? Math.max(prev.l, cur.l) : Math.min(prev.l, cur.l);
      merged.pop(); grp = [...groups.pop(), ...grp];
      cur = { ...cur, h: nh, l: nl };
    }
    merged.push(cur); groups.push(grp);
  }
  return { merged, groups };
}

function findFractals(ks) {
  const tops = [], bottoms = [];
  for (let i = 1; i < ks.length - 1; i++) {
    const a = ks[i - 1], m = ks[i], b = ks[i + 1];
    if (m.h > a.h && m.h > b.h && m.l > a.l && m.l > b.l) tops.push(i);
    if (m.l < a.l && m.l < b.l && m.h < a.h && m.h < b.h) bottoms.push(i);
  }
  return { tops, bottoms };
}

function findBi(ks, tops, bottoms) {
  const pts = [...tops.map(i => ({ i, type: 'top' })), ...bottoms.map(i => ({ i, type: 'bottom' }))].sort((x, y) => x.i - y.i);
  const bi = [];
  for (const p of pts) {
    const last = bi[bi.length - 1];
    if (!last) { bi.push(p); continue; }
    if (last.type === p.type) {
      if (p.type === 'top' && ks[p.i].h > ks[last.i].h) bi[bi.length - 1] = p;
      else if (p.type === 'bottom' && ks[p.i].l < ks[last.i].l) bi[bi.length - 1] = p;
    } else if (p.i - last.i >= 4) {
      bi.push(p);
    }
  }
  return bi;
}

/* ---------- 静态 SVG 绘图 ---------- */

// K 线示意：klines = [{o,c,l,h}]，返回 SVG 字符串
function klineSVG(klines, opts = {}) {
  const w = opts.w || 36, bodyW = opts.bodyW || 13, h = opts.h || 100, pad = 10;
  const min = Math.min(...klines.map(k => k.l)), max = Math.max(...klines.map(k => k.h));
  const range = (max - min) || 1;
  const y = v => pad + (max - v) / range * (h - 2 * pad);
  const col = k => k.c >= k.o ? '#e74c3c' : '#16a34a';
  let s = '';
  klines.forEach((k, i) => {
    const cx = pad + i * w + w / 2, c = col(k);
    s += `<line x1="${cx}" y1="${y(k.h).toFixed(1)}" x2="${cx}" y2="${y(k.l).toFixed(1)}" stroke="${c}" stroke-width="1.5"/>`;
    const yo = y(k.o), yc = y(k.c), top = Math.min(yo, yc), hgt = Math.max(2, Math.abs(yo - yc));
    s += `<rect x="${(cx - bodyW / 2).toFixed(1)}" y="${top.toFixed(1)}" width="${bodyW}" height="${hgt.toFixed(1)}" fill="${c}" rx="1"/>`;
  });
  return `<svg viewBox="0 0 ${w * klines.length} ${h}" width="${w * klines.length}" height="${h}" style="display:block">${s}</svg>`;
}

// 造一根 K 线：mk(低, 高, 是否阳线)
function mk(l, h, up = true) {
  const mid = (l + h) / 2;
  return { o: +(mid + (up ? -0.4 : 0.4)).toFixed(1), c: +(mid + (up ? 0.4 : -0.4)).toFixed(1), l, h };
}

// 笔折线示意：points = [{p, tag}]，segColors 指定每段颜色（索引对应笔）
function biLineSVG(points, opts = {}) {
  const w = opts.w || 56, h = opts.h || 110, pad = 16;
  const min = Math.min(...points.map(x => x.p)), max = Math.max(...points.map(x => x.p));
  const range = (max - min) || 1;
  const y = v => pad + (max - v) / range * (h - 2 * pad);
  const x = i => pad + i * w;
  const W = pad * 2 + w * (points.length - 1);
  let s = `<svg viewBox="0 0 ${W} ${h}" width="${W}" height="${h}" style="display:block">`;
  for (let i = 0; i < points.length - 1; i++) {
    const color = (opts.segColors && opts.segColors[i]) || '#2563eb';
    s += `<line x1="${x(i)}" y1="${y(points[i].p).toFixed(1)}" x2="${x(i + 1)}" y2="${y(points[i + 1].p).toFixed(1)}" stroke="${color}" stroke-width="${opts.sw || 2.5}"/>`;
  }
  points.forEach((pt, i) => {
    if (pt.tag) {
      const c = pt.tag === '顶' ? '#e74c3c' : '#16a34a';
      s += `<circle cx="${x(i)}" cy="${y(pt.p).toFixed(1)}" r="3.5" fill="${c}"/>`;
      s += `<text x="${x(i)}" y="${(y(pt.p) - 7).toFixed(1)}" font-size="10" text-anchor="middle" fill="${c}">${pt.tag}</text>`;
    }
  });
  s += '</svg>';
  return s;
}

// 特征序列元素区间条：ivs = [{lo, hi, label}]（向下笔 hi 高 / lo 低）
function intervalsSVG(ivs, opts = {}) {
  const w = opts.w || 52, h = opts.h || 110, pad = 16;
  const min = Math.min(...ivs.map(x => x.lo)), max = Math.max(...ivs.map(x => x.hi));
  const range = (max - min) || 1;
  const y = v => pad + (max - v) / range * (h - 2 * pad);
  const x = i => pad + i * w + w / 2;
  const W = pad * 2 + w * ivs.length;
  let s = `<svg viewBox="0 0 ${W} ${h}" width="${W}" height="${h}" style="display:block">`;
  ivs.forEach((iv, i) => {
    const col = iv.color || '#f59e0b';
    const top = y(iv.hi).toFixed(1), hgt = Math.max(3, y(iv.lo) - y(iv.hi));
    s += `<rect x="${(x(i) - 12).toFixed(1)}" y="${top}" width="24" height="${hgt.toFixed(1)}" fill="${col}" opacity="0.85" rx="2"/>`;
    s += `<text x="${x(i)}" y="${(h - 4).toFixed(1)}" font-size="10" text-anchor="middle" fill="#6b7280">${iv.label}</text>`;
  });
  s += '</svg>';
  return s;
}

// 折线 + 中枢矩形示意：points=[{p,tag,label,color,above}]，zones=[{lo,hi,x0,x1,label}]（x0/x1 为折线点下标）
// opts: { zgzd: 在中枢右侧标注 ZG/ZD 值虚线, lineColor, sw }
function drawZS(points, zones, opts = {}) {
  const w = opts.w || 56, h = opts.h || 130, pad = 16;
  const min = Math.min(...points.map(x => x.p)), max = Math.max(...points.map(x => x.p));
  const range = (max - min) || 1;
  const y = v => pad + (max - v) / range * (h - 2 * pad);
  const x = i => pad + i * w;
  const W = pad * 2 + w * (points.length - 1);
  let s = `<svg viewBox="0 0 ${W} ${h}" width="${W}" height="${h}" style="display:block">`;
  zones.forEach(z => {
    const y0 = y(z.hi), y1 = y(z.lo);
    const x0 = x(z.x0) - w / 2, x1 = x(z.x1) + w / 2;
    s += `<rect x="${x0.toFixed(1)}" y="${y0.toFixed(1)}" width="${(x1 - x0).toFixed(1)}" height="${(y1 - y0).toFixed(1)}" fill="rgba(37,99,235,0.12)" stroke="#2563eb" stroke-dasharray="4 3"/>`;
    if (z.label) {
      s += `<text x="${((x0 + x1) / 2).toFixed(1)}" y="${(y0 - 4).toFixed(1)}" font-size="10" text-anchor="middle" fill="#2563eb" font-weight="bold">${z.label}</text>`;
    }
    if (opts.zgzd) {
      s += `<line x1="${x0.toFixed(1)}" y1="${y0.toFixed(1)}" x2="${W}" y2="${y0.toFixed(1)}" stroke="#2563eb" stroke-width="1" stroke-dasharray="3 3"/>`;
      s += `<text x="${W - 2}" y="${(y0 - 3).toFixed(1)}" font-size="9" text-anchor="end" fill="#2563eb">ZG=${z.hi}</text>`;
      s += `<line x1="${x0.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${W}" y2="${y1.toFixed(1)}" stroke="#2563eb" stroke-width="1" stroke-dasharray="3 3"/>`;
      s += `<text x="${W - 2}" y="${(y1 - 3).toFixed(1)}" font-size="9" text-anchor="end" fill="#2563eb">ZD=${z.lo}</text>`;
    }
  });
  for (let i = 0; i < points.length - 1; i++) {
    s += `<line x1="${x(i)}" y1="${y(points[i].p).toFixed(1)}" x2="${x(i + 1)}" y2="${y(points[i + 1].p).toFixed(1)}" stroke="${opts.lineColor || '#1f2937'}" stroke-width="${opts.sw || 2}"/>`;
  }
  points.forEach((pt, i) => {
    const label = pt.label || pt.tag;
    if (!label) return;
    const c = pt.color || (pt.tag === '顶' ? '#e74c3c' : pt.tag === '底' ? '#16a34a' : '#1f2937');
    s += `<circle cx="${x(i)}" cy="${y(pt.p).toFixed(1)}" r="3" fill="${c}"/>`;
    const above = pt.tag === '顶' || pt.above === true;
    const ty = above ? y(pt.p) - 8 : y(pt.p) + 14;
    s += `<text x="${x(i)}" y="${ty.toFixed(1)}" font-size="10" text-anchor="middle" fill="${c}" font-weight="bold">${label}</text>`;
  });
  s += '</svg>';
  return s;
}

// 水平虚线 + 端侧标签（用于 GG/DD 等辅助标注，叠加在已有 SVG 场景）——返回 SVG 片段
function hLineSVG(yVal, minVal, maxVal, w, h, pad, label, color, pos = 'start') {
  const range = (maxVal - minVal) || 1;
  const y = v => pad + (maxVal - v) / range * (h - 2 * pad);
  const yy = y(yVal);
  const tx = pos === 'end' ? w - 2 : 2;
  const anchor = pos === 'end' ? 'end' : 'start';
  return `<line x1="0" y1="${yy.toFixed(1)}" x2="${w}" y2="${yy.toFixed(1)}" stroke="${color}" stroke-width="1" stroke-dasharray="3 3"/><text x="${tx}" y="${(yy - 3).toFixed(1)}" font-size="9" text-anchor="${anchor}" fill="${color}">${label}</text>`;
}

// 带文字标注的 K 线示意：klines=[{o,c,l,h}]，labels=[{i,text,pos,color}]（pos='top' 标在最高点上方 / 'bottom' 标在最低点下方）
function klineAnnSVG(klines, labels = [], opts = {}) {
  const w = opts.w || 36, bodyW = opts.bodyW || 13, h = opts.h || 100, pad = 10, padT = opts.padT || 15, padB = opts.padB || 15;
  const min = Math.min(...klines.map(k => k.l)), max = Math.max(...klines.map(k => k.h));
  const range = (max - min) || 1;
  const y = v => padT + (max - v) / range * (h - padT - padB);
  const col = k => k.c >= k.o ? '#e74c3c' : '#16a34a';
  let s = '';
  klines.forEach((k, i) => {
    const cx = pad + i * w + w / 2, c = col(k);
    s += `<line x1="${cx}" y1="${y(k.h).toFixed(1)}" x2="${cx}" y2="${y(k.l).toFixed(1)}" stroke="${c}" stroke-width="1.5"/>`;
    const yo = y(k.o), yc = y(k.c), top = Math.min(yo, yc), hgt = Math.max(2, Math.abs(yo - yc));
    s += `<rect x="${(cx - bodyW / 2).toFixed(1)}" y="${top.toFixed(1)}" width="${bodyW}" height="${hgt.toFixed(1)}" fill="${c}" rx="1"/>`;
  });
  labels.forEach(lb => {
    const k = klines[lb.i]; if (!k) return;
    const cx = pad + lb.i * w + w / 2;
    const ty = lb.pos === 'top' ? y(k.h) - 4 : y(k.l) + 12;
    s += `<text x="${cx.toFixed(1)}" y="${ty.toFixed(1)}" font-size="9" text-anchor="middle" fill="${lb.color || '#6b7280'}">${lb.text}</text>`;
  });
  return `<svg viewBox="0 0 ${w * klines.length} ${h}" width="${w * klines.length}" height="${h}" style="display:block">${s}</svg>`;
}

// 小图容器：标签 + 图 + 图注（用于讲解点内嵌小图解）
function mfig(lbl, svg, cap) {
  return `<div class="fig"><div class="lbl">${lbl}</div>${svg}<div class="cap">${cap}</div></div>`;
}

// 「💡 大白话」标注块：术语旁的白话 / 符号翻译说明（术语本身保留，这里只补一句人话）
function plainHTML(t) {
  return `<div class="plain">💡 <b>大白话</b>：${t}</div>`;
}

// 「🔑 类比」卡：生活化类比，帮助建立直觉
function analogyHTML(title, t) {
  return `<div class="analogy">🔑 <b>类比 · ${title}</b>：${t}</div>`;
}

// 「🧭 判定流程」纵向决策流程图：steps=[{title, lines:[...], tone:'blue'|'green'|'red'|'amber'|'gray'}]
function flowHTML(steps) {
  const toneMap = {
    blue: { border: '#2563eb', bg: '#eff6ff', color: '#1f2937' },
    green: { border: '#16a34a', bg: '#f0fdf4', color: '#166534' },
    red: { border: '#e74c3c', bg: '#fef2f2', color: '#991b1b' },
    amber: { border: '#f59e0b', bg: '#fffbeb', color: '#92400e' },
    gray: { border: '#e5e7eb', bg: '#f9fafb', color: '#374151' },
  };
  const step = s => {
    const c = toneMap[s.tone] || toneMap.gray;
    const lines = (s.lines || []).map(l => `<div style="color:${c.color}">${l}</div>`).join('');
    return `<div style="border:1px solid ${c.border};border-radius:8px;padding:8px 12px;margin:4px 0;background:${c.bg}"><b>${s.title}</b>${lines ? lines : ''}</div>`;
  };
  const arrow = '<div style="text-align:center;color:#6b7280;line-height:1.2">↓</div>';
  return `<div class="flow">🧭 <b>判定流程</b>${steps.map(step).join(arrow)}</div>`;
}

// 「🖱️ 交互式决策树」：可点击的判定器，点当前情况逐步导向结论（绿=成立/结束，红=不成立/延续，琥珀=待定）
// tree = { start:'n0', nodes:{ n0:{ q, opts:[{t,next}] }, 或 { result:'green'|'red'|'amber', t } } }
let __treeSeq = 0;
function treeHTML(tree) {
  const id = 'tree-' + (++__treeSeq);
  (window.__trees = window.__trees || {})[id] = tree;
  return '<div class="tree" id="' + id + '">' + renderTreeNode(id, tree, tree.start) + '</div>';
}
function renderTreeNode(id, tree, nodeId) {
  const n = tree.nodes[nodeId];
  if (n.result) {
    const cls = n.result === 'green' ? 'green' : (n.result === 'red' ? 'red' : 'amber');
    return '<div class="tree-result ' + cls + '">' + n.t + '</div>'
      + '<button type="button" class="tree-reset" onclick="treeGo(\'' + id + '\',\'' + tree.start + '\')">↻ 重新判断</button>';
  }
  const opts = (n.opts || []).map(function (o) {
    return '<button type="button" class="tree-opt" onclick="treeGo(\'' + id + '\',\'' + o.next + '\')">' + o.t + '</button>';
  }).join('');
  return '<div class="tree-q">🧭 ' + n.q + '</div><div class="tree-opts">' + opts + '</div>';
}
// 点击选项后切换决策树节点（全局函数，供内联 onclick 调用）
function treeGo(id, nodeId) {
  const tree = window.__trees && window.__trees[id];
  const el = document.getElementById(id);
  if (el && tree) el.innerHTML = renderTreeNode(id, tree, nodeId);
}

// 「✏️ 动手画」：在图上点击标标记，判分即时比对标准答案
// draw = { kind:'kline'|'line', title, intro, marks:['顶','底'|'一买'...], answer:{i:'值'},
//          klines:[{o,c,l,h}] (kline) 或 pts:[{p,tag}], zones:[{lo,hi,x0,x1,label}] (line) }
function drawMarkColor(m) {
  return {
    '顶': '#e74c3c', '底': '#16a34a',
    '一买': '#16a34a', '二买': '#2563eb', '三买': '#9333ea',
    '一卖': '#e74c3c', '二卖': '#f59e0b', '三卖': '#dc2626',
    'ZG': '#2563eb', 'ZD': '#2563eb', 'GG': '#e74c3c', 'DD': '#16a34a',
  }[m] || '#1f2937';
}
let __drawSeq = 0;
function drawHTML(draw) {
  const id = 'draw-' + (++__drawSeq);
  (window.__draws = window.__draws || {})[id] = { id: id, data: draw, marks: {}, seq: [], scored: false };
  return '<div class="draw" id="' + id + '">' + drawRender(id) + '</div>';
}
function drawKlineSVG(st) {
  const klines = st.data.klines, marks = st.marks, scored = st.scored, ans = st.data.answer || {};
  const w = 46, bodyW = 14, h = 150, pad = 18, padT = 28, padB = 30;
  const min = Math.min(...klines.map(k => k.l)), max = Math.max(...klines.map(k => k.h));
  const range = (max - min) || 1;
  const y = v => padT + (max - v) / range * (h - padT - padB);
  const x = i => pad + i * w;
  const col = k => k.c >= k.o ? '#e74c3c' : '#16a34a';
  const W = pad * 2 + w * (klines.length - 1);
  let s = '<svg viewBox="0 0 ' + W + ' ' + h + '" width="' + W + '" height="' + h + '" style="display:block;max-width:100%">';
  klines.forEach(function (k, i) {
    const cx = x(i);
    const c = col(k);
    const highY = y(k.h), lowY = y(k.l);
    const top = Math.min(y(k.o), y(k.c)), hh = Math.max(1, Math.abs(y(k.c) - y(k.o)));
    s += '<line x1="' + cx + '" y1="' + highY.toFixed(1) + '" x2="' + cx + '" y2="' + lowY.toFixed(1) + '" stroke="' + c + '" stroke-width="1"/>';
    s += '<rect x="' + (cx - bodyW / 2).toFixed(1) + '" y="' + top.toFixed(1) + '" width="' + bodyW + '" height="' + hh.toFixed(1) + '" fill="' + c + '"/>';
    if (!scored) {
      s += '<rect x="' + (cx - w / 2).toFixed(1) + '" y="0" width="' + w + '" height="' + h + '" fill="transparent" cursor="pointer" onclick="drawMark(\'' + st.id + '\',' + i + ')"/>';
    }
    const u = marks[i] || null, a = ans[i] || null;
    const up = v => v && v.indexOf('顶') >= 0;
    let text = null, color = null, my = null;
    if (!scored) {
      if (u) { text = u; color = drawMarkColor(u); my = up(u) ? highY - 6 : lowY + 16; }
    } else if (a && a === u) { text = u + ' ✓'; color = '#16a34a'; my = up(a) ? highY - 6 : lowY + 16; }
    else if (a && !u) { text = '应标' + a; color = '#f59e0b'; my = up(a) ? highY - 6 : lowY + 16; }
    else if (a && u) { text = u + ' ✗'; color = '#e74c3c'; my = up(u) ? highY - 6 : lowY + 16; }
    else if (!a && u) { text = u + ' ✗'; color = '#e74c3c'; my = up(u) ? highY - 6 : lowY + 16; }
    if (text) s += '<text x="' + cx + '" y="' + my.toFixed(1) + '" font-size="11" text-anchor="middle" fill="' + color + '" font-weight="bold">' + text + '</text>';
  });
  s += '</svg>';
  return s;
}
function drawLineSVG(st) {
  const pts = st.data.pts, zones = st.data.zones || [], marks = st.marks, scored = st.scored, ans = st.data.answer || {};
  const w = 40, h = 150, pad = 18;
  const min = Math.min(...pts.map(x => x.p)), max = Math.max(...pts.map(x => x.p));
  const range = (max - min) || 1;
  const y = v => pad + (max - v) / range * (h - 2 * pad);
  const x = i => pad + i * w;
  const W = pad * 2 + w * (pts.length - 1);
  let s = '<svg viewBox="0 0 ' + W + ' ' + h + '" width="' + W + '" height="' + h + '" style="display:block;max-width:100%">';
  zones.forEach(function (z) {
    const y0 = y(z.hi), y1 = y(z.lo);
    const x0 = x(z.x0) - w / 2, x1 = x(z.x1) + w / 2;
    s += '<rect x="' + x0.toFixed(1) + '" y="' + y0.toFixed(1) + '" width="' + (x1 - x0).toFixed(1) + '" height="' + (y1 - y0).toFixed(1) + '" fill="rgba(37,99,235,0.12)" stroke="#2563eb" stroke-dasharray="4 3"/>';
    if (z.label) s += '<text x="' + ((x0 + x1) / 2).toFixed(1) + '" y="' + (y0 - 4).toFixed(1) + '" font-size="10" text-anchor="middle" fill="#2563eb" font-weight="bold">' + z.label + '</text>';
  });
  for (let i = 0; i < pts.length - 1; i++) {
    s += '<line x1="' + x(i) + '" y1="' + y(pts[i].p).toFixed(1) + '" x2="' + x(i + 1) + '" y2="' + y(pts[i + 1].p).toFixed(1) + '" stroke="#1f2937" stroke-width="2"/>';
  }
  pts.forEach(function (pt, i) {
    const cx = x(i), cy = y(pt.p);
    const c = pt.color || (pt.tag === '顶' ? '#e74c3c' : pt.tag === '底' ? '#16a34a' : '#1f2937');
    s += '<circle cx="' + cx + '" cy="' + cy.toFixed(1) + '" r="3" fill="' + c + '"/>';
    if (pt.tag) {
      const above = pt.tag === '顶' || pt.above === true;
      const ty = above ? cy - 8 : cy + 14;
      s += '<text x="' + cx + '" y="' + ty.toFixed(1) + '" font-size="9" text-anchor="middle" fill="' + c + '" font-weight="bold">' + pt.tag + '</text>';
    }
    if (!scored) s += '<rect x="' + (cx - w / 2).toFixed(1) + '" y="0" width="' + w + '" height="' + h + '" fill="transparent" cursor="pointer" onclick="drawMark(\'' + st.id + '\',' + i + ')"/>';
    const u = marks[i] || null, a = ans[i] || null;
    const markAbove = !(pt.tag && (pt.tag.indexOf('底') >= 0 || pt.tag.indexOf('低') >= 0));
    const my = markAbove ? cy - 16 : cy + 28;
    let text = null, color = null;
    if (!scored) {
      if (u) { text = u; color = drawMarkColor(u); }
    } else if (a && a === u) { text = u + ' ✓'; color = '#16a34a'; }
    else if (a && !u) { text = '应标' + a; color = '#f59e0b'; }
    else if (a && u) { text = u + ' ✗'; color = '#e74c3c'; }
    else if (!a && u) { text = u + ' ✗'; color = '#e74c3c'; }
    if (text) s += '<text x="' + cx + '" y="' + my.toFixed(1) + '" font-size="11" text-anchor="middle" fill="' + color + '" font-weight="bold">' + text + '</text>';
  });
  s += '</svg>';
  return s;
}
function drawLinkSVG(st) {
  const pts = st.data.pts, seq = st.seq || [], scored = st.scored, ans = st.data.answer || [];
  const w = 40, h = 150, pad = 18;
  const min = Math.min(...pts.map(x => x.p)), max = Math.max(...pts.map(x => x.p));
  const range = (max - min) || 1;
  const y = v => pad + (max - v) / range * (h - 2 * pad);
  const x = i => pad + i * w;
  const W = pad * 2 + w * (pts.length - 1);
  let s = '<svg viewBox="0 0 ' + W + ' ' + h + '" width="' + W + '" height="' + h + '" style="display:block;max-width:100%">';
  for (let i = 0; i < pts.length - 1; i++) {
    s += '<line x1="' + x(i) + '" y1="' + y(pts[i].p).toFixed(1) + '" x2="' + x(i + 1) + '" y2="' + y(pts[i + 1].p).toFixed(1) + '" stroke="#d1d5db" stroke-width="1.5"/>';
  }
  for (let k = 0; k < seq.length - 1; k++) {
    const a = seq[k], b = seq[k + 1];
    const c = pts[a].p < pts[b].p ? '#e74c3c' : '#16a34a';
    s += '<line x1="' + x(a) + '" y1="' + y(pts[a].p).toFixed(1) + '" x2="' + x(b) + '" y2="' + y(pts[b].p).toFixed(1) + '" stroke="' + c + '" stroke-width="3" stroke-linecap="round"/>';
  }
  if (scored) {
    for (let k = 0; k < ans.length - 1; k++) {
      const a = ans[k], b = ans[k + 1];
      s += '<line x1="' + x(a) + '" y1="' + y(pts[a].p).toFixed(1) + '" x2="' + x(b) + '" y2="' + y(pts[b].p).toFixed(1) + '" stroke="#2563eb" stroke-width="2" stroke-dasharray="5 4" stroke-linecap="round"/>';
    }
  }
  pts.forEach(function (pt, i) {
    const cx = x(i), cy = y(pt.p);
    const ord = seq.indexOf(i);
    const inSeq = ord >= 0;
    const c = pt.color || (pt.tag === '顶' ? '#e74c3c' : pt.tag === '底' ? '#16a34a' : '#1f2937');
    s += '<circle cx="' + cx + '" cy="' + cy.toFixed(1) + '" r="' + (inSeq ? 5 : 3) + '" fill="' + c + '"' + (inSeq ? ' stroke="#1f2937" stroke-width="1.5"' : '') + '/>';
    if (pt.tag) {
      const above = pt.tag === '顶' || pt.above === true;
      const ty = above ? cy - 8 : cy + 14;
      s += '<text x="' + cx + '" y="' + ty.toFixed(1) + '" font-size="9" text-anchor="middle" fill="' + c + '" font-weight="bold">' + pt.tag + '</text>';
    }
    if (!scored) s += '<rect x="' + (cx - w / 2).toFixed(1) + '" y="0" width="' + w + '" height="' + h + '" fill="transparent" cursor="pointer" onclick="drawLinkMark(\'' + st.id + '\',' + i + ')"/>';
    if (ord >= 0) {
      const oy = pt.tag === '顶' ? cy - 20 : cy + 26;
      s += '<text x="' + cx + '" y="' + oy.toFixed(1) + '" font-size="10" text-anchor="middle" fill="#2563eb" font-weight="bold">' + (ord + 1) + '</text>';
    }
  });
  s += '</svg>';
  return s;
}
function drawSVG(st) {
  if (st.data.kind === 'line') return drawLineSVG(st);
  if (st.data.kind === 'link') return drawLinkSVG(st);
  return drawKlineSVG(st);
}
function drawRender(id) {
  const st = window.__draws && window.__draws[id];
  if (!st) return '';
  let s = '<div class="draw-title">✏️ ' + st.data.title + '</div>';
  if (st.data.intro) s += '<div class="draw-intro">' + st.data.intro + '</div>';
  s += drawSVG(st);
  s += '<div class="draw-bar">';
  s += '<button type="button" class="step-btn" onclick="drawClear(\'' + id + '\')">↻ 清除</button>';
  s += '<button type="button" class="step-btn" onclick="drawScore(\'' + id + '\')">判分</button>';
  s += '</div>';
  if (st.scored) s += drawScoreText(id);
  return s;
}
function drawMark(id, i) {
  const st = window.__draws && window.__draws[id];
  if (!st || st.scored) return;
  const list = st.data.marks || ['顶', '底'];
  const cur = st.marks[i] || null;
  const idx = list.indexOf(cur);
  st.marks[i] = idx >= 0 ? (list[idx + 1] || null) : list[0];
  drawUpdate(id);
}
function drawLinkMark(id, i) {
  const st = window.__draws && window.__draws[id];
  if (!st || st.scored) return;
  const seq = st.seq || (st.seq = []);
  const idx = seq.indexOf(i);
  if (idx >= 0) seq.splice(idx, 1);
  else seq.push(i);
  drawUpdate(id);
}
function drawClear(id) {
  const st = window.__draws && window.__draws[id];
  if (!st) return;
  st.marks = {}; st.seq = []; st.scored = false;
  drawUpdate(id);
}
function drawScore(id) {
  const st = window.__draws && window.__draws[id];
  if (!st) return;
  st.scored = true;
  drawUpdate(id);
}
function drawScoreText(id) {
  const st = window.__draws && window.__draws[id];
  if (!st) return '';
  if (st.data.kind === 'link') return drawLinkScoreText(st);
  const ans = st.data.answer || {}, user = st.marks || {};
  const isLine = st.data.kind === 'line';
  const n = isLine ? st.data.pts.length : st.data.klines.length;
  const unit = isLine ? '个点' : '根 K 线';
  const item = i => isLine ? '第 ' + (i + 1) + ' 个点' : '第 ' + (i + 1) + ' 根';
  let right = 0, errs = [];
  for (let i = 0; i < n; i++) {
    const a = ans[i] || null, u = user[i] || null;
    if (a === u) right++;
    else errs.push(i);
  }
  if (!errs.length) return '<div class="draw-result ok">✓ 全对！' + n + ' ' + unit + '全部标对。</div>';
  const parts = errs.map(function (i) {
    const a = ans[i] || null, u = user[i] || null;
    const lbl = item(i);
    if (a && u) return lbl + ' 应为「' + a + '」，标成了「' + u + '」';
    if (a && !u) return lbl + ' 漏标「' + a + '」';
    return lbl + ' 多标了「' + u + '」';
  });
  return '<div class="draw-result bad">✗ 对 ' + right + ' / ' + n + '：' + parts.join('；') + '。</div>';
}
function drawLinkScoreText(st) {
  const ans = st.data.answer || [], seq = st.seq || [];
  const same = ans.length === seq.length && ans.every(function (v, i) { return v === seq[i]; });
  if (same) return '<div class="draw-result ok">✓ 全对！' + (ans.length - 1) + ' 笔全部连对（' + ans.length + ' 个端点依次正确）。</div>';
  const errs = [];
  ans.forEach(function (v) { if (seq.indexOf(v) < 0) errs.push('漏连第 ' + (v + 1) + ' 个点'); });
  seq.forEach(function (v) { if (ans.indexOf(v) < 0) errs.push('多连了第 ' + (v + 1) + ' 个点'); });
  if (!errs.length) errs.push('端点都选对了，但连线顺序不对（应按「底→顶→底」依次连）');
  return '<div class="draw-result bad">✗ 未全对：' + errs.join('；') + '。标准连法见蓝色虚线。</div>';
}
function drawUpdate(id) {
  const el = document.getElementById(id);
  if (el) el.innerHTML = drawRender(id);
}

// 背驰点涟漪散点系列（ECharts effectScatter）：叠加在价格 grid 上做「闪烁」，series 级 tooltip 提供浮窗说明
function backchiEffect(data, color, tip) {
  return {
    name: '背驰点', type: 'effectScatter', xAxisIndex: 0, yAxisIndex: 0,
    data: data, symbolSize: 14, showEffectOn: 'render', z: 30,
    rippleEffect: { brushType: 'stroke', scale: 4, period: 3 },
    itemStyle: { color: color, shadowBlur: 12, shadowColor: color },
    tooltip: { trigger: 'item', formatter: function () { return tip; } },
  };
}

// K线包含合并连续动画：outer 包含方、inner 被包含方、merged 合并结果；dir 'up'|'down'
// 内联 <style> + CSS keyframes，v-html 渲染即自动循环播放，零依赖全局 CSS
function klineMergeAnimSVG(outer, inner, merged, dir) {
  const w = 52, h = 120, pad = 14, bodyW = 12;
  const all = [outer, inner, merged];
  const min = Math.min(...all.map(k => k.l)), max = Math.max(...all.map(k => k.h));
  const range = (max - min) || 1;
  const y = v => pad + (max - v) / range * (h - 2 * pad);
  const col = k => k.c >= k.o ? '#e74c3c' : '#16a34a';
  const cx = i => pad + i * w + w / 2;
  const kline = (k, x, color, dash) => {
    const yo = y(k.o), yc = y(k.c), top = Math.min(yo, yc), hgt = Math.max(2, Math.abs(yo - yc));
    let s = `<line x1="${x}" y1="${y(k.h).toFixed(1)}" x2="${x}" y2="${y(k.l).toFixed(1)}" stroke="${color}" stroke-width="1.5"${dash ? ' stroke-dasharray="3 2"' : ''}/>`;
    s += `<rect x="${(x - bodyW / 2).toFixed(1)}" y="${top.toFixed(1)}" width="${bodyW}" height="${hgt.toFixed(1)}" fill="${color}" rx="1"/>`;
    return s;
  };
  const dirTip = dir === 'up' ? '取高高' : '取低低';
  const arrow = `<text x="${cx(2)}" y="${(h / 2 - 8).toFixed(1)}" font-size="9" text-anchor="middle" fill="#b45309">${dirTip}</text>`
    + `<text x="${cx(2)}" y="${(h / 2 + 10).toFixed(1)}" font-size="16" text-anchor="middle" fill="#6b7280">→</text>`;
  const W = pad * 2 + w * 4;
  return `<svg viewBox="0 0 ${W} ${h}" width="${W}" height="${h}" style="display:block">
  <style>
    .m-outer { animation: mPulse 3s ease-in-out infinite; }
    .m-inner { animation: mInner 3s ease-in-out infinite; }
    .m-merged { animation: mMerged 3s ease-in-out infinite; }
    @keyframes mPulse { 0%,30%,55%,100%{opacity:1} 42%{opacity:.4} }
    @keyframes mInner { 0%,30%{opacity:1} 55%,100%{opacity:0} }
    @keyframes mMerged { 0%,50%{opacity:0} 70%,100%{opacity:1} }
  </style>
  <g class="m-outer">${kline(outer, cx(0), col(outer), false)}</g>
  <g class="m-inner">${kline(inner, cx(1), '#f59e0b', true)}</g>
  ${arrow}
  <g class="m-merged">${kline(merged, cx(3), col(merged), false)}</g>
</svg>`;
}

/* ---------- 预计算第 2-4 章共用的 zigzag 数据 ---------- */

var zig = genZigzag();
var zf = findFractals(zig);
var zbi = findBi(zig, zf.tops, zf.bottoms);
var zigCats = zig.map((_, i) => 'K' + i);
var zbiMap = new Map(zbi.map(p => [p.i, p.type]));

/* ---------- ECharts 交互图 option 工厂 ---------- */

function optCh2() {
  const raw = genInclude();
  const { merged, groups } = mergeIncluded(raw);
  const idxMax = raw.length - 1;
  const contained = new Set(groups.filter(g => g.length > 1).flatMap(g => g.slice(0, -1)));
  const rawData = raw.map((r, i) => ({
    value: [i, r.o, r.c, r.l, r.h],
    itemStyle: contained.has(i) ? { color: '#fde68a', color0: '#fde68a', borderColor: '#f59e0b', borderColor0: '#f59e0b', borderType: 'dashed' } : { color: '#d1d5db', color0: '#d1d5db', borderColor: '#9ca3af', borderColor0: '#9ca3af' },
  }));
  const mergedData = merged.map((m, gi) => {
    const lastIdx = groups[gi][groups[gi].length - 1];
    return { value: [lastIdx, m.o, m.c, m.l, m.h], itemStyle: { color: upColor, color0: downColor, borderColor: upColor, borderColor0: downColor } };
  });
  // 标注：三处包含（方向 + 合并规则）与被包含 K 线
  const seg = (x, y, name, color) => ({ coord: [x, y], name, symbol: 'none', label: { show: true, color, fontSize: 11, fontWeight: 'bold', position: 'top' } });
  const containPin = [2, 4, 8].map(i => ({ coord: [i, raw[i].h], name: '被包含', symbol: 'pin', symbolSize: 22, itemStyle: { color: '#f59e0b' }, label: { show: true, color: '#b45309', fontSize: 9, position: 'top' } }));
  return {
    tooltip: { trigger: 'axis', axisPointer: { type: 'cross' } },
    grid: { left: 48, right: 20, top: 28, bottom: 40 },
    xAxis: { type: 'value', min: -0.5, max: idxMax + 0.5, interval: 1, axisLabel: { formatter: '第{value}根' } },
    yAxis: { type: 'value', scale: true },
    legend: { data: ['原始K线', '合并后K线'] },
    series: [
      { name: '原始K线', type: 'candlestick', data: rawData, barWidth: 0.5, markPoint: { data: containPin } },
      { name: '合并后K线', type: 'candlestick', data: mergedData, barWidth: 0.9,
        markPoint: { data: [seg(1.5, 103, '① 向上合并 → 取高高', upColor), seg(3.5, 107, '② 向上合并 → 取高高', upColor), seg(7.5, 90, '③ 向下合并 → 取低低', downColor)] },
        markLine: { silent: true, symbol: 'none', label: { show: true, position: 'end', formatter: function (p) { return p.name; }, fontSize: 10 }, data: [
          { name: '向上合并高 H=104', yAxis: 104, lineStyle: { color: upColor, type: 'dashed', width: 1 } },
          { name: '向下合并低 L=90', yAxis: 90, lineStyle: { color: downColor, type: 'dashed', width: 1 } },
        ] } },
    ],
  };
}

function optCh3() {
  const topScatter = zf.tops.map(i => ({ name: '顶分型 H=' + zig[i].h.toFixed(1), value: [zigCats[i], zig[i].h + 0.1] }));
  const bottomScatter = zf.bottoms.map(i => ({ name: '底分型 L=' + zig[i].l.toFixed(1), value: [zigCats[i], zig[i].l - 0.1] }));
  // 段名标注：上升 / 下降 K 线
  const segName = [
    { coord: ['K2', 12.5], symbol: 'none', label: { show: true, formatter: '上升K线', color: '#6b7280', fontSize: 11, fontWeight: 'bold' } },
    { coord: ['K6', 13.0], symbol: 'none', label: { show: true, formatter: '下降K线', color: '#6b7280', fontSize: 11, fontWeight: 'bold' } },
  ];
  return {
    tooltip: { trigger: 'axis', axisPointer: { type: 'cross' } },
    grid: { left: 48, right: 20, top: 28, bottom: 56 },
    xAxis: { type: 'category', data: zigCats, axisLabel: { interval: 1 } },
    yAxis: { type: 'value', scale: true },
    dataZoom: [{ type: 'inside' }, { type: 'slider', height: 18, bottom: 8 }],
    series: [
      { name: 'K线', type: 'candlestick', data: zig.map(k => [k.o, k.c, k.l, k.h]), itemStyle: { color: upColor, color0: downColor, borderColor: upColor, borderColor0: downColor }, markPoint: { data: segName } },
      { name: '顶分型', type: 'scatter', data: topScatter, symbol: 'triangle', symbolRotate: 180, symbolSize: 16, itemStyle: { color: upColor }, label: { show: true, position: 'top', formatter: function (p) { return p.name; }, color: upColor, fontSize: 10, fontWeight: 'bold' }, z: 20 },
      { name: '底分型', type: 'scatter', data: bottomScatter, symbol: 'triangle', symbolSize: 16, itemStyle: { color: downColor }, label: { show: true, position: 'bottom', formatter: function (p) { return p.name; }, color: downColor, fontSize: 10, fontWeight: 'bold' }, z: 20 },
    ],
  };
}

function optCh4() {
  const topScatter = zf.tops.map(i => ({ name: '顶分型 H=' + zig[i].h.toFixed(1), value: [zigCats[i], zig[i].h + 0.1] }));
  const bottomScatter = zf.bottoms.map(i => ({ name: '底分型 L=' + zig[i].l.toFixed(1), value: [zigCats[i], zig[i].l - 0.1] }));
  const biLine = zig.map((k, i) => zbiMap.has(i) ? [zigCats[i], zbiMap.get(i) === 'top' ? k.h : k.l] : null);
  const biPrice = p => p.type === 'top' ? zig[p.i].h : zig[p.i].l;
  // 笔方向段名标注
  const biSegs = [];
  for (let k = 0; k < zbi.length - 1; k++) {
    const a = zbi[k], b = zbi[k + 1], up = b.type === 'top';
    biSegs.push({ coord: [zigCats[Math.round((a.i + b.i) / 2)], (biPrice(a) + biPrice(b)) / 2], symbol: 'none', label: { show: true, formatter: up ? '↑ 向上笔' : '↓ 向下笔', color: biColor, fontSize: 11, fontWeight: 'bold' } });
  }
  const hiTop = Math.max(...zf.tops.map(i => zig[i].h));
  const loBot = Math.min(...zf.bottoms.map(i => zig[i].l));
  return {
    tooltip: { trigger: 'axis', axisPointer: { type: 'cross' } },
    grid: { left: 48, right: 20, top: 28, bottom: 56 },
    xAxis: { type: 'category', data: zigCats, axisLabel: { interval: 1 } },
    yAxis: { type: 'value', scale: true },
    dataZoom: [{ type: 'inside' }, { type: 'slider', height: 18, bottom: 8 }],
    series: [
      { name: 'K线', type: 'candlestick', data: zig.map(k => [k.o, k.c, k.l, k.h]), itemStyle: { color: upColor, color0: downColor, borderColor: upColor, borderColor0: downColor } },
      { name: '笔', type: 'line', data: biLine, connectNulls: true, symbol: 'none', lineStyle: { color: biColor, width: 2.2 }, z: 10,
        markPoint: { data: biSegs },
        markLine: { silent: true, symbol: 'none', label: { show: true, position: 'end', formatter: function (p) { return p.name; }, fontSize: 10 }, data: [
          { name: '顶分型最高 H=' + hiTop.toFixed(1), yAxis: hiTop, lineStyle: { color: upColor, type: 'dashed', width: 1 } },
          { name: '底分型最低 L=' + loBot.toFixed(1), yAxis: loBot, lineStyle: { color: downColor, type: 'dashed', width: 1 } },
        ] } },
      { name: '顶分型', type: 'scatter', data: topScatter, symbol: 'triangle', symbolRotate: 180, symbolSize: 16, itemStyle: { color: upColor }, label: { show: true, position: 'top', formatter: function (p) { return p.name; }, color: upColor, fontSize: 10, fontWeight: 'bold' }, z: 20 },
      { name: '底分型', type: 'scatter', data: bottomScatter, symbol: 'triangle', symbolSize: 16, itemStyle: { color: downColor }, label: { show: true, position: 'bottom', formatter: function (p) { return p.name; }, color: downColor, fontSize: 10, fontWeight: 'bold' }, z: 20 },
    ],
  };
}

function optCh5() {
  // 笔端点价格 P0..P10：第一段向上线段（底→顶，5 笔）+ 第二段向下线段（顶→底）破坏它
  const ps = [10, 16, 12, 18, 13, 20, 11, 15, 8, 12, 6];
  const cats = ps.map((_, i) => 'P' + i);
  const biLine = ps.map((p, i) => [cats[i], p]);
  const segLine = [[cats[0], ps[0]], [cats[5], ps[5]], [cats[10], ps[10]]];
  // 笔端点顶/底标注
  const biMp = ps.map((p, i) => {
    const isTop = i % 2 === 1;
    return { coord: [cats[i], p], symbol: 'none', label: { show: true, formatter: isTop ? '顶' : '底', color: isTop ? upColor : downColor, fontSize: 9, position: isTop ? 'top' : 'bottom', distance: 2, fontWeight: 'bold' } };
  });
  // 线段关键点 + 段名
  const segMp = [
    { coord: [cats[0], ps[0]], symbol: 'circle', symbolSize: 11, itemStyle: { color: '#2563eb' }, label: { show: true, formatter: '底·线段起点 P0', color: '#2563eb', fontSize: 10, position: 'bottom', distance: 6, fontWeight: 'bold' } },
    { coord: [cats[5], ps[5]], symbol: 'circle', symbolSize: 11, itemStyle: { color: '#e74c3c' }, label: { show: true, formatter: '顶·线段转折 P5', color: '#e74c3c', fontSize: 10, position: 'top', distance: 6, fontWeight: 'bold' } },
    { coord: [cats[10], ps[10]], symbol: 'circle', symbolSize: 11, itemStyle: { color: '#2563eb' }, label: { show: true, formatter: '底·线段终点 P10', color: '#2563eb', fontSize: 10, position: 'bottom', distance: 6, fontWeight: 'bold' } },
    { coord: [cats[2], 18.5], symbol: 'none', label: { show: true, formatter: '向上线段（5笔）', color: '#2563eb', fontSize: 12, fontWeight: 'bold' } },
    { coord: [cats[8], 7.5], symbol: 'none', label: { show: true, formatter: '向下线段（5笔）', color: '#2563eb', fontSize: 12, fontWeight: 'bold' } },
  ];
  return {
    tooltip: { trigger: 'axis', axisPointer: { type: 'cross' } },
    grid: { left: 40, right: 68, top: 28, bottom: 30 },
    xAxis: { type: 'category', data: cats, axisLabel: { interval: 0 } },
    yAxis: { type: 'value', scale: true },
    series: [
      { name: '笔', type: 'line', data: biLine, symbol: 'circle', symbolSize: 5, lineStyle: { color: biColor, width: 1.6 }, itemStyle: { color: biColor }, markPoint: { data: biMp } },
      { name: '线段', type: 'line', data: segLine, symbol: 'circle', symbolSize: 8, lineStyle: { color: '#2563eb', width: 3 }, itemStyle: { color: '#2563eb' }, z: 30,
        markPoint: { data: segMp },
        markLine: { silent: true, symbol: 'none', label: { show: true, position: 'end', formatter: function (p) { return p.name; }, fontSize: 10 }, data: [
          { name: '线段高 P5=20', yAxis: 20, lineStyle: { color: '#e74c3c', type: 'dashed', width: 1 } },
          { name: '线段低 P10=6', yAxis: 6, lineStyle: { color: '#16a34a', type: 'dashed', width: 1 } },
        ] } },
    ],
  };
}

/* ---------- MACD 副图辅助（价格主图 + DIFF/DEA/柱副图，供背驰章节复用） ---------- */

// 双 grid 布局：上方价格、下方 MACD 副图（n = x 轴最大下标）
function macdGrids(n) {
  return {
    grid: [
      { left: 60, right: 90, top: 46, height: 190 },
      { left: 60, right: 90, top: 300, height: 120 },
    ],
    xAxis: [
      { type: 'value', gridIndex: 0, min: 0, max: n, interval: 1 },
      { type: 'value', gridIndex: 1, min: 0, max: n, interval: 1, axisLabel: { show: false } },
    ],
    yAxis: [
      { type: 'value', gridIndex: 0, scale: true, name: '价格', nameLocation: 'middle', nameGap: 40 },
      { type: 'value', gridIndex: 1, name: 'MACD', nameLocation: 'middle', nameGap: 30 },
    ],
  };
}

// MACD 柱数据：柱 = DIFF − DEA，红涨绿跌
function macdBars(DIFF, DEA) {
  return DIFF.map((v, i) => ({
    value: [i, +(v - DEA[i]).toFixed(2)],
    itemStyle: { color: v >= DEA[i] ? upColor : downColor },
  }));
}

// DIFF 白线 series（含 0 轴 markLine）
function macdDiffSeries(DIFF) {
  return {
    name: 'DIFF（白线）', type: 'line', xAxisIndex: 1, yAxisIndex: 1,
    data: DIFF.map((v, i) => [i, v]), symbol: 'none',
    lineStyle: { width: 1.8, color: '#94a3b8' }, itemStyle: { color: '#94a3b8' },
    markLine: {
      silent: true, symbol: 'none',
      label: { show: true, position: 'end', formatter: function (p) { return p.name || ''; }, fontSize: 10 },
      data: [{ yAxis: 0, name: '0 轴（多空分界）', lineStyle: { color: '#dc2626', width: 1.6, type: 'solid' }, label: { color: '#dc2626' } }],
    },
  };
}

// DEA 黄线 series
function macdDeaSeries(DEA) {
  return {
    name: 'DEA（黄线）', type: 'line', xAxisIndex: 1, yAxisIndex: 1,
    data: DEA.map((v, i) => [i, v]), symbol: 'none',
    lineStyle: { width: 1.8, color: '#f59e0b' }, itemStyle: { color: '#f59e0b' },
  };
}

// 背驰面积高亮：areas = [{x0, x1, y0, y1, label}]，框出副图上两段柱区域
function macdArea(x0, x1, y0, y1, label) {
  return [{ xAxis: x0, yAxis: y0, name: label }, { xAxis: x1, yAxis: y1 }];
}

// MACD 柱 series（可带背驰面积高亮 markArea）
function macdBarSeries(DIFF, DEA, areas) {
  const s = {
    name: 'MACD 柱', type: 'bar', xAxisIndex: 1, yAxisIndex: 1,
    data: macdBars(DIFF, DEA), barWidth: '55%',
  };
  if (areas && areas.length) {
    s.markArea = {
      silent: true, itemStyle: { color: 'rgba(231,76,60,0.16)' },
      label: { show: true, position: 'insideTop', formatter: function (p) { return p.name || ''; }, color: '#b91c1c', fontSize: 10, fontWeight: 'bold', backgroundColor: '#fff', padding: [2, 4], borderRadius: 3, borderColor: 'rgba(185,28,28,0.3)', borderWidth: 1 },
      data: areas,
    };
  }
  return s;
}
