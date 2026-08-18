/* 第36章 懒人线路图 · 全书总纲 */
(function () {

  // ---- 主图1：ECharts 懒人线路图（逐级递进） ----
  function optCh36() {
    const stages = [
      { name: '分型', y: 10, c: '#e74c3c' },
      { name: '笔', y: 13, c: '#f59e0b' },
      { name: '线段', y: 16, c: '#2563eb' },
      { name: '最小级别中枢', y: 19, c: '#16a34a' },
      { name: '各级别中枢·走势类型', y: 22, c: '#9333ea' },
    ];
    const pts = stages.map((s, i) => [i, s.y]);
    const mp = stages.map((s, i) => ({
      coord: [i, s.y], symbol: 'circle', symbolSize: 13, itemStyle: { color: s.c },
      label: { show: true, position: 'top', formatter: s.name, color: s.c, fontSize: 12, fontWeight: 'bold', distance: 6 },
    }));
    const arrow = (i, name) => ({ coord: [i + 0.5, (stages[i].y + stages[i + 1].y) / 2], name, symbol: 'none', label: { show: true, color: '#9ca3af', fontSize: 16, fontWeight: 'bold', formatter: '→' } });
    return {
      tooltip: { trigger: 'axis', axisPointer: { type: 'cross' } },
      grid: { left: 40, right: 40, top: 60, bottom: 30 },
      xAxis: { type: 'value', min: -0.6, max: 4.6, axisLabel: { show: false }, splitLine: { show: false } },
      yAxis: { type: 'value', min: 8, max: 25, axisLabel: { show: false }, splitLine: { show: false }, name: '结构完备度（逐级构建）', nameLocation: 'middle', nameGap: 30 },
      series: [{
        name: '懒人线路图', type: 'line', data: pts, symbol: 'none',
        lineStyle: { width: 2.5, color: '#9ca3af' }, itemStyle: { color: '#9ca3af' },
        markPoint: { data: mp.concat([arrow(0), arrow(1), arrow(2), arrow(3)]) },
      }],
    };
  }

  // ---- 主图2：形态学 vs 动力学 两大块分界 ----
  const figMorphDyn = `
<div class="fig" style="min-width:330px"><div class="lbl">形态学（几何·无需前提） vs 动力学（背驰·需两大前提）</div>
<div style="display:flex;gap:12px;align-items:stretch;font-size:12.5px;line-height:1.85">
  <div style="flex:1;border:1.5px solid #2563eb;border-radius:8px;padding:10px 12px;color:#1f2937;background:#f8faff">
    <b style="color:#2563eb">形态学（几何）</b><br>
    分型 · 笔 · 线段<br>中枢 · 走势类型<br>
    <span style="color:#16a34a"><b>无需任何前提</b></span><br>
    <span style="color:#6b7280">庄家自买自卖也逃不出圈圈</span>
  </div>
  <div style="flex:1;border:1.5px solid #e74c3c;border-radius:8px;padding:10px 12px;color:#1f2937;background:#fff7f7">
    <b style="color:#e74c3c">动力学（物理）</b><br>
    背驰 · 中枢/走势能量结构<br>
    <span style="color:#b91c1c"><b>前提：</b>价格充分有效市场<br>＋ 非完全绝对趋同交易</span><br>
    <span style="color:#6b7280">本质仍是几何（转化前提为几何结构）</span>
  </div>
</div>
<div class="cap">72课：本ID理论本质分两部分——<b>形态学</b>（几何、<b>无须任何前提</b>）与<b>动力学</b>（背驰等，需<b>价格充分有效市场里的非完全绝对趋同交易</b>两大前提），三是两者的<b>结合</b>。</div></div>`;

  __chapters.push({
    id: 'ch36', vol: '卷八 · 理论深化', title: '第36章 懒人线路图 · 全书总纲', source: '原文第72课',
    figures: [
      { kind: 'echarts', title: '懒人线路图：分型 → 笔 → 线段 → 最小中枢 → 各级别中枢、走势类型', note: '第72课给出的<span class="kw">懒人线路图</span>：<b>分型 → 笔 → 线段 → 最小级别中枢 → 各级别中枢、走势类型</b>。这是形态学里最基础、<b>完全没有办法再简略</b>的一条递进路径，逐级由低到高“构建”出更大的结构。<span class="hl">无论多懒，真想学缠论，先把这几样东西搞清楚。</span>', option: optCh36 },
      { kind: 'html', title: '形态学 vs 动力学：两大块的分界', note: '第72课把理论一分为二：<b>形态学</b>（分型、笔、线段、中枢、走势类型）本质是<b>几何</b>，<b>无须任何前提</b>；<b>动力学</b>（背驰、中枢/走势的能量结构）本质是<b>物理</b>，需要<b>“价格充分有效市场里的非完全绝对趋同交易”</b>两大前提。二者结合，才是完整理论。<span class="hl">光用形态学，也能构成一套有效的操作体系（抓第二买卖点）。</span>', html: figMorphDyn },
    ],
    sections: [
      { type: 'definition', title: '形态学与动力学（第72课）', items: [
        { term: '① 理论分两部分', text: '本ID的理论，本质上分两部分：<b>一是形态学，二是动力学，三是两者的结合</b>。<span class="hl">形态学就是中枢、走势类型、笔、线段之类的东西；动力学就是背驰、中枢/走势的能量结构之类的东西。</span>分辨极易：<b>任何涉及背驰的，都是动力学范围</b>。', fig: mfig('两部分+结合', '<div style="font-size:12.5px;line-height:2;color:#1f2937"><b style="color:#2563eb">形态学</b>＋<b style="color:#e74c3c">动力学</b><br>＝ 缠论（＋两者的结合）</div>', '形态学＋动力学，三是结合') },
        { term: '② 形态学＝几何、无需前提', text: '站在纯理论角度，<span class="hl">形态学是最根本的</span>。形态学从本质上就是<b>几何</b>，这部分内容<b>无须任何前提</b>——就算一个庄家自己全买了、一个人天天自我交易，也<b>永远逃不出形态学画的圈圈</b>。分型、笔、线段、中枢、走势类型，都属于形态学。', fig: mfig('形态学＝几何', drawZS([{ p: 10, tag: '底' }, { p: 14, tag: '顶' }, { p: 11, tag: '底' }, { p: 13, tag: '顶' }], [{ lo: 11, hi: 13, x0: 0, x1: 3, label: '中枢' }], { w: 40, h: 92 }), '几何结构，无需前提，人人逃不出圈圈') },
        { term: '③ 动力学＝背驰、需两大前提', text: '动力学属于<b>物理范畴</b>，但站在更高层次看，<span class="hl">物理的本质就是几何</span>——动力学本质也是几何，只是这种几何比较特别，需要把<b>“价格充分有效市场里的非完全绝对趋同交易”</b>作为前提，转化为某些几何结构，再构造出证明。', fig: mfig('动力学＝背驰', drawZS([{ p: 16, tag: '顶' }, { p: 12, tag: '底' }, { p: 13, tag: '顶' }, { p: 11, tag: '底' }, { p: 12, tag: '顶' }, { p: 8, tag: '底', label: '背驰', color: '#16a34a' }], [{ lo: 11, hi: 13, x0: 0, x1: 4, label: '中枢' }], { w: 40, h: 92 }), '中枢后一段力度衰减（背驰）→ 动力学范畴') },
        { term: '④ 两大前提的含义', text: '本ID理论成立的前提，<b>主要针对动力学部分</b>：<span class="kw">价格充分有效市场</span>里的<span class="kw">非完全绝对趋同交易</span>。<span class="hl">形态学部分不需要这些前提。</span>换言之，只要市场“价格充分有效”且“交易非完全绝对趋同”，背驰等动力学结论才成立。', fig: mfig('两大前提', '<div style="font-size:12px;line-height:1.9;color:#1f2937">前提① <b style="color:#2563eb">价格充分有效市场</b><br>前提② <b style="color:#e74c3c">非完全绝对趋同交易</b><br><span style="color:#6b7280">——只针对动力学，形态学无需</span></div>', '两大前提是动力学的前提，非形态学的前提') },
      ]},
      { type: 'definition', title: '懒人线路图（第72课）', items: [
        { term: '⑤ 懒人线路图', text: '如果你实在特懒，就从分型学起。第72课给出<b>懒人线路图</b>：<span class="hl">分型 → 笔 → 线段 → 最小级别中枢 → 各级别中枢、走势类型</span>。这几样是形态学中最基本的，<b>完全没有办法再简略</b>，所以无论多懒，真想学本ID的理论，请先把这几样搞清楚。', fig: mfig('懒人线路图', '<div style="font-size:12px;line-height:2;color:#1f2937"><b style="color:#e74c3c">分型</b>→<b style="color:#f59e0b">笔</b>→<b style="color:#2563eb">线段</b>→<b style="color:#16a34a">最小中枢</b>→<b style="color:#9333ea">各级别中枢·走势类型</b></div>', '逐级递进，无法再简略的必经之路') },
        { term: '⑥ 光用形态学也能操作', text: '其实<span class="hl">光用形态学，就足以形成一套有效的操作体系</span>——只是没有背驰概念，<b>第一买卖点抓不住，但第二买卖点肯定没问题</b>。纯形态学操作法：对最后一个中枢的回拉后，<b>第一个与回拉反向的、不创新高/新低的同级别离开，就是买卖段</b>。', fig: mfig('纯形态学操作（第二类买卖点）', drawZS([{ p: 10, tag: '底' }, { p: 14, tag: '顶' }, { p: 11, tag: '底' }, { p: 15, tag: '顶' }, { p: 12, label: '二买', color: '#16a34a' }, { p: 16, tag: '顶' }], [{ lo: 11, hi: 14, x0: 0, x1: 4, label: '中枢' }], { w: 40, h: 96 }), '回拉中枢不创新低 → 第二类买点') },
      ]},
      { type: 'motivation', title: '先有总纲，才不迷路', text: '缠师的课程并非按“正式理论框架”写成，而是形态学、动力学混着讲，读者极易在概念堆里迷失。第72课的再梳理，就是给一张<b>总地图</b>：先认清理论分<b>形态学（几何、无需前提）</b>与<b>动力学（背驰、需两大前提）</b>两大块，再握紧一条<b>懒人线路图</b>（分型→笔→线段→最小中枢→各级别中枢、走势类型）。<b>把握了这张总纲，后面任何一章都能定位到它所属的位置</b>，学习不再是无序堆砌，而是沿着一根主线层层递进。' },
      { type: 'pitfalls', title: '常见误区', items: [
        '以为“两大前提”也约束形态学——<b>错</b>：前提只针对<b>动力学</b>，形态学是几何、<b>无须任何前提</b>。',
        '分不清形态学与动力学——记住一句：<b>任何涉及背驰的，都是动力学</b>；中枢、走势类型、笔、线段是形态学。',
        '跳过“分型/笔/线段”直接学中枢——<b>懒人线路图无法再简略</b>，地基不牢，后面必乱。',
        '以为动力学是玄学——它本质也是<b>几何</b>，只是把前提转化为几何结构再证明。',
        '以为只有背驰才能操作——<b>光用形态学也能操作</b>，只是抓不住第一买卖点，第二买卖点没问题。',
      ]},
      { type: 'exercises', title: '练习', items: [
        { q: '缠论的“懒人线路图”是什么？', a: '<b>分型 → 笔 → 线段 → 最小级别中枢 → 各级别中枢、走势类型</b>。这是形态学中最基本、无法再简略的一条路径，是学习的必经路线（第72课）。' },
        { q: '缠论的两大前提“价格充分有效市场＋非完全绝对趋同交易”是针对哪部分的？', a: '只针对<b>动力学</b>部分（背驰、中枢/走势的能量结构）。<b>形态学</b>本质是几何，<b>无须任何前提</b>——庄家自买自卖也逃不出形态学的圈圈（第72课）。' },
        { q: '不用背驰（纯形态学）能操作吗？', a: '<b>能。</b>光用形态学就足以形成一套有效操作体系：只是抓不住<b>第一类买卖点</b>，但<b>第二类买卖点肯定没问题</b>——对最后一个中枢的回拉后，第一个与回拉反向、不创新高/新低的同级别离开就是买卖段（第72课）。' },
      ]},
    ],
  });
})();
