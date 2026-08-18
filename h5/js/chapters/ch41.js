/* 第41章 中阴结合律 + 多层次立体分类 + 答疑1 */
(function () {

  function optCh41() {
    // 30 / 5 / 1 分钟三级别联立的立体完全分类
    const pts30 = [18, 14, 16, 13, 15, 12.5, 14.5, 12, 15];
    const pts5 = [16, 14, 15, 12.5, 14, 11.5, 13, 10.5];
    const pts1 = [14, 12, 13, 11, 12, 10, 11.5, 9.8];

    const mkArea = (x0, x1, lo, hi, name) => [{ xAxis: x0, yAxis: lo, name }, { xAxis: x1, yAxis: hi }];
    const segLbl = (x, y, t, color) => ({ coord: [x, y], name: t, symbol: 'none', label: { show: true, color: color || '#1f2937', fontSize: 11, fontWeight: 'bold', position: 'top' } });
    const dot = (x, y, c, pos, t) => ({ coord: [x, y], name: t, symbol: 'circle', symbolSize: 9, itemStyle: { color: c }, label: { show: true, color: c, fontSize: 10, position: pos, distance: 4, fontWeight: 'bold', formatter: function (p) { return p.name; } } });

    function mkGrid(gi, name, pts, areas, points, color) {
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

    return {
      tooltip: { trigger: 'axis', axisPointer: { type: 'cross' } },
      grid: [
        { left: 62, right: 90, top: 30, height: 118 },
        { left: 62, right: 90, top: 178, height: 118 },
        { left: 62, right: 90, top: 326, height: 118 },
      ],
      xAxis: [
        { type: 'value', gridIndex: 0, min: 0, max: 8, interval: 1 },
        { type: 'value', gridIndex: 1, min: 0, max: 7, interval: 1, axisLabel: { show: false } },
        { type: 'value', gridIndex: 2, min: 0, max: 7, interval: 1 },
      ],
      yAxis: [
        { type: 'value', gridIndex: 0, min: 11, max: 19.5, name: '30分钟', nameLocation: 'middle', nameGap: 42 },
        { type: 'value', gridIndex: 1, min: 9, max: 17.5, name: '5分钟', nameLocation: 'middle', nameGap: 42 },
        { type: 'value', gridIndex: 2, min: 8.5, max: 15.5, name: '1分钟', nameLocation: 'middle', nameGap: 42 },
      ],
      series: [
        mkGrid(0, '30分钟：下跌 + 中枢震荡', pts30, [mkArea(0, 8, 12.5, 16, '30分钟中枢 [12.5,16]')],
          [segLbl(4, 18.2, '只要不出现三卖，震荡有效', '#2563eb')], '#2563eb'),
        mkGrid(1, '5分钟：离开中枢向下', pts5, [mkArea(0, 4, 13.5, 15, '5分钟第一中枢 [13.5,15]')],
          [segLbl(3, 16.3, '离开中枢向下，三卖未形成', '#f59e0b')], '#f59e0b'),
        mkGrid(2, '1分钟：下跌已形成', pts1, [],
          [dot(7, 9.8, '#16a34a', 'bottom', '底背驰（最先出现）'),
           segLbl(2, 14.5, '1分钟下跌已形成', '#16a34a')], '#e74c3c'),
      ],
    };
  }

  const figBuy2 = `
<div class="fig" style="min-width:210px"><div class="lbl">① 最强：二买 = 三买（合一）</div>${drawZS(
  [{ p: 12, tag: '顶' }, { p: 9, tag: '底', label: '一买' }, { p: 10.5, label: '二买=三买', color: '#9333ea' }, { p: 12.5, tag: '顶' }],
  [{ lo: 10.5, hi: 12, x0: 0, x1: 3, label: '原中枢' }],
  { w: 40, h: 110 }
)}<div class="cap">二买刚好构成原中枢的三买 → V型反转</div></div>
<div class="fig" style="min-width:210px"><div class="lbl">② 最弱：二买跌破一买</div>${drawZS(
  [{ p: 12, tag: '顶' }, { p: 9, tag: '底', label: '一买' }, { p: 10, tag: '顶' }, { p: 8.5, tag: '底', label: '二买(低于一买)', color: '#16a34a' }],
  [{ lo: 10.5, hi: 12, x0: 0, x1: 3, label: '原中枢' }],
  { w: 40, h: 110 }
)}<div class="cap">二买比一买低 → 盘整背驰（顺势/扩张平台）</div></div>
<div class="fig" style="min-width:210px"><div class="lbl">③ 一般：一二三买依次向上</div>${drawZS(
  [{ p: 12, tag: '顶' }, { p: 9, tag: '底', label: '一买' }, { p: 10, tag: '顶' }, { p: 9.5, tag: '底', label: '二买' }, { p: 11, tag: '顶' }, { p: 10.5, label: '三买', color: '#e74c3c' }, { p: 12.5, tag: '顶' }],
  [{ lo: 10.5, hi: 12, x0: 0, x1: 5, label: '原中枢' }],
  { w: 32, h: 110 }
)}<div class="cap">一、二、三买依次向上，一个比一个高</div></div>`;

  // ---- 讲解点小图 ----
  const figMid = mfig('① 中阴 = 生长阶段的未确定性',
    '<div style="font-size:12px;line-height:1.9;color:#1f2937">中阴 = 走势<b>生长阶段的未确定性</b><br><span style="color:#6b7280">不是理论缺陷，是客观的量子化特性</span></div>',
    '世界是测不准的，中阴客观反映这一点');

  const figMidOp = mfig('② 中阴当中枢震荡操作',
    drawZS([{ p: 12, tag: '顶' }, { p: 10, tag: '底' }, { p: 12.3, tag: '顶' }, { p: 10.3, tag: '底' }, { p: 12, tag: '顶' }],
      [{ lo: 10.3, hi: 12, x0: 0, x1: 4, label: '中阴(当中枢震荡)' }],
      { w: 44, h: 100 }),
    '中阴当中枢震荡，按中枢震荡操作即可');

  const figAssoc = mfig('③ 结合律分解中阴',
    '<div style="font-size:11.5px;line-height:1.9;color:#1f2937">a+b+c+d+e+f<br>= a+b+c+(d+e+f)<br>→ a+b+c+d+e+(f+g+h)</div>',
    '用结合律使连接中枢的走势保持最完美形态');

  const figLevel41 = mfig('④ 完成后必面临更大级别震荡',
    drawZS([{ p: 14, tag: '顶' }, { p: 11, tag: '底', label: '最后中枢' }, { p: 13, tag: '顶' }, { p: 10, tag: '底' }, { p: 12, tag: '顶' }, { p: 8.5, tag: '底', label: '回到更早中枢(危险)', color: '#e74c3c' }],
      [{ lo: 11, hi: 13, x0: 0, x1: 4, label: '最后中枢' }, { lo: 8.5, hi: 10, x0: 4, x1: 5, label: '更早中枢' }],
      { w: 36, h: 104 }),
    '震荡落在最后中枢=健康；回到更早中枢=危险');

  const figStack = mfig('⑤ 立体完全分类',
    '<div style="font-size:12px;line-height:1.9;color:#1f2937">30分钟 × 5分钟 × 1分钟<br>三个层次<b>联立</b><br>当下状态对应各自分类中的现实状态</div>',
    '把走势唯一化：层次越全，解越少');

  const figPerfect = mfig('⑥ 1分钟底背驰后的完全分类',
    '<div style="font-size:11.5px;line-height:1.8;color:#1f2937">1分钟底背驰（最先出现）<br>→ 回拉构成5分钟三卖？<br>&nbsp;&nbsp;是：确认5分钟下跌<br>&nbsp;&nbsp;否：5分钟中枢继续震荡</div>',
    '两种完全分类，匹配自己的承受能力');

  const figBuy2Mini = mfig('⑦ 二买三情况（概览）',
    drawZS([{ p: 12, tag: '顶' }, { p: 9, tag: '底', label: '一买' }, { p: 10, tag: '顶' }, { p: 9.5, tag: '底', label: '二买' }, { p: 11, tag: '顶' }, { p: 10.5, label: '三买', color: '#e74c3c' }],
      [{ lo: 10.5, hi: 12, x0: 0, x1: 4, label: '原中枢' }],
      { w: 34, h: 100 }),
    '只有中阴状态下才有一二类买点；结束后只剩三类与震荡买卖点');

  const figDecomp = mfig('⑧ 唯一分解定理',
    '<div style="font-size:12px;line-height:1.9;color:#1f2937">分型/笔/线段/走势类型<br>对应的<b>递归函数</b><br>→ 任何走势<b>唯一分解</b></div>',
    '分型 = 递归函数 a0，可随意设计');

  __chapters.push({
    id: 'ch41', vol: '卷八 · 理论深化', title: '第41章 中阴结合律 + 多层次立体分类 + 答疑1', source: '原文第99、100、101课',
    figures: [
      { kind: 'echarts', title: '30 / 5 / 1 分钟三级别联立的立体完全分类', note: '第100课：完全分类<b>必须多层次</b>。上中下分别为 <b>30分钟</b>（下跌、中枢震荡中，只要不出现三卖震荡有效）、<b>5分钟</b>（离开第一中枢向下移动，三卖未形成）、<b>1分钟</b>（下跌已形成）。三个层次联立，第一个必然且最先出现的变化是<b>1分钟底背驰</b>；其后回拉只有两种完全分类——构成或不构成 5 分钟三卖。', option: optCh41 },
      { kind: 'html', title: '第二类买点的三种情况（第101课）', note: '第101课：<b>一买=背驰点、三买=中枢破坏点</b>，而二买是一买的次级别回抽后再探底的结束点，分三种情况——<span class="hl">最强</span>：二买刚好构成原中枢三买（二三买合一，V型反转）；<span class="hl">最弱</span>：二买跌破一买（盘整背驰）；<span class="hl">一般</span>：一二三买依次向上。', html: figBuy2 },
    ],
    sections: [
      { type: 'definition', title: '中阴状态与结合律（第99课）', items: [
        { term: '① 中阴 = 生长阶段的未确定性', text: '走势结构最重要的就是有<b>中阴部分</b>的存在。<span class="kw">中阴状态</span>反映了行情走势<b>生长阶段的未确定性</b>。有人认为中阴是理论不完善，其实是典型一根筋思维——世界更多是<b>量子化、测不准</b>的，中阴恰好客观反映走势这种特性。', fig: figMid },
        { term: '② 中阴当中枢震荡整理', text: '中阴状态<b>不会对操作有任何影响</b>，因为中阴状态都可以看成是一个<span class="hl">中枢震荡的整理</span>，按中枢震荡的操作就可以了。很多人一碰到中阴就晕，因为这时不能对走势给出明确的（一般性的）划分。', fig: figMidOp },
        { term: '③ 结合律分解：a+b+c+d+e+f', text: '根据<b>结合律</b>，连接中枢的走势并不一定是完全的趋势类型。例如 <code>a+b+c+d+e+f = a+b+c+(d+e+f)</code>：a+b+c+d+e 是线段类上涨，c+d+e 的重合构成最后类中枢，f 是类背驰后的回调；若 f+g+h 构成 1 分钟中枢，则划分变为 <code>a+b+c+d+e+(f+g+h)</code>，原线段类上涨保持。划分的原则：<span class="hl">必须保证中枢的确立，在这前提下用结合律使连接中枢的走势保持最完美形态。</span>', formula: 'a+b+c+d+e+f = a+b+c+(d+e+f) → a+b+c+d+e+(f+g+h)', fig: figAssoc },
        { term: '④ 走势级别完成后必面临更大级别震荡', text: '走势的最大特点：<span class="hl">连接中枢的走势级别一定小于中枢</span>；换言之，一个走势级别完成后，必然面临<b>至少大一级别的中枢震荡</b>。这更大级别中枢的第一个位置很关键：它必然至少落在<b>前一走势类型的最后一个中枢范围里</b>才算正常、健康；一旦回到第二甚至更后中枢里，就是不健康、危险的。', formula: '走势级别完成 → 至少面临大一级别的中枢震荡（落在最后中枢范围内才健康）', fig: figLevel41 },
      ]},
      { type: 'definition', title: '多层次立体完全分类（第100课）', items: [
        { term: '⑤ 完全分类必须是多层次的', text: '完全分类<b>不是单层次的，一定也必须是多层次的</b>。缠论最重要的特点之一，就是自然给出分类的层次（自然形成的级别）：不同级别有不同的完全分类，综合起来就有<span class="hl">立体的完全分类系统</span>，这才是操作必须依赖的。', fig: figStack },
        { term: '⑥ 三级别联立的最完美操作指示', text: '以 <b>30、5、1 分钟</b>三层次为例：第一个必然且最先出现的变化，是<b>1 分钟层次的底背驰</b>（它不出现，其他层次不变）；底背驰后必出现回拉，只有两种完全分类——<b>构成或不构成 5 分钟三卖</b>。把可能结果与自己的承受能力匹配，给出资金比例、仓位控制，就能自如参与。', fig: figPerfect },
      ]},
      { type: 'definition', title: '答疑1：二买三情况与走势必完美（第101课）', items: [
        { term: '⑦ 第二类买点的三种情况', text: '一买=背驰点、三买=中枢破坏点。<b>第二类买点</b>是一买次级别回抽后再探底的结束点，分三种：<b>最强</b>——二买刚好构成原下跌最后一个中枢的三买（二三买合一，V型反转）；<b>最弱</b>——二买跌破一买（构成盘整背驰）；<b>一般</b>——一二三买依次向上。注意：只有在中阴状态下才有一二类买点，中阴结束后只剩三类与震荡买卖点。', formula: '二买三情况：最强(二三买合一) / 最弱(跌破一买) / 一般(依次向上)', fig: figBuy2Mini },
        { term: '⑧ 走势必完美 = 唯一分解', text: '<span class="kw">走势必完美</span>，就是本ID给出的分型、笔、线段、不同级别走势类型所对应的<b>递归函数</b>，能将行情的任何走势<b>唯一地分解</b>——即<span class="hl">唯一分解定理</span>。分型等于递归函数的 <code>a0</code>，完全可以随意设计，不影响唯一分解定理的证明。有了唯一分解，缠论就能包含其他所有理论并指出其不足。', formula: '走势必完美 = 递归函数 → 任何走势唯一分解（唯一分解定理）', fig: figDecomp },
      ]},
      { type: 'motivation', title: '承认"未确定"，反而更确定', text: '很多人追求"每个当下都有唯一机械答案"，结果一碰到中阴状态就晕。缠论的高明之处在于<b>承认中阴、承认测不准</b>，然后把它<b>归入中枢震荡</b>来操作；再用<b>结合律</b>与<b>多级别联立</b>，把走势唯一化、把操作立体化。中阴不是理论的漏洞，而是理论完整性的体现；走势必完美（唯一分解）才是这一切能成立的根——因为递归函数能把任何走势唯一分解，所以无论走势处于中阴还是明确趋势，都有确定的应对。' },
      { type: 'pitfalls', title: '常见误区', items: [
        '认为中阴是理论不完善（错：中阴<b>客观反映走势量子化、测不准</b>，一根筋才想要唯一机械答案）。',
        '一碰到中阴就晕、硬要给明确划分（错：中阴<b>当中枢震荡整理</b>，按中枢震荡操作即可）。',
        '用<b>单层次</b>完全分类去操作（错：必须<b>多层次立体完全分类</b>，才能把走势唯一化）。',
        '把二买理解成"一定高于一买"（错：<b>最弱情况二买可跌破一买</b>，构成盘整背驰）。',
        '纠缠"分型怎么设计才对"（错：分型 = 递归函数 <code>a0</code>，可随意设计，不影响唯一分解）。',
      ]},
      { type: 'exercises', title: '练习', items: [
        { q: '为什么中阴状态"不会对操作有任何影响"？', a: '因为中阴状态都可以看成是一个<b>中枢震荡的整理</b>，按<b>中枢震荡的操作</b>就可以了；它只是反映走势生长阶段的未确定性。' },
        { q: '100课为什么说"1分钟底背驰是最先必然出现的变化"？', a: '在 30/5/1 三层次联立中，<b>最小级别（1分钟）的变化最先出现</b>；1 分钟底背驰不出现，5 分钟、30 分钟层次不会有任何状态变化。其后回拉只有<b>构成或不构成 5 分钟三卖</b>两种完全分类。' },
        { q: '第二类买点有哪三种情况？', a: '<b>最强</b>：二买刚好构成原中枢的三买（二三买合一，V型反转）；<b>最弱</b>：二买跌破一买（盘整背驰）；<b>一般</b>：一、二、三买依次向上，一个比一个高。' },
      ]},
    ],
  });
})();
