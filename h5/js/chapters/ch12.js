/* 第12章 中枢定理与级别扩张 */
(function () {

  // ---- 主图1：ECharts 三个中枢：延伸 / 新生 / 级别扩张 ----
  function optCh12() {
    const ps = [10, 15, 11, 13, 13.5, 17, 14, 16]; // P0..P7
    const mk = (x0, x1, lo, hi, name) => [{ xAxis: x0, yAxis: lo, name }, { xAxis: x1, yAxis: hi }];
    const mp = (i, name, color, pos) => ({ coord: [i, ps[i]], name, symbol: 'circle', symbolSize: 8, itemStyle: { color }, label: { show: true, color, fontSize: 10, position: pos, distance: 5, fontWeight: 'bold', formatter: function (p) { return p.name; } } });
    const seg = (x, y, name, color, pos) => ({ coord: [x, y], name, symbol: 'none', label: { show: true, color, fontSize: 11, fontWeight: 'bold', position: pos || 'top', formatter: function (p) { return p.name; } } });
    return {
      tooltip: { trigger: 'axis', axisPointer: { type: 'cross' } },
      grid: { left: 48, right: 130, top: 44, bottom: 42 },
      xAxis: { type: 'value', min: 0, max: 7, interval: 1 },
      yAxis: { type: 'value', scale: true, name: '价格' },
      series: [{
        name: '走势', type: 'line', data: ps.map((p, i) => [i, p]),
        symbol: 'circle', symbolSize: 5, lineStyle: { width: 2, color: '#1f2937' }, itemStyle: { color: '#1f2937' },
        markArea: {
          silent: true, itemStyle: { color: 'rgba(37,99,235,0.10)' },
          label: { show: true, position: 'insideTop', formatter: function (p) { return p.name || ''; }, color: '#2563eb', fontSize: 10 },
          data: [mk(0, 3, 11, 13, '原中枢A（延伸中）[11,13]'), mk(4, 7, 14, 16, '新中枢B（新生）[14,16]'), mk(0, 7, 11, 16, '更大级别中枢（扩张）[11,16]')],
        },
        markLine: {
          silent: true, symbol: 'none',
          lineStyle: { color: '#2563eb', type: 'dashed', width: 1 },
          label: { show: true, position: 'end', formatter: function (p) { return p.name; }, color: '#2563eb', fontSize: 10 },
          data: [
            { yAxis: 13, name: 'ZG(A)=13' },
            { yAxis: 11, name: 'ZD(A)=11' },
            { yAxis: 16, name: 'ZG(B)=16' },
            { yAxis: 14, name: 'ZD(B)=14' },
            { yAxis: 15, name: 'GG(A)=15', lineStyle: { color: '#e74c3c' } },
            { yAxis: 13.5, name: 'DD(B)=13.5（重叠）', lineStyle: { color: '#9333ea' } },
          ],
        },
        markPoint: {
          data: [
            mp(0, '底 DD(A)=10', downColor, 'bottom'),
            mp(1, '顶 GG(A)=15', upColor, 'top'),
            mp(4, '回试 DD(B)=13.5', downColor, 'bottom'),
            mp(7, '顶 ZG(B)=16', upColor, 'top'),
            seg(1.5, 13.6, '原中枢A', '#2563eb', 'bottom'),
            seg(5.5, 15.6, '新中枢B', '#2563eb', 'top'),
            seg(3.5, 18.4, '波动重叠 → 更大级别中枢', '#9333ea', 'top'),
          ],
        },
      }],
    };
  }

  // ---- 主图2：级别扩张：两个 5 分钟中枢重叠 → 一个 30 分钟中枢 ----
  const figExpand = `
<div class="fig" style="min-width:280px"><div class="lbl">两个 5 分钟中枢：波动区间重叠</div>${drawZS([{ p: 10, label: 'DD=10', color: '#16a34a' }, { p: 15, label: 'GG=15', color: '#e74c3c', above: true }, { p: 11, label: 'ZD=11', color: '#16a34a' }, { p: 13, label: 'ZG=13', color: '#e74c3c', above: true }, { p: 13.5, label: '回试13.5', color: '#9333ea' }, { p: 17, label: 'GG=17', color: '#e74c3c', above: true }, { p: 14, label: 'ZD=14', color: '#16a34a' }, { p: 16, label: 'ZG=16', color: '#e74c3c', above: true }], [{ lo: 11, hi: 13, x0: 0, x1: 3, label: '5分钟中枢A' }, { lo: 14, hi: 16, x0: 4, x1: 7, label: '5分钟中枢B' }], { zgzd: true, w: 46, h: 150 })}<div class="cap">A 波动上探 15，B 波动下探 13.5<br>→ 波动区间重叠 [13.5,15]</div></div>
<div class="fig" style="min-width:280px"><div class="lbl">合并为：一个 30 分钟中枢</div>${drawZS([{ p: 10 }, { p: 15 }, { p: 11 }, { p: 13 }, { p: 13.5 }, { p: 17 }, { p: 14 }, { p: 16 }], [{ lo: 11, hi: 16, x0: 0, x1: 7, label: '30分钟中枢 [11,16]' }], { zgzd: true, w: 46, h: 150 })}<div class="cap">两个同级别中枢的波动重叠<br>→ 形成<b>更大级别中枢</b>（级别扩张）</div></div>`;

  __chapters.push({
    id: 'ch12', vol: '卷三 · 中枢与走势', title: '第12章 中枢定理与级别扩张', source: '原文第18、20课',
    figures: [
      { kind: 'echarts', title: '中枢的三种演化：延伸 / 新生 / 级别扩张', note: '<b>原中枢 A</b> [11,13] 围绕区间震荡（<span class="kw">延伸</span>）；随后走势向上离开，回试到 13.5 不落回 A，产生<b>新中枢 B</b> [14,16]（<span class="kw">新生</span>）；但 A 的波动上探 15、B 的波动下探 13.5，波动区间<b>重叠</b> [13.5,15] → 两个同级别中枢扩张成一个<b>更大级别中枢</b> [11,16]（<span class="hl">级别扩张</span>）。', option: optCh12 },
      { kind: 'html', title: '级别扩张：两个 5 分钟中枢 → 一个 30 分钟中枢', note: '两个<b>同级别</b>（5 分钟）中枢本身的区间 [11,13] 与 [14,16] <b>不重叠</b>，但围绕它们的<b>波动区间</b>产生重叠（15 与 13.5）——按「级别延续定理二」，这等价于<b>形成更大级别中枢</b>（30 分钟 [11,16]）。这就是中枢<b>级别扩张</b>。', html: figExpand },
    ],
    sections: [
      { type: 'definition', title: '中枢定理三条', items: [
        { term: '① 定理一·中枢延伸（第20课）', text: '走势中枢的<b>延伸</b>，等价于：<span class="hl">任意区间 [dn, gn] 都与中枢区间 [ZD, ZG] 有重叠</span>。即次级别走势的<b>每次波动都触及中枢区间</b>，中枢在延伸；此时<b>不产生新中枢</b>，级别不变。', formula: '中枢延伸 ⇔ 任意 [dn,gn] 与 [ZD,ZG] 有重叠', fig: mfig('中枢延伸：波动始终触及', drawZS([{ p: 10 }, { p: 15 }, { p: 11 }, { p: 14 }, { p: 12 }, { p: 13.5 }, { p: 11.5 }, { p: 13 }], [{ lo: 11, hi: 14, x0: 0, x1: 7, label: '中枢延伸' }], { w: 40, h: 104 }), '每次波动都触及 [11,14] → 不产生新中枢') },
        { term: '② 定理二·中枢新生（第18课）', text: '一旦<b>某次波动不再触及中枢区间</b>（有 Zn 使得 dn&gt;ZG 或 gn&lt;ZD），就<b>必然产生新的中枢</b>。走势类型延伸是否结束、盘整与趋势如何区分，<span class="hl">关键都在于是否产生新的中枢</span>——趋势的「延伸」就是同向中枢不断产生，盘整的「延伸」就是不能产生新中枢。', formula: 'dn&gt;ZG 或 gn&lt;ZD ⇒ 产生新中枢（或趋势延续）', fig: mfig('中枢新生：波动离开不返回', drawZS([{ p: 10, tag: '底' }, { p: 14, tag: '顶' }, { p: 11 }, { p: 13 }, { p: 18, label: '离开', color: '#e74c3c', above: true }, { p: 17, label: '新中枢', color: '#2563eb' }, { p: 16 }, { p: 19, tag: '顶' }], [{ lo: 11, hi: 13, x0: 0, x1: 3, label: '原中枢' }, { lo: 17, hi: 19, x0: 4, x1: 7, label: '新中枢' }], { w: 40, h: 104 }), '波动离开原中枢不再返回 → 产生新中枢') },
        { term: '③ 定理三·中枢级别扩张（第20课）', text: '<span class="hl">更大级别中枢产生，当且仅当围绕连续两个同级别中枢产生的波动区间产生重叠。</span>（级别延续定理二）。反过来，若两个同级别中枢的波动区间<b>互不重叠</b>，就只是趋势，<b>不可能形成更大级别中枢</b>。', formula: '两同级别中枢波动重叠 ⇔ 形成更大级别中枢', fig: mfig('级别扩张：波动重叠', drawZS([{ p: 10 }, { p: 15 }, { p: 11 }, { p: 13 }, { p: 13.5 }, { p: 17 }, { p: 14 }, { p: 16 }], [{ lo: 11, hi: 13, x0: 0, x1: 3, label: '中枢A' }, { lo: 14, hi: 16, x0: 4, x1: 7, label: '中枢B' }, { lo: 11, hi: 16, x0: 0, x1: 7, label: '大级别中枢' }], { w: 40, h: 104 }), 'A、B 波动重叠 [13.5,15] → 形成更大级别中枢') },
      ]},
      { type: 'definition', title: '级别扩张的界定与第三类买卖点', items: [
        { term: '① 三种情况严格区分（第20课）', text: '必须严格区分两种情况：<span class="kw">一</span>、走势中枢及其<b>延伸</b>——所有围绕中枢的前后两个次级波动<b>都至少有一个触及中枢区间</b>（否则必然产生新的三次连续次级走势重叠、离开原中枢）；<span class="kw">二</span>、一个中枢完成前，其波动<b>触及上一个中枢</b>或其延伸时的某个瞬间波动区间，由此产生<b>更大级别中枢</b>。', fig: mfig('延伸 vs 扩张', drawZS([{ p: 10 }, { p: 14 }, { p: 11 }, { p: 13 }, { p: 12 }, { p: 15 }, { p: 12.5 }, { p: 14.5 }], [{ lo: 11, hi: 13, x0: 0, x1: 3, label: '延伸（不变级）' }, { lo: 13, hi: 14.5, x0: 4, x1: 7, label: '扩张（升级）' }], { w: 40, h: 104 }), '上：波动始终触及→延伸；下：波动重叠→扩张') },
        { term: '② 级别延续定理一（第20课）', text: '<span class="hl">在更大级别中枢产生前，该级别走势类型将延续</span>——只能是该级别盘整或趋势的延续。这也是「涨了那么多还涨」的原因：在周线中枢出现前，日线级别的上涨走势<b>不可能结束</b>。', fig: mfig('更大中枢产生前走势延续', drawZS([{ p: 10 }, { p: 14 }, { p: 11 }, { p: 13 }, { p: 16 }, { p: 15 }, { p: 18 }], [{ lo: 11, hi: 13, x0: 0, x1: 3, label: '未产生大中枢' }], { w: 40, h: 104 }), '无更大级别中枢 → 该级别走势类型延续') },
        { term: '③ 中心定理二（第20课）', text: '前后同级别两个中枢：<span class="kw">后GG &lt; 前DD</span> ⇔ 下跌及其延续；<span class="kw">后DD &gt; 前GG</span> ⇔ 上涨及其延续；<span class="hl">后ZG &lt; 前ZD 且 后GG ≥ 前DD</span>（或后ZD &gt; 前ZG 且 后DD ≤ 前GG）⇔ <b>形成高级别中枢</b>。', formula: '后GG&lt;前DD ⇒ 下跌延续；后DD&gt;前GG ⇒ 上涨延续<br>波动重叠 ⇒ 形成高级别中枢', fig: mfig('中心定理二', drawZS([{ p: 10 }, { p: 15 }, { p: 11 }, { p: 13 }, { p: 13.5 }, { p: 17 }, { p: 14 }, { p: 16 }], [{ lo: 11, hi: 13, x0: 0, x1: 3, label: '前中枢' }, { lo: 14, hi: 16, x0: 4, x1: 7, label: '后中枢' }], { w: 40, h: 104 }), '后GG=17≥前DD=10 且 后DD=13.5≤前GG=15 → 高级别中枢') },
        { term: '④ 第三类买卖点定理（第20课）', text: '由定理一可得：<span class="hl">一个次级别走势向上离开中枢，再以一个次级别走势回试，其低点不跌破 ZG → 第三类买点</span>；向下离开后回抽不升破 ZD → 第三类卖点。第三类买卖点正是<b>中枢新生或扩张</b>的产物。', formula: '离开后回试不破 ZG ⇒ 第三类买点', fig: mfig('第三类买点', drawZS([{ p: 10, tag: '底' }, { p: 14, tag: '顶' }, { p: 11, tag: '底' }, { p: 13, tag: '顶' }, { p: 16, label: '离开', color: '#e74c3c', above: true }, { p: 14, label: '三买', color: '#9333ea' }], [{ lo: 11, hi: 13, x0: 0, x1: 3, label: '中枢 [11,13]' }], { zgzd: true, w: 40, h: 104 }), '离开中枢后回试不破 ZG=13 → 三买') },
        { term: '⑤ 涨停的极限例子（第20课）', text: '一个股票<b>开盘立刻封涨停</b>，只能算是一分钟级别中枢的<b>延伸</b>，无论延伸多久<b>都不可能产生更大级别中枢</b>；若连续多日开盘涨停，只形成一分钟级别<b>趋势</b>（可无限延伸），但只要仍只形成一分钟中枢，<b>都不足以形成五分钟中枢</b>——除非中途打开涨停。', fig: mfig('涨停延伸不升级', '<div style="font-size:12px;line-height:1.9;color:#1f2937">连续<b>一字涨停</b>：<br>1 分钟中枢<b style="color:#16a34a">延伸</b> / 1 分钟<b style="color:#2563eb">趋势</b><br>仍只是 1 分钟级别，<b style="color:#e74c3c">不升级</b></div>', '延伸与趋势都不升级；只有波动重叠才升级') },
        { term: '⑥ 恒星系统比喻（第20课）', text: '走势中枢就如<b>恒星</b>，围绕它的波动就如<b>行星</b>，构成一个「恒星系统」。两个同级别恒星系统要构成更大级别系统，<span class="hl">首先必然是其中至少外围行星之间发生关系</span>——这正是定理二（波动区间重叠）说的内容。', fig: mfig('恒星系统比喻', drawZS([{ p: 10 }, { p: 14 }, { p: 11 }, { p: 13 }, { p: 13.5 }, { p: 16 }, { p: 13 }, { p: 15 }], [{ lo: 11, hi: 13, x0: 0, x1: 3, label: '恒星A' }, { lo: 14, hi: 15, x0: 4, x1: 7, label: '恒星B' }], { w: 40, h: 104 }), '两系统外围「行星」先重叠 → 合成更大系统') },
      ]},
      { type: 'motivation', title: '为什么级别扩张是中枢理论的核心', text: '第 18 课把「走势类型延伸是否结束」归结为一个问题——<b>是否产生新的中枢</b>；第 20 课进一步把「是否产生更大级别中枢」归结为<b>两个同级别中枢的波动是否重叠</b>。这三条定理串起来，就回答了「这波上涨/下跌何时才算真正结束」：<span class="hl">在更大级别中枢产生之前，该级别走势类型必然延续</span>。这就是很多人「涨那么多还涨」的困惑的答案。' },
      { type: 'pitfalls', title: '常见误区', items: [
        '把<b>中枢延伸</b>（不产生新中枢）与<b>级别扩张</b>（波动重叠产生更大中枢）混为一谈。',
        '以为连续一字涨停能<b>升级出大级别中枢</b>（错：延伸与趋势都不会升级，只有波动重叠才升级）。',
        '把两个中枢<b>区间本身有重叠</b>当成级别扩张的充分条件（级别扩张要求的是<b>波动区间重叠</b>）。',
        '在更大级别中枢产生前就断定<b>走势已结束</b>（级别延续定理一：无更大中枢则延续）。',
      ]},
      { type: 'exercises', title: '练习', items: [
        { q: '中枢的三种演化分别是什么？各自判定依据？', a: '<b>延伸</b>（每次波动都触及中枢区间，不产生新中枢）；<b>新生</b>（某次波动不再触及，产生新中枢）；<b>级别扩张</b>（两个同级别中枢的波动区间重叠，形成更大级别中枢）。' },
        { q: '两个 5 分钟中枢，区间分别为 [11,13] 和 [14,16]，什么情况下会形成 30 分钟中枢？', a: '当<b>围绕它们的波动区间产生重叠</b>（例如前中枢波动上探 15、后中枢波动下探 13.5，重叠 [13.5,15]）时，按「级别延续定理二」形成<b>更大级别中枢</b>；若波动互不重叠，就只是趋势，不升级。' },
        { q: '为什么「涨了那么多还会继续涨」？', a: '按<b>级别延续定理一</b>：在更大级别中枢产生之前，该级别走势类型必然延续。只要还没形成更高级别中枢，日线级别的上涨就不会真正结束。' },
      ]},
    ],
  });
})();
