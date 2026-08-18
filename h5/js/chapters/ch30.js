/* 第17章 资金与心态 */
(function () {

  function optCh17() {
    const pts = [20, 17, 18, 15, 16, 13, 14, 11, 9, 12, 10, 13, 11];
    const zones = [
      { x0: 9, x1: 12, lo: 10, hi: 12, label: '反弹中枢 [10,12]（机会②区间）' },
    ];
    const markAreaData = zones.map(z => [{ xAxis: z.x0, yAxis: z.lo, name: z.label }, { xAxis: z.x1, yAxis: z.hi }]);
    const mp = (i, name, color, pos) => ({ coord: [i, pts[i]], name, symbol: 'circle', symbolSize: 9, itemStyle: { color }, label: { show: true, color, fontSize: 10, position: pos, distance: 6, fontWeight: 'bold' } });
    const pin = (i, name, color) => ({ coord: [i, pts[i]], name, symbol: 'pin', symbolSize: 38, itemStyle: { color }, label: { show: true, formatter: function (p) { return p.name; }, color, fontSize: 10, fontWeight: 'bold' } });
    const seg = (x, y, name, color) => ({ coord: [x, y], name, symbol: 'none', label: { show: true, color, fontSize: 12, fontWeight: 'bold', position: 'top' } });
    const markPointData = [
      mp(0, '顶·前走势高点', '#e74c3c', 'top'),
      mp(11, '顶·反弹高点', '#e74c3c', 'top'),
      pin(8, '机会①：线段底背驰', '#16a34a'),
      pin(12, '机会②：中枢震荡买点', '#2563eb'),
      seg(3.5, 20.5, '下跌走势', '#e74c3c'),
      seg(10.5, 16.5, '反弹 + 中枢震荡', '#16a34a'),
    ];
    const markLineData = [
      { yAxis: 12, name: '中枢 ZG=12' },
      { yAxis: 10, name: '中枢 ZD=10' },
    ];
    return {
      tooltip: { trigger: 'axis', axisPointer: { type: 'cross' } },
      grid: { left: 60, right: 70, top: 40, bottom: 40 },
      xAxis: { type: 'value', min: 0, max: 12, interval: 1 },
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

  const figMind = `
<div class="fig" style="min-width:320px">
<div class="lbl">资金管理：0 成本，把本拿走（第95课）</div>
<div style="font-size:13px;color:#374151;line-height:1.7">
<span style="background:#dcfce7;color:#166534;padding:3px 10px;border-radius:6px">第一笔钱</span> → 严格操作 → <span style="background:#bfdbfe;color:#1e3a8a;padding:3px 10px;border-radius:6px">把本拿走</span> → 利润滚成巨大数字<br>
<div class="cap">10 次翻倍：1 万 → 1000 万；10 次亏损：1000 万 → 没多少钱了（关键是技术，不是本金多少）</div>
</div>
<div class="lbl" style="margin-top:10px">赌徒心理 vs 操作者心态（第96课）</div>
<table style="width:100%;border-collapse:collapse;font-size:13px;margin-top:4px">
<tr style="background:#fef2f2;color:#991b1b"><td style="padding:5px 8px;border:1px solid #fecaca;width:50%"><b>✗ 赌徒心理</b></td><td style="padding:5px 8px;border:1px solid #fecaca;width:50%"><b>✓ 操作者心态</b></td></tr>
<tr><td style="padding:5px 8px;border:1px solid #e5e7eb">① 预设“涨到X就卖”的虚拟目标</td><td style="padding:5px 8px;border:1px solid #e5e7eb">① 只看图形，按买卖点操作</td></tr>
<tr><td style="padding:5px 8px;border:1px solid #e5e7eb">② 怕错过机会，追高杀跌</td><td style="padding:5px 8px;border:1px solid #e5e7eb">② 错过就错过，机会无穷</td></tr>
<tr><td style="padding:5px 8px;border:1px solid #e5e7eb">③ 不断加码，砍了又追</td><td style="padding:5px 8px;border:1px solid #e5e7eb">③ 0 成本，纪律规范操作</td></tr>
<tr><td style="padding:5px 8px;border:1px solid #e5e7eb">④ 听消息、找捷径</td><td style="padding:5px 8px;border:1px solid #e5e7eb">④ 只倾听市场与自己</td></tr>
</table>
<div class="cap" style="margin-top:6px"><b style="color:#166534">技术</b>（分类机会） + <b style="color:#1e3a8a">资金</b>（0 成本） + <b style="color:#991b1b">心态</b>（戒赌徒） = 长期稳定的操作者</div></div>`;

  // ---- 讲解点小图（第17章 资金与心态） ----

  // Section1 当机立断与完全分类（第94课）
  const figXixin = mfig('洗心革面 → 当机立断',
    '<div style="font-size:12.5px;line-height:1.9;color:#1f2937">'
    + '<span style="color:#6b7280;text-decoration:line-through">预测点位、时间</span><br>'
    + '→ <span style="background:#f0fdf4;color:#166534;padding:3px 8px;border-radius:6px">严格分类后的不同操作类型</span><br>'
    + '→ <b>当机立断</b>'
    + '</div>',
    '清空过去的知识，只留下分类与当下');

  const figJihui = mfig('机会 = 完全分类的边界',
    drawZS([
      { p: 16, label: '顶', color: '#e74c3c' },
      { p: 9, label: '底背驰(机会)', color: '#16a34a' },
      { p: 11, label: '反弹', color: '#2563eb', above: true },
      { p: 12 },
      { p: 10 },
    ], [], { w: 44, h: 100 }),
    '不预测点位时间，只列出必然出现的机会边界');

  const figSanbu = mfig('操作三步法',
    '<div style="font-size:12.5px;line-height:2;color:#1f2937">'
    + '<b>①</b> 列出后面必然出现的机会<br>'
    + '<b>②</b> 按心情、资金选择介入/放弃<br>'
    + '<b>③</b> 等待显现 → <b>当机立断</b>'
    + '</div>',
    '第三步足够修炼 N 年');

  const figTuichu = mfig('先设退出边界条件',
    drawZS([
      { p: 10, label: '底', color: '#16a34a' },
      { p: 14, label: '介入', color: '#2563eb', above: true },
      { p: 12, label: '退出边界', color: '#e74c3c' },
      { p: 13 },
    ], [{ lo: 12, hi: 13, x0: 1, x1: 3, label: '最后类中枢' }], { w: 42, h: 100 }),
    '介入前先设好退出边界（类中枢/背驰）');

  const figJiezou = mfig('级别 = 节奏',
    drawZS([
      { p: 10, label: '买', color: '#16a34a' },
      { p: 16, label: '卖(顶背驰)', color: '#e74c3c', above: true },
      { p: 12, label: '不卖→无下次买入', color: '#2563eb' },
      { p: 11, label: '再买', color: '#16a34a' },
    ], [], { w: 42, h: 100 }),
    '不会卖出 = 失去下次买入机会（贪嗔痴疑慢作怪）');

  // Section2 资金管理（第95课）
  const figLingchengben = mfig('0 成本：把本拿走',
    '<div style="font-size:12.5px;line-height:1.9;color:#1f2937">'
    + '<span style="background:#dcfce7;color:#166534;padding:3px 8px;border-radius:6px">第一笔钱</span>'
    + ' → 严格操作 → <span style="background:#bfdbfe;color:#1e3a8a;padding:3px 8px;border-radius:6px">把本拿走</span>'
    + ' → 利润滚成巨大数字'
    + '</div>',
    '一笔 0 成本的钱让你无比轻松');

  const figFanbei = mfig('关键在技术，不在本金',
    '<div style="font-size:12.5px;line-height:1.9;color:#1f2937">'
    + '<span style="background:#f0fdf4;color:#166534;padding:3px 8px;border-radius:6px">1万 ×10次翻倍 → 1000万</span><br>'
    + '<span style="background:#fee2e2;color:#991b1b;padding:3px 8px;border-radius:6px">1000万 ×10次亏损 → 没多少钱了</span>'
    + '</div>',
    '问题不是投入多少，而是技术与操作');

  const figBuyingxiang = mfig('用不影响生活的钱',
    '<div style="font-size:12.5px;line-height:1.9;color:#1f2937">'
    + '<span style="background:#eef2ff;color:#3730a3;padding:3px 8px;border-radius:6px">不影响生活的钱</span><br>'
    + '→ 创造一个操作的故事<br>'
    + '<span style="color:#6b7280">戒：贪婪(不断投入) / 恐惧(落荒而逃)</span>'
    + '</div>',
    '心态稳，操作才不走样');

  const figXiulian = mfig('战胜市场 = 战胜合力',
    '<div style="font-size:12.5px;line-height:1.9;color:#1f2937">'
    + '市场合力 = 绝大多数人<br>'
    + '<b>偷心不死，永无出期</b><br>'
    + '<span style="color:#6b7280">市场唯一评价 = 你的操作</span>'
    + '</div>',
    '修炼自己，别人最多是陪练');

  // Section3 赌徒心理（第96课）
  const figDiren = mfig('最大的敌人：赌徒心理',
    '<div style="font-size:12.5px;line-height:1.9;color:#1f2937">'
    + '<span style="background:#fee2e2;color:#991b1b;padding:4px 10px;border-radius:6px;font-size:14px">赌徒心理 / 赌徒思维</span><br>'
    + '<span style="color:#6b7280">结局早已注定：养肥了再煮</span>'
    + '</div>',
    '以赌徒心理参与市场，必败无疑');

  const figBiaoxian = mfig('赌徒心理的六种表现',
    '<div style="font-size:12px;line-height:1.85;color:#1f2937">'
    + '①预设虚拟目标　②怕失去机会<br>'
    + '③不断加码/砍了又追　④不敢操作后追高<br>'
    + '⑤听消息找捷径　⑥"赚钱买房买车"'
    + '</div>',
    '核心：预设想象中的目标，无视市场本身');

  const figChengxu = mfig('严格操作程序 → 长期成功',
    '<div style="font-size:12.5px;line-height:1.9;color:#1f2937">'
    + '<span style="color:#6b7280;text-decoration:line-through">一次暴富 → 倾家荡产</span><br>'
    + '<span style="background:#f0fdf4;color:#166534;padding:3px 8px;border-radius:6px">严格操作程序 → 长期成功</span>'
    + '</div>',
    '机会不断涌现，严格程序足以保证');

  const figZuihou = mfig('给自己最后一次机会',
    '<div style="font-size:12.5px;line-height:1.9;color:#1f2937">'
    + '输光 → <b>彻底解剖自己</b> → 最后一次尝试<br>'
    + '再输光 → <b>退出</b>（承认"我不行"）'
    + '</div>',
    '不是每个人都适合市场');

  const figShenghuo = mfig('市场只是生活的一部分',
    '<div style="font-size:12.5px;line-height:1.9;color:#1f2937">'
    + '<b>错过了就错过了</b><br>'
    + '后面有无数的机会等着<br>'
    + '<span style="color:#6b7280">平静地按自己的韵律成长</span>'
    + '</div>',
    '机会无穷，无需烦躁期盼恐惧');

  __chapters.push({
    id: 'ch30', vol: '卷七 · 资金心态与综合', title: '第30章 资金与心态', source: '原文第94、95、96课',
    figures: [
      { kind: 'echarts', title: '机会的完全分类：必然出现、不预测', note: '下跌在 <b>9</b> 线段底背驰——这是<b>机会①</b>；其后的反弹震荡出中枢——<b>机会②</b>。第94课：理论把<b>所有必然出现的机会逐一列出</b>（<b>不预测具体点位与时间</b>），你只需等它显现、<b>当机立断</b>。市场的机会与理论输出是<b>严格一一对应</b>的。', option: optCh17 },
      { kind: 'html', title: '资金管理与心态', note: '第95课：<b>0 成本投入</b>，把第一笔钱的本拿走后，用利润滚出巨大数字；本金多少不重要，关键是<b>技术与操作</b>。第96课：最大的敌人是<b>赌徒心理</b>——预设虚拟目标、怕错过、不断加码、听消息，最终都只有一个结局。', html: figMind },
    ],
    sections: [
      { type: 'definition', title: '当机立断与完全分类（第94课）', items: [
        { term: '① 洗心革面，第一层次：当机立断', fig: figXixin, text: '学缠论首先要<b>洗心革面</b>——你前面一切关于股票的知识，可能都是后面学习的毒药。第一层次目标，就是达到<b>当机立断</b>：只有严格分类后的不同操作类型，没有无聊的预测。', },
        { term: '② 机会 = 完全分类，不是预测', fig: figJihui, text: '机会可以预先分析，但这分析<b>不是预测</b>，而是建立在<b>完全分类</b>基础上的边界分划，来自理论的纯数学构造。<span class="hl">市场的机会与理论的输出，是严格一一对应的</span>——理论把一切机会无一遗漏地输出。', formula: '机会 = 完全分类的边界分划（唯一、精确、当下确认），≠ 预测点位时间' },
        { term: '③ 操作三步法', fig: figSanbu, text: '<b>第一步</b>：任何时刻，马上根据理论<b>列出后面必然出现的机会</b>；<b>第二步</b>：根据自己当下的<b>心情、资金</b>，选择介入的机会、放弃不想介入的机会；<b>第三步</b>：等待机会显现，<b>当机立断</b>。最后一步，足够修炼 N 年。', },
        { term: '④ 设置退出边界条件', fig: figTuichu, text: '想介入某个机会，就要先做好<b>通道、资金、一切安排</b>，关键是<b>把退出的边界条件设置好</b>（如原来的最后一个类中枢、类背驰/类盘整背驰）。判断机会力度，决定进出的<b>资金量</b>。', },
        { term: '⑤ 级别与节奏', fig: figJiezou, text: '脑子里必须时刻有<b>“级别”</b>二字。有了级别就是节奏问题：<span class="hl">不会卖出，就等于失去了下次买入的机会</span>。这个节奏之所以难，就是<b>贪嗔痴疑慢</b>作怪。初学者可先用 5 周、5 日线做机械束缚：分型后有效跌破就走。', },
      ]},
      { type: 'definition', title: '资金管理（第95课）', items: [
        { term: '① 0 成本投入', fig: figLingchengben, text: '市场就是要<b>0 投入去赚钱</b>。把<b>第一笔钱运作好，然后把本拿走</b>，剩下的利润滚成巨大数字——这才是真正的市场操作。真正成功以<b>十年为单位</b>，一笔 0 成本的钱让你无比轻松。', },
        { term: '② 投入的钱不能无限增加', fig: figFanbei, text: '第一笔 100 万都赚不到钱，还想搞 100 万的平方？<span class="hl">问题不是投入多少，而是技术与操作。</span>就算只有 1 万，10 次翻倍后也是 1000 万；而 1000 万连续 10 次亏损，也就没多少钱了。', formula: '10 次翻倍：1万→1000万；10 次亏损：1000万→没多少钱了' },
        { term: '③ 用不影响生活的钱', fig: figBuyingxiang, text: '用一笔<b>绝对不影响你生活的钱</b>，创造一个操作的故事。绝大多数人因<b>贪婪</b>不断投入、因<b>恐惧</b>落荒而逃，最后都在高潮中又被忽悠进来。', },
        { term: '④ 修炼自己，别无他法', fig: figXiulian, text: '战胜市场，就是战胜市场的合力、战胜构成合力的绝大多数人。这是人与人智力、体力、资金综合的搏杀。<span class="hl">偷心不死，永无出期。</span>市场唯一的评价就是你的操作，别人最多是陪练。', },
      ]},
      { type: 'definition', title: '赌徒心理（第96课）', items: [
        { term: '① 最大的敌人', fig: figDiren, text: '市场中最大的敌人之一，就是<b>赌徒心理、赌徒思维</b>。以赌徒心理参与市场，结局就已注定——就算还没进锅，也只是养肥了再煮。', },
        { term: '② 赌徒心理的典型表现', fig: figBiaoxian, text: '①<b>预设虚拟目标</b>：“等反弹到 X 一定出来”，完全无视市场本身；②<b>怕失去机会</b>：怕走错、怕还涨；③<b>不断加码</b>、砍了又追、追了又砍；④<b>不敢操作</b>：机会来了怕，起来了又后悔追高（5 元不敢买、50 元敢买）；⑤<b>听消息、找捷径</b>；⑥<b>“我要赚钱买房买车”</b>——把市场当慈善场所。', },
        { term: '③ 成功靠严格操作程序', fig: figChengxu, text: '市场成功从来不是靠一次暴富，<b>一次暴富最后倾家荡产的多了</b>。真正的成功，都是在<b>严格的操作程序</b>下完成的：操作失误没什么大不了，机会不断涌现，严格程序足以保证长期成功。', },
        { term: '④ 给自己最后一次机会', fig: figZuihou, text: '用不影响生活的钱，当作你<b>唯一的资本、没有后援</b>。输光了，先<b>彻底解剖自己</b>、挖出所有失败根源，再给自己<b>最后一次</b>尝试；再输光就退出——不是每个人都适合市场，必须面对“我不行”这个最客观的事实。', },
        { term: '⑤ 市场只是生活的一部分', fig: figShenghuo, text: '你不需要如赌徒般烦躁不安、又期盼又恐惧。平静地按自己的韵律、按市场的显现与日俱增地强大自己。<span class="hl">错过了就错过了，后面有无数的机会等着。市场，只是生活的一部分，如此而已。</span>', },
      ]},
      { type: 'motivation', title: '理论输出机会，人决定成败', text: '缠论把<b>所有必然机会无一遗漏地输出</b>——这一步谁读懂都能做到；但机会如何进入操作层面，<b>最终修炼的是人</b>。资金管理（0 成本、把本拿走）给你“不死”的底气，心态修炼（当机立断、戒赌徒心理）给你“必胜”的纪律。技术 + 资金 + 心态，三者合一，才是真正的操作者。' },
      { type: 'pitfalls', title: '常见误区', items: [
        '把“机会分析”当<b>预测</b>（缠论只做<b>完全分类</b>，不预测点位时间）。',
        '不断<b>加码</b>投入本金（应 0 成本、把本拿走、用利润滚）。',
        '预设“涨到 X 就卖”的<b>虚拟目标</b>，无视市场本身。',
        '<b>砍了又追、追了又砍</b>，或机会来了<b>不敢操作</b>、起来了又追高。',
        '<b>听消息、找捷径</b>，把市场当慈善场所或赌场。',
      ]},
      { type: 'exercises', title: '练习', items: [
        { q: '缠论的“机会分析”为什么不是预测？', a: '因为它是建立在<b>完全分类</b>基础上的<b>边界分划</b>，来自理论的纯数学构造，<b>只列出必然出现的机会、不预测具体点位与时间</b>；机会与理论输出严格一一对应（第94课）。' },
        { q: '资金管理的核心原则是什么？', a: '<b>0 成本投入</b>：把第一笔钱运作好、<b>把本拿走</b>，用利润滚动；投入的钱<b>不能无限增加</b>，关键是技术而非本金多少（第95课）。' },
        { q: '赌徒心理有哪些典型表现？', a: '<b>预设虚拟目标</b>、<b>怕失去机会</b>、<b>不断加码/砍了又追</b>、<b>不敢操作后追高</b>、<b>听消息找捷径</b>、<b>“赚钱买房买车”</b>——核心是预设一个想象中的目标、无视市场本身（第96课）。' },
      ]},
    ],
  });
})();
