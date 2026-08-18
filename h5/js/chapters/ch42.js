/* 第42章 均线轮动与板块强弱 */
(function () {

  // ---- 主图1：均线空头排列 → 多头排列（8 条均线的分类监控）----
  function optCh42() {
    const n = 48;
    const price = [];
    for (let i = 0; i < n; i++) {
      // 前 24 根下跌（空头排列），后 24 根上涨（多头排列）
      if (i < 24) price.push(+(30 - i * 0.42 + Math.sin(i * 1.3) * 1.1).toFixed(2));
      else price.push(+(18 + (i - 24) * 0.55 + Math.sin(i * 1.1) * 0.8).toFixed(2));
    }
    const kdata = price.map((c, i) => {
      const o = i === 0 ? +(c - 0.3).toFixed(2) : price[i - 1];
      return [+o, +c, +(Math.min(o, c) - 0.45).toFixed(2), +(Math.max(o, c) + 0.45).toFixed(2)];
    });
    const ma = function (w) {
      return price.map(function (v, i) {
        if (i < w - 1) return null;
        let s = 0; for (let k = i - w + 1; k <= i; k++) s += price[k];
        return +(s / w).toFixed(2);
      });
    };
    const maLine = function (name, w, color) {
      return { name: name, type: 'line', data: ma(w).map(function (v, i) { return [i, v]; }), symbol: 'none', connectNulls: false, lineStyle: { color: color, width: 1.6 }, itemStyle: { color: color }, z: 10 };
    };
    const seg = function (x, y, name, color) {
      return { coord: [x, y], name: name, symbol: 'none', label: { show: true, color: color, fontSize: 12, fontWeight: 'bold', position: 'top', formatter: function (p) { return p.name; } } };
    };
    return {
      tooltip: { trigger: 'axis', axisPointer: { type: 'cross' } },
      legend: { data: ['K线', 'MA5', 'MA21', 'MA55'], top: 4 },
      grid: { left: 48, right: 24, top: 40, bottom: 40 },
      xAxis: { type: 'value', min: 0, max: n - 1, interval: 4 },
      yAxis: { type: 'value', scale: true, name: '价格' },
      series: [
        { name: 'K线', type: 'candlestick', data: kdata, barWidth: 0.55, itemStyle: { color: upColor, color0: downColor, borderColor: upColor, borderColor0: downColor },
          markPoint: { data: [
            seg(6, 33.5, '空头排列：短均线在下、长均线在上', downColor),
            seg(40, 33.5, '多头排列：短均线在上、长均线在下', upColor),
            { coord: [23, 18.5], name: '均线由空转多', symbol: 'none', label: { show: true, color: '#9333ea', fontSize: 11, fontWeight: 'bold', formatter: function (p) { return p.name; } } },
          ] },
          markLine: { silent: true, symbol: 'none', label: { show: true, position: 'insideEndTop', formatter: function (p) { return p.name; }, fontSize: 10, color: '#6b7280' }, data: [
            { name: '转折区', xAxis: 23, lineStyle: { color: '#9ca3af', type: 'dashed', width: 1 } },
          ] } },
        maLine('MA5', 5, '#f59e0b'),
        maLine('MA21', 21, '#2563eb'),
        maLine('MA55', 55, '#9333ea'),
      ],
    };
  }

  // ---- 主图2：板块轮动的强弱分层 ----
  const figBoard = `
<div class="fig" style="min-width:360px"><div class="lbl">板块强弱分层：缠中说禅板块强弱指标（平均类别数越大越强）</div>
<div style="font-size:12.5px;line-height:1.9;color:#1f2937">
<span style="display:inline-block;background:#fee2e2;color:#991b1b;padding:3px 10px;border-radius:5px;font-weight:bold">金融 8.2</span>　领涨
<span style="color:#e74c3c;font-size:20px">→</span>
<span style="display:inline-block;background:#fef3c7;color:#92400e;padding:3px 10px;border-radius:5px;font-weight:bold">有色 6.4</span>　跟涨
<span style="color:#f59e0b;font-size:20px">→</span>
<span style="display:inline-block;background:#e0e7ff;color:#3730a3;padding:3px 10px;border-radius:5px;font-weight:bold">医药 4.6</span>　滞涨
<span style="color:#2563eb;font-size:20px">→</span>
<span style="display:inline-block;background:#f0fdf4;color:#166534;padding:3px 10px;border-radius:5px;font-weight:bold">地产 3.1</span>　补涨
</div>
<div class="cap">把每个板块内个股的<b>类别数平均</b>，得到<b>缠中说禅板块强弱指标</b>（越大越强）。最强的是<b>领涨板块</b>，各板块指标列在一起，<b>轮动的次序与节奏一目了然</b>：<span class="hl">领涨 → 跟涨 → 滞涨 → 补涨</span>，再配合个股走势分析，轮动操作就极为简单。</div></div>`;

  // ---- 讲解点小图 ----
  const figLevel = mfig('一笔至少延伸 6 个基本 K 线单位',
    klineAnnSVG([mk(10, 11.4), mk(10.6, 12.0), mk(11.0, 12.4), mk(11.4, 12.8), mk(11.8, 13.2), mk(12.2, 13.6)],
      [{ i: 0, text: '底分型', pos: 'bottom', color: downColor }, { i: 5, text: '顶分型', pos: 'top', color: upColor }], { w: 30, h: 92 }),
    '笔须有顶分型+底分型，至少延伸 6 根基本 K 线单位');

  const figNine = mfig('8 条均线 → 9 类',
    '<div style="font-size:11px;line-height:1.8;color:#1f2937">' +
    '<span style="color:#991b1b;font-weight:bold">第9类 站上全部均线</span><br>' +
    '第8类 未攻克 233　第7类 未攻克 144<br>' +
    '第6类 未攻克 89　第5类 未攻克 55<br>' +
    '第4类 未攻克 34　第3类 未攻克 21<br>' +
    '第2类 未攻克 13　第1类 未攻克 5（最差）<br>' +
    '<span style="color:#166534;font-weight:bold">＝完全在所有均线之下</span></div>',
    '按“未攻克的最小周期均线”把个股分成 9 类');

  const figRule = mfig('分类原则：反弹未攻克的最小周期均线',
    '<svg viewBox="0 0 210 100" width="210" height="100" style="display:block">' +
    '<line x1="6" y1="26" x2="204" y2="26" stroke="#2563eb" stroke-dasharray="4 3" stroke-width="1"/>' +
    '<text x="6" y="18" font-size="10" fill="#2563eb" font-weight="bold">34 日线（压制）</text>' +
    '<polyline points="6,92 56,62 86,36 128,66 170,90" fill="none" stroke="#1f2937" stroke-width="2"/>' +
    '<circle cx="86" cy="36" r="3.5" fill="#e74c3c"/>' +
    '<text x="86" y="30" font-size="9" fill="#e74c3c" text-anchor="middle" font-weight="bold">反弹止步 34 日线</text>' +
    '</svg>',
    '反弹站不上 34 日线，就归入“未攻克 34”那一类');

  const figStrong = mfig('最厉害的，不一定全在均线上',
    '<div style="font-size:12px;line-height:1.9;color:#1f2937">第 9 类（全在均线上）<b>不一定最厉害</b><br>——缠师留作思考题（<b>原文未给答案</b>）<br><span class="hl">参考思路（存疑）：均线附近蓄势调整的强股，可能更强</span><br><span style="color:#6b7280">分类只是监控辅助，最终回到走势本身</span></div>',
    '“不要所有答案都依赖本ID，思考一次比说 1000 次答案更好”——原文为开放思考题，未给答案');

  const figIdx = mfig('缠中说禅板块强弱指标',
    '<div style="font-size:12px;line-height:1.9;color:#1f2937">板块强弱指标 = <br><span style="font-size:14px;font-weight:bold;color:#2563eb">Σ(板块内个股类别数) ÷ 个股数</span><br>越大越强 → 领涨板块</div>',
    '把板块内所有股票的类别数平均即可');

  const figRotate = mfig('轮动节奏',
    '<div style="font-size:12px;line-height:1.9;color:#1f2937">N 类股在 N 类<b>顶背驰</b> → 先出来<br><span style="color:#2563eb">→</span> 找已调整、可再启动或<b>补涨</b>的股<br>轮动 = 节奏的一种方式</div>',
    '一旦顶背驰就出来，去别的股票“偷欢”几天');

  const figAux = mfig('均线系统回归为辅助监控工具',
    '<div style="font-size:12px;line-height:1.9;color:#1f2937">均线系统 = <b style="color:#2563eb">拐杖</b>（辅助监控，<span style="color:#6b7280">“拐杖”为引申比喻，非原文原词</span>）<br>用 8 条均线分类、看轮动强弱<br>但买卖点仍以<b>中枢、背驰</b>为准<br><span style="color:#6b7280">呼应第 25 课“中枢才是根本”</span></div>',
    '均线是辅助，不是根本');

  __chapters.push({
    id: 'ch42', vol: '卷九 · 实战操作与图解', title: '第42章 均线轮动与板块强弱', source: '原文第106课',
    figures: [
      { kind: 'echarts', title: '均线空头排列 → 多头排列', note: '同一段走势，前段下跌时 <b>MA5 &lt; MA21 &lt; MA55</b>（短均线在下）为<span class="kw">空头排列</span>；后段上涨时变为 <b>MA5 &gt; MA21 &gt; MA55</b>（短均线在上）为<span class="kw">多头排列</span>。第106课用 <code>5/13/21/34/55/89/144/233</code> 八条均线对个股做<b>完全分类</b>，把市场轮动节奏看成一目了然。<span class="hl">走势级别与均线虽无必然关系，但有一个大致的区间对应。</span>', option: optCh42 },
      { kind: 'html', title: '板块轮动的强弱分层', note: '第106课：要判别板块强弱，把板块内股票的<b>类别数平均</b>，越大越强，这个平均数就是<span class="kw">缠中说禅板块强弱指标</span>。最强的板块是<b>领涨板块</b>；把所有板块指标列在一张图上，<span class="hl">轮动的次序与节奏就一目了然</span>——领涨、跟涨、滞涨、补涨依次轮换，配合个股走势分析，轮动操作就极为简单。', html: figBoard },
    ],
    sections: [
      { type: 'definition', title: '8 条均线对个股的分类（第106课）', items: [
        { term: '① 走势级别与均线：大致区间对应', text: '任一级别都有最少的延伸时间：一笔必须有顶分型、底分型，<b>至少延伸 6 个基本 K 线单位</b>。由此可推出线段、1/5/30/日/周各级别的<b>最少延伸时间</b>与<b>最少挑战的均线</b>。<span class="hl">走势级别与均线虽无必然关系，但有一个大致的区间对应。</span>', fig: figLevel },
        { term: '② 8 条均线 → 9 类', text: '均线系统要按实际走势设置，例如从 6124 点下来，选 <code>5/13/21/34/55/89/144/233</code> 八条参数，就与走势极端吻合。<span class="hl">8 条均线按“未攻克的最小周期均线”把个股分成 9 类</span>：最差一类完全在所有均线之下，第 9 类站上全部均线。', fig: figNine },
        { term: '③ 分类原则：未攻克的最小周期均线', text: '分类原则是<span class="kw">本次反弹目前为止未曾攻克的最小周期均线</span>。反弹连 21 日线都站不上，就归入受 21 日线压制那一类；站上 34 未站上 55，就归入 55 那一类，以此类推。', fig: figRule },
        { term: '④ 最厉害的，不一定全在均线上', text: '第 9 类（全在均线上）<span class="hl">不一定最厉害</span>——这是缠师特意留的思考题，<b>原文未给出答案</b>。以下为参考思路（存疑）：有些强股在均线附近<b>蓄势调整</b>，反而可能比已经远离均线的更强。<b>分类只是监控辅助，最终要回到走势本身。</b>', fig: figStrong },
      ]},
      { type: 'definition', title: '板块强弱指标与轮动（第106课）', items: [
        { term: '⑤ 缠中说禅板块强弱指标', text: '判别一个板块的强弱很简单：把板块内所有股票的<b>类别数平均</b>，越大越强。这个平均类别数，就叫<span class="kw">缠中说禅板块强弱指标</span>。', formula: '板块强弱指标 = Σ(板块内个股类别) ÷ 个股数', fig: figIdx },
        { term: '⑥ 领涨板块与轮动节奏', text: '指标最大的板块就是<span class="kw">领涨板块</span>，其动态十分关键。把所有板块指标列在同一张图上，<span class="hl">轮动的次序与节奏就一目了然</span>；配合个股走势分析，轮动操作就极为简单。N 类股一旦在 N 类上出现<b>顶背驰</b>，可先出来，去找别的已调整、可再启动或补涨的股票。', fig: figRotate },
        { term: '⑦ 均线系统回归为辅助监控工具', text: '均线系统在这里的定位是<b>辅助监控工具</b>：用 8 条均线做分类、看轮动强弱，但买卖点最终仍以<b>中枢、背驰</b>为准。<span class="hl">均线是“拐杖”，不是根本。</span>（“拐杖”为引申比喻，非原文原词；与第 25 课“中枢才是根本”一脉相承。）', fig: figAux },
      ]},
      { type: 'motivation', title: '给整个市场做一次“强弱体检”', text: '单看一条均线，意义不大——任何走势都是<b>大级别套小级别</b>的，必须是<b>均线系统</b>。第106课的高明处，在于把均线系统<b>打横来用</b>：不再只盯一只股票的均线，而是对<b>所有股票</b>按“未攻克的最小周期均线”做 9 类完全分类，再按板块平均得到强弱指标。<span class="hl">这样，市场的轮动节奏就从一团迷雾变成一张清晰的地图</span>——谁领涨、谁跟涨、谁补涨，一望可知。均线在这里既不神秘、也不万能，它回归为一件<b>诚实好用的监控工具</b>。' },
      { type: 'pitfalls', title: '常见误区', items: [
        '把<b>单条均线</b>当结论（错：走势大套小，必须是<b>均线系统</b>才有意义）。',
        '以为<b>走势级别与均线是必然对应</b>（错：只是“大致区间对应”，没有必然关系）。',
        '以为<b>第 9 类（全在均线上）一定最强</b>（错：缠师明确说“最厉害的不一定全在均线之上”）。',
        '把均线分类当成<b>买卖点</b>（错：它是辅助监控，买卖点仍以中枢、背驰为准）。',
        '轮动时<b>追高已领涨的板块</b>（错：N 类顶背驰就出来，去找已调整、可再启动或补涨的）。',
      ]},
      { type: 'exercises', title: '练习', items: [
        { q: '8 条均线为什么能分成 9 类？分类原则是什么？', a: '分类原则是<b>本次反弹目前为止未曾攻克的最小周期均线</b>。8 条均线对应“未攻克 5 / 13 / 21 / 34 / 55 / 89 / 144 / 233”共 8 类，再加上“全部攻克（站上所有均线）”一类，共 <b>9 类</b>。' },
        { q: '“缠中说禅板块强弱指标”怎么算？有什么用？', a: '把板块内所有股票的<b>类别数平均</b>，越大越强。最大的是<b>领涨板块</b>；各板块指标列在一张图上，<b>轮动次序与节奏一目了然</b>，配合个股走势分析即可做轮动操作。' },
        { q: '为什么说“最厉害的不一定完全在所有均线之上”？', a: '这是缠师留的<b>思考题，原文未给答案</b>。参考思路（存疑）：<b>分类只是监控辅助</b>，均线附近蓄势调整的强股可能更强，不能把“站上全部均线”简单等同于最强，<b>最终要回到走势本身（中枢、背驰）</b>来判断。' },
      ]},
    ],
  });
})();
