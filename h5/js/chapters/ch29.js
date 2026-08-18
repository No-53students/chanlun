/* 第29章 MACD 防狼术 */
(function () {

  // ---- 主图1：ECharts 双 grid（价格走势 + MACD 黄白线与 0 轴） ----
  function optCh29() {
    const pts = [22, 20.5, 21, 18, 17, 15, 14, 13.5, 12, 11]; // 顶部 5200 反抽确认后一路下行
    const DIFF = [2.5, 1.8, 0.9, 0.0, -0.8, -1.5, -2.2, -2.8, -3.2, -3.5];
    const DEA = [2.0, 1.7, 1.3, 0.7, -0.1, -0.9, -1.6, -2.2, -2.7, -3.1];
    const barData = DIFF.map((v, i) => ({
      value: [i, +(v - DEA[i]).toFixed(2)],
      itemStyle: { color: v >= DEA[i] ? '#e74c3c' : '#16a34a' },
    }));
    const mp = (i, name, color, pos) => ({ coord: [i, pts[i]], name, symbol: 'circle', symbolSize: 8, itemStyle: { color }, label: { show: true, color, fontSize: 10, position: pos, distance: 4, fontWeight: 'bold', formatter: function (p) { return p.name; } } });
    const seg = (x, y, name, color, pos) => ({ coord: [x, y], name, symbol: 'none', label: { show: true, color, fontSize: 11, fontWeight: 'bold', position: pos, formatter: function (p) { return p.name; } } });
    return {
      tooltip: { trigger: 'axis', axisPointer: { type: 'cross' } },
      legend: { data: ['走势', 'DIFF（白线）', 'DEA（黄线）', 'MACD 柱'] },
      grid: [
        { left: 60, right: 90, top: 46, height: 190 },
        { left: 60, right: 90, top: 300, height: 120 },
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
          markPoint: {
            data: [
              mp(0, '5200 顶（反抽后一路下行）', '#e74c3c', 'top'),
              mp(3, '反抽确认', '#e74c3c', 'top'),
              mp(9, '3000+（0 轴下晃悠）', '#16a34a', 'bottom'),
              seg(5, 20.5, '0 轴之下 = 空头主导 → 回避', '#e74c3c', 'top'),
            ],
          },
        },
        {
          name: 'DIFF（白线）', type: 'line', xAxisIndex: 1, yAxisIndex: 1,
          data: DIFF.map((v, i) => [i, v]), symbol: 'none', lineStyle: { width: 1.8, color: '#94a3b8' }, itemStyle: { color: '#94a3b8' },
          markLine: {
            silent: true, symbol: 'none',
            label: { show: true, position: 'end', formatter: function (p) { return p.name || ''; }, fontSize: 10 },
            data: [{ yAxis: 0, name: '0 轴（多空分界）', lineStyle: { color: '#dc2626', width: 1.6, type: 'solid' }, label: { color: '#dc2626' } }],
          },
          markPoint: {
            data: [
              { coord: [3, 0], name: 'DIFF 跌破 0 轴 → 回避', symbol: 'pin', symbolSize: 46, itemStyle: { color: '#e74c3c' }, label: { show: true, color: '#e74c3c', fontSize: 11, fontWeight: 'bold', position: 'bottom', formatter: function (p) { return p.name; } } },
              { coord: [4, -0.1], name: 'DEA 亦破 0 轴', symbol: 'circle', symbolSize: 7, itemStyle: { color: '#f59e0b' }, label: { show: true, color: '#b45309', fontSize: 9, position: 'bottom', formatter: function (p) { return p.name; } } },
            ],
          },
        },
        {
          name: 'DEA（黄线）', type: 'line', xAxisIndex: 1, yAxisIndex: 1,
          data: DEA.map((v, i) => [i, v]), symbol: 'none', lineStyle: { width: 1.8, color: '#f59e0b' }, itemStyle: { color: '#f59e0b' },
        },
        {
          name: 'MACD 柱', type: 'bar', xAxisIndex: 1, yAxisIndex: 1, data: barData, barWidth: '55%',
        },
      ],
    };
  }

  // ---- 主图2：防狼术要领（0 轴上多、下空） ----
  const figLang = `
<div class="fig" style="min-width:320px"><div class="lbl">防狼术：0 轴分多空</div>
<svg viewBox="0 0 320 150" width="320" height="150" style="display:block">
  <rect x="40" y="12" width="270" height="52" fill="rgba(22,163,74,0.10)"/>
  <rect x="40" y="78" width="270" height="62" fill="rgba(231,76,60,0.10)"/>
  <line x1="40" y1="64" x2="310" y2="64" stroke="#dc2626" stroke-width="1.8"/>
  <text x="44" y="26" font-size="11" fill="#166534"><b>0 轴之上：多头主导</b>（可参与）</text>
  <text x="44" y="92" font-size="11" fill="#991b1b"><b>0 轴之下：空头主导</b>（必须远离）</text>
  <text x="310" y="60" font-size="9" fill="#dc2626" text-anchor="end">0 轴</text>
  <polyline points="44,40 90,34 130,44 170,62 210,84 250,98 290,108" fill="none" stroke="#94a3b8" stroke-width="2"/>
  <polyline points="44,48 90,44 130,52 170,70 210,90 250,102 290,112" fill="none" stroke="#f59e0b" stroke-width="2"/>
  <circle cx="170" cy="62" r="4" fill="#e74c3c"/>
  <text x="150" y="55" font-size="9" fill="#e74c3c">跌破 0 轴</text>
</svg>
<div class="cap">黄白线（<b>DIFF/DEA</b>）<b>跌破 0 轴</b>＝进入空头主导，一律回避，直到重新站上 0 轴再说。</div></div>`;

  // ---- 讲解点小图 ----

  // ① 学屠龙术前先学防狼术
  const figFirst = mfig('先学防狼术，再学屠龙术',
    '<div style="font-size:12.5px;line-height:2;color:#1f2937"><b style="color:#dc2626">防狼术</b>（保命）→ <b style="color:#2563eb">屠龙术</b>（赚钱）<br>连防狼术都没过关，就别研究什么中枢、级别</div>',
    '第103课：绝大多数人连防狼术都没过关');

  // ② 0 轴分多空主导
  const figAxis = mfig('0 轴 = 多空分界',
    '<svg viewBox="0 0 200 90" width="200" height="90" style="display:block">'
    + '<line x1="10" y1="40" x2="190" y2="40" stroke="#dc2626" stroke-width="1.6"/>'
    + '<text x="12" y="22" font-size="10" fill="#166534">0 轴之上 · 多头主导</text>'
    + '<text x="12" y="72" font-size="10" fill="#991b1b">0 轴之下 · 空头主导</text>'
    + '<text x="190" y="36" font-size="9" fill="#dc2626" text-anchor="end">0 轴</text>'
    + '</svg>',
    'MACD 陷入 0 轴之下 = 对应时间单位进入空头主导');

  // ③ 黄白线 DIFF/DEA
  const figLine = mfig('黄白线：DIFF（白）/ DEA（黄）',
    '<svg viewBox="0 0 200 90" width="200" height="90" style="display:block">'
    + '<line x1="10" y1="45" x2="190" y2="45" stroke="#dc2626" stroke-width="1.4"/>'
    + '<polyline points="10,20 50,32 90,45 130,60 170,74" fill="none" stroke="#94a3b8" stroke-width="2"/>'
    + '<polyline points="10,28 50,38 90,50 130,66 170,80" fill="none" stroke="#f59e0b" stroke-width="2"/>'
    + '<text x="12" y="14" font-size="9" fill="#64748b">DIFF 白线（快）</text>'
    + '<text x="12" y="86" font-size="9" fill="#b45309">DEA 黄线（慢）</text>'
    + '</svg>',
    '黄白线跌破 0 轴 = 必须远离的信号');

  // ④ 最低时间周期的选择
  const figCycle = mfig('按自己能力定最低时间周期',
    '<div style="font-size:12.5px;line-height:1.9;color:#1f2937">'
    + '<span style="background:#fef3c7;color:#92400e;padding:2px 7px;border-radius:5px">1分钟</span> 0 轴下常反复 → 太敏感<br>'
    + '<span style="background:#fee2e2;color:#991b1b;padding:2px 7px;border-radius:5px">60/30分钟</span> 破 0 轴 → 彻底离开<br>'
    + '直到<b>重新站上 0 轴</b>再说'
    + '</div>',
    '自己能力决定的最低周期 MACD 破 0 轴，就彻底离场');

  // ⑤ 技术高的例外：背驰介入
  const figBackchi = mfig('更高要求：背驰处介入',
    drawZS([{ p: 20, tag: '顶' }, { p: 15 }, { p: 18 }, { p: 14 }, { p: 17 }, { p: 11 }, { p: 14 }, { p: 10 }, { p: 13 }, { p: 8, tag: '底', label: '背驰', color: '#16a34a' }],
      [{ lo: 15, hi: 17, x0: 1, x1: 4, label: 'A' }, { lo: 11, hi: 13, x0: 5, x1: 8, label: 'B' }], { w: 26, h: 96 }),
    '技术高的可只在背驰处介入（最高要求），但傻瓜化操作先看 0 轴');

  // ⑥ 案例：5200 反抽后一路跌到 3000+
  const figCase = mfig('案例：0 轴下晃悠的杀伤力',
    drawZS([{ p: 22, label: '5200', color: '#e74c3c', above: true }, { p: 18, label: '反抽', color: '#f59e0b' }, { p: 19, label: '确认', color: '#e74c3c', above: true }, { p: 15 }, { p: 16 }, { p: 13 }, { p: 14 }, { p: 11, label: '3000+', color: '#16a34a' }],
      [], { w: 34, h: 104 }),
    '60分钟 MACD 破 0 轴并反抽确认后，一路跌到 3000 多点');

  __chapters.push({
    id: 'ch29', vol: '卷六 · 中阴与表里', title: '第29章 MACD 防狼术', source: '原文第103课',
    figures: [
      { kind: 'echarts', title: 'MACD 黄白线跌破 0 轴：一律回避', note: '上方价格在 <b>5200 顶</b>反抽确认后一路下行至 <b>3000+</b>；下方 MACD 黄白线（<b>DIFF 白线 / DEA 黄线</b>）在 <b>x=3</b> 处 <b>跌破 0 轴</b>（红针标记），并从此<b>一直在 0 轴下方晃悠</b>。第103课：<span class="hl">回避所有 MACD 黄白线在 0 轴下面的市场或股票</span>——这就是最保命的防狼术。', option: optCh29 },
      { kind: 'html', title: '防狼术要领：0 轴分多空', note: '<b>0 轴</b>是多空主导的分界线：黄白线在 <b>0 轴之上</b>＝多头主导、可参与；跌破 <b>0 轴</b>＝进入空头主导、<b>必须远离</b>。学屠龙术（精确买卖点）之前，先学会这条<b>保命纪律</b>。', html: figLang },
    ],
    sections: [
      { type: 'definition', title: '防狼术的核心纪律（第103课）', items: [
        { term: '① 先学防狼术，再学屠龙术', text: '世界上最多的人嫌课程太慢、急于学高招。<span class="hl">学屠龙术前先学好防狼术</span>——在没彻底掌握下面这条防狼术之前，也别研究什么中枢、级别了。有了它，至少不会被大盘严重侵犯，也不会在大盘大跌时鬼哭狼嚎。', fig: figFirst },
        { term: '② 0 轴分多空主导', text: '就一个最简单的 MACD 指标，<b>0 轴</b>把市场分为多空主导：<span class="hl">一旦 MACD 陷入 0 轴之下，就在对应时间单位的图表下进入空头主导，这是必须远离的。</span>', formula: 'MACD 在 0 轴下 = 空头主导 = 必须远离', fig: figAxis },
        { term: '③ 黄白线 DIFF / DEA', text: '所谓“黄白线”，就是 MACD 的 <b>DIFF（白线，快）</b>与 <b>DEA（黄线，慢）</b>。判断标准看的是<b>黄白线是否跌破 0 轴</b>，而不是看柱子颜色——<span class="kw">回避所有 MACD 黄白线在 0 轴下面的市场或股票</span>。', fig: figLine },
        { term: '④ 决定一个最低时间周期', text: '这涉及时间周期：1 分钟图上就经常在 0 轴下又上来，太敏感。所以要根据自己的能力，<b>决定一个最低时间周期</b>（如 60 分钟或 30 分钟），一旦出现该周期 MACD 跌破 0 轴，就<b>彻底离开</b>，直到重新站上 0 轴再说。', fig: figCycle },
      ]},
      { type: 'definition', title: '防狼术的边界与应用（第103课）', items: [
        { term: '⑤ 技术高的例外：背驰介入', text: '如果你技术高点，完全可以<b>在背驰的情况下介入</b>，这是最高的要求。但这里不能给太高的要求，<b>一切都要傻瓜化</b>：如果你连 MACD 黄白线是否在 0 轴以下都看不懂，那就彻底离开这个市场。', fig: figBackchi },
        { term: '⑥ 案例：5200 反抽后一路跌到 3000+', text: '看看大盘的 60 分钟图：<b>5200 点 MACD 跌破 0 轴并反抽确认后</b>，一直到现在 3000 多点，<b>一直就在 0 轴下晃悠</b>，其间产生多大的杀伤力，各有体验。这就是一条纪律为何如此重要的现实依据。', fig: figCase },
      ]},
      { type: 'motivation', title: '一条纪律，胜过一百条理论', text: '再高明的屠龙术（背驰、区间套、三类买卖点），都是建立在“<b>还活着</b>”这个前提上的。MACD 防狼术的价值，正在于它<b>极简单、极傻瓜、极保命</b>：不看中枢、不看级别、不预测，只看黄白线是否在 0 轴之下，就能让你躲过 5200 到 3000 这种级别的单边下跌。它是所有交易纪律里<b>性价比最高</b>的一条。' },
      { type: 'pitfalls', title: '常见误区', items: [
        '只学屠龙术、<b>跳过防狼术</b>，结果在大盘单边下跌时被严重侵犯。',
        '看<b>柱子颜色</b>判断多空（错：要看<b>黄白线 DIFF/DEA 是否跌破 0 轴</b>）。',
        '用<b>1 分钟</b>这类过小周期（0 轴下反复穿越，信号失效）——应按自己能力选<b>最低时间周期</b>（如 60/30 分钟）。',
        '跌破 0 轴后<b>心存侥幸不肯离场</b>，幻想马上反弹站回 0 轴。',
      ]},
      { type: 'exercises', title: '练习', items: [
        { q: 'MACD 防狼术的一条核心纪律是什么？', a: '<span class="hl">回避所有 MACD 黄白线（DIFF/DEA）在 0 轴下面的市场或股票</span>；按自己能力决定一个最低时间周期（如 60/30 分钟），一旦该周期 MACD 破 0 轴就彻底离开，直到重新站上 0 轴（第103课）。' },
        { q: '为什么不能只看 MACD 柱子的红绿来判断多空？', a: '因为判断标准是<b>黄白线是否跌破 0 轴</b>（0 轴分多空主导），而不是柱子颜色。柱子红绿反映的是 DIFF 与 DEA 的差值变化，可能在黄白线仍处 0 轴下时也短暂转红。' },
        { q: '技术高的人可以怎么做？', a: '可以在<b>背驰的情况下介入</b>（这是最高要求）；但对大多数人，先按傻瓜化纪律来——看不懂黄白线是否在 0 轴下，就彻底离场。' },
      ]},
    ],
  });
})();
