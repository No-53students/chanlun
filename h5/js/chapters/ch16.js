/* 第16章 a+A+b+B+c 的当下操作 */
(function () {

  function optCh16() {
    const pts = [8, 13, 11, 14, 12, 17, 15, 16, 14, 18, 17, 20, 21, 22];
    const DIFF = [4.0, 2.8, 4.0, 2.6, 6.0, 2.5, 3.2, 2.2, 3.8, 3.2, 3.4, 3.4, 3.4];
    const DEA = [2.2, 2.4, 2.5, 2.6, 2.9, 2.7, 2.8, 2.6, 3.0, 3.0, 3.2, 3.3, 3.4];
    const barData = DIFF.map((v, i) => ({
      value: [i + 0.5, +(v - DEA[i]).toFixed(2)],
      itemStyle: { color: v >= DEA[i] ? '#e74c3c' : '#16a34a' },
    }));
    const mk = (x0, x1, lo, hi, name) => [{ xAxis: x0, yAxis: lo, name }, { xAxis: x1, yAxis: hi }];
    const seg = (x, y, name, color, pos) => ({ coord: [x, y], name, symbol: 'none', label: { show: true, color, fontSize: 12, fontWeight: 'bold', position: pos || 'top', formatter: function (p) { return p.name; } } });
    const mp = (i, name, color, pos) => ({ coord: [i, pts[i]], name, symbol: 'circle', symbolSize: 8, itemStyle: { color }, label: { show: true, color, fontSize: 10, position: pos, distance: 5, fontWeight: 'bold', formatter: function (p) { return p.name; } } });
    return {
      tooltip: { trigger: 'axis', axisPointer: { type: 'cross' } },
      legend: { data: ['走势', 'DIFF（白线）', 'DEA（黄线）', 'MACD 柱'], top: 6 },
      grid: [
        { left: 60, right: 90, top: 46, height: 190 },
        { left: 60, right: 90, top: 300, height: 120 },
      ],
      xAxis: [
        { type: 'value', gridIndex: 0, min: 0, max: 13, interval: 1 },
        { type: 'value', gridIndex: 1, min: 0, max: 13, interval: 1, axisLabel: { show: false } },
      ],
      yAxis: [
        { type: 'value', gridIndex: 0, scale: true, name: '价格', nameLocation: 'middle', nameGap: 40 },
        { type: 'value', gridIndex: 1, name: 'MACD', nameLocation: 'middle', nameGap: 30 },
      ],
      series: [{
        name: '走势', type: 'line', xAxisIndex: 0, yAxisIndex: 0, data: pts.map((p, i) => [i, p]),
        symbol: 'circle', symbolSize: 4, lineStyle: { width: 2, color: '#1f2937' }, itemStyle: { color: '#1f2937' },
        markArea: {
          silent: true, itemStyle: { color: 'rgba(37,99,235,0.10)' },
          label: { show: true, position: 'insideTop', formatter: function (p) { return p.name || ''; }, color: '#2563eb', fontSize: 11 },
          data: [mk(1, 4, 12, 13, '中枢A [12,13]'), mk(5, 8, 15, 16, '中枢B [15,16]')],
        },
        markLine: {
          silent: true, symbol: 'none',
          lineStyle: { color: '#2563eb', type: 'dashed', width: 1 },
          label: { show: true, position: 'end', formatter: function (p) { return p.name; }, color: '#2563eb', fontSize: 10 },
          data: [
            { yAxis: 13, name: 'A ZG=13' },
            { yAxis: 12, name: 'A ZD=12' },
            { yAxis: 16, name: 'B ZG=16' },
            { yAxis: 15, name: 'B ZD=15' },
          ],
        },
        markPoint: {
          data: [
            mp(0, 'a·起点', '#1f2937', 'bottom'),
            mp(3, 'A·GG=14', '#e74c3c', 'top'),
            mp(4, 'b·起点', '#1f2937', 'bottom'),
            mp(5, 'B·GG=17', '#e74c3c', 'top'),
            mp(8, 'B·DD=14', '#16a34a', 'bottom'),
            { coord: [10, 17], name: '三买(17)', symbol: 'pin', symbolSize: 40, itemStyle: { color: '#9333ea' }, label: { show: true, color: '#9333ea', fontSize: 11, position: 'bottom', distance: 24, fontWeight: 'bold', formatter: function (p) { return p.name; } } },
            mp(13, 'c·顶', '#e74c3c', 'top'),
            seg(0.5, 7, 'a', '#1f2937', 'bottom'),
            seg(2.5, 12, 'A', '#2563eb', 'top'),
            seg(4.5, 16.5, 'b', '#1f2937', 'top'),
            seg(6.5, 15, 'B', '#2563eb', 'top'),
            seg(11.5, 23.5, 'c', '#e74c3c', 'top'),
          ],
        },
      },
        {
          name: 'DIFF（白线）', type: 'line', xAxisIndex: 1, yAxisIndex: 1,
          data: DIFF.map((v, i) => [i + 0.5, v]), symbol: 'none',
          lineStyle: { width: 1.8, color: '#94a3b8' }, itemStyle: { color: '#94a3b8' },
          markLine: {
            silent: true, symbol: 'none',
            label: { show: true, position: 'end', formatter: function (p) { return p.name || ''; }, fontSize: 10 },
            data: [{ yAxis: 0, name: '0 轴', lineStyle: { color: '#dc2626', width: 1.6, type: 'solid' }, label: { color: '#dc2626' } }],
          },
        },
        {
          name: 'DEA（黄线）', type: 'line', xAxisIndex: 1, yAxisIndex: 1,
          data: DEA.map((v, i) => [i + 0.5, v]), symbol: 'none',
          lineStyle: { width: 1.8, color: '#f59e0b' }, itemStyle: { color: '#f59e0b' },
        },
        {
          name: 'MACD', type: 'bar', xAxisIndex: 1, yAxisIndex: 1, data: barData, barWidth: '55%',
          markArea: {
            silent: true, itemStyle: { color: 'rgba(231,76,60,0.16)' },
            label: { show: true, position: 'insideTop', formatter: function (p) { return p.name || ''; }, color: '#b91c1c', fontSize: 10, fontWeight: 'bold' },
            data: [
              macdArea(4, 5, 0, 3.4, 'b段红柱面积（大）'),
              macdArea(8, 13, 0, 1.1, 'c段红柱面积（小）'),
            ],
          },
        },
        backchiEffect([[13, 22]], '#e74c3c', 'c 顶背驰：价格新高(22)，c 段红柱面积 < b 段 → c 对 b 背驰，按第32课离场'),
      ],
    };
  }

  const figFlow = `
<div class="fig" style="min-width:100%"><div class="lbl">当下判断的完全分类流程图（第32课 · 30 分钟 a+A+b+B+c）</div>
<div style="font-size:13px;line-height:1.9;color:#1f2937">
  <div style="border:1px solid #2563eb;border-radius:8px;padding:8px 12px;margin:4px 0;background:#eff6ff"><b>起点：A（30 分钟中枢）已走出来，b 段正在生长</b>——A 可用定义严格判别，无任何预测</div>
  <div style="text-align:center;color:#6b7280">↓ 每段次级别走势（5 分钟）完成时，逐一当下判断</div>
  <div style="border:1px solid #e5e7eb;border-radius:8px;padding:8px 12px;margin:4px 0"><b>① 判断 b 段是否背驰</b>（与 a 段比力度）<br>· <span class="bad">b 对 a 背驰</span> → 走（卖出）<br>· <span class="good">b 不背驰</span> → 持有，B 至少与 A 同级别，等它生长</div>
  <div style="text-align:center;color:#6b7280">↓</div>
  <div style="border:1px solid #e5e7eb;border-radius:8px;padding:8px 12px;margin:4px 0"><b>② B 中枢震荡中</b>：每次 5 分钟向上离开后<br>· <span class="bad">离开背驰</span> → 先出来<br>· 看随后的 5 分钟回抽：<span class="good">不回中枢 → 第三类买点 → 回补，等 c 段</span>；回中枢 → 继续震荡</div>
  <div style="text-align:center;color:#6b7280">↓</div>
  <div style="border:1px solid #e5e7eb;border-radius:8px;padding:8px 12px;margin:4px 0"><b>③ c 段（若出现）</b>：与 b 段同法，看当下背驰与否<br>· c 不背驰 → 还有第三个中枢，继续类推<br>· c 背驰 → 走</div>
  <div style="text-align:center;color:#6b7280">↓</div>
  <div style="border:1px solid #16a34a;border-radius:8px;padding:8px 12px;margin:4px 0;background:#f0fdf4"><b>全程不预测</b>：c 段、a 段都不是天经地义的，能否出现全看「第三类买点」是否出现——一切按定义对当下走势<b>完全分类、机械应对</b></div>
</div>
<div class="cap">关键：b 段走不走，不由喜好决定，而由 <b>b 段当下是否对 a 背驰</b> 决定；c 段要出现，必须有针对 30 分钟中枢的<b>第三类买点</b>。</div></div>`;

  __chapters.push({
    id: 'ch16', vol: '卷四 · 背驰与买卖点', title: '第16章 a+A+b+B+c 的当下操作', source: '原文第32课',
    figures: [
      { kind: 'echarts', title: 'a+A+b+B+c 上涨走势的结构', note: '一段 30 分钟上涨被分解为 <code>a+A+b+B+c</code>：<b>a、b、c</b> 是同级别的<b>次级别走势段</b>，<b>A、B</b> 是两个同级别中枢（A 已出现、B 待生长）。蓝色矩形是中枢 A[12,13]、B[15,16]，虚线是各自的 ZG/ZD。下方 MACD：<b>b 段红柱面积（大）明显大于 c 段红柱面积（小）</b>——c 顶（22）创新高但动能减弱，即 <b>c 段对 b 段背驰</b>，按第32课应<b>离场</b>。c 段要出现，必须先有<b>第三类买点</b>（紫色 17，离开 B 后回抽不破 ZG=16）。', option: optCh16 },
      { kind: 'html', title: '当下判断的完全分类流程', note: '第32课的核心思维：<b>不预测，只分类</b>。b 段走不走、c 段有没有、B 是啥级别，都<b>不假设、不幻想</b>，而是按定义对每一个当下的走势做完全分类，机械地买卖点买卖点卖。', html: figFlow },
    ],
    sections: [
      { type: 'definition', title: 'a+A+b+B+c 的结构分解', items: [
        { term: '① a / A / b / B / c 各是什么（第32课）', text: '把一段 30 分钟向上走势分解成 <code>a+A+b+B+c</code>：<span class="hl">A、B 是两个同级别中枢；a、b、c 是连接段，级别最多为次级别</span>（极端情况只是一个跳空缺口）。b 是连接 A、B 的次级别走势段。', formula: 'a+A+b+B+c：A、B＝同级别中枢；a、b、c＝次级别连接段', fig: mfig('a+A+b+B+c 全景', drawZS([{ p: 8, label: 'a', color: '#1f2937' }, { p: 13, tag: '顶' }, { p: 11, tag: '底' }, { p: 14, tag: '顶' }, { p: 12, label: 'b', color: '#1f2937' }, { p: 17, tag: '顶' }, { p: 15, tag: '底' }, { p: 16, tag: '顶' }, { p: 14, tag: '底' }, { p: 18, tag: '顶' }, { p: 15, label: '三买', color: '#9333ea' }, { p: 21, tag: '顶' }, { p: 22, label: 'c', color: '#e74c3c' }], [{ lo: 11, hi: 13, x0: 1, x1: 4, label: 'A' }, { lo: 15, hi: 17, x0: 5, x1: 8, label: 'B' }], { w: 30, h: 100, zgzd: true }), 'A、B 同级别中枢，a、b、c 是次级别连接段') },
        { term: '② b 段的级别限制（第32课）', text: '<span class="hl">b 段一定不可以出现 30 分钟的中枢，也就是最多只能 5 分钟级别。</span>如果 b 段一个 5 分钟级别的开始上涨，已经使得 30 分钟图上不可能出现背驰，那就可以安心等它延伸成一个 5 分钟中枢，直到 5 分钟走势出现背驰——那就意味着 B 要出现了。', fig: mfig('b 段最多 5 分钟级别', drawZS([{ p: 10, tag: '底' }, { p: 13, tag: '顶' }, { p: 11, tag: '底' }, { p: 14, tag: '顶' }, { p: 12, label: 'b(≤5分)', color: '#1f2937' }, { p: 17, tag: '顶' }, { p: 15, tag: '底' }, { p: 16, tag: '顶' }, { p: 14, tag: '底' }], [{ lo: 11, hi: 13, x0: 0, x1: 3, label: 'A' }, { lo: 15, hi: 16, x0: 5, x1: 8, label: 'B' }], { w: 32, h: 100 }), 'b 段里不能出现 30 分钟中枢，最多是 5 分钟级别') },
        { term: '③ c 段与 a 段都不是必然存在（第32课）', text: '<span class="hl">c 段并不是天经地义一定要有的，就像 a 也不是天经地义一定要有的。</span>要出现 c 段，如同要出现 b 段，都必须有一个针对 30 分钟（中枢）的<b>第三类买点</b>出现，这样才会有。', fig: mfig('c 段存在的前提＝三买', drawZS([{ p: 12, tag: '底' }, { p: 15, tag: '顶' }, { p: 13, tag: '底' }, { p: 16, tag: '顶' }, { p: 14, label: '离开', color: '#2563eb' }, { p: 18, tag: '顶' }, { p: 15, label: '三买', color: '#9333ea' }, { p: 20, label: 'c段', color: '#e74c3c' }], [{ lo: 13, hi: 15, x0: 0, x1: 3, label: 'B' }], { w: 34, h: 104, zgzd: true }), '要出现 c 段，如同 b 段，必须有第三类买点') },
        { term: '④ B 的级别可能大于 A（第32课）', text: '当只有 a+A+b 时，<span class="hl">你不可能知道 B 的级别</span>：只要 b 不背驰，B 至少和 A 同级别，但 B 完全可能比 A 的级别大。此时 a+A+b 整体成为 <code>a`</code>，结构变成 <code>a`+B</code>——无论哪种意义，当下操作都无困难，按定义继续看即可。', formula: 'b 不背驰 ⇒ B ≥ A 级别；若 B > A ⇒ a+A+b → a`，成为 a`+B', fig: mfig('a+A+b 变成 a`+B', '<div style="font-size:12px;line-height:1.9;color:#1f2937">当 b 不背驰、B 级别＞A 时：<br><b>a+A+b</b> 整体 → 记作 <b>a`</b><br>于是结构变成 <b>a`+B</b></div>', 'B 完全可能比 A 级别大') },
      ]},
      { type: 'definition', title: '当下的操作法则', items: [
        { term: '⑤ b 段走不走的判据（第32课）', text: '怎么知道 b 段里走还是不走？<span class="hl">这不需要预测——b 段是否走，不是由你的喜好决定，而是由 b 段当下的走势决定。</span>如果 b 段和 a 段相比出现明显的背驰，那就意味着要走；否则，就不走。', fig: mfig('b 段走不走的判据', drawZS([{ p: 8, label: 'a', color: '#1f2937' }, { p: 13, tag: '顶' }, { p: 11, tag: '底' }, { p: 14, tag: '顶' }, { p: 12, label: 'b', color: '#1f2937' }, { p: 17, tag: '顶' }], [{ lo: 11, hi: 13, x0: 1, x1: 4, label: 'A' }], { w: 36, h: 100 }), 'b 对 a 背驰 → 走；不背驰 → 不走') },
        { term: '⑥ 离开背驰先走、回抽不回中枢回补（第32课）', text: '每次 5 分钟向上离开中枢后，<b>一旦背驰就要出来</b>；然后如果一个 5 分钟级别的回拉<b>不回到中枢里</b>，就意味着有第三类买点，那就要回补，等待 c 段的向上。c 段和 b 段的操作完全一样。', fig: mfig('离开背驰先走、回抽不回中枢回补', drawZS([{ p: 12, tag: '底' }, { p: 15, tag: '顶' }, { p: 13, tag: '底' }, { p: 16, tag: '顶' }, { p: 14, label: '背驰走', color: '#e74c3c', above: true }, { p: 18, tag: '顶' }, { p: 15, label: '三买回补', color: '#9333ea' }], [{ lo: 13, hi: 15, x0: 0, x1: 3, label: 'B' }], { w: 36, h: 104, zgzd: true }), '向上离开后背驰先走；回抽不回中枢 → 三买回补') },
        { term: '⑦ 不预测，完全分类机械应对（第32课）', text: '<span class="hl">一切的预测都是没意义的，当下的感应和反应才是最重要的。</span>每一个当下，你只需对「走势是否结束、是否形成买卖点」做<b>完全分类</b>，然后机械应对——走势自然会在 30 分钟延伸出足够的力度，使背驰成为可能或不可能，无须你去预测。', fig: mfig('不预测，完全分类', '<div style="font-size:12px;line-height:1.9;color:#1f2937">不预测走势，只做<b>完全分类</b>：<br>① 走势结束了吗？<br>② 形成买卖点了吗？<br>→ 机械应对，按图操作</div>', '当下地感应与反应，而非幻想') },
      ]},
      { type: 'motivation', title: '为什么「当下」是本课的灵魂', text: '第32课把缠论从「描述系统」推进到「<b>可执行的操作系统</b>」：a+A+b+B+c 不是一张静态结构图，而是<b>一个不断生长的当下过程</b>。A 走出来后你无法预知 B 是否存在、c 是否出现——但你可以对 b 段当下是否背驰、离开中枢后回抽是否回中枢，做完全分类并机械应对。所谓「股票如同跳舞，关键是节奏」，这个节奏就是<span class="kw">当下对走势的感应与反应</span>，而不是对未来的幻想。' },
      { type: 'pitfalls', title: '常见误区', items: [
        '把「走出 B、走出 c」当成预测，幻想有一种神秘力量保证它们必然存在（错：c、a 都不是必然，一切由当下走势决定）。',
        '在 A 刚走出来时就断言一定有 B，或在 b 还没背驰时就幻想走势结束（错：这是预测，不是当下判断）。',
        '只在一个级别上看背驰，不会用区间套到 5 分钟、1 分钟图去观察 b 段如何生长出来。',
        '把「当下操作」误解为「频繁预测」，而不是「完全分类 + 机械应对 + 买卖点买卖点卖」。',
      ]},
      { type: 'exercises', title: '练习', items: [
        { q: '为什么说 b 段里走不走，不需要预测？', a: '因为 b 段是否走由 <b>b 段当下的走势</b>决定：b 对 a 出现明显背驰就走，否则不走。这不需要预知 B 是否必然存在。' },
        { q: 'c 段是不是天经地义一定有的？', a: '不是。要出现 c 段（如同 b 段），必须先有一个针对 30 分钟中枢的<b>第三类买点</b>，否则就没有 c 段。' },
        { q: '当只有 a+A+b 时，能确定 B 的级别吗？', a: '不能。只要 b 不背驰，B <b>至少</b>与 A 同级别，但 B 完全可能比 A 级别大；此时 a+A+b 整体成为 a`，结构变成 a`+B，按定义继续当下操作即可。' },
      ]},
    ],
  });
})();
