/* 第47章 530印花税当日图解 · 系列图解示范 */
(function () {

  // 主图1：530当日走势（突发事件中的第二类卖点）
  function optCh47() {
    const pts = [20, 15, 17, 13, 15, 11, 12.5, 9];
    const mk = (x0, x1, lo, hi, name) => [{ xAxis: x0, yAxis: lo, name }, { xAxis: x1, yAxis: hi }];
    const mp = (i, name, color, pos) => ({ coord: [i, pts[i]], name, symbol: 'circle', symbolSize: 9, itemStyle: { color }, label: { show: true, color, fontSize: 10, position: pos, distance: 6, fontWeight: 'bold', formatter: function (p) { return p.name; } } });
    const seg = (x, y, name, color) => ({ coord: [x, y], name, symbol: 'none', label: { show: true, color, fontSize: 11, fontWeight: 'bold', position: 'top', formatter: function (p) { return p.name; } } });
    const pin = (i, name) => ({ coord: [i, pts[i]], name, symbol: 'pin', symbolSize: 34, itemStyle: { color: '#9333ea' }, label: { show: true, color: '#7c3aed', fontSize: 10, fontWeight: 'bold', formatter: function (p) { return p.name; }, position: 'top' } });
    return {
      tooltip: { trigger: 'axis', axisPointer: { type: 'cross' } },
      grid: { left: 52, right: 92, top: 46, bottom: 40 },
      xAxis: { type: 'value', min: -0.3, max: 7.3, interval: 1 },
      yAxis: { type: 'value', scale: true, name: '价格' },
      series: [{
        name: '走势', type: 'line', data: pts.map((p, i) => [i, p]),
        symbol: 'circle', symbolSize: 4, lineStyle: { width: 2, color: '#1f2937' }, itemStyle: { color: '#1f2937' },
        markArea: {
          silent: true, itemStyle: { color: 'rgba(37,99,235,0.10)' },
          label: { show: true, position: 'insideTop', formatter: function (p) { return p.name || ''; }, color: '#2563eb', fontSize: 11 },
          data: [mk(1, 4, 13, 15, '中枢 [13,15]')],
        },
        markLine: {
          silent: true, symbol: 'none',
          lineStyle: { color: '#2563eb', type: 'dashed', width: 1 },
          label: { show: true, position: 'end', formatter: function (p) { return p.name; }, color: '#2563eb', fontSize: 10 },
          data: [{ yAxis: 15, name: 'ZG=15' }, { yAxis: 13, name: 'ZD=13' }],
        },
        markPoint: { data: [
          mp(0, '第一类卖点·错过', '#e74c3c', 'top'),
          pin(1, '缺口·大幅低开'),
          mp(2, '第二类卖点 9:48', '#e74c3c', 'top'),
          mp(6, '第三类卖点', '#e74c3c', 'top'),
          mp(7, '底·背驰', '#16a34a', 'bottom'),
          seg(1.5, 17.8, 'A段 反抽', '#1f2937'),
          seg(2.5, 13.2, 'B段 下跌', '#1f2937'),
          seg(3.5, 15.8, 'C段 反弹', '#1f2937'),
        ] },
      }],
    };
  }

  // 主图2：中枢扩展 + 背驰段（系列图解示范）
  const figExt = `
<div class="fig" style="min-width:250px"><div class="lbl">中枢扩展：3个1分钟中枢重叠→5分钟中枢</div>${drawZS(
  [{ p: 11 }, { p: 10 }, { p: 12 }, { p: 10.5 }, { p: 12.5 }, { p: 11 }, { p: 13 }, { p: 11 }],
  [{ lo: 10, hi: 12, x0: 0, x1: 2, label: '1分钟①' }, { lo: 10.5, hi: 12.5, x0: 2, x1: 4, label: '1分钟②' }, { lo: 11, hi: 13, x0: 4, x1: 6, label: '1分钟③' }],
  { w: 40, h: 150 }
)}<div class="cap">三个<b>1分钟中枢</b>波动区间重叠（[11,12]）→ 构成一个<b>5分钟中枢</b>（级别扩展）</div></div>
<div class="fig" style="min-width:250px"><div class="lbl">背驰段：后段力度衰减</div>${drawZS(
  [{ p: 16 }, { p: 12, label: '前段', color: '#1f2937' }, { p: 14 }, { p: 11.5, label: '后段(背驰)', color: '#16a34a' }],
  [],
  { w: 44, h: 150 }
)}<div class="cap">后段 MACD 绿柱面积更小 → <b>背驰</b>，反弹必然回抽中枢</div></div>`;

  __chapters.push({
    id: 'ch47', vol: '卷九 · 实战操作与图解', title: '第47章 530印花税当日图解 · 系列图解示范', source: '原文第54、56-60课',
    figures: [
      { kind: 'echarts', title: '530当日走势：突发事件中的第二类卖点', note: '2007年5月30日凌晨印花税上调，大盘<b>大幅低开（缺口，紫色 pin）</b>。此时<span class="hl">第一类卖点已被突发事件粗暴确认、无法在实际操作中卖出</span>，唯一现实、被理论完全保证的卖点就是<b>第二类卖点（9:48，A段反抽不创新高）</b>或第三类卖点。B段下跌与缺口段比力度（绿柱面积）构成<b>盘整背驰</b>，C段反弹后 A、B、C 三段重叠构成 1 分钟中枢 [13,15]，其后不触及中枢下沿的反弹即第三类卖点。', option: optCh47 },
      { kind: 'html', title: '系列图解里的中枢扩展与背驰段', note: '第57-60课连续示范了同一段跌势的当下分解。左边：<b>三个 1 分钟中枢重叠，扩展成一个 5 分钟中枢</b>（级别递归的活例）；右边：<b>背驰段</b>——比较两段同向下跌的 MACD 绿柱面积，后段面积明显更小即背驰，反弹必然回抽到中枢附近。这两个动作构成了中枢震荡做差价的核心。', html: figExt },
    ],
    sections: [
      { type: 'definition', title: '530印花税当日图解（第56课）', items: [
        { term: '① 突发事件中，第二类卖点的决定性', text: '第二类卖点除在小级别转大级别上比第一类卖点优越外，在<b>突发情况</b>下就是最佳卖点。530当天，尾盘高收使区间套不能确认背驰，<b>夜间的突发消息使背驰立刻被确认</b>，此时<span class="hl">第一类卖点已不可能在实际操作中存在，唯一能操作的只能是第二或第三类卖点</span>。大盘走势是第二类卖点（9:48），但个股可能只是第三类卖点。', fig: mfig('突发：一卖错过，二卖是现实卖点', drawZS([{ p: 20, tag: '顶', label: '一卖(错过)' }, { p: 15, label: '缺口', color: '#9333ea' }, { p: 17, label: '二卖', color: '#e74c3c', above: true }, { p: 13, label: 'B段', color: '#1f2937' }, { p: 15, label: 'C段', color: '#1f2937', above: true }, { p: 11 }, { p: 12.5, label: '三卖', color: '#e74c3c', above: true }, { p: 9, tag: '底', label: '背驰底' }], [{ lo: 13, hi: 15, x0: 1, x1: 4, label: '中枢' }], { w: 34, h: 104 }), '大幅低开后第一类卖点无法操作，只能第二/三卖点') },
        { term: '② 缺口＝最低级别，与1分钟以下同级别', text: '缺口被看成<b>最低级别</b>；1分钟以下级别在1分钟图上被看成没有内部结构的线段，所以<span class="hl">缺口和 1 分钟以下级别在 1 分钟图上是同级别的</span>。530当天的第一段就是以向下缺口的形态构成的 1 分钟以下级别走势类型。', fig: mfig('缺口＝1分钟以下级别', klineAnnSVG([mk(16, 18), mk(14, 15), mk(11, 13), mk(12, 14)], [{ i: 2, text: '缺口↓', pos: 'top', color: '#9333ea' }], { w: 32, h: 86 }), '缺口与1分钟以下级别同级别，都看成无结构的线段') },
        { term: '③ 盘整背驰定位：B段与缺口段比绿柱面积', text: '第二类卖点后的 B 段走势，其力度要和缺口那一段对比：<span class="hl">比较两个红箭头所指 MACD 绿柱子面积（第二个要把前面三个小绿柱面积也加上）</span>。即使这样，后者力度也不大过前者，由此知道 B 段构成<b>盘整背驰</b>，后面的反弹一定回到第一绿箭头位置之上。（1分钟以下级别只比较柱子面积；1分钟级别还要同时看黄白线回抽0轴。）', fig: mfig('B段 vs 缺口段：力度对比', drawZS([{ p: 16 }, { p: 13, label: '缺口段', color: '#6b7280' }, { p: 14.5 }, { p: 12, label: 'B段', color: '#16a34a' }, { p: 11.5, label: '底', color: '#16a34a' }], [], { w: 40, h: 96 }), 'B段绿柱面积更小→盘整背驰，反弹必回中枢区间') },
      ]},
      { type: 'definition', title: '图解示范二～五（第57-60课）', items: [
        { term: '④ 最小分析级别与线段', text: '看图首先要<b>确定最小分析级别</b>，这级别以下的都可以看成线段；站在最小分析级别的角度，<span class="hl">每一线段就是其次级别走势类型，三个线段重合部分就构成最小分析级别的中枢</span>。第57课把1分钟以下都看成线段（缺口也是），在图上标记出 01、12、23…… 等线段，据此当下分析。', fig: mfig('最小级别以下都看成线段', drawZS([{ p: 12 }, { p: 11, tag: '底' }, { p: 12.5, tag: '顶' }, { p: 11.5, label: '线段', color: '#2563eb' }], [{ lo: 11, hi: 12, x0: 0, x1: 3, label: '中枢' }], { w: 40, h: 96 }), '三个线段重合部分构成最小分析级别的中枢') },
        { term: '⑤ 线段划分的标准', text: '是否线段，<b>关键看走出来的形态</b>：<span class="hl">任何低点都比前一个高点都高，那么这情况无限延续下去，依然只是一线段</span>（与幅度无关）；前后两线段间不可能是同向的；线段至少呈"上-下-上"或"下-上-下"，故一字涨停无论如何延续，都低于线段级别，是最小级别。', fig: mfig('一字涨停低于线段级别', klineAnnSVG([mk(10, 11), mk(10, 11), mk(10, 11), mk(10, 11)], [{ i: 1, text: '一字涨停', pos: 'top', color: '#e74c3c' }], { w: 28, h: 80 }), '无论延续多长，都低于线段级别（最小级别）') },
        { term: '⑥ 中枢扩展：3个1分钟中枢→5分钟中枢', text: '第57课中，10 个线段组成一个更高级别的 5 分钟中枢，结合方式为 <code>(12+23+34)+(45+56+67)+(78+89+910)</code>，区间 [4015,4122]。<span class="hl">三个 1 分钟中枢的波动区间重叠，就递归出一个 5 分钟中枢</span>——这正是"级别"如何从低级别自组出来的活例，第三类卖点的存在加上后面的背驰，就必然导致中枢级别的扩展。', fig: mfig('中枢扩展→更高级别中枢', drawZS([{ p: 12 }, { p: 11 }, { p: 12.5 }, { p: 11.5 }, { p: 13 }, { p: 12 }, { p: 13.5 }, { p: 12.5 }, { p: 14 }], [{ lo: 11, hi: 12.5, x0: 0, x1: 8, label: '原中枢·延伸扩展' }], { w: 34, h: 100 }), '震荡延续/多段重叠→中枢级别升级') },
        { term: '⑦ 第三类买卖点：离开距离可以很远', text: '第三类买卖点必须<b>次级别离开、次级别反抽</b>，针对该级别中最近那个中枢。对于一些快速变动的行情，<span class="hl">第三类买卖点离开中枢的距离会很远</span>（第54课举了600477、600837的实例）。但注意：中枢震荡中追涨杀跌一定死定，只有第三类买卖点之后才可能有活的机会。', fig: mfig('三卖点可离中枢很远', drawZS([{ p: 10 }, { p: 12, tag: '顶' }, { p: 11, tag: '底' }, { p: 12.5, label: '中枢', color: '#2563eb', above: true }, { p: 9, label: '离开', color: '#1f2937' }, { p: 9.8, label: '三卖', color: '#e74c3c', above: true }, { p: 7, tag: '底' }], [{ lo: 11, hi: 12, x0: 0, x1: 3, label: '中枢' }], { w: 34, h: 104 }), '反抽不触及中枢下沿→第三类卖点，可离得很远') },
      ]},
      { type: 'motivation', title: '突发事件是检验理论的试金石', text: '530印花税是一堂<b>活生生的实战课</b>：凌晨的政策突变让"预测"失效，但<b>理论依然能给出确定的操作</b>——第二、三卖点，以及 B 段盘整背驰的回补、中枢震荡做差价。第57-60课再连续示范如何把这段跌势一段段当下分解，直到日线中枢生成为止。它们共同说明一件事：<span class="hl">真正的功夫不是预测，而是任何图形当下都能按标准分解并指导操作</span>——这需要多看图、多磨练，把分段的规范刻进肌肉记忆。' },
      { type: 'pitfalls', title: '常见误区', items: [
        '遇到突发事件还指望<b>第一类卖点</b>——突发消息使背驰被立刻确认，一卖在实际操作中已不存在，只能二卖/三卖。',
        '把<b>缺口</b>当成了比1分钟以下级别更低或更高的东西——缺口是最低级别，与1分钟以下级别在1分钟图上同级别。',
        '把"任何低点比前高点都高"的走势<b>硬拆成多个线段</b>——它依然只是一线段，与幅度无关。',
        '把<b>一字涨停</b>当成一个线段——一字涨停无论如何延续都低于线段级别，是最小级别。',
        '在<b>中枢震荡中追涨杀跌</b>——一定死定；只有第三类买卖点之后才可能有活的机会。',
      ]},
      { type: 'exercises', title: '练习', items: [
        { q: '530当天为什么第一类卖点"不能在实际操作中存在"？应该用哪类卖点？', a: '因为529当天尾盘高收，区间套不能确认背驰；夜间突发消息使背驰<b>被立刻确认</b>，一卖点已来不及操作。此时<b>只能操作第二或第三类卖点</b>（第二类卖点在小级别转大级别和突发情况下是最好、最现实的卖点）。' },
        { q: '如何用 MACD 当下判断 530 当天 B 段的盘整背驰？', a: '把 B 段与<b>缺口那一段</b>比较，看两处<b>绿柱子面积</b>（后者要把前面三个小绿柱面积也加上）；后者面积不大于前者即<b>盘整背驰</b>，后面反弹必回到中枢区间。1分钟以下级别只比柱子面积，1分钟级别还要看黄白线回抽0轴。' },
        { q: '为什么说"任何低点比前一个高点都高，依然只是一线段"？', a: '因为是否线段<b>关键看形态，与幅度无关</b>；只要互相相邻的上或下不重合，这个模式可以无限延伸下去而仍然是一线段。只有出现反向的重合结构，才可能结束一个线段。' },
      ]},
    ],
  });
})();
