/* 第10章 背驰 */
(function () {

  function optCh10() {
    const pts = [8, 13, 10, 14, 11, 17, 14, 18, 15, 21];
    const mk = (x0, x1, lo, hi, name) => [{ xAxis: x0, yAxis: lo, name }, { xAxis: x1, yAxis: hi }];
    const segMacd = [4, -1, 2, -1, 5, -1, 2, -1, 2];
    const barData = segMacd.map((v, i) => ({
      value: [i + 0.5, v],
      itemStyle: { color: v >= 0 ? '#e74c3c' : '#16a34a' },
    }));
    return {
      tooltip: { trigger: 'axis', axisPointer: { type: 'cross' } },
      grid: [
        { left: 60, right: 30, top: 40, height: 220 },
        { left: 60, right: 30, top: 310, height: 100 },
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
            data: [mk(1, 4, 11, 13, '中枢A'), mk(5, 8, 15, 17, '中枢B')],
          },
        },
        { name: 'MACD', type: 'bar', xAxisIndex: 1, yAxisIndex: 1, data: barData, barWidth: '55%' },
      ],
    };
  }

  const figPan = `
<div class="fig"><div class="lbl">盘整背驰（一个中枢）</div>${drawZS([{p:8,tag:'底'},{p:13,tag:'顶'},{p:10,tag:'底'},{p:14,tag:'顶'},{p:11,tag:'底'},{p:16,tag:'顶'},{p:14,tag:'底'}], [{lo:11,hi:13,x0:1,x1:4}])}<div class="cap">C段 11→16 上破中枢但力度弱<br>回跌 16→14 <b>不破中枢</b> → 第三类买点</div></div>
<div class="fig"><div class="lbl">趋势背驰（两个中枢）</div>${drawZS([{p:8,tag:'底'},{p:13,tag:'顶'},{p:10,tag:'底'},{p:14,tag:'顶'},{p:11,tag:'底'},{p:17,tag:'顶'},{p:14,tag:'底'},{p:18,tag:'顶'},{p:15,tag:'底'},{p:21,tag:'顶'}], [{lo:11,hi:13,x0:1,x1:4},{lo:15,hi:17,x0:5,x1:8}])}<div class="cap">c段 15→21 创新高但力度弱<br>背驰后<b>至少回拉中枢B</b> [15,17]</div></div>`;

  const figTurn = `
<div class="fig"><div class="lbl">下跌趋势背驰（第一类买点）</div>${drawZS([{p:20,tag:'顶'},{p:15},{p:18},{p:14},{p:17},{p:11},{p:14},{p:10},{p:13},{p:8,tag:'底'}], [{lo:15,hi:17,x0:1,x1:4},{lo:11,hi:13,x0:5,x1:8}])}<div class="cap">c段 13→8 创新低但力度弱<br>8 处即<b>第一类买点</b>（背驰点）</div></div>
<div class="fig" style="min-width:280px"><div class="lbl">背驰后三种转折（第29课）</div><ol class="turn"><li><b>级别扩展</b>：反弹最弱，只触及 B中枢 DD=10</li><li><b>更大级别盘整</b>：反弹回 B中枢，横向扩展</li><li><b>以上级别反趋势</b>：反弹强，直接转上涨</li></ol><div class="cap">判别关键：看反弹的第一个次级别走势<br>是否<b>回抽进最后一个中枢</b></div></div>`;

  __chapters.push({
    id: 'ch10', title: '第10章 背驰', source: '原文第24、29、37课',
    figures: [
      { kind: 'echarts', title: '趋势背驰的 MACD 判断', note: '上涨趋势 <b>a+A+b+B+c</b>：c 段创出<b>新高</b>（21＞17），但下方 MACD 红柱<b>c 段面积明显小于 b 段</b>——价格新高、动能却减弱，这就是<span class="hl">趋势背驰</span>。其后<b>至少回拉中枢 B</b>。（下方柱形：红柱＝上涨动能、绿柱＝回调；注意 b 段第5根红柱高、c 段第9根红柱矮。）', option: optCh10 },
      { kind: 'html', title: '盘整背驰 vs 趋势背驰', note: '<b>盘整背驰</b>只有一个中枢，C 段破中枢但力度弱，回跌不破中枢就构成<b>第三类买点</b>；<b>趋势背驰</b>有两个中枢，背驰后回跌<b>至少回中枢 B</b>。', html: figPan },
      { kind: 'html', title: '背驰后的三种转折', note: '第29课<b>背驰-转折定理</b>：趋势背驰后，反弹只有三种可能，力度从弱到强依次是“级别扩展→更大级别盘整→反趋势”。判别关键：<b>反弹的第一个次级别走势能否回抽进最后一个中枢</b>。', html: figTurn },
    ],
    sections: [
      { type: 'definition', title: '背驰的定义与 MACD 判断', items: [
        { term: '① 背驰-买卖点定理（第24课）', text: '<span class="hl">任一背驰都必然制造某级别的买卖点；任一级别的买卖点都必然源自某级别走势的背驰。</span>即：看到背驰，必意味着要逆转（逆转≠永远反转，可能只是某级别的一段回拉）。' },
        { term: '② 背驰的前提：两段同向趋势（第24课）', text: '用 MACD 判断背驰，首先要有<b>两段同向的趋势</b>。同向趋势之间必有一个盘整或反向趋势连接，把这三段分别称为 A、B、C 段；其中 <b>B 的中枢级别比 A、C 里的中枢级别都大</b>（否则它们就连成一个大趋势了）。' },
        { term: '③ 标准背驰的 MACD 判据（第24课）', text: 'A、B、C 段在一个大趋势里，A 之前已有一个中枢，B 是另一个中枢——<b>B 中枢一般会把 MACD 黄白线（DIFF、DEA）回拉到 0 轴附近</b>；当 C 段走势类型完成时，其对应的<b>MACD 柱子面积（向上看红柱、向下看绿柱）比 A 段面积小</b>，就构成标准背驰。', formula: '背驰 ⟺ 黄白线回拉0轴 + C段MACD柱面积 < A段' },
        { term: '④ a+A+b+B+c 结构（第29课）', text: '趋势的最一般结构是 <code>a+A+b+B+c</code>：A、B 是两个同向中枢，a、b、c 是连接段（级别最多为次级别，极端情况只是一个缺口）。<b>背驰比较的是 c 段与 b 段的力度</b>：c 段创新高/新低，但 MACD 面积小于 b 段。' },
        { term: '⑤ 背驰后必回拉中枢（第24课）', text: '<span class="hl">一旦出现趋势背驰，其回跌一定至少重新回到 B 段（最后一个中枢）里。</span>这可以预先知道“至少的跌幅/涨幅”，是背驰最重要的实战价值。' },
      ]},
      { type: 'definition', title: '盘整背驰与背驰后的转折', items: [
        { term: '① 盘整背驰（第24课）', text: '不特别声明时，“背驰”都指<b>趋势背驰</b>；盘整中用类似方法判断，称<b>盘整背驰</b>。向上盘整为例：若 C 段<b>不破中枢</b>且 MACD 面积小于 A 段 → 其后必回跌；若 C 段<b>上破中枢</b>但面积小 → 先出来，其后回跌<b>不重新跌回中枢</b>就在次级别第一类买点回补（这正好构成<b>第三类买点</b>），跌回则继续盘整。' },
        { term: '② 背驰-转折定理（第29课）', text: '<span class="hl">某级别趋势的背驰，将导致该趋势最后一个中枢的级别扩展、该级别更大级别的盘整、或该级别以上级别的反趋势。</span>三种情况完全分类了背驰后的力度与级别。', formula: '趋势背驰 → ① 最后中枢级别扩展 ② 更大级别盘整 ③ 以上级别反趋势' },
        { term: '③ 三种转折详解（第29课）', text: '<b>① 级别扩展</b>（最弱）：反弹只触及最后一个中枢的 DD，把中枢扩成更大级别，走势尚未完成；<b>② 更大级别盘整</b>：反弹至少回抽最后一个中枢，走出“下跌+盘整”；<b>③ 以上级别反趋势</b>：反弹强，走出“下跌+上涨”。判别关键：看<b>反弹第一个次级别走势是否回抽进最后一个中枢</b>。' },
        { term: '④ 转折是有级别的（第29课）', text: '围绕某级别中枢的震荡/延续中<b>不存在转折问题</b>，只有站在次级别才有转折。上涨的转折有两种（下跌与盘整），下跌的转折也有两种（上涨与盘整）。' },
        { term: '⑤ MACD 的局限性（第24课）', text: '由于 MACD 本身的局限，要<b>精确</b>判断背驰与盘整背驰，还是要<b>从中枢本身出发</b>。光用 MACD 辅助判断，准确率 90% 以上；<b>配合中枢，是 100% 绝对的</b>（可用纯数学推理证明）。' },
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
