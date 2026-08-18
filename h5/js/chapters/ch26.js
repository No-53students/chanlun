/* 第15章 中阴阶段 */
(function () {

  function optCh15() {
    const pts = [22, 18, 20, 16, 14, 16, 12, 15, 13, 15.5, 12.5, 9];
    const zones = [
      { x0: 1, x1: 3, lo: 16, hi: 20, label: '前走势中枢A [16,20]（业力）' },
      { x0: 7, x1: 10, lo: 13, hi: 15.5, label: '中阴震荡中枢 [13,15.5]' },
    ];
    const markAreaData = zones.map(z => [{ xAxis: z.x0, yAxis: z.lo, name: z.label }, { xAxis: z.x1, yAxis: z.hi }]);
    const mp = (i, name, color, pos) => ({ coord: [i, pts[i]], name, symbol: 'circle', symbolSize: 9, itemStyle: { color }, label: { show: true, color, fontSize: 10, position: pos, distance: 6, fontWeight: 'bold' } });
    const pin = (i, name, color) => ({ coord: [i, pts[i]], name, symbol: 'pin', symbolSize: 42, itemStyle: { color }, label: { show: true, formatter: function (p) { return p.name; }, color, fontSize: 10, fontWeight: 'bold' } });
    const seg = (x, y, name, color) => ({ coord: [x, y], name, symbol: 'none', label: { show: true, color, fontSize: 12, fontWeight: 'bold', position: 'top' } });
    const markPointData = [
      mp(0, '顶·前走势高点', '#e74c3c', 'top'),
      mp(2, '顶', '#e74c3c', 'top'),
      mp(9, '顶·194', '#e74c3c', 'top'),
      mp(11, '底·195破位新低', '#16a34a', 'bottom'),
      pin(6, '191 背驰点（一类买点）', '#16a34a'),
      pin(8, '193 第二类卖点', '#2563eb'),
      pin(10, '195 第三类卖点（中阴结束）', '#9333ea'),
      seg(4.5, 20.8, '前走势（下跌）→ 背驰死亡', '#e74c3c'),
      seg(8.5, 17.5, '中阴阶段（盘整震荡）', '#f59e0b'),
    ];
    const markLineData = [
      { yAxis: 20, name: '中枢A ZG=20' },
      { yAxis: 16, name: '中枢A ZD=16' },
      { yAxis: 15.5, name: '中阴 ZG=15.5' },
      { yAxis: 13, name: '中阴 ZD=13' },
    ];
    return {
      tooltip: { trigger: 'axis', axisPointer: { type: 'cross' } },
      grid: { left: 60, right: 70, top: 40, bottom: 40 },
      xAxis: { type: 'value', min: 0, max: 11, interval: 1 },
      yAxis: { type: 'value', scale: true, name: '价格' },
      series: [{
        name: '走势', type: 'line', data: pts.map((p, i) => [i, p]),
        symbol: 'circle', symbolSize: 5, lineStyle: { width: 2, color: '#1f2937' }, itemStyle: { color: '#1f2937' },
        markArea: {
          silent: true, itemStyle: { color: 'rgba(37,99,235,0.10)' },
          label: { show: true, position: 'insideTop', formatter: function (p) { return p.name || ''; }, color: '#2563eb', fontSize: 11 },
          data: markAreaData,
        },
        markLine: {
          silent: true, symbol: 'none',
          lineStyle: { color: '#2563eb', type: 'dashed', width: 1 },
          label: { show: true, position: 'end', formatter: function (p) { return p.name || ''; }, color: '#2563eb', fontSize: 10 },
          data: markLineData,
        },
        markPoint: { data: markPointData },
      }],
    };
  }

  const figChain = `
<div class="fig" style="min-width:300px"><div class="lbl">中阴阶段的 100% 逻辑链（第89课）</div>
<div style="display:flex;flex-direction:column;align-items:center;gap:3px;font-size:13px">
<span style="background:#fecaca;color:#991b1b;padding:5px 14px;border-radius:6px"><b>①</b> 1 分钟下跌背驰 → 进入中阴（前走势死亡）</span>
<span style="color:#6b7280">↓ <b>100% 必然</b></span>
<span style="background:#bfdbfe;color:#1e3a8a;padding:5px 14px;border-radius:6px"><b>②</b> 必先出现 5 分钟中枢</span>
<span style="color:#6b7280">↓ 100% 必然（中枢成立后，两条路径）</span>
<span style="background:#fef3c7;color:#92400e;padding:5px 14px;border-radius:6px"><b>③a</b> 延伸 → 30分钟中枢 → 30分钟第三类买卖点</span>
<span style="color:#6b7280">或</span>
<span style="background:#dcfce7;color:#166534;padding:5px 14px;border-radius:6px"><b>③b</b> 第三类买卖点 → 5分钟走势类型（盘整1中枢 / 趋势2中枢）</span>
</div>
<div class="cap">背驰死亡（①）→ 100% 先出 5 分钟中枢（②）→ 再 100% 以“延伸”或“第三类买卖点”结束（③a/③b）</div></div>`;

  // ---- 讲解点小图 ----

  // ① 延续与转折：生和死
  const figLife = mfig('延续 vs 转折（生与死）',
    drawZS([{ p: 10, label: '生', color: '#16a34a' }, { p: 16, label: '延续', color: '#e74c3c', above: true }, { p: 13 }, { p: 19, label: '死(背驰)', color: '#e74c3c', above: true }, { p: 14, label: '新生(转折)', color: '#16a34a' }],
      [], { w: 40, h: 100 }),
    '走势确立=前走势死；背驰死亡后开启新生');

  // ② 什么是中阴阶段
  const figMidYinDef = mfig('中阴：死亡与新确立之间',
    drawZS([{ p: 10, label: '前走势', color: '#e74c3c' }, { p: 18, label: '背驰(死)', color: '#e74c3c', above: true }, { p: 15, label: '中阴', color: '#f59e0b' }, { p: 16, label: '中阴', color: '#f59e0b', above: true }, { p: 14, label: '新走势确立', color: '#16a34a' }],
      [{ lo: 14, hi: 16, x0: 2, x1: 4, label: '中阴震荡' }], { w: 40, h: 104 }),
    '前走势背驰死亡后 → 中阴震荡 → 新走势确立');

  // ③ 必须结合“前走势的业力”分析
  const figKarma = mfig('结合前走势业力（前中枢）',
    drawZS([{ p: 10 }, { p: 16 }, { p: 12 }, { p: 15, label: '前中枢(业力)', color: '#2563eb', above: true }, { p: 13, label: '中阴', color: '#f59e0b' }, { p: 14, label: '中阴', color: '#f59e0b', above: true }, { p: 12 }],
      [{ lo: 12, hi: 15, x0: 0, x1: 3, label: '前走势中枢' }, { lo: 12, hi: 14, x0: 3, x1: 6, label: '中阴震荡' }], { w: 38, h: 104 }),
    '中阴必须借助前走势中枢（业力）来分析');

  // ④ 中阴无一例外表现为盘整
  const figPanYin = mfig('中阴无一例外 = 盘整',
    drawZS([{ p: 10 }, { p: 15, label: '中阴', color: '#f59e0b', above: true }, { p: 11, label: '中阴', color: '#f59e0b' }, { p: 14, label: '中阴', color: '#f59e0b', above: true }, { p: 12, label: '中阴', color: '#f59e0b' }, { p: 13 }],
      [{ lo: 11, hi: 14, x0: 0, x1: 5, label: '盘整中枢(中阴)' }], { w: 38, h: 100 }),
    '中阴阶段无一例外表现为围绕前走势的盘整震荡');

  // ⑤ 中阴结束不一定是反转
  const figNotReversal = mfig('中阴结束 ≠ 反转',
    drawZS([{ p: 10, label: '上涨', color: '#e74c3c' }, { p: 16, label: '上涨', color: '#e74c3c', above: true }, { p: 12, label: '中阴(盘整)', color: '#f59e0b' }, { p: 15, label: '中阴', color: '#f59e0b', above: true }, { p: 13, label: '继续上涨', color: '#e74c3c' }, { p: 19, label: '顶', color: '#e74c3c', above: true }],
      [{ lo: 12, hi: 15, x0: 1, x1: 4, label: '中阴盘整' }], { w: 38, h: 100 }),
    '中阴后可能延续原方向：上涨+盘整+上涨');

  // ⑥ 标号体系
  const figLabelSys = mfig('标号体系：多层次看走势',
    drawZS([{ p: 10, label: 'Y1(1分)', color: '#16a34a' }, { p: 16, label: 'W1(5分)', color: '#e74c3c', above: true }, { p: 12, label: 'Y2(1分)', color: '#16a34a' }, { p: 20, label: 'S1(30分)=最牛点', color: '#9333ea', above: true }, { p: 15 }],
      [], { w: 40, h: 108 }),
    'Xn线→Yn1分→Wn5分→Sn30分→…→Nn年，逐级标号');

  // ⑦ 中阴 ≠ 一般中枢震荡
  const figNotOrdinary = mfig('中阴 ≠ 一般中枢震荡',
    '<div style="display:flex;gap:14px;align-items:flex-end">'
    + drawZS([{ p: 10 }, { p: 14 }, { p: 11 }, { p: 13 }], [{ lo: 11, hi: 13, x0: 0, x1: 3, label: '一般震荡' }], { w: 34, h: 84 })
    + drawZS([{ p: 10 }, { p: 15, label: '中阴', color: '#f59e0b', above: true }, { p: 11 }, { p: 14, label: '关键节奏', color: '#e74c3c', above: true }], [{ lo: 11, hi: 14, x0: 0, x1: 3, label: '中阴' }], { w: 34, h: 84 })
    + '</div>',
    '左：一般震荡；右：中阴——关系到操作节奏的连接');

  // ⑧ 100% 成立的结论
  const figHundredPct = mfig('100%：背驰后必先 5 分钟中枢',
    drawZS([{ p: 22, label: '前走势', color: '#e74c3c', above: true }, { p: 16, label: '1分背驰(低点)', color: '#16a34a' }, { p: 20, label: '超1分走势', color: '#e74c3c', above: true }, { p: 17, label: '中枢', color: '#2563eb' }, { p: 21, label: '中枢', color: '#2563eb', above: true }, { p: 18 }],
      [{ lo: 17, hi: 21, x0: 2, x1: 5, label: '5分钟中枢(100%)' }], { w: 38, h: 104 }),
    '1分钟背驰 → 必有超1分钟走势 → 必先现5分钟中枢');

  // ⑨ 先处理好 5 分钟中枢
  const figHandle5min = mfig('先处理好 5 分钟中枢',
    drawZS([{ p: 14 }, { p: 16, label: '中枢', color: '#2563eb', above: true }, { p: 13, label: '震荡操作', color: '#f59e0b' }, { p: 15, label: '震荡操作', color: '#f59e0b', above: true }, { p: 12, label: '震荡操作', color: '#f59e0b' }, { p: 14 }],
      [{ lo: 13, hi: 15, x0: 0, x1: 5, label: '5分钟中枢' }], { w: 36, h: 96 }),
    '唯一重要的事：先把 5 分钟中枢震荡处理好');

  // ⑩ 中枢成立后：延伸或第三买卖点
  const figExtendOrBS3 = mfig('中枢后：延伸 或 第三买卖点',
    '<div style="display:flex;gap:14px;align-items:flex-end">'
    + drawZS([{ p: 10 }, { p: 14 }, { p: 11 }, { p: 13 }, { p: 12 }, { p: 13.5 }], [{ lo: 11, hi: 13, x0: 0, x1: 5, label: '延伸' }], { w: 32, h: 86 })
    + drawZS([{ p: 10 }, { p: 14 }, { p: 11 }, { p: 13 }, { p: 16, label: '3买', color: '#16a34a', above: true }], [{ lo: 11, hi: 13, x0: 0, x1: 3, label: '中枢' }], { w: 32, h: 86 })
    + '</div>',
    '左：延伸成更大级别；右：第三买卖点结束震荡');

  // ⑪ 第三买卖点后：盘整还是趋势
  const figPanOrTrend = mfig('3买后：盘整 or 趋势',
    '<div style="display:flex;gap:14px;align-items:flex-end">'
    + drawZS([{ p: 10 }, { p: 15 }, { p: 12 }, { p: 14 }], [{ lo: 12, hi: 14, x0: 0, x1: 3, label: '盘整(1中枢)' }], { w: 32, h: 84 })
    + drawZS([{ p: 10 }, { p: 14 }, { p: 11 }, { p: 13 }, { p: 18 }, { p: 21 }, { p: 17 }], [{ lo: 11, hi: 13, x0: 0, x1: 3, label: '中枢1' }, { lo: 18, hi: 21, x0: 4, x1: 6, label: '中枢2' }], { w: 32, h: 84 })
    + '</div>',
    '1 个中枢=盘整；2 个中枢=趋势，用背驰力度判断');

  // ⑫ 盘整 ≠ 中枢 ≠ 区间震荡
  const figAppleTree = mfig('盘整 ≠ 区间震荡',
    drawZS([{ p: 20, label: '10000', color: '#e74c3c', above: true }, { p: 15 }, { p: 17, label: '唯一中枢', color: '#2563eb', above: true }, { p: 10, label: '→0 仍是盘整', color: '#16a34a' }, { p: 6 }],
      [{ lo: 15, hi: 17, x0: 1, x1: 3, label: '唯一中枢' }], { w: 40, h: 108 }),
    '10000 跌到 0，只有一个中枢 = 盘整（中枢=苹果）');

  // ⑬ 布林通道（BOLL）
  const figBOLL = mfig('布林通道：上/中/下轨',
    '<svg viewBox="0 0 210 96" width="210" height="96" style="display:block">'
    + '<line x1="0" y1="20" x2="210" y2="20" stroke="#e74c3c" stroke-dasharray="4 3"/><text x="2" y="16" font-size="9" fill="#e74c3c">上轨</text>'
    + '<line x1="0" y1="48" x2="210" y2="48" stroke="#9ca3af" stroke-dasharray="4 3"/><text x="2" y="44" font-size="9" fill="#6b7280">中轨</text>'
    + '<line x1="0" y1="76" x2="210" y2="76" stroke="#16a34a" stroke-dasharray="4 3"/><text x="2" y="92" font-size="9" fill="#16a34a">下轨</text>'
    + '<polyline points="12,46 42,8 72,44 102,58 132,40 162,12 192,50" fill="none" stroke="#1f2937" stroke-width="2"/>'
    + '<text x="42" y="4" font-size="9" fill="#e74c3c" text-anchor="middle">超强(上轨上)</text>'
    + '</svg>',
    '上轨以上/下轨以下=超强状态（中枢移动时出现）');

  // ⑭ 辅助判断第一类买卖点
  const figBS1 = mfig('布林辅助：第一类买卖点',
    '<svg viewBox="0 0 210 96" width="210" height="96" style="display:block">'
    + '<line x1="0" y1="22" x2="210" y2="22" stroke="#e74c3c" stroke-dasharray="4 3"/><text x="2" y="18" font-size="9" fill="#e74c3c">上轨</text>'
    + '<line x1="0" y1="74" x2="210" y2="74" stroke="#16a34a" stroke-dasharray="4 3"/><text x="2" y="90" font-size="9" fill="#16a34a">下轨</text>'
    + '<polyline points="12,40 40,6 70,32 100,12 130,58 160,26 190,48" fill="none" stroke="#1f2937" stroke-width="2"/>'
    + '<text x="100" y="8" font-size="9" fill="#e74c3c" text-anchor="middle">创新高回不了超强=1卖</text>'
    + '</svg>',
    '创新高却不能有效回超强区 → 第一类买卖点');

  // ⑮ 更有效：辅助判断第二类买卖点
  const figBS2 = mfig('布林辅助：第二类买卖点',
    '<svg viewBox="0 0 210 96" width="210" height="96" style="display:block">'
    + '<line x1="0" y1="26" x2="210" y2="26" stroke="#e74c3c" stroke-dasharray="4 3"/><text x="2" y="22" font-size="9" fill="#e74c3c">上轨(阻力)</text>'
    + '<line x1="0" y1="72" x2="210" y2="72" stroke="#16a34a" stroke-dasharray="4 3"/><text x="2" y="88" font-size="9" fill="#16a34a">下轨</text>'
    + '<polyline points="12,20 44,50 76,34 108,52 140,22 172,44 200,30" fill="none" stroke="#1f2937" stroke-width="2"/>'
    + '<text x="140" y="16" font-size="9" fill="#e74c3c" text-anchor="middle">2卖(轨道下)</text>'
    + '</svg>',
    '滞后转向后，上/下轨成最大阻力支持 → 二类买卖点');

  // ⑯ 最有用的：布林通道收口
  const figBollClose = mfig('布林收口：中阴结束的提示',
    '<svg viewBox="0 0 210 96" width="210" height="96" style="display:block">'
    + '<line x1="0" y1="10" x2="210" y2="42" stroke="#e74c3c" stroke-dasharray="4 3"/>'
    + '<line x1="0" y1="86" x2="210" y2="54" stroke="#16a34a" stroke-dasharray="4 3"/>'
    + '<polyline points="12,52 50,40 88,50 126,44 164,48 200,44" fill="none" stroke="#1f2937" stroke-width="2"/>'
    + '<text x="200" y="34" font-size="9" fill="#e74c3c" text-anchor="end">上轨收</text>'
    + '<text x="200" y="66" font-size="9" fill="#16a34a" text-anchor="end">下轨收</text>'
    + '<text x="105" y="84" font-size="9" fill="#9333ea" text-anchor="middle">收口→3买卖点</text>'
    + '</svg>',
    '布林收口 → 低级别中阴扩展/结束 → 第三类买卖点');

  // ⑰ 级别对应与技巧性
  const figLevelMatch = mfig('级别对应：5分中阴看 30 分布林',
    '<div style="display:flex;gap:12px;align-items:flex-end">'
    + drawZS([{ p: 10, label: '5分钟中阴', color: '#f59e0b' }, { p: 13 }, { p: 11 }, { p: 12 }], [{ lo: 11, hi: 12, x0: 0, x1: 3, label: '5分钟' }], { w: 34, h: 84 })
    + '<div style="font-size:16px;color:#6b7280;padding-bottom:8px">→</div>'
    + drawZS([{ p: 10, label: '30分钟布林', color: '#2563eb' }, { p: 16 }, { p: 12 }, { p: 15 }], [{ lo: 12, hi: 15, x0: 0, x1: 3, label: '30分钟' }], { w: 34, h: 84 })
    + '</div>',
    '5 分钟的中阴，要看 30 分钟的布林（级别对应）');

  __chapters.push({
    id: 'ch26', vol: '卷六 · 中阴与表里', title: '第26章 中阴阶段', source: '原文第88、89、90课',
    figures: [
      { kind: 'echarts', title: '中阴阶段：191 背驰 → 震荡 → 195 破位', note: '下跌在 <b>191 背驰</b>（一类买点，前走势死亡）后，进入<b>中阴</b>：192、193、194 围绕前走势中枢 A 震荡——所以 <b>193 的二卖、195 的三卖都要借助前中枢来分析</b>。直到 <b>195 第三类卖点</b>跌破震荡区间，中阴才结束、新下跌走势确立。第88课：<b>195 是中阴与“新走势确立”的分界点</b>。', option: optCh15 },
      { kind: 'html', title: '中阴的 100% 必然归宿', note: '第89课：1 分钟下跌背驰后，其后<b>必是超 1 分钟级别走势</b>，而超 1 分钟级别走势<b>必先出现一个 5 分钟中枢</b>——这个结论 100% 成立。于是操作被简化为：<b>先处理好 5 分钟中枢</b>，再面对“延伸成更大级别”或“第三买卖点”两条必然路径。', html: figChain },
    ],
    sections: [
      { type: 'definition', title: '中阴阶段的定义（第88课）', items: [
        { term: '① 延续与转折：生和死', text: '所有走势分解，本质上只有两类——<b>延续与转折</b>，用残酷的话说就是<b>生和死</b>。一个走势类型的确立，同时确认了前一个走势类型的死，也开始了自己面向死亡的生存。', fig: figLife, },
        { term: '② 什么是中阴阶段', text: '如果前一个走势类型的<b>背驰或盘整背驰</b>宣告了它的死亡，那么到<b>新的走势类型确立</b>，中间有一个模糊的、如同佛家“中阴身”的阶段——这就是<b>中阴阶段</b>。', fig: figMidYinDef, },
        { term: '③ 必须结合“前走势的业力”分析', text: '把握中阴，<b>必须把前一段走势的部分走势结合起来分析</b>：前一段走势的“业力”与市场当下的新合力，构成决定市场方向的最终合力。例：191 背驰后，到 193 轮廓仍不明，就要<b>借助 189 开始形成的中枢</b>来分析。', fig: figKarma, },
        { term: '④ 中阴无一例外表现为盘整', text: '<span class="hl">中阴阶段，无一例外都表现为不同级别的盘整</span>——即围绕前一走势某一部分所构成的中枢震荡（V 型反转也一样，只是震荡区域回得更深）。注意：这只就“截取该阶段的形态”而言，并非说新走势类型一定是盘整。', fig: figPanYin, },
        { term: '⑤ 中阴结束不一定是反转', text: '中阴结束后，<b>不一定反转</b>，也可能延续前一走势方向，如“上涨+盘整+上涨”完全合理。所以中阴期间唯一正确的操作：<b>技术好的在中枢震荡里操作，技术不好的拿小板凳看戏</b>，等市场自己选择方向。', fig: figNotReversal, },
        { term: '⑥ 标号体系（第88课）', text: '把记号分级：Xn=线段、Yn=1分钟、Wn=5分钟、Sn=30分钟、Rn=日、Zn=周、Mn=月、Jn=季、Nn=年。<span class="hl">最牛的点</span>＝从线段一直到年<b>同时都有标号</b>的点（若是顶，就是百年大顶）。养成多层次系统看走势的习惯，才不被每日波动迷失。', formula: '标号体系：Xn线段 / Yn1分 / Wn5分 / Sn30分 / Rn日 / Zn周 / Mn月 / Jn季 / Nn年', fig: figLabelSys },
      ]},
      { type: 'definition', title: '中阴的必然逻辑（第89课）', items: [
        { term: '① 中阴 ≠ 一般中枢震荡', text: '中阴阶段虽然表现为中枢震荡，但<b>并不是一般性的中枢震荡</b>。<span class="hl">中阴阶段能否处理好，关系到操作节奏的连接问题</span>——很多人操作节奏乱，就是因为不懂中阴。', fig: figNotOrdinary, },
        { term: '② 100% 成立的结论', text: '1 分钟级别下跌背驰后进入中阴，其后<b>一定是超 1 分钟级别的走势</b>；而超 1 分钟级别走势，<b>无论什么级别，必先出现一个 5 分钟中枢</b>——这没有任何特例。<span class="hl">这个 100% 成立的结论，是操作中最大、也是 100% 准确的依据。</span>', formula: '1分钟背驰 → 必有超1分钟走势 → 必先有5分钟中枢（100%）', fig: figHundredPct },
        { term: '③ 先处理好 5 分钟中枢', text: '有了这个结论，一切关于行情后续演化的争论都没意义：<b>先把这 5 分钟中枢处理好</b>，是唯一重要且 100% 可操作的事。5 分钟中枢震荡如何操作，是最基础的“幼儿园问题”。', fig: figHandle5min, },
        { term: '④ 中枢成立后：延伸或第三买卖点', text: '5 分钟中枢成立后，<b>100% 面临一个“破坏”问题</b>——要么延伸，要么出现第三买卖点。若不断延伸成 30 分钟中枢，就按 30 分钟第三买卖点处理；如此类推，总要<b>以某级别的第三买卖点</b>结束这个中枢震荡。', fig: figExtendOrBS3, },
        { term: '⑤ 第三买卖点后：盘整还是趋势', text: '以 5 分钟中枢后出现第三类买卖点为例，1 分钟走势就<b>演化为 5 分钟走势类型</b>：只有一个中枢是<b>盘整</b>、两个中枢是<b>趋势</b>，用<b>背驰力度</b>判断即可把握。', fig: figPanOrTrend, },
        { term: '⑥ 盘整 ≠ 中枢 ≠ 区间震荡', text: '盘整与“区间震荡盘整”不是一回事：指数从 10000 跌到 0 也可以是一个盘整，只要中间只有一个中枢。比喻：<span class="hl">中枢是苹果，盘整是“只有一个苹果的苹果树”，趋势是“有两个以上苹果的苹果树”</span>。盘整也不一定比趋势弱。', formula: '苹果=中枢；盘整=只有1个苹果的树；趋势=≥2个苹果的树', fig: figAppleTree },
      ]},
      { type: 'definition', title: '中阴结束时间的辅助判断（第90课）', items: [
        { term: '① 布林通道（BOLL）', text: '用所有软件都有的<b>布林通道</b>（上、中、下三条轨道）辅助判断。在上轨以上/下轨以下运行是<b>超强状态</b>（中枢移动时出现，分上涨超强/下跌超强）。', fig: figBOLL, },
        { term: '② 辅助判断第一类买卖点', text: '从<b>上轨上跌回其下</b>（或从下轨下涨回其上），是从超强区转向一般区；此时若再次上涨/回跌<b>创新高/新低但不能重新有效回到超强区域</b>，就意味进入中阴状态——也就是<b>第一类买卖点</b>出现了。', fig: figBS1, },
        { term: '③ 更有效：辅助判断第二类买卖点', text: '进入中阴后，上轨和下轨会<b>滞后反应</b>：等第一次回跌/回升后<b>再次</b>向上或下跌时，上轨下轨才转向；此时转向的上轨下轨往往成为<b>最大阻力和支持</b>，使<b>第二类买卖点</b>在其下/上被构造出来（如大盘 6004 点的二卖）。', fig: figBS2, },
        { term: '④ 最有用的：布林通道收口', text: '<span class="hl">布林通道的收口，就是对中阴结束时间的最好提示。</span>一般来说，<b>某一级别的布林通道收口，意味着比这低级别的某个中阴过程要级别扩展或结束了</b>，一般都对应着相应的<b>第三类买卖点</b>。', fig: figBollClose, },
        { term: '⑤ 级别对应与技巧性', text: '技巧性在于级别对应：<b>5 分钟的中阴过程，对应看 30 分钟的布林通道</b>，不是 1 分钟级别就看 1 分钟布林。它比 MACD 的技巧性更高，必须多看图、自己总结，才能把“月亮”变成自己的。', formula: '某级别布林收口 → 低级别中阴要扩展/结束 → 对应第三类买卖点', fig: figLevelMatch },
      ]},
      { type: 'motivation', title: '中阴是操作节奏的“生死关”', text: '为什么很多人<b>逃了顶还是被套、抄了底还是被震出来</b>？就是被相应级别的中阴阶段搞死的，而且<b>越大级别转折后的中阴越能搞死人</b>——它多空齐杀、不断折腾转换，非人非鬼。学会识别中阴、并利用其 100% 的必然归宿（先出 5 分钟中枢 → 再出第三买卖点）来处理，就是把“模糊的无方向阶段”变成“节奏清晰的可操作阶段”。' },
      { type: 'pitfalls', title: '常见误区', items: [
        '把中阴当成<b>一般性中枢震荡</b>（中阴关系到节奏连接，且必须结合<b>前走势</b>分析）。',
        '以为中阴结束后<b>一定反转</b>（错：也可能延续原方向，如上涨+盘整+上涨）。',
        '把<b>盘整、中枢、区间震荡</b>混为一谈（中枢=苹果，盘整=单苹果树，趋势=多苹果树）。',
        '忽略级别对应（<b>5 分钟中阴要看 30 分钟布林</b>，不是同级布林）。',
      ]},
      { type: 'exercises', title: '练习', items: [
        { q: '中阴阶段是什么？它为什么“不是一般性中枢震荡”？', a: '中阴是<b>前一走势背驰死亡到新走势类型确立之间</b>的模糊阶段，无一例外表现为盘整（围绕前走势某部分震荡）。它不是一般中枢震荡，因为它<b>关系到操作节奏的连接</b>，且必须结合<b>前走势</b>分析才能把握（第88、89课）。' },
        { q: '第89课说，1 分钟下跌背驰后，100% 成立的是什么？', a: '其后<b>一定是超 1 分钟级别的走势</b>，而超 1 分钟级别走势<b>必先出现一个 5 分钟中枢</b>——这个结论 100% 成立，是操作中最大且最准确的依据。' },
        { q: '布林通道如何辅助判断中阴结束时间？', a: '看<b>布林通道的收口</b>：某级别的布林收口，意味比它低级别的中阴过程要<b>级别扩展或结束</b>，一般对应<b>第三类买卖点</b>。注意级别对应：5 分钟中阴看 30 分钟布林（第90课）。' },
      ]},
    ],
  });
})();
