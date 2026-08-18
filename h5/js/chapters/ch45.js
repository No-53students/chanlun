/* 第45章 一夜情行情 · 暴跌牛市的一夜情 */
(function () {

  // ---- 主图1：当日走势分类（8 根 30 分钟 K 线，平衡市中的中枢震荡）----
  function optCh45() {
    const bars = [
      { o: 10.0, c: 10.4, l: 9.9, h: 10.5 },
      { o: 10.4, c: 10.6, l: 10.2, h: 10.8 },
      { o: 10.6, c: 10.4, l: 10.1, h: 10.7 },
      { o: 10.4, c: 9.9, l: 9.8, h: 10.0 },
      { o: 9.9, c: 9.5, l: 9.4, h: 9.9 },
      { o: 9.5, c: 9.3, l: 9.2, h: 9.6 },
      { o: 9.3, c: 9.6, l: 9.1, h: 9.7 },
      { o: 9.6, c: 10.2, l: 9.5, h: 10.3 },
    ];
    const times = ['9:30', '10:00', '10:30', '11:00', '13:00', '13:30', '14:00', '14:30'];
    const mkA = function (x0, x1, lo, hi, name) { return [{ xAxis: x0, yAxis: lo }, { xAxis: x1, yAxis: hi, name: name }]; };
    const seg = function (x, y, name, color) {
      return { coord: [x, y], name: name, symbol: 'none', label: { show: true, color: color, fontSize: 11, fontWeight: 'bold', position: 'top', formatter: function (p) { return p.name; } } };
    };
    return {
      tooltip: { trigger: 'axis', axisPointer: { type: 'cross' } },
      grid: { left: 48, right: 24, top: 30, bottom: 44 },
      xAxis: { type: 'category', data: times, axisLabel: { interval: 0, fontSize: 10 } },
      yAxis: { type: 'value', scale: true, name: '价格' },
      series: [{
        name: '30分钟K线', type: 'candlestick', data: bars.map(function (k) { return [k.o, k.c, k.l, k.h]; }),
        barWidth: 0.5, itemStyle: { color: upColor, color0: downColor, borderColor: upColor, borderColor0: downColor },
        markArea: {
          silent: true, itemStyle: { color: 'rgba(37,99,235,0.10)' },
          label: { show: true, position: 'insideTop', formatter: function (p) { return p.name || ''; }, color: '#2563eb', fontSize: 11 },
          data: [mkA(0, 2, 10.2, 10.5, '当日中枢 [10.2,10.5]')],
        },
        markLine: {
          silent: true, symbol: 'none', lineStyle: { color: '#2563eb', type: 'dashed', width: 1 },
          label: { show: true, position: 'end', formatter: function (p) { return p.name; }, color: '#2563eb', fontSize: 10 },
          data: [
            { yAxis: 10.5, name: 'ZG=10.5' },
            { yAxis: 10.2, name: 'ZD=10.2' },
          ],
        },
        markPoint: { data: [
          { coord: [3, 10.0], name: '11:08 反抽不破 ZD → 三卖', symbol: 'pin', symbolSize: 38, itemStyle: { color: '#e74c3c' }, label: { show: true, color: '#b91c1c', fontSize: 10, position: 'top', formatter: function (p) { return p.name; } } },
          { coord: [6, 9.1], name: '分笔背驰（绿柱缩短）', symbol: 'pin', symbolSize: 30, itemStyle: { color: '#16a34a' }, label: { show: true, color: '#15803d', fontSize: 10, position: 'bottom', formatter: function (p) { return p.name; } } },
          seg(6.6, 10.6, '强力回拉中枢', '#2563eb'),
        ] },
      }],
    };
  }

  // ---- 主图2：暴跌后按级别应对 ----
  const figCrash = `
<div class="fig" style="min-width:340px"><div class="lbl">暴跌是牛市的一夜情：大级别中枢未破，暴跌就是机会</div>
${drawZS(
  [{ p: 10, tag: '底' }, { p: 15, tag: '顶' }, { p: 12, tag: '底' }, { p: 17, tag: '顶' }, { p: 12.5, tag: '底', label: '暴跌', color: '#e74c3c' }, { p: 18, tag: '顶' }],
  [{ lo: 12, hi: 15, x0: 0, x1: 5, label: '大级别中枢（未破）' }],
  { zgzd: true, w: 52, h: 160 }
)}
<div class="cap">暴跌来势猛烈（<b>419 化</b>），但<b>大级别中枢未破</b>，只是次级别调整。<span class="hl">真正的大顶都是反复冲击出来的，V 型顶基本不构成真顶</span>——对操作者而言，暴跌是<b>降成本、增筹码</b>的机会，而不是逃命的理由。</div></div>`;

  // ---- 讲解点小图 ----
  const figBars = mfig('一天 = 8 根 30 分钟 K 线',
    klineSVG([mk(10, 10.8, true), mk(10.1, 10.9, true), mk(9.8, 10.7, true), mk(9.5, 10.2, false), mk(9.6, 10.1, true), mk(9.4, 10.0, false), mk(9.7, 10.4, true), mk(9.6, 10.3, true)], { w: 24, h: 92 }),
    '4 小时交易 = 8 个 30 分钟 K 线，构成一日系统');

  const figOne = mfig('一个中枢 = 平衡市',
    drawZS([{ p: 10, tag: '底' }, { p: 14, tag: '顶' }, { p: 12, tag: '底' }, { p: 13, tag: '顶' }, { p: 11, tag: '底' }],
      [{ lo: 12, hi: 13, x0: 0, x1: 4, label: '当日中枢' }], { w: 42, h: 104 }),
    '前三根 30 分钟 K 线决定全天高低点');

  const figTwo = mfig('两个中枢 / 无中枢',
    '<div style="font-size:12px;line-height:1.9;color:#1f2937">两个中枢 → 中间<b>单边区间</b><br>无中枢 → <b>最强单边</b>（如 227）<br>力度依次趋强</div>',
    '单边区间是其后走势的关键位置');

  const figSell = mfig('第三类卖点 = 最后离开机会',
    drawZS([{ p: 10, tag: '底' }, { p: 13, tag: '顶' }, { p: 11.5, tag: '底' }, { p: 12.8, tag: '顶', label: '跌破5日线' }, { p: 11, tag: '底', label: '反抽=三卖', color: '#e74c3c' }, { p: 8, tag: '底' }],
      [{ lo: 11.5, hi: 13, x0: 0, x1: 3, label: '前日中枢' }], { zgzd: true, w: 40, h: 104 }),
    '跌破 5 日线后反抽不升破 ZD → 三卖');

  const figSym = mfig('中枢震荡的对称性 + 力度比较',
    drawZS([{ p: 12, tag: '顶' }, { p: 9, tag: '底' }, { p: 11, tag: '顶' }, { p: 10, tag: '底' }, { p: 8.5, tag: '底', label: '分笔背驰', color: '#16a34a' }],
      [{ lo: 10, hi: 11, x0: 1, x1: 4, label: '中枢' }], { w: 42, h: 104 }),
    '比较中枢前后两段下跌的 MACD 绿柱面积');

  const figCrash2 = mfig('暴跌 = 降成本、增筹码的机会',
    '<div style="font-size:12px;line-height:1.9;color:#1f2937">暴跌猛烈而刺激（<b>419 化</b>）<br>大级别中枢<b>未破</b> → 是机会<br><span class="hl">成本为 0 前降成本，0 后增筹码</span></div>',
    '每一次震荡都是降成本、增筹码的机会');

  const figLevel = mfig('按级别把握一夜情',
    '<div style="font-size:12px;line-height:1.9;color:#1f2937">日线一夜情把握不住<br>→ 去把握<b>周线 / 月线</b>（精度要求低）<br><span class="kw">一夜情也是有级别的</span></div>',
    '给自己安排力所能及的活动');

  __chapters.push({
    id: 'ch45', vol: '卷九 · 实战操作与图解', title: '第45章 一夜情行情 · 暴跌牛市的一夜情', source: '原文第46、47、48课',
    figures: [
      { kind: 'echarts', title: '当日走势分类：平衡市中的中枢震荡', note: '一天交易 4 小时 = <b>8 根 30 分钟 K 线</b>。前三根 30 分钟 K 线构成<b>当日中枢 [10.2,10.5]</b>；跌破 5 日线后反抽（11:08）不升破 ZD，构成<span class="kw">第三类卖点</span>——这是被理论保障的<b>最后离开机会</b>。其后下跌，比较中枢前后两段 MACD 绿柱面积，后者力度不大，分笔背驰（绿柱缩短）即引发<span class="hl">强力回拉中枢</span>。', option: optCh45 },
      { kind: 'html', title: '暴跌是牛市的一夜情：按级别应对', note: '第48课：牛市中的暴跌（如 96 年 12 月）猛烈而刺激，<b>419 化</b>，但<span class="hl">所有真正的大顶都是反复冲击出来的，V 型顶在大型走势中基本不构成真顶</span>。只要<b>大级别中枢未破</b>，暴跌对操作者就是<b>降成本、增筹码</b>的机会；把握一夜情要<b>按级别</b>来——日线把握不住，就去把握周线、月线。', html: figCrash },
    ],
    sections: [
      { type: 'definition', title: '当日走势分类：8 根 30 分钟 K 线（第46课背景）', items: [
        { term: '① 一天 = 8 根 30 分钟 K 线', text: '一天交易 4 小时，等于有 <b>8 个 30 分钟 K 线</b>组成的系统。把 3 根相邻 30 分钟 K 线的重叠部分当作当日走势的一个中枢，任一天的走势无非三类：<b>一个中枢 / 两个中枢 / 没有中枢</b>，<span class="hl">力度依次趋强</span>。', fig: figBars },
        { term: '② 一个中枢 = 平衡市', text: '典型的<b>平衡市</b>：一般开盘后<b>前三根 30 分钟 K 线</b>就决定全天波动区间，全天高低点至少一个落在这三根上（不是创当天高点，就是创当天低点）。按高点/低点出现在前三根还是后面，可细分弱平衡、强平衡、转折平衡。', fig: figOne },
        { term: '③ 两个中枢 / 无中枢', text: '两个中枢之间必有一段<b>单边区间</b>（至少一根 30 分钟 K 线不从属任一中枢），是其后走势的<b>关键位置</b>；变盘时间多在中午收盘前后 30 分钟内。<b>没有中枢</b>是最强单边（8 根 K 线无相邻 3 根重叠，如 227），但骗线也常借此构成。', fig: figTwo },
      ]},
      { type: 'definition', title: '一夜情行情的当下分析（第47、48课）', items: [
        { term: '④ 第三类卖点 = 最后的离开机会', text: '47 课范例：跌破 5 日线后有一个反抽，在 11:08 刚好构成对前一天中枢的<b>第三类卖点</b>，<span class="hl">这是被理论保障的最后离开机会</span>。其后下跌里，除最后一个位置外所有卖出都对，但那与理论无关，类似赌博。', fig: figSell },
        { term: '⑤ 中枢震荡的对称性 + 力度比较', text: '用<b>中枢震荡</b>看盘：比较中枢前后两段下跌的 MACD 绿柱面积，后者力度不大于前者，就能断言会有<b>强力回拉</b>。<span class="kw">中枢震荡都有对称性</span>，大级别下的一个分笔背驰，足以引发盘中大幅回拉。', fig: figSym },
        { term: '⑥ 暴跌是牛市的一夜情', text: '牛市中的暴跌猛烈而刺激，<b>419 化</b>。但<span class="hl">所有真正的大顶都是反复冲击出来的，V 型顶在大型走势中基本不构成真顶</span>。暴跌对空头只是嘴上快感，对操作者是<b>降成本、增筹码</b>的机会。', fig: figCrash2 },
        { term: '⑦ 按级别把握一夜情', text: '把握一夜情要<b>按级别</b>：日线一夜情把握不住，就去把握周线、月线的（对技术精确度要求低）。<span class="kw">一夜情也是有级别的</span>，在各级别的一夜情中游刃有余，是对技术把握度的考验。', fig: figLevel },
      ]},
      { type: 'motivation', title: '把暴跌当成机会，而不是灾难', text: '第47课示范了一次<b>纯逻辑、零预测</b>的当日分析：8 根 30 分钟 K 线、一个当日中枢、一次三卖、一次分笔背驰，每一步都是当下可判的完全分类。第48课则把格局拉大：<b>牛市中的暴跌只是一夜情</b>，大级别中枢不破，就谈不上转势。<span class="hl">操作者的最高境界，是等大牛市真正结束时，手里筹码最多而成本为 0</span>——每一次震荡，都是降成本、增筹码的机会。恐惧源于看不清级别，看清了，暴跌就不再可怕。' },
      { type: 'pitfalls', title: '常见误区', items: [
        '以为<b>暴跌就是牛市的终结</b>（错：大级别中枢未破，暴跌只是次级别调整的一夜情）。',
        '把<b>跌破 5 日线后的反抽</b>当买点（错：反抽不升破 ZD 是<b>三卖</b>，是最后的离开机会）。',
        '以为<b>V 型顶能构成真正的顶部</b>（错：大型走势的真顶都是反复冲击出来的）。',
        '<b>只看一个级别的背驰</b>就重仓抄底（错：要比较中枢前后力度、按级别把握一夜情）。',
        '把<b>当日走势分类</b>当严格操作依据（错：它只是辅助，按某级别严格操作则每天怎么走关系不大）。',
      ]},
      { type: 'exercises', title: '练习', items: [
        { q: '一天的走势（8 根 30 分钟 K 线）可分成哪三类？力度如何排序？', a: '三类：<b>一个中枢</b>（平衡市）、<b>两个中枢</b>（中间有单边区间）、<b>没有中枢</b>（最强单边）。<b>力度依次趋强</b>（无中枢最强）。' },
        { q: '为什么说“第三类卖点是最后的离开机会”？', a: '跌破 5 日线后反抽不升破前日中枢的 ZD，构成<b>三卖</b>，这是<b>被理论保障</b>的离开位置；其后下跌里除最后一个位置外所有卖出都对，但那是赌博，不属理论的把握范围。' },
        { q: '为什么说“暴跌是牛市的一夜情”？', a: '牛市调整的宣泄<b>419 化</b>——猛烈而刺激，但<b>所有真正的大顶都是反复冲击出来的</b>，V 型顶基本不构成真顶。只要<b>大级别中枢未破</b>，暴跌就是<b>降成本、增筹码</b>的机会。' },
      ]},
    ],
  });
})();
