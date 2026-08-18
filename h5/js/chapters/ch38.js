/* 第38章 获利机会的绝对分类 */
(function () {

  function optCh38() {
    // 上：中枢上移（趋势）；下：中枢震荡（盘整）——两条走势对比
    const trendPts = [10, 12.5, 11.5, 13, 12, 15, 14, 16.5, 15.5, 18, 17, 20];
    const oscPts = [10, 13, 11, 13.5, 10.5, 13, 11.5, 12.5, 10.8, 13.2, 11, 13];

    const mkArea = (x0, x1, lo, hi, name) => [{ xAxis: x0, yAxis: lo, name }, { xAxis: x1, yAxis: hi }];
    const segLbl = (x, y, t, color) => ({ coord: [x, y], name: t, symbol: 'none', label: { show: true, color: color || '#1f2937', fontSize: 11, fontWeight: 'bold', position: 'top' } });
    const dot = (x, y, c, pos, t) => ({ coord: [x, y], name: t, symbol: 'circle', symbolSize: 9, itemStyle: { color: c }, label: { show: true, color: c, fontSize: 10, position: pos, distance: 4, fontWeight: 'bold', formatter: function (p) { return p.name; } } });

    function mkSeries(gi, name, pts, areas, points, color) {
      return {
        name, type: 'line', xAxisIndex: gi, yAxisIndex: gi,
        data: pts.map((p, i) => [i, p]),
        symbol: 'circle', symbolSize: 5,
        lineStyle: { width: 2.2, color: color }, itemStyle: { color: color },
        markArea: {
          silent: true, itemStyle: { color: 'rgba(37,99,235,0.12)' },
          label: { show: true, position: 'insideTop', formatter: function (p) { return p.name || ''; }, color: '#2563eb', fontSize: 11, fontWeight: 'bold' },
          data: areas,
        },
        markPoint: { data: points },
      };
    }

    const trendPoints = [
      dot(0, 10, '#16a34a', 'bottom', '底·起点'),
      dot(11, 20, '#e74c3c', 'top', '顶 20'),
      segLbl(5.5, 18.6, '◀ 中枢不断上移 = 趋势', '#e74c3c'),
    ];
    const oscPoints = [
      dot(1, 13, '#e74c3c', 'top', '卖'),
      dot(2, 11, '#16a34a', 'bottom', '买'),
      dot(4, 10.5, '#16a34a', 'bottom', '买'),
      dot(7, 12.5, '#e74c3c', 'top', '卖'),
      dot(9, 13.2, '#e74c3c', 'top', '卖'),
      dot(10, 11, '#16a34a', 'bottom', '买'),
      segLbl(5.5, 13.4, '围绕同一中枢反复震荡 = 盘整', '#2563eb'),
    ];

    return {
      tooltip: { trigger: 'axis', axisPointer: { type: 'cross' } },
      grid: [
        { left: 58, right: 90, top: 32, height: 160 },
        { left: 58, right: 90, top: 244, height: 160 },
      ],
      xAxis: [
        { type: 'value', gridIndex: 0, min: 0, max: 11, interval: 1 },
        { type: 'value', gridIndex: 1, min: 0, max: 11, interval: 1, axisLabel: { show: false } },
      ],
      yAxis: [
        { type: 'value', gridIndex: 0, min: 9, max: 21, name: '中枢上移', nameLocation: 'middle', nameGap: 42 },
        { type: 'value', gridIndex: 1, min: 9, max: 14, name: '中枢震荡', nameLocation: 'middle', nameGap: 42 },
      ],
      series: [
        mkSeries(0, '中枢上移（趋势）', trendPts, [mkArea(1, 4, 11.5, 13, '中枢A [11.5,13]'), mkArea(5, 8, 14, 16.5, '中枢B [14,16.5]')], trendPoints, '#e74c3c'),
        mkSeries(1, '中枢震荡（盘整）', oscPts, [mkArea(0, 11, 10.8, 13.2, '单中枢 [10.8,13.2]')], oscPoints, '#2563eb'),
      ],
    };
  }

  const figStrategy = `
<div class="fig" style="min-width:340px"><div class="lbl">两类机会的应对策略</div>
<div style="font-size:12.5px;line-height:1.95;color:#1f2937">
<b style="color:#e74c3c">① 中枢上移（趋势）</b>：理论上<b>无短差机会</b><br>
&nbsp;&nbsp;→ 拿住，直到上移结束进入新中枢震荡<br>
&nbsp;&nbsp;→ 关键警戒：第三类买点是否出现<br>
<b style="color:#2563eb">② 中枢震荡（盘整）</b>：短差的<b>理论天堂</b><br>
&nbsp;&nbsp;→ 向上离开段卖点区域走掉，回落回补<br>
&nbsp;&nbsp;→ 唯一致命：出现三买不回补 → 错过上移<br>
<b style="color:#16a34a">③ 多级别纵向视野</b>：<br>
&nbsp;&nbsp;→ 月线上涨，在年线看只是中枢震荡一小段
</div>
<div class="cap">所有盈利点都逃不出这两类；再用<b>多级别纵向比较</b>，才知道当前是哪种机会、能拿多大。</div></div>`;

  // ---- 讲解点小图 ----
  const figUp = mfig('① 中枢上移 = 该级别上涨走势',
    drawZS([{ p: 10, tag: '底' }, { p: 13, tag: '顶' }, { p: 11.5 }, { p: 14, tag: '顶' }, { p: 12 }, { p: 16, tag: '顶', label: '趋势' }],
      [{ lo: 11.5, hi: 13, x0: 0, x1: 3, label: '中枢A' }, { lo: 12, hi: 14, x0: 2, x1: 5, label: '中枢B(上移)' }],
      { w: 34, h: 104 }),
    '中枢不断上移：两个中枢不重叠、后者更高');

  const figOsc = mfig('② 中枢震荡 = 盘整 / 新中枢延续',
    drawZS([{ p: 12, tag: '顶' }, { p: 10, tag: '底' }, { p: 12.5, tag: '顶' }, { p: 10.5, tag: '底' }, { p: 12, tag: '顶' }],
      [{ lo: 10.5, hi: 12, x0: 0, x1: 4, label: '单中枢' }],
      { w: 44, h: 100 }),
    '围绕一个中枢反复震荡；或上涨中新中枢形成后的延续');

  const figView = mfig('③ 横切面 vs 纵向视野',
    '<div style="font-size:12px;line-height:1.9;color:#1f2937">同一级别看 = <b>横切面</b><br>不同级别纵向比较 = <b>纵向视野</b><br><span style="color:#6b7280">月线上涨，年线看只是震荡一小段</span></div>',
    '换个级别看，才知道机会的级别与大小');

  const figNoShort = mfig('④ 中枢上移中：无理论短差机会',
    drawZS([{ p: 10, tag: '底' }, { p: 13, tag: '顶' }, { p: 11.5 }, { p: 15, tag: '顶' }, { p: 13.5 }, { p: 17, tag: '顶', label: '上移中' }],
      [{ lo: 11.5, hi: 13, x0: 0, x1: 3, label: '中枢' }],
      { w: 34, h: 100 }),
    '上移中不存在理论上短差机会，除非上移结束进入新中枢震荡');

  const figShort = mfig('⑤ 中枢震荡：短差的理论天堂',
    drawZS([{ p: 12.5, tag: '顶', label: '卖' }, { p: 10.5, tag: '底', label: '买' }, { p: 12, tag: '顶', label: '卖' }, { p: 10.8, tag: '底', label: '买' }, { p: 12.3, tag: '顶' }],
      [{ lo: 10.8, hi: 12.3, x0: 0, x1: 4, label: '中枢' }],
      { w: 40, h: 100 }),
    '向上离开段卖点区域走掉，回落必有机会回补；唯一致命是三买不回补');

  const figLong = mfig('⑥ 长线：年中枢上移 = 最牛机会',
    '<div style="font-size:12px;line-height:1.9;color:#1f2937">季线/月线中枢上移<br>= 一生最大的单品种长线机会<br><span style="color:#6b7280">0成本才是真正有意义</span></div>',
    '基本面必须在几何理论的关照下才有意义');

  __chapters.push({
    id: 'ch38', vol: '卷八 · 理论深化', title: '第38章 获利机会的绝对分类', source: '原文第73课',
    figures: [
      { kind: 'echarts', title: '中枢上移 vs 中枢震荡：两类获利机会', note: '第73课：任何市场的获利机会，用缠论的语言来说只有<b>两种</b>——<span class="kw">中枢上移</span>与<span class="kw">中枢震荡</span>。上图：<b>中枢上移</b>就是中枢不断上移的该级别上涨走势（趋势，红色）；下图：<b>中枢震荡</b>就是围绕一个中枢反复震荡的盘整（蓝色）。<span class="hl">任何盈利点都落在其中一类，逃不出这两种模式。</span>', option: optCh38 },
      { kind: 'html', title: '两类机会的应对策略', note: '同一级别里，<b>中枢上移中不存在理论上短差机会</b>，只能拿住；<b>中枢震荡才是短差的理论天堂</b>——唯一需要技术的是对<b>第三类买点</b>的判断，出现三买不回补就可能错过一次新的中枢上移。还要用<b>多级别纵向比较</b>：一个月的上涨，在年线级别可能只是中枢震荡中的一个小段。', html: figStrategy },
    ],
    sections: [
      { type: 'definition', title: '两类获利机会（第73课）', items: [
        { term: '① 中枢上移 = 该级别上涨走势', text: '<span class="kw">中枢上移</span>，站在走势类型同级别的角度，就是意味着该级别的<b>上涨走势</b>（趋势）——中枢不断上移、前后中枢不能重叠。这是趋势型的获利机会。', fig: figUp },
        { term: '② 中枢震荡 = 盘整 / 新中枢延续', text: '<span class="kw">中枢震荡</span>，有可能是该级别的<b>盘整</b>，或者该级别上涨中<b>新中枢形成后的延续过程</b>。任何市场的获利机会，都逃不出中枢上移与中枢震荡这两种模式，只是"百姓日用而不知，本ID理论而知"。', fig: figOsc },
        { term: '③ 多级别纵向视野', text: '用<b>同一级别的视角</b>去看走势，如同用横切面考察；把<b>不同级别纵向比较</b>，走势就有了纵向视野。一个<b>月线级别</b>的上涨，在<b>年线级别</b>上可能只是一个中枢震荡中的小段；一个年中枢的上移，才是人生可能参与的最大投资机会。', fig: figView },
      ]},
      { type: 'definition', title: '两类机会的操作与长线选股（第73课）', items: [
        { term: '④ 中枢上移中无短差机会', text: '在操作级别下，<b>中枢上移中不存在任何理论上短差机会</b>，除非这种上移结束、进入新中枢的形成与震荡。所以趋势里正确的做法是<b>拿住</b>，而不是反复做短差踏空。', fig: figNoShort },
        { term: '⑤ 中枢震荡是短差天堂 + 三买判断', text: '<span class="hl">中枢震荡，就是短差的理论天堂。</span>只要在任何中枢震荡<b>向上离开段的卖点区域</b>走掉，必然有机会在其后的中枢震荡中回补回来。唯一需要技术要求的，是对<b>第三类买点</b>的判断：出现三买不回补，就可能错过一次新的中枢上移（或进入更大中枢震荡，回补机会仍是绝对的）。', fig: figShort },
        { term: '⑥ 基本面在几何理论关照下', text: '长线选股要看基本面与世界经济综合判断，但<b>任何基本面，必须在本ID的几何理论的关照下才有意义</b>——这样才能知道这基本面对应的是什么级别、什么类型的获利机会。最牛的股票与最牛的企业最终必然对应；<span class="hl">任何投资，必须是 0 成本才是真正有意义的。</span>', formula: '基本面 → 几何理论关照 → 判断机会的级别与类型', fig: figLong },
      ]},
      { type: 'motivation', title: '先分类，再谈操作', text: '"低买高卖就能获利"是一种笼统的看法，没有操作与指导意义。缠论把一切盈利机会<b>绝对地</b>归为两类：中枢上移与中枢震荡，再配合<b>多级别纵向视野</b>，你才能当下判断：现在到底是趋势还是盘整、这机会能拿多大、该拿住还是做短差。分类是操作的第一步，也是唯一能让你从"凭感觉"走向"按理论"的一步。' },
      { type: 'pitfalls', title: '常见误区', items: [
        '把"低买高卖"当成有操作意义的分类（错：太笼统，缠论下只有<b>中枢上移与中枢震荡</b>两类）。',
        '在中枢上移中反复做短差（错：上移中<b>无理论短差机会</b>，容易踏空趋势）。',
        '中枢没分清、级别没搞懂、上移与震荡分不清就做短差（成功只靠运气，天上哪能天天掉死耗子）。',
        '只用单一级别（横切面）看盘（错：要<b>多级别纵向比较</b>，才不漏掉大机会/大风险）。',
        '出现第三类买点却不回补（错：会错过一次新的中枢上移）。',
      ]},
      { type: 'exercises', title: '练习', items: [
        { q: '按缠论，任何市场的获利机会绝对分为哪两类？', a: '<span class="hl">中枢上移与中枢震荡。</span>中枢上移对应同级别的上涨走势（趋势），中枢震荡对应盘整或上涨中新中枢形成后的延续过程。' },
        { q: '为什么说"中枢震荡是短差的理论天堂"？', a: '因为只要在<b>向上离开段的卖点区域</b>走掉，其后中枢震荡必然有机会回补。唯一要注意的是<b>第三类买点</b>：出现三买不回补，就可能错过一次新的中枢上移。' },
        { q: '一个月的上涨，站在年线级别看是什么？这说明了什么？', a: '可能只是<b>年中枢震荡中的一个小段</b>。说明必须用<b>多级别纵向比较</b>去看走势，才能判断当前机会的级别与大小（一个年中枢的上移才是最牛的长线机会）。' },
      ]},
    ],
  });
})();
