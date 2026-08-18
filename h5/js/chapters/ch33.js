/* 第33章 底部与短线反弹 */
(function () {

  // ---- 主图1：ECharts 分级底部：月线底分型 → 周线 → 日线逐级确认 ----
  function optCh33() {
    const mp = (i, p, name, color, pos) => ({ coord: [i, p], name, symbol: 'circle', symbolSize: 8, itemStyle: { color }, label: { show: true, color, fontSize: 10, position: pos, distance: 5, fontWeight: 'bold', formatter: function (p) { return p.name; } } });
    const pin = (i, p, name, color) => ({ coord: [i, p], name, symbol: 'pin', symbolSize: 42, itemStyle: { color }, label: { show: true, color, fontSize: 10, fontWeight: 'bold', formatter: function (p) { return p.name; } } });
    const seg = (x, y, name, color, pos) => ({ coord: [x, y], name, symbol: 'none', label: { show: true, color, fontSize: 11, fontWeight: 'bold', position: pos, formatter: function (p) { return p.name; } } });

    // 月线
    const mPts = [4000, 3300, 3500, 2500, 2750, 2284, 2680];
    // 周线
    const wPts = [2284, 2500, 2410, 2620, 2530, 2680, 2600];
    // 日线
    const dPts = [2455, 2360, 2420, 2284, 2380, 2470, 2430];

    const lineSeries = (name, gi, pts) => ({
      name, type: 'line', xAxisIndex: gi, yAxisIndex: gi,
      data: pts.map((p, i) => [i, p]), symbol: 'circle', symbolSize: 4,
      lineStyle: { width: 2, color: '#1f2937' }, itemStyle: { color: '#1f2937' },
    });

    const s0 = lineSeries('月线走势', 0, mPts);
    s0.markArea = {
      silent: true, itemStyle: { color: 'rgba(37,99,235,0.10)' },
      label: { show: true, position: 'insideTop', formatter: function (p) { return p.name || ''; }, color: '#2563eb', fontSize: 11 },
      data: [[{ xAxis: 3, yAxis: 2284, name: '月线底分型区间 (2284, 2952)' }, { xAxis: 6, yAxis: 2952 }]],
    };
    s0.markLine = {
      silent: true, symbol: 'none',
      label: { show: true, position: 'end', formatter: function (p) { return p.name || ''; }, fontSize: 10 },
      data: [
        { yAxis: 2952, name: '分型上沿 2952（需有效站住）', lineStyle: { color: '#2563eb', type: 'dashed', width: 1 } },
        { yAxis: 2284, name: '分型最低 2284（绝对不可破）', lineStyle: { color: '#e74c3c', type: 'dashed', width: 1 }, label: { color: '#e74c3c' } },
      ],
    };
    s0.markPoint = { data: [
      mp(0, 4000, '顶', '#e74c3c', 'top'),
      pin(5, 2284, '月线底分型（大底·2284）', '#16a34a'),
      seg(1.5, 3650, '月线级别下跌', '#e74c3c', 'top'),
    ] };

    const s1 = lineSeries('周线走势', 1, wPts);
    s1.markArea = {
      silent: true, itemStyle: { color: 'rgba(37,99,235,0.08)' },
      label: { show: true, position: 'insideTop', formatter: function (p) { return p.name || ''; }, color: '#2563eb', fontSize: 10 },
      data: [[{ xAxis: 0, yAxis: 2284, name: '周线分型区间 (2284, 2601)' }, { xAxis: 6, yAxis: 2601 }]],
    };
    s1.markLine = {
      silent: true, symbol: 'none',
      label: { show: true, position: 'end', formatter: function (p) { return p.name || ''; }, fontSize: 10 },
      data: [{ yAxis: 2601, name: '周线分型上沿 2601', lineStyle: { color: '#2563eb', type: 'dashed', width: 1 } }],
    };
    s1.markPoint = { data: [
      pin(3, 2620, '站上 2601 → 周线确认', '#2563eb'),
      seg(5.0, 2500, '周线底分型确认', '#2563eb', 'bottom'),
    ] };

    const s2 = lineSeries('日线走势', 2, dPts);
    s2.markLine = {
      silent: true, symbol: 'none',
      label: { show: true, position: 'end', formatter: function (p) { return p.name || ''; }, fontSize: 10 },
      data: [
        { yAxis: 2455, name: '日线分型上沿 2455', lineStyle: { color: '#2563eb', type: 'dashed', width: 1 } },
        { yAxis: 2284, name: '日线分型最低 2284', lineStyle: { color: '#e74c3c', type: 'dashed', width: 1 }, label: { color: '#e74c3c' } },
      ],
    };
    s2.markPoint = { data: [
      pin(3, 2284, '日线区间套·精确买点', '#9333ea'),
      seg(5.0, 2360, '日线逐级确认', '#9333ea', 'bottom'),
    ] };

    return {
      tooltip: { trigger: 'axis', axisPointer: { type: 'cross' } },
      grid: [
        { left: 70, right: 96, top: 30, height: 120 },
        { left: 70, right: 96, top: 196, height: 120 },
        { left: 70, right: 96, top: 362, height: 120 },
      ],
      xAxis: [
        { type: 'value', gridIndex: 0, min: 0, max: 6, interval: 1 },
        { type: 'value', gridIndex: 1, min: 0, max: 6, interval: 1, axisLabel: { show: false } },
        { type: 'value', gridIndex: 2, min: 0, max: 6, interval: 1 },
      ],
      yAxis: [
        { type: 'value', gridIndex: 0, scale: true, name: '月线', nameLocation: 'middle', nameGap: 46 },
        { type: 'value', gridIndex: 1, scale: true, name: '周线', nameLocation: 'middle', nameGap: 46 },
        { type: 'value', gridIndex: 2, scale: true, name: '日线', nameLocation: 'middle', nameGap: 46 },
      ],
      series: [s0, s1, s2],
    };
  }

  // ---- 主图2：反弹分段操作示意（第107课） ----
  const figRebound = `
<div class="fig" style="min-width:320px"><div class="lbl">30 分钟反弹：按 5 分钟节奏分段操作</div>${drawZS(
  [{ p: 10, tag: '底', label: '5分①上' }, { p: 14, tag: '顶', label: '5分②下' }, { p: 11, tag: '底', label: '5分③上' }, { p: 13, tag: '顶', label: '（后上）', color: '#f59e0b' }],
  [{ lo: 11, hi: 13, x0: 0, x1: 3, label: '30分钟中枢 [11,13]（=上下上三个5分钟）' }],
  { zgzd: true, w: 52, h: 140 }
)}<div class="cap">30 分钟反弹绝对性唯一能确定的：<b>至少有一个 30 分钟中枢</b>（上下上三个 5 分钟走势）。<br>操作上<b>不必等“上下上”都完成</b>，从<b>第一上就分段分解操作</b>——每次上之后必有同级别的下，幅度不可控，<br>分段才给你<b>绝对的具体安全</b>。</div></div>`;

  // ---- 主图3：底部的两级定义 + 大中小底 ----
  const figBottom = `
<div class="fig" style="min-width:320px"><div class="lbl">底部：精确定义 vs 分型定义（第108课）</div>
<div style="display:flex;gap:10px;align-items:flex-start;flex-wrap:wrap">
<div style="flex:1;min-width:200px">${drawZS([{ p: 20, tag: '顶' }, { p: 14 }, { p: 17 }, { p: 11 }, { p: 14 }, { p: 10, label: '一买', color: '#16a34a' }, { p: 13, label: '底部构造', color: '#2563eb', above: true }, { p: 12 }], [{ lo: 11, hi: 14, x0: 1, x1: 4, label: '前中枢' }], { w: 30, h: 104 })}</div>
<div style="flex:1;min-width:200px;font-size:12px;line-height:1.9;color:#1f2937">
<b>① 精确定义</b>：一买出现后，到其所引发中枢<b>第一次走出第三类买卖点</b>前，都是底部构造。<b>三卖先出</b>=构造失败；<b>三买先出</b>=构造完成。<br>
<b>② 分型定义</b>：底部=构成<b>底分型</b>的那个区间；<b>跌破最低</b>=失败；<b>站上上沿</b>=成功、至少一笔上。<br>
<b>级别</b>：大底(月) / 中底(周) / 小底(日)。
</div></div>
<div class="cap">关键：<b>不要在底部区间上买</b>，而在<b>区间下探失败时买</b>（与中枢震荡操作一样）。</div></div>`;

  // ---- 讲解点小图 ----

  // ① 反弹的绝对性：至少一个 30 分钟中枢
  const figAbs = mfig('反弹绝对性：至少一个 30 分钟中枢',
    drawZS([{ p: 10, label: '5分①上', color: '#16a34a' }, { p: 14, label: '5分②下', color: '#e74c3c', above: true }, { p: 11, label: '5分③上', color: '#16a34a' }],
      [{ lo: 11, hi: 13, x0: 0, x1: 2, label: '30分钟中枢' }], { w: 40, h: 104 }),
    '某级别中枢=三个以上次级别走势类型重叠；30分钟中枢=上下上三个5分钟');

  // ② 为什么必须分段：奔走型反弹
  const figBenZou = mfig('奔走型：后上高点可能只触及前上低点',
    drawZS([{ p: 10, label: '前上低点', color: '#16a34a' }, { p: 15, label: '前上高点', color: '#e74c3c', above: true }, { p: 11, label: '下', color: '#16a34a' }, { p: 11.5, label: '后上(仅触及)', color: '#f59e0b', above: true }],
      [], { w: 40, h: 104 }),
    '等“上下上”都完成才抛，可能只剩手续费都不够的卖点');

  // ③ 同次级别分解操作
  const figFenduan = mfig('同次级别分解：30分钟反弹按5分钟节奏',
    drawZS([{ p: 10, tag: '底' }, { p: 13, label: '上①(分段)', color: '#16a34a' }, { p: 11, label: '下①', color: '#e74c3c' }, { p: 14, label: '上②', color: '#16a34a', above: true }, { p: 12, label: '下②', color: '#e74c3c' }, { p: 15, label: '上③', color: '#16a34a', above: true }],
      [{ lo: 11, hi: 13, x0: 0, x1: 4, label: '30分钟中枢' }], { w: 34, h: 104 }),
    '每次上之后必有一次同级别的下，分段操作提供绝对安全');

  // ④ 上升趋势最精确定义
  const figTrend = mfig('上升趋势 = 第一中枢后三买 + 非背驰向上',
    drawZS([{ p: 10, tag: '底' }, { p: 13, tag: '顶' }, { p: 11 }, { p: 14, tag: '顶' }, { p: 12, label: '三买', color: '#9333ea' }, { p: 18, label: '非背驰向上', color: '#16a34a', above: true }, { p: 20, tag: '顶' }],
      [{ lo: 11, hi: 13, x0: 1, x1: 4, label: '第一中枢' }], { w: 34, h: 104 }),
    '此后可坐轿子等第二、三、四中枢，出现背驰后三卖再说');

  // ⑤ 精确底部的定义
  const figPrecise = mfig('精确底部：一买后到三买卖点前',
    drawZS([{ p: 20, tag: '顶' }, { p: 14 }, { p: 17 }, { p: 11 }, { p: 14 }, { p: 10, label: '一买', color: '#16a34a' }, { p: 13, label: '底部构造', color: '#2563eb', above: true }, { p: 12 }],
      [{ lo: 11, hi: 14, x0: 1, x1: 4, label: '前中枢' }], { w: 30, h: 104 }),
    '三卖先出=底部构造失败；三买先出=构造完成、展开新行情');

  // ⑥ 分型底部的定义
  const figFenxing = mfig('分型底部：底分型区间',
    '<svg viewBox="0 0 200 92" width="200" height="92" style="display:block">'
    + '<line x1="30" y1="24" x2="150" y2="24" stroke="#2563eb" stroke-dasharray="4 3"/>'
    + '<text x="32" y="18" font-size="9" fill="#2563eb">分型上沿（站上=成功）</text>'
    + '<line x1="30" y1="75" x2="150" y2="75" stroke="#e74c3c" stroke-dasharray="4 3"/>'
    + '<text x="32" y="88" font-size="9" fill="#e74c3c">分型最低（跌破=失败）</text>'
    + '<line x1="55" y1="24" x2="55" y2="50" stroke="#16a34a" stroke-width="1.5"/><rect x="50" y="30" width="10" height="15" fill="#16a34a"/>'
    + '<line x1="85" y1="50" x2="85" y2="75" stroke="#e74c3c" stroke-width="1.5"/><rect x="80" y="55" width="10" height="10" fill="#e74c3c"/>'
    + '<line x1="115" y1="24" x2="115" y2="48" stroke="#16a34a" stroke-width="1.5"/><rect x="110" y="30" width="10" height="14" fill="#16a34a"/>'
    + '</svg>',
    '中间K线最低=底分型；站上分型区间上沿=底部构造成功、至少一笔上');

  // ⑦ 底部有级别：大底/中底/小底
  const figLevel = mfig('底部有级别：大底 / 中底 / 小底',
    '<div style="font-size:12.5px;line-height:2;color:#1f2937"><b style="color:#9333ea">大底</b>＝月线底分型<br><b style="color:#2563eb">中底</b>＝周线底分型<br><b style="color:#16a34a">小底</b>＝日线底分型</div>',
    '日线图上的底分型，对应分型意义上的日线级别底部');

  // ⑧ 区间下探失败时买
  const figBuy = mfig('在区间下探失败时买（不是区间上买）',
    drawZS([{ p: 10, label: '底部区间', color: '#2563eb', above: true }, { p: 8, label: '下探失败', color: '#16a34a' }, { p: 9, label: '买点', color: '#9333ea' }, { p: 12, label: '一笔上', color: '#16a34a', above: true }],
      [{ lo: 9, hi: 11, x0: 0, x1: 3, label: '底分型区间' }], { w: 40, h: 104 }),
    '与中枢震荡操作一样，在区间下探失败时买，才是最好的买点');

  __chapters.push({
    id: 'ch33', vol: '卷七 · 资金心态与综合', title: '第33章 底部与短线反弹', source: '原文第107、108课',
    figures: [
      { kind: 'echarts', title: '分级底部：月线底分型 → 周线 → 日线逐级确认', note: '第108课：底部<b>分级</b>。月线先构造<b>底分型</b>（区间 2284~2952，2284 绝对不可破）；周线<b>站上分型上沿 2601</b>确认；日线再在 2284~2455 区间用<b>区间套</b>精确定位买点。三级别逐级确认，就是从“大底”到“可操作买点”的完整链条。', option: optCh33 },
      { kind: 'html', title: '反弹分段操作示意（第107课）', note: '一个 30 分钟级别反弹，绝对性唯一能确定的就是<b>至少有一个 30 分钟中枢</b>（上下上三个 5 分钟走势）。因为<b>没有任何绝对性保障“最后一个上”比“第一个上”高点更高</b>（奔走型反弹），所以操作必须<b>从第一上就按 5 分钟节奏分段分解</b>，分段提供绝对的具体安全。', html: figRebound },
      { kind: 'html', title: '底部的两级定义与大中小底', note: '<b>精确定义</b>（走势类型角度）：一买出现后到其引发中枢第一次走出第三类买卖点前，都是底部构造；<b>分型定义</b>（粗糙）：底部＝构成底分型的那个区间，跌破最低=失败、站上上沿=成功。关键操作：<b>在区间下探失败时买</b>，而不是在区间上买。', html: figBottom },
    ],
    sections: [
      { type: 'definition', title: '短线反弹的绝对性分段操作（第107课）', items: [
        { term: '① 反弹的绝对性：至少一个中枢', text: '对 30 分钟级别的反弹，<span class="hl">绝对性唯一能指出的就一点：这个反弹至少有一个 30 分钟级别中枢</span>。而某级别的中枢都是由<b>三个以上次级别走势类型重叠</b>构成——一个 30 分钟中枢，一定涉及<b>上下上</b>的三个 5 分钟走势类型。这就是操作绝对性的最坚实基础。', formula: '30分钟反弹 ⇒ 至少 1 个 30分钟中枢（上下上三个5分钟）', fig: figAbs },
        { term: '② 为什么必须分段：奔走型反弹', text: '没有任何绝对性可以保障“上下上”中<b>最后一个上一定比第一个上有更高的高点</b>——特别是<b>奔走型反弹</b>，后上的高点可能只刚好触及前上的低点。若你硬要等“上下上”都完成才抛，很可能面对：第一个上最低点买入，坐完电梯后只剩一个<b>连手续费都不够、稍纵即逝</b>的卖点。', fig: figBenZou },
        { term: '③ 同次级别分解操作', text: '所以具体的反弹操作，一定是<b>同次级别分解</b>方式进行的：<span class="kw">30 分钟级别的反弹，按 5 分钟的节奏去处理。</span>没必要等第二个上——每次上之后都必然有一个同级别的下，而下的幅度又不可能绝对控制，所以不如<b>把操作分段</b>，让分段提供绝对的具体操作安全。', fig: figFenduan },
        { term: '④ 上升趋势最精确定义与坐轿子', text: '第一上与下出现后，走势形式就有了很大绝对性确认：如一个 30 分钟中枢后接<b>第三类买点</b>，然后<b>非背驰力度地强劲拉升</b>，就完全可以开始坐轿子，等第二、三、四、五中枢完成、出现<b>背驰后第三类卖点</b>再说。<span class="hl">上升趋势形成的最精确定义＝第一中枢后出现第三类买点并形成非背驰类向上。</span>', fig: figTrend },
      ]},
      { type: 'definition', title: '底部的分级定义（第108课）', items: [
        { term: '⑤ 精确的底部定义', text: '站在精确走势类型的角度：<span class="hl">第一类买点出现后，到该买点所引发的中枢第一次走出第三类买卖点之前，都可以看成底部构造的过程。</span><b>第三类卖点先出现</b>＝底部构造失败；<b>第三类买点</b>＝底部构造最终完成并展开新行情（顶部反过来定义）。', fig: figPrecise },
        { term: '⑥ 分型的底部定义（粗糙）', text: '用分型角度同样可以给出底部：<b>底部＝构成底分型的那个区间</b>。<span class="kw">跌破分型最低点＝底部构成失败；有效站住分型区间上边沿＝底部构造成功，并至少展开一笔上行情。</span>这办法粗糙一点，但对把握大方向足够。', fig: figFenxing },
        { term: '⑦ 底部有级别：大底 / 中底 / 小底', text: '底部是有级别的：<b>日线图上的底分型，对应分型意义上的日线级别底部</b>。推而广之——<b>大底</b>＝月线级别底分型，<b>中底</b>＝周线级别底分型，<b>小底</b>＝日线级别底分型。级别越大，底部越可靠、行情越持久。', fig: figLevel },
        { term: '⑧ 操作要点与月线案例', text: '<span class="hl">不是在底部的区间上买，而应该和中枢震荡操作一样，在区间下探失败时买——这才是最好的买点。</span>案例：2008 年 8 月月 K 线，9 月能否构造底分型，看区间 <code>(2284, 2952)</code>，<b>2284 绝对不能破</b>；回 2284 不破的任何分型意义上周级别以下走势，都是良好短线买点，可用<b>区间套</b>找最精确位置。', fig: figBuy },
      ]},
      { type: 'motivation', title: '“不预测”的绝对性操作法', text: '第107、108 课共同的思想是：<b>一切操作从绝对性出发，绝不依赖预测</b>。反弹会不会反转？底部成不成立？都不用预测——反弹必有中枢、底部必有分型，这些是<b>必然</b>的；要做的只是把操作<b>分段、分级</b>，在必然的结构点上机械应对。反弹越搞越大自然就成了反转，底部逐级确认自然就成了大底。把预测让给市场，把纪律留给自己。' },
      { type: 'pitfalls', title: '常见误区', items: [
        '等“上下上”都完成才抛反弹（错：奔走型反弹的后上可能只触及前上低点，必须<b>从第一上分段</b>操作）。',
        '去<b>预测</b>反弹还是反转（错：反弹越搞越大自然成反转，唯一要确认的是<b>第一中枢后三买 + 非背驰向上</b>）。',
        '在<b>底部区间上</b>买（错：应在<b>区间下探失败时</b>买）。',
        '把月线 2284 这样的<b>分型最低点</b>轻易跌破当小事（跌破＝底部分型失败，行情至少再推迟）。',
        '<b>等下一大级别行情</b>而放弃当下分段操作（错：任何操作只关心当下这一段，不会分段操作就不该来股票）。',
      ]},
      { type: 'exercises', title: '练习', items: [
        { q: '一个 30 分钟级别反弹，绝对性能确定什么？', a: '<b>至少有一个 30 分钟中枢</b>，而 30 分钟中枢＝<b>上下上三个 5 分钟走势类型</b>的重叠。其余形式（奔走型等）都涉及预测，不能纳入绝对操作计划（第107课）。' },
        { q: '为什么反弹操作要从“第一上”就分段？', a: '因为<b>没有任何绝对性保证“最后一个上”高点更高</b>（奔走型反弹后上只触及前上低点），且每次上之后必有一次幅度不可控的同级别下。分段（同次级别分解）才能提供<b>绝对的具体操作安全</b>（第107课）。' },
        { q: '“底部构造成功/失败”如何用第三类买卖点判断？', a: '一买出现后，看其所引发的中枢<b>第一次走出的是第三类卖点还是买点</b>：<b>三卖先出</b>＝底部构造失败；<b>三买先出</b>＝底部构造完成并展开新行情（第108课）。' },
      ]},
    ],
  });
})();
