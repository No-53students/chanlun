/* 第14章 背驰 · 分步动画：上涨趋势 a+A+b+B+c 逐笔走出，最后用 MACD 红柱面积脉冲揭示「价格新高、动能衰减」的背驰。 */
(function () {

  const P = [
    { p: 8, tag: '底' }, { p: 13, tag: '顶' }, { p: 10, tag: '底' }, { p: 14, tag: '顶' }, { p: 11, tag: '底' },
    { p: 17, tag: '顶' }, { p: 14, tag: '底' }, { p: 18, tag: '顶' }, { p: 15, tag: '底' },
    { p: 21, tag: '顶', label: '一卖·背驰', color: '#e74c3c', above: true },
  ];
  const ZA = [{ lo: 11, hi: 13, x0: 1, x1: 4, label: '中枢A [11,13]' }];
  const ZB = [{ lo: 15, hi: 17, x0: 5, x1: 8, label: '中枢B [15,17]' }];
  const opts = { w: 30, h: 128, zgzd: true };
  const cap = t => '<div style="margin-top:6px;font-size:12px;color:#6b7280;line-height:1.6;max-width:560px">' + t + '</div>';

  // MACD 红柱面积脉冲对比：b 段（大）vs c 段（小），小柱闪烁强调「动能衰减」
  function areaPulse() {
    const bH = 120, cH = 36, h = 180, base = 150, x0 = 52, x1 = 118, x2 = 184, bw = 46;
    const bar = (x, hh, label, sub, cls) =>
      '<rect x="' + x + '" y="' + (base - hh) + '" width="' + bw + '" height="' + hh + '" fill="#e74c3c" rx="3" class="' + cls + '"/>'
      + '<text x="' + (x + bw / 2) + '" y="' + (base - hh - 8) + '" font-size="12" text-anchor="middle" fill="#b91c1c" font-weight="bold">' + label + '</text>'
      + '<text x="' + (x + bw / 2) + '" y="' + (base + 16) + '" font-size="10" text-anchor="middle" fill="#6b7280">' + sub + '</text>';
    return '<svg viewBox="0 0 270 ' + h + '" width="270" height="' + h + '" style="display:block">'
      + '<style>.pulse-c { animation: areaPulse 1.6s ease-in-out infinite; }'
      + '@keyframes areaPulse { 0%,100%{opacity:1} 50%{opacity:.4} }</style>'
      + '<line x1="28" y1="' + base + '" x2="244" y2="' + base + '" stroke="#e5e7eb" stroke-width="1"/>'
      + bar(x0, bH, '6.0', 'b 段红柱面积（大）', '')
      + bar(x2, cH, '1.8', 'c 段红柱面积（小）', 'pulse-c')
      + '</svg>';
  }

  window.__anims = window.__anims || {};
  __anims['ch14'] = {
    title: '背驰：逐笔走出 + 动能面积脉冲',
    steps: [
      { label: '① a 段：向上离开', html: drawZS(P.slice(0, 2), [], opts) + cap('从<b>底 8</b>起步，第一笔向上走到<b>顶 13</b>——这是 a 段（离开段），还没有中枢。') },
      { label: '② 中枢 A：三段重叠', html: drawZS(P.slice(0, 5), ZA, opts) + cap('向上冲高后，走势进入横盘震荡：<b>13→10→14→11</b> 连续三段重叠出区间 <b>[11,13]</b>，这就是<b>中枢 A</b>（ZG=13、ZD=11）。') },
      { label: '③ b 段：向上离开中枢 A', html: drawZS(P.slice(0, 6), ZA, opts) + cap('中枢 A 结束后，走势再次向上，<b>11→17</b> 创新高——这是 b 段（离开中枢 A 的次级别走势）。') },
      { label: '④ 中枢 B：第二个同向中枢', html: drawZS(P.slice(0, 9), ZA.concat(ZB), opts) + cap('b 段冲高后再次横盘：<b>17→14→18→15</b> 重叠出 <b>[15,17]</b>，形成<b>中枢 B</b>。注意它整个在中枢 A 之上——两个同向中枢依次抬高，构成<b>上涨趋势</b>。') },
      { label: '⑤ c 段：创新高 21', html: drawZS(P, ZA.concat(ZB), opts) + cap('中枢 B 结束后，<b>15→21</b> 继续创新高（21＞17）——这是 c 段。单看价格，涨势正猛；但要看「推动上涨的动能」还剩多少。') },
      { label: '⑥ 背驰：价格新高，动能却衰减', html: '<div style="display:flex;gap:20px;align-items:flex-start;flex-wrap:wrap;justify-content:center">' + drawZS(P, ZA.concat(ZB), { w: 26, h: 120 }) + areaPulse() + '</div>' + cap('关键来了：c 段<b>创新高（21＞17）</b>，但下方 MACD 的 <b>c 段红柱面积（1.8）远小于 b 段（6.0）</b>——价格新高、<b>动能却衰减</b>，这就是<span style="color:#e74c3c;font-weight:700">趋势背驰</span>。21 处构成<b>第一类卖点</b>，其后至少回拉中枢 B [15,17]。') },
    ],
  };
})();
