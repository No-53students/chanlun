/* 第10章 背驰 */
(function () {

  function optCh10() {
    const pts = [8, 13, 10, 14, 11, 17, 14, 18, 15, 21];
    const mk = (x0, x1, lo, hi, name) => [{ xAxis: x0, yAxis: lo, name }, { xAxis: x1, yAxis: hi }];
    const DIFF = [4.0, 2.8, 4.0, 2.6, 6.0, 1.5, 2.5, 1.2, 4.0];
    const DEA = [2.2, 2.4, 2.5, 2.6, 2.9, 2.6, 2.6, 2.3, 2.5];
    const barData = DIFF.map((v, i) => ({
      value: [i + 0.5, +(v - DEA[i]).toFixed(2)],
      itemStyle: { color: v >= DEA[i] ? '#e74c3c' : '#16a34a' },
    }));
    const mp = (i, name, color, pos) => ({ coord: [i, pts[i]], name, symbol: 'circle', symbolSize: 8, itemStyle: { color }, label: { show: true, color, fontSize: 10, position: pos, distance: 4, fontWeight: 'bold' } });
    const seg = (x, y, name, color, pos) => ({ coord: [x, y], name, symbol: 'none', label: { show: true, color, fontSize: 11, fontWeight: 'bold', position: pos } });
    return {
      tooltip: { trigger: 'axis', axisPointer: { type: 'cross' } },
      legend: { data: ['走势', 'DIFF（白线）', 'DEA（黄线）', 'MACD 柱'], top: 6 },
      grid: [
        { left: 60, right: 90, top: 46, height: 220 },
        { left: 60, right: 90, top: 310, height: 100 },
      ],
      xAxis: [
        { type: 'value', gridIndex: 0, min: 0, max: 9, interval: 1 },
        { type: 'value', gridIndex: 1, min: 0, max: 9, interval: 1, axisLabel: { show: false } },
      ],
      yAxis: [
        { type: 'value', gridIndex: 0, scale: true, name: '价格', nameLocation: 'middle', nameGap: 40 },
        { type: 'value', gridIndex: 1, name: 'MACD', nameLocation: 'middle', nameGap: 30 },
      ],
      series: [
        {
          name: '走势', type: 'line', xAxisIndex: 0, yAxisIndex: 0,
          data: pts.map((p, i) => [i, p]), symbol: 'circle', symbolSize: 5,
          lineStyle: { width: 2, color: '#1f2937' }, itemStyle: { color: '#1f2937' },
          markArea: {
            silent: true, itemStyle: { color: 'rgba(37,99,235,0.10)' },
            label: { show: true, position: 'insideTop', formatter: function (p) { return p.name || ''; }, color: '#2563eb', fontSize: 11 },
            data: [mk(1, 4, 11, 13, '中枢A [11,13]'), mk(5, 8, 15, 17, '中枢B [15,17]')],
          },
          markLine: {
            silent: true, symbol: 'none',
            label: { show: true, position: 'end', formatter: '{b}' },
            lineStyle: { type: 'dashed', width: 1 },
            data: [
              { yAxis: 13, name: '中枢A ZG=13' },
              { yAxis: 11, name: '中枢A ZD=11' },
              { yAxis: 17, name: '中枢B ZG=17' },
              { yAxis: 15, name: '中枢B ZD=15' },
            ],
          },
          markPoint: {
            data: [
              mp(0, '底', '#16a34a', 'bottom'),
              mp(1, '顶', '#e74c3c', 'top'),
              mp(3, 'A·GG=14', '#e74c3c', 'top'),
              mp(5, '顶', '#e74c3c', 'top'),
              mp(6, 'B·DD=14', '#16a34a', 'bottom'),
              mp(7, 'B·GG=18', '#e74c3c', 'top'),
              mp(8, 'B·ZD=15', '#16a34a', 'bottom'),
              mp(9, '背驰点 c顶', '#e74c3c', 'top'),
              seg(0.5, 9.8, 'a', '#1f2937', 'bottom'),
              seg(2.5, 12.6, 'A', '#2563eb', 'top'),
              seg(4.5, 14.8, 'b', '#1f2937', 'top'),
              seg(6.5, 16.2, 'B', '#2563eb', 'top'),
              seg(8.5, 19.5, 'c', '#e74c3c', 'top'),
            ],
          },
        },
        {
          name: 'DIFF（白线）', type: 'line', xAxisIndex: 1, yAxisIndex: 1,
          data: DIFF.map((v, i) => [i + 0.5, v]), symbol: 'none',
          lineStyle: { width: 1.8, color: '#94a3b8' }, itemStyle: { color: '#94a3b8' },
          markLine: {
            silent: true, symbol: 'none',
            label: { show: true, position: 'end', formatter: function (p) { return p.name || ''; }, fontSize: 10 },
            data: [{ yAxis: 0, name: '0 轴', lineStyle: { color: '#dc2626', width: 1.6, type: 'solid' }, label: { color: '#dc2626' } }],
          },
        },
        {
          name: 'DEA（黄线）', type: 'line', xAxisIndex: 1, yAxisIndex: 1,
          data: DEA.map((v, i) => [i + 0.5, v]), symbol: 'none',
          lineStyle: { width: 1.8, color: '#f59e0b' }, itemStyle: { color: '#f59e0b' },
        },
        {
          name: 'MACD', type: 'bar', xAxisIndex: 1, yAxisIndex: 1, data: barData, barWidth: '55%',
          markArea: {
            silent: true, itemStyle: { color: 'rgba(231,76,60,0.16)' },
            label: { show: true, position: 'insideTop', formatter: function (p) { return p.name || ''; }, color: '#b91c1c', fontSize: 10, fontWeight: 'bold' },
            data: [
              macdArea(4, 5, 0, 3.4, 'b段红柱面积（大）'),
              macdArea(8, 9, 0, 1.8, 'c段红柱面积（小）'),
            ],
          },
        },
        backchiEffect([[9, 21]], '#e74c3c', '背驰点 c顶：价格新高(21>17)，但 c 段 MACD 红柱面积 < b 段 → 趋势背驰，至少回拉中枢 B'),
      ],
    };
  }

  const figPan = `
<div class="fig"><div class="lbl">盘整背驰（一个中枢）</div>${drawZS([{p:8,tag:'底'},{p:13,tag:'顶'},{p:10,tag:'底'},{p:14,tag:'顶'},{p:11,tag:'底',label:'C段起点',color:'#16a34a'},{p:16,label:'C段顶',color:'#e74c3c',above:true},{p:14,label:'三买',color:'#9333ea'}], [{lo:11,hi:13,x0:1,x1:4,label:'中枢 [11,13]'}], {zgzd:true,w:52,h:150})}<div class="cap">C段 11→16 上破中枢但力度弱<br>回跌 16→14 <b>不破中枢</b> → 第三类买点</div></div>
<div class="fig"><div class="lbl">趋势背驰（两个中枢）</div>${drawZS([{p:8,tag:'底'},{p:13,tag:'顶'},{p:10,tag:'底'},{p:14,tag:'顶'},{p:11,tag:'底'},{p:17,tag:'顶'},{p:14,tag:'底'},{p:18,tag:'顶'},{p:15,tag:'底',label:'c段起点',color:'#16a34a'},{p:21,label:'c段顶·背驰',color:'#e74c3c',above:true}], [{lo:11,hi:13,x0:1,x1:4,label:'中枢A [11,13]'},{lo:15,hi:17,x0:5,x1:8,label:'中枢B [15,17]'}], {zgzd:true,w:52,h:150})}<div class="cap">c段 15→21 创新高但力度弱<br>背驰后<b>至少回拉中枢B</b> [15,17]</div></div>`;

  const figTurn = `
<div class="fig"><div class="lbl">下跌趋势背驰（第一类买点）</div>${drawZS([{p:20,tag:'顶'},{p:15},{p:18},{p:14},{p:17},{p:11},{p:14},{p:10},{p:13,label:'c段起点',color:'#16a34a'},{p:8,label:'一买·背驰',color:'#16a34a'}], [{lo:15,hi:17,x0:1,x1:4,label:'中枢A [15,17]'},{lo:11,hi:13,x0:5,x1:8,label:'中枢B [11,13]'}], {zgzd:true,w:50,h:150})}<div class="cap">c段 13→8 创新低但力度弱<br>8 处即<b>第一类买点</b>（背驰点）</div></div>
<div class="fig" style="min-width:320px"><div class="lbl">背驰后三种转折（第29课）</div><div style="display:flex;gap:10px;align-items:flex-start">${drawZS([{p:13},{p:8,tag:'底',label:'一买'},{p:10,label:'触DD=10',color:'#f59e0b',above:true}], [{lo:11,hi:13,x0:0,x1:2,label:'中枢B'}], {w:26,h:92})}${drawZS([{p:13},{p:8,tag:'底',label:'一买'},{p:12,label:'回中枢',color:'#2563eb',above:true}], [{lo:11,hi:13,x0:0,x1:2,label:'中枢B'}], {w:26,h:92})}${drawZS([{p:13},{p:8,tag:'底',label:'一买'},{p:16,label:'反趋势',color:'#16a34a',above:true}], [{lo:11,hi:13,x0:0,x1:2,label:'中枢B'}], {w:26,h:92})}</div><ol class="turn"><li><b>级别扩展</b>：反弹最弱，只触及 B中枢 DD=10</li><li><b>更大级别盘整</b>：反弹回 B中枢，横向扩展</li><li><b>以上级别反趋势</b>：反弹强，直接转上涨</li></ol><div class="cap">判别关键：看反弹的第一个次级别走势<br>是否<b>回抽进最后一个中枢</b></div></div>`;

  __chapters.push({
    id: 'ch14', vol: '卷四 · 背驰与买卖点', title: '第14章 背驰', source: '原文第24、29、37课',
    figures: [
      { kind: 'echarts', title: '趋势背驰的 MACD 判断', note: '上涨趋势 <b>a+A+b+B+c</b>：c 段创出<b>新高</b>（21＞17），但下方 MACD 的 <b>c 段红柱面积明显小于 b 段</b>（已用红框标出），且白线 <b>DIFF 在 c 段只冲到 4.0、低于 b 段的 6.0</b>——价格新高、动能却减弱，这就是<span class="hl">趋势背驰</span>。其后<b>至少回拉中枢 B</b>。（下方：白线 DIFF、黄线 DEA，红柱＝上涨动能、绿柱＝回调；B 中枢把黄白线回拉，c 段红柱面积缩小。）', option: optCh10 },
      { kind: 'html', title: '盘整背驰 vs 趋势背驰', note: '<b>盘整背驰</b>只有一个中枢，C 段破中枢但力度弱，回跌不破中枢就构成<b>第三类买点</b>；<b>趋势背驰</b>有两个中枢，背驰后回跌<b>至少回中枢 B</b>。', html: figPan },
      { kind: 'html', title: '背驰后的三种转折', note: '第29课<b>背驰-转折定理</b>：趋势背驰后，反弹只有三种可能，力度从弱到强依次是“级别扩展→更大级别盘整→反趋势”。判别关键：<b>反弹的第一个次级别走势能否回抽进最后一个中枢</b>。', html: figTurn },
    ],
    sections: [
      { type: 'definition', title: '背驰的定义与 MACD 判断', items: [
        { term: '① 背驰-买卖点定理（第24课）', text: '<span class="hl">任一背驰都必然制造某级别的买卖点；任一级别的买卖点都必然源自某级别走势的背驰。</span>即：看到背驰，必意味着要逆转（逆转≠永远反转，可能只是某级别的一段回拉）。', fig: mfig('背驰 ⟺ 买卖点', drawZS([{ p: 16, tag: '顶' }, { p: 13 }, { p: 14 }, { p: 11 }, { p: 12 }, { p: 8, tag: '底', label: '背驰点=一买', color: '#16a34a' }, { p: 12, label: '转折', color: '#e74c3c', above: true }], [{ lo: 11, hi: 13, x0: 1, x1: 4, label: '中枢' }], { w: 30, h: 96 }), '背驰点必制造买卖点；买卖点必源自背驰') },
        { term: '② 背驰的前提：两段同向趋势（第24课）', text: '用 MACD 判断背驰，首先要有<b>两段同向的趋势</b>。同向趋势之间必有一个盘整或反向趋势连接，把这三段分别称为 A、B、C 段；其中 <b>B 的中枢级别比 A、C 里的中枢级别都大</b>（否则它们就连成一个大趋势了）。', fig: mfig('两段同向趋势 A、C 夹 B', drawZS([{ p: 8 }, { p: 13, tag: '顶' }, { p: 10 }, { p: 14 }, { p: 11 }, { p: 17, tag: '顶' }, { p: 14 }], [{ lo: 10, hi: 13, x0: 0, x1: 2, label: 'A' }, { lo: 11, hi: 16, x0: 3, x1: 6, label: 'B(级别更大)' }], { w: 34, h: 100 }), 'A、C 同向，B 的中枢级别更大') },
        { term: '③ 标准背驰的 MACD 判据（第24课）', text: 'A、B、C 段在一个大趋势里，A 之前已有一个中枢，B 是另一个中枢——<b>B 中枢一般会把 MACD 黄白线（DIFF、DEA）回拉到 0 轴附近</b>；当 C 段走势类型完成时，其对应的<b>MACD 柱子面积（向上看红柱、向下看绿柱）比 A 段面积小</b>，就构成标准背驰。', formula: '背驰 ⟺ 黄白线回拉0轴 + C段MACD柱面积 < A段', fig: mfig('MACD 判据（两条件）', drawZS([{ p: 8, label: 'a', color: '#1f2937' }, { p: 12, tag: '顶' }, { p: 9 }, { p: 11 }, { p: 14, label: 'b', color: '#1f2937' }, { p: 17, tag: '顶' }, { p: 15 }, { p: 18 }, { p: 20, label: 'c(面积小)', color: '#e74c3c', above: true }], [{ lo: 9, hi: 11, x0: 0, x1: 3, label: 'A' }, { lo: 15, hi: 17, x0: 4, x1: 7, label: 'B(回拉0轴)' }], { w: 24, h: 88, zgzd: true }), '① B中枢把黄白线回拉0轴 ② c段柱面积 < a段') },
        { term: '④ a+A+b+B+c 结构（第29课）', text: '趋势的最一般结构是 <code>a+A+b+B+c</code>：A、B 是两个同向中枢，a、b、c 是连接段（级别最多为次级别，极端情况只是一个缺口）。<b>背驰比较的是 c 段与 b 段的力度</b>：c 段创新高/新低，但 MACD 面积小于 b 段。', fig: mfig('a+A+b+B+c 结构', drawZS([{ p: 8 }, { p: 12 }, { p: 9 }, { p: 11 }, { p: 14 }, { p: 17 }, { p: 15 }, { p: 18 }], [{ lo: 9, hi: 11, x0: 0, x1: 2, label: 'A' }, { lo: 15, hi: 17, x0: 5, x1: 7, label: 'B' }], { w: 30, h: 96 }), '比较 c 与 b 的力度，a、b、c 是连接段') },
        { term: '⑤ 背驰后必回拉中枢（第24课）', text: '<span class="hl">一旦出现趋势背驰，其回跌一定至少重新回到 B 段（最后一个中枢）里。</span>这可以预先知道“至少的跌幅/涨幅”，是背驰最重要的实战价值。', fig: mfig('背驰后回拉最后中枢', drawZS([{ p: 20 }, { p: 15 }, { p: 18 }, { p: 14 }, { p: 17 }, { p: 11 }, { p: 14 }, { p: 10 }, { p: 13 }, { p: 8, tag: '底', label: '背驰' }, { p: 12, label: '回拉', color: '#2563eb' }], [{ lo: 15, hi: 17, x0: 1, x1: 4, label: 'A' }, { lo: 11, hi: 13, x0: 5, x1: 8, label: 'B' }], { w: 26, h: 96 }), '下跌背驰(8)后至少回到 B 中枢 [11,13]') },
      ]},
      { type: 'definition', title: '盘整背驰与背驰后的转折', items: [
        { term: '① 盘整背驰（第24课）', text: '不特别声明时，“背驰”都指<b>趋势背驰</b>；盘整中用类似方法判断，称<b>盘整背驰</b>。向上盘整为例：若 C 段<b>不破中枢</b>且 MACD 面积小于 A 段 → 其后必回跌；若 C 段<b>上破中枢</b>但面积小 → 先出来，其后回跌<b>不重新跌回中枢</b>就在次级别第一类买点回补（这正好构成<b>第三类买点</b>），跌回则继续盘整。', fig: mfig('盘整背驰（一个中枢）', drawZS([{ p: 8, tag: '底' }, { p: 13, tag: '顶' }, { p: 10 }, { p: 14, tag: '顶' }, { p: 11 }, { p: 16, tag: '顶' }, { p: 14, label: '三买', color: '#9333ea' }], [{ lo: 11, hi: 13, x0: 1, x1: 4, label: '中枢' }], { w: 34, h: 100 }), 'C 段破中枢但力度弱，回跌不破中枢 → 三买') },
        { term: '② 背驰-转折定理（第29课）', text: '<span class="hl">某级别趋势的背驰，将导致该趋势最后一个中枢的级别扩展、该级别更大级别的盘整、或该级别以上级别的反趋势。</span>三种情况完全分类了背驰后的力度与级别。', formula: '趋势背驰 → ① 最后中枢级别扩展 ② 更大级别盘整 ③ 以上级别反趋势', fig: mfig('背驰后三种转折', '<div style="display:flex;gap:8px;align-items:flex-end">' + drawZS([{ p: 13 }, { p: 8, tag: '底', label: '背驰', color: '#16a34a' }, { p: 10, label: '级别扩展', color: '#f59e0b', above: true }], [{ lo: 11, hi: 13, x0: 0, x1: 2, label: '中枢' }], { w: 24, h: 84 }) + drawZS([{ p: 13 }, { p: 8, tag: '底', label: '背驰', color: '#16a34a' }, { p: 12, label: '更大盘整', color: '#2563eb', above: true }], [{ lo: 11, hi: 13, x0: 0, x1: 2, label: '中枢' }], { w: 24, h: 84 }) + drawZS([{ p: 13 }, { p: 8, tag: '底', label: '背驰', color: '#16a34a' }, { p: 16, label: '反趋势', color: '#16a34a', above: true }], [{ lo: 11, hi: 13, x0: 0, x1: 2, label: '中枢' }], { w: 24, h: 84 }) + '</div>', '趋势背驰 → 三种结果（力度从弱到强）') },
        { term: '③ 三种转折详解（第29课）', text: '<b>① 级别扩展</b>（最弱）：反弹只触及最后一个中枢的 DD，把中枢扩成更大级别，走势尚未完成；<b>② 更大级别盘整</b>：反弹至少回抽最后一个中枢，走出“下跌+盘整”；<b>③ 以上级别反趋势</b>：反弹强，走出“下跌+上涨”。判别关键：看<b>反弹第一个次级别走势是否回抽进最后一个中枢</b>。', fig: mfig('三种转折的力度', '<div style="display:flex;gap:8px;align-items:flex-end">' + drawZS([{ p: 13 }, { p: 8, tag: '底', label: '一买', color: '#16a34a' }, { p: 10, label: '弱·触DD', color: '#f59e0b', above: true }], [{ lo: 11, hi: 13, x0: 0, x1: 2, label: '中枢B' }], { w: 24, h: 84 }) + drawZS([{ p: 13 }, { p: 8, tag: '底', label: '一买', color: '#16a34a' }, { p: 12, label: '中·回中枢', color: '#2563eb', above: true }], [{ lo: 11, hi: 13, x0: 0, x1: 2, label: '中枢B' }], { w: 24, h: 84 }) + drawZS([{ p: 13 }, { p: 8, tag: '底', label: '一买', color: '#16a34a' }, { p: 16, label: '强·反趋势', color: '#16a34a', above: true }], [{ lo: 11, hi: 13, x0: 0, x1: 2, label: '中枢B' }], { w: 24, h: 84 }) + '</div>', '关键：反弹第一个次级别走势是否回抽进最后中枢') },
        { term: '④ 转折是有级别的（第29课）', text: '围绕某级别中枢的震荡/延续中<b>不存在转折问题</b>，只有站在次级别才有转折。上涨的转折有两种（下跌与盘整），下跌的转折也有两种（上涨与盘整）。', fig: mfig('转折是有级别的', '<div style="display:flex;gap:8px;align-items:flex-end">' + drawZS([{ p: 10 }, { p: 13 }, { p: 11 }, { p: 14 }, { p: 12 }], [{ lo: 11, hi: 13, x0: 0, x1: 4, label: '本级别震荡·无转折' }], { w: 22, h: 84 }) + drawZS([{ p: 13, tag: '顶' }, { p: 10, tag: '底' }, { p: 12, label: '次级别·有转折', color: '#e74c3c', above: true }], [], { w: 24, h: 84 }) + '</div>', '本级别中枢震荡中无转折；站在次级别才有转折') },
        { term: '⑤ MACD 的局限性（第24课）', text: '由于 MACD 本身的局限，要<b>精确</b>判断背驰与盘整背驰，还是要<b>从中枢本身出发</b>。光用 MACD 辅助判断，准确率 90% 以上；<b>配合中枢，是 100% 绝对的</b>（可用纯数学推理证明）。', fig: mfig('MACD 辅助 + 中枢 = 100%', drawZS([{ p: 8, label: 'a', color: '#1f2937' }, { p: 13, tag: '顶' }, { p: 10 }, { p: 14 }, { p: 11 }, { p: 17, tag: '顶' }, { p: 14, label: 'c(背驰)', color: '#e74c3c', above: true }], [{ lo: 10, hi: 13, x0: 0, x1: 3, label: '中枢A' }, { lo: 14, hi: 17, x0: 4, x1: 6, label: '中枢B(100%)' }], { w: 26, h: 88, zgzd: true }), 'MACD 辅助 90%+，配合中枢推理才是 100% 绝对') },
      ]},
      { type: 'motivation', title: '为什么背驰是“动力学”的核心', text: '缠论分<b>形态学</b>（分型/笔/线段/中枢，几何）与<b>动力学</b>（背驰、中枢能量结构）。形态学回答“走势是什么样”，背驰回答“<b>走势何时会转折</b>”。背驰把“走势必完美”从一句哲学命题，落实成“动能衰减”的可观测信号——它是所有买卖点（尤其第一类买卖点）的<span class="kw">动力学根源</span>。' },
      { type: 'pitfalls', title: '常见误区', items: [
        '把“<b>MACD 柱子缩短</b>”直接当背驰（错：必须<b>先有黄白线回拉 0 轴</b>，且是<b>两段同向趋势</b>的面积比较）。',
        '混淆<b>趋势背驰</b>（两个中枢）与<b>盘整背驰</b>（一个中枢），两者回跌要求完全不同。',
        '以为背驰后<b>一定大幅反转</b>（错：三种转折中“级别扩展”只是最弱反弹，走势仍在延续）。',
        '<b>光看一个级别</b>就下背驰结论（错：背驰要看前后级别的走势，先定比较段再选 MACD 周期）。',
      ]},
      { type: 'exercises', title: '练习', items: [
        { q: '构成“标准趋势背驰”需要哪几个条件？', a: '① 一段趋势（至少两个同向中枢）；② 最后一个中枢把 MACD 黄白线<b>回拉 0 轴附近</b>；③ c 段<b>创新高/新低</b>，但 <b>MACD 柱面积小于</b> 比较段（b 段）。' },
        { q: '上涨趋势背驰后，回跌至少回到哪里？', a: '至少回到<b>最后一个中枢（B 段）</b>内（第24课）。这能预先知道“至少的跌幅”，据此决定卖出。' },
        { q: '盘整背驰中，C 段上破中枢但力度弱，回跌不破中枢，会形成什么？', a: '形成<b>第三类买点</b>（第24课）：先出来，等次级别回跌不跌回中枢，就在次级别第一类买点回补。' },
      ]},
    ],
  });
})();
