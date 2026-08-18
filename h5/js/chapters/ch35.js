/* 第35章 中继型分型 + 最小中枢的心理意义 */
(function () {

  // ---- 主图1：ECharts 假顶分型（中继型）后继续上涨 ----
  function optCh35() {
    const ks = [
      { o: 9, c: 11, l: 8.5, h: 11.2 },
      { o: 11, c: 12.5, l: 10.8, h: 12.8 },
      { o: 12.5, c: 14, l: 12.3, h: 14.2 },
      { o: 14, c: 15, l: 13.8, h: 15.3 },
      { o: 15, c: 15.6, l: 14.9, h: 16 },
      { o: 15.4, c: 14.6, l: 14.2, h: 15.5 },
      { o: 14.6, c: 15.5, l: 14.3, h: 15.7 },
      { o: 15.5, c: 17, l: 15.3, h: 17.3 },
      { o: 17, c: 18, l: 16.8, h: 18.2 },
    ];
    const cats = ks.map((_, i) => 'K' + i);
    const pin = (i, name, color) => ({ coord: [cats[i], ks[i].h + 0.4], name, symbol: 'pin', symbolSize: 44, itemStyle: { color }, label: { show: true, color, fontSize: 10, fontWeight: 'bold', position: 'top', formatter: function (p) { return p.name; } } });
    const seg = (i, y, name, color, pos) => ({ coord: [cats[i], y], name, symbol: 'none', label: { show: true, color, fontSize: 11, fontWeight: 'bold', position: pos, formatter: function (p) { return p.name; } } });
    return {
      tooltip: { trigger: 'axis', axisPointer: { type: 'cross' } },
      grid: { left: 48, right: 30, top: 48, bottom: 40 },
      xAxis: { type: 'category', data: cats, axisLabel: { interval: 0 } },
      yAxis: { type: 'value', scale: true, name: '价格' },
      series: [
        { name: 'K线', type: 'candlestick', data: ks.map(k => [k.o, k.c, k.l, k.h]), itemStyle: { color: upColor, color0: downColor, borderColor: upColor, borderColor0: downColor },
          markArea: {
            silent: true, itemStyle: { color: 'rgba(245,158,11,0.10)' },
            label: { show: true, position: 'insideTop', formatter: function (p) { return p.name || ''; }, color: '#b45309', fontSize: 11 },
            data: [[{ xAxis: 'K3', yAxis: 16, name: '顶分型（K3,K4,K5）' }, { xAxis: 'K5', yAxis: 15.7 }]],
          },
          markPoint: { data: [
            pin(4, '顶分型·中继（假顶）', '#f59e0b'),
            seg(8, 18.6, '继续新高 → 中继型分型', '#e74c3c', 'top'),
            seg(6, 14.9, '← 回补后未破位', '#16a34a', 'top'),
          ] },
          markLine: { silent: true, symbol: 'none', label: { show: true, position: 'end', formatter: function (p) { return p.name; }, fontSize: 10 }, data: [
            { yAxis: 16, name: '分型高点 16（后被突破）', lineStyle: { color: '#f59e0b', type: 'dashed', width: 1 } },
            { yAxis: 14.2, name: '分型低点 14.2（未跌破）', lineStyle: { color: '#16a34a', type: 'dashed', width: 1 } },
          ] } },
      ],
    };
  }

  // ---- 主图2：笔构成中枢(不稳定) vs 线段构成中枢(稳定) ----
  const figBiVsSeg = `
<div class="fig" style="min-width:250px"><div class="lbl">笔构成最小中枢（不稳定）</div>${drawZS(
    [{ p: 10, tag: '底' }, { p: 12, tag: '顶' }, { p: 10.4, tag: '底' }, { p: 11.6, tag: '顶' }, { p: 10.8, label: '瞬间波动', color: '#e74c3c' }, { p: 12.4, tag: '顶' }, { p: 11, tag: '底' }],
    [{ lo: 10.4, hi: 12, x0: 0, x1: 6, label: '笔中枢（易被波动干扰）' }], { w: 40, h: 120 }
  )}<div class="cap">一笔的顶/底分型<b>太易被瞬间交易</b>（打错单、老鼠仓）破坏<br>→ 笔构成的中枢<b>稳定性极差</b></div></div>
<div class="fig" style="min-width:250px"><div class="lbl">线段构成最小中枢（稳定）</div>${drawZS(
    [{ p: 10, tag: '底' }, { p: 14, tag: '顶' }, { p: 11, tag: '底' }, { p: 15, tag: '顶' }, { p: 11.5, tag: '底' }],
    [{ lo: 11, hi: 14, x0: 0, x1: 4, label: '线段中枢（稳定）' }], { zgzd: true, w: 40, h: 120 }
  )}<div class="cap">破坏一个线段要<b>多笔确认</b>，受偶尔性影响小<br>→ 线段构成的中枢<b>更稳定、更能过滤噪音</b></div></div>`;

  __chapters.push({
    id: 'ch35', vol: '卷八 · 理论深化', title: '第35章 中继型分型 + 最小中枢的心理意义', source: '原文第82、83课',
    figures: [
      { kind: 'echarts', title: '假顶分型（中继型）后继续上涨', note: 'K3、K4、K5 三根 K 线构成一个<b>顶分型</b>（中间 K4 高点 16 最高，橙色 pin）。但这只是<span class="kw">中继型分型</span>：分型出现后<b>并未成顶</b>，回补后没有破位，随后 K7、K8 继续创新高。<span class="hl">一个“一而再、再而三、三而竭”的心理较量没有完成彻底，只是中继。</span>', option: optCh35 },
      { kind: 'html', title: '笔构成中枢（不稳定）vs 线段构成中枢（稳定）', note: '第83课：<b>为什么不能由笔构成最小中枢？</b>因为一笔的顶/底分型<b>太容易被瞬间交易破坏</b>（打错单、老鼠仓），用笔做零件构造的系统<b>稳定性极差</b>；而破坏一个线段需要多笔确认，受偶尔性影响小，<span class="hl">所以用线段构成最小中枢，更能过滤噪音、体现真正的心理合力。</span>', html: figBiVsSeg },
    ],
    sections: [
      { type: 'definition', title: '分型结构的心理因素（第82课）', items: [
        { term: '① 顶分型＝三次心理较量', text: '一个顶分型之所以成立，是<b>卖的分力最终战胜了买的分力</b>：买有<b>三次努力</b>，卖有<b>三次阻击</b>。第一根 K 线高点被阻击回落，第二根创新高但小级别力度背驰，第三根再攻一次被彻底击败。<span class="hl">所谓“一而再、再而三，三而竭”，顶分型就这样出现。</span>', fig: mfig('顶分型＝三而竭', klineSVG([mk(10, 14, true), mk(11, 16, true), mk(10, 13, false)], { w: 30, h: 78 }), '买三攻、卖三阻，三而竭 → 顶分型成立') },
        { term: '② 中继型分型：顶未成顶', text: '分型形成后无非两种结构：<b>一、成为中继型的，最终不延续成笔；二、延续成笔。</b><span class="kw">中继型分型</span>就是：顶分型出现后<b>并未真正成顶</b>，只是“假顶”，随后继续上涨。它像一次刹车，<b>刹了一次没刹住</b>，车继续前行。', fig: mfig('中继型分型', drawZS([{ p: 10, tag: '底' }, { p: 13, tag: '顶', label: '假顶' }, { p: 11.5, tag: '底' }, { p: 15, tag: '顶', label: '新高' }], [], { w: 40, h: 92 }), '顶分型出现后未成顶、继续新高 → 中继') },
        { term: '③ 中继 vs 成笔的判断', text: '如何判断顶分型是<b>中继</b>还是<b>要延续成笔</b>？看两点：一是是否<b>有效跌破 5 日均线</b>（对日线顶分型）；二是该分型对应的小级别中枢里<b>是否出现第三类买卖点</b>并中枢移动。<span class="hl">出现小级别三类卖点且不扩张，几乎 100% 要在日线上出笔；反之是中继。</span>', fig: mfig('中继 vs 成笔', drawZS([{ p: 10, tag: '底' }, { p: 14, tag: '顶', label: '顶分型' }, { p: 12.5, label: '未破5日线', color: '#16a34a' }, { p: 15, tag: '顶', label: '中继' }, { p: 11, tag: '底' }, { p: 9, tag: '底', label: '成笔' }], [], { w: 36, h: 92 }), '未破 5 日线→中继；跌破并出三类卖点→成笔') },
      ]},
      { type: 'definition', title: '最小中枢为何用线段而非笔（第83课）', items: [
        { term: '④ 笔太易被小波动干扰', text: '为什么不能由笔构成最小中枢？因为<span class="hl">一笔的基础是顶、底分型，而一些瞬间的交易就足以影响其结构</span>——突然有人打错单、或有人给老鼠仓送货，全天走势分析就大变样。用笔当零件构造的系统，<b>稳定性极差</b>。', fig: mfig('笔易被波动干扰', drawZS([{ p: 10, tag: '底' }, { p: 12, tag: '顶' }, { p: 10.4, tag: '底' }, { p: 11.6, tag: '顶' }, { p: 10.8, label: '瞬间波动', color: '#e74c3c' }, { p: 12.4, tag: '顶' }, { p: 11, tag: '底' }], [{ lo: 10.4, hi: 12, x0: 0, x1: 6, label: '笔中枢' }], { w: 38, h: 92 }), '一次瞬间波动就改变笔结构 → 笔中枢不稳定') },
        { term: '⑤ 线段更稳定、过滤噪音', text: '由线段构成最小中枢，则不存在上述问题：<span class="hl">一个线段的改变，不会因为一个偶尔一笔的错误而改变</span>。想破坏一个线段，需要多笔、多特征序列分型的确认，受偶尔性影响小。所以<span class="kw">线段构成的最小中枢，才是合适的零件</span>。', fig: mfig('线段更稳定', drawZS([{ p: 10, tag: '底' }, { p: 14, tag: '顶' }, { p: 11, tag: '底' }, { p: 15, tag: '顶' }, { p: 11.5, tag: '底' }], [{ lo: 11, hi: 14, x0: 0, x1: 4, label: '线段中枢' }], { zgzd: true, w: 38, h: 92 }), '破坏线段需多笔确认 → 线段中枢稳定、过滤噪音') },
        { term: '⑥ 特征序列分型＝勾勒心理变化', text: '线段破坏本身，反映着一种<b>微妙的心理结构变化</b>。<span class="kw">特征序列分型</span>的引入，本质上就是去勾勒这种变化：<span class="hl">和一般分型一样，它也需要三次确认</span>，有效性因此大增。三个 K 线折腾决定一笔转折，而一个线段转折需要<b>三个特征序列分型的折腾</b>，市场才有足够时间去反应。', fig: mfig('特征序列分型＝三次确认', intervalsSVG([{ lo: 9, hi: 12, label: '1' }, { lo: 8, hi: 10, label: '2' }, { lo: 7, hi: 9, label: '3' }], { w: 40, h: 90 }), '三个特征序列元素形成分型 → 线段转折需三次确认') },
      ]},
      { type: 'motivation', title: '分型与中枢，都是“心理合力的留痕”', text: '第82、83课把“死”的技术规则，讲成了“活”的心理战场：一个顶分型是买三攻、卖三阻的<b>三而竭</b>较量；一个最小中枢，则要剔除掉打错单、老鼠仓这类<b>偶尔因素</b>的噪音。缠师刻意选择<b>线段</b>（而非笔）作为最小中枢的零件，本质是要求：<b>确认的信号必须足够“重”、足够“多次”，才值得据此改变判断</b>。理解了这一点，就既不会被一个假顶分型吓得下车（中继型），也不会被一次瞬间波动牵着鼻子走。' },
      { type: 'pitfalls', title: '常见误区', items: [
        '见到顶分型就卖——很可能是<b>中继型分型</b>（假顶），卖了就踏空；应先看是否破 5 日线、小级别是否出三类卖点。',
        '以为分型都是“三根 K 线那么简单”——它是<b>三次心理较量</b>的结果，力度看第二、三根 K 线的实体与位置。',
        '用<b>笔</b>去构造最小级别中枢——系统<b>稳定性极差</b>，瞬间交易就能改变结构，正确做法是用<b>线段</b>。',
        '忽略“特征序列分型要三次确认”——线段转折需要<b>三个特征序列分型的折腾</b>，不是一笔就能定。',
        '中继分型后一劳永逸不设防——中继顶分型后若小级别出现背驰，<b>下一顶分型是中继的可能性大幅减少</b>（刹车效果递减）。',
      ]},
      { type: 'exercises', title: '练习', items: [
        { q: '什么是“中继型分型”？它和“延续成笔”的分型有何区别？', a: '顶分型出现后<b>并未真正成顶、只是中继、随后继续上涨</b>，就是中继型分型。区别在于：中继型通常<b>不有效跌破 5 日线、小级别不出现三类卖点</b>；而延续成笔的分型会跌破 5 日线、且小级别中枢出现第三类卖点并中枢移动（第82课）。' },
        { q: '为什么最小级别中枢用“线段”而不用“笔”来构成？', a: '因为<b>一笔太容易被瞬间交易破坏</b>（打错单、老鼠仓），用笔当零件系统稳定性极差；而<b>破坏一个线段需要多笔、多次特征序列分型确认</b>，受偶尔性影响小，更能过滤噪音、体现真正的心理合力（第83课）。' },
        { q: '“一而再、再而三，三而竭”在顶分型里具体指什么？', a: '指买方的<b>三次努力</b>被卖方的<b>三次阻击</b>依次消耗：第一根 K 线高点被阻击回落，第二根创新高但小级别力度背驰，第三根再攻被彻底击败、不再新高——三次之后买力衰竭，顶分型成立（第82课）。' },
      ]},
    ],
  });
})();
