/* 第11章 三类买卖点 */
(function () {

  function optCh11() {
    const pts = [20, 15, 18, 14, 17, 11, 14, 10, 13, 8, 13, 10, 14, 12, 16, 13, 17, 14];
    const mk = (x0, x1, lo, hi, name) => [{ xAxis: x0, yAxis: lo, name }, { xAxis: x1, yAxis: hi }];
    const buys = [
      { coord: [9, 8], name: '第一类买点', color: '#16a34a' },
      { coord: [11, 10], name: '第二类买点', color: '#2563eb' },
      { coord: [17, 14], name: '第三类买点', color: '#9333ea' },
    ];
    const markPointData = buys.map(b => ({
      coord: b.coord, name: b.name, symbol: 'pin', symbolSize: 44,
      itemStyle: { color: b.color },
      label: { show: true, formatter: function (p) { return p.name; }, color: b.color, fontSize: 11, fontWeight: 'bold', position: 'bottom', distance: 24 },
    }));
    const mp = (i, name, color, pos) => ({ coord: [i, pts[i]], name, symbol: 'circle', symbolSize: 9, itemStyle: { color }, label: { show: true, color, fontSize: 10, position: pos, distance: 6, fontWeight: 'bold', formatter: function (p) { return p.name; } } });
    const seg = (x, y, name, color) => ({ coord: [x, y], name, symbol: 'none', label: { show: true, color, fontSize: 12, fontWeight: 'bold', position: 'top', formatter: function (p) { return p.name; } } });
    markPointData.push(
      mp(0, '顶·下跌起点', '#e74c3c', 'top'),
      mp(16, '顶·反弹高点', '#e74c3c', 'top'),
      seg(4.5, 20.5, '◀ 下跌趋势（2个中枢）', '#e74c3c'),
      seg(14.5, 19.5, '上涨趋势 ▶', '#16a34a'),
    );
    return {
      tooltip: { trigger: 'axis', axisPointer: { type: 'cross' } },
      grid: { left: 60, right: 70, top: 40, bottom: 40 },
      xAxis: { type: 'value', min: 0, max: 17, interval: 1 },
      yAxis: { type: 'value', scale: true, name: '价格' },
      series: [{
        name: '走势', type: 'line', data: pts.map((p, i) => [i, p]),
        symbol: 'circle', symbolSize: 4, lineStyle: { width: 2, color: '#1f2937' }, itemStyle: { color: '#1f2937' },
        markArea: {
          silent: true, itemStyle: { color: 'rgba(37,99,235,0.10)' },
          label: { show: true, position: 'insideTop', formatter: function (p) { return p.name || ''; }, color: '#2563eb', fontSize: 11 },
          data: [mk(1, 4, 15, 17, '下跌中枢A [15,17]'), mk(5, 8, 11, 13, '下跌中枢B [11,13]'), mk(12, 15, 13, 14, '上涨中枢C [13,14]')],
        },
        markLine: {
          silent: true, symbol: 'none',
          lineStyle: { color: '#2563eb', type: 'dashed', width: 1 },
          label: { show: true, position: 'end', formatter: function (p) { return p.name; }, color: '#2563eb', fontSize: 10 },
          data: [
            { yAxis: 17, name: 'ZG(A)=17' },
            { yAxis: 15, name: 'ZD(A)=15' },
            { yAxis: 14, name: 'ZG(C)=14' },
            { yAxis: 13, name: 'ZG(B)=ZD(C)=13' },
            { yAxis: 11, name: 'ZD(B)=11' },
          ],
        },
        markPoint: { data: markPointData },
      },
      backchiEffect([[9, 8]], '#16a34a', '第一类买点＝下跌趋势背驰点（中枢之下），背驰必然制造买卖点'),
      ],
    };
  }

  const figBuy3 = `
<div class="fig"><div class="lbl">第三类买点的构造（第20课）</div>${drawZS([{p:8,tag:'底'},{p:13,tag:'顶'},{p:10,tag:'底'},{p:14,tag:'顶'},{p:11,tag:'底'},{p:16,tag:'顶',label:'离开',color:'#2563eb'},{p:14,tag:'底',label:'三买',color:'#9333ea'}], [{lo:11,hi:13,x0:1,x1:4,label:'中枢 [11,13]'}], {zgzd:true,w:52,h:150})}<div class="cap">中枢 [11,13]（ZG=13 / ZD=11）<br>离开 11→16，回试 16→14 <b>不破 ZG</b><br>→ 第三类买点（14）</div></div>`;

  const figMerge = `
<div class="fig"><div class="lbl">第二、三类买点重合（第21课）</div>${drawZS([{p:15,tag:'顶'},{p:11,tag:'底'},{p:14,tag:'顶'},{p:12,tag:'底'},{p:8,tag:'底',label:'一买',color:'#16a34a'},{p:18,tag:'顶',label:'凌厉上破',color:'#2563eb'},{p:15,tag:'底',label:'二/三买',color:'#2563eb'}], [{lo:12,hi:14,x0:0,x1:3,label:'中枢 [12,14]'}], {zgzd:true,w:52,h:150})}<div class="cap">一类买点(8)后凌厉上破中枢 [12,14]（ZG=14 / ZD=12）<br>回抽 18→15 <b>不触及中枢</b><br>→ 二、三类买点重合（最强）</div></div>`;

  __chapters.push({
    id: 'ch15', vol: '卷四 · 背驰与买卖点', title: '第15章 三类买卖点', source: '原文第17、20、21课',
    figures: [
      { kind: 'echarts', title: '三类买点的全景位置', note: '下跌趋势（中枢 A、B）背驰出<b>第一类买点</b>（绿色，8）→ 第一次次级别回调出<b>第二类买点</b>（蓝色，10）→ 反弹后形成中枢 C，向上离开再回试不破 ZG 出<b>第三类买点</b>（紫色，14）。三类买点分别对应<b>中枢下（转折）、任意位（回调）、中枢上（新生/扩张）</b>。卖点方向相反。', option: optCh11 },
      { kind: 'html', title: '第三类买点：离开中枢 + 回试不破 ZG', note: '次级别走势<b>向上离开</b>中枢后，次级别<b>回试不跌破 ZG</b>，就构成第三类买点。它的本质是“中枢新生或扩张”的信号，其后必然赢利。', html: figBuy3 },
      { kind: 'html', title: '第二、三类买点重合：最强信号', note: '第一类买点后，次级别走势<b>凌厉直接上破</b>最后一个中枢，随后回抽<b>不触及</b>该中枢，就出现第二、三类买点重合（第21课）。此时往往意味着一波大级别上涨的开始。', html: figMerge },
    ],
    sections: [
      { type: 'definition', title: '买卖点的完备性', items: [
        { term: '① 买卖点完备性定理（第21课）', text: '<span class="hl">市场必然产生赢利的买卖点，只有第一、二、三类。</span>这三类买卖点都是<b>被理论所保证的、100% 安全</b>的买卖点——之后市场必然发生转折，没有任何模糊或需要分辨的情况。', formula: '赢利买卖点 = 第一类 + 第二类 + 第三类（仅此三类）', fig: mfig('仅三类赢利买卖点', '<div style="font-size:12px;line-height:1.9;color:#1f2937"><b style="color:#16a34a">一</b>·<b style="color:#2563eb">二</b>·<b style="color:#9333ea">三</b> 类买卖点 = 全部</div>', '100% 安全，仅此三类') },
        { term: '② 升跌完备性定理（第21课）', text: '<span class="hl">市场中的任何向上与下跌，都必然从三类买卖点中的某一类开始以及结束。</span>换言之，市场走势完全由这样的线段构成，线段的端点就是某级别的某类买卖点。', fig: mfig('涨跌都始于/终于买卖点', '<div style="font-size:12px;line-height:1.9;color:#1f2937">任何<b>上涨/下跌</b>：<br><b style="color:#16a34a">始于</b>某类买卖点 · <b style="color:#e74c3c">终于</b>某类买卖点</div>', '走势 = 买卖点连成的线段') },
        { term: '③ 买卖点与中枢的关系（第21课）', text: '所有买卖点都对应着与该级别<b>最靠近的中枢</b>的关系：<b>中枢下</b>产生（转折）→ 第一类买点；<b>中枢上</b>产生（延续/新生/扩张）→ 第三类买点；第二类买点<b>可在任何位置</b>（上/中/下）。<span class="hl">一个上涨趋势确立后，不可能再有第一、二类买点，只可能有第三类买点。</span>', fig: mfig('三类买点与中枢位置', drawZS([{ p: 8, label: '一买(下)', color: '#16a34a' }, { p: 13, tag: '顶' }, { p: 11, label: '二买(任意)', color: '#2563eb' }, { p: 14, tag: '顶' }, { p: 12 }, { p: 16, tag: '顶' }, { p: 14, label: '三买(上)', color: '#9333ea' }], [{ lo: 12, hi: 13, x0: 1, x1: 4, label: '中枢' }], { w: 34, h: 104 }), '下=一买、任意=二买、上=三买') },
      ]},
      { type: 'definition', title: '三类买点详解', items: [
        { term: '① 第一类买点（第17、24课）', text: '只有<b>下跌确立后</b>的中枢下方才可能出现买点，这就是第一类买点——它由<b>下跌趋势的背驰</b>精确制造（背驰-买卖点定理）。下跌走势完成后只能转为上涨或盘整，故此处买入占据最有利位置。', formula: '第一类买点 = 下跌趋势背驰点（中枢之下）', fig: mfig('第一类买点：下跌背驰点', drawZS([{ p: 20, tag: '顶' }, { p: 15 }, { p: 18 }, { p: 14 }, { p: 17 }, { p: 11 }, { p: 14 }, { p: 10 }, { p: 13 }, { p: 8, tag: '底', label: '一买' }], [{ lo: 15, hi: 17, x0: 1, x1: 4, label: 'A' }, { lo: 11, hi: 13, x0: 5, x1: 8, label: 'B' }], { w: 28, h: 96 }), '下跌趋势背驰点（中枢之下）') },
        { term: '② 第二类买点（第17课）', text: '第一类买点出现后，必然只会出现<b>盘整或上涨</b>；其后的<b>第一段次级别回调制造的低点</b>就是第二类买点。因为上涨与盘整都至少包含三个以上次级别运动（走势必完美），其后<b>必还有一次向上的次级别运动</b>，所以绝对安全。', formula: '第二类买点 = 第一类买点后第一次次级别回调低点', fig: mfig('第二类买点：第一次回调低点', drawZS([{ p: 8, tag: '底', label: '一买' }, { p: 13 }, { p: 10, tag: '底', label: '二买' }, { p: 15 }, { p: 12 }], [], { w: 40, h: 100 }), '一买(8)后第一次次级别回调低点(10)=二买') },
        { term: '③ 第三类买点（第20课）', text: '<span class="hl">一个次级别走势类型向上离开中枢，然后以一个次级别走势类型回试，其低点不跌破 ZG，则构成第三类买点。</span>（卖点：向下离开后回抽不升破 ZD。）它是<b>中枢新生或扩张</b>的产物。', formula: '第三类买点 = 离开中枢后回试不破 ZG（中枢之上）', fig: mfig('第三类买点：回试不破 ZG', drawZS([{ p: 8, tag: '底' }, { p: 13, tag: '顶' }, { p: 10 }, { p: 14, tag: '顶' }, { p: 11 }, { p: 16, tag: '顶' }, { p: 14, label: '三买', color: '#9333ea' }], [{ lo: 11, hi: 13, x0: 1, x1: 4, label: '中枢' }], { w: 34, h: 104, zgzd: true }), '离开中枢(11→16)后回试不破 ZG=13 → 三买(14)') },
        { term: '④ 第三类买点的两种结果（第21课）', text: '第三类买点后必然出现两种情况：<b>中枢新生</b>→ 形成上涨趋势；<b>中枢扩张</b>→ 形成更大级别中枢。无论哪种，只要第三类买点条件符合，<b>其后都必然赢利</b>（区别只是上涨趋势更直接、更诱人）。', fig: mfig('三买后两种演化', '<div style="font-size:12px;line-height:1.9;color:#1f2937">三买 → <b style="color:#16a34a">中枢新生</b>（上涨趋势）<br>三买 → <b style="color:#f59e0b">中枢扩张</b>（更大中枢）</div>', '两种都必然赢利') },
        { term: '⑤ 二、三类买点重合（第21课）', text: '第一类买点出现后，若次级别走势<b>凌厉直接上破</b>前下跌的最后一个中枢，并在其上<b>回抽不触及</b>该中枢，就出现<b>第二、三类买点重合</b>。只有这两种买点可能重合（一类与二类前后出现、一类与三类一上一下，均不可能重合）。', fig: mfig('二、三类买点重合', drawZS([{ p: 15, tag: '顶' }, { p: 11 }, { p: 14, tag: '顶' }, { p: 12 }, { p: 8, tag: '底', label: '一买' }, { p: 18, tag: '顶' }, { p: 15, label: '二/三买', color: '#2563eb' }], [{ lo: 12, hi: 14, x0: 0, x1: 3, label: '中枢' }], { w: 34, h: 104 }), '一买(8)后凌厉上破中枢，回抽(15)不触及 → 重合') },
        { term: '⑥ 卖点反之亦然', text: '把方向反过来，三类<b>卖点</b>对称成立：第一类卖点＝上涨趋势背驰点；第二类卖点＝第一类卖点后第一次次级别反弹高点；第三类卖点＝离开中枢后回抽不升破 ZD。', fig: mfig('卖点：方向相反', '<div style="font-size:12px;line-height:1.9;color:#1f2937"><b style="color:#e74c3c">一卖</b>=上涨背驰点<br><b style="color:#e74c3c">二卖</b>=一卖后首次反弹高点<br><b style="color:#e74c3c">三卖</b>=离开中枢回抽不升破 ZD</div>', '三类卖点与买点完全对称') },
      ]},
      { type: 'motivation', title: '三类买卖点让理论“闭环”', text: '缠论从“走势必完美”出发，经过中枢、走势类型、级别、背驰，最终落到<b>三类买卖点</b>——这是整个理论的<b>可操作终极目标</b>。完备性定理保证：市场盈利的买卖点<b>只有且仅有</b>这三类，且 100% 安全。学到这一步，理论就从一个“描述系统”变成了一个“<b>可执行的交易系统</b>”。' },
      { type: 'pitfalls', title: '常见误区', items: [
        '在<b>上涨趋势确立后</b>还去找第一、二类买点（错：上涨趋势里只可能有第三类买点）。',
        '搞混三类买点与中枢的<b>位置关系</b>：一类在中枢<b>下</b>、三类在中枢<b>上</b>、二类任意。',
        '以为第三类买点后<b>必然快速上涨</b>（可能是中枢扩张成更大级别中枢，横盘一段时间）。',
        '只研究买点<b>忘了卖点</b>（卖点与买点完全对称，同样三类、同样 100% 安全）。',
      ]},
      { type: 'exercises', title: '练习', items: [
        { q: '三类买点分别是什么？各自对应与中枢的什么位置关系？', a: '第一类＝<b>下跌趋势背驰点</b>（中枢之下，转折）；第二类＝第一类买点后<b>第一次次级别回调低点</b>（位置任意）；第三类＝<b>离开中枢后回试不破 ZG</b>（中枢之上，新生/扩张）。' },
        { q: '为什么只有第二、三类买点能重合？', a: '一类与二类前后相继出现、一类与三类一在下一在上，都不可能重合。只有“一类买点后凌厉上破中枢、回抽不触及中枢”时，回抽低点同时是二类（第一次回调）与三类（回试不破中枢），才会重合。' },
        { q: '第三类买点出现后，走势必然怎么走？', a: '必然<b>赢利</b>，但有两种演化：<b>中枢新生</b>（上涨趋势）或<b>中枢扩张</b>（更大级别中枢）。前者更直接，后者会先横盘。' },
      ]},
    ],
  });
})();
