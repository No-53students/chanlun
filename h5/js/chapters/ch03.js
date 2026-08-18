/* 第3章 均线吻系统与趋势雏形 */
(function () {

  // 两条均线示意（a=短均线 蓝，b=长均线 紫）
  function twoLines(a, b, opts) {
    opts = opts || {};
    const w = opts.w || 34, h = opts.h || 88, pad = 12;
    const all = a.concat(b);
    const min = Math.min.apply(null, all), max = Math.max.apply(null, all);
    const range = (max - min) || 1;
    const y = v => pad + (max - v) / range * (h - 2 * pad);
    const x = i => pad + i * w;
    const W = pad * 2 + w * (a.length - 1);
    let s = `<svg viewBox="0 0 ${W} ${h}" width="${W}" height="${h}" style="display:block">`;
    const poly = (arr, color, sw) => {
      let d = '';
      arr.forEach((v, i) => { d += (i ? ' L' : 'M') + x(i).toFixed(1) + ' ' + y(v).toFixed(1); });
      s += `<path d="${d}" fill="none" stroke="${color}" stroke-width="${sw}"/>`;
    };
    poly(b, '#9333ea', 2);
    poly(a, '#2563eb', 2.4);
    s += '</svg>';
    return s;
  }

  // ---- 主图1（echarts）：两条均线 + 价格线 + 三处吻 ----
  function optCh03() {
    const long = [10.0, 10.2, 10.4, 10.6, 10.8, 11.0, 11.2, 11.4, 11.6, 11.8, 12.0, 12.2, 12.4, 12.6, 12.8, 13.0, 13.2, 13.4, 13.6, 13.8];
    const short = [11.8, 12.4, 13.0, 12.6, 11.6, 12.2, 12.8, 13.2, 12.2, 11.8, 12.6, 13.2, 13.8, 13.0, 12.2, 12.6, 13.4, 14.2, 15.0, 15.8];
    const price = [12.0, 12.6, 13.2, 12.8, 11.4, 12.4, 13.0, 13.4, 12.2, 11.6, 12.8, 13.4, 14.0, 13.0, 12.0, 12.6, 13.6, 14.4, 15.2, 16.0];
    const toLine = arr => arr.map((p, i) => [i, p]);
    const seg = (x, y, name, color, pos) => ({ coord: [x, y], name, symbol: 'none', label: { show: true, color, fontSize: 11, fontWeight: 'bold', position: pos, formatter: function (p) { return p.name; } } });
    const kiss = (x, y, name, color, pos) => ({ coord: [x, y], name, symbol: 'pin', symbolSize: 42, itemStyle: { color }, label: { show: true, color, fontSize: 10, fontWeight: 'bold', position: pos, distance: 4, formatter: function (p) { return p.name; } } });
    return {
      tooltip: { trigger: 'axis', axisPointer: { type: 'cross' } },
      legend: { data: ['走势', '短期均线(5日)', '长期均线(10日)'], top: 0 },
      grid: { left: 52, right: 96, top: 38, bottom: 34 },
      xAxis: { type: 'value', min: 0, max: 19, interval: 1 },
      yAxis: { type: 'value', scale: true, name: '价格' },
      series: [
        { name: '走势', type: 'line', data: toLine(price), symbol: 'none', lineStyle: { color: '#9ca3af', width: 1.2 }, z: 2 },
        { name: '短期均线(5日)', type: 'line', data: toLine(short), symbol: 'none', lineStyle: { color: '#2563eb', width: 2.2 }, z: 3 },
        { name: '长期均线(10日)', type: 'line', data: toLine(long), symbol: 'none', lineStyle: { color: '#9333ea', width: 2.2 }, z: 4,
          markArea: {
            silent: true, itemStyle: { color: 'rgba(37,99,235,0.05)' },
            label: { show: true, position: 'insideTop', color: '#2563eb', fontSize: 11, formatter: function (p) { return p.name || ''; } },
            data: [
              [{ xAxis: 0, yAxis: 9.8, name: '女上位 · 多头市场' }, { xAxis: 13.2, yAxis: 14.6 }],
              [{ xAxis: 13.4, yAxis: 11.4, name: '男上位 · 空头市场' }, { xAxis: 15.6, yAxis: 13.6 }],
            ],
          },
          markLine: {
            silent: true, symbol: 'none',
            label: { show: true, position: 'end', formatter: function (p) { return p.name; }, fontSize: 10, color: '#6b7280' },
            data: [
              { yAxis: 11.6, name: '飞吻低点 11.6', lineStyle: { color: '#2563eb', type: 'dashed', width: 1 } },
              { yAxis: 11.8, name: '唇吻触点 11.8', lineStyle: { color: '#9333ea', type: 'dashed', width: 1 } },
              { yAxis: 12.2, name: '湿吻低点 12.2', lineStyle: { color: '#e74c3c', type: 'dashed', width: 1 } },
            ],
          },
          markPoint: {
            data: [
              kiss(4, 11.6, '① 飞吻·略走平', '#2563eb', 'top'),
              kiss(9, 11.8, '② 唇吻·靠近不破', '#9333ea', 'bottom'),
              kiss(14, 12.2, '③ 湿吻·跌破缠绕', '#e74c3c', 'bottom'),
              seg(7, 15.4, '女上位（多头）', '#2563eb', 'top'),
              seg(14.5, 10.4, '短暂男上位（空头）', '#9333ea', 'bottom'),
            ],
          },
        },
      ],
    };
  }

  // ---- 主图2（html）：男上位 / 女上位排列示意 ----
  const figPos = `
<div class="fig" style="min-width:280px"><div class="lbl">女上位（多头）vs 男上位（空头）</div>
<div style="display:flex;gap:24px;align-items:flex-start;flex-wrap:wrap">
  <div style="text-align:center">${twoLines([11.5, 12.0, 12.5, 13.0, 13.5], [10.0, 10.5, 11.0, 11.5, 12.0], { w: 34, h: 112 })}
    <div style="font-size:11px;color:#16a34a;font-weight:700">女上位 = 多头市场</div></div>
  <div style="text-align:center">${twoLines([10.5, 10.0, 9.5, 9.0, 8.5], [12.0, 11.5, 11.0, 10.5, 10.0], { w: 34, h: 112 })}
    <div style="font-size:11px;color:#e74c3c;font-weight:700">男上位 = 空头市场</div></div>
</div>
<div class="cap">短期均线当<b>女王</b>、长期均线当<b>面首</b>：短在长之上 = <b>女上位（多头）</b>，短在长之下 = <b>男上位（空头）</b>。<br>要赚钱，就要多来点女上位。（蓝 = 5日短均线，紫 = 10日长均线）</div></div>`;

  // ---- 主图3（html）：下跌+盘整+下跌 → 一买 ----
  const figDZD = `
<div class="fig" style="min-width:300px"><div class="lbl">下跌 + 盘整 + 下跌 → 第一类买点</div>${drawZS(
    [{ p: 20, tag: '顶' }, { p: 14 }, { p: 11, tag: '底', label: '盘整低', color: '#2563eb' }, { p: 13 }, { p: 12 }, { p: 13, label: '盘整', color: '#2563eb', above: true }, { p: 7, tag: '底', label: '一买·背驰', color: '#16a34a' }],
    [{ lo: 11, hi: 13, x0: 1, x1: 5, label: '盘整 [11,13]' }],
    { zgzd: true, w: 52, h: 150 }
  )}<div class="cap">下跌①（20→11）→ 盘整 [11,13] → 下跌②（13→7）<b>背驰</b>出第一类买点。<br>「下跌+盘整+下跌」是中小资金选股的标准形态。</div></div>`;

  // ---- 讲解点小图 ----

  // ① 吻的三种
  const figKiss = mfig('吻的三种：力度由弱到强',
    '<div style="display:flex;flex-direction:column;gap:8px">'
    + '<div style="font-size:11px;color:#6b7280">飞吻（略走平，不接触）</div>' + twoLines([12.0, 12.4, 12.3, 12.5, 13.0], [10.0, 10.3, 10.6, 10.9, 11.2], { w: 30, h: 58 })
    + '<div style="font-size:11px;color:#6b7280">唇吻（靠近但不破）</div>' + twoLines([11.6, 11.0, 10.8, 11.2, 12.0], [10.0, 10.4, 10.8, 11.2, 11.6], { w: 30, h: 58 })
    + '<div style="font-size:11px;color:#6b7280">湿吻（跌破/升破，反复缠绕）</div>' + twoLines([11.6, 10.8, 10.2, 11.0, 11.8, 12.5], [10.0, 10.5, 11.0, 11.5, 12.0, 12.5], { w: 30, h: 58 })
    + '</div>',
    '飞吻力度最弱、唇吻居中、湿吻最强；转折多由湿吻引发');

  // ② 均线系统的一买 / 二买
  const figBuy12 = mfig('均线系统的一买 / 二买',
    drawZS([{ p: 16, tag: '顶' }, { p: 11, tag: '底' }, { p: 14, tag: '顶' }, { p: 12 }, { p: 10, tag: '底', label: '一买', color: '#16a34a' }, { p: 15, tag: '顶', label: '转女上位', color: '#2563eb' }, { p: 12, tag: '底', label: '二买', color: '#2563eb' }], [], { w: 34, h: 104 }),
    '男上位最后一吻后背驰式下跌 → 一买(10)；女上位第一吻后回调 → 二买(12)');

  // ③ 涨 / 跌 / 盘整
  const figTrend3 = mfig('涨 / 跌 / 盘整（高、低点关系）',
    '<div style="display:flex;gap:10px;align-items:flex-end">'
    + '<div style="text-align:center">' + biLineSVG([{ p: 10, tag: '底' }, { p: 13, tag: '顶' }, { p: 11, tag: '底' }, { p: 15, tag: '顶' }], { w: 26, h: 80 }) + '<div style="font-size:10px;color:#16a34a">上涨</div></div>'
    + '<div style="text-align:center">' + biLineSVG([{ p: 15, tag: '顶' }, { p: 12, tag: '底' }, { p: 13, tag: '顶' }, { p: 9, tag: '底' }], { w: 26, h: 80 }) + '<div style="font-size:10px;color:#e74c3c">下跌</div></div>'
    + '<div style="text-align:center">' + biLineSVG([{ p: 10, tag: '底' }, { p: 14, tag: '顶' }, { p: 12, tag: '底' }, { p: 13, tag: '顶' }], { w: 26, h: 80 }) + '<div style="font-size:10px;color:#6b7280">盘整</div></div>'
    + '</div>',
    '上涨=高点抬+低点抬；下跌=高点降+低点降；盘整=高/低点交错');

  // ④ 趋势力度 → 背驰
  const figBeichi = mfig('趋势力度比较 → 背驰',
    '<svg viewBox="0 0 220 92" width="220" height="92" style="display:block">'
    + '<polygon points="14,76 78,76 46,16" fill="rgba(37,99,235,0.22)" stroke="#2563eb" stroke-width="1"/>'
    + '<text x="46" y="10" font-size="10" text-anchor="middle" fill="#2563eb">前趋势力度(大)</text>'
    + '<polygon points="130,76 176,76 153,42" fill="rgba(147,51,234,0.22)" stroke="#9333ea" stroke-width="1"/>'
    + '<text x="153" y="36" font-size="10" text-anchor="middle" fill="#9333ea">后力度(小)</text>'
    + '<text x="110" y="90" font-size="11" text-anchor="middle" fill="#e74c3c" font-weight="bold">后 &lt; 前 ⇒ 背驰</text>'
    + '</svg>',
    '前后两个同向趋势，趋势力度后者弱于前者 = 背驰');

  // ⑤ 走势六种组合
  const figSix = mfig('三种基本走势的六种组合',
    '<div style="font-size:12px;line-height:1.9;color:#1f2937">'
    + '<div><b>陷阱式</b>：上涨+下跌 · 下跌+上涨</div>'
    + '<div><b>反转式</b>：上涨+盘整+下跌 · 下跌+盘整+上涨</div>'
    + '<div><b>中继式</b>：上涨+盘整+上涨 · 下跌+盘整+下跌</div>'
    + '<div style="margin-top:4px;color:#16a34a">有买入价值：下跌+上涨 / 下跌+盘整+上涨 / 上涨+盘整+上涨</div>'
    + '<div style="color:#e74c3c">无买入价值：上涨+下跌 / 上涨+盘整+下跌 / 下跌+盘整+下跌</div>'
    + '</div>',
    '下跌中买入，只需躲避「下跌+盘整+下跌」一种风险');

  // ⑥ 下跌+盘整+下跌 → 一买（迷你）
  const figDZDmini = mfig('下跌+盘整+下跌 → 一买',
    drawZS([{ p: 20, tag: '顶' }, { p: 14 }, { p: 11, tag: '底' }, { p: 13 }, { p: 12 }, { p: 13, label: '盘整', color: '#2563eb' }, { p: 7, tag: '底', label: '一买', color: '#16a34a' }], [{ lo: 11, hi: 13, x0: 1, x1: 5, label: '盘整' }], { w: 30, h: 96 }),
    '第二段下跌(13→7)背驰出第一类买点');

  __chapters.push({
    id: 'ch03', vol: '卷一 · 理念与入门', title: '第3章 均线吻系统与趋势雏形', source: '原文第11、12、14、15、16课',
    figures: [
      { kind: 'echarts', title: '两条均线的三种吻（飞吻 / 唇吻 / 湿吻）', note: '把<b>短期均线</b>当女王、<b>长期均线</b>当面首，两条均线的关系就是一个「<b>吻</b>」的问题：<b>① 飞吻</b>——短均线略略走平后按原趋势继续（力度最弱）；<b>② 唇吻</b>——短均线靠近长均线但不跌破/升破；<b>③ 湿吻</b>——短均线跌破/升破长均线甚至反复缠绕（力度最强）。<span class="hl">一切的行情转折，在很大几率上都是由湿吻引发的。</span>', option: optCh03 },
      { kind: 'html', title: '男上位 / 女上位（空头 / 多头排列）', note: '第 11 课：短期均线在长期均线之上为<b>女上位（多头市场）</b>，反之<b>男上位（空头市场）</b>。要赚钱就多来点女上位。任何行情转折，很大几率由<b>湿吻</b>引发；男上位长期后的湿吻，其后的下跌往往是介入良机（空头陷阱概率极大）。', html: figPos },
      { kind: 'html', title: '下跌 + 盘整 + 下跌 → 第一类买点', note: '第 16 课：三种基本走势有六种组合，其中在<b>下跌</b>中买入，只需躲避「下跌+盘整+下跌」一种风险。所以「<b>下跌+盘整+下跌</b>」的第二段下跌出现<b>背驰</b>（第一类买点）时，是中小资金最标准、最高效的买入信号。', html: figDZD },
    ],
    sections: [
      { type: 'definition', title: '吻系统：体位与三种吻', items: [
        { term: '① 吻的三种（第11、14课）', text: '任何两条均线的关系都是一个「吻」的问题：<b>飞吻</b>——短期均线略略走平后继续按原趋势进行下去（力度最弱）；<b>唇吻</b>——短期均线靠近长期均线但不跌破或升破，然后按原趋势继续（最常见）；<b>湿吻</b>——短期均线跌破/升破长期均线甚至反复缠绕、如胶似漆（力度最强）。', fig: figKiss },
        { term: '② 男上位 / 女上位（第11课）', text: '把短期均线当<b>女王</b>、长期均线当<b>面首</b>：短均线在长均线之上为<b>女上位（多头市场）</b>，之下为<b>男上位（空头市场）</b>。<span class="hl">要赚钱，就要多来点女上位。</span>体位关系在任何情况下都是明确、有眼睛就能判断的。', fig: mfig('体位：女上位 / 男上位', '<div style="display:flex;gap:12px;align-items:flex-start">' + '<div style="text-align:center">' + twoLines([11.5, 12.0, 12.5], [10.0, 10.5, 11.0], { w: 26, h: 62 }) + '<div style="font-size:10px;color:#16a34a;font-weight:700">女上位(多头)</div></div>' + '<div style="text-align:center">' + twoLines([10.0, 9.5, 9.0], [11.5, 11.0, 10.5], { w: 26, h: 62 }) + '<div style="font-size:10px;color:#e74c3c;font-weight:700">男上位(空头)</div></div>' + '</div>', '短在长上=多头，短在长下=空头') },
        { term: '③ 湿吻引发转折（第11课）', text: '任何行情转折，很大几率都由<b>湿吻</b>引发，分两种情况：一是先湿吻、按原趋势来一个大高潮制造<b>陷阱</b>、再转折；二是<b>反复湿吻</b>，构造转折性箱型。在男上位长期后出现湿吻，其后的下跌往往是介入良机（空头陷阱概率极大），但<span class="hl">对趋势形成的第一次湿吻不成立</span>。', fig: mfig('湿吻 → 转折', '<div style="display:flex;flex-direction:column;gap:4px;font-size:11px;color:#1f2937"><div style="font-weight:700;color:#7e22ce">湿吻</div><div>→ ① 陷阱后转折</div><div>→ ② 反复湿吻箱型转折</div></div>', '转折基本从湿吻开始') },
      ]},
      { type: 'definition', title: '均线买卖系统与趋势雏形', items: [
        { term: '① 均线买卖系统（第12课）', text: '由 5 日、10 日均线构成买卖系统，其体位构成完全分类：女上位是牛、男上位是熊，缠绕最终都要演化成两者之一（中继或转折）。对多头来说，值得介入的只有两种情况：<b>男上位转折</b>与<b>女上位中继</b>。', fig: mfig('缠绕：中继 or 转折', '<div style="display:flex;gap:10px;font-size:11px;color:#1f2937"><div style="text-align:center;border:1px solid #e5e7eb;border-radius:6px;padding:5px 8px"><b>缠绕</b><br>→ 女上位(中继)</div><div style="text-align:center;border:1px solid #e5e7eb;border-radius:6px;padding:5px 8px"><b>缠绕</b><br>→ 男上位(转折)</div></div>', '多头只做男上位转折、女上位中继') },
        { term: '② 第一、二类买点雏形（第12、14课）', text: '利用均线买卖系统，<b>第一类买点</b>＝男上位<b>最后一吻</b>后出现的背驰式下跌（抄底）；<b>第二类买点</b>＝<b>女上位第一吻</b>后出现的下跌。这两个买点的风险最小、收益风险比最大，是唯一值得买入的两个点。买点定律：大级别的第二类买点由次一级别相应走势的第一类买点构成。', formula: '一买 = 男上位最后一吻后背驰式下跌；二买 = 女上位第一吻后下跌', fig: figBuy12 },
        { term: '③ 涨 / 跌 / 盘整的定义（第15课）', text: '走势有「不患」的三种分类：<b>上涨</b>＝最近一个高点比前一高点高、且最近一个低点比前一低点高；<b>下跌</b>＝高点低、低点低；<b>盘整</b>＝高点高但低点低，或高点低但低点高（高低点交错）。所有走势都可分解为这三种，且必须建立在<b>一定的周期图表</b>上。', formula: '上涨 = 高点↑ 且 低点↑；下跌 = 高点↓ 且 低点↓；盘整 = 高低点交错', fig: figTrend3 },
        { term: '④ 没有趋势，没有背驰（第15课）', text: '<span class="hl">没有趋势，没有背驰。在盘整中是无所谓「背驰」的。</span>背驰是<b>前后两个同向趋势</b>之间的比较。缠中说禅趋势力度＝前一吻结束与后一吻开始由短均线与长均线相交所形成的面积；后一趋势力度比上一趋势力度<b>弱</b>，就形成背驰。', fig: figBeichi },
        { term: '⑤ 走势六种组合（第16课）', text: '上涨、下跌、盘整三种基本走势，有六种组合代表三类走势：<b>陷阱式</b>（上涨+下跌、下跌+上涨）、<b>反转式</b>（上涨+盘整+下跌、下跌+盘整+上涨）、<b>中继式</b>（上涨+盘整+上涨、下跌+盘整+下跌）。站在多头角度，有买入价值的是下跌+上涨、下跌+盘整+上涨、上涨+盘整+上涨三种。', fig: figSix },
        { term: '⑥ 下跌+盘整+下跌 → 第一类买点（第16课）', text: '在下跌中买入，唯一要躲避的风险是「<b>下跌+盘整+下跌</b>」。因此，中小资金高效买卖法：<span class="hl">出现「下跌+盘整+下跌」走势，在其第二段下跌出现第一类买点时介入</span>；介入后一旦出现盘整，坚决退出（只参与「下跌+上涨」一种）。', fig: figDZDmini },
      ]},
      { type: 'motivation', title: '均线只是辅助，中枢才是根本', text: '「吻」是缠师用最通俗的均线语言，讲清楚<b>趋势、体位、背驰、买点</b>等核心概念的雏形。但必须注意：<b>均线系统不是一个精确的系统，太多骗线</b>。缠师后来反复强调，均线只是<b>辅助</b>，真正根本的是第 17 课引入的<b>中枢</b>。这一章的价值在于用均线把「趋势—背驰—买卖点」的骨架先搭起来，为后续的精确化定义做准备。' },
      { type: 'pitfalls', title: '常见误区', items: [
        '以为突破某条均线就买卖——单条均线<b>骗线太多</b>，成功率极低，真正有用的是<b>均线系统</b>。',
        '在<b>盘整</b>中去找背驰——没有趋势就没有背驰，背驰是<b>前后两个同向趋势</b>的比较。',
        '把「湿吻」一律当成买点——<b>趋势形成的第一次湿吻</b>不构成买点（背驰判断不成立）。',
        '把均线系统当成终极武器——均线只是<b>辅助</b>，中枢才是根本，精度有限。',
        '抛开<b>级别</b>谈涨跌盘整——同样的走势在日线是盘整、在 30 分钟线可能是趋势。',
      ]},
      { type: 'exercises', title: '练习', items: [
        { q: '飞吻、唇吻、湿吻三种吻按力度如何排序？转折主要由哪种引发？', a: '力度由弱到强：<b>飞吻</b>（略走平）＜ <b>唇吻</b>（靠近不破）＜ <b>湿吻</b>（跌破/升破、反复缠绕）。<b>湿吻</b>力度最强，一切的行情转折在很大几率上都是由湿吻引发的。' },
        { q: '均线系统里，第一类买点和第二类买点分别由什么构成？', a: '<b>第一类买点</b>＝男上位（空头）<b>最后一吻</b>后出现的背驰式下跌；<b>第二类买点</b>＝<b>女上位第一吻</b>后出现的下跌。' },
        { q: '为什么「下跌+盘整+下跌」是中小资金选股的标准形态？', a: '在下跌中买入，其后只会遇到「下跌+盘整+下跌」一种无买入价值的走势（比在上涨中买入少一种风险）。所以在「下跌+盘整+下跌」的第二段下跌出现<b>背驰</b>（第一类买点）时介入，是最高效的买入；介入后一旦盘整就坚决退出，只参与「下跌+上涨」。' },
      ]},
    ],
  });
})();
