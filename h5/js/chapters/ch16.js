/* 第16章 表里关系 */
(function () {

  const figState = `
<div class="fig" style="min-width:320px"><div class="lbl">缠中说禅笔定理：四种状态（第91课）</div>
<div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:8px">
<span style="background:#fecaca;color:#991b1b;padding:4px 10px;border-radius:6px">(1,1) 向上笔延伸</span>
<span style="background:#fef3c7;color:#92400e;padding:4px 10px;border-radius:6px">(1,0) 顶分型构造</span>
<span style="background:#bbf7d0;color:#166534;padding:4px 10px;border-radius:6px">(-1,1) 向下笔延伸</span>
<span style="background:#e0e7ff;color:#3730a3;padding:4px 10px;border-radius:6px">(-1,0) 底分型构造</span>
</div>
<div class="cap">第一个变量：1=向上笔、-1=向下笔；第二个变量：0=分型构造中、1=分型确认延伸中</div>
<div style="font-family:ui-monospace,Consolas,monospace;font-size:13px;line-height:1.95;color:#1f2937">
(1,1) → (1,0) → (1,1)<br>
　 　 　 　 　 ↘ (-1,1) → (-1,0) → (-1,1)<br>
　 　 　 　 　 　 　 　 　 　 　 　 　 ↘ (1,1)
</div>
<div style="font-size:12px;line-height:1.9;color:#1f2937;margin-top:6px">
<b style="color:#6b7280">允许的转移：</b>
<span style="background:#fecaca;color:#991b1b;padding:2px 7px;border-radius:4px">(1,1)→(1,0)</span>
<span style="background:#fef3c7;color:#92400e;padding:2px 7px;border-radius:4px">(1,0)→(1,1)|(-1,1)</span>
<span style="background:#bbf7d0;color:#166534;padding:2px 7px;border-radius:4px">(-1,1)→(-1,0)</span>
<span style="background:#e0e7ff;color:#3730a3;padding:2px 7px;border-radius:4px">(-1,0)→(-1,1)|(1,1)</span>
</div>
<div class="cap"><b>状态不能随意连接</b>：(1,1) 之后只能连 (1,0)，不能直接连 (-1,1) 或 (-1,0)；只有 (1,0)、(-1,0) 才各自分出两条路。</div></div>`;

  function optCh16() {
    const pts = [8, 13, 10, 14, 11, 17, 14, 18, 15, 21, 17];
    const zones = [
      { x0: 1, x1: 4, lo: 11, hi: 13, label: '中枢A [11,13]（更早：跌破危险）' },
      { x0: 5, x1: 8, lo: 15, hi: 17, label: '中枢B [15,17]（最后一个：健康）' },
    ];
    const markAreaData = zones.map(z => [{ xAxis: z.x0, yAxis: z.lo, name: z.label }, { xAxis: z.x1, yAxis: z.hi }]);
    const mp = (i, name, color, pos) => ({ coord: [i, pts[i]], name, symbol: 'circle', symbolSize: 9, itemStyle: { color }, label: { show: true, color, fontSize: 10, position: pos, distance: 6, fontWeight: 'bold' } });
    const pin = (i, name, color) => ({ coord: [i, pts[i]], name, symbol: 'pin', symbolSize: 40, itemStyle: { color }, label: { show: true, formatter: function (p) { return p.name; }, color, fontSize: 10, fontWeight: 'bold' } });
    const seg = (x, y, name, color) => ({ coord: [x, y], name, symbol: 'none', label: { show: true, color, fontSize: 12, fontWeight: 'bold', position: 'top' } });
    const markPointData = [
      mp(0, '底·起点', '#16a34a', 'bottom'),
      mp(1, '顶', '#e74c3c', 'top'),
      mp(5, '顶', '#e74c3c', 'top'),
      pin(9, '走势完成点（顶 21）', '#e74c3c'),
      pin(10, '回调落中枢B [15,17]（健康）', '#16a34a'),
      seg(4.5, 20.5, '上涨趋势（含中枢A、B）', '#e74c3c'),
      seg(9.5, 12, '回调 = 大级别中枢震荡', '#2563eb'),
    ];
    const markLineData = [
      { yAxis: 13, name: '中枢A ZG=13' },
      { yAxis: 11, name: '中枢A ZD=11' },
      { yAxis: 17, name: '中枢B ZG=17' },
      { yAxis: 15, name: '中枢B ZD=15' },
    ];
    return {
      tooltip: { trigger: 'axis', axisPointer: { type: 'cross' } },
      grid: { left: 60, right: 70, top: 40, bottom: 40 },
      xAxis: { type: 'value', min: 0, max: 10, interval: 1 },
      yAxis: { type: 'value', scale: true, name: '价格' },
      series: [{
        name: '走势', type: 'line', data: pts.map((p, i) => [i, p]),
        symbol: 'circle', symbolSize: 5, lineStyle: { width: 2, color: '#1f2937' }, itemStyle: { color: '#1f2937' },
        markArea: {
          silent: true, itemStyle: { color: 'rgba(37,99,235,0.10)' },
          label: { show: true, position: 'insideTop', formatter: function (p) { return p.name || ''; }, color: '#2563eb', fontSize: 11 },
          data: markAreaData,
        },
        markLine: {
          silent: true, symbol: 'none',
          lineStyle: { color: '#2563eb', type: 'dashed', width: 1 },
          label: { show: true, position: 'end', formatter: function (p) { return p.name || ''; }, color: '#2563eb', fontSize: 10 },
          data: markLineData,
        },
        markPoint: { data: markPointData },
      }],
    };
  }

  // ---- 讲解点小图（第16章 表里关系） ----

  // Section1 表里关系与笔定理
  const figBiaoli = mfig('未病 → 欲病 → 已病',
    '<div style="font-size:12.5px;line-height:2;color:#1f2937">'
    + '<span style="background:#f0fdf4;color:#166534;padding:3px 8px;border-radius:6px">未病</span> → '
    + '<span style="background:#fef3c7;color:#92400e;padding:3px 8px;border-radius:6px">欲病</span> → '
    + '<span style="background:#fee2e2;color:#991b1b;padding:3px 8px;border-radius:6px">已病</span><br>'
    + '对应界限：一买 → 二买 → 三买（上涨里踏空也是病）'
    + '</div>',
    '走势如中医诊病，按买卖点界定病的三阶段');

  const figPeijian = mfig('能构成中枢 vs 不能构成中枢',
    '<div style="display:flex;gap:8px">'
    + '<div style="flex:1;background:#eef2ff;color:#3730a3;padding:7px 8px;border-radius:6px"><b>能构成中枢</b><br>线段、各种级别走势类型</div>'
    + '<div style="flex:1;background:#fef3c7;color:#92400e;padding:7px 8px;border-radius:6px"><b>不能构成中枢</b><br>只有「笔」</div>'
    + '</div>',
    '笔不能构成中枢——这是笔与线段及以上走势类型的最大区别');

  const figBiDingli = mfig('当下必在向上笔或向下笔中',
    drawZS([
      { p: 10, label: '底分型(构造中)', color: '#16a34a' },
      { p: 16, label: '笔延伸中', color: '#e74c3c', above: true },
      { p: 12, label: '顶分型(构造中)', color: '#e74c3c' },
      { p: 8, label: '向下笔延伸', color: '#16a34a' },
    ], [], { w: 44, h: 100 }),
    '笔中的位置只有两种：分型构造中(0)、分型确认后延伸中(1)');

  const figFourStates = mfig('两个变量 → 四种状态',
    '<div style="font-size:12.5px;line-height:1.9;color:#1f2937">'
    + '变量①方向：<b>1</b>=向上 / <b>-1</b>=向下；变量②阶段：<b>0</b>=分型构造 / <b>1</b>=延伸<br>'
    + '<div style="display:flex;gap:5px;flex-wrap:wrap;margin-top:4px">'
    + '<span style="background:#fecaca;color:#991b1b;padding:3px 8px;border-radius:6px">(1,1) 向上笔延伸</span>'
    + '<span style="background:#bbf7d0;color:#166534;padding:3px 8px;border-radius:6px">(-1,1) 向下笔延伸</span>'
    + '<span style="background:#fef3c7;color:#92400e;padding:3px 8px;border-radius:6px">(1,0) 顶分型构造</span>'
    + '<span style="background:#e0e7ff;color:#3730a3;padding:3px 8px;border-radius:6px">(-1,0) 底分型构造</span>'
    + '</div></div>',
    '四种状态穷尽一切当下走势');

  const figTrans = mfig('状态转移（不能随意连接）',
    '<div style="font-family:ui-monospace,Consolas,monospace;font-size:12.5px;line-height:1.8;color:#1f2937">'
    + '(1,1) → (1,0) ──→ (1,1)<br>'
    + '　　　　　　　 ↘ (-1,1) → (-1,0) ──→ (-1,1)<br>'
    + '　　　　　　　　　　　　　　　　　 ↘ (1,1)'
    + '</div>',
    '(1,1) 只能连 (1,0)；只有 (1,0)/(-1,0) 各分两路');

  // Section2 级别过滤与病情矩阵
  const figGuolv = mfig('高级别 (1,1)/(-1,1) 过滤低级别波动',
    '<div style="font-size:12.5px;line-height:1.9;color:#1f2937">'
    + '<span style="background:#fecaca;color:#991b1b;padding:3px 8px;border-radius:6px">5分钟 (1,1)</span> 时<br>'
    + '1分钟里的任何波动 <span style="color:#6b7280;text-decoration:line-through">无太大价值</span><br>'
    + '→ 不足以改变 5 分钟状态，被明确过滤'
    + '</div>',
    '高级别状态稳定时，忽略低级别小波动');

  const figBing3 = mfig('未病 → 欲病 → 已病（以 5 分钟 (1,1) 为例）',
    '<div style="font-size:12px;line-height:1.9;color:#1f2937">'
    + '<span style="background:#f0fdf4;color:#166534;padding:2px 7px;border-radius:5px">未病</span> 1分钟(1,0) 小警告<br>'
    + '<span style="background:#fef3c7;color:#92400e;padding:2px 7px;border-radius:5px">欲病</span> 1分钟(-1,1) 出现、5分钟(1,0)形成中<br>'
    + '<span style="background:#fee2e2;color:#991b1b;padding:2px 7px;border-radius:5px">已病</span> 5分钟(1,0) 确认向 (-1,1)'
    + '</div>',
    '从小警告一路预判到大级别病情演化');

  const figJuzhen = mfig('病情矩阵：8 级别 × 4 状态',
    '<div style="font-size:12px;line-height:1.75;font-family:ui-monospace,Consolas,monospace;color:#1f2937">'
    + '1分钟　(·,·)<br>5分钟　(·,·)<br>30分钟　(·,·)<br>日线　(·,·)<br>'
    + '周线　(·,·)<br>月线　(·,·)<br>季线　(·,·)<br>年线　(·,·)<br>'
    + '<span style="font-family:sans-serif;color:#6b7280">共 4⁸ 种状态组合，可变去向极为有限</span>'
    + '</div>',
    '8 行状态数组，可分析最大赢利的必然转折状态');

  const fig64 = mfig('三个连续级别 → 64 种状态',
    '<div style="font-size:12.5px;line-height:1.9;color:#1f2937">'
    + '只关心 <b>1、5、30 分钟</b> 三个连续级别<br>'
    + '每级 4 状态 → 4³ = <b>64 种</b><br>'
    + '<span style="color:#6b7280">与《易经》六十四卦对应</span>'
    + '</div>',
    '想用易经研究股票，从表里关系状态矩阵入手才是正道');

  // Section3 (1,0)/(-1,0) 之后的应对
  const figXinhao = mfig('(-1,0)：绝对明确的信号',
    drawZS([
      { p: 16, label: '顶', color: '#e74c3c' },
      { p: 10, label: '向下笔 (-1,1)', color: '#16a34a' },
      { p: 11, label: '底分型 (-1,0)', color: '#2563eb', above: true },
      { p: 10.5 },
    ], [], { w: 44, h: 100 }),
    '向下笔结束后出现底分型 (-1,0)：唯一可确定的信号');

  const figWenjian = mfig('(1,1) 后出 (1,0)：兑现成本留利润',
    drawZS([
      { p: 10, label: '底', color: '#16a34a' },
      { p: 16, label: '(1,1) 向上笔', color: '#e74c3c', above: true },
      { p: 14, label: '(1,0) 顶分型', color: '#2563eb' },
      { p: 15 },
    ], [], { w: 42, h: 96 }),
    '足够周期的 (1,1) 后出 (1,0)：先把成本兑现、留下利润');

  const figShulian = mfig('(1,0) 后必然震荡 → 做短差',
    drawZS([
      { p: 10, label: '底', color: '#16a34a' },
      { p: 15, label: '(1,1)', color: '#e74c3c', above: true },
      { p: 13, label: '(1,0)', color: '#2563eb' },
      { p: 14, label: '先卖', color: '#e74c3c', above: true },
      { p: 12, label: '后买', color: '#16a34a' },
      { p: 13.5 },
      { p: 12.5 },
    ], [{ lo: 12, hi: 14, x0: 2, x1: 6, label: '震荡区间' }], { w: 40, h: 104 }),
    '(1,0) 后围绕区间震荡：先卖后买做短差；转 (-1,1) 则最后一次不回补');

  const figLidu = mfig('比较 (1,0) 上下两段 (1,1) 力度',
    drawZS([
      { p: 10, label: '前段 (1,1)', color: '#16a34a' },
      { p: 16, label: '前段顶', color: '#e74c3c', above: true },
      { p: 13, label: '(1,0)', color: '#2563eb' },
      { p: 17, label: '后段 (1,1)', color: '#16a34a' },
      { p: 14, label: '后段顶(力度小)', color: '#e74c3c', above: true },
    ], [], { w: 42, h: 100 }),
    '后段力度 < 前段 → 明确见顶信号，再用区间套定位真正高点');

  const figQiangruo = mfig('强震荡 vs 弱震荡',
    drawZS([
      { p: 10, label: '底', color: '#16a34a' },
      { p: 15, label: '顶(背驰)', color: '#e74c3c', above: true },
      { p: 12, label: '强震荡', color: '#2563eb' },
      { p: 14 },
      { p: 12.5 },
      { p: 13.5 },
    ], [{ lo: 12, hi: 14, x0: 1, x1: 5, label: '最后一个中枢' }], { w: 40, h: 104 }),
    '围绕最后中枢=强震荡；转 (-1,1) 跌破=弱震荡(最好不参与)');

  // Section4 中阴与划分的必然结论
  const figZhongyin = mfig('中阴 = 中枢震荡整理',
    drawZS([
      { p: 10, label: '底', color: '#16a34a' },
      { p: 15, label: '顶', color: '#e74c3c', above: true },
      { p: 12, label: '中阴', color: '#2563eb' },
      { p: 14 },
      { p: 12.5 },
      { p: 13.5 },
    ], [{ lo: 12, hi: 14, x0: 1, x1: 5, label: '中枢震荡' }], { w: 40, h: 100 }),
    '走势生长的未确定性 → 按中枢震荡操作即可');

  const figJiehelv = mfig('结合律：a+b+c+d+e+f = a+b+c+(d+e+f)',
    '<div style="font-size:12px;line-height:1.9;font-family:ui-monospace,Consolas,monospace;color:#1f2937">'
    + 'a+b+c+d+e <span style="color:#6b7280">(线段类上涨)</span><br>'
    + '= a+b+c + <span style="background:#fef3c7;color:#92400e;padding:2px 6px;border-radius:4px">(d+e+f)</span><br>'
    + '<span style="font-family:sans-serif;color:#6b7280">c+d+e 重合=最后类中枢，f 类背驰后回调</span>'
    + '</div>',
    '按结合律重新分组，保持连接走势最完美形态');

  const figHuafen = mfig('划分原则：先保证中枢确立',
    drawZS([
      { p: 10, label: 'e', color: '#16a34a' },
      { p: 15, label: 'f', color: '#e74c3c', above: true },
      { p: 12, label: 'g', color: '#16a34a' },
      { p: 14, label: 'h', color: '#e74c3c', above: true },
    ], [{ lo: 12, hi: 14, x0: 1, x1: 3, label: '(f+g+h) 中枢' }], { w: 42, h: 100 }),
    'a+b+c+d+e+(f+g+h)：必须首先保证中枢确立');

  const figBiran = mfig('走势完成 → 必有大一级别中枢震荡',
    drawZS([
      { p: 10, label: '底', color: '#16a34a' },
      { p: 16, label: '5分钟上涨完成', color: '#e74c3c', above: true },
      { p: 13, label: '30分钟震荡', color: '#2563eb' },
      { p: 15 },
      { p: 13.5 },
      { p: 14.5 },
    ], [{ lo: 13, hi: 15, x0: 1, x1: 5, label: '大一级别中枢' }], { w: 40, h: 104 }),
    '连接中枢走势级别 < 中枢：任何走势都无法逃脱');

  const figJiankang = mfig('大级别震荡位置：健康 vs 危险',
    drawZS([
      { p: 10 },
      { p: 13, label: '中枢A', color: '#2563eb' },
      { p: 11 },
      { p: 14 },
      { p: 18, label: '上涨', color: '#e74c3c', above: true },
      { p: 21, label: '顶', color: '#e74c3c' },
      { p: 16, label: '健康(落B)', color: '#16a34a' },
      { p: 17 },
    ], [{ lo: 11, hi: 13, x0: 0, x1: 3, label: '中枢A(危险)' }, { lo: 16, hi: 17, x0: 5, x1: 7, label: '中枢B(健康)' }], { w: 38, h: 104 }),
    '回调落最后一个中枢 B=健康；跌回更早中枢 A=危险');

  __chapters.push({
    id: 'ch16', title: '第16章 表里关系', source: '原文第91、93、99课',
    figures: [
      { kind: 'html', title: '笔定理：四种状态与转移规则', note: '<b>缠中说禅笔定理</b>：任何当下、任何周期，走势都落在确定的<b>向上笔或向下笔</b>中，位置只有两种——<b>分型构造中（0）</b>或<b>分型确认后延伸中（1）</b>。两个变量（1/-1 表方向，0/1 表阶段）组合出<b>四种状态</b>，且状态转移有严格规则，不可随意连接。', html: figState },
      { kind: 'echarts', title: '走势完成后必有大级别中枢震荡（第99课）', note: '上涨趋势完成（顶点 21）后，<b>必然面临至少大一级别的中枢震荡</b>。关键看这个震荡落在哪：回调低点 17 落在<b>最后一个中枢 B [15,17] 范围</b>＝<b>健康</b>；若跌回<b>更早的中枢 A [11,13]</b>＝<b>危险</b>。第99课：中枢震荡的位置，是诊断行情的关键指标。', option: optCh16 },
    ],
    sections: [
      { type: 'definition', title: '表里关系与笔定理（第91课）', items: [
        { term: '① 中医“表里”与病的三阶段', text: '判断走势如中医看病：<b>未病-欲病-已病</b>，对应界限就是相应级别的<b>第一、二、三类买卖点</b>（对上涨来说，踏空也是一种病）。中医讲“肺与大肠相表里”，走势也存在着<b>两重表里关系</b>。', fig: figBiaoli, },
        { term: '② 两类配件：能否构成中枢', fig: figPeijian, text: '走势分解配件有两类：<b>一、能构成中枢的</b>——线段及各种级别走势类型；<b>二、不能构成中枢的</b>——只有<b>笔</b>。<span class="hl">笔不能构成中枢，这是笔与线段及以上走势类型的最大区别。</span>', },
        { term: '③ 缠中说禅笔定理', fig: figBiDingli, text: '笔在不同周期图上的判断，构成一个表里相关的判断。<span class="hl">缠中说禅笔定理：任何当下，在任何时间周期的 K 线图中，走势必然落在确定的具有明确方向的笔当中（向上笔或向下笔），而在笔当中的位置，必然只有两种情况——①在分型构造中；②分型确认后延伸为笔的过程中。</span>', formula: '笔定理：当下必在“向上笔/向下笔”中，且必在“分型构造中”或“笔延伸中”' },
        { term: '④ 两个变量与四种状态', fig: figFourStates, text: '用两个变量精确定义当下走势：<b>第一个变量</b> 1=向上笔、-1=向下笔；<b>第二个变量</b> 0=分型构造中、1=分型确认延伸中。于是只有<b>四种状态</b>：<code>(1,1)</code>向上笔延伸中、<code>(-1,1)</code>向下笔延伸中、<code>(1,0)</code>向上笔顶分型构造、<code>(-1,0)</code>向下笔底分型构造。', formula: '四种状态：(1,1)(-1,1)(1,0)(-1,0) —— 描述了所有当下走势' },
        { term: '⑤ 状态转移规则', fig: figTrans, text: '这四种状态<b>不能随便连接</b>：<code>(1,1)</code> 之后<b>只能</b>连 <code>(1,0)</code>（绝不能直接连 (-1,1) 或 (-1,0)）；<code>(-1,1)</code> 只能连 <code>(-1,0)</code>；而 <code>(1,0)</code> 有两条路 <code>(1,1)</code>、<code>(-1,1)</code>；<code>(-1,0)</code> 有两条路 <code>(-1,1)</code>、<code>(1,1)</code>。', formula: '(1,1)→(1,0)→{(1,1) 或 (-1,1)}；(-1,1)→(-1,0)→{(-1,1) 或 (1,1)}' },
      ]},
      { type: 'definition', title: '级别过滤与病情矩阵（第91课）', items: [
        { term: '① 相邻级别的过滤作用', fig: figGuolv, text: '考察两个相邻周期（如 1 分钟和 5 分钟）：若 5 分钟是 <code>(1,1)</code> 或 <code>(-1,1)</code>，那么<b>1 分钟里前面的任何波动都没有太大价值</b>（不足以改变 5 分钟状态）——这就是对小级别波动的<b>明确过滤</b>。', },
        { term: '② 病三阶段的判断', fig: figBing3, text: '以 5 分钟 <code>(1,1)</code> 为例：1 分钟出现 <code>(1,0)</code> 是<b>小警告</b>（未病，只出现在 1 个 5 分钟 K 线内不破坏结构）；1 分钟的 <code>(-1,1)</code> 出现并导致 5 分钟 <code>(1,0)</code> 形成中＝<b>欲病向已病发展</b>；5 分钟 <code>(1,0)</code> 确认向 <code>(-1,1)</code> 发展＝<b>已病</b>。', formula: '未病(1,0 警告) → 欲病(-1,1 出现) → 已病(5分钟(1,0)确认)' },
        { term: '③ 病情记录矩阵', fig: figJuzhen, text: '给大盘开<b>即时病情记录</b>：按 1、5、30、日、周、月、季、年 8 个级别分类的矩阵，<b>8 行</b>，每行是对应级别的状态数组，可能状态共 <b>4⁸ 种</b>。每一种状态后并非随机变化，可变状态极为有限，可分析出<b>最大赢利的必然转折状态</b>。', formula: '病情矩阵：8 级 × 4 状态 = 4⁸ 种（每种状态的可变去向极为有限）' },
        { term: '④ 三个连续级别 = 64 种状态', fig: fig64, text: '一般人只需关心<b>三个连续级别</b>（如 1、5、30 分钟），对应 <b>4³=64 种状态</b>——这正与《易经》六十四卦对应。真想用易经研究股票，从表里关系的状态矩阵入手才是正道。', },
      ]},
      { type: 'definition', title: '(1,0)/(-1,0) 之后的应对（第93课）', items: [
        { term: '① 信号绝对明确', fig: figXinhao, text: '所有问题都集中在 <code>(1,0)</code> 或 <code>(-1,0)</code> 之后怎么办——它们之后都有 <code>(1,1)</code>、<code>(-1,1)</code> 两种可能。但 <code>(-1,0)</code> 这个信号是<b>绝对明确、毫不含糊</b>、唯一可确定的。', },
        { term: '② 稳健者：兑现成本留下利润', fig: figWenjian, text: '若你震荡水平一般、胆小、没时间：一个<b>足够周期</b>（如周、日）的 <code>(1,1)</code> 后出现 <code>(1,0)</code>，说明已有足够获利空间，<b>先把成本兑现出来、留下利润</b>；若出现 <code>(-1,1)</code>，向下笔结束后的向上笔<b>不创新高</b>就扔剩余筹码。', },
        { term: '③ 熟练者：利用震荡做短差', fig: figShulian, text: '震荡水平好，就利用 <code>(1,0)</code> 后<b>必然出现的震荡</b>做短差（先卖后买）；一旦发现市场选择 <code>(-1,1)</code>，最后一次<b>不回补</b>，完全退出。做短差时要分析 <code>(1,1)→(1,0)</code> 对应的<b>走势类型级别</b>。', },
        { term: '④ 最终选择 (1,1) 时：比较上下两段力度', fig: figLidu, text: '若市场最终选择 <code>(1,1)</code>，这个 <code>(1,0)</code> 区间就有重要意义：<b>区间上下两段 (1,1) 做力度比较</b>，一旦<b>后段力度小于前段</b>，就是明确的见顶信号，再用对应走势类型做<b>区间套定位</b>，真正的高点就逃不掉。', },
        { term: '⑤ 强震荡 vs 弱震荡', fig: figQiangruo, text: '<code>(1,0)</code> 出现两种情形：①对应上涨出现<b>明确背驰</b>完全确认结束——震荡区间以上涨的<b>最后一个中枢</b>为依据，围绕它就是<b>强震荡</b>；否则变成 <code>(-1,1)</code> 就是<b>弱震荡</b>（弱震荡一旦确认最好不参与）。', },
      ]},
      { type: 'definition', title: '中阴与划分的必然结论（第99课）', items: [
        { term: '① 中阴是走势的客观特性', fig: figZhongyin, text: '走势结构最重要的就是<b>中阴部分</b>的存在，它不是理论不完善，而是客观反映了走势生长阶段的<b>未确定性</b>（世界是量子化的、测不准的）。中阴状态都可看成<b>中枢震荡整理</b>，按中枢震荡操作即可。', },
        { term: '② 结合律下的划分', fig: figJiehelv, text: '连接中枢的走势<b>不一定是完全的趋势类型</b>。如 <code>a+b+c+d+e+f = a+b+c+(d+e+f)</code>：a+b+c+d+e 是线段类上涨，c+d+e 重合构成最后一个类中枢，f 是类背驰后回调，可马上构成 1 分钟中枢，后面直接继续上涨。', formula: 'a+b+c+d+e+f = a+b+c+(d+e+f)　（按结合律保持最完美形态）' },
        { term: '③ 划分原则：保证中枢确立', fig: figHuafen, text: '若中阴里从前背驰点开始已构成相应中枢（如 f、g、h 构成 1 分钟中枢），划分就变成 <code>a+b+c+d+e+(f+g+h)</code>。<span class="hl">划分原则很明确：必须首先保证中枢的确立</span>，在此前提下按结合律使连接中枢的走势保持最完美形态。', },
        { term: '④ 必然结论：连接中枢的走势级别 < 中枢', fig: figBiran, text: '<span class="hl">连接中枢的走势级别一定小于中枢。</span>因此<b>一个走势级别完成后，必然面临至少大一级别的中枢震荡</b>——如 5 分钟上涨结束后，必然至少有一个 30 分钟中枢震荡。这是任何走势都无法逃脱的必然结论。', formula: '走势完成 → 必有大一级别中枢震荡（连接中枢走势级别必 < 中枢）' },
        { term: '⑤ 中枢震荡位置：健康 vs 危险', fig: figJiankang, text: '大级别第一个中枢震荡的位置是<b>诊断行情的关键</b>：<b>必然至少落在前一走势类型的最后一个中枢范围里</b>＝正常、健康；若<b>回到原走势的第二甚至更后中枢</b>＝不健康、危险。原走势的最后一个中枢，成为关键指标位置。', },
      ]},
      { type: 'motivation', title: '把“看盘”变成“诊病”的精确状态机', text: '表里关系是缠论最高阶的“<b>当下状态识别器</b>”：它把模糊的“现在涨还是跌”，压缩成<b>两个变量、四种状态</b>，并给出<b>严格的状态转移规则</b>，让你能像中医诊病一样，从 1 分钟的小警告，一路预判到周线、月线的病情演化。再配合“走势完成后必有大一级别中枢震荡”的必然结论，当下该持有、该减仓、该观望，都有了<b>不靠感觉</b>的依据。' },
      { type: 'pitfalls', title: '常见误区', items: [
        '搞错状态转移：以为 <code>(1,1)</code> 能直接连 <code>(-1,1)</code>（错，必须经 <code>(1,0)</code>）。',
        '被<b>小级别波动</b>干扰，忘了相邻高级别处于 <code>(1,1)/(-1,1)</code> 时的“过滤”作用。',
        '把<b>中阴</b>当理论缺陷（它是走势量子化、未确定性的客观反映）。',
        '忘记“<b>走势完成后必然面临大一级别中枢震荡</b>”，在大级别回调前满仓不止盈。',
      ]},
      { type: 'exercises', title: '练习', items: [
        { q: '缠中说禅笔定理说的是什么？', a: '<b>任何当下、任何周期</b>，走势必然落在确定的<b>向上笔或向下笔</b>中；在笔中的位置必然只有两种情况：<b>分型构造中</b>或<b>分型确认后延伸为笔的过程中</b>（第91课）。' },
        { q: '四种状态如何转移？(1,1) 之后能直接连什么？', a: '<code>(1,1)</code> 之后<b>只能连 (1,0)</b>；<code>(1,0)</code> 分两路 <code>(1,1)</code> 或 <code>(-1,1)</code>；<code>(-1,1)</code> 只能连 <code>(-1,0)</code>；<code>(-1,0)</code> 分两路 <code>(-1,1)</code> 或 <code>(1,1)</code>。' },
        { q: '第99课的“必然结论”是什么？', a: '<b>连接中枢的走势级别一定小于中枢</b>，因此<b>一个走势级别完成后，必然面临至少大一级别的中枢震荡</b>；且该中枢震荡<b>必然至少落在前一走势最后一个中枢范围里</b>（健康），回到更早中枢则危险。' },
      ]},
    ],
  });
})();
