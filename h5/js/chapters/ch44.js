/* 第44章 大资金买点 + 中枢才是根本 */
(function () {

  // ---- 主图1：大资金在低位第三类买点批量建仓 ----
  function optCh44() {
    const pts = [10, 15, 11.5, 14, 12, 18, 14.5, 16, 13, 17.5];
    const mkA = function (x0, x1, lo, hi, name) { return [{ xAxis: x0, yAxis: lo }, { xAxis: x1, yAxis: hi, name: name }]; };
    const mp = function (i, name, color, pos) {
      return { coord: [i, pts[i]], name: name, symbol: 'circle', symbolSize: 9, itemStyle: { color: color }, label: { show: true, color: color, fontSize: 10, position: pos, distance: 5, fontWeight: 'bold', formatter: function (p) { return p.name; } } };
    };
    const seg = function (x, y, name, color) {
      return { coord: [x, y], name: name, symbol: 'none', label: { show: true, color: color, fontSize: 12, fontWeight: 'bold', position: 'top', formatter: function (p) { return p.name; } } };
    };
    return {
      tooltip: { trigger: 'axis', axisPointer: { type: 'cross' } },
      grid: { left: 48, right: 80, top: 34, bottom: 36 },
      xAxis: { type: 'value', min: 0, max: 9, interval: 1 },
      yAxis: { type: 'value', scale: true, name: '价格' },
      series: [{
        name: '走势', type: 'line', data: pts.map(function (p, i) { return [i, p]; }),
        symbol: 'circle', symbolSize: 4, lineStyle: { width: 2, color: '#1f2937' }, itemStyle: { color: '#1f2937' },
        markArea: {
          silent: true, itemStyle: { color: 'rgba(37,99,235,0.10)' },
          label: { show: true, position: 'insideTop', formatter: function (p) { return p.name || ''; }, color: '#2563eb', fontSize: 11 },
          data: [mkA(0, 4, 11.5, 15, '中枢 [11.5,15]')],
        },
        markLine: {
          silent: true, symbol: 'none', lineStyle: { color: '#2563eb', type: 'dashed', width: 1 },
          label: { show: true, position: 'end', formatter: function (p) { return p.name; }, color: '#2563eb', fontSize: 10 },
          data: [
            { yAxis: 15, name: 'ZG=15' },
            { yAxis: 11.5, name: 'ZD=11.5' },
          ],
        },
        markPoint: { data: [
          mp(5, '第三类买点·批量建仓', '#16a34a', 'bottom'),
          seg(6.2, 19.5, '回抽不破 ZG=15', '#e74c3c'),
          seg(3, 16.5, '大资金不追最低点', '#9333ea'),
        ] },
      }],
    };
  }

  // ---- 主图2：中枢是根本，均线 / MACD 是辅助 ----
  const figRoot = `
<div class="fig" style="min-width:360px"><div class="lbl">中枢是根本，均线 / MACD 是辅助</div>
<div style="font-size:13px;line-height:2;color:#1f2937;text-align:center">
<div style="display:inline-block;background:#2563eb;color:#fff;padding:8px 26px;border-radius:8px;font-weight:bold;font-size:16px">中枢（根本）</div>
<br><span style="font-size:20px">▲</span><br>
<div style="display:inline-block;border:1px solid #9ca3af;padding:6px 16px;border-radius:6px;color:#374151">买卖点 · 背驰 · 走势类型</div>
<br><span style="color:#6b7280">—— 都建立在中枢之上 ——</span>
</div>
<div style="margin-top:8px;display:flex;justify-content:center;gap:16px;font-size:12px;color:#6b7280">
<span style="border:1px dashed #f59e0b;padding:4px 12px;border-radius:6px">均线系统（辅助）</span>
<span style="border:1px dashed #9333ea;padding:4px 12px;border-radius:6px">MACD（辅助）</span>
</div>
<div class="cap">第25课定性收尾：<span class="kw">“吻”属于均线系统，均线系统只是走势的简单数学处理，离不开或然率，与中枢完全不同</span>；均线系统本质上与 MACD 等指标是一回事，只能作<b>辅助</b>。<span class="hl">穷根究底，最终还是要搞清中枢。</span></div></div>`;

  // ---- 讲解点小图 ----
  const figB1 = mfig('第一类买点不适合大资金',
    drawZS([{ p: 16, tag: '顶' }, { p: 12 }, { p: 13.5, tag: '顶' }, { p: 8, tag: '底', label: '一买', color: '#16a34a' }],
      [{ lo: 12, hi: 13.5, x0: 0, x1: 2, label: '中枢' }], { w: 44, h: 104 }),
    '你一进去，大家都看着你、找机会吃你，无处潜伏');

  const figB2 = mfig('第二类买点：温柔慢慢来',
    drawZS([{ p: 8, tag: '底' }, { p: 14, tag: '顶' }, { p: 10.5, tag: '底', label: '二买', color: '#16a34a' }, { p: 15, tag: '顶' }],
      [{ lo: 10.5, hi: 14, x0: 0, x1: 3, label: '中枢' }], { w: 44, h: 104 }),
    '可以介入，但一般采取温柔办法，慢慢吸纳');

  const figB3 = mfig('第三类买点：批量建仓最安全',
    drawZS([{ p: 10, tag: '底' }, { p: 14, tag: '顶' }, { p: 12, tag: '底' }, { p: 16, tag: '顶', label: '离开' }, { p: 13, tag: '底', label: '三买', color: '#16a34a' }, { p: 17, tag: '顶' }],
      [{ lo: 12, hi: 14, x0: 0, x1: 3, label: '中枢' }], { zgzd: true, w: 40, h: 104 }),
    '低位大级别三买＝箭在弦上，时间利用率高');

  const figB4 = mfig('阻击的纪律：别做成庄家',
    '<div style="font-size:12px;line-height:1.9;color:#1f2937">阻击<b>控制好量</b><br>最失败 = <b>阻击成庄家</b><br>资金<b>绝对自由、无期限、无利息压力</b></div>',
    '最安全的保障，是自由的资金');

  const figM1 = mfig('均线系统 ≠ 中枢',
    '<div style="font-size:12px;line-height:1.9;color:#1f2937">“吻”属<b>均线系统</b><br>= 走势的<b>简单数学处理</b><br>= 离不开<b>或然率</b><br>与中枢<b>完全不同</b></div>',
    '不要把均线系统和中枢混在一起');

  const figM2 = mfig('MACD 与均线一回事：辅助',
    '<div style="font-size:12px;line-height:1.9;color:#1f2937">均线 ≈ MACD ≈ <b>辅助性工具</b><br>通俗、简单<br>不想深研究的可先搞清这些</div>',
    'MACD 灵敏度与参数有关，一般取 12/26/9');

  const figM3 = mfig('趋势背驰至少回跌到 B 段（中枢）',
    drawZS([{ p: 10, tag: '底' }, { p: 14, tag: '顶' }, { p: 12, tag: '底' }, { p: 16, tag: '顶' }, { p: 13, tag: '底', label: 'B段(中枢)' }, { p: 19, tag: '顶' }, { p: 11, tag: '底', label: '背驰→至少回到B段', color: '#16a34a' }],
      [{ lo: 12, hi: 14, x0: 0, x1: 1, label: 'A' }, { lo: 13, hi: 16, x0: 3, x1: 5, label: 'B' }], { w: 36, h: 104 }),
    '趋势背驰后，一定至少回跌到 B 段');

  const figM4 = mfig('多级别综合看背驰',
    '<div style="font-size:12px;line-height:1.9;color:#1f2937">日线<b>中段刚启动</b>：5 分钟背驰只能<b>打短差</b><br>日线<b>最后延伸</b>：1 分钟背驰可引发<b>暴跌</b><br><span class="hl">不能一看背驰就抛等跌 50%</span></div>',
    '背驰回跌力度与级别密切相关');

  __chapters.push({
    id: 'ch44', vol: '卷九 · 实战操作与图解', title: '第44章 大资金买点 + 中枢才是根本', source: '原文第22、25课',
    figures: [
      { kind: 'echarts', title: '大资金在第三类买点批量建仓', note: '第22课：大资金进不去又不想当庄家，最安全的介入位置是<b>低位的大级别第三类买点</b>。图中价格离开中枢 [11.5,15] 后回抽不破 ZG=15，构成<b>第三类买点</b>（绿色底），大资金在此<span class="hl">批量建仓</span>。理由：三买＝箭在弦上，时间利用率高；庄家已经货不少、成本还在附近，除非他钱出问题，否则不可能亏钱把货全倒给你。', option: optCh44 },
      { kind: 'html', title: '中枢是根本，均线 / MACD 是辅助', note: '第25课对均线系统、MACD 做<b>定性收尾</b>：<span class="hl">“吻”属于均线系统，只是走势的简单数学处理，离不开或然率，与中枢完全不同</span>；均线系统本质上与 MACD 等指标是一回事，只能作<b>辅助</b>。买卖点、背驰、走势类型，全部建立在<b>中枢</b>之上——穷根究底，最终要搞清的是中枢。', html: figRoot },
    ],
    sections: [
      { type: 'definition', title: '大资金在第三类买点建仓（第22课）', items: [
        { term: '① 大资金买不进最低点', text: '大资金要进去、又不想变庄家，需要很高技巧。<b>第一类买点不适合大资金</b>——你一进去，大家都看着你、找机会吃你，还到哪里潜伏下来？<span class="hl">最低点从来不是为大资金准备的。</span>', fig: figB1 },
        { term: '② 第二类买点：温柔慢慢来', text: '第二类买点<b>可以</b>介入，但一般都采取比较温柔的办法，<b>慢慢吸纳</b>。它适合从容建仓，但时间利用率不如第三类买点。', fig: figB2 },
        { term: '③ 第三类买点：批量建仓最安全', text: '在<b>低位的大级别第三类买点</b>介入比较安全：<span class="hl">第三类买点＝箭在弦上</span>，时间利用率高，突然横插一刀<b>批量建仓</b>。安全性在于庄家已经货不少、成本还在附近，除非他钱出问题，否则不可能亏钱把货全倒给你。', fig: figB3 },
        { term: '④ 阻击的纪律：别把阻击做成庄家', text: '阻击一定要<b>控制好量</b>，最失败的阻击就是<b>阻击成了庄家</b>；资金必须<b>绝对自由、没有期限、没有利息压力</b>，这是阻击最安全的保障。高手要对盘中庄家的脾性有充分感觉，对症下药。', fig: figB4 },
      ]},
      { type: 'definition', title: '中枢才是根本（第25课）', items: [
        { term: '⑤ 均线系统与中枢本质不同', text: '“吻”是和均线系统相关的，而<span class="kw">均线系统只是走势的一个简单数学处理，离不开或然率</span>，与后面说的中枢等概念<b>完全不同</b>。一定要搞清楚，不要把均线系统和中枢混在一起。', fig: figM1 },
        { term: '⑥ MACD 与均线一回事，都是辅助', text: '均线系统本质上和 MACD 等指标是<b>一回事</b>，只能是一种<span class="kw">辅助性工具</span>。它们通俗、简单，掌握起来快；如果不想太深研究，可以先把这些搞清楚。', fig: figM2 },
        { term: '⑦ 中枢才是根本', text: '<span class="hl">“学如不及”，穷根究底，最终还是要搞清中枢。</span>买卖点、背驰、走势类型都以中枢为根基；趋势中产生的背驰<b>一定至少回跌到 B 段（中枢）</b>，由此可预先知道至少的跌幅。', fig: figM3 },
        { term: '⑧ 多级别综合看背驰', text: '背驰的回跌力度和<b>级别</b>很有关系：日线上涨中段刚启动、MACD 刚创新高时，5 分钟背驰只能打点短差；日线走势最后延伸阶段，1 分钟背驰足以引发暴跌。<span class="hl">必须多级别综合考察，绝不能一看背驰就抛等跌 50%。</span>', fig: figM4 },
      ]},
      { type: 'motivation', title: '从“工具”到“根本”的一次正本清源', text: '第22课示范了大资金的难处与章法：<b>大资金买不进最低点，只能在低位第三类买点批量建仓</b>——它把“买点”从纸面拉到真金白银的仓位尺度上。第25课则是一次<b>定性收尾</b>：前面反复用的均线、MACD，原来都只是<span class="kw">辅助性工具</span>，真正的地基是<span class="kw">中枢</span>。<span class="hl">工具可以帮你更快地看清，但决断的依据必须是结构本身。</span>这两课合在一起，把人从“指标迷信”里拉回“结构为王”的正道上。' },
      { type: 'pitfalls', title: '常见误区', items: [
        '以为<b>大资金可以在第一类买点建仓</b>（错：一买大家盯着你，无处潜伏）。',
        '把<b>阻击做成庄家</b>（错：阻击要控制好量，最失败就是把自己买成庄家）。',
        '把<b>均线系统和中枢混为一谈</b>（错：均线是数学处理、离不开或然率，与中枢完全不同）。',
        '把<b>MACD 当成根本</b>（错：MACD 与均线一回事，只是辅助）。',
        '<b>一看背驰就抛等跌 50%</b>（错：背驰回跌力度与级别有关，必须多级别综合看）。',
      ]},
      { type: 'exercises', title: '练习', items: [
        { q: '为什么大资金不适合在第一类买点建仓？', a: '第一类买点出现时，大家都看着这个位置，大资金一进去<b>无处潜伏</b>，别人会找机会吃你。所以一买不适合，二买可以（温柔慢慢来），<b>低位大级别三买批量建仓最安全</b>。' },
        { q: '均线系统和中枢是什么关系？', a: '<b>完全不同</b>。均线系统只是走势的<b>简单数学处理</b>，离不开或然率；中枢是走势的<b>结构</b>。均线系统与 MACD 是一回事，只能作<b>辅助</b>，中枢才是根本。' },
        { q: '“趋势中产生的背驰，一定至少回跌到哪里”？', a: '<b>一定至少回跌到 B 段（中枢）</b>中。因此趋势背驰发生后，可以预先知道<b>至少的跌幅</b>——就是回跌进 B 段。' },
      ]},
    ],
  });
})();
