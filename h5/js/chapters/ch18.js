/* 第18章 小转大定理 */
(function () {

  function optCh18() {
    const mk = (x0, x1, lo, hi, name) => [{ xAxis: x0, yAxis: lo, name }, { xAxis: x1, yAxis: hi }];
    const seg = (x, y, name, color, pos) => ({ coord: [x, y], name, symbol: 'none', label: { show: true, color, fontSize: 12, fontWeight: 'bold', position: pos || 'top', formatter: function (p) { return p.name; } } });
    const mp = (pts, i, name, color, pos) => ({ coord: [i, pts[i]], name, symbol: 'circle', symbolSize: 8, itemStyle: { color }, label: { show: true, color, fontSize: 10, position: pos, distance: 4, fontWeight: 'bold', formatter: function (p) { return p.name; } } });
    const pin = (pts, i, name, color, pos) => ({ coord: [i, pts[i]], name, symbol: 'pin', symbolSize: 38, itemStyle: { color }, label: { show: true, color, fontSize: 11, position: pos, distance: 6, fontWeight: 'bold', formatter: function (p) { return p.name; } } });

    // 上：30 分钟大级别 a+A+b+B+c 上涨，c 段末端创新高（但 30 分无背驰，只在 c 内 1 分背驰）
    const p30 = [8, 13, 10, 14, 11, 17, 14, 18, 15, 21];
    // 下：1 分钟放大 c 段内部——c` 是最后一个 5 分钟中枢，末端 1 分顶背驰 → 拉回 → 跌破 → 三卖 → 大级别转折
    const p1 = [15, 18, 16, 19, 17, 21, 18, 16, 17, 15];

    return {
      tooltip: { trigger: 'axis', axisPointer: { type: 'cross' } },
      grid: [
        { left: 60, right: 80, top: 40, height: 200 },
        { left: 60, right: 80, top: 300, height: 112 },
      ],
      xAxis: [
        { type: 'value', gridIndex: 0, min: 0, max: 9, interval: 1 },
        { type: 'value', gridIndex: 1, min: 0, max: 9, interval: 1 },
      ],
      yAxis: [
        { type: 'value', gridIndex: 0, scale: true, name: '30分', nameLocation: 'middle', nameGap: 36 },
        { type: 'value', gridIndex: 1, scale: true, name: '1分', nameLocation: 'middle', nameGap: 36 },
      ],
      series: [
        {
          name: '30分钟大级别', type: 'line', xAxisIndex: 0, yAxisIndex: 0,
          data: p30.map((p, i) => [i, p]), symbol: 'circle', symbolSize: 5,
          lineStyle: { width: 2, color: '#1f2937' }, itemStyle: { color: '#1f2937' },
          markArea: {
            silent: true, itemStyle: { color: 'rgba(37,99,235,0.10)' },
            label: { show: true, position: 'insideTop', formatter: function (p) { return p.name || ''; }, color: '#2563eb', fontSize: 11 },
            data: [mk(1, 4, 11, 13, '中枢A [11,13]'), mk(5, 8, 15, 17, '中枢B [15,17]')],
          },
          markLine: {
            silent: true, symbol: 'none',
            lineStyle: { color: '#2563eb', type: 'dashed', width: 1 },
            label: { show: true, position: 'end', formatter: function (p) { return p.name; }, color: '#2563eb', fontSize: 10 },
            data: [
              { yAxis: 13, name: 'A ZG=13' },
              { yAxis: 11, name: 'A ZD=11' },
              { yAxis: 17, name: 'B ZG=17' },
              { yAxis: 15, name: 'B ZD=15' },
            ],
          },
          markPoint: {
            data: [
              mp(p30, 9, 'c 顶（仅 1 分背驰）', '#e74c3c', 'top'),
              seg(0.5, 7, 'a', '#1f2937', 'bottom'),
              seg(2.5, 11.5, 'A', '#2563eb', 'top'),
              seg(4.5, 15.5, 'b', '#1f2937', 'top'),
              seg(6.5, 15.5, 'B', '#2563eb', 'top'),
              seg(8.5, 20.5, 'c', '#e74c3c', 'top'),
            ],
          },
        },
        {
          name: '1分钟放大 c 段内部', type: 'line', xAxisIndex: 1, yAxisIndex: 1,
          data: p1.map((p, i) => [i, p]), symbol: 'circle', symbolSize: 5,
          lineStyle: { width: 2, color: '#1f2937' }, itemStyle: { color: '#1f2937' },
          markArea: {
            silent: true, itemStyle: { color: 'rgba(37,99,235,0.10)' },
            label: { show: true, position: 'insideTop', formatter: function (p) { return p.name || ''; }, color: '#2563eb', fontSize: 10 },
            data: [mk(1, 4, 16, 18, 'c` 中枢 [16,18]')],
          },
          markLine: {
            silent: true, symbol: 'none',
            lineStyle: { color: '#2563eb', type: 'dashed', width: 1 },
            label: { show: true, position: 'end', formatter: function (p) { return p.name; }, color: '#2563eb', fontSize: 10 },
            data: [{ yAxis: 18, name: 'c` ZG=18' }, { yAxis: 16, name: 'c` ZD=16' }],
          },
          markPoint: {
            data: [
              pin(p1, 5, '1分顶背驰', '#e74c3c', 'top'),
              pin(p1, 8, '三卖（反抽不升 ZD）', '#9333ea', 'top'),
              seg(0.5, 14, 'c` 是最后 5 分中枢', '#2563eb', 'bottom'),
              seg(7, 11, '拉回 → 跌破 → 三卖 → 大转折', '#16a34a', 'bottom'),
            ],
          },
        },
      ],
    };
  }

  const figChain = `
<div class="fig" style="min-width:100%"><div class="lbl">小转大的判据链（第44课）</div>
<div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;font-size:13px;line-height:1.7">
  <div style="border:1px solid #e74c3c;border-radius:8px;padding:8px 12px;background:#fef2f2"><b>小级别背驰</b><br>（c 段内 1 分顶背驰）</div>
  <div style="color:#6b7280;font-size:18px">→</div>
  <div style="border:1px solid #9333ea;border-radius:8px;padding:8px 12px;background:#faf5ff"><b>最后次级别中枢 c\` 出现三卖</b><br>（必要条件）</div>
  <div style="color:#6b7280;font-size:18px">→</div>
  <div style="border:1px solid #16a34a;border-radius:8px;padding:8px 12px;background:#f0fdf4"><b>大级别转折</b><br>（拉回中枢 B / 反趋势）</div>
</div>
<div class="cap">注意：三卖只是<b>必要条件而非充分条件</b>——有三卖不一定必然大转折，但没有三卖，就<b>不可能</b>转成大级别转折。</div></div>`;

  __chapters.push({
    id: 'ch18', vol: '卷四 · 背驰与买卖点', title: '第18章 小转大定理', source: '原文第44课',
    figures: [
      { kind: 'echarts', title: '大级别末端的小背驰 + 末次中枢三卖（双图）', note: '上图为 30 分钟 <code>a+A+b+B+c</code> 上涨：c 段创新高（21），但 30 分钟图上<b>并无 30 分背驰</b>，只在 c 段内部出现<b>1 分顶背驰</b>。下图为把 c 段放大到 1 分钟：<code>c\`</code> 是 c 中最后一个 5 分钟中枢，1 分顶背驰后走势拉回 c\`，随后跌破、反抽不升破 c\` 的 ZD=16，出现<b>第三类卖点</b>——于是引发大级别（30 分）转折，拉回中枢 B。', option: optCh18 },
      { kind: 'html', title: '小转大的判据链', note: '<b>小背驰 → 末次中枢三卖 → 大级别转折</b>。核心是「三卖」这个<b>必要条件</b>：没有末次次级别中枢的第三类买卖点，小级别背驰不可能转成大级别转折。', html: figChain },
    ],
    sections: [
      { type: 'definition', title: '小转大定理', items: [
        { term: '① 小转大的问题（第44课）', text: '向上 30 分钟 <code>a+A+b+B+c</code>，如果 c 只是一个 1 分钟级别的背驰，最终却引发下跌拉回中枢 B——<b>一个级别足够小的背驰，可以引发比它大级别的转折</b>（不一定只引发同级别转折）。这就是「小级别背驰引发大级别转折」，简称<span class="hl">小转大</span>。', fig: mfig('小背驰引发大转折', '<div style="font-size:12px;line-height:1.9;color:#1f2937"><b style="color:#e74c3c">1 分背驰</b>（小）<br>⇒ 引发<b style="color:#16a34a">30 分转折</b>（大）</div>', '小级别背驰不一定只引发同级别转折') },
        { term: '② 小背驰-大转折定理（必要条件）', text: '<span class="hl">小级别顶背驰引发大级别向下的<b>必要条件</b>是：该级别走势的<b>最后一个次级别中枢出现第三类卖点</b>；小级别底背驰引发大级别向上的必要条件是：该级别走势的最后一个次级别中枢出现第三类买点。</span>', formula: '小级别顶背驰 → 大级别向下 ⇐ 最后次级别中枢出三卖（必要）', fig: mfig('定理：三卖是必要条件', drawZS([{ p: 12, tag: '底' }, { p: 15, tag: '顶' }, { p: 13, tag: '底' }, { p: 16, tag: '顶' }, { p: 13, tag: '底' }, { p: 19, label: '顶背驰', color: '#e74c3c', above: true }, { p: 14, label: '拉回', color: '#2563eb' }, { p: 11, label: '三卖', color: '#9333ea' }], [{ lo: 13, hi: 15, x0: 1, x1: 4, label: 'c` 中枢 [13,15]' }], { w: 34, h: 104, zgzd: true }), '顶背驰(19)后拉回 c`，跌破后反抽不升破 ZD=13 → 三卖 → 大级别转折') },
        { term: '③ 只有必要条件，没有充分条件', text: '<span class="hl">三卖（三买）只是小转大的必要条件，而非充分条件。</span>小级别顶背驰后，最后次级别中枢出现三卖<b>并不一定</b>就必然导致大级别转折，也不必然回到最后的该级别中枢 B 里。所以它比「背驰级别=走势级别」那条必然回拉中枢的结论要<b>弱一点</b>。', fig: mfig('必要 vs 充分', '<div style="font-size:12px;line-height:1.9;color:#1f2937">三卖 ⇒ 小转大：<b>不一定</b><br>无三卖 ⇒ 小转大：<b>不可能</b><br>（只保证<b>必要</b>，不保证<b>充分</b>）</div>', '比「同级背驰必回拉中枢」弱一点') },
        { term: '④ c 至少要包含一个 5 分钟中枢', text: 'c 里<b>至少要包含一个 5 分钟中枢</b>，否则中枢 B 就不可能完成——因为那样不可能形成一个第三类买点。设 <code>c`</code> 是 c 中最后一个 5 分钟中枢，那个 1 分钟顶背驰<b>只能出现在 c` 之后</b>，并且<b>必然使走势拉回 c` 里</b>。', fig: mfig('c 至少含一个次级别中枢', drawZS([{ p: 14, tag: '底' }, { p: 17, tag: '顶' }, { p: 15, tag: '底' }, { p: 18, tag: '顶' }, { p: 16, label: '三买', color: '#9333ea' }, { p: 20, label: 'c段', color: '#e74c3c' }], [{ lo: 15, hi: 17, x0: 0, x1: 3, label: 'B' }], { w: 34, h: 100, zgzd: true }), '没有 c` 就没有三买，B 就不算完成') },
        { term: '⑤ 能正常震荡的，都不转大级别', text: '背驰后的整个运动都可看成围绕 <code>c`</code> 的震荡。<span class="hl">对于那些小级别背驰后能在最后一个次级别中枢正常震荡的，都不可能转化成大级别转折</span>；要出现大的向下变动，必然要出现 <code>c`</code> 的第三类卖点。', fig: mfig('正常震荡 = 不转大级别', '<div style="font-size:12px;line-height:1.9;color:#1f2937">背驰后<b>围绕 c` 正常震荡</b><br>⇒ <b>不</b>转大级别<br>要转大，必须<b>c` 出三卖</b></div>', '震荡正常则不转，出三卖才可能转') },
        { term: '⑥ 可转 2 级、3 级……原理相同', text: '小转大不限于只转一级：<b>1 分背驰转 5 分级</b>看最后个 1 分中枢的三卖，<b>1 分背驰转 30 分级</b>看最后个 5 分中枢的三卖，<b>逐级扩展转日线</b>就看最后个 30 分中枢的三卖……原理完全相同。注意该「最后个次级别中枢」是<b>动态的</b>，不一定是小级别背驰点之前那个中枢。', fig: mfig('逐级扩展，原理相同', '<div style="font-size:12px;line-height:1.9;color:#1f2937">转 5 分 → 看最后 1 分中枢三卖<br>转 30 分 → 看最后 5 分中枢三卖<br>转日线 → 看最后 30 分中枢三卖</div>', '最后次级别中枢是动态的') },
      ]},
      { type: 'motivation', title: '为什么小转大值得单独一讲', text: '前面只讲了「背驰级别 = 走势级别」这一最标准、最常见的情况。真正困难的，是「背驰级别 < 走势级别」：一个 1 分钟背驰，凭什么能把 30 分钟的上涨打回中枢 B？第44课给出判据——<span class="hl">看最后个次级别中枢是否出第三类买卖点</span>。它让「小背驰」不再是一句吓人的猜测，而是一个可以被当下确认、可机械应对的<span class="kw">必要信号</span>。' },
      { type: 'pitfalls', title: '常见误区', items: [
        '以为只要出现小级别背驰就必然大转折（错：三卖只是必要条件，无充分条件）。',
        '忽略了「能在最后次级别中枢正常震荡的都不转大级别」这一关键结论。',
        '忘了最后次级别中枢是<b>动态的</b>，死扣背驰点之前的那个中枢去找三卖。',
        '把 1 分钟背驰直接当成 30 分钟背驰去全仓操作（错：级别不匹配，操作程序也不同）。',
      ]},
      { type: 'exercises', title: '练习', items: [
        { q: '小转大的必要条件是什么？', a: '该级别走势的<b>最后一个次级别中枢出现第三类卖点</b>（小级别顶背驰转大级别向下），或第三类买点（小级别底背驰转大级别向上）。' },
        { q: '为什么说三卖只是必要条件而非充分条件？', a: '小级别背驰后末次中枢出三卖，<b>不一定</b>必然导致大级别转折，也不必然回到 B；但<b>没有</b>三卖，就<b>不可能</b>转成大级别转折。' },
        { q: 'c 里为什么要至少有一个 5 分钟中枢？', a: '否则中枢 B 不可能完成（无法形成第三类买点）。那个 1 分钟顶背驰只能出现在 c` 之后，并<b>必然使走势拉回 c`</b>。' },
      ]},
    ],
  });
})();
