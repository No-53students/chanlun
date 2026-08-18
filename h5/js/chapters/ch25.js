/* 第25章 分型辅助操作 */
(function () {

  function optCh25() {
    // 上层：日线 K 线（含顶分型）
    const candles = [[0,10,11,9.8,11.2],[1,11,11.5,10.8,11.8],[2,11.5,11.2,11,12.5],[3,11.2,10.8,10.5,11.3],[4,10.8,10,10,11.2],[5,10,9.5,9.3,10.2]];
    // 下层：小级别走势（一卖 → 中枢 → 二卖 → 盘整背驰）
    const pts = [5, 8, 6.5, 7.5, 5.5, 4];
    const mk = (x0, x1, lo, hi, name) => [{ xAxis: x0, yAxis: lo, name }, { xAxis: x1, yAxis: hi }];
    const mp = (i, name, color, pos) => ({ coord: [i, pts[i]], name, symbol: 'circle', symbolSize: 9, itemStyle: { color }, label: { show: true, color, fontSize: 10, position: pos, distance: 6, fontWeight: 'bold', formatter: function (p) { return p.name; } } });
    const seg = (x, y, name, color, pos) => ({ coord: [x, y], name, symbol: 'none', label: { show: true, color, fontSize: 12, fontWeight: 'bold', position: pos || 'top', formatter: function (p) { return p.name; } } });
    return {
      tooltip: { trigger: 'axis', axisPointer: { type: 'cross' } },
      grid: [
        { left: 60, right: 20, top: 26, height: '40%' },
        { left: 60, right: 20, top: '66%', height: '26%' },
      ],
      xAxis: [
        { type: 'value', gridIndex: 0, min: -0.5, max: 5.5, interval: 1, axisLabel: { formatter: function (v) { return 'K' + (v + 1); } } },
        { type: 'value', gridIndex: 1, min: -0.5, max: 5.5, interval: 1, axisLabel: { formatter: function (v) { return '小' + (v + 1); } } },
      ],
      yAxis: [
        { type: 'value', gridIndex: 0, scale: true },
        { type: 'value', gridIndex: 1, scale: true },
      ],
      series: [
        { name: '日线K线', type: 'candlestick', data: candles, xAxisIndex: 0, yAxisIndex: 0, barWidth: 0.5,
          itemStyle: { color: upColor, color0: downColor, borderColor: upColor, borderColor0: downColor },
          markPoint: { data: [
            { coord: [2, 12.5], name: '顶分型', symbol: 'triangle', symbolRotate: 180, symbolSize: 18, itemStyle: { color: '#e74c3c' }, label: { show: true, color: '#e74c3c', fontSize: 11, fontWeight: 'bold', position: 'top', formatter: function (p) { return p.name; } } },
            seg(0.5, 12.9, '日线：顶分型（顶点）', '#1f2937', 'top'),
          ] } },
        { name: '小级别走势', type: 'line', data: pts.map((p, i) => [i, p]), xAxisIndex: 1, yAxisIndex: 1,
          symbol: 'circle', symbolSize: 5, lineStyle: { width: 2, color: '#1f2937' }, itemStyle: { color: '#1f2937' },
          markArea: { silent: true, itemStyle: { color: 'rgba(37,99,235,0.10)' }, label: { show: true, position: 'insideTop', formatter: function (p) { return p.name || ''; }, color: '#2563eb', fontSize: 11 }, data: [mk(0, 3, 6.5, 7.5, '小级别中枢 [6.5,7.5]')] },
          markLine: { silent: true, symbol: 'none', lineStyle: { color: '#2563eb', type: 'dashed', width: 1 }, label: { show: true, position: 'end', formatter: function (p) { return p.name; }, color: '#2563eb', fontSize: 10 }, data: [
            { yAxis: 8, name: '一卖高点=8' },
            { yAxis: 7.5, name: '二卖(不新高)=7.5' },
          ] },
          markPoint: { data: [
            mp(1, '第一类卖点', '#e74c3c', 'top'),
            mp(3, '第二类卖点', '#e74c3c', 'top'),
            mp(5, '底·盘整背驰', '#16a34a', 'bottom'),
            seg(2, 5.2, '小级别：二卖 + 盘整背驰', '#6b7280', 'bottom'),
          ] },
        },
      ],
    };
  }

  const figDingBi = `
<div class="fig"><div class="lbl">任何顶点，必是顶分型</div>${klineAnnSVG(
  [mk(9,11,true), mk(10,12.5,true), mk(11,14,true), mk(10.5,13,false), mk(10,11.5,false)],
  [{ i: 2, text: '顶分型的顶（顶点）', pos: 'top', color: '#e74c3c' }, { i: 1, text: 'H=12.5', pos: 'top', color: '#e74c3c' }, { i: 3, text: 'H=13', pos: 'top', color: '#e74c3c' }],
  { w: 46, h: 120, padT: 26, padB: 20 }
)}<div class="cap">中间 K 线“高也最高、低也最高” → 顶分型<br>第 80 课：<b>所有顶点都必然是顶分型</b></div></div>
<div class="fig"><div class="lbl">顶分型后：形成笔 / 不形成笔</div>${klineAnnSVG(
  [mk(9,11,true), mk(10,13,true), mk(9.5,11.5,false), mk(8,10,false), mk(8.5,9.5,false)],
  [{ i: 1, text: '顶分型', pos: 'top', color: '#e74c3c' }, { i: 4, text: '底分型→成笔', pos: 'bottom', color: '#16a34a' }],
  { w: 46, h: 120, padT: 26, padB: 20 }
)}<div class="cap">顶分型后<b>形成底分型且不共用 K 线</b> → 构成笔<br>（若与顶分型共用 K 线，则不形成笔）</div></div>`;

  __chapters.push({
    id: 'ch25', vol: '卷五 · 分解与操作', title: '第25章 分型辅助操作', source: '原文第79、80课',
    figures: [
      { kind: 'echarts', title: '顶分型 ↔ 小级别二卖 + 盘整背驰（多层对应）', note: '上栏：<b>日线顶分型</b>（红色▼，中间 K 线最高）。下栏：对应<b>小级别走势</b>——先<b>第一类卖点</b>(8)见顶，回落后反弹<b>不创新高</b>形成<b>第二类卖点</b>(7.5)，随后下跌力度衰减出现<b>盘整背驰</b>(绿色底)。分型的本质就是<b>某小级别第一、二买卖点成立后</b>在高级别 K 线上的体现，故顶分型要成立，最好配合小级别二卖 + 盘整背驰确认。', option: optCh25 },
      { kind: 'html', title: '所有顶点必是顶分型', note: '<b>第 80 课最简单的结论</b>：任何级别的顶点、底点，在 K 线图上必然表现为某个级别的顶分型、底分型。因此<span class="hl">一旦出现顶分型，离开就是唯一的选择</span>——至于离开后是否形成笔（调整大小），是离开之后再判断的事。', html: figDingBi },
    ],
    sections: [
      { type: 'definition', title: '分型辅助操作的要领（第79课）', items: [
        { term: '① 分型 = 某小级别买卖点成立后的体现', text: '本质上，<span class="hl">分型都是某小级别的第一、二买卖点成立后出现的</span>。用卖点说：<b>第二类卖点后</b>，次级别跌破若<b>不形成盘整背驰</b>，调整力度大、时间一长就搞出笔来（必有效破 5 日线）；若<b>形成盘整背驰</b>，调整最多演化为更大级别震荡，力度有限，5 日线一般不会被有效跌破。', formula: '顶分型成立 ≈ 小级别二卖 + 不背驰（强）/ 背驰（弱）', fig: mfig('分型是小级别买卖点的投影', drawZS([{ p: 5, tag: '底' }, { p: 8, tag: '顶', label: '一卖' }, { p: 6.5, tag: '底' }, { p: 7.5, label: '二卖', color: '#e74c3c', above: true }, { p: 5.5 }, { p: 4, label: '盘整背驰', color: '#16a34a', above: false }], [{ lo: 6.5, hi: 7.5, x0: 0, x1: 3, label: '中枢' }], { w: 40, h: 100 }), '高级别分型 = 低级别一/二买卖点的投影') },
        { term: '② 顶分型成立最好配合小级别二卖 + 盘整背驰', text: '利用顶分型操作，<span class="hl">必须配合小级别图</span>。若小级别看不明白，只看“今天冲起来没破前一天高位/没跌破前一天低位”，效果不会太好。<b>操作难点</b>：① 必须与小级别第二买卖点配合看；② 要利用好<b>盘整背驰</b>（非盘整背驰的一定要等背驰出现才能回补）。', fig: mfig('顶分型 + 二卖 + 背驰', klineAnnSVG([mk(9, 11, true), mk(10, 13, true), mk(9.5, 11.5, false), mk(9, 10.5, false), mk(9.5, 10, false)], [{ i: 1, text: '顶分型', pos: 'top', color: '#e74c3c' }, { i: 4, text: '背驰回补', pos: 'bottom', color: '#16a34a' }], { w: 40, h: 110, padT: 24, padB: 20 }), '顶分型当日冲高卖，回补看小级别盘整背驰') },
        { term: '③ 分型只是辅助', text: '注意，<b>大级别的分型与小级别的第一、二买卖点并不是绝对对应</b>：<span class="hl">有前者一定有后者，有后者不一定有前者</span>。所以分型只是一个<b>辅助</b>判断工具，不能替代买卖点本身。', fig: mfig('分型只是辅助', '<div style="font-size:12px;line-height:1.9;color:#1f2937">有<b>大级别分型</b> → 必有<b style="color:#16a34a">小级别买卖点</b><br>有<b>小级别买卖点</b> → <b style="color:#e74c3c">不一定</b>有分型</div>', '分型是买卖点的辅助投影，非充要条件') },
      ]},
      { type: 'definition', title: '顶点必是顶分型 + 操作纪律（第80课）', items: [
        { term: '① 所有顶点都必然是顶分型', text: '这是理论<b>最简单也最强</b>的结论。由此可严格推导：<span class="hl">一旦出现顶分型，离开就是唯一的选择</span>。至于顶分型后是否形成笔，那是离开后再判断的事。顶分型后无非两种：<b>① 形成笔</b>（底分型与顶分型间有不共用 K 线，调整大）；<b>② 不形成笔</b>（只有共用 K 线，调整小）。', formula: '顶点 ⇒ 顶分型；出现顶分型 ⇒ 先离开', fig: mfig('顶点必是顶分型', klineAnnSVG([mk(9, 11, true), mk(10, 13, true), mk(9.5, 11.5, false), mk(8, 10, false)], [{ i: 1, text: '顶点=顶分型', pos: 'top', color: '#e74c3c' }, { i: 3, text: '离开', pos: 'bottom', color: '#6b7280' }], { w: 42, h: 108, padT: 24, padB: 20 }), '出现顶分型，离开是唯一选择') },
        { term: '② 中枢震荡的卖点都在向上离开时', text: '另一个简单结论：<span class="hl">中枢震荡的卖点都出现在向上离开中枢时</span>。卖点后回抽若回不到中枢，可能形成第三类买点，但那<b>是卖点之后的事</b>，没有任何可能比当下的卖点更重要。而且<b>卖了不是不能再买</b>。', fig: mfig('震荡卖点在向上离开时', drawZS([{ p: 10, tag: '底' }, { p: 13, tag: '顶', label: '卖点' }, { p: 11, tag: '底' }, { p: 12.5, tag: '顶' }, { p: 11.5, tag: '底' }, { p: 12.8, tag: '顶', label: '卖点', color: '#e74c3c' }], [{ lo: 11, hi: 12.5, x0: 0, x1: 5, label: '中枢' }], { w: 36, h: 100 }), '每次向上离开中枢的顶，都是震荡卖点') },
        { term: '③ 做钢铁战士：机械执行', text: '用理论操作，把自己培养成<b>钢铁战士</b>。基本标准：<b>一</b>、买点在恐慌下跌中形成，买点出现就义无反顾买进；<b>二</b>、上涨中用钢铁意志持住；<b>三</b>、卖点在疯狂上涨中形成，卖点出现手起刀落；<b>四</b>、失误要总结，绝不在同一错误犯两次；<b>五</b>、<span class="hl">买错比卖错严重</span>，确认买错手起刀落；<b>六</b>、只有你能帮自己；<b>七</b>、踏准节奏，刀山火海也能逍遥游。', formula: '钢铁战士 = 买点敢买 + 卖点敢卖 + 决不恋战', fig: mfig('钢铁战士七条', '<div style="font-size:11.5px;line-height:1.75;color:#1f2937"><b style="color:#16a34a">买点</b>敢买 · <b style="color:#e74c3c">卖点</b>敢卖<br>持有用意志 · 失误必总结<br><b style="color:#e74c3c">买错比卖错严重</b></div>', '手起刀落，机械执行') },
        { term: '④ 宁愿卖错，绝不买错', text: '对散户来说，<span class="hl">本质上没有卖错，只有买错</span>。卖错不会亏钱（顶多少赚，有钱还可再买）；买错则不同。所以顶分型确认时<b>宁愿卖错</b>，绝不要用十几个点去对赌几百点、用 1% 的可能去对赌 99% 的可能。', fig: mfig('宁可卖错、不可买错', '<div style="font-size:12px;line-height:1.9;color:#1f2937"><b style="color:#e74c3c">卖错</b>：少赚，还能再买<br><b style="color:#e74c3c">买错</b>：真亏，必须止损<br>→ <b>宁愿卖错，绝不买错</b></div>', '散户只有买错，没有卖错') },
      ]},
      { type: 'motivation', title: '分型让“离开”有了几何依据', text: '大多数人的失败，在于顶分型的雏形都没有时就慌着卖（贪嗔痴疑慢），而真正顶分型出来了，反而幻想它是“假顶、调整一下还能突破”。第 80 课用一句话点破：<span class="hl">所有顶点都必然是顶分型</span>。所以操作的依据不再是情绪，而是一个<b>可当下确认的几何结构</b>——出现顶分型就离开，配合小级别二卖与盘整背驰把握节奏，机械执行，做钢铁战士。' },
      { type: 'pitfalls', title: '常见误区', items: [
        '把“顶分型”等同于“必然大跌”——顶分型只是顶点标志，是否调整（成笔）要看其后<b>是否形成笔</b>及是否<b>有效跌破 5 日线</b>。',
        '只在日线上看分型、<b>不看小级别</b>——顶分型成立最好配合<b>小级别第二类卖点 + 盘整背驰</b>，否则容易卖早或卖晚。',
        '把分型当成<b>充要条件</b>——大级别分型必有小级别买卖点，但反过来不成立，分型只是<b>辅助</b>。',
        '纠结“顶分型会不会是假的”而<b>不敢先走</b>——第 80 课明确：出现顶分型先离开，是否成笔是离开后再判断的事。',
      ]},
      { type: 'exercises', title: '练习', items: [
        { q: '为什么说“所有顶点都必然是顶分型”？', a: '顶分型定义为中间 K 线“高也最高、低也最高”，任何一个真正的最高点，其所在 K 线及相邻两 K 线必然满足这一定义，所以<b>任何级别的顶点必是某个级别的顶分型</b>（底点同理）。' },
        { q: '顶分型出现后，走势有哪两种选择？', a: '① <b>形成笔</b>：后面出现底分型且与顶分型之间有不共用的 K 线，调整大；② <b>不形成笔</b>：底分型与顶分型只有共用 K 线，调整小。无论哪种，都有足够空间先离开。' },
        { q: '利用顶分型操作时，两个操作难点是什么？', a: '① 必须<b>与小级别第二类买卖点配合</b>看；② 要<b>利用好盘整背驰</b>（非盘整背驰的一定要等背驰出现再回补），否则容易漏掉回补或回补过早。' },
      ]},
    ],
  });
})();
