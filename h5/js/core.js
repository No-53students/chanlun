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

// 折线 + 中枢矩形示意：points=[{p,tag}]，zones=[{lo,hi,x0,x1}]（x0/x1 为折线点下标）
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
  });
  for (let i = 0; i < points.length - 1; i++) {
    s += `<line x1="${x(i)}" y1="${y(points[i].p).toFixed(1)}" x2="${x(i + 1)}" y2="${y(points[i + 1].p).toFixed(1)}" stroke="#1f2937" stroke-width="2"/>`;
  }
  points.forEach((pt, i) => {
    if (pt.tag) {
      const c = pt.tag === '顶' ? '#e74c3c' : '#16a34a';
      s += `<circle cx="${x(i)}" cy="${y(pt.p).toFixed(1)}" r="3" fill="${c}"/>`;
    }
  });
  s += '</svg>';
  return s;
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
  return {
    tooltip: { trigger: 'axis', axisPointer: { type: 'cross' } },
    grid: { left: 48, right: 20, top: 24, bottom: 40 },
    xAxis: { type: 'value', min: -0.5, max: idxMax + 0.5, interval: 1, axisLabel: { formatter: '第{value}根' } },
    yAxis: { type: 'value', scale: true },
    legend: { data: ['原始K线', '合并后K线'] },
    series: [
      { name: '原始K线', type: 'candlestick', data: rawData, barWidth: 0.5 },
      { name: '合并后K线', type: 'candlestick', data: mergedData, barWidth: 0.9 },
    ],
  };
}

function optCh3() {
  const topScatter = zf.tops.map(i => ({ value: [zigCats[i], zig[i].h + 0.1] }));
  const bottomScatter = zf.bottoms.map(i => ({ value: [zigCats[i], zig[i].l - 0.1] }));
  return {
    tooltip: { trigger: 'axis', axisPointer: { type: 'cross' } },
    grid: { left: 48, right: 20, top: 24, bottom: 56 },
    xAxis: { type: 'category', data: zigCats, axisLabel: { interval: 1 } },
    yAxis: { type: 'value', scale: true },
    dataZoom: [{ type: 'inside' }, { type: 'slider', height: 18, bottom: 8 }],
    series: [
      { name: 'K线', type: 'candlestick', data: zig.map(k => [k.o, k.c, k.l, k.h]), itemStyle: { color: upColor, color0: downColor, borderColor: upColor, borderColor0: downColor } },
      { name: '顶分型', type: 'scatter', data: topScatter, symbol: 'triangle', symbolRotate: 180, symbolSize: 16, itemStyle: { color: upColor } },
      { name: '底分型', type: 'scatter', data: bottomScatter, symbol: 'triangle', symbolSize: 16, itemStyle: { color: downColor } },
    ],
  };
}

function optCh4() {
  const topScatter = zf.tops.map(i => ({ value: [zigCats[i], zig[i].h + 0.1] }));
  const bottomScatter = zf.bottoms.map(i => ({ value: [zigCats[i], zig[i].l - 0.1] }));
  const biLine = zig.map((k, i) => zbiMap.has(i) ? [zigCats[i], zbiMap.get(i) === 'top' ? k.h : k.l] : null);
  return {
    tooltip: { trigger: 'axis', axisPointer: { type: 'cross' } },
    grid: { left: 48, right: 20, top: 24, bottom: 56 },
    xAxis: { type: 'category', data: zigCats, axisLabel: { interval: 1 } },
    yAxis: { type: 'value', scale: true },
    dataZoom: [{ type: 'inside' }, { type: 'slider', height: 18, bottom: 8 }],
    series: [
      { name: 'K线', type: 'candlestick', data: zig.map(k => [k.o, k.c, k.l, k.h]), itemStyle: { color: upColor, color0: downColor, borderColor: upColor, borderColor0: downColor } },
      { name: '笔', type: 'line', data: biLine, connectNulls: true, symbol: 'none', lineStyle: { color: biColor, width: 2.2 }, z: 10 },
      { name: '顶分型', type: 'scatter', data: topScatter, symbol: 'triangle', symbolRotate: 180, symbolSize: 16, itemStyle: { color: upColor }, z: 20 },
      { name: '底分型', type: 'scatter', data: bottomScatter, symbol: 'triangle', symbolSize: 16, itemStyle: { color: downColor }, z: 20 },
    ],
  };
}

function optCh5() {
  // 笔端点价格 P0..P10：第一段向上线段（底→顶，5 笔）+ 第二段向下线段（顶→底）破坏它
  const ps = [10, 16, 12, 18, 13, 20, 11, 15, 8, 12, 6];
  const cats = ps.map((_, i) => 'P' + i);
  const biLine = ps.map((p, i) => [cats[i], p]);
  const segLine = [[cats[0], ps[0]], [cats[5], ps[5]], [cats[10], ps[10]]];
  return {
    tooltip: { trigger: 'axis', axisPointer: { type: 'cross' } },
    grid: { left: 40, right: 20, top: 24, bottom: 30 },
    xAxis: { type: 'category', data: cats, axisLabel: { interval: 0 } },
    yAxis: { type: 'value', scale: true },
    series: [
      { name: '笔', type: 'line', data: biLine, symbol: 'circle', symbolSize: 5, lineStyle: { color: biColor, width: 1.6 }, itemStyle: { color: biColor } },
      { name: '线段', type: 'line', data: segLine, symbol: 'circle', symbolSize: 8, lineStyle: { color: '#2563eb', width: 3 }, itemStyle: { color: '#2563eb' }, z: 30 },
    ],
  };
}
