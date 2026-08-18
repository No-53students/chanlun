/* 第40章 杜绝一根筋思维 */
(function () {

  function optCh40() {
    // 上：小级别下跌中出现"第三类卖点"；下：同一走势在大级别看只是中枢震荡
    const smallPts = [15, 13, 14, 12, 12.8, 11, 11.6, 10];
    const bigPts = [15, 12, 14, 11, 13, 10.5, 12.8, 11, 13.5];

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

    const smallPoints = [
      dot(0, 15, '#e74c3c', 'top', '顶 15'),
      dot(4, 12.8, '#e74c3c', 'top', '三卖：回抽不进中枢'),
      dot(7, 10, '#16a34a', 'bottom', '底 10'),
      segLbl(5.5, 10.6, '◀ 小级别：这是"第三类卖点"', '#e74c3c'),
    ];
    const bigPoints = [
      dot(5, 10.5, '#16a34a', 'bottom', '大级别一买？'),
      dot(6, 12.8, '#6b7280', 'top', '原"三卖"仅是震荡一部分'),
      segLbl(4, 15.4, '大级别：只是中枢震荡，甚至附近是一买', '#2563eb'),
    ];

    return {
      tooltip: { trigger: 'axis', axisPointer: { type: 'cross' } },
      grid: [
        { left: 58, right: 90, top: 34, height: 150 },
        { left: 58, right: 90, top: 238, height: 150 },
      ],
      xAxis: [
        { type: 'value', gridIndex: 0, min: 0, max: 7, interval: 1 },
        { type: 'value', gridIndex: 1, min: 0, max: 8, interval: 1, axisLabel: { show: false } },
      ],
      yAxis: [
        { type: 'value', gridIndex: 0, min: 9, max: 16.5, name: '小级别', nameLocation: 'middle', nameGap: 42 },
        { type: 'value', gridIndex: 1, min: 9, max: 16.5, name: '大级别', nameLocation: 'middle', nameGap: 42 },
      ],
      series: [
        mkSeries(0, '小级别', smallPts, [mkArea(0, 3, 13, 14, '小级别中枢 [13,14]')], smallPoints, '#e74c3c'),
        mkSeries(1, '大级别', bigPts, [mkArea(0, 8, 11, 14, '大级别中枢 [11,14]')], bigPoints, '#2563eb'),
      ],
    };
  }

  const figCompare = `
<div class="fig" style="min-width:360px"><div class="lbl">同一走势在不同级别的定性</div>
<div style="font-size:12.5px;line-height:1.9;color:#1f2937">
<table style="border-collapse:collapse;width:100%">
<tr style="background:#eef2ff"><th style="padding:5px 8px;text-align:left">级别视角</th><th style="padding:5px 8px;text-align:left">该位置是什么</th><th style="padding:5px 8px;text-align:left">操作含义</th></tr>
<tr><td style="padding:5px 8px"><b style="color:#e74c3c">小级别</b></td><td style="padding:5px 8px">第三类卖点（中枢破坏点）</td><td style="padding:5px 8px">卖出信号</td></tr>
<tr><td style="padding:5px 8px"><b style="color:#2563eb">大级别</b></td><td style="padding:5px 8px">中枢震荡的一部分</td><td style="padding:5px 8px">短线震荡，甚至附近是一买</td></tr>
</table>
</div>
<div class="cap">第86课：<span class="hl">不能死守单一级别的结论</span>——同一个"三卖"，换个级别看可能是震荡、甚至是大级别买点。</div></div>`;

  // ---- 讲解点小图 ----
  const figOneTrack = mfig('① 一根筋 = 机械世界观',
    '<div style="font-size:12px;line-height:1.9;color:#1f2937">起点相同 → 结果相同<br><b style="color:#991b1b">精密机械式思维</b><br><span style="color:#6b7280">法成则人成，人不成，法何成？</span></div>',
    '把世界看成精密机械，是典型的一根筋');

  const figOnce = mfig('② 心理合力 · 一次性',
    '<div style="font-size:12px;line-height:1.9;color:#1f2937">每天都是新世界<br>心理曲线<b>不可复制</b><br>→ 走势无固定公式</div>',
    '几千万人的交易，无百分百复制的可能');

  const figUp40 = mfig('③ 大级别上移中的小三卖',
    drawZS([{ p: 10, tag: '底' }, { p: 13, tag: '顶' }, { p: 11.5 }, { p: 15, tag: '顶' }, { p: 14, label: '小三卖', color: '#e74c3c' }, { p: 16, tag: '顶' }],
      [{ lo: 11.5, hi: 13, x0: 0, x1: 3, label: '大级别中枢' }],
      { w: 40, h: 100 }),
    '大级别上移中，小三卖只是警戒，不改上移');

  const figDown40 = mfig('④ 大级别下移中的小三卖',
    drawZS([{ p: 16, tag: '顶' }, { p: 14, tag: '底' }, { p: 15, tag: '顶' }, { p: 13, label: '三卖(无意义)', color: '#6b7280' }, { p: 12, tag: '底' }],
      [{ lo: 14, hi: 15.5, x0: 0, x1: 2, label: '大级别中枢' }],
      { w: 40, h: 100 }),
    '大级别下移中，小三卖基本无操作价值');

  const figOsc40 = mfig('⑤ 大级别震荡中的小三卖',
    drawZS([{ p: 12, tag: '顶' }, { p: 10, tag: '底' }, { p: 12.5, tag: '顶' }, { p: 10.5, label: '小三卖', color: '#e74c3c' }, { p: 9.5, tag: '底', label: '大买点?', color: '#16a34a' }, { p: 11, tag: '顶' }],
      [{ lo: 10, hi: 12.5, x0: 0, x1: 5, label: '大级别中枢' }],
      { w: 36, h: 100 }),
    '震荡中三卖可能只是短线机会，甚至反向出大买点');

  const figSeq = mfig('⑥ 买卖点先后级别的精确分析',
    '<div style="font-size:11.5px;line-height:1.8;color:#1f2937">大买点后小买点：二次介入<br>大卖点后小卖点：相反<br>大买点后小卖点：考验结构<br>大中枢中小买卖点：只做震荡</div>',
    '第86课：按先后买卖点级别精确分析');

  __chapters.push({
    id: 'ch40', vol: '卷八 · 理论深化', title: '第40章 杜绝一根筋思维', source: '原文第86课',
    figures: [
      { kind: 'echarts', title: '同一走势：小级别是"三卖"，大级别只是震荡', note: '第86课：必须<b>动态地</b>把握各种概念。上图：小级别看，这个位置（12.8）是跌破中枢后的<b>第三类卖点</b>；下图：<b>同一个位置</b>，放到大级别看，只是<b>大中枢震荡的一部分</b>，甚至附近就是<b>大级别的一买</b>。<span class="hl">不能死守单一级别的结论"一根筋"。</span>', option: optCh40 },
      { kind: 'html', title: '同一走势在不同级别的不同定性对比', note: '同一个走势、同一个价位，换个级别就换了定性：<b>小级别的"第三类卖点"</b>，在<b>大级别</b>可能只是中枢震荡的一部分，甚至是大级别买点。所以看盘必须有<b>大的眼界</b>，从最开始时就把不同级别联立起来理解。', html: figCompare },
    ],
    sections: [
      { type: 'definition', title: '一根筋思维的根源（第86课）', items: [
        { term: '① 一根筋 = 求永恒固定公式', text: '<span class="kw">一根筋思维</span>的心理基础，是企图找到一个<b>永恒固定的公式</b>，不管任何情况套进去就有现成答案；把世界看成一个精密机械，起点相同结果就相同。有些人学缠论，本质就是希望找到这样的东西，却不知道——<span class="hl">法成则人成，人不成，法何成？</span>', fig: figOneTrack },
        { term: '② 走势不可复制：心理合力的痕迹', text: '股票走势归根结底，是<b>参与者心理合力的痕迹</b>，而心理是不可重复的——没有人能百分百复制自己某日开盘四小时的心理曲线，几千万上亿人的交易更无复制可能。<span class="hl">每天都是新世界，走势不具有任何百分百复制的可能性</span>，所以没有放之四海皆准的固定公式。', fig: figOnce },
      ]},
      { type: 'definition', title: '第三类卖点的多级别动态理解（第86课）', items: [
        { term: '③ 大级别中枢上移中的小级别三卖', text: '在一个大级别的<b>中枢上移</b>中，小级别的第三类卖点唯一要注意的，是它扩展出的走势是否<b>改变大级别中枢上移本身</b>（按大级别走势不难发现其界限）。所以这种三卖<b>操作意义不大，关键是警戒意义</b>；做短差也只是小级别中枢震荡里来回。', fig: figUp40 },
        { term: '④ 大级别中枢下移中的小级别三卖', text: '在一个大级别的<b>中枢下移</b>中，小级别第三类卖点的意义就是看它是否让大级别中枢下移继续；若继续，则<b>没有任何操作价值</b>——大级别都中枢下移了，好的卖点早过了 N 的 N 次方个，市场已给你无数次机会。', fig: figDown40 },
        { term: '⑤ 大级别中枢震荡中的小级别三卖', text: '在一个大级别的<b>中枢震荡</b>中，小级别第三类卖点的意义看它是否延伸出<b>大级别的第三类卖点</b>；没有这种危险，本质上不构成大机会，只是短线震荡机会。而且<span class="hl">很可能一个小级别三卖之后，反而延伸出大级别的买点</span>——这在震荡中太常见，也是"多空通杀"的常用技巧。', fig: figOsc40 },
        { term: '⑥ 按先后买卖点级别精确分析', text: '根据先后买卖点的级别，无非几种情况：<b>大买点后小买点</b>（往往构成相对大买点的第二次介入机会）、大卖点后小卖点、大买点后小卖点、大卖点后小买点、<b>大中枢中的小买卖点</b>（只制造中枢震荡）。其中大级别中枢震荡中的<b>次级别买卖点</b>，往往具有大级别的操作意义。', fig: figSeq },
      ]},
      { type: 'motivation', title: '多级别联立，才不是一根筋', text: '一根筋思维的病根，是<b>把世界看成可套公式的机械</b>；而走势是心理合力的痕迹、不可复制。所以从最开始就必须有<b>大的眼界</b>——如果看 1 分钟就被锁死在 1 分钟层面，搞 100 年也进步不了。把同一个买卖点放进<b>大级别背景</b>里看（上移、下移、震荡），它的操作意义完全不同。多级别联立地、动态地理解每个概念，才是杜绝一根筋、避免被"多空通杀"搞乱舞步的根本。' },
      { type: 'pitfalls', title: '常见误区', items: [
        '求一个"永恒固定公式"，套进去就有答案（错：<b>法成则人成</b>，无此公式）。',
        '看 1 分钟就被锁死在 1 分钟层面（错：必须有<b>大的眼界</b>、动态把握概念）。',
        '一看到"第三类卖点"就无条件卖出（错：要看<b>大级别背景</b>——上移中只是警戒、震荡中只是短线）。',
        '把走势当成可复制、可预测的机械（错：<b>心理合力不可复制</b>）。',
        '用"止蚀"来弥补反应慢（错：三大卖点给三次机会、不同级别机会更多，不必等缺胳膊少腿才止蚀）。',
      ]},
      { type: 'exercises', title: '练习', items: [
        { q: '什么是"一根筋思维"？', a: '企图找到一个<b>永恒固定的公式</b>，把世界看成精密机械，只要起点相同结果就相同；而实际上走势是<b>心理合力的痕迹</b>、不可复制。' },
        { q: '同一个"第三类卖点"，在大级别上移、下移、震荡三种背景下的操作意义有何不同？', a: '上移中：<b>只是警戒</b>，关键是是否改变上移本身；下移中：<b>基本无意义</b>，好卖点早过了；震荡中：<b>只是短线机会</b>，甚至反向延伸出大级别买点。' },
        { q: '为什么缠论里不需要"止蚀"这种概念？', a: '因为<b>三大卖点给三次机会</b>，加上不同级别机会更多，把握理论即可从容应对；等缺胳膊少腿才去止蚀，说明早就错过了应有的买卖点。' },
      ]},
    ],
  });
})();
