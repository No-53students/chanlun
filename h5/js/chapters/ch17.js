/* 第17章 背驰级别与买卖点再分辨 */
(function () {

  function optCh17() {
    const mk = (x0, x1, lo, hi, name) => [{ xAxis: x0, yAxis: lo, name }, { xAxis: x1, yAxis: hi }];
    const mp = (pts, i, name, color, pos) => ({ coord: [i, pts[i]], name, symbol: 'circle', symbolSize: 8, itemStyle: { color }, label: { show: true, color, fontSize: 10, position: pos, distance: 4, fontWeight: 'bold', formatter: function (p) { return p.name; } } });
    const buyPin = (pts, i, name, color, pos) => ({ coord: [i, pts[i]], name, symbol: 'pin', symbolSize: 38, itemStyle: { color }, label: { show: true, color, fontSize: 11, position: pos, distance: 6, fontWeight: 'bold', formatter: function (p) { return p.name; } } });
    const seg = (x, y, name, color, pos) => ({ coord: [x, y], name, symbol: 'none', label: { show: true, color, fontSize: 12, fontWeight: 'bold', position: pos || 'top', formatter: function (p) { return p.name; } } });

    // 级别1：30 分钟（本级别）——下跌趋势背驰 = 第一类买点 = 本级别一买
    const p30 = [20, 16, 18, 14, 17, 11, 14, 10, 13, 8];
    // 级别2：5 分钟（放大）——一买后第一次次级别回调低点 = 第二类买点 = 次级别一买
    const p5 = [8, 13, 11, 15];
    // 级别3：1 分钟（再放大）——离开中枢后回抽不破 ZG = 第三类买点 = 更次级别一买
    const p1 = [10, 13, 11, 14, 12, 16, 14];

    return {
      tooltip: { trigger: 'axis', axisPointer: { type: 'cross' } },
      grid: [
        { left: 60, right: 70, top: 34, height: 110 },
        { left: 60, right: 70, top: 186, height: 100 },
        { left: 60, right: 70, top: 328, height: 100 },
      ],
      xAxis: [
        { type: 'value', gridIndex: 0, min: 0, max: 9, interval: 1 },
        { type: 'value', gridIndex: 1, min: 0, max: 3, interval: 1 },
        { type: 'value', gridIndex: 2, min: 0, max: 6, interval: 1 },
      ],
      yAxis: [
        { type: 'value', gridIndex: 0, scale: true, name: '30分', nameLocation: 'middle', nameGap: 36 },
        { type: 'value', gridIndex: 1, scale: true, name: '5分', nameLocation: 'middle', nameGap: 36 },
        { type: 'value', gridIndex: 2, scale: true, name: '1分', nameLocation: 'middle', nameGap: 36 },
      ],
      series: [
        {
          name: '30分钟级别', type: 'line', xAxisIndex: 0, yAxisIndex: 0,
          data: p30.map((p, i) => [i, p]), symbol: 'circle', symbolSize: 5,
          lineStyle: { width: 2, color: '#1f2937' }, itemStyle: { color: '#1f2937' },
          markArea: {
            silent: true, itemStyle: { color: 'rgba(37,99,235,0.10)' },
            label: { show: true, position: 'insideTop', formatter: function (p) { return p.name || ''; }, color: '#2563eb', fontSize: 10 },
            data: [mk(1, 4, 16, 17, 'A [16,17]'), mk(5, 8, 11, 13, 'B [11,13]')],
          },
          markPoint: {
            data: [
              buyPin(p30, 9, '一买＝本级别背驰点', '#16a34a', 'bottom'),
              seg(4.5, 19.5, '30 分钟下跌趋势（两个中枢）', '#1f2937', 'top'),
            ],
          },
        },
        {
          name: '5分钟级别', type: 'line', xAxisIndex: 1, yAxisIndex: 1,
          data: p5.map((p, i) => [i, p]), symbol: 'circle', symbolSize: 5,
          lineStyle: { width: 2, color: '#1f2937' }, itemStyle: { color: '#1f2937' },
          markPoint: {
            data: [
              mp(p5, 0, '一买后首涨', '#16a34a', 'bottom'),
              buyPin(p5, 2, '二买＝次级别一买', '#2563eb', 'bottom'),
              seg(1.5, 14, '第一次次级别回调', '#2563eb', 'top'),
            ],
          },
        },
        {
          name: '1分钟级别', type: 'line', xAxisIndex: 2, yAxisIndex: 2,
          data: p1.map((p, i) => [i, p]), symbol: 'circle', symbolSize: 5,
          lineStyle: { width: 2, color: '#1f2937' }, itemStyle: { color: '#1f2937' },
          markArea: {
            silent: true, itemStyle: { color: 'rgba(37,99,235,0.10)' },
            label: { show: true, position: 'insideTop', formatter: function (p) { return p.name || ''; }, color: '#2563eb', fontSize: 10 },
            data: [mk(1, 4, 12, 13, '中枢 [12,13]')],
          },
          markLine: {
            silent: true, symbol: 'none',
            lineStyle: { color: '#2563eb', type: 'dashed', width: 1 },
            label: { show: true, position: 'end', formatter: function (p) { return p.name; }, color: '#2563eb', fontSize: 10 },
            data: [{ yAxis: 13, name: 'ZG=13' }, { yAxis: 12, name: 'ZD=12' }],
          },
          markPoint: {
            data: [
              buyPin(p1, 6, '三买＝更次级别一买', '#9333ea', 'bottom'),
              seg(5, 16.5, '离开后回抽不破 ZG', '#9333ea', 'top'),
            ],
          },
        },
      ],
    };
  }

  const figTurn = `
<div class="fig" style="min-width:100%"><div class="lbl">两种转折方式：背驰级别 vs 走势级别（第43课）</div>
<div style="display:flex;gap:20px;align-items:flex-start;flex-wrap:wrap">
  <div style="min-width:220px">${drawZS([{ p: 20, label: '顶', color: '#e74c3c', above: true }, { p: 16 }, { p: 18 }, { p: 14 }, { p: 17 }, { p: 11 }, { p: 14 }, { p: 10 }, { p: 13 }, { p: 8, label: '30分背驰', color: '#16a34a' }, { p: 12, label: '必回拉B', color: '#2563eb', above: true }], [{ lo: 16, hi: 17, x0: 1, x1: 4, label: 'A' }, { lo: 11, hi: 13, x0: 5, x1: 8, label: 'B' }], { w: 30, h: 96, zgzd: true })}<div class="cap" style="color:#16a34a">① 背驰级别 = 走势级别<br>30 分背驰 → <b>必回拉最后中枢 B</b></div></div>
  <div style="min-width:220px">${drawZS([{ p: 20, label: '顶', color: '#e74c3c', above: true }, { p: 16 }, { p: 18 }, { p: 14 }, { p: 17 }, { p: 11 }, { p: 14 }, { p: 10 }, { p: 13, label: 'c段内1分背驰', color: '#f59e0b' }, { p: 9, label: '?', color: '#6b7280' }], [{ lo: 16, hi: 17, x0: 1, x1: 4, label: 'A' }, { lo: 11, hi: 13, x0: 5, x1: 8, label: 'B' }], { w: 30, h: 96, zgzd: true })}<div class="cap" style="color:#f59e0b">② 背驰级别 < 走势级别<br>30 分无背驰、只 c 段内 1 分背驰 → <b>不必然回拉</b>（先成大一级中枢再定方向）</div></div>
</div></div>`;

  __chapters.push({
    id: 'ch17', vol: '卷四 · 背驰与买卖点', title: '第17章 背驰级别与买卖点再分辨', source: '原文第43、53课',
    figures: [
      { kind: 'echarts', title: '同一段走势在三个级别（显微镜）下，三类买点＝各自级别的一买', note: '从上到下是<b>同一段下跌+转折</b>在 30 分、5 分、1 分三个显微镜下的样子：<b>30 分</b>上，下跌趋势背驰点就是<b>第一类买点</b>（本级别一买）；<b>5 分</b>放大看，一买后第一次次级别回调的低点就是<b>第二类买点</b>（次级别一买）；<b>1 分</b>再放大，离开中枢后回抽不破 ZG 的低点就是<b>第三类买点</b>（更次级别一买）。三类买卖点本质是同一件事——某一级别的第一类买卖点。', option: optCh17 },
      { kind: 'html', title: '背驰级别 vs 走势级别的两种转折', note: '第43课强调：<span class="hl">背驰的级别不可能大于当下走势的级别</span>。背驰级别<b>等于</b>走势级别时，必回拉最后中枢；背驰级别<b>小于</b>走势级别时（如 30 分无背驰、只在 c 段内出现 1 分背驰），则不必然回拉。', html: figTurn },
    ],
    sections: [
      { type: 'definition', title: '背驰的级别与走势的级别（第43课）', items: [
        { term: '① 背驰级别 ≤ 走势级别', text: '一个 30 分钟级别的背驰，只可能存在于一个至少 30 分钟级别的走势类型中。<span class="hl">背驰的级别不可能大于当下走势的级别</span>——不能拿小级别去套大级别，也不能在一个 1 分钟的背驰里断言一个年线级别的下跌（那需要一步步级别扩张才慢慢形成）。', formula: '30 分背驰 ∈ 至少 30 分走势 ⇒ 背驰级别 ≤ 走势级别', fig: mfig('背驰级别 ≤ 走势级别', '<div style="font-size:12px;line-height:1.9;color:#1f2937">30 分背驰 存在于 至少 30 分走势<br>∴ <b>背驰级别 ≤ 走势级别</b></div>', '背驰级别不可能大于当下走势级别') },
        { term: '② 转折必然由背驰导致，但级别不一定同', text: '<span class="hl">转折必然由背驰导致，但背驰导致的转折并不一定是同一级别的。</span>某级别的背驰必然导致该级别原走势类型的终止，进而开始该级别或以上级别的另一个走势类型（背驰-转折定理）。', formula: '某级别背驰 → 该级别走势终止 + 该级别或以上级别的新走势', fig: mfig('背驰 → 终止 + 新走势', '<div style="font-size:12px;line-height:1.9;color:#1f2937"><b style="color:#e74c3c">背驰</b> → 原走势<b>终止</b><br>→ 开始<b>同级或更高级</b>的新走势</div>', '转折级别 ≥ 背驰级别') },
        { term: '③ 两种转折方式', text: '按「背驰级别」与「当下走势级别」的关系，转折分两种：<b>① 背驰级别 = 走势级别</b>——背驰至少把走势拉回该走势最后一个中枢（含进入背驰段且最终成立的情况）；<b>② 背驰级别 < 走势级别</b>——走势明显没有相应级别背驰，只出现更小级别背驰，此时<b>不必然回拉</b>，往往先形成一个比该小级别大的中枢，再决定方向。', fig: mfig('两种转折方式', '<div style="font-size:12px;line-height:1.9;color:#1f2937">① <b style="color:#16a34a">同级背驰</b>：必回拉最后中枢<br>② <b style="color:#f59e0b">小级别背驰</b>：不必然回拉</div>', '区分两种转折方式十分关键') },
        { term: '④ 走势类型分解原则', text: '<span class="hl">一个某级别的走势类型中，不可能出现比该级别更大的中枢；一旦出现，就证明这不是一个某级别的走势类型，而是更大级别走势类型的一部分或几个该级别走势类型的连接。</span>分解点一般取背驰点为界。', fig: mfig('走势类型分解原则', '<div style="font-size:12px;line-height:1.9;color:#1f2937">某级别走势中<br><b>出现更大中枢</b> ⇒ 它不是该级别走势<br>而是<b>更大级别走势的一部分</b></div>', '分解点一般取背驰点') },
      ]},
      { type: 'definition', title: '三类买卖点＝不同级别的第一类买卖点（第53课）', items: [
        { term: '⑤ 三类买卖点归根结底都是第一类买卖点', text: '<span class="hl">第一、二、三买卖点，归根结底都可以归到第一类买卖点上，只是级别不同。</span>不统称为「第一类买卖点」，是因为那等于同时用不同级别的显微镜去看、太乱；所以统一在一个级别上研究，才有三类买卖点的分别。', fig: mfig('三类买点 = 三个级别的一买', '<div style="font-size:12px;line-height:1.9;color:#1f2937">一买＝<b>本级别</b>一买<br>二买＝<b>次级别</b>一买<br>三买＝<b>次级别回抽</b>的一买</div>', '同一件事，不同显微镜') },
        { term: '⑥ 三类买点各自的本质', text: '<b>第一类买点</b>＝该级别的背驰点；<b>第二类买点</b>＝第一类买点后第一次次级别回调的低点（放大看是次级别的一买）；<b>第三类买点</b>＝次级别离开中枢后回抽不破 ZG 的低点（放大看也是次级别的一买）。<span class="kw">它们都是不同显微镜下的同一件事——某一级别的第一类买卖点。</span>', formula: '一买＝本级别背驰点　二买＝次级别回调一买　三买＝次级别回抽一买', fig: mfig('三类买点＝不同级别的一买', drawZS([{ p: 8, label: '一买(本级别背驰)', color: '#16a34a' }, { p: 14, tag: '顶' }, { p: 11, label: '二买(次级别回调)', color: '#2563eb' }, { p: 13, tag: '顶' }, { p: 10, tag: '底' }, { p: 16, tag: '顶' }, { p: 13, label: '三买(次级别回抽)', color: '#9333ea' }, { p: 18, tag: '顶' }], [{ lo: 11, hi: 13, x0: 1, x1: 4, label: '中枢 [11,13]' }], { w: 32, h: 100, zgzd: true }), '一买=本级别背驰点；二买=次级别回调低点；三买=次级别回抽不破 ZG') },
        { term: '⑦ 显微镜比喻', text: '级别之于走势，就像用<b>不同倍数的显微镜看一滴水</b>：放大倍数越高，看到的内部结构越精细。当你决定用 30 分钟级别观察时，就已经先把所有完成的 5 分钟走势都看成「没有内部结构的线段」了；要精细定位背驰段内部，再临时换更大的显微镜（区间套）。', fig: mfig('显微镜比喻', '<div style="font-size:12px;line-height:1.9;color:#1f2937">低倍（30分）：5分走势 = 线段<br>高倍（1分）：看背驰段内部<br>换镜头时，次级别即被看成线段</div>', '选什么级别，就把次级别当线段') },
        { term: '⑧ 二、三类买卖点在中枢形成中的意义', text: '<b>第二类买卖点</b>（站在中枢形成角度）的意义是：<span class="hl">必然要形成更大级别的中枢</span>，因为其后至少还有一段次级别走势，且必然与前两段有重叠。<b>第三类买卖点</b>的意义是：<span class="kw">对付中枢的结束</span>——一个级别的中枢结束，无非转成更大的中枢，或上涨/下跌直到形成新的该级别中枢。', fig: mfig('二、三类买点的中枢意义', '<div style="font-size:12px;line-height:1.9;color:#1f2937">二买 ⇒ 必然形成<b>更大级别中枢</b><br>三买 ⇒ 中枢<b>结束</b>的信号</div>', '二、三买点之间都是中枢延续') },
      ]},
      { type: 'motivation', title: '为什么要把买卖点统一到「级别」上', text: '买卖点与背驰，一旦脱离级别，就会变成一锅粥：同一个低点，30 分钟看是第三类买点，5 分钟看可能只是中枢震荡里的一段。第43、53课把「背驰级别 ≤ 走势级别」和「三类买卖点＝不同级别的第一类买卖点」两条定下来，就是给操作装上一套<span class="kw">可切换的显微镜</span>——既不会拿 1 分钟背驰去吓唬自己说年线要崩，也不会在三类买卖点之间迷失，因为它们归根结底是同一件事。' },
      { type: 'pitfalls', title: '常见误区', items: [
        '拿 1 分钟背驰去断言年线级别下跌（错：那需要一步步级别扩张，不是 1 分钟背驰直接造成的）。',
        '以为背驰级别可以大于走势级别（错：背驰级别不可能大于当下走势级别）。',
        '把三类买卖点当成三个互不相干的东西（错：本质都是不同级别的第一类买卖点）。',
        '忘了「用某级别时就把次级别当线段」的显微镜原则，一会儿 30 分、一会儿 1 分，把自己换晕。',
      ]},
      { type: 'exercises', title: '练习', items: [
        { q: '背驰级别和走势级别是什么关系？', a: '背驰级别<b>不可能大于</b>当下走势级别（背驰级别 ≤ 走势级别）。一个 30 分钟背驰只存在于至少 30 分钟的走势类型中。' },
        { q: '三类买卖点本质上是什么？', a: '都是<b>第一类买卖点，只是级别不同</b>：一买＝本级别背驰点；二买＝次级别回调的一买；三买＝次级别回抽的一买。' },
        { q: '背驰级别小于走势级别时，转折与同级背驰有何不同？', a: '同级背驰<b>必回拉最后中枢</b>；小级别背驰<b>不必然回拉</b>，往往先形成一个比该小级别大的中枢，再决定方向。' },
      ]},
    ],
  });
})();
