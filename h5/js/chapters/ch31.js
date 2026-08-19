/* 第18章 综合运用（收尾总结） */
(function () {

  const figMap = `
<div class="fig" style="min-width:340px"><div class="lbl">缠论知识体系全景图（按依赖顺序自底向上）</div>
<div style="font-size:13px;line-height:2;color:#1f2937">
<div style="background:#eef2ff;padding:6px 10px;border-radius:6px;margin-bottom:4px"><b style="color:#3730a3">① 形态学（结构）：</b>K线包含 → 分型(顶/底) → 笔 → 线段 → 中枢(ZG/ZD/GG/DD) → 走势类型(盘整/趋势) → 级别(递归 f1/f2)</div>
<div style="background:#fefce8;padding:6px 10px;border-radius:6px;margin-bottom:4px"><b style="color:#a16207">② 动力学（力度）：</b>背驰 / 盘整背驰（MACD 辅助） → 走势必完美 → 区间套定位</div>
<div style="background:#f0fdf4;padding:6px 10px;border-radius:6px"><b style="color:#166534">③ 操作（买卖）：</b>三类买卖点 → 同级别分解 / 表里关系 → 机械化操作程式 → 资金与心态</div>
</div>
<div class="cap"><b style="color:#3730a3">↑ 自底向上</b>：形态学回答“走势长什么样”，动力学回答“力度够不够”，操作把两者变成“何时买、何时卖”。</div></div>`;

  function optCh18() {
    const pts = [20, 15, 18, 14, 17, 11, 14, 10, 13, 8, 13, 10, 14, 12, 16, 13, 17, 14, 20, 18, 22];
    const zones = [
      { x0: 5, x1: 8, lo: 11, hi: 13, label: '下跌中枢B [11,13]' },
      { x0: 12, x1: 15, lo: 13, hi: 14, label: '上涨中枢C [13,14]' },
    ];
    const markAreaData = zones.map(z => [{ xAxis: z.x0, yAxis: z.lo, name: z.label }, { xAxis: z.x1, yAxis: z.hi }]);
    const mp = (i, name, color, pos) => ({ coord: [i, pts[i]], name, symbol: 'circle', symbolSize: 9, itemStyle: { color }, label: { show: true, color, fontSize: 10, position: pos, distance: 6, fontWeight: 'bold' } });
    const pin = (i, name, color, pos) => ({ coord: [i, pts[i]], name, symbol: 'pin', symbolSize: 40, itemStyle: { color }, label: { show: true, formatter: function (p) { return p.name; }, color, fontSize: 10, fontWeight: 'bold', position: pos, distance: 24 } });
    const seg = (x, y, name, color) => ({ coord: [x, y], name, symbol: 'none', label: { show: true, color, fontSize: 12, fontWeight: 'bold', position: 'top' } });
    const markPointData = [
      mp(0, '顶·下跌起点', '#e74c3c', 'top'),
      mp(2, '顶', '#e74c3c', 'top'),
      mp(4, '顶', '#e74c3c', 'top'),
      pin(9, '① 一类买点（底背驰）', '#16a34a', 'bottom'),
      pin(11, '② 二类买点', '#2563eb', 'bottom'),
      pin(17, '③ 三类买点', '#9333ea', 'bottom'),
      pin(20, '顶背驰：一类卖点', '#e74c3c', 'top'),
      seg(4, 21.5, '下跌趋势', '#e74c3c'),
      seg(13.5, 20.5, '上涨趋势（持有）', '#16a34a'),
    ];
    const markLineData = [
      { yAxis: 13, name: '中枢B ZG=中枢C ZD=13' },
      { yAxis: 11, name: '中枢B ZD=11' },
      { yAxis: 14, name: '中枢C ZG=14' },
    ];
    return {
      tooltip: { trigger: 'axis', axisPointer: { type: 'cross' } },
      grid: { left: 60, right: 70, top: 40, bottom: 40 },
      xAxis: { type: 'value', min: 0, max: 20, interval: 1 },
      yAxis: { type: 'value', scale: true, name: '价格' },
      series: [{
        name: '走势', type: 'line', data: pts.map((p, i) => [i, p]),
        symbol: 'circle', symbolSize: 4, lineStyle: { width: 2, color: '#1f2937' }, itemStyle: { color: '#1f2937' },
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

  // ---- 讲解点小图（第18章 综合运用） ----

  // Section1 核心定理速查
  const figBiwanmei = mfig('走势必完美：趋势 ≥ 2 中枢',
    drawZS([
      { p: 10, label: '底', color: '#16a34a' },
      { p: 14 }, { p: 11 }, { p: 13 },
      { p: 18, label: '连接段', color: '#2563eb', above: true },
      { p: 21, label: '顶', color: '#e74c3c' }, { p: 17 },
    ], [{ lo: 11, hi: 13, x0: 0, x1: 3, label: '中枢1' }, { lo: 18, hi: 21, x0: 4, x1: 6, label: '中枢2' }], { w: 40, h: 100 }),
    '任何走势最终都要完成；趋势必含两个以上中枢');

  const figFenjie = mfig('走势分解两定理',
    '<div style="font-size:12px;line-height:1.9;color:#1f2937">'
    + '<b>定理一</b>：任何级别走势可分解成同级别盘整、下跌与上涨三种走势类型的连接<br>'
    + '<b>定理二</b>：任何级别走势类型至少由三段以上次级别走势类型构成'
    + '</div>',
    '第17课：任何走势都可分解为三种走势类型的连接，且至少含三段次级别');

  const figWanbeixing = mfig('只有第一、二、三类买卖点',
    drawZS([
      { p: 16, label: '顶', color: '#e74c3c' },
      { p: 8, label: '1买(底背驰)', color: '#16a34a' },
      { p: 12, label: '2买(回调)', color: '#2563eb' },
      { p: 13 },
      { p: 17, label: '离开', color: '#e74c3c', above: true },
      { p: 15, label: '3买(不破ZG)', color: '#9333ea' },
      { p: 19 },
    ], [{ lo: 12, hi: 13, x0: 1, x1: 3, label: '中枢' }], { w: 40, h: 100 }),
    '三类买卖点被理论保证、100% 安全');

  const figBeichi = mfig('背驰-转折：三种转折之一',
    '<div style="font-size:12px;line-height:1.9;color:#1f2937">'
    + '趋势背驰 → <br>'
    + '① 最后中枢级别扩展<br>'
    + '② 更大级别盘整<br>'
    + '③ 更大级别反趋势<br>'
    + '<span style="color:#6b7280">绝对没有第四种</span>'
    + '</div>',
    '背驰后的转折只有这三种');

  const figBi = mfig('笔定理：四种状态',
    '<div style="font-size:12.5px;line-height:1.9;color:#1f2937">'
    + '向上/向下笔 × 分型构造/延伸<br>'
    + '<div style="display:flex;gap:4px;flex-wrap:wrap;margin-top:3px">'
    + '<span style="background:#fecaca;color:#991b1b;padding:2px 7px;border-radius:5px">(1,1)</span>'
    + '<span style="background:#bbf7d0;color:#166534;padding:2px 7px;border-radius:5px">(-1,1)</span>'
    + '<span style="background:#fef3c7;color:#92400e;padding:2px 7px;border-radius:5px">(1,0)</span>'
    + '<span style="background:#e0e7ff;color:#3730a3;padding:2px 7px;border-radius:5px">(-1,0)</span>'
    + '</div></div>',
    '当下必落在四状态之一');

  const figJielun = mfig('走势完成 → 必有大一级别中枢震荡',
    drawZS([
      { p: 10, label: '底', color: '#16a34a' },
      { p: 16, label: '本级别完成', color: '#e74c3c', above: true },
      { p: 13, label: '大一级别震荡', color: '#2563eb' },
      { p: 15 },
      { p: 13.5 },
      { p: 14.5 },
    ], [{ lo: 13, hi: 15, x0: 1, x1: 5, label: '大一级别中枢' }], { w: 40, h: 100 }),
    '连接中枢走势级别 < 中枢 → 必有大级别震荡');

  // Section2 完整操作流程（四步）
  const figXuanjibie = mfig('① 选级别',
    '<div style="font-size:12.5px;line-height:1.9;color:#1f2937">'
    + '1分钟 / 30分钟 / 日线 …<br>'
    + '<span style="color:#6b7280">级别决定看哪级中枢、背驰、买卖点</span>'
    + '</div>',
    '级别越高越能容忍震荡、越接近长线');

  const figDengmai = mfig('② 等买点：三类买点',
    drawZS([
      { p: 16, label: '顶', color: '#e74c3c' },
      { p: 8, label: '1买', color: '#16a34a' },
      { p: 12, label: '2买', color: '#2563eb' },
      { p: 13 },
      { p: 17, label: '离开', color: '#e74c3c', above: true },
      { p: 15, label: '3买', color: '#9333ea' },
    ], [{ lo: 12, hi: 13, x0: 1, x1: 3, label: '中枢' }], { w: 40, h: 100 }),
    '1买(背驰) 2买(回调) 3买(回试不破ZG)，区间套定位');

  const figChiyou = mfig('③ 持有：只做上涨段',
    drawZS([
      { p: 10, label: '买', color: '#16a34a' },
      { p: 16, label: '上涨段', color: '#e74c3c', above: true },
      { p: 13, label: '卖(避下跌)', color: '#2563eb' },
      { p: 12, label: '避开', color: '#16a34a' },
      { p: 15, label: '再买', color: '#16a34a' },
    ], [], { w: 42, h: 100 }),
    '同级别分解：只参与上涨段，避开下跌段');

  const figDengmai2 = mfig('④ 等卖点：顶背驰',
    drawZS([
      { p: 10, label: '买', color: '#16a34a' },
      { p: 15, label: '上涨段', color: '#e74c3c', above: true },
      { p: 12 }, { p: 14 },
      { p: 18, label: '力度弱', color: '#e74c3c', above: true },
      { p: 16, label: '顶背驰(卖)', color: '#e74c3c' },
    ], [{ lo: 12, hi: 14, x0: 1, x1: 3, label: '中枢' }], { w: 40, h: 100 }),
    '顶背驰/盘整背驰 → 当机立断卖出');

  // Section3 学习路径建议
  const figLujing = mfig('自底向上：形态 → 动力 → 操作',
    '<div style="font-size:12px;line-height:1.9;color:#1f2937">'
    + '<span style="background:#eef2ff;color:#3730a3;padding:2px 7px;border-radius:5px">形态学</span> 结构<br>'
    + '<span style="background:#fefce8;color:#a16207;padding:2px 7px;border-radius:5px">动力学</span> 力度<br>'
    + '<span style="background:#f0fdf4;color:#166534;padding:2px 7px;border-radius:5px">操作</span> 买卖'
    + '</div>',
    '先吃透结构，再学力度，最后落到买卖');

  const figKantu = mfig('先看图 → 再读定义 → 做练习',
    '<div style="font-size:12.5px;line-height:1.9;color:#1f2937">'
    + '① <b>图解</b>（建立直觉）<br>'
    + '② <b>定义</b>（精确理解）<br>'
    + '③ <b>练习 + 误区</b>（查漏补缺）'
    + '</div>',
    '不会的点回到原文对应课反复读');

  const figZhenshi = mfig('用真实数据练手',
    '<div style="font-size:12.5px;line-height:1.9;color:#1f2937">'
    + '找中枢 / 数笔 / 判背驰 / 定买卖点<br>'
    + '<span style="color:#6b7280">导入个股数据 · 输入代码分析</span>'
    + '</div>',
    '把理论落到真实图形上');

  __chapters.push({
    id: 'ch31', vol: '卷七 · 资金心态与综合', title: '第31章 综合运用', source: '全体系总结',
    figures: [
      { kind: 'html', title: '缠论知识体系全景图', note: '整个缠论是一个<b>自底向上</b>的体系：形态学搭出“结构”（从 K 线到走势类型、级别），动力学给出“力度”（背驰、区间套），操作把它变成“买卖点”。三线合一，才构成完整的缠论。', html: figMap },
      { kind: 'echarts', title: '一次完整的“买 → 持有 → 卖”循环', note: '下跌趋势背驰出<b>①一类买点（8）</b>→ 第一次回调出<b>②二类买点（10）</b>→ 上涨突破中枢后回试不破出<b>③三类买点（14）</b>→ 上涨到顶出现<b>顶背驰（22）</b>，即<b>一类卖点</b>。这就是缠论操作的完整闭环：<b>买点买入、持有、背驰卖出</b>。', option: optCh18 },
    ],
    sections: [
      { type: 'definition', title: '核心定理速查', items: [
        { term: '① 走势必完美（第17课）', fig: figBiwanmei, text: '任何级别的任何走势，最终都要完成；趋势必包含两个以上中枢，盘整只包含一个。<span class="hl">这是缠论的第一原理，所有分析的根基。</span>', formula: '走势必完美：任何走势最终都要完成（趋势≥2中枢，盘整=1中枢）' },
        { term: '② 走势分解定理（第17课）', fig: figFenjie, text: '定理一：任何级别的任何走势，都可以分解成同级别“盘整”、“下跌”与“上涨”三种走势类型的连接；定理二：任何级别的任何走势类型，都至少由三段以上次级别走势类型构成。', },
        { term: '③ 买卖点完备性定理（第21课）', fig: figWanbeixing, text: '市场必然产生赢利的买卖点，<b>只有第一、二、三类</b>；三类买卖点都是被理论保证的、100% 安全的。', },
        { term: '④ 背驰-转折定理（第29课）', fig: figBeichi, text: '某级别趋势的背驰，将导致<b>该趋势最后一个中枢级别的扩展、该级别更大级别的盘整、或该级别以上级别的反趋势</b>（三者之一，绝对没有第四种）。', },
        { term: '⑤ 笔定理（第91课）', fig: figBi, text: '任何当下、任何周期，走势必然落在确定的向上笔或向下笔中，位置只有“分型构造中”或“笔延伸中”两种，对应四种状态 (1,1)(1,0)(-1,1)(-1,0)。', },
        { term: '⑥ 级别连接必然结论（第99课）', fig: figJielun, text: '连接中枢的走势级别一定小于中枢；<b>一个走势级别完成后，必然面临至少大一级别的中枢震荡</b>，且必落在前一走势最后一个中枢范围里（健康）。', },
      ]},
      { type: 'definition', title: '完整操作流程（四步）', items: [
        { term: '① 选级别', fig: figXuanjibie, text: '先定自己的<b>操作级别</b>（1 分钟/30 分钟/日线…）。级别决定你看哪一级的中枢、背驰、买卖点，也决定你忽略哪些小级别波动。级别越高越能容忍震荡，越接近长线耐心。', },
        { term: '② 等买点', fig: figDengmai, text: '在操作级别上，等待<b>三类买点</b>之一：下跌趋势背驰出<b>一类买点</b>（最有利位置）；一类买点后第一次次级别回调出<b>二类买点</b>；离开中枢后回试不破 ZG 出<b>三类买点</b>。用<b>区间套</b>把买点精确定位到当下。', },
        { term: '③ 持有', fig: figChiyou, text: '买入后<b>持有到卖点出现</b>。期间用同级别分解把走势拆成一段段，<b>只参与上涨段、避开下跌段</b>；用表里关系的四种状态、相邻级别过滤，忽略无关的小波动。', },
        { term: '④ 等卖点', fig: figDengmai2, text: '等待<b>顶背驰</b>（上涨趋势背驰）或<b>盘整背驰</b>，配合区间套精确定位卖点，<b>当机立断</b>卖出。会卖出，才保得住下一次买入的机会。卖点反过来就是三类卖点。', },
      ]},
      { type: 'definition', title: '学习路径建议', items: [
        { term: '① 先形态、后动力、再操作', fig: figLujing, text: '按本 H5 的顺序<b>自底向上</b>学：先吃透 K线包含→分型→笔→线段→中枢（<b>形态学</b>），这是地基；再学背驰/区间套（<b>动力学</b>）；最后落到三类买卖点、同级别分解、表里关系（<b>操作</b>）。', },
        { term: '② 每章“先看图、再读定义”', text: '每章的<b>图解在最上</b>，先看图建立直觉，再读定义精确理解；做完<b>练习</b>、对照<b>误区</b>查漏。不会的点，回到原文对应课反复读。', fig: figKantu, },
        { term: '③ 用真实数据练手', fig: figZhenshi, text: '理论学完，用真实 K 线数据练习“找中枢、数笔、判断背驰、定买卖点”。本工具后续支持<b>导入个股数据、输入代码分析</b>，把理论落到真实图形上。', },
      ]},
      { type: 'motivation', title: '你已经走完整个缠论', text: '从一根 K 线的包含关系，到分型、笔、线段、中枢，再到背驰、买卖点、同级别分解、表里关系——你已走完缠论 108 课的核心体系。记住三句话：<b>走势必完美</b>是根，<b>中枢</b>是干，<b>三类买卖点</b>是果。剩下的，就是在真实走势里反复练习，把理论变成当机立断的本能。' },
      { type: 'pitfalls', title: '全局性提醒', items: [
        '学完不等于会用：<b>每个概念都要回到真实图上反复练</b>，别停留在文字。',
        '别指望预测：缠论是<b>完全分类 + 当下应对</b>，不是算命。',
        '级别混乱是最大的坑：<b>先定操作级别</b>，同一级别内分析，不跨级混用。',
        '忽略资金与心态：<b>0 成本、戒赌徒心理</b>，否则技术再好也守不住。',
      ]},
      { type: 'exercises', title: '综合自测', items: [
        { q: '用一句话串起整个缠论体系。', a: '走势必完美 → 走势可分解为<b>中枢</b>与连接段 → 中枢决定<b>走势类型</b>与<b>级别</b> → 力度用<b>背驰</b>比较 → 背驰精确定位<b>三类买卖点</b> → 用<b>同级别分解/表里关系</b>机械化操作 → <b>资金与心态</b>保证执行。' },
        { q: '一次完整操作的四个步骤是什么？', a: '①<b>选级别</b>；②<b>等买点</b>（三类买点之一，区间套定位）；③<b>持有</b>（同级别分解只做上涨段）；④<b>等卖点</b>（顶背驰/盘整背驰，当机立断卖出）。' },
        { q: '为什么说“级别混乱是最大的坑”？', a: '级别决定中枢、背驰、买卖点都发生在<b>哪一级</b>；混用不同级别会把小级别波动当成大级别转折（或反之）。必须先定<b>操作级别</b>，同一级别内分析，再配合更大级别过滤。' },
      ]},
    ],
  });
})();
