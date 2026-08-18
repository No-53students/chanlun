/* 第28章 中枢震荡监视器 */
(function () {

  // ---- 主图1：ECharts 中枢震荡 + 中轴 Z + 次级中轴 Zn 监视 ----
  function optCh28() {
    const pts = [10, 13, 11, 14, 12, 15, 13, 16, 14, 18, 15]; // 围绕中枢 [10,14] 震荡，最后离开并回抽不破 B
    const A = 10, B = 14, Z = 12;
    // 每段次级别走势（相邻两点的区间）的中轴 Zn
    const zn = [11.5, 12, 12.5, 13, 13.5, 14, 14.5, 15, 16, 16.5];
    const znData = zn.map((v, i) => [i + 0.5, v]);
    const mp = (i, name, color, pos) => ({ coord: [i, pts[i]], name, symbol: 'circle', symbolSize: 8, itemStyle: { color }, label: { show: true, color, fontSize: 10, position: pos, distance: 5, fontWeight: 'bold', formatter: function (p) { return p.name; } } });
    const pin = (i, name, color) => ({ coord: [i, pts[i]], name, symbol: 'pin', symbolSize: 42, itemStyle: { color }, label: { show: true, color, fontSize: 10, fontWeight: 'bold', formatter: function (p) { return p.name; } } });
    const seg = (x, y, name, color, pos) => ({ coord: [x, y], name, symbol: 'none', label: { show: true, color, fontSize: 11, fontWeight: 'bold', position: pos, formatter: function (p) { return p.name; } } });
    return {
      tooltip: { trigger: 'axis', axisPointer: { type: 'cross' } },
      grid: { left: 60, right: 70, top: 40, bottom: 40 },
      legend: { data: ['走势', 'Zn 中轴监视线'] },
      xAxis: { type: 'value', min: -0.5, max: 10.5, interval: 1 },
      yAxis: { type: 'value', scale: true, name: '价格' },
      series: [
        {
          name: '走势', type: 'line', data: pts.map((p, i) => [i, p]), symbol: 'circle', symbolSize: 4,
          lineStyle: { width: 2, color: '#1f2937' }, itemStyle: { color: '#1f2937' },
          markArea: {
            silent: true, itemStyle: { color: 'rgba(37,99,235,0.10)' },
            label: { show: true, position: 'insideTop', formatter: function (p) { return p.name || '中枢 [10,14]'; }, color: '#2563eb', fontSize: 11 },
            data: [[{ xAxis: 0, yAxis: A, name: '中枢 [A=10, B=14]' }, { xAxis: 10, yAxis: B }]],
          },
          markLine: {
            silent: true, symbol: 'none',
            label: { show: true, position: 'end', formatter: function (p) { return p.name || ''; }, fontSize: 10 },
            data: [
              { yAxis: Z, name: '中轴 Z = 12（强弱分界）', lineStyle: { color: '#f59e0b', width: 1.6, type: 'dashed' }, label: { color: '#b45309' } },
              { yAxis: B, name: '上沿 B = 14', lineStyle: { color: '#2563eb', type: 'dashed', width: 1 } },
              { yAxis: A, name: '下沿 A = 10', lineStyle: { color: '#2563eb', type: 'dashed', width: 1 } },
              { yAxis: 14.5, name: 'Zn 超越 B → 变盘提醒', lineStyle: { color: '#9333ea', type: 'dashed', width: 1 } },
            ],
          },
          markPoint: {
            data: [
              mp(0, '底·A=10', '#16a34a', 'bottom'),
              mp(3, '顶·B=14', '#e74c3c', 'top'),
              mp(5, '顶（偏强）', '#e74c3c', 'top'),
              mp(9, '顶·离开 18', '#e74c3c', 'top'),
              pin(10, '第三类买点（回抽不破 B）', '#9333ea'),
              seg(1.5, 13.2, '偏弱（Zn 在 Z 下）', '#16a34a', 'bottom'),
              seg(4.5, 14.8, '偏强（Zn 在 Z 上）', '#e74c3c', 'top'),
            ],
          },
        },
        {
          name: 'Zn 中轴监视线', type: 'line', data: znData, symbol: 'circle', symbolSize: 5, connectNulls: false,
          lineStyle: { width: 1.8, color: '#f59e0b', type: 'dashed' }, itemStyle: { color: '#f59e0b' }, z: 20,
          markPoint: {
            data: [
              { coord: [0.5, 11.5], name: 'Zn（偏弱·在 Z 下）', symbol: 'circle', symbolSize: 8, itemStyle: { color: '#16a34a' }, label: { show: true, color: '#16a34a', fontSize: 9, position: 'bottom', formatter: function (p) { return p.name; } } },
              { coord: [1.5, 12], name: 'Zn = Z', symbol: 'circle', symbolSize: 8, itemStyle: { color: '#f59e0b' }, label: { show: true, color: '#b45309', fontSize: 9, position: 'top', formatter: function (p) { return p.name; } } },
              { coord: [6.5, 14.5], name: 'Zn 超越 B → 变盘', symbol: 'pin', symbolSize: 40, itemStyle: { color: '#9333ea' }, label: { show: true, color: '#9333ea', fontSize: 10, position: 'top', fontWeight: 'bold', formatter: function (p) { return p.name; } } },
            ],
          },
        },
      ],
    };
  }

  // ---- 主图2：中轴监视器示意（A、Z、B 等距 + Zn 曲线） ----
  const figMonitor = `
<div class="fig" style="min-width:320px"><div class="lbl">中轴监视器：A、Z、B 三条等距直线</div>
<svg viewBox="0 0 300 176" width="300" height="176" style="display:block">
  <line x1="52" y1="30" x2="292" y2="30" stroke="#2563eb" stroke-dasharray="4 3"/>
  <text x="52" y="23" font-size="10" fill="#2563eb">B 上沿（偏强上限）</text>
  <line x1="52" y1="86" x2="292" y2="86" stroke="#f59e0b" stroke-width="1.6" stroke-dasharray="6 3"/>
  <text x="52" y="79" font-size="10" fill="#b45309">Z 中轴（强弱分界）</text>
  <line x1="52" y1="142" x2="292" y2="142" stroke="#2563eb" stroke-dasharray="4 3"/>
  <text x="52" y="159" font-size="10" fill="#2563eb">A 下沿（偏弱下限）</text>
  <polyline points="58,132 88,102 118,86 148,70 178,56 208,46 238,32 266,22" fill="none" stroke="#e74c3c" stroke-width="2"/>
  <circle cx="58" cy="132" r="3.5" fill="#16a34a"/>
  <circle cx="266" cy="22" r="4" fill="#e74c3c"/>
  <text x="62" y="142" font-size="9" fill="#16a34a">Zn（偏弱）</text>
  <text x="230" y="16" font-size="9" fill="#e74c3c">Zn 超越 B → 变盘</text>
</svg>
<div class="cap">A、Z、B 三条直线<b>等距</b>；<b>Zn</b>（每段次级震荡的中轴）连成曲线。Zn 在 Z 之上＝偏强，在 Z 之下＝偏弱；<b>Zn 最终必然超越 A 或 B</b>，否则永远出不了第三类买卖点。</div></div>`;

  // ---- 讲解点小图 ----

  // ① 必然归宿：第三类买卖点
  const figEnd = mfig('震荡必然以三买卖点结束',
    drawZS([{ p: 10, tag: '底' }, { p: 14, tag: '顶' }, { p: 11 }, { p: 13, tag: '顶' }, { p: 12 }, { p: 15, tag: '顶' }, { p: 13, label: '三买', color: '#9333ea' }],
      [{ lo: 11, hi: 13, x0: 1, x1: 4, label: '中枢 [11,13]' }], { w: 34, h: 104 }),
    '中枢震荡最终一定以某级别第三类买卖点结束');

  // ② 中轴 Z 的定义
  const figZ = mfig('中轴 Z = (A+B)/2',
    drawZS([{ p: 10, label: 'A', color: '#16a34a' }, { p: 14, label: 'B', color: '#e74c3c', above: true }, { p: 11 }, { p: 13 }, { p: 12, label: 'Z', color: '#f59e0b' }],
      [{ lo: 11, hi: 13, x0: 0, x1: 3, label: '中枢 [A,B]' }], { w: 40, h: 104 }),
    '中枢区间一半位置 = 震荡中轴 Z = (A+B)/2');

  // ③ 次级中轴 Zn 的定义
  const figZn = mfig('次级中轴 Zn = 每段次级震荡的一半位置',
    drawZS([{ p: 10, tag: '底' }, { p: 14, tag: '顶', label: 'Zn1', color: '#f59e0b' }, { p: 11, tag: '底' }, { p: 13, tag: '顶', label: 'Zn2', color: '#f59e0b' }, { p: 12, tag: '底' }],
      [{ lo: 11, hi: 13, x0: 1, x1: 4, label: '中枢' }], { w: 38, h: 104 }),
    '每段次级震荡区间的一半位置依次记为 Zn；最标准状态 Zn = Z');

  // ④ 强弱判断
  const figQiangruo = mfig('Zn 在 Z 上=偏强 / 下=偏弱',
    '<div style="display:flex;gap:12px;align-items:flex-end">'
    + drawZS([{ p: 10 }, { p: 13, tag: '顶', label: 'Zn↑', color: '#e74c3c' }, { p: 11.5 }, { p: 13.5, tag: '顶' }], [{ lo: 11, hi: 13, x0: 0, x1: 3, label: '中枢' }], { w: 34, h: 88 })
    + drawZS([{ p: 10 }, { p: 12.5, tag: '顶', label: 'Zn↓', color: '#16a34a' }, { p: 9.5, tag: '底' }, { p: 12, tag: '顶' }], [{ lo: 11, hi: 13, x0: 0, x1: 3, label: '中枢' }], { w: 34, h: 88 })
    + '</div>',
    '左：Zn 在 Z 上=偏强；右：Zn 在 Z 下=偏弱');

  // ⑤ Zn 必然超越 A/B
  const figBiran = mfig('Zn 最终必然超越 A 或 B',
    drawZS([{ p: 10, tag: '底' }, { p: 13, tag: '顶' }, { p: 11 }, { p: 13.5, tag: '顶' }, { p: 12 }, { p: 14.5, tag: '顶', label: '超越B', color: '#e74c3c' }],
      [{ lo: 11, hi: 13, x0: 0, x1: 4, label: '中枢 [A,B]' }], { w: 34, h: 100 }),
    '若不超越 A/B，就永不出现第三类买卖点（显然不可能）');

  // ⑥ 超越 ≠ 必然三买卖点（级别扩展）
  const figKuo = mfig('超越 ≠ 必然三买卖点',
    drawZS([{ p: 10 }, { p: 13, tag: '顶' }, { p: 11 }, { p: 14, tag: '顶', label: '超越', color: '#f59e0b' }, { p: 12, tag: '底' }, { p: 13.5 }],
      [{ lo: 11, hi: 13, x0: 0, x1: 5, label: '级别扩展（大中枢）' }], { w: 34, h: 100 }),
    '超越可多次发生；未构成三买卖点时 → 大概率级别扩展');

  // ⑦ 买点风险与诱多楔型
  const figRisk = mfig('Zn 在 Z/A 之下介入风险大 + 上升楔型诱多',
    drawZS([{ p: 10, label: 'A', color: '#16a34a' }, { p: 12, tag: '顶', label: 'Zn缓升', color: '#f59e0b', above: true }, { p: 10.5, tag: '底' }, { p: 12.5, tag: '顶', label: '楔型', color: '#f59e0b', above: true }, { p: 11, tag: '底' }, { p: 13, tag: '顶', label: '变盘!', color: '#e74c3c', above: true }],
      [{ lo: 11, hi: 13, x0: 0, x1: 4, label: '中枢' }], { w: 34, h: 100 }),
    'Zn 在 Z 甚至 A 之下买入=风险大；Zn 缓升但不破 B → 上升楔型诱多');

  // ⑧ Zn 数量 ≤ 9 + 次级别类型 + 布林
  const figNine = mfig('Zn 不超过 9 个（否则次级别升级）',
    drawZS([{ p: 10 }, { p: 13 }, { p: 11 }, { p: 13.5 }, { p: 11.5 }, { p: 13 }, { p: 11 }, { p: 13.2 }],
      [{ lo: 11, hi: 13, x0: 0, x1: 7, label: '中枢震荡（Zn≤9）' }], { w: 30, h: 96 }),
    'Zn 超过 9 个 → 次级别升级，分析意义不大；配合布林通道把握变盘时间');

  __chapters.push({
    id: 'ch28', vol: '卷六 · 中阴与表里', title: '第28章 中枢震荡监视器', source: '原文第92课',
    figures: [
      { kind: 'echarts', title: '中轴 Z 与次级中轴 Zn：震荡强弱监视器', note: '中枢 <code>[A=10, B=14]</code> 确立后，<b>中轴 Z=12</b>（黄线）是强弱分界；<b>Zn</b>（每段次级震荡的中轴，琥珀虚线连成的曲线）在 Z 之上＝<b>偏强</b>、之下＝<b>偏弱</b>。图中 Zn 从偏弱（11.5）一路升过 Z，最终<b>超越 B（14.5）</b>→ 变盘提醒，随后走势离开中枢、回抽不破 B 出<b>第三类买点</b>。第92课：<b>Zn 最终必然超越 A 或 B</b>，否则永远出不了第三类买卖点。', option: optCh28 },
      { kind: 'html', title: '中轴监视器：A、Z、B 等距 + Zn 曲线', note: 'A、Z、B 三条直线<b>等距</b>；把每段次级震荡的中轴 <b>Zn</b> 依次连成曲线，就构成一个<b>监视中枢震荡强弱的技术指标</b>。Zn 在 Z 上=偏强、在 Z 下=偏弱；<b>超越 A 或 B 是变盘的强力提醒</b>（即便本次不构成三买卖点，也大概率是级别扩展）。', html: figMonitor },
    ],
    sections: [
      { type: 'definition', title: '中轴监视器的定义（第92课）', items: [
        { term: '① 中枢震荡的必然归宿', text: '中枢震荡，<b>最终一定以某级别的第三类买卖点结束</b>。但问题是：如何<b>预先</b>给出有参考价值的提示——监控这震荡是在<b>逐步走强还是逐步走弱</b>。这才是真正有操作价值的问题。', fig: figEnd },
        { term: '② 震荡中轴 Z', text: '一个中枢确立后，<span class="hl">中枢区间的一半位置，称为震荡中轴 Z</span>。若中枢区间为 <code>[A, B]</code>，则 A、Z、B 三条直线<b>刚好等距</b>。', formula: '中轴 Z = (A + B) / 2', fig: figZ },
        { term: '③ 次级中轴 Zn', text: '每一个<b>次级震荡区间</b>的一半位置，依次用 <b>Zn</b> 表示。最标准的状态，就是 Zn 刚好等于 Z，但这是很特殊的例子。<span class="hl">Zn 在 Z 之上，证明震荡偏强；反之偏弱。</span>', fig: figZn },
        { term: '④ Zn 波动曲线 = 监视指标', text: 'Zn 的波动连成曲线，就构成一个<b>监视中枢震荡的技术指标</b>。只要 Zn 平滑地缓慢提高，就能大致预计下一个 Zn 的区间，从而<b>大致算出下一个震荡的高低点</b>（小学数学问题）。', fig: figQiangruo },
      ]},
      { type: 'definition', title: '如何用监视器指导操作（第92课）', items: [
        { term: '⑤ Zn 必然超越 A 或 B', text: '这里存在一种<b>必然关系</b>：最终，<span class="hl">Zn 肯定要超越 A 或 B</span>——如果不这样，就永远不会出现第三类买卖点，这显然是不可能的。', fig: figBiran },
        { term: '⑥ 超越 ≠ 必然三买卖点', text: '反过来，<b>Zn 超越 A 或 B 并不意味着一定出现第三类买卖点</b>——这种超越可以是多次的，只有最后一次才构成第三类买卖点。<span class="kw">如果超越没构成三买卖点，一般都构成中枢震荡级别的扩展</span>（概率极高）。', fig: figKuo },
        { term: '⑦ 买点风险与诱多/诱空楔型', text: '对<b>买</b>来说，Zn 在 Z 之下甚至在 A 之下的，<b>介入风险很大</b>（手脚不麻利就被堵死在交易通道里）。而 Zn <b>缓慢提高、却又没力量突破 B</b> 的，要小心其中蕴藏的突然变盘风险——一般这种走势会构成<b>上升楔型</b>式的诱多图形（反之是下降楔型诱空）。', fig: figRisk },
        { term: '⑧ Zn 数量、次级别类型与布林', text: 'Zn 数量不会过于庞大，<b>不会超过 9 个</b>，超过了次级别就要升级，分析意义不大。<span class="kw">中枢震荡中次级别走势的类型很重要</span>：若是趋势类型且 Zn 配合，尤其最后一个次级别中枢在中枢之外时，一旦下一个次级别走势在该区间完成，震荡就变盘；再结合<b>布林通道的时间把握</b>，对变盘的预见性极高。', fig: figNine },
      ]},
      { type: 'motivation', title: '把“正在震荡”变成“正在变盘前的监视”', text: '中枢震荡期间，多数人只会干等第三类买卖点出现。监视器的价值在于<b>提前</b>：用中轴 Z 与次级中轴 Zn 的<b>相对位置</b>，量化出震荡是<b>偏强还是偏弱</b>；用 Zn <b>是否缓慢逼近/超越 B</b>，提前嗅到变盘的气息。它把一个“被动等待”的中枢震荡，变成一条<b>可监视、可预先布局</b>的曲线。' },
      { type: 'pitfalls', title: '常见误区', items: [
        '把 Zn <b>超越 A/B 直接等同</b>第三类买卖点（错：超越可多次，只有最后一次才构成三买卖点）。',
        '在 Zn <b>位于 Z 甚至 A 之下</b>时贸然买入（介入风险大，容易被堵死在通道里）。',
        '看到 Zn <b>缓慢上移</b>就追多（可能正是上升楔型的诱多，突然变盘风险在积累）。',
        '让 Zn 数据<b>超过 9 个</b>还继续用（此时次级别已升级，指标失效）。',
      ]},
      { type: 'exercises', title: '练习', items: [
        { q: '中轴 Z 和次级中轴 Zn 分别是什么？', a: '<b>Z</b>＝中枢区间的一半位置（Z=(A+B)/2），A、Z、B 三条直线等距；<b>Zn</b>＝每一段次级震荡区间的一半位置，依次记为 Zn。Zn 在 Z 之上＝偏强，之下＝偏弱（第92课）。' },
        { q: '为什么说“Zn 最终必然超越 A 或 B”？', a: '因为中枢震荡<b>最终一定以某级别第三类买卖点结束</b>，而第三类买卖点必须由走势离开中枢制造——若 Zn 永不超越 A 或 B，就永远出不了第三类买卖点，这显然不可能（第92课）。' },
        { q: 'Zn 超越 B 后一定出第三类买点吗？', a: '不一定。超越可以<b>多次</b>发生，只有<b>最后一次</b>才构成第三类买卖点；若某次超越没构成三买卖点，<b>一般都构成中枢震荡的级别扩展</b>（概率极高）。' },
      ]},
    ],
  });
})();
