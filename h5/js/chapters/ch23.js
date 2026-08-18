/* 第23章 每日走势分类 */
(function () {

  function optCh23() {
    // 8 根 30 分钟 K 线（candlestick 数据 [x, o, c, l, h]）
    const c1 = [[0,10,11,9.5,11.3],[1,11.5,12.5,11.2,12.8],[2,13,14,12.8,14.3],[3,14.5,15.5,14.2,15.8],[4,16,17,15.8,17.3],[5,17.5,18.5,17.2,18.8],[6,19,20,18.8,20.3],[7,20.5,21.5,20.2,21.8]];
    const c2 = [[0,10,11,9.9,11.2],[1,11,10.5,10.1,11.3],[2,10.5,10.8,10.2,11.2],[3,10.8,11.3,10.3,11.4],[4,11.3,10.7,10.2,11.5],[5,10.7,11.1,10.3,11.3],[6,11.1,11.5,10.4,11.6],[7,11.5,11.2,10.5,11.5]];
    const c3 = [[0,10,10.8,9.9,11],[1,10.8,10.2,10,11.5],[2,10.2,11,10,11.3],[3,11.5,13.5,11.2,13.8],[4,13.5,13,12.9,14.5],[5,13,13.8,13,14.2],[6,13.8,14.2,13.1,14.5],[7,14.2,15.2,14,15.4]];
    const mk = (x0, x1, lo, hi, name) => [{ xAxis: x0, yAxis: lo, name }, { xAxis: x1, yAxis: hi }];
    const seg = (x, y, name, color) => ({ coord: [x, y], name, symbol: 'none', label: { show: true, color, fontSize: 12, fontWeight: 'bold', position: 'top', formatter: function (p) { return p.name; } } });
    const seg2 = (x, y, name, color) => ({ coord: [x, y], name, symbol: 'none', label: { show: true, color, fontSize: 11, fontWeight: 'bold', position: 'bottom', formatter: function (p) { return p.name; } } });
    const cand = { type: 'candlestick', barWidth: 0.62, itemStyle: { color: upColor, color0: downColor, borderColor: upColor, borderColor0: downColor } };
    return {
      tooltip: { trigger: 'axis', axisPointer: { type: 'cross' } },
      grid: [
        { left: 60, right: 20, top: 26, height: '24%' },
        { left: 60, right: 20, top: '41%', height: '24%' },
        { left: 60, right: 20, top: '72%', height: '20%' },
      ],
      xAxis: [
        { type: 'value', gridIndex: 0, min: -0.5, max: 7.5, interval: 1, axisLabel: { formatter: function (v) { return 'K' + (v + 1); } } },
        { type: 'value', gridIndex: 1, min: -0.5, max: 7.5, interval: 1, axisLabel: { formatter: function (v) { return 'K' + (v + 1); } } },
        { type: 'value', gridIndex: 2, min: -0.5, max: 7.5, interval: 1, axisLabel: { formatter: function (v) { return 'K' + (v + 1); } } },
      ],
      yAxis: [
        { type: 'value', gridIndex: 0, scale: true },
        { type: 'value', gridIndex: 1, scale: true },
        { type: 'value', gridIndex: 2, scale: true },
      ],
      series: [
        Object.assign({ name: '无中枢·单边', data: c1, xAxisIndex: 0, yAxisIndex: 0,
          markPoint: { data: [seg(3.5, 22.6, '三、无中枢：单边（最强）', '#e74c3c')] } }, cand),
        Object.assign({ name: '一个中枢·盘整', data: c2, xAxisIndex: 1, yAxisIndex: 1,
          markArea: { silent: true, itemStyle: { color: 'rgba(37,99,235,0.10)' }, label: { show: true, position: 'insideTop', formatter: function (p) { return p.name || ''; }, color: '#2563eb', fontSize: 11 }, data: [mk(0, 7, 10.5, 11.2, '中枢 [10.5,11.2]')] },
          markPoint: { data: [seg(3.5, 12.2, '二、一个中枢：盘整（平衡市）', '#2563eb')] } }, cand),
        Object.assign({ name: '两个中枢·趋势', data: c3, xAxisIndex: 2, yAxisIndex: 2,
          markArea: { silent: true, itemStyle: { color: 'rgba(37,99,235,0.10)' }, label: { show: true, position: 'insideTop', formatter: function (p) { return p.name || ''; }, color: '#2563eb', fontSize: 11 }, data: [mk(0, 2, 10, 11, '中枢1 [10,11]'), mk(4, 6, 13.1, 14.2, '中枢2 [13.1,14.2]')] },
          markPoint: { data: [seg(3.5, 16.2, '一、两个中枢：趋势（向上）', '#16a34a'), seg2(3, 11.9, '单边区间', '#9333ea')] } }, cand),
      ],
    };
  }

  const fig8K = `
<div class="fig" style="min-width:260px"><div class="lbl">一天 = 8 根 30 分钟 K 线</div>${klineAnnSVG(
  [mk(10,11,true), mk(11,12,true), mk(11.5,12.5,true), mk(12,13,true), mk(12.5,13.5,true), mk(13,14,true), mk(13.5,14.5,true), mk(14,15,true)],
  [{ i: 0, text: 'K1', pos: 'bottom' }, { i: 3, text: 'K4', pos: 'bottom' }, { i: 7, text: 'K8', pos: 'bottom' }],
  { w: 34, h: 110, padT: 18, padB: 20 }
)}<div class="cap">4 小时 = 8 根 30 分钟 K 线；<br>3 根相邻 30 分钟 K 线的重叠 = 一个“中枢”</div></div>
<div class="fig" style="min-width:250px"><div class="lbl">三类当日走势（力度依次趋强）</div>${drawZS(
  [{ p: 8, tag: '底' }, { p: 15, tag: '顶', label: '无中枢·单边' }], [],
  { w: 48, h: 96 }
)}${drawZS(
  [{ p: 8, tag: '底' }, { p: 12, tag: '顶' }, { p: 10, tag: '底' }, { p: 13, tag: '顶' }, { p: 11, tag: '底' }, { p: 12, tag: '顶' }],
  [{ lo: 10, hi: 12, x0: 0, x1: 5, label: '一个中枢·盘整' }],
  { w: 48, h: 96 }
)}${drawZS(
  [{ p: 8, tag: '底' }, { p: 11, tag: '顶' }, { p: 9.5, tag: '底' }, { p: 10.5, tag: '顶' }, { p: 13, tag: '顶', label: '两中枢·趋势' }, { p: 12 }, { p: 14, tag: '顶' }],
  [{ lo: 9.5, hi: 11, x0: 0, x1: 3, label: '中枢1' }, { lo: 12.5, hi: 13.5, x0: 4, x1: 6, label: '中枢2' }],
  { w: 48, h: 96 }
)}<div class="cap">无中枢（单边）&gt; 一个中枢（盘整）&gt; 两个中枢（趋势）</div></div>`;

  __chapters.push({
    id: 'ch23', vol: '卷五 · 分解与操作', title: '第23章 每日走势分类', source: '原文第46课',
    figures: [
      { kind: 'echarts', title: '三类当日走势：8 根 30 分钟 K 线', note: '一天 4 小时 = 8 根 30 分钟 K 线，把<b>3 根相邻 30 分钟 K 线的重叠</b>当成一个中枢，则任何一天的走势无非三类：<b>三、无中枢</b>（单边，最强）、<b>二、一个中枢</b>（盘整/平衡市）、<b>一、两个中枢</b>（趋势，向上或向下）。图中下栏两中枢之间第 4 根 K 线是<b>单边区间</b>（紫色标注），它不从属任何一个中枢，是其后走势的关键位置。', option: optCh23 },
      { kind: 'html', title: '一天的 K 线骨架与三类强弱', note: '上：一天的 8 根 30 分钟 K 线。下：三类当日走势的骨架——<b>无中枢</b>的单边最强，<b>一个中枢</b>是平衡市（盘整），<b>两个中枢</b>同向不重叠构成趋势。', html: fig8K },
    ],
    sections: [
      { type: 'definition', title: '分类的基本规则', items: [
        { term: '① 一天 = 8 根 30 分钟 K 线', text: '一天的交易时间是 4 小时，等于 <b>8 根 30 分钟 K 线</b>组成的系统。把 <span class="hl">3 根相邻 30 分钟 K 线的重叠部分</span>当成每天走势上的一个中枢，即可对当日走势分类。', formula: '4 小时 = 8 根 30 分钟 K 线', fig: mfig('8 根 30 分钟 K 线', klineAnnSVG([mk(10, 11, true), mk(11, 12, true), mk(11.5, 12.5, true), mk(12, 13, true), mk(12.5, 13.5, true), mk(13, 14, true), mk(13.5, 14.5, true), mk(14, 15, true)], [{ i: 0, text: 'K1', pos: 'bottom' }, { i: 7, text: 'K8', pos: 'bottom' }], { w: 28, h: 96, padT: 16, padB: 20 }), '一天 = 8 根 30 分钟 K 线') },
        { term: '② 三类走势，力度依次趋强', text: '任何一天的走势，<b>无非只有三类</b>：<span class="hl">一、只有一个中枢</span>（盘整/平衡市）；<span class="hl">二、两个中枢</span>（趋势）；<span class="hl">三、没有中枢</span>（单边）。它们的<b>力度依次趋强</b>。', formula: '无中枢(单边) > 一个中枢(盘整) > 两个中枢(趋势)', fig: mfig('三类强弱', drawZS([{ p: 8, tag: '底' }, { p: 14, tag: '顶', label: '无中枢' }], [], { w: 40, h: 82 }) + drawZS([{ p: 8 }, { p: 12 }, { p: 10 }, { p: 13 }, { p: 11 }], [{ lo: 10, hi: 12, x0: 0, x1: 4, label: '一中枢' }], { w: 40, h: 82 }) + drawZS([{ p: 8 }, { p: 11 }, { p: 9.5 }, { p: 10.5 }, { p: 13 }, { p: 12 }, { p: 14 }], [{ lo: 9.5, hi: 11, x0: 0, x1: 3, label: '中枢1' }, { lo: 12.5, hi: 13.5, x0: 4, x1: 6, label: '中枢2' }], { w: 40, h: 82 }), '单边最强、盘整居中、趋势最温和') },
      ]},
      { type: 'definition', title: '三类详解', items: [
        { term: '① 一个中枢：平衡市', text: '只有一个中枢是<b>典型的平衡市</b>。一般开盘后<b>前三根 30 分钟 K 线</b>就决定了全天波动区间，全天极限位置（高或低）至少一个出现在前三根上。细分：前三根出现<b>当天高点</b>为弱平衡市；出现<b>当天低点</b>为强平衡市；都不出现为转折平衡市。', fig: mfig('平衡市：前三根定区间', drawZS([{ p: 9.5, tag: '底' }, { p: 12, tag: '顶' }, { p: 10.5, tag: '底' }, { p: 11.8, tag: '顶' }, { p: 10.8, tag: '底' }, { p: 11.5, tag: '顶' }, { p: 11, tag: '底' }, { p: 11.6, tag: '顶' }], [{ lo: 10.5, hi: 11.8, x0: 0, x1: 7, label: '平衡市中枢' }], { w: 32, h: 100 }), '一个中枢 = 平衡市（前三根决定波动区间）') },
        { term: '② 两个中枢：趋势（向上/向下）', text: '两个中枢<b>不能有重叠</b>，否则转化为一个中枢。其最大特点是：两中枢之间<b>至少有一根 30 分钟 K 线</b>的部分区间不属于任何一个中枢——这个<span class="kw">单边区间</span>是其后走势的<b>关键位置</b>。因只有 8 根 K 线，单边区间只可能在第 4 或第 5 根 K 线，<span class="hl">所以单边走势的变盘时间都在中午收盘前后 30 分钟之内</span>。', fig: mfig('两中枢 + 单边区间', drawZS([{ p: 8, tag: '底' }, { p: 11, tag: '顶' }, { p: 9.5, tag: '底' }, { p: 10.5, tag: '顶' }, { p: 13, label: '单边区间', color: '#9333ea', above: true }, { p: 12, tag: '底' }, { p: 14, tag: '顶' }], [{ lo: 9.5, hi: 11, x0: 0, x1: 3, label: '中枢1' }, { lo: 12.5, hi: 13.5, x0: 4, x1: 6, label: '中枢2' }], { w: 40, h: 100 }), '两中枢之间必有“单边区间”（不从属任一中枢）') },
        { term: '③ 无中枢：最强单边', text: '8 根 K 线里<b>没有相邻 3 根有重叠</b>，就是最强的单边走势，<b>很不常见</b>（如 227）。出现这种走势的日 K 线都有重要意义。但注意：<span class="hl">并非出现它就一定延续趋势</span>——在大日 K 线中枢中出现，往往是骗线；若在<b>第三类买卖点之后</b>出现，则大级别强势趋势的可能性就极大。', fig: mfig('无中枢：单边', drawZS([{ p: 8, tag: '底' }, { p: 16, tag: '顶', label: '无重叠' }], [], { w: 44, h: 96 }), '相邻 3 根均无重叠 → 最强单边') },
      ]},
      { type: 'motivation', title: '把“看盘”变成一道分类题', text: '每天开盘后，不必猜测涨跌，只需把 8 根 30 分钟 K 线逐个摆出来，数一数<b>有几个中枢</b>、<b>单边区间在哪</b>，当日的性质与强弱便一清二楚。这是一个纯粹的<b>几何分类</b>，不含任何预测成分——它把散乱的分时波动，压缩成“无中枢 / 一中枢 / 两中枢”三种状态，是短线节奏判断的快速抓手。' },
      { type: 'pitfalls', title: '常见误区', items: [
        '把“3 根相邻 K 线重叠”当成全天的中枢——它只是<b>分类用</b>的每天级别中枢，与严格的操作级别中枢不是一回事。',
        '以为两个中枢可以<b>有重叠</b>——两个中枢若有重叠就退化成“一个中枢”的情形。',
        '以为单边区间可以在任意位置——只有 8 根 K 线，单边区间<b>只能</b>在第 4 或第 5 根（中午前后 30 分钟变盘）。',
        '看到“无中枢单边”就追——在大中枢里出现往往是<b>骗线</b>，只有第三类买卖点后的单边才大概率是真趋势。',
      ]},
      { type: 'exercises', title: '练习', items: [
        { q: '一天 8 根 30 分钟 K 线，如何判定当日属于哪一类？', a: '把 3 根相邻 K 线的重叠当中枢，数中枢个数：<b>0 个</b>＝无中枢单边（最强）；<b>1 个</b>＝盘整/平衡市；<b>2 个</b>＝趋势（两个中枢同向且不重叠）。' },
        { q: '“两个中枢”的走势，最关键的区间是什么？它一般出现在第几根 K 线？', a: '关键是<b>单边区间</b>——两中枢之间至少一根 K 线的部分区间不从属任一中枢。因只有 8 根 K 线，它只可能在第 4 或第 5 根，所以单边走势常在<b>中午收盘前后 30 分钟</b>变盘。' },
        { q: '无中枢的单边走势一定意味着大级别趋势延续吗？', a: '不一定。若出现在<b>大日 K 线中枢</b>中，往往是骗线；只有出现在<b>第三类买卖点之后</b>，大级别强势趋势的可能性才极大。' },
      ]},
    ],
  });
})();
