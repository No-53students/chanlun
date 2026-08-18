/* 第2章 K线与包含关系（依赖 js/core.js 的全局函数） */
(function () {
  const figUpDown = `
<div class="fig">
  <div class="lbl good">向上处理（取高高）</div>
  ${klineSVG([mk(90,100,true), mk(92,98,true)])}
  <div class="cap">两根K线，大包小</div>
</div>
<div class="arrow">→</div>
<div class="fig">
  <div class="lbl good">合并结果</div>
  ${klineSVG([{o:96,c:99,l:92,h:100}])}
  <div class="cap">新H=max=100<br>新L=max=92</div>
</div>
<div class="fig" style="margin-left:24px">
  <div class="lbl bad">向下处理（取低低）</div>
  ${klineSVG([mk(90,100,false), mk(92,96,false)])}
  <div class="cap">两根K线，大包小</div>
</div>
<div class="arrow">→</div>
<div class="fig">
  <div class="lbl bad">合并结果</div>
  ${klineSVG([{o:99,c:92,l:90,h:96}])}
  <div class="cap">新H=min=96<br>新L=min=90</div>
</div>`;

  __chapters.push({
    id: 'ch2', title: '第2章 K线与包含关系', source: '原文第62、65课',
    figures: [
      { kind: 'echarts', title: '包含处理：合并前后对比', note: '灰色细线是原始 K 线，<b>黄色虚线</b>是被包含的 K 线，<b>彩色粗线</b>是合并后的新 K 线。本例有三处包含：第 2 根包住第 3 根、第 4 根包住第 5 根、第 8 根包住第 9 根。', option: optCh2 },
      { kind: 'html', title: '方向决定结果：向上取高高 vs 向下取低低', note: '同样两根“大包小”的 K 线，<b>方向不同，合并结果不同</b>。这正是最容易出错的地方——方向看的是“之前的趋势”，不是当前两根的高点谁高。', html: figUpDown },
    ],
    sections: [
      { type: 'definition', title: 'K 线与包含关系', items: [
        { term: '① K 线的有效信息', text: '一根 K 线由开盘价 O、最高价 H、最低价 L、收盘价 C 刻画。缠论做几何分析时<b>只看 H 与 L</b>（即高低点区间 <code>[L, H]</code>），不分阳线阴线，用它判断“区间是否重叠”。' },
        { term: '② 包含关系的定义', text: '相邻两根 K 线，若一根的<b>高低点全在另一根的范围里</b>（即一根的 H ≥ 另一根的 H，且其 L ≤ 另一根的 L），就称二者存在<span class="hl">包含关系</span>，必须合并成一根新 K 线。', formula: 'K1 包含 K2 ⟺ K1.H ≥ K2.H 且 K1.L ≤ K2.L' },
        { term: '③ 包含关系的处理（第62课）', text: '<b>向上时</b>：把两根 K 线的<span class="kw">最高点当高点</span>、<span class="kw">低点中较高者当低点</span>合并。<br><b>向下时</b>：把两根 K 线的<span class="kw">最低点当低点</span>、<span class="kw">高点中较低者当高点</span>合并。<br>经过这样处理，任何 K 线图都能处理成<b>没有包含关系</b>的图形。', formula: '向上：新H=max(H₁,H₂)，新L=max(L₁,L₂)<br>向下：新H=min(H₁,H₂)，新L=min(L₁,L₂)' },
        { term: '④ 严格几何记号（第65课）', text: '用 <code>[di, gi]</code> 记第 i 根 K 线的最低与最高构成的区间。<b>向上时</b>，顺次 n 个包含关系的 K 线组，等价于区间 <code>[max di, max gi]</code> 的 K 线；<b>向下时</b>，等价于 <code>[min di, min gi]</code> 的 K 线。' },
        { term: '⑤ 顺序原则与结合律（第65课）', text: '包含关系<b>不符合传递律</b>：第1、2根是包含、第2、3根也是包含，<b>不意味着第1、3根有包含关系</b>。因此必须遵守<span class="hl">顺序原则</span>：先用第1、2根确认出新 K 线，再用新 K 线去和第3根比，有包含继续合并，没有就按正常 K 线处理。' },
        { term: '⑥ 向上/向下的严格几何定义（第65课）', text: '假设第 n 根与第 n+1 根有包含关系，而第 n 根与第 n−1 根没有包含关系，那么：若 <code>gₙ ≥ gₙ₋₁</code>，称第 n−1、n、n+1 根 K 线是<span class="kw">向上</span>的；若 <code>dₙ ≤ dₙ₋₁</code>，称是<span class="kw">向下</span>的。（<code>gₙ &lt; gₙ₋₁</code> 且 <code>dₙ &gt; dₙ₋₁</code> 本身就是包含关系，违反“第 n 与 n−1 无包含”的假设。）' },
      ]},
      { type: 'motivation', title: '为什么要先做包含处理', text: '分型、笔等后续构件都要求“相邻的<b>独立</b> K 线”。如果不消除包含关系，一根大 K 线包住多根小 K 线，会造成“虚假的多根 K 线”，让分型判断出错。包含处理的本质是<b>消除相邻 K 线的重叠干扰，只保留有效的高低点信息</b>，使后续所有判断都有统一、唯一的标准。' },
      { type: 'pitfalls', title: '常见误区', items: [
        '把包含处理当成“简单取并集/交集”——它是<b>有方向</b>的：向上取高高、向下取低低。',
        '忽略<b>顺序原则</b>——必须从左到右递推合并，不能跳着合并。',
        '以为包含关系有<b>传递性</b>——第65课明确：第1、2根包含且第2、3根包含，不推出第1、3根包含。',
        '用“当前两根谁高”判断方向——方向要看<b>之前的趋势</b>（第65课的几何定义）。',
      ]},
      { type: 'exercises', title: '练习', items: [
        { q: '三根 K 线（记为 (H, L)）：(110,100)、(108,105)、(115,112)，哪些存在包含关系？如何处理？', a: '第1根(110,100)与第2根(108,105)：110≥108 但 100≤105，第1根高点高、第2根低点低，<b>互不包含</b>。第2根与第3根(115,112)：115≥108 且 112≥105，第3根高点更高、低点也更高，<b>互不包含</b>。此例无包含关系。' },
        { q: '两根 K 线 (102, 92) 与 (101, 91)，若走势向上，合并后的 K 线是什么？', a: '第1根把第2根整个包住（102≥101 且 92≤91），存在包含关系。向上取高高：新 H = max(102,101)=102，新 L = max(92,91)=92，合并成 (102, 92)，即保留第1根，第2根被“吃掉”。' },
      ]},
    ],
  });
})();
