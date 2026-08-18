/* 第37章 不测而测 · 走势预测的精确意义 */
(function () {

  // ---- 主图1：ECharts 中枢后的完全分类（上移 / 震荡 / 下移 三路径） ----
  function optCh37() {
    const main = [[0, 10], [1, 14], [2, 11], [3, 13], [4, 12]];
    const up = [[4, 12], [5, 14], [6, 16]];
    const mid = [[4, 12], [5, 12.5], [6, 12.2]];
    const dn = [[4, 12], [5, 10], [6, 8]];
    const seg = (x, y, name, color, pos) => ({ coord: [x, y], name, symbol: 'none', label: { show: true, color, fontSize: 11, fontWeight: 'bold', position: pos, formatter: function (p) { return p.name; } } });
    const mk = (x0, x1, lo, hi, name) => [{ xAxis: x0, yAxis: lo, name }, { xAxis: x1, yAxis: hi }];
    return {
      tooltip: { trigger: 'axis', axisPointer: { type: 'cross' } },
      grid: { left: 48, right: 70, top: 40, bottom: 40 },
      xAxis: { type: 'value', min: 0, max: 6, interval: 1 },
      yAxis: { type: 'value', scale: true, name: '价格' },
      series: [
        { name: '中枢', type: 'line', data: main, symbol: 'circle', symbolSize: 5, lineStyle: { width: 2, color: '#1f2937' }, itemStyle: { color: '#1f2937' },
          markArea: {
            silent: true, itemStyle: { color: 'rgba(37,99,235,0.10)' },
            label: { show: true, position: 'insideTop', formatter: function (p) { return p.name || ''; }, color: '#2563eb', fontSize: 11 },
            data: [mk(0, 4, 11, 13, '中枢 [11,13]')],
          },
          markPoint: { data: [seg(1.5, 8.5, '← 先形成一个中枢，然后让市场选择', '#2563eb', 'bottom')] } },
        { name: '上移', type: 'line', data: up, symbol: 'circle', symbolSize: 5, lineStyle: { width: 2.2, color: '#e74c3c' }, itemStyle: { color: '#e74c3c' },
          markPoint: { data: [seg(6, 16.3, '上移 → 第三类买点', '#e74c3c', 'top')] } },
        { name: '震荡', type: 'line', data: mid, symbol: 'circle', symbolSize: 4, lineStyle: { width: 2, color: '#9ca3af', type: 'dashed' }, itemStyle: { color: '#9ca3af' },
          markPoint: { data: [seg(6, 12.4, '震荡 → 盘整延续', '#6b7280', 'bottom')] } },
        { name: '下移', type: 'line', data: dn, symbol: 'circle', symbolSize: 5, lineStyle: { width: 2.2, color: '#16a34a' }, itemStyle: { color: '#16a34a' },
          markPoint: { data: [seg(6, 7.6, '下移 → 第三类卖点', '#16a34a', 'bottom')] } },
      ],
    };
  }

  // ---- 主图2：分段函数示意（不同区间 → 不同走势类型） ----
  const figStep = `
<div class="fig" style="min-width:340px"><div class="lbl">走势预测＝分段函数：转折只在边界发生</div>
<svg viewBox="0 0 440 150" width="440" height="150" style="display:block;background:#fff">
  <line x1="20" y1="75" x2="420" y2="75" stroke="#9ca3af" stroke-width="1.5"/>
  <polygon points="420,75 412,71 412,79" fill="#9ca3af"/>
  <text x="424" y="79" font-size="10" fill="#6b7280">X</text>
  <line x1="20" y1="104" x2="180" y2="104" stroke="#16a34a" stroke-width="3"/>
  <circle cx="180" cy="104" r="3.5" fill="#fff" stroke="#16a34a" stroke-width="2"/>
  <text x="100" y="126" font-size="11" fill="#16a34a" text-anchor="middle" font-weight="bold">跌破 ZD → 下跌段（f=-1）</text>
  <line x1="180" y1="46" x2="420" y2="46" stroke="#e74c3c" stroke-width="3"/>
  <circle cx="180" cy="46" r="3.5" fill="#fff" stroke="#e74c3c" stroke-width="2"/>
  <text x="310" y="34" font-size="11" fill="#e74c3c" text-anchor="middle" font-weight="bold">升破 ZG → 上涨段（f=1）</text>
  <circle cx="180" cy="75" r="5" fill="#f59e0b"/>
  <text x="180" y="63" font-size="11" fill="#b45309" text-anchor="middle" font-weight="bold">X=边界（f=0）</text>
  <line x1="180" y1="30" x2="180" y2="126" stroke="#f59e0b" stroke-width="1.2" stroke-dasharray="3 3"/>
</svg>
<div class="cap">68课：任何分类都等价于一个<b>分段函数</b> f(X)（例如 f(X)=-1、0、1），关键是<b>分清每段的边界条件</b>。走势分类从 <b>[0,∞)</b> 出发：升破、跌破、震荡各为一段，<b>转折只发生在边界处</b>，每段结果都是某类走势的必然。</div></div>`;

  __chapters.push({
    id: 'ch37', vol: '卷八 · 理论深化', title: '第37章 不测而测 · 走势预测的精确意义', source: '原文第68课',
    figures: [
      { kind: 'echarts', title: '中枢后的完全分类：上移 / 震荡 / 下移三条路径', note: '第68课的核心：<span class="hl">不预测点位，只做完全分类</span>。一个中枢形成后，走势<b>只可能</b>走出三种情况：<b>升破 ZG（中枢上移→三买）、跌破 ZD（中枢下移→三卖）、在 ZG~ZD 之间（中枢震荡）</b>。把这三条路的边界条件定清楚、各自预设好操作，然后把选择交给市场，这就是<span class="kw">不测而测</span>。', option: optCh37 },
      { kind: 'html', title: '分段函数：不同区间对应不同走势类型', note: '第68课用一个数学例子说明预测的精确意义：<b>f(X)=-1（X&lt;0）、f(X)=0（X=0）、f(X)=1（X&gt;0）</b>——任何分类都等价于一个<span class="kw">分段函数</span>。<span class="hl">关键是分清每段的边界条件，转折只发生在分类边界处，每段结果都是某类走势的必然。</span>', html: figStep },
    ],
    sections: [
      { type: 'definition', title: '不测而测（第68课）', items: [
        { term: '① 真正的预测＝不测而测', text: '何谓预测？<span class="hl">真正的预测，就是不测而测。</span>这与通常的“猜点位、猜涨跌”不是一个概念。一般预测建立在“排除不可能项”上，而<b>每排除一个分类，等价于一次预测</b>，按概率乘法只会越来越不精确，最终仍逃不出概率的套子。', fig: mfig('不测而测', '<div style="font-size:12.5px;line-height:2;color:#1f2937">不猜点位、不猜涨跌<br>只<b style="color:#2563eb">完全分类</b>＋定<b style="color:#e74c3c">边界</b><br>→ 让市场自己选择</div>', '不测而测：不预测结果，只做完全分类') },
        { term: '② 预测的基础＝完全分类', text: '预测一点也不神秘。<span class="hl">所有预测的基础，就是分类，把所有可能的情况进行完全分类。</span>走势可以发生的情况，按任何标准分类，其可能情况都是<b>有限的</b>（一般就是三、四种情况）。所以那些“预测神准”的人，不过是在有限的分类里瞎猫碰死耗子。', fig: mfig('完全分类', drawZS([{ p: 10, tag: '底' }, { p: 14, tag: '顶' }, { p: 11, tag: '底' }, { p: 13, tag: '顶' }, { p: 12, label: '边界点', color: '#f59e0b' }], [{ lo: 11, hi: 13, x0: 0, x1: 4, label: '中枢' }], { w: 40, h: 92 }), '中枢后只分三类：升破/跌破/震荡') },
        { term: '③ 分类的正确原则＝不排除、只定边界', text: '分类后把不可能项排除、剩下“唯一结果”？那是脑子锈了的想法。<span class="hl">预测分类的唯一正确原则是：不进行任何排除，而是严格分清每种情况的边界条件。</span>因为<b>任何分类都等价于一个分段函数</b>，关键就是确定这分段函数的边界条件。', fig: mfig('只定边界、不排除', drawZS([{ p: 10, tag: '底' }, { p: 14, tag: '顶' }, { p: 11, tag: '底' }, { p: 13, tag: '顶' }, { p: 12, label: '分类点', color: '#f59e0b' }], [{ lo: 11, hi: 13, x0: 0, x1: 4, label: '中枢[11,13]' }], { w: 40, h: 92 }), '不排除任一可能，只分清“升破13/跌破11/其间”的边界') },
        { term: '④ 走势预测＝分段函数', text: '本ID理论中，分型、笔、线段、中枢、走势类型、买卖点……是不是预测？<span class="hl">是也不是。</span>因为本质上，本ID理论是<b>最好的一套分段原则</b>，随市场当下变化随时给出分段信号。<b>给出分段函数，就是给出最精确的预测，所有预测都是当下给出的。</b>', fig: mfig('分段函数', '<div style="font-size:12px;line-height:1.9;color:#1f2937">f(X)=-1　X∈(-∞,0)<br>f(X)=0　　X=0<br>f(X)=1　　X∈(0,∞)</div>', '走势预测＝确定分段函数的边界条件') },
      ]},
      { type: 'definition', title: '分段操作：让市场自己选择（第68课）', items: [
        { term: '⑤ 边界分段后，操作也分段化', text: '边界条件分段后，就要确定<b>一旦发生哪种情况就如何操作</b>——<span class="hl">把操作同样分段化</span>。然后把所有情况交给市场，让市场自己去当下选择。市场选择哪一段，就执行哪一段预设好的操作，如此而已。', fig: mfig('操作分段化', '<div style="font-size:12.5px;line-height:2;color:#1f2937"><b style="color:#e74c3c">升破 ZG</b> → 持有/买入<br><b style="color:#6b7280">其间震荡</b> → 打短差<br><b style="color:#16a34a">跌破 ZD</b> → 卖出</div>', '每种分类预设好操作，市场选哪段就干哪段') },
        { term: '⑥ 分段操作的最基本原则', text: '按本ID理论，任何时候都有一个永远的分段：<span class="hl">X=买点，买入；X=卖点，卖出；X 属于买卖点之间，就持有</span>——若前面是买点、卖点未出现，持有的就是股票，反之就是钱。<b>所有的操作，其实都是根据不同分段边界的一个结果。</b>', fig: mfig('买点买入/卖点卖出/其间持有', drawZS([{ p: 10, tag: '底', label: '买点' }, { p: 14, tag: '顶' }, { p: 11, tag: '底' }, { p: 15, tag: '顶', label: '卖点' }, { p: 12, tag: '底' }], [{ lo: 11, hi: 14, x0: 0, x1: 4, label: '中枢' }], { w: 40, h: 96 }), '买卖点之间持有，是最基本的分段操作') },
      ]},
      { type: 'motivation', title: '把“猜”换成“分类”，才是预测的解脱', text: '预测之所以折磨人，是因为它总把人引向“猜唯一结果”的死胡同，而唯一结果永远是概率游戏。第68课给出了彻底解脱：<b>不预测点位，只做完全分类</b>，把走势当成分段函数，<b>每一段的结果都是某类走势的必然，转折只在分类边界处发生</b>。操作者的功课，是<b>当下确定分段边界</b>、为每段预设好动作，然后<b>让市场自己去选择</b>——选了哪段，就干哪段。如此，预测不再需要“准”，因为每一次当下都在“准”地执行。' },
      { type: 'pitfalls', title: '常见误区', items: [
        '追求“预测唯一结果”——每<b>排除一个分类</b>就等价于一次预测，只会越来越不精确，仍是概率游戏。',
        '把预测当“猜点位/猜涨跌”——真正的预测是<b>不测而测</b>：不猜结果，只做完全分类。',
        '分不清“边界条件”就操作——<b>问题不是预测什么，而是确定分段边界</b>；边界不清，操作就乱。',
        '预设了操作却事后“万一……怎么办”反复纠结——<b>让市场自己选择</b>，没成为事实的分类就不要瞎操心。',
        '忽略“预测本身也是分力”——如同量子力学的<b>测不准</b>，任何预测都会介入被预测的结果，别迷信精确预测。',
      ]},
      { type: 'exercises', title: '练习', items: [
        { q: '什么是“不测而测”？', a: '<b>不预测点位、不猜涨跌，只把所有可能情况做完全分类</b>，定清每种情况的边界条件，为每种情况预设好操作，然后把选择交给市场。<b>市场选了哪段，就执行哪段预设的操作</b>——这就是最本质的预测（第68课）。' },
        { q: '为什么“分类后排除不可能的项”不是正确的预测方法？', a: '因为<b>每排除一个分类就等价于一次预测</b>，按概率乘法原则，最后所谓“精确”反而越来越不精确，仍逃不出概率的套子。正确原则是<b>不排除任何情况，只分清每种情况的边界条件</b>（第68课）。' },
        { q: '缠论中的“分段函数”指的是什么？', a: '把走势看成一个<b>分段函数 f(X)</b>（如 f(X)=-1、0、1），关键确定每段的<b>边界条件</b>（X 的范围）。走势分类从 [0,∞) 出发，升破、跌破、震荡各为一段，<b>转折只发生在分类边界处，每段结果都是某类走势的必然</b>（第68课）。' },
      ]},
    ],
  });
})();
