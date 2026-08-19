/* 第32章 自相似性哲学（“自同构性”为后世引申称谓，原文第81课作“自相似性/自组性”） */
(function () {

  // ---- 主图1：分形树——同一结构在不同级别的自同构复制 ----
  function fractalSVG() {
    const pts = [];
    function seg(x0, y0, x1, y1, dep) {
      if (dep === 0) { pts.push([x0, y0]); pts.push([x1, y1]); return; }
      const dx = x1 - x0, dy = y1 - y0, amp = dx * 0.11;
      const p1 = [x0 + dx * 0.25, y0 + dy * 0.25 - amp];
      const p2 = [x0 + dx * 0.5, y0 + dy * 0.5 + amp];
      const p3 = [x0 + dx * 0.75, y0 + dy * 0.75 - amp];
      seg(x0, y0, p1[0], p1[1], dep - 1);
      seg(p1[0], p1[1], p2[0], p2[1], dep - 1);
      seg(p2[0], p2[1], p3[0], p3[1], dep - 1);
      seg(p3[0], p3[1], x1, y1, dep - 1);
    }
    seg(10, 100, 510, 100, 3);
    const d = [];
    for (const p of pts) { const last = d[d.length - 1]; if (!last || last[0] !== p[0] || last[1] !== p[1]) d.push(p); }
    const poly = d.map(p => p[0].toFixed(1) + ',' + p[1].toFixed(1)).join(' ');
    return '<svg viewBox="0 0 520 200" width="520" height="200" style="display:block"><polyline points="' + poly + '" fill="none" stroke="#2563eb" stroke-width="1.5"/></svg>';
  }

  const figFractal = `
<div class="fig" style="min-width:340px"><div class="lbl">自相似性：同一结构（上-下-上）在每一级重复</div>${fractalSVG()}<div class="cap">这条折线的每一段，放大后<b>又是一段同样形状的“上-下-上”折线</b>，再放大依然如此……<br>分型、笔、线段、中枢、走势类型，正是这样<b>在任何级别上结构相同</b>，只是尺度不同——这就是<b>自相似性</b>（后世也称“自同构性”）。</div></div>`;

  // ---- 主图2：ECharts 三个级别叠加的同一中枢结构 ----
  function optCh32() {
    const mkGrid = (gi, name) => {
      const pts = [10, 16, 11, 15];
      const dot = (i, c, pos) => ({ coord: [i, pts[i]], symbol: 'circle', symbolSize: 8, itemStyle: { color: c }, label: { show: true, color: c, fontSize: 10, position: pos, distance: 5, fontWeight: 'bold' } });
      const segLbl = (x, y, t) => ({ coord: [x, y], name: t, symbol: 'none', label: { show: true, color: '#1f2937', fontSize: 11, fontWeight: 'bold', position: 'top' } });
      return {
        name, type: 'line', xAxisIndex: gi, yAxisIndex: gi,
        data: pts.map((p, i) => [i, p]), symbol: 'circle', symbolSize: 5,
        lineStyle: { width: 2, color: '#1f2937' }, itemStyle: { color: '#1f2937' },
        markArea: {
          silent: true, itemStyle: { color: 'rgba(37,99,235,0.10)' },
          label: { show: true, position: 'insideTop', formatter: function (p) { return p.name || ''; }, color: '#2563eb', fontSize: 11 },
          data: [[{ xAxis: 0, yAxis: 11, name: name + ' · 中枢 [11,15]（结构相同）' }, { xAxis: 3, yAxis: 15 }]],
        },
        markPoint: {
          data: [
            dot(0, '#16a34a', 'bottom'), dot(1, '#e74c3c', 'top'), dot(2, '#16a34a', 'bottom'), dot(3, '#e74c3c', 'top'),
            segLbl(0.5, 14.5, '①上'), segLbl(1.5, 12.0, '②下'), segLbl(2.5, 14.5, '③上'),
            { coord: [1.5, 17.6], name: '◀ 同一结构，仅级别不同', symbol: 'none', label: { show: true, color: '#9333ea', fontSize: 10, fontWeight: 'bold' } },
          ],
        },
      };
    };
    return {
      tooltip: { trigger: 'axis', axisPointer: { type: 'cross' } },
      grid: [
        { left: 62, right: 90, top: 30, height: 128 },
        { left: 62, right: 90, top: 198, height: 128 },
        { left: 62, right: 90, top: 366, height: 128 },
      ],
      xAxis: [
        { type: 'value', gridIndex: 0, min: 0, max: 3, interval: 1 },
        { type: 'value', gridIndex: 1, min: 0, max: 3, interval: 1, axisLabel: { show: false } },
        { type: 'value', gridIndex: 2, min: 0, max: 3, interval: 1 },
      ],
      yAxis: [
        { type: 'value', gridIndex: 0, scale: true, name: '1分钟', nameLocation: 'middle', nameGap: 42 },
        { type: 'value', gridIndex: 1, scale: true, name: '5分钟', nameLocation: 'middle', nameGap: 42 },
        { type: 'value', gridIndex: 2, scale: true, name: '30分钟', nameLocation: 'middle', nameGap: 42 },
      ],
      series: [mkGrid(0, '1分钟级别'), mkGrid(1, '5分钟级别'), mkGrid(2, '30分钟级别')],
    };
  }

  // ---- 主图3：贪嗔痴疑慢五毒 → 交易心理 ----
  const figFive = `
<div class="fig" style="min-width:320px"><div class="lbl">贪嗔痴疑慢：五毒如何作用于交易心理</div>
<div style="font-size:12.5px;line-height:1.95;color:#1f2937">
<span style="background:#fee2e2;color:#991b1b;padding:2px 8px;border-radius:5px"><b>贪</b> 贪婪</span> → 追高、死扛、想赚到最后一分<br>
<span style="background:#fef3c7;color:#92400e;padding:2px 8px;border-radius:5px"><b>嗔</b> 嗔恨</span> → 亏了报复性重仓、赌气交易<br>
<span style="background:#e0e7ff;color:#3730a3;padding:2px 8px;border-radius:5px"><b>痴</b> 愚痴</span> → 不懂理论瞎猜、听消息<br>
<span style="background:#f0fdf4;color:#166534;padding:2px 8px;border-radius:5px"><b>疑</b> 怀疑</span> → 买点到了不自信、拿不住<br>
<span style="background:#f3e8ff;color:#6b21a8;padding:2px 8px;border-radius:5px"><b>慢</b> 傲慢</span> → 自以为是轻敌、不肯认错<br>
</div>
<div class="cap">因为<b>人的贪嗔痴疑慢都一样</b>（只随时间、环境大小不一），所有人的合力反映在走势上，就使走势显示出<b>自相似性</b>——这是缠论整个哲学的地基。</div></div>`;

  // ---- 讲解点小图 ----

  // ① 哲学基础
  const figRoot = mfig('哲学基础：贪嗔痴疑慢 → 自相似性',
    '<div style="font-size:12.5px;line-height:2;color:#1f2937">人的<b style="color:#991b1b">贪嗔痴疑慢</b>都一样<br>→ 合力反映在走势中<br>→ 走势显示<b>自相似性</b></div>',
    '为什么研究分型、走势类型？哲学基础就是人的贪嗔痴疑慢');

  // ② 分型/走势类型的本质 = 自相似性
  const figEssence = mfig('分型在 1 分钟与年线上结构相同',
    '<div style="display:flex;gap:8px;align-items:center">'
    + klineSVG([mk(10, 13), mk(8, 11), mk(10, 13.5)], { w: 28, h: 72 })
    + '<span style="font-size:18px;color:#6b7280">=</span>'
    + klineSVG([mk(10, 13), mk(8, 11), mk(10, 13.5)], { w: 28, h: 72 })
    + '</div>',
    '级别不同，但结构一样——这就是自相似性（底分型处处如此）');

  // ③ 级别自组出来
  const figSelfOrg = mfig('级别是自相似性“生长”出来的',
    '<div style="font-size:12.5px;line-height:2;color:#1f2937"><b style="color:#2563eb">自相似性 = 基因</b><br>→ 按图谱自动生长出<br><b>不同级别</b>（自组性）</div>',
    '级别不是人划的，是自相似性自组/生长出来的');

  // ④ 走势有生命
  const figLife = mfig('走势是有生命的（类生命现象）',
    '<div style="font-size:12.5px;line-height:2.2;color:#1f2937"><b>发芽</b> → <b>生长</b> → <b>绽放</b> → <b>凋败</b><br>一切都在当下中灿烂</div>',
    '“看走势如听花开”——不是比喻，是科学般的严谨');

  // ⑤ 最重要定理
  const figTheorem = mfig('不同构的自相似结构 → 不同正确道路',
    '<div style="font-size:12.5px;line-height:2;color:#1f2937">有多少<b>不同构</b>的自相似结构<br>就有多少种分析股市的<b>正确道路</b><br><span style="color:#6b7280">脱离自相似性的方法，本质上都错</span></div>',
    '分型、走势类型是两种不同构的自相似结构');

  // ⑥ 顶必顶分型 / 底必底分型
  const figTop = mfig('没有顶分型，没有顶；没有底分型，没有底',
    drawZS([{ p: 10, label: '底分型', color: '#16a34a' }, { p: 15, label: '顶分型', color: '#e74c3c', above: true }, { p: 11, label: '底分型', color: '#16a34a' }, { p: 14, label: '顶分型', color: '#e74c3c', above: true }],
      [], { w: 40, h: 96 }),
    '操作级别图上没顶分型就持有睡觉，等顶分型出来再说');

  // ⑦ 级别独立：联立方程
  const figLevel = mfig('级别独立：30分钟中枢震荡 + 5分钟上涨',
    drawZS([{ p: 10, label: '5分钟涨', color: '#16a34a' }, { p: 12, label: '5分钟涨', color: '#16a34a', above: true }, { p: 11 }, { p: 13, label: '30分钟震荡', color: '#2563eb', above: true }, { p: 11.5 }, { p: 13.5 }],
      [{ lo: 11, hi: 13, x0: 1, x1: 5, label: '30分钟中枢' }], { w: 34, h: 100 }),
    '两个级别互不打架，像联立方程——解大幅减少');

  // ⑧ 五毒 → 交易心理
  const figMind = mfig('五毒 → 交易心理',
    '<div style="font-size:12px;line-height:1.9;color:#1f2937"><b style="color:#991b1b">贪</b>追高死扛 · <b style="color:#92400e">嗔</b>报复重仓<br><b style="color:#3730a3">痴</b>瞎猜听消息 · <b style="color:#166534">疑</b>拿不住<br><b style="color:#6b21a8">慢</b>自大不认错</div>',
    '五毒人人皆有，故走势自相似；戒五毒是心态修炼的根本');

  __chapters.push({
    id: 'ch32', vol: '卷七 · 资金心态与综合', title: '第32章 自相似性哲学', source: '原文第81、104课',
    figures: [
      { kind: 'html', title: '自同构性：同一结构在每一级复制（分形示意）', note: '这条<b>分形折线</b>的任意一段，放大后都是<b>同样形状的“上-下-上”</b>，再放大依然如此。<span class="hl">分型、笔、线段、中枢、走势类型，在任何级别上结构完全相同，只是尺度不同</span>——这就是<b>自相似性（自同构性）</b>。正因为走势有自相似性，它才是可理解、可把握的；把握走势，本质上就是把握其自相似性。', html: figFractal },
      { kind: 'echarts', title: '三个级别叠加的同一中枢结构', note: '1分钟、5分钟、30分钟三个级别，画出的都是<b>同一段“上-下-上”构成的中枢 [11,15]</b>——<b>结构完全一样，只有级别（尺度）不同</b>。第81课：分型在 1 分钟级别是这样，在年线上也是这样的结构；走势类型也一样。级别不是凭空来的，是<b>自相似性自组、生长出来的</b>。', option: optCh32 },
      { kind: 'html', title: '贪嗔痴疑慢：五毒与交易心理', note: '第81课指出：缠论整个哲学的<b>地基</b>是——<span class="hl">人的贪嗔痴疑慢都是一样的</span>（只随时间和环境大小不一），所以所有人的合力反映在走势里，就使走势显示出<b>自相似性</b>。看清自己的<b>贪、嗔、痴、疑、慢</b>，是心态修炼的根本。', html: figFive },
    ],
    sections: [
      { type: 'definition', title: '自相似性与自组性（第81课）', items: [
        { term: '① 哲学基础：贪嗔痴疑慢', text: '为什么要研究分型、走势类型？其<b>哲学基础就是人的贪嗔痴疑慢</b>。<span class="hl">因为人的贪嗔痴疑慢都是一样的，只是跟随时间、环境大小不一，所以显示出自相似性。</span>而走势是所有人贪嗔痴疑的合力结果，反映在走势中，就使走势显示出<b>自相似性</b>。', fig: figRoot },
        { term: '② 分型/走势类型的本质 = 自相似性', text: '<span class="kw">分型、走势类型的本质就是自相似性，走势必完美的本质也是自相似性。</span>分型，在 1 分钟级别是这样的结构，在年线上也是这样的结构——不同的级别上，级别不同，但<b>结构是一样的</b>；走势类型也一样。', fig: figEssence },
        { term: '③ 级别是自相似性自组出来的', text: '自相似性最重要的特点：<span class="hl">自相似性可以自组出级别来</span>。严格说，级别是<b>自相似性自组出来、生长出来的</b>。自相似性就如同<b>基因</b>，按照这个基因、这个图谱，走势就如生命般自动生长出不同的级别来。只要人不变、贪嗔痴疑不变，自相似性就存在，级别的自组性就必然存在。', fig: figSelfOrg },
        { term: '④ 走势是有生命的', text: '缠论的哲学本质，就是人的贪嗔痴疑慢所引发的<b>自相似性</b>，以及由此引发的<b>走势级别的自组性</b>这种类生命的现象。<span class="kw">走势是有生命的</span>——“看行情走势，如听一朵花的开放”，这不是比喻，而是科学般的严谨说明：走势确实在自相似性、自组性中<b>发芽、生长、绽放、凋败</b>。', fig: figLife },
      ]},
      { type: 'definition', title: '自相似性的推论与操作意义（第81课）', items: [
        { term: '⑤ 最重要定理：不同构的自相似结构', text: '有一条最重要的定理：<span class="hl">有多少不同构的自相似性结构，就有多少种分析股市的正确道路；任何脱离自相似性的股市分析方法，本质上都是错误的。</span>分型、走势类型就是<b>两种不同构</b>的自相似性结构——条条大路通罗马，先搞清楚这两个最基础的结构。', fig: figTheorem },
        { term: '⑥ 顶必顶分型、底必底分型', text: '自相似性结构的用处极大。一个最简单结论：<span class="kw">所有的顶必然是顶分型的，所有的底必然是底分型的</span>；由此推出 100% 正确的结论——<b>没有顶分型，没有顶；没有底分型，没有底</b>。所以在你操作级别的图上，没有顶分型，就可以持有睡觉，等顶分型出来再说。', fig: figTop },
        { term: '⑦ 级别独立：联立方程、立体看盘', text: '有了自相似性结构，<b>任何一个级别里的走势发展都是独立的</b>——例如 30 分钟的中枢震荡，与 5 分钟的上涨走势，两个级别<b>不会互相打架</b>，而是构成一个类似<b>联立方程</b>的东西：单方程解很多，联立起来解就大幅减少。<span class="hl">看走势不能光看一个级别，必须立体地看。</span>', fig: figLevel },
        { term: '⑧ 贪嗔痴疑慢五毒对交易心理的影响', text: '五毒人人皆有，只是轻重不同：<b>贪</b>（追高、死扛、想赚到最后一分）、<b>嗔</b>（亏损后报复性重仓、赌气）、<b>痴</b>（不懂理论瞎猜、听消息）、<b>疑</b>（买点到了不自信、拿不住）、<b>慢</b>（自以为是、不肯认错）。<span class="kw">戒除五毒，是心态修炼的根本</span>，也正是技术能落地的前提。', fig: figMind },
      ]},
      { type: 'motivation', title: '自同构性让理论从“特例”变成“普适”', text: '如果每个级别、每只股票的规律都各不相同，缠论就不可能是一条可学习的理论。自同构性解决了这个根本问题：<b>结构在任何级别、任何标的上都同构</b>，所以一套“分型→笔→线段→中枢→走势类型”的规则可以<b>递归地</b>套用到 1 分钟直到年线。它既是理论的哲学地基，也是“级别递归”之所以成立的前提——理解了自同构性，就理解了缠论为什么能“以不变应万变”。' },
      { type: 'pitfalls', title: '常见误区', items: [
        '把<b>级别</b>当成人为划分的周期（错：级别是<b>自相似性自组/生长出来</b>的）。',
        '以为<b>缠论是死的教条</b>（错：它是可发展的生命学科，研究方向就是自相似性、自组性）。',
        '<b>只盯一个级别</b>看盘（错：要立体地看，多级别联立，解才唯一）。',
        '脱离<b>自相似性</b>去另搞一套分析方法（本质上都是错误的道路）。',
        '只学技术、<b>不戒贪嗔痴疑慢</b>，技术再对也执行不下去。',
      ]},
      { type: 'exercises', title: '练习', items: [
        { q: '“自相似性”和“自同构性”是什么关系？', a: '两者同源：<b>自相似性</b>指分型、走势类型在任何级别上<b>结构相同、只尺度不同</b>；走势必完美的本质也是自相似性。自相似性又能<b>自组出级别</b>（自组性）。这种“同一结构在不同级别递归复制”的性质，就是后世所称的<b>自同构性</b>。<span style="color:#6b7280">（注意：原文第81课用“自相似性/自组性”，“自同构性”为后世引申称谓。）</span>' },
        { q: '为什么说“没有顶分型，没有顶”？', a: '因为<b>所有的顶必然是顶分型的</b>（这是自相似性结构给出的 100% 结论）。反过来就是：操作级别图上<b>没有顶分型，就可以持有睡觉</b>，等顶分型出现再说（第81课）。' },
        { q: '缠论哲学的哲学基础是什么？', a: '<b>人的贪嗔痴疑慢</b>。因为人的贪嗔痴疑慢都一样（只随时间、环境大小不一），所有人的合力反映在走势中，就使走势显示出<b>自相似性</b>；由此引发走势级别的<b>自组性</b>，使走势具有<b>类生命</b>的特征（第81课）。' },
      ]},
      { type: 'definition', title: '几何结构与能量动力结构（第104课）', items: [
        { term: '① 数学 + 物理双重的超级完美', text: '缠论是一个超级完美的理论：第一是在<b>数学角度</b>超级完美，其次是在<b>物理角度</b>超级完美。物理角度以前说得不多，因为这需要的思维方式，同样要有一个大的改变。', fig: mfig('数学 + 物理双重完美', '<div style="font-size:12px;line-height:1.9;color:#1f2937">① 数学角度：超级完美<br>② 物理角度：超级完美</div>', '物理视角需要思维的大改变') },
        { term: '② 现代物理核心：物理与几何高度统一', text: '现代物理的一个核心概念，就是<b>物理与几何的高度统一</b>。本质上，现代物理就是一门几何学——只不过是各种不同高深的几何学。广义相对论是第一种真正意义上的现代物理学，其基础是几何（一种较简单的几何学）；而规范场、超弦、膜空间等，则涉及各种超越一般人直观的几何。', fig: mfig('物理 = 几何', '<div style="font-size:12px;line-height:1.9;color:#1f2937">广义相对论（简单几何）<br>→ 规范场 / 超弦 / 膜空间<br>（超越直观的几何）</div>', '现代物理的本质是几何学') },
        { term: '③ 能量、动力结构 = 特殊的几何结构', text: '在那些几何学里，<b>能量、动力等结构对应着一些特殊的几何结构</b>。例如广义相对论中，物质结构与几何结构高度统一，引力结构对应着特殊的几何结构。这才是现代物理的主流——能量、动力都几何化了。', fig: mfig('能量 → 几何结构', '<div style="font-size:12px;line-height:1.9;color:#1f2937">引力结构 ⇔ 特殊几何结构<br>能量 / 动力 ⇔ 几何结构</div>', '能量动力几何化，是现代物理主流') },
        { term: '④ 缠论：一切能量动力形态都几何化', text: '缠论本质上，是<b>站在现代物理的角度构建自己的能量动力学结构</b>的。<span class="hl">在缠论里，一切都是几何结构说了算，一切的能量动力形态都几何化了。</span>例如背驰（能量衰竭）体现为前后两段走势几何结构（力度、面积）的对比；中枢（能量聚集/交换）本身也是一个几何结构。必须从"能量/动力"视角切换到"几何结构"视角，才会有真正的理解。', fig: mfig('背驰 = 几何体现', drawZS([{ p: 10, label: '中枢', color: '#2563eb' }, { p: 14, label: '进', color: '#2563eb', above: true }, { p: 12, label: '中枢', color: '#2563eb' }, { p: 16, label: '出', color: '#2563eb', above: true }, { p: 13.5, label: '背驰', color: '#e74c3c', above: true }], [{ lo: 11, hi: 13, x0: 0, x1: 4, label: '中枢' }], { w: 38, h: 96 }), '离开中枢的力度＜进入 = 能量衰竭的几何体现') },
      ]},
      { type: 'mindset', title: '摆脱牛顿时代的机械化思维（第104课）', items: [
        { term: '① 思维的根本改变', text: '有些工科或老一代理科的对现代物理没概念，以为能量动力就像牛顿时代那样，用微积分、级数等机械算法就是了。缠论要求的是<b>思维上的根本改变</b>：把"能量动力"翻译成"几何结构"去看。<span class="hl">否则仍是牛顿时代的弱智思维，就会陷入机械化思维的陷阱中。</span>', fig: mfig('两种思维', '<div style="font-size:12px;line-height:1.9;color:#1f2937">牛顿思维：能量动力 = 微积分/级数<br><span style="color:#b91c1c;font-weight:700">↓ 陷入机械化陷阱</span><br>现代思维：能量动力 = 几何结构</div>', '思维的改变，是理解缠论的钥匙') },
        { term: '② 看走势如看几何结构', text: '一旦有了"几何即物理"的视角，看走势就不再是"找能量、算力度"，而是<b>看几何结构如何展开、如何递归</b>——这与第 81 课"走势是有生命的"、第 35 课"几何化的递归定义"一脉相承。<span class="hl">能量动力结构，只是几何结构在物理语言下的另一种说法。</span>', fig: mfig('能量动力 = 几何结构', '<div style="font-size:12px;line-height:1.9;color:#1f2937">背驰（能量衰竭）<br>⇔ 力度/面积的几何对比<br>中枢（能量交换）⇔ 矩形几何结构</div>', '同一件事的两种语言') },
      ]},
    ],
  });
})();
