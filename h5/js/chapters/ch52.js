/* 第52章 当机立断 · 修炼自己 · 机械操作 */
(function () {

  function optCh52() {
    const mp = (i, p, name, color, pos) => ({ coord: [i, p], name, symbol: 'circle', symbolSize: 9, itemStyle: { color }, label: { show: true, color, fontSize: 10, position: pos, distance: 5, fontWeight: 'bold', formatter: function (p) { return p.name; } } });
    const seg = (x, y, name, color, pos) => ({ coord: [x, y], name, symbol: 'none', label: { show: true, color, fontSize: 11, fontWeight: 'bold', position: pos, formatter: function (p) { return p.name; } } });

    // 一个完整机械操作周期：一买 → 二买 → 上涨 → 一卖 → 二卖
    const pts = [20, 17, 18, 15, 16, 14, 15.5, 14.8, 18, 20, 22, 24, 21.5, 23, 20, 17];

    return {
      tooltip: { trigger: 'axis', axisPointer: { type: 'cross' } },
      grid: { left: 52, right: 40, top: 44, bottom: 44 },
      xAxis: { type: 'value', min: 0, max: 15, interval: 1 },
      yAxis: { type: 'value', scale: true, name: '价格' },
      series: [{
        name: '走势', type: 'line', data: pts.map((p, i) => [i, p]), symbol: 'circle', symbolSize: 4,
        lineStyle: { width: 2.5, color: '#1f2937' }, itemStyle: { color: '#1f2937' },
        markArea: {
          silent: true, itemStyle: { color: 'rgba(37,99,235,0.08)' },
          label: { show: true, position: 'insideTop', formatter: function (p) { return p.name || ''; }, color: '#2563eb', fontSize: 11 },
          data: [[{ xAxis: 5, yAxis: 14.8, name: '第一上涨中枢 [14.8,15.5]' }, { xAxis: 8, yAxis: 15.5 }]],
        },
        markLine: {
          silent: true, symbol: 'none',
          label: { show: true, position: 'end', formatter: function (p) { return p.name; }, fontSize: 10 },
          data: [
            { yAxis: 24, name: '一卖高 24', lineStyle: { color: '#e74c3c', type: 'dashed', width: 1 }, label: { color: '#e74c3c' } },
            { yAxis: 14, name: '一买低 14', lineStyle: { color: '#16a34a', type: 'dashed', width: 1 }, label: { color: '#16a34a' } },
          ],
        },
        markPoint: { data: [
          mp(5, 14, '一买·底背驰', '#16a34a', 'bottom'),
          mp(7, 14.8, '二买·不新低', '#16a34a', 'bottom'),
          mp(11, 24, '一卖·顶背驰', '#e74c3c', 'top'),
          mp(13, 23, '二卖·不新高', '#e74c3c', 'top'),
          seg(2.6, 17.6, '下跌背驰段', '#16a34a', 'top'),
          seg(9.0, 22.4, '上涨背驰段', '#e74c3c', 'top'),
          seg(14.0, 18.6, '买点买·卖点卖', '#9333ea', 'bottom'),
        ] },
      }],
    };
  }

  const figFlow = `
<div class="fig" style="min-width:340px"><div class="lbl">当机立断：完全分类 + 边界分划（第94课）</div>
<div style="font-size:12.5px;line-height:1.65;color:#1f2937">
<div style="text-align:center;background:#f1f5f9;border:1px solid #cbd5e1;border-radius:6px;padding:5px 10px"><b>当下走势（任意时刻点位）</b></div>
<div style="text-align:center;color:#2563eb;font-size:14px;line-height:1.5">↓ ① 完全分类：理论输出所有必然机会</div>
<div style="text-align:center;background:#e0e7ff;border:1px solid #c7d2fe;border-radius:6px;padding:5px 10px"><b style="color:#3730a3">机会① 线段类背驰</b> → 退出边界＝最后类中枢 / 类背驰<br><b style="color:#3730a3">机会② 5分钟中枢震荡</b> → 边界＝第三类买卖点</div>
<div style="text-align:center;color:#2563eb;font-size:14px;line-height:1.5">↓ ② 选择：级别 · 心情 · 资金</div>
<div style="text-align:center;color:#2563eb;font-size:14px;line-height:1.5">↓ ③ 等待机的显现</div>
<div style="text-align:center;background:#fef2f2;border:1px solid #fecaca;border-radius:6px;padding:5px 10px"><b style="color:#991b1b">④ 当机立断（机械执行）</b></div>
</div>
<div class="cap">机会可<b>预先分析</b>，但这不是预测，而是<b>完全分类基础上的边界分划</b>；<br>边界来自纯数学构造，保证了分类与边界的<b>当下确认性</b>。</div></div>`;

  __chapters.push({
    id: 'ch52', vol: '卷十 · 心法与杂史', title: '第52章 当机立断 · 修炼自己 · 机械操作', source: '原文第94、95、105课',
    figures: [
      { kind: 'echarts', title: '机械操作：买点买、卖点卖（一买→二买→一卖→二卖）', note: '第105课：<b>机械化操作的本质是“目无全牛而合其关节”</b>——市场结构被彻底分解，只剩一堆关节（买卖点）。一个完整机械周期：<b>一买</b>（底背驰）→ <b>二买</b>（回抽不新低）→ 上涨 → <b>一卖</b>（顶背驰）→ <b>二卖</b>（反弹不新高）。<span class="hl">远离聪明、远离预测，只负责按关节的节奏挣钱</span>。', option: optCh52 },
      { kind: 'html', title: '当机立断的决策流程（第94课）', note: '第94课：来学本ID的理论，第一层次就是<b>当机立断</b>。机会可以预先分析，但这是<b>完全分类 + 边界分划</b>，不是预测：任何当下都能立刻列出理论必然输出的机会，然后按<b>级别、心情、资金</b>选择，设置好退出边界，<b>等待机显现、当机立断</b>。', html: figFlow },
    ],
    sections: [
      { type: 'definition', title: '当机立断与机械操作（第94、105课）', items: [
        { term: '① 完全分类 = 边界分划（非预测）', text: '机会可以预先分析，但这分析<b>不是预测</b>，而是建立在<b>完全分类基础上的边界分划</b>。这分划来自理论的纯数学构造，其唯一性与精确性保证了分类与边界的<b>当下确认性</b>——这是与“概率预测”完全不同的思维方式。', fig: mfig('预测 → 完全分类', '<div style="font-size:12px;line-height:2;color:#1f2937">预测 → 概率游戏<br><b style="color:#166534">完全分类</b> → 边界分划<br>→ <b style="color:#9333ea">当下确认</b></div>', '机会=完全分类下的边界分划，不是预测') },
        { term: '② 当机立断的两步', text: '练习两步：<b>第一步</b>，任何时刻点位都能把理论输出的机会第一时间反应出来（市场机会与理论输出严格一一对应）；<b>第二步</b>，根据自己当下的<b>心情、资金</b>选择介入或放弃。最后等待机显现，<span class="hl">当机立断</span>——最后这一步，足够你修炼 N 年。', fig: mfig('两步 → 当机立断', '<div style="font-size:12px;line-height:2;color:#1f2937">① 分类输出机会（当下反应）<br>② 按心情资金选择<br>→ 等待机显现，<b style="color:#991b1b">当机立断</b></div>', '第一步靠理论，第二步靠选择，最后一步靠修炼') },
        { term: '③ 级别与节奏：见好就收', text: '学了理论，脑子里必须时刻有两个字：<b>级别</b>。有了级别就是<b>节奏</b>问题——<span class="kw">419 是见好就收，不是天长地久</span>。<span class="hl">不会卖出，就等于失去了下次买入的机会。</span>节奏难，说白了就是贪嗔痴疑慢作怪。', fig: mfig('级别：见好就收', drawZS([{ p: 10, tag: '底' }, { p: 14, tag: '顶' }, { p: 11, tag: '底' }, { p: 15, label: '见好就收', color: '#e74c3c', above: true }, { p: 12, tag: '底' }], [{ lo: 11, hi: 14, x0: 1, x1: 4, label: '级别' }], { w: 36, h: 100 }), '按级别定节奏，见好就收，不是天长地久') },
        { term: '④ 目无全牛、机械操作', text: '市场如一头牛，只有<b>目无全牛</b>才能随心解之而合其关节。机械化操作的本质就是<span class="hl">目无全牛而合其关节</span>：市场结构已被彻底分解，只剩一堆关节（买卖点）。分类的<b>原则不重要</b>，关键这分类能导致<b>完全分类</b>。一个最简单分型 + 能否延伸为笔的标准，就能处理震荡行情。', fig: mfig('机械：分型机械操作', drawZS([{ p: 10, label: '底分型', color: '#16a34a' }, { p: 13, label: '顶分型', color: '#e74c3c', above: true }, { p: 11, label: '底分型', color: '#16a34a' }, { p: 14, label: '顶分型', color: '#e74c3c', above: true }, { p: 12, label: '底分型', color: '#16a34a' }], [], { w: 38, h: 96 }), '顶分型卖、底分型买，远离聪明，只合关节') },
      ]},
      { type: 'definition', title: '修炼自己、战胜合力（第95课）', items: [
        { term: '⑤ 0 投入赚钱', text: '市场就是要<b>0 投入去赚钱</b>。<span class="hl">问题不是投入多少，而是技术与操作。</span>只要技术、操作稳定，初始投入多少不重要：1 万元 10 次翻倍就是 1000 万。把第一笔钱运作好、<b>把本拿走</b>、再把利润变成巨大数字，才是真正操作。', fig: mfig('0 投入：把本拿走', '<div style="font-size:12px;line-height:2;color:#1f2937">第一笔钱 → 赚到 → <b style="color:#e74c3c">把本拿走</b><br>利润 → 变巨大数字<br><span style="color:#6b7280">1 万 ×10 次翻倍 = 1000 万</span></div>', '初始投入不重要，技术与操作才是根本') },
        { term: '⑥ 战胜合力 = 战胜绝大多数人', text: '市场是<b>合力</b>的，而合这力的不是机械，是活生生的人。<span class="hl">战胜市场，就是战胜市场的合力，就是战胜构成合力的绝大多数人。</span>你不成为所有参与者中最顶尖的那一部分，谈成功都是废话——这是一场智力、体力、资金的综合搏杀。', fig: mfig('战胜合力', '<div style="font-size:12px;line-height:2;color:#1f2937">战胜市场 = 战胜<b style="color:#e74c3c">合力</b><br>= 战胜构成合力的<b>绝大多数人</b><br>→ 做最顶尖那部分</div>', '市场是人与人的搏杀，不是选秀场') },
        { term: '⑦ 偷心不死、修炼自己', text: '<span class="kw">偷心不死，永无出期。</span>学习理论要<b>彻底穷源</b>，再在实践中不断升级；工夫是磨出来的。<span class="hl">修炼自己，是市场中生存的唯一办法，别无他法。</span>市场机会无穷，做一次电梯不怕，关键是电梯之后能不再电梯。', fig: mfig('偷心不死，永无出期', '<div style="font-size:12px;line-height:2;color:#1f2937"><b style="color:#991b1b">偷心不死，永无出期</b><br>修炼自己 → 别无他法<br><span style="color:#6b7280">彻底穷源 + 实践升级</span></div>', '市场生存的唯一办法就是修炼自己') },
      ]},
      { type: 'motivation', title: '从“聪明”回到“机械”', text: '这三课指向同一条修行路径：<b>当机立断</b>教你完全分类、设置边界；<b>修炼自己</b>教你用 0 投入的第一笔钱磨出真功夫；<b>远离聪明</b>教你只认关节、机械执行。合起来就是——<span class="hl">不预测、不争论、不耍小聪明，把市场彻底分类后，按买卖点机械地重复</span>。聪明的死得最快，机械的反而活得最久。' },
      { type: 'pitfalls', title: '常见误区', items: [
        '把“预先分析机会”当成<b>预测点位时间</b>——错：它是<b>完全分类下的边界分划</b>，不是预测。',
        '学了买卖点就想<b>天长地久</b>——错：419 是<b>见好就收</b>，不会卖出就失去下次买入机会。',
        '靠<b>不断加大投入</b>去翻本——错：问题不是投入多少，是<b>技术与操作</b>；市场要 0 投入赚钱。',
        '用<b>聪明</b>去争论道理、预测行情——错：越聪明死得越快，机械化操作才是<b>目无全牛而合其关节</b>。',
        '分型都把握不好就去<b>贪多</b>学复杂系统——错：一个最简单的分型 + 能否延伸为笔，就足以处理震荡。',
      ]},
      { type: 'exercises', title: '练习', items: [
        { q: '第94课的“预先分析机会”为什么不是预测？', a: '因为它是<b>完全分类基础上的边界分划</b>，边界来自理论的纯数学构造，其唯一性、精确性保证了分类与边界的<b>当下确认性</b>；预测则是概率游戏，与“分类+边界”是两种思维（第94课）。' },
        { q: '为什么说“不会卖出，就等于失去了下次买入的机会”？', a: '操作讲究<b>级别与节奏</b>：见好就收才能腾出资金与位置参与下一次买入；死扛天长地久，既锁死利润又被套住，节奏就断了——而节奏难，根子在<b>贪嗔痴疑慢</b>（第94课）。' },
        { q: '第105课“机械化操作的本质”是什么？', a: '<b>目无全牛而合其关节</b>：根据理论把市场结构彻底分解成“一堆关节”（买卖点），机械化操作就是<b>逐步合于其关节的节奏</b>，不被全牛（整体走势）的繁复影响——分类原则不重要，能导致完全分类就行（第105课）。' },
      ]},
    ],
  });
})();
