/* 第54章 综合实战：三类走势全流程（上涨趋势 / 盘整 / 下跌趋势）
   把前面 53 章的内容串成一条「七步流水线」，三个案例各走一遍，配合动手画 + 决策题 + 区间套透镜。 */
(function () {

  // 全景图：上涨趋势 a+A+b+B+c 的完整标注（分型 + 中枢 + ZG/ZD + 背驰一卖）
  function optPanorama() {
    const pts = [8, 13, 10, 14, 11, 17, 14, 18, 15, 21];
    const mk = (x0, x1, lo, hi, name) => [{ xAxis: x0, yAxis: lo, name }, { xAxis: x1, yAxis: hi }];
    const mp = (i, name, color, pos) => ({ coord: [i, pts[i]], name, symbol: 'circle', symbolSize: 7, itemStyle: { color }, label: { show: true, color, fontSize: 10, position: pos, distance: 4, fontWeight: 'bold' } });
    const pin = (i, name, color, pos) => ({ coord: [i, pts[i]], name, symbol: 'pin', symbolSize: 40, itemStyle: { color }, label: { show: true, formatter: function (p) { return p.name; }, color, fontSize: 10, fontWeight: 'bold', position: pos, distance: 24 } });
    const seg = (x, y, name, color) => ({ coord: [x, y], name, symbol: 'none', label: { show: true, color, fontSize: 12, fontWeight: 'bold', position: 'top' } });
    return {
      tooltip: { trigger: 'axis', axisPointer: { type: 'cross' } },
      grid: { left: 60, right: 90, top: 40, bottom: 30 },
      xAxis: { type: 'value', min: 0, max: 9, interval: 1 },
      yAxis: { type: 'value', scale: true, name: '价格', nameLocation: 'middle', nameGap: 40 },
      series: [{
        name: '走势', type: 'line', data: pts.map((p, i) => [i, p]),
        symbol: 'circle', symbolSize: 4, lineStyle: { width: 2, color: '#1f2937' }, itemStyle: { color: '#1f2937' },
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
            { yAxis: 13, name: 'A·ZG=13' }, { yAxis: 11, name: 'A·ZD=11' },
            { yAxis: 17, name: 'B·ZG=17' }, { yAxis: 15, name: 'B·ZD=15' },
          ],
        },
        markPoint: {
          data: [
            mp(0, '底', '#16a34a', 'bottom'), mp(1, '顶', '#e74c3c', 'top'),
            mp(2, '底', '#16a34a', 'bottom'), mp(3, '顶', '#e74c3c', 'top'),
            mp(4, '底', '#16a34a', 'bottom'), mp(5, '顶', '#e74c3c', 'top'),
            mp(6, '底', '#16a34a', 'bottom'), mp(7, '顶', '#e74c3c', 'top'),
            mp(8, '底', '#16a34a', 'bottom'),
            pin(9, '一卖（背驰）', '#e74c3c', 'top'),
            seg(0.5, 9.8, 'a', '#1f2937', 'bottom'), seg(2.5, 12.6, 'A', '#2563eb', 'top'),
            seg(4.5, 14.8, 'b', '#1f2937', 'top'), seg(6.5, 16.2, 'B', '#2563eb', 'top'),
            seg(8.5, 19.5, 'c', '#e74c3c', 'top'),
          ],
        },
      }, backchiEffect([[9, 21]], '#e74c3c', 'c 段创新高 21 但 MACD 红柱面积小于 b 段 → 趋势背驰 → 一卖，其后至少回拉中枢 B [15,17]')],
    };
  }

  // 背驰量化：b 段 vs c 段 MACD 红柱面积柱状对比
  function optBackchiQuant() {
    return {
      title: { text: '背驰量化：b 段 vs c 段 MACD 红柱面积', left: 'center', top: 6, textStyle: { fontSize: 13, fontWeight: 'bold' } },
      tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
      grid: { left: 60, right: 40, top: 50, bottom: 40 },
      xAxis: { type: 'category', data: ['b 段红柱面积', 'c 段红柱面积'], axisLabel: { fontSize: 12 } },
      yAxis: { type: 'value', name: '面积（相对值）', max: 7 },
      series: [{
        type: 'bar', barWidth: '45%',
        data: [
          { value: 6.0, itemStyle: { color: '#e74c3c' } },
          { value: 1.8, itemStyle: { color: '#f59e0b' } },
        ],
        label: { show: true, position: 'top', formatter: '{c}', fontSize: 15, fontWeight: 'bold' },
      }],
    };
  }

  // 三类走势类型一览
  const figThreeTypes = `
<div class="fig" style="min-width:340px"><div class="lbl">三类走势类型一览（同一套规则）</div>
<div style="display:flex;gap:12px;align-items:flex-start;flex-wrap:wrap">
  <div>${drawZS([{p:8,tag:'底'},{p:13,tag:'顶'},{p:10,tag:'底'},{p:14,tag:'顶'},{p:11,tag:'底'},{p:17,tag:'顶'},{p:14,tag:'底'},{p:18,tag:'顶'},{p:15,tag:'底'},{p:21,tag:'顶',label:'一卖',color:'#e74c3c',above:true}], [{lo:11,hi:13,x0:1,x1:4,label:'中枢A'},{lo:15,hi:17,x0:5,x1:8,label:'中枢B'}], {w:30,h:120,zgzd:true})}<div class="cap">上涨趋势<br>2中枢 · 背驰 → 一卖</div></div>
  <div>${drawZS([{p:8,tag:'底'},{p:13,tag:'顶'},{p:10,tag:'底'},{p:14,tag:'顶'},{p:11,tag:'底'},{p:16,tag:'顶'},{p:14,label:'三买',color:'#9333ea'}], [{lo:11,hi:13,x0:1,x1:4,label:'中枢'}], {w:30,h:120,zgzd:true})}<div class="cap">盘整<br>1中枢 · 破后回试不破 → 三买</div></div>
  <div>${drawZS([{p:20,tag:'顶'},{p:15,tag:'底'},{p:18,tag:'顶'},{p:14,tag:'底'},{p:17,tag:'顶'},{p:11,tag:'底'},{p:14,tag:'顶'},{p:10,tag:'底'},{p:13,tag:'顶'},{p:8,tag:'底',label:'一买',color:'#16a34a'}], [{lo:15,hi:17,x0:1,x1:4,label:'中枢A'},{lo:11,hi:13,x0:5,x1:8,label:'中枢B'}], {w:30,h:120,zgzd:true})}<div class="cap">下跌趋势<br>2中枢 · 背驰 → 一买</div></div>
</div>
<div class="cap">三种走势类型（盘整 / 上涨 / 下跌）都服从同一套规则：<b>中枢个数定类型，背驰定买卖点</b>。</div></div>`;

  __chapters.push({
    id: 'ch54', vol: '卷十一 · 综合实战', title: '第54章 综合实战：三类走势全流程', source: '原文第17、18、20、24、29、62、65课（综合）',
    figures: [
      { kind: 'echarts', title: '全景：一段上涨趋势的完整标注', note: '把<b>分型（顶/底）→ 笔 → 线段 → 两个中枢（A、B 及其 ZG/ZD）→ 背驰 → 一卖</b>全部标在同一张图上。c 段创新高 21，但力度弱（见下图），在 21 处构成<b>第一类卖点</b>。这就是一条从 K 线到买卖点的完整流水线。', option: optPanorama },
      { kind: 'echarts', title: '背驰量化：动能衰减', note: '背驰的本质是「<b>动能衰减</b>」：价格创新高（21＞17），但推动上涨的 MACD 红柱面积，c 段（1.8）<b>远小于</b> b 段（6.0）。面积越小、动能越弱，一旦 <b>c 段面积 < b 段</b>，就是趋势背驰。', option: optBackchiQuant },
      { kind: 'html', title: '三类走势类型一览', note: '<b>盘整</b>只有一个中枢，<b>上涨 / 下跌趋势</b>有两个依次同向的中枢。判定买卖点：趋势背驰出一类买卖点，盘整背驰后回试不破 ZG 出第三类买卖点。', html: figThreeTypes },
    ],
    sections: [
      { type: 'definition', title: '完整分析流程（七步）', items: [
        { term: '① 总流程：从 K 线到买卖点',
          plain: plainHTML('拿到任何一张图，按固定七步走：原始 K 线 → 包含处理 → 分型 → 笔 → 线段 → 中枢 → 走势类型 + 背驰 → 买卖点。每一步都是上一步的「压缩 / 抽象」。'),
          flow: flowHTML([
            { title: '① 原始 K 线 → 包含处理', lines: ['相邻 K 线有包含关系就合并，得到「无包含」的干净 K 线'], tone: 'blue' },
            { title: '② 分型', lines: ['三根 K 线：中间最高 = 顶分型，中间最低 = 底分型'], tone: 'blue' },
            { title: '③ 笔', lines: ['相邻顶分型与底分型相连（中间隔 ≥1 根独立 K 线）'], tone: 'blue' },
            { title: '④ 线段', lines: ['至少三笔；被反向线段破坏才算结束'], tone: 'blue' },
            { title: '⑤ 中枢', lines: ['连续三段重叠区间：ZG = 最高低点，ZD = 最低高点'], tone: 'blue' },
            { title: '⑥ 走势类型', lines: ['盘整 = 1 个中枢；趋势 = ≥2 个同向中枢'], tone: 'amber' },
            { title: '⑦ 背驰 → 买卖点', lines: ['MACD 面积对比定力度；区间套定位买卖点'], tone: 'green' },
          ]),
          text: '任何一段走势，都可用这七步从最原始的 K 线一路「压缩」到买卖点。前五步是<b>形态学</b>（结构），后两步是<b>动力学 + 操作</b>（力度 + 买卖）。下面三个案例，就是把这七步在<b>上涨趋势、盘整、下跌趋势</b>上各完整走一遍。',
          fig: mfig('七步全景', drawZS([{p:8,tag:'底'},{p:13,tag:'顶'},{p:10,tag:'底'},{p:14,tag:'顶'},{p:11,tag:'底'},{p:17,tag:'顶'},{p:14,tag:'底'},{p:18,tag:'顶'},{p:15,tag:'底'},{p:21,tag:'顶',label:'一卖',color:'#e74c3c',above:true}], [{lo:11,hi:13,x0:1,x1:4,label:'中枢A'},{lo:15,hi:17,x0:5,x1:8,label:'中枢B'}], {w:28,h:100}), '上涨趋势：分型(顶/底) → 笔 → 线段 → 2中枢 → 背驰 → 一卖'),
        },
      ]},
      { type: 'definition', title: '案例一：上涨趋势（趋势背驰 → 一卖）', items: [
        { term: '① 走势概览：a+A+b+B+c', plain: plainHTML('一段上涨趋势 = 连接段 a + 中枢 A + 连接段 b + 中枢 B + 连接段 c，两个中枢依次抬高，c 段创新高。'), text: '上涨趋势的最一般结构是 <code>a+A+b+B+c</code>：A、B 两个同向中枢，a、b、c 是连接段。图中：底 8 → 顶 13（a 段）→ 中枢 A [11,13] → 顶 17（b 段）→ 中枢 B [15,17] → 顶 21（c 段，创新高）。', fig: mfig('a+A+b+B+c', drawZS([{p:8,tag:'底'},{p:13,tag:'顶'},{p:10,tag:'底'},{p:14,tag:'顶'},{p:11,tag:'底'},{p:17,tag:'顶'},{p:14,tag:'底'},{p:18,tag:'顶'},{p:15,tag:'底'},{p:21,tag:'顶',label:'一卖',color:'#e74c3c',above:true}], [{lo:11,hi:13,x0:1,x1:4,label:'A'},{lo:15,hi:17,x0:5,x1:8,label:'B'}], {w:26,h:100,zgzd:true}), 'a+A+b+B+c：两个同向中枢'),
        },
        { term: '② 动手练：连出所有笔', text: '每个转折点都是笔端点。按「底→顶→底→顶…」顺序点击节点，把 a+A+b+B+c 依次连成 9 笔（红色=向上笔、绿色=向下笔）。点错再点一下可取消。', draw: drawHTML({
          kind: 'link', title: '动手连笔', intro: '按「底→顶→底…」依次点击折线节点连成 9 笔，再点已选节点可取消。',
          pts: [{ p: 8, tag: '底' }, { p: 13, tag: '顶' }, { p: 10, tag: '底' }, { p: 14, tag: '顶' }, { p: 11, tag: '底' }, { p: 17, tag: '顶' }, { p: 14, tag: '底' }, { p: 18, tag: '顶' }, { p: 15, tag: '底' }, { p: 21, tag: '顶' }],
          answer: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
        }) },
        { term: '③ 动手练：标出两个中枢的 ZG/ZD', text: '中枢 A 区间是 [11,13]（ZG=13、ZD=11），中枢 B 区间是 [15,17]（ZG=17、ZD=15）。点击对应转折点，标出 ZG 与 ZD（点一下标 ZG、再点标 ZD、再点取消）。', draw: drawHTML({
          kind: 'line', marks: ['ZG', 'ZD'], title: '标 ZG/ZD', intro: '在对应点标出两个中枢的 ZG 与 ZD（ZG=中枢高点、ZD=中枢低点）。',
          pts: [{ p: 8, tag: '底' }, { p: 13, tag: '顶' }, { p: 10, tag: '底' }, { p: 14, tag: '顶' }, { p: 11, tag: '底' }, { p: 17, tag: '顶' }, { p: 14, tag: '底' }, { p: 18, tag: '顶' }, { p: 15, tag: '底' }, { p: 21, tag: '顶' }],
          zones: [{ lo: 11, hi: 13, x0: 1, x1: 4, label: '中枢A' }, { lo: 15, hi: 17, x0: 5, x1: 8, label: '中枢B' }],
          answer: { 1: 'ZG', 4: 'ZD', 5: 'ZG', 8: 'ZD' },
        }) },
        { term: '④ 动手练：标出一卖', text: 'c 段创新高到 21，但 MACD 红柱面积小于 b 段 → 趋势背驰，21 处即<b>第一类卖点</b>。标出它。', draw: drawHTML({
          kind: 'line', marks: ['一卖'], title: '标一卖', intro: '找出背驰点（第一类卖点）并标出。',
          pts: [{ p: 8, tag: '底' }, { p: 13, tag: '顶' }, { p: 10, tag: '底' }, { p: 14, tag: '顶' }, { p: 11, tag: '底' }, { p: 17, tag: '顶' }, { p: 14, tag: '底' }, { p: 18, tag: '顶' }, { p: 15, tag: '底' }, { p: 21, tag: '顶' }],
          zones: [{ lo: 11, hi: 13, x0: 1, x1: 4, label: '中枢A' }, { lo: 15, hi: 17, x0: 5, x1: 8, label: '中枢B' }],
          answer: { 9: '一卖' },
        }) },
      ]},
      { type: 'definition', title: '案例二：盘整（盘整背驰 → 三买）', items: [
        { term: '① 走势概览：一个中枢的盘整', plain: plainHTML('只有一个中枢、上下震荡，就是盘整。盘整里也有背驰（盘整背驰）：C 段破中枢后力度弱，回试不破 ZG，就是第三类买点。'), text: '盘整 = 只有一个中枢。图中：底 8 → 顶 13 → 中枢 [11,13] 震荡 → 顶 16（C 段上破中枢但力度弱）→ 回跌到 14 <b>不破中枢 ZG=13</b> → 构成<b>第三类买点</b>。', fig: mfig('盘整 + 三买', drawZS([{p:8,tag:'底'},{p:13,tag:'顶'},{p:10,tag:'底'},{p:14,tag:'顶'},{p:11,tag:'底',label:'C段起点',color:'#16a34a'},{p:16,tag:'顶',label:'C段顶',color:'#e74c3c',above:true},{p:14,label:'三买',color:'#9333ea'}], [{lo:11,hi:13,x0:1,x1:4,label:'中枢[11,13]'}], {w:34,h:110,zgzd:true}), 'C 段破中枢后回试不破 ZG=13 → 三买'),
        },
        { term: '② 动手练：标出三买', text: 'C 段（11→16）上破中枢 [11,13] 后，回跌到 14 没有跌回中枢（14 > ZG=13），这个回试低点 14 就是<b>第三类买点</b>。标出它。', draw: drawHTML({
          kind: 'line', marks: ['三买'], title: '标三买', intro: '找出离开中枢后回试不破 ZG 的那个点（第三类买点）。',
          pts: [{ p: 8, tag: '底' }, { p: 13, tag: '顶' }, { p: 10, tag: '底' }, { p: 14, tag: '顶' }, { p: 11, tag: '底' }, { p: 16, tag: '顶' }, { p: 14, tag: '底' }],
          zones: [{ lo: 11, hi: 13, x0: 1, x1: 4, label: '中枢[11,13]' }],
          answer: { 6: '三买' },
        }) },
      ]},
      { type: 'definition', title: '案例三：下跌趋势（趋势背驰 → 一买）', items: [
        { term: '① 走势概览：下跌 a+A+b+B+c', plain: plainHTML('下跌趋势就是上涨趋势反过来：两个同向中枢依次下移，c 段创新低但力度弱 → 背驰 → 第一类买点。'), text: '下跌趋势同样 <code>a+A+b+B+c</code>：顶 20 → 底 15（a 段）→ 中枢 A [15,17] → 底 11（b 段）→ 中枢 B [11,13] → 底 8（c 段，创新低）。c 段创新低但 MACD 绿柱面积小于 b 段 → <b>趋势背驰</b>，8 处即<b>第一类买点</b>。', fig: mfig('下跌趋势 + 一买', drawZS([{p:20,tag:'顶'},{p:15,tag:'底'},{p:18,tag:'顶'},{p:14,tag:'底'},{p:17,tag:'顶'},{p:11,tag:'底'},{p:14,tag:'顶'},{p:10,tag:'底'},{p:13,tag:'顶',label:'c段起点',color:'#16a34a'},{p:8,tag:'底',label:'一买',color:'#16a34a'}], [{lo:15,hi:17,x0:1,x1:4,label:'中枢A'},{lo:11,hi:13,x0:5,x1:8,label:'中枢B'}], {w:26,h:110,zgzd:true}), 'c 段创新低 8 但力度弱 → 背驰 → 一买'),
        },
        { term: '② 动手练：标出一买', text: '下跌趋势里，c 段（13→8）创新低，但 MACD 绿柱面积小于 b 段 → 趋势背驰，8 处即<b>第一类买点</b>。标出它。', draw: drawHTML({
          kind: 'line', marks: ['一买'], title: '标一买', intro: '找出下跌趋势的背驰点（第一类买点）。',
          pts: [{ p: 20, tag: '顶' }, { p: 15, tag: '底' }, { p: 18, tag: '顶' }, { p: 14, tag: '底' }, { p: 17, tag: '顶' }, { p: 11, tag: '底' }, { p: 14, tag: '顶' }, { p: 10, tag: '底' }, { p: 13, tag: '顶' }, { p: 8, tag: '底' }],
          zones: [{ lo: 15, hi: 17, x0: 1, x1: 4, label: '中枢A' }, { lo: 11, hi: 13, x0: 5, x1: 8, label: '中枢B' }],
          answer: { 9: '一买' },
        }) },
      ]},
      { type: 'motivation', title: '综合实战的意义', text: '前面 53 章把缠论的每个零件都讲清楚了：K 线、分型、笔、线段、中枢、走势类型、背驰、买卖点。本章用<b>三个真实走势案例</b>把这些零件<b>串成一条可操作的流水线</b>。记住这条流水线，拿到任何一张图，你都能按「七步」机械地拆解它——这就是缠论「机械化操作」的落地。' },
      { type: 'pitfalls', title: '综合易错点', items: [
        '步骤颠倒：不从<b> K 线包含</b>开始，直接跳去数笔 / 找中枢（错：包含处理是地基，先做干净 K 线）。',
        '中枢区间算错：ZG 是<b>三段重叠的最高低点</b>、ZD 是<b>最低高点</b>，别把最高点 / 最低点当成 ZG / ZD。',
        '混淆趋势背驰与盘整背驰：<b>两个中枢</b>叫趋势背驰（回拉最后中枢），<b>一个中枢</b>叫盘整背驰（回试不破 ZG 才是三买）。',
        '以为背驰后一定大涨 / 大跌（错：三种转折里「级别扩展」只是最弱反弹，走势可能仍在延续）。',
        '只在一个级别下结论（错：背驰要配合<b>区间套</b>到次级别精确定位买卖点）。',
      ]},
      { type: 'exercises', title: '综合自测', items: [
        { q: '把「一张 K 线图 → 买卖点」的完整分析流程用七步串起来。', a: '① 包含处理 → ② 分型 → ③ 笔 → ④ 线段 → ⑤ 中枢（ZG/ZD）→ ⑥ 走势类型（盘整=1中枢 / 趋势=≥2中枢）→ ⑦ 背驰（MACD 面积对比）→ 买卖点（区间套定位）。' },
        { q: '上涨趋势 a+A+b+B+c 里，c 段创新高但 MACD 面积小于 b 段，构成什么？其后至少回哪里？', a: '<b>趋势背驰</b>（两个同向中枢 + 黄白线回拉 0 轴 + c 段面积 < b 段），c 顶是<b>第一类卖点</b>，其后回跌<b>至少回到中枢 B</b>。' },
        { q: '盘整（一个中枢）里，C 段上破中枢后回跌不破 ZG，形成什么？', a: '<b>第三类买点</b>。这是盘整背驰的一种：C 段力度弱（面积小），回试不跌回中枢，就在次级别第一类买点回补。' },
      ]},
    ],
  });
})();
