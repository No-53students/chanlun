/* 第8章 走势类型 */
(function () {

  function optCh8() {
    const pts = [16, 11, 14, 12, 7, 4, 8, 5, 9, 6, 8, 13, 17, 14, 16, 20, 24, 21, 23];
    const zones = [
      { x0: 0, x1: 3, lo: 12, hi: 14, label: '下跌中枢① [12,14]' },
      { x0: 4, x1: 7, lo: 5, hi: 7, label: '下跌中枢② [5,7]' },
      { x0: 8, x1: 10, lo: 6, hi: 8, label: '盘整中枢 [6,8]' },
      { x0: 12, x1: 14, lo: 14, hi: 16, label: '上涨中枢① [14,16]' },
      { x0: 16, x1: 18, lo: 21, hi: 23, label: '上涨中枢② [21,23]' },
    ];
    const markAreaData = zones.map(z => [{ xAxis: z.x0, yAxis: z.lo, name: z.label }, { xAxis: z.x1, yAxis: z.hi }]);
    // 关键转折点（顶/底 + 走势段名）
    const mp = (i, name, color, pos) => ({ coord: [i, pts[i]], name, symbol: 'circle', symbolSize: 9, itemStyle: { color }, label: { show: true, color, fontSize: 10, position: pos, distance: 6, fontWeight: 'bold' } });
    const seg = (x, y, name, color) => ({ coord: [x, y], name, symbol: 'none', label: { show: true, color, fontSize: 12, fontWeight: 'bold', position: 'top' } });
    const markPointData = [
      mp(0, '顶·下跌起点', '#e74c3c', 'top'),
      mp(5, '底·下跌结束', '#16a34a', 'bottom'),
      mp(10, '底·盘整结束', '#16a34a', 'bottom'),
      mp(18, '顶·上涨结束', '#e74c3c', 'top'),
      seg(2.5, 9.5, '◀ 下跌（2个向下中枢）', '#e74c3c'),
      seg(7.5, 6.5, '盘整（1个中枢）', '#f59e0b'),
      seg(14, 20.5, '上涨（2个向上中枢）▶', '#16a34a'),
    ];
    return {
      tooltip: { trigger: 'axis', axisPointer: { type: 'cross' } },
      grid: { left: 48, right: 60, top: 28, bottom: 34 },
      xAxis: { type: 'value', min: 0, max: 18, interval: 2 },
      yAxis: { type: 'value', scale: true },
      series: [{
        name: '走势', type: 'line', data: pts.map((p, i) => [i, p]), symbol: 'circle', symbolSize: 4,
        lineStyle: { color: '#1f2937', width: 2 }, itemStyle: { color: '#1f2937' },
        markArea: {
          silent: true, itemStyle: { color: 'rgba(37,99,235,0.10)' },
          label: { show: true, position: 'insideTop', formatter: function (p) { return p.name || ''; }, color: '#2563eb', fontSize: 11 },
          data: markAreaData,
        },
        markPoint: { data: markPointData },
      }],
    };
  }

  const figExtend = `
<div class="fig"><div class="lbl">走势类型“延伸”</div>${drawZS([{p:5,tag:'底'},{p:9,tag:'顶'},{p:6,tag:'底'},{p:8,tag:'顶'},{p:5,tag:'底'},{p:9,tag:'顶'},{p:7,tag:'底'}], [{lo:6,hi:8,x0:0,x1:6,label:'同一中枢'}], {zgzd:true,w:52,h:150})}<div class="cap">反复围绕同一中枢 [6,8]（ZG=8 / ZD=6）震荡<br>始终<b>不产生新中枢</b> → 盘整延伸，未结束</div></div>
<div class="fig"><div class="lbl">走势类型“结束”</div>${drawZS([{p:5,tag:'底'},{p:9,tag:'顶'},{p:6,tag:'底'},{p:8,tag:'顶'},{p:13,label:'离开',color:'#2563eb',above:true},{p:16,tag:'顶'},{p:12},{p:15,tag:'顶'}], [{lo:6,hi:8,x0:0,x1:3,label:'原中枢'},{lo:13,hi:15,x0:4,x1:7,label:'新中枢'}], {zgzd:true,w:52,h:150})}<div class="cap">向上离开原中枢 [6,8]，形成<b>新中枢 [13,15]</b><br>盘整“结束”→ 转化为上涨</div></div>`;

  __chapters.push({
    id: 'ch11', vol: '卷三 · 中枢与走势', title: '第11章 走势类型', source: '原文第17、18课',
    figures: [
      { kind: 'echarts', title: '三类走势类型与它们的连接', note: '任何走势都可分解为<b>下跌、盘整、上涨</b>三类走势类型的连接（分解定理一）：下跌（两个向下中枢）→ 盘整（一个中枢）→ 上涨（两个向上中枢）。数一数：<b>1 个中枢=盘整，2 个同向中枢=趋势</b>。', option: optCh8 },
      { kind: 'html', title: '走势类型的“延伸”与“结束”', note: '走势类型的<b>延伸</b>＝围绕同一中枢震荡、不产生新中枢；<b>结束</b>＝离开中枢后形成新中枢（或更大级别中枢），原走势类型就此完成、转化为别的类型——这正是“走势必完美”。', html: figExtend },
    ],
    sections: [
      { type: 'definition', title: '走势的分类与“走势必完美”', items: [
        { term: '① 走势的分类（第17课）', text: '<span class="hl">任何级别的所有走势，都能分解成“趋势”与“盘整”两类，而趋势又分为“上涨”与“下跌”两类。</span>（这是从无数图形中总结出的经验，是一切技术分析的唯一坚实基础。）', fig: mfig('三类走势：下跌/盘整/上涨', '<div style="display:flex;gap:6px;align-items:flex-start">' + drawZS([{ p: 16 }, { p: 11 }, { p: 14 }, { p: 12 }, { p: 7 }, { p: 4 }, { p: 8 }], [{ lo: 12, hi: 14, x0: 0, x1: 3, label: '跌' }, { lo: 5, hi: 7, x0: 4, x1: 6, label: '跌' }], { w: 24, h: 82 }) + drawZS([{ p: 10 }, { p: 15 }, { p: 11 }, { p: 14 }, { p: 12 }], [{ lo: 11, hi: 14, x0: 0, x1: 4, label: '盘' }], { w: 24, h: 82 }) + drawZS([{ p: 6 }, { p: 11 }, { p: 8 }, { p: 12 }, { p: 14 }, { p: 18 }, { p: 15 }], [{ lo: 8, hi: 11, x0: 0, x1: 3, label: '涨' }, { lo: 14, hi: 17, x0: 4, x1: 6, label: '涨' }], { w: 24, h: 82 }) + '</div>', '下跌(两向下中枢)/盘整(一中枢)/上涨(两向上中枢)') },
        { term: '② 基本原理一：走势终完美（第17课）', text: '<span class="hl">任何级别的任何走势类型终要完成。</span>简称为<span class="kw">“走势终完美”</span>。它把静态的“走势可分解成趋势与盘整”转化成动态可用的“走势类型终要完成”——这是整个缠论的<span class="kw">核心命题</span>。', formula: '任何级别的任何走势类型终要完成 —— “走势终完美”', fig: mfig('走势终要完成', drawZS([{ p: 16 }, { p: 11 }, { p: 14 }, { p: 12 }, { p: 7 }, { p: 4 }, { p: 8, label: '完成', color: '#16a34a' }], [{ lo: 12, hi: 14, x0: 0, x1: 3, label: '下跌中枢1' }, { lo: 5, hi: 7, x0: 4, x1: 6, label: '下跌中枢2' }], { w: 36, h: 100 }), '下跌走势终要完成，在 8 处见底') },
        { term: '③ “走势终完美”的两方面（第17课）', text: '<b>一方面</b>：任何走势（趋势或盘整）在图形上最终都要完成；<b>另一方面</b>：一旦某种走势类型完成，就会<b>转化为其他类型</b>的走势。这就是“不患”而有其位次。', fig: mfig('完成 → 转化为其他类型', drawZS([{ p: 16 }, { p: 11 }, { p: 14 }, { p: 12 }, { p: 7, label: '完成', color: '#16a34a' }, { p: 11 }, { p: 15 }], [{ lo: 12, hi: 14, x0: 0, x1: 3, label: '下跌' }], { w: 40, h: 100 }), '下跌完成(7)后转为上涨(→15)') },
        { term: '④ 盘整与趋势（第17课，正式定义）', text: '<span class="kw">盘整</span>：某完成的走势类型<b>只包含一个</b>中枢。<span class="kw">趋势</span>：某完成的走势类型<b>至少包含两个以上依次同向</b>的中枢，向上称上涨、向下称下跌。', fig: mfig('1个中枢=盘整，2个同向=趋势', '<div style="display:flex;gap:6px;align-items:flex-start">' + drawZS([{ p: 10 }, { p: 15 }, { p: 11 }, { p: 14 }, { p: 12 }], [{ lo: 11, hi: 14, x0: 0, x1: 4, label: '盘整' }], { w: 26, h: 84 }) + drawZS([{ p: 6 }, { p: 11 }, { p: 8 }, { p: 12 }, { p: 14 }, { p: 18 }, { p: 15 }], [{ lo: 8, hi: 11, x0: 0, x1: 3, label: '中枢1' }, { lo: 14, hi: 17, x0: 4, x1: 6, label: '中枢2' }], { w: 26, h: 84 }) + '</div>', '左：盘整(1中枢)；右：趋势(2同向不重叠中枢)') },
        { term: '⑤ 基本原理二（第17课）', text: '<span class="hl">任何级别任何完成的走势类型，必然包含一个以上的中枢。</span>（不包含中枢的走势图，只可能是“一次向下后永远向上”或反之，而那只意味着该品种被永久取消交易。）', fig: mfig('完成的走势必含中枢', drawZS([{ p: 10 }, { p: 15 }, { p: 11 }, { p: 14 }], [{ lo: 11, hi: 14, x0: 0, x1: 3, label: '中枢' }], { w: 40, h: 100 }), '任何完成的走势类型必含 ≥1 个中枢') },
        { term: '⑥ 走势分解定理（第17课）', text: '<b>分解定理一</b>：任何级别的任何走势，都可分解成同级别“盘整”“下跌”“上涨”三种走势类型的连接。<br><b>分解定理二</b>：任何级别的任何走势类型，都至少由三段以上次级别走势类型构成。', fig: mfig('任意走势=三类走势的连接', drawZS([{ p: 10, label: '盘整' }, { p: 14 }, { p: 11 }, { p: 13 }, { p: 6, label: '下跌' }, { p: 3, label: '底', color: '#16a34a' }, { p: 7, label: '上涨' }, { p: 12, label: '顶', color: '#e74c3c', above: true }], [{ lo: 11, hi: 13, x0: 0, x1: 3, label: '盘整中枢' }], { w: 38, h: 100 }), '盘整 + 下跌 + 上涨 依次连接') },
      ]},
      { type: 'definition', title: '走势类型的延伸、结束与转化', items: [
        { term: '① 走势类型的延伸（第18课）', text: '走势类型形成后（已有中枢），只要围绕中枢的次级波动<b>始终触及中枢区间、不产生新中枢</b>，该走势类型就在<b>延伸</b>。盘整延伸＝中枢震荡；趋势延伸＝沿原方向不断产生<b>新的同向中枢</b>。', fig: mfig('延伸：不产生新中枢', drawZS([{ p: 5 }, { p: 9 }, { p: 6 }, { p: 8 }, { p: 5 }, { p: 9 }, { p: 7 }], [{ lo: 6, hi: 8, x0: 0, x1: 6, label: '同一中枢' }], { w: 36, h: 100 }), '围绕同一中枢震荡，仍是一个中枢') },
        { term: '② 走势类型的结束', text: '走势类型<b>结束</b>的标志，是产生<b>新中枢</b>（盘整变趋势）或<b>更大级别中枢</b>（级别扩张）。一旦结束，就必然<b>转化为其他类型</b>：下跌完成→转为上涨或盘整；上涨完成→转为下跌或盘整。', fig: mfig('结束：产生新中枢', drawZS([{ p: 5 }, { p: 9 }, { p: 6 }, { p: 8 }, { p: 13 }, { p: 16 }, { p: 12 }, { p: 15, label: '顶', color: '#e74c3c', above: true }], [{ lo: 6, hi: 8, x0: 0, x1: 3, label: '原中枢' }, { lo: 13, hi: 15, x0: 4, x1: 7, label: '新中枢' }], { w: 36, h: 100 }), '离开后形成新中枢 → 盘整结束转上涨') },
        { term: '③ 当下两难：延续还是改变（第17课）', text: '在任一走势的<b>当下</b>，永远面对“究竟是<b>延续</b>还是<b>改变</b>”的两难，这在当下层次上是“不患”（无法绝对预判）的。因此只能做<b>完全分类</b>：把延续与改变的各种情形都考虑好，分类应对，而非预测。', fig: mfig('当下两难：延续 or 改变', drawZS([{ p: 10 }, { p: 14 }, { p: 11 }, { p: 13, label: '?', color: '#f59e0b', above: true }], [{ lo: 11, hi: 13, x0: 0, x1: 3, label: '中枢' }], { w: 40, h: 100 }), '当下无法绝对预判，只能完全分类应对') },
        { term: '④ 第一、二类买点的由来（第17课）', text: '因为下跌走势完成后只能转化为上涨或盘整，故在<b>下跌完成的关节点</b>买入，就是第一类买点；而上涨与盘整都至少包含三个以上次级别运动，故第一类买点后<b>第一次次级别回调的低点</b>，其后必还有一次向上的次级别运动——这是<b>绝对安全</b>的第二类买点。卖点反之。', fig: mfig('一买、二买的由来', drawZS([{ p: 16 }, { p: 11 }, { p: 14 }, { p: 12 }, { p: 7, label: '一买', color: '#16a34a' }, { p: 11, label: '二买', color: '#2563eb' }, { p: 15, label: '顶', color: '#e74c3c', above: true }], [{ lo: 12, hi: 14, x0: 0, x1: 3, label: '下跌中枢' }], { w: 40, h: 104 }), '一买(7)后第一次回调低点(11)=二买') },
        { term: '⑤ 买卖点定律一（第17课）', text: '<span class="hl">任何级别的第二类买卖点，都由次级别相应走势的第一类买卖点构成。</span>', fig: mfig('二买 = 次级别的一买', drawZS([{ p: 7, label: '一买', color: '#16a34a' }, { p: 11, label: '二买', color: '#2563eb' }, { p: 15, label: '顶', color: '#e74c3c', above: true }], [], { w: 46, h: 100 }), '本级别二买，由次级别走势的一买构成') },
        { term: '⑥ 趋势转折定律（第17课）', text: '<span class="hl">任何级别的上涨转折，都是由某级别的第一类卖点构成的；任何级别的下跌转折，都是由某级别的第一类买点构成的。</span>（“某级别”不一定是次级别，也可能是不同级别同步共振。）', fig: mfig('趋势转折由一买/一卖构成', drawZS([{ p: 16 }, { p: 11 }, { p: 14 }, { p: 12 }, { p: 7, label: '一买', color: '#16a34a' }, { p: 11 }, { p: 15 }], [{ lo: 12, hi: 14, x0: 0, x1: 3, label: '下跌' }], { w: 40, h: 100 }), '下跌转折 = 某级别的一买构成') },
      ]},
      { type: 'motivation', title: '为什么“走势必完美”是缠论的根', text: '整个缠论只有一根主线：<b>走势必完美</b>。因为它，下跌走势终要完成、完成后必转化为上涨或盘整——这才使得<b>第一类买点</b>在逻辑上必然存在；也是它，让“走势可分解成三类走势类型的连接”从一句静态描述变成可操作的程序。其余所有定理（中枢、级别、买卖点、背驰）都是从它推演出来的。' },
      { type: 'pitfalls', title: '常见误区', items: [
        '把“走势必完美”理解成“<b>一定会涨/跌到某个点位</b>”——错：它说的是<b>走势类型的完成与转化</b>，不是点位预测。',
        '判断走势类型时<b>数错中枢</b>：把延伸的震荡当成了多个中枢（延伸仍是 1 个中枢）。',
        '以为<b>趋势的两个中枢可以重叠</b>（错：必须同向且绝对不重叠）。',
        '在<b>当下</b>妄图百分之百判断“延续还是改变”（错：当下只能完全分类，分类后机械应对）。',
      ]},
      { type: 'exercises', title: '练习', items: [
        { q: '一个走势里有 3 个中枢：前两个向下、互不重叠，第三个向上。这分解成哪几类走势类型？', a: '前两个向下同向中枢构成一段<b>下跌</b>趋势；之后向上的走势若只有一个中枢是<b>盘整</b>、若有两个向上中枢则是<b>上涨</b>。整体＝“下跌+盘整”或“下跌+上涨”的连接（分解定理一）。' },
        { q: '“走势必完美”能保证某个下跌走势一定跌到某支撑位再涨吗？', a: '<b>不能</b>。它只保证下跌走势<b>终要完成</b>、完成后<b>转化为</b>上涨或盘整，但不预判完成的具体点位。点位只能靠区间套、背驰在<b>当下</b>去定位。' },
      ]},
    ],
  });
})();
