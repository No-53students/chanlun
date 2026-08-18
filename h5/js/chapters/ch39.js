/* 第39章 缠论的关键 + 递归补课 */
(function () {

  function optCh39() {
    // 上：f1 最低级别（分型→笔→线段）；下：f2 三段低级别走势 → 高级别中枢/走势类型
    const lowPts = [10, 12, 11, 13, 12, 14, 12.5, 15];
    const highPts = [10, 12, 11, 13.5, 12.5, 15, 14, 16.5];

    const mkArea = (x0, x1, lo, hi, name) => [{ xAxis: x0, yAxis: lo, name }, { xAxis: x1, yAxis: hi }];
    const segLbl = (x, y, t, color) => ({ coord: [x, y], name: t, symbol: 'none', label: { show: true, color: color || '#1f2937', fontSize: 11, fontWeight: 'bold', position: 'top' } });
    const dot = (x, y, c, pos, t) => ({ coord: [x, y], name: t, symbol: 'circle', symbolSize: 8, itemStyle: { color: c }, label: { show: true, color: c, fontSize: 9, position: pos, distance: 3, fontWeight: 'bold', formatter: function (p) { return p.name; } } });

    function mkSeries(gi, name, pts, areas, points, color) {
      return {
        name, type: 'line', xAxisIndex: gi, yAxisIndex: gi,
        data: pts.map((p, i) => [i, p]),
        symbol: 'circle', symbolSize: 5,
        lineStyle: { width: 2.2, color: color }, itemStyle: { color: color },
        markArea: areas ? {
          silent: true, itemStyle: { color: 'rgba(37,99,235,0.12)' },
          label: { show: true, position: 'insideTop', formatter: function (p) { return p.name || ''; }, color: '#2563eb', fontSize: 11, fontWeight: 'bold' },
          data: areas,
        } : undefined,
        markPoint: { data: points },
      };
    }

    const lowPoints = [
      dot(0, 10, '#16a34a', 'bottom', '底分型'),
      dot(1, 12, '#e74c3c', 'top', '顶分型'),
      dot(3, 13, '#e74c3c', 'top', '顶分型'),
      dot(5, 14, '#e74c3c', 'top', '顶分型'),
      dot(7, 15, '#e74c3c', 'top', '顶分型'),
      segLbl(3.5, 9.6, 'f1：分型 → 笔 → 线段（最低级别）', '#f59e0b'),
    ];
    const highPoints = [
      dot(0, 10, '#16a34a', 'bottom', '低级别走势'),
      dot(7, 16.5, '#e74c3c', 'top', '高级别走势'),
      segLbl(2.5, 14.3, 'f2：三段低级别走势重叠 → 高级别中枢', '#2563eb'),
    ];

    return {
      tooltip: { trigger: 'axis', axisPointer: { type: 'cross' } },
      grid: [
        { left: 58, right: 90, top: 32, height: 150 },
        { left: 58, right: 90, top: 236, height: 150 },
      ],
      xAxis: [
        { type: 'value', gridIndex: 0, min: 0, max: 7, interval: 1 },
        { type: 'value', gridIndex: 1, min: 0, max: 7, interval: 1, axisLabel: { show: false } },
      ],
      yAxis: [
        { type: 'value', gridIndex: 0, min: 8, max: 16, name: 'f1 最低级别', nameLocation: 'middle', nameGap: 42 },
        { type: 'value', gridIndex: 1, min: 8, max: 18, name: 'f2 高级别', nameLocation: 'middle', nameGap: 42 },
      ],
      series: [
        mkSeries(0, '最低级别：分型/笔', lowPts, null, lowPoints, '#f59e0b'),
        mkSeries(1, '高级别：中枢/走势类型', highPts, [mkArea(1, 4, 11, 13.5, '高级别中枢 [11,13.5]')], highPoints, '#2563eb'),
      ],
    };
  }

  const figCompare = `
<div class="fig" style="min-width:360px"><div class="lbl">缠论 vs 波浪 / 江恩：数学化 vs 主观数浪</div>
<div style="display:flex;gap:12px;align-items:stretch;font-size:12.5px">
  <div style="flex:1;background:#eef2ff;border:1px solid #c7d2fe;border-radius:8px;padding:10px;color:#1f2937">
    <b style="color:#3730a3">缠论（本ID）</b><br>
    · 从几何定义出发，<b>严格、可递归</b><br>
    · <b>当下直观</b>：走势"正在干什么"<br>
    · 现象都能解释，并给出<b>成立界限</b><br>
    · 唯一分解（走势必完美）
  </div>
  <div style="flex:1;background:#fef2f2;border:1px solid #fecaca;border-radius:8px;padding:10px;color:#1f2937">
    <b style="color:#991b1b">波浪 / 江恩 / 周期</b><br>
    · 从<b>神秘先验前提</b>出发<br>
    · "推动浪5波、调整浪3波"<br>
    · 把<b>或然当必然</b>，实战错漏百出<br>
    · 只能当庄家做骗线的工具
  </div>
</div>
<div class="cap">第19课：缠论的<b>关键</b>是数学化、几何化、当下直观——不靠事后主观数浪，而是几何的严格定义。</div></div>`;

  // ---- 讲解点小图 ----
  const figGeo = mfig('① 几何化：严格定义 + 可递归',
    '<div style="font-size:12px;line-height:1.9;color:#1f2937">分型 → 笔 → 线段 → 中枢 → 走势类型<br>每一步都是<b style="color:#2563eb">几何的严格定义</b></div>',
    '像几何证明一样严格，不靠"波浪"的先验前提');

  const figNow = mfig('② 当下直观：不预测，看正在干什么',
    drawZS([{ p: 10, tag: '底' }, { p: 12, tag: '顶' }, { p: 11, label: '当下', color: '#9333ea' }, { p: 13, tag: '顶' }, { p: 11.5, tag: '底' }],
      [{ lo: 11, hi: 12, x0: 0, x1: 4, label: '中枢' }],
      { w: 40, h: 96 }),
    '不预测后面涨跌，只看"当下"处于中枢什么位置');

  const figSys = mfig('③ 三个独立系统',
    '<div style="font-size:12px;line-height:1.9;color:#1f2937">① 基本面　② 比价关系　③ 技术分析<br><span style="color:#6b7280">技术：对散户最公平、第一手、最直接</span></div>',
    '技术分析只是三个独立系统之一，但最公平可得');

  const figRec = mfig('④ 递归 f1 / f2：级别解决循环定义',
    drawZS([{ p: 10, tag: '底' }, { p: 12, tag: '顶' }, { p: 11, tag: '底' }, { p: 13, tag: '顶' }, { p: 12, tag: '底' }, { p: 14, tag: '顶' }],
      [{ lo: 11, hi: 13, x0: 0, x1: 5, label: '高级别中枢' }],
      { w: 34, h: 96 }),
    '三段低级别走势重叠，递归出高一级别中枢');

  const figLowest = mfig('⑤ 三笔相同价位 = 最低级别中枢',
    klineSVG([mk(9.9, 10.1), mk(9.9, 10.1), mk(9.9, 10.1)], { w: 26, h: 66 }),
    '连续三笔相同价位交易，构成最低级别中枢');

  const figTh1 = mfig('⑥ 分解定理一：三种走势类型连接',
    drawZS([{ p: 11, label: '盘整', color: '#2563eb' }, { p: 10, label: '盘整', color: '#2563eb' }, { p: 9, label: '下跌', color: '#16a34a' }, { p: 8, label: '下跌', color: '#16a34a' }, { p: 10, label: '上涨', color: '#e74c3c' }, { p: 12, label: '上涨', color: '#e74c3c' }],
      [], { w: 40, h: 96 }),
    '任何走势都可分解成同级别盘整、下跌、上涨的连接');

  const figTh2 = mfig('⑦ 分解定理二 + 结合律',
    '<div style="font-size:11.5px;line-height:1.9;color:#1f2937">a+B+b = a+B1+B2+B3+b<br>= (a+B1)+B2+(B3+b)<br><span style="color:#6b7280">三段都是5分钟走势类型</span></div>',
    '结合律成立、交换律不成立');

  const figBsp = mfig('⑧ 买卖点级别定理',
    drawZS([{ p: 10, tag: '底', label: '次级别买点' }, { p: 12, tag: '顶' }, { p: 11, tag: '底' }, { p: 13, tag: '顶' }, { p: 10.5, tag: '底', label: '大级别买点', color: '#9333ea' }],
      [{ lo: 11, hi: 12, x0: 0, x1: 3, label: '中枢' }],
      { w: 36, h: 100 }),
    '大级别买点的极限点，落在次级别以下某级别买点上');

  __chapters.push({
    id: 'ch39', vol: '卷八 · 理论深化', title: '第39章 缠论的关键 + 递归补课', source: '原文第19、35、84课',
    figures: [
      { kind: 'echarts', title: '递归 f1 / f2：低级别走势递归出高级别中枢', note: '第35课：中枢与走势类型相互依存，若无级别就会<b>循环定义</b>；引入级别后，用<b>递归函数</b>严格展开。上图 <code>f1</code>：最低级别的<b>分型 → 笔 → 线段</b>；下图 <code>f2</code>：<span class="hl">三段低级别走势类型的重叠，构成高一级别的中枢与走势类型</span>。如此逐级上推，各级别中枢与走势类型都被严格定义，不再循环。', option: optCh39 },
      { kind: 'html', title: '缠论 vs 波浪 / 江恩：数学化 vs 主观数浪', note: '第19课：缠论与一切既有技术分析的根本思路不同——波浪（推动浪5波、调整浪3波）、江恩、周期等，都从<b>神秘的先验前提</b>出发、把<b>或然当必然</b>；缠论则像几何一样<b>严格定义、可递归</b>。其意义不是预测市场要干什么，而是<b>当下直观</b>——看清市场"正在干什么"。', html: figCompare },
    ],
    sections: [
      { type: 'definition', title: '缠论技术分析理论的关键（第19课）', items: [
        { term: '① 数学化 / 几何化的严格定义', text: '一般技术分析（指标、波段、波浪、江恩、神经网络）都从<b>神秘的先验前提</b>出发，把<b>或然的东西当成必然</b>，理论上头头是道，一用就错漏百出。而本ID理论整个推导过程<b>和几何里毫无区别</b>，从严格定义出发、可递归。<span class="hl">其他理论说的现象，都能在本ID理论中得到解释，还能给出其成立的相应界限。</span>', fig: figGeo },
        { term: '② 当下直观：不是预测，是正在干什么', text: '技术分析的最终意义，<b>不是去预测市场要干什么，而是市场正在干什么</b>——一种<span class="kw">当下的直观</span>。<span class="hl">市场上所有的错误，都是离开了这当下的直观，用想象、用情绪来代替。</span>市场规律是动态的，在不同级别合力作用下显示出来，企图用单纯的指标、波浪去预测，只会错漏百出。', fig: figNow },
        { term: '③ 技术分析只是三个独立系统之一', text: '技术分析系统在本ID理论中只是<b>三个独立系统</b>（基本面、比价关系、技术）之一。它之所以重要，是因为对一个完全没有消息的散户，<b>技术走势是最公平、最容易得到的第一手资料</b>——完全公开、没有先后秘密。单凭技术分析的精通与资金管理的合理应用，就能长期有效战胜市场。', fig: figSys },
      ]},
      { type: 'definition', title: '递归补课：中枢与走势类型的严格定义（第35课）', items: [
        { term: '④ 递归函数 f1 / f2：级别解决循环定义', text: '最基础的两方面——<b>中枢</b>与<b>走势类型及其连接</b>——相互依存：没有走势类型，中枢无法定义；没有中枢，走势无法分类型。如果就此打住，<b>循环定义</b>不可避免；要解决循环，<b>级别</b>不可缺少。有了级别，严格的递归定义才可展开：<code>f1</code> 从最低级别定义分型、笔、线段；<code>f2</code> 把低级别走势类型重叠成高级别中枢与走势类型。', formula: 'f1：分型→笔→线段（最低级别）　f2：三段低级别走势→高级别中枢', fig: figRec },
        { term: '⑤ 最低级别的定义（量子化起点）', text: '最低级别如量子力学的<b>量子</b>：物理世界不是无限连续的，市场交易也一样。最严格定义下，<b>每笔交易是最低级别</b>，连续三笔相同价位的交易就构成<b>最低级别的中枢</b>。有一个最低级别中枢的走势是最低级别盘整；有两个（第二个更高）就是最低级别上涨趋势，反之（第二个更低）就是最低级别下跌趋势。', formula: '连续三笔相同价位的交易 = 最低级别中枢', fig: figLowest },
        { term: '⑥ 走势分解定理一：三种走势类型的连接', text: '<span class="kw">缠中说禅走势分解定理一</span>：<span class="hl">任何级别的任何走势，都可以分解成同级别"盘整""下跌""上涨"三种走势类型的连接。</span>这意味着按某种级别操作，就等于永远只处理三种同一级别的走势类型及其连接。', formula: '任何走势 = 同级别「盘整 + 下跌 + 上涨」的连接', fig: figTh1 },
        { term: '⑦ 走势分解定理二 + 结合律', text: '<span class="kw">缠中说禅走势分解定理二</span>：<span class="hl">任何级别的任何走势类型，都至少由三段以上次级别走势类型构成。</span>（因为中枢里至少有三段次级别走势类型。）其证明要点：<b>走势类型连接符合结合律，但不符交换律</b>。', formula: '任何走势类型 ≥ 三段次级别走势类型；a+B+b=(a+B1)+B2+(B3+b)', fig: figTh2 },
        { term: '⑧ 买卖点级别定理', text: '<span class="kw">缠中说禅买卖点级别定理</span>：<span class="hl">大级别的买卖点，必然是次级别以下某一级别的买卖点。</span>注意"次级别以下"而非"次级别"——这也解释了为什么有时一个 1 分钟的背驰就会引发大级别的下跌。', formula: '大级别买卖点 ∈ 次级别以下某一级别买卖点', fig: figBsp },
      ]},
      { type: 'motivation', title: '从"先验猜测"到"几何定义"', text: '波浪理论、江恩理论之所以"一用就错"，根源在它们把<b>或然当必然</b>、从先验前提出发；而缠论用<b>几何化、可递归</b>的严格定义，把走势建立在"分型→笔→线段→中枢→走势类型"这一可逐级上推的递归体系上。第35课就是给基础差的同学补上这一课：<b>中枢与走势类型怎么被递归地严格定义出来</b>。理解了这个递归骨架，缠论才从"一堆术语"变成"一套可以自己生长、自己证明的理论"。' },
      { type: 'pitfalls', title: '常见误区', items: [
        '以为学缠论要先学波浪/江恩打底（错：要把以前一切技术方法<b>先放下</b>，根本思路不同）。',
        '把技术分析当<b>预测工具</b>（错：其意义是"当下直观"，看清正在干什么，不是预测未来）。',
        '认为缠论<b>只管技术、不管基本面</b>（错：技术只是三系统之一，基本面须在几何理论关照下才有意义）。',
        '把"级别"当随意可选的周期（错：级别是<b>递归定义</b>出来的，最低级别=每笔交易）。',
        '以为走势类型连接符合<b>交换律</b>（错：只符合结合律，不符合交换律）。',
      ]},
      { type: 'exercises', title: '练习', items: [
        { q: '缠论与波浪理论、江恩理论的根本区别是什么？', a: '波浪/江恩从<b>神秘先验前提</b>出发、把<b>或然当必然</b>；缠论则从<b>几何的严格定义</b>出发，数学化、可递归、当下直观，还能给出其他理论结论成立的<b>界限</b>。' },
        { q: '为什么说"有了级别，递归定义才可展开、循环定义才被解决"？', a: '中枢与走势类型<b>相互依存</b>，若无级别会<b>循环定义</b>。引入级别后，用递归 <code>f1</code>（分型→笔→线段）与 <code>f2</code>（低级别走势→高级别中枢）从最低级别逐级上推，各级别中枢与走势类型都被严格定义，不再循环。' },
        { q: '走势分解定理一、二分别说的是什么？', a: '定理一：<b>任何级别的任何走势</b>都可分解成同级别"盘整、下跌、上涨"三种走势类型的连接；定理二：<b>任何级别的任何走势类型</b>都至少由三段以上次级别走势类型构成。' },
      ]},
    ],
  });
})();
