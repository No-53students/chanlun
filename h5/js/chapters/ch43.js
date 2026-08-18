/* 第43章 权证提款 + 牛市三阶段 */
(function () {

  // ---- 主图1：牛市阶段走势（预热 → 主升 → 疯狂加速）----
  function optCh43() {
    const pts = [];
    // 三阶段：预热（缓升）→ 第一阶段主升（成分股）→ 加速疯狂
    const stage = function (i0, i1, p0, p1, amp) {
      for (let i = i0; i <= i1; i++) {
        const t = (i - i0) / (i1 - i0);
        const base = p0 + (p1 - p0) * t;
        const p = +(base + Math.sin(i * 1.15) * amp).toFixed(1);
        pts.push([i, p]);
      }
    };
    stage(0, 9, 10, 14, 0.35);    // 预热
    stage(10, 19, 14, 26, 0.8);   // 第一阶段主升（成分股）
    stage(20, 29, 26, 46, 2.2);   // 加速疯狂
    const seg = function (x, y, name, color) {
      return { coord: [x, y], name: name, symbol: 'none', label: { show: true, color: color, fontSize: 12, fontWeight: 'bold', position: 'top', formatter: function (p) { return p.name; } } };
    };
    return {
      tooltip: { trigger: 'axis', axisPointer: { type: 'cross' } },
      grid: { left: 48, right: 24, top: 30, bottom: 40 },
      xAxis: { type: 'value', min: 0, max: 29, interval: 5 },
      yAxis: { type: 'value', scale: true, name: '指数' },
      series: [{
        name: '指数', type: 'line', data: pts, symbol: 'none', lineStyle: { width: 2.4, color: '#1f2937' }, itemStyle: { color: '#1f2937' },
        markArea: {
          silent: true, itemStyle: { opacity: 0.55 },
          label: { show: true, position: 'insideTop', fontSize: 11, fontWeight: 'bold', color: '#fff' },
          data: [
            [{ xAxis: 0, yAxis: 8, itemStyle: { color: 'rgba(22,163,74,0.16)' } }, { xAxis: 9, yAxis: 16, name: '① 预热（缓升）' }],
            [{ xAxis: 10, yAxis: 13, itemStyle: { color: 'rgba(37,99,235,0.18)' } }, { xAxis: 19, yAxis: 28, name: '② 第一阶段·成分股主升' }],
            [{ xAxis: 20, yAxis: 25, itemStyle: { color: 'rgba(231,76,60,0.18)' } }, { xAxis: 29, yAxis: 49, name: '③ 加速·警惕出货' }],
          ],
        },
        markPoint: { data: [
          seg(29, 47, '加速上涨 → 警惕出货', '#e74c3c'),
        ] },
        markLine: { silent: true, symbol: 'none', label: { show: true, position: 'insideEndTop', formatter: function (p) { return p.name; }, fontSize: 10, color: '#6b7280' }, data: [
          { name: '预热→第一阶段', xAxis: 9, lineStyle: { color: '#9ca3af', type: 'dashed', width: 1 } },
          { name: '第一阶段→加速', xAxis: 19, lineStyle: { color: '#9ca3af', type: 'dashed', width: 1 } },
        ] },
      }],
    };
  }

  // ---- 主图2：权证认购 + 认沽价差套利 ----
  const figWarrant = `
<div class="fig" style="min-width:360px"><div class="lbl">权证提款：认购 + 认沽的行权价差 = 安全底线</div>
<svg viewBox="0 0 360 150" width="360" height="150" style="display:block">
<line x1="20" y1="36" x2="340" y2="36" stroke="#e74c3c" stroke-width="2"/>
<text x="20" y="28" font-size="11" fill="#e74c3c" font-weight="bold">认购行权价（高）</text>
<line x1="20" y1="108" x2="340" y2="108" stroke="#16a34a" stroke-width="2"/>
<text x="20" y="124" font-size="11" fill="#16a34a" font-weight="bold">认沽行权价（低）</text>
<rect x="60" y="36" width="240" height="72" fill="rgba(37,99,235,0.12)" stroke="#2563eb" stroke-dasharray="4 3"/>
<text x="180" y="78" font-size="13" fill="#2563eb" text-anchor="middle" font-weight="bold">价差 = 安全底线</text>
<text x="180" y="94" font-size="11" fill="#2563eb" text-anchor="middle">五粮液 1.02 元 / 包钢 0.43 元</text>
</svg>
<div class="cap">同时持有<b>认购 + 认沽</b>权证：对企业而言，除非行情特别不好，否则不会让认沽兑现（兑现要掏真金白银，不兑现就是一张<b>空头支票</b>）。于是<span class="hl">认购与认沽行权价之差，就是认购权证最安全的底线</span>——在底线附近买入，与去银行提款一样安全。</div></div>`;

  // ---- 讲解点小图 ----
  const figBoth = mfig('认购 + 认沽同时持有',
    '<svg viewBox="0 0 200 92" width="200" height="92" style="display:block">' +
    '<polyline points="8,78 80,20 192,16" fill="none" stroke="#e74c3c" stroke-width="2"/>' +
    '<text x="8" y="88" font-size="10" fill="#e74c3c" font-weight="bold">认购：随股价↑而↑</text>' +
    '<polyline points="8,16 80,72 192,80" fill="none" stroke="#16a34a" stroke-width="2"/>' +
    '<text x="140" y="50" font-size="10" fill="#16a34a" font-weight="bold">认沽：随股价↓而↓</text>' +
    '</svg>',
    '两只权证价值方向相反，价差构成安全垫');

  const figSpread = mfig('安全底线 = 行权价差',
    '<div style="font-size:12px;line-height:2;color:#1f2937">安全底线 =<br><span style="font-size:14px;font-weight:bold;color:#2563eb">认购行权价 − 认沽行权价</span><br>五粮液 <b>1.02 元</b> · 包钢 <b>0.43 元</b><br><span class="hl">底线附近买入 = 银行提款</span></div>',
    '低风险投机的量化依据');

  const figMachine = mfig('提款机心态：安全第一 + 耐心等待',
    '<div style="font-size:12px;line-height:1.9;color:#1f2937">时机到了 → <b>提款</b><br>时机不到 → <b>搁着</b><br>先要<b style="color:#2563eb">安全</b>，再谈 <b style="color:#e74c3c">G 点（机会）</b></div>',
    '市场如提款机，又安全又能 G 点的机会才值得搞');

  const figStage = mfig('预热阶段 → 第一阶段（成分股先涨）',
    '<div style="font-size:12px;line-height:1.9;color:#1f2937">有色等上涨 = <b>牛市预热</b><br>金融/指数股上涨 = <b>第一阶段</b><br><span class="hl">一线股先涨，它们不到位，别的涨不起来</span></div>',
    '全世界的牛市都这样：一线股先长');

  const figBreak = mfig('放量突破年线 + 缩量回调年线 = 黑马',
    drawZS([{ p: 8, tag: '底', label: '缩量回调', color: downColor }, { p: 13, tag: '顶', label: '放量突破', color: upColor }, { p: 10, tag: '底', label: '回调年线', color: '#2563eb' }, { p: 16, tag: '顶', label: '再启动' }],
      [], { w: 44, h: 104 }),
    '年线走平后向上拐点的股票，一定要看好');

  const figShort = mfig('牛市中：跌就是爹，回挡踏准轮动',
    '<div style="font-size:12px;line-height:1.9;color:#1f2937">避开大的<b>回挡</b><br>借回挡踏准<b>轮动节奏</b><br>中线 30 日线不破就<b>拿着</b><br>水平高则用短线指标<b>打短差</b></div>',
    '“牛市里，跌就是爹，一跌就要发钱”');

  const figSell = mfig('两种出货信号',
    drawZS([{ p: 8, tag: '底' }, { p: 12, tag: '顶' }, { p: 11, tag: '底' }, { p: 13.5, tag: '顶' }, { p: 12.5, tag: '底' }, { p: 18, tag: '顶', label: '加速→出货', color: '#e74c3c' }],
      [], { w: 40, h: 104 }),
    '缓慢推升一旦加速上涨，就要警惕出货');

  __chapters.push({
    id: 'ch43', vol: '卷九 · 实战操作与图解', title: '第43章 权证提款 + 牛市三阶段', source: '原文第6、7课',
    figures: [
      { kind: 'echarts', title: '牛市三阶段：预热 → 主升 → 疯狂加速', note: '第7课讲<b>牛市预热阶段</b>（有色等先涨）与<b>牛市第一阶段</b>（金融股等指数股、一线股先涨）。本图把节奏展开为三段：<b>① 预热缓升 → ② 成分股主升 → ③ 加速疯狂</b>。<span class="hl">缓慢推升的股票一旦出现加速上涨，就要时刻警惕出货</span>；第一波火爆上涨的，第二波出现背驰或放巨量就要找机会走人。', option: optCh43 },
      { kind: 'html', title: '权证提款：价差就是安全底线', note: '第6课：选<b>既有认购又有认沽</b>的权证（如五粮液、包钢）。企业不会轻易让认沽兑现，因此<span class="hl">认购与认沽的行权价之差，就是认购权证最安全的底线</span>（五粮液 1.02 元、包钢 0.43 元）。在底线附近买入认购，与去银行提款一样安全——这就是<b>低风险投机</b>。', html: figWarrant },
    ],
    sections: [
      { type: 'definition', title: '权证提款：价差就是安全底线（第6课）', items: [
        { term: '① 同时持有认购 + 认沽', text: '选<b>既有认购又有认沽</b>的权证（如五粮液、包钢）。<span class="kw">认购权证</span>价值随股价上升而上升，<span class="kw">认沽权证</span>则随股价下降而上升。对企业而言，除非行情特别不好，否则不会让认沽兑现——兑现要掏真金白银，不兑现就是一张<b>空头支票</b>。', fig: figBoth },
        { term: '② 价差 = 认购权证最安全的底线', text: '认购与认沽的<b>行权价之差</b>，就是认购权证最安全的底线：五粮液 <b>1.02 元</b>、包钢 <b>0.43 元</b>。缠师分别在 1 元多和 4 毛多买入。<span class="hl">在底线附近买入认购，与去银行提款一样安全。</span>', formula: '安全底线 = 认购行权价 − 认沽行权价', fig: figSpread },
        { term: '③ 提款机心态：安全第一，耐心等待', text: '市场如提款机，<span class="kw">时机到了就去提款，时机不到就搁着</span>。前提是“安全”——像去银行提款一样安全。<span class="hl">先要安全，再谈 G 点（机会）</span>；又安全又能 G 点的机会，才值得投机。', fig: figMachine },
      ]},
      { type: 'definition', title: '牛市的阶段与节奏（第7课）', items: [
        { term: '④ 预热阶段 → 第一阶段（成分股先涨）', text: '有色等 5 月前的上涨只是<b>牛市预热阶段</b>；以金融股为代表的指数股上涨，才是<b>牛市第一阶段</b>。96 年深发展涨 N 倍了，很多股票还没怎么动。<span class="hl">一线股（成分股）先涨，它们不到位，其他股票长不起来</span>——全世界的牛市都这样。', fig: figStage },
        { term: '⑤ 放量突破年线 + 缩量回调年线 = 黑马', text: '最简单的找牛股方法：盯着<b>放量突破上市首日最高价的新股</b>，以及<b>放量突破年线后缩量回调年线</b>的老股。尤其<span class="kw">年线走平后向上出现拐点</span>的股票一定要看好；还在年线下的先别碰，等上年线再说。', fig: figBreak },
        { term: '⑥ 板块轮动 + 短线短差', text: '牛市中<span class="hl">跌就是爹</span>，一跌就要发钱。核心原则：<b>避开大的回挡，借回挡踏准轮动节奏</b>。一只股票长起来别随意抛，中线连 30 日线都不跌破就拿着；水平高的在上涨时用短线指标<b>打短差</b>，提高资金利用率。', fig: figShort },
        { term: '⑦ 两种出货信号', text: '抛股分两种：<b>缓慢推升</b>的，一旦<b>加速上涨</b>就要时刻警惕出货；<b>第一波火爆上涨</b>的，调整后第二波一旦出现<b>背驰或放巨量</b>，找机会走人。<span class="hl">玩过就扔，对股票不能有感情。</span>', fig: figSell },
      ]},
      { type: 'motivation', title: '牛市里为什么还亏钱？因为节奏错了', text: '第7课开篇就点破一个扎心的事实：<b>赚了指数亏了钱</b>。根源不在选不到好股，而在<b>对牛市没信心、对节奏没把握</b>。缠师给的解药极其朴素：认清<b>阶段</b>（预热、第一阶段）、认清<b>黑马</b>（放量突破年线缩量回调、年线拐点）、认清<b>节奏</b>（避回挡、踏轮动、打短差）。第6课的权证提款则给出另一端启示：<span class="hl">真正稳的投机，不是去赌，而是先找到一个“安全底线”，让风险在介入前就被锁死</span>。两课合起来，就是一套“先求安全、再求节奏”的实战心法。' },
      { type: 'pitfalls', title: '常见误区', items: [
        '把<b>预热阶段的反弹</b>当成主升去追（错：有色等预热涨完，一线股主升才刚开始）。',
        '以为<b>牛市里任何票都会一起涨</b>（错：一线股先涨，它们不到位其他股票长不起来）。',
        '在<b>年线下方</b>的股票里找黑马（错：先别看，等上年线再说）。',
        '<b>缓慢推升的股票</b>一涨就慌着抛（错：缓慢推升要拿，<b>加速上涨</b>时才警惕出货）。',
        '把权证的<b>安全底线</b>理解成无风险（错：是“低风险”，前提是<b>在底线附近</b>介入，而非任意价位）。',
      ]},
      { type: 'exercises', title: '练习', items: [
        { q: '权证提款里，“安全底线”是什么？以五粮液为例是多少？', a: '安全底线 = <b>认购行权价 − 认沽行权价</b>。因为企业不愿让认沽兑现（要掏真金白银），这个价差就是认购权证最安全的底线。五粮液是 <b>1.02 元</b>、包钢是 <b>0.43 元</b>。' },
        { q: '牛市第一阶段是哪些股票在涨？为什么散户该等趋势明确再介入？', a: '第一阶段是<b>成分股 / 一线股</b>（金融股等指数股）先涨。<span class="hl">一线股不到位，其他股票长不起来</span>。散户别想抄底逃顶，<b>等趋势明确再介入或退出</b>，会少走很多弯路。' },
        { q: '缓慢推升的股票，什么时候该警惕出货？', a: '<b>一旦出现加速上涨</b>，就要时刻警惕出货机会。对应另一种：第一波火爆上涨的，调整后<b>第二波出现背驰或放巨量</b>，也要找机会走人。' },
      ]},
    ],
  });
})();
