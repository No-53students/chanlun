/* 第13章 走势分解与多义性 */
(function () {

  function optCh13() {
    const pts = [10, 14, 11, 13, 10, 14, 11, 13, 10, 14]; // 9 段 1 分钟震荡
    const mk = (x0, x1, lo, hi, name) => [{ xAxis: x0, yAxis: lo, name }, { xAxis: x1, yAxis: hi }];
    return {
      tooltip: { trigger: 'axis', axisPointer: { type: 'cross' } },
      grid: { left: 60, right: 40, top: 40, bottom: 40 },
      xAxis: { type: 'value', min: 0, max: 9, interval: 1 },
      yAxis: { type: 'value', scale: true, name: '价格' },
      series: [{
        name: '走势', type: 'line', data: pts.map((p, i) => [i, p]),
        symbol: 'circle', symbolSize: 5, lineStyle: { width: 2, color: '#1f2937' }, itemStyle: { color: '#1f2937' },
        markArea: {
          silent: true, itemStyle: { color: 'rgba(37,99,235,0.10)' },
          label: { show: true, position: 'insideTop', formatter: function (p) { return p.name || ''; }, color: '#2563eb', fontSize: 11 },
          data: [mk(0, 3, 11, 13, '5分钟中枢①'), mk(3, 6, 11, 13, '5分钟中枢②'), mk(6, 9, 11, 13, '5分钟中枢③')],
        },
      }],
    };
  }

  const figJiehe = `
<div class="fig" style="min-width:320px"><div class="lbl">结合律：a+B+b 的两种分解</div>
<div style="display:flex;align-items:center;gap:4px;font-size:13px;font-family:ui-monospace,Consolas,monospace;flex-wrap:wrap">
<span style="background:#e5e7eb;padding:4px 10px;border-radius:6px">a</span><span>+</span><span style="background:#bfdbfe;padding:4px 10px;border-radius:6px">B1</span><span style="background:#bfdbfe;padding:4px 10px;border-radius:6px">B2</span><span style="background:#bfdbfe;padding:4px 10px;border-radius:6px">B3</span><span>+</span><span style="background:#e5e7eb;padding:4px 10px;border-radius:6px">b</span>
</div><div class="cap">B = B1+B2+B3：30分钟中枢由 3 个 5 分钟走势构成</div>
<div style="display:flex;align-items:center;gap:4px;font-size:13px;font-family:ui-monospace,Consolas,monospace;flex-wrap:wrap;margin-top:10px">
<span style="background:#dcfce7;padding:4px 10px;border-radius:6px">(a+B1)</span><span>+</span><span style="background:#bfdbfe;padding:4px 10px;border-radius:6px">B2</span><span>+</span><span style="background:#dcfce7;padding:4px 10px;border-radius:6px">(B3+b)</span>
</div><div class="cap">重新组合后 = 3 个 5 分钟走势类型<br>符合结合律、但<b>不满足交换律</b></div></div>`;

  __chapters.push({
    id: 'ch13', title: '第13章 走势分解与多义性', source: '原文第33、35、36课',
    figures: [
      { kind: 'echarts', title: '中枢延伸 9 段：同一走势的两种级别', note: '9 段 1 分钟走势围绕中枢震荡：<b>每 3 段</b>可看成一个 5 分钟中枢（①②③），而 3 个 5 分钟中枢<b>完全重合</b>，就构成 1 个 30 分钟中枢。同一段走势，<b>两种级别分解都成立</b>——这就是多义性（第33课：中枢延伸 9 段即升级）。', option: optCh13 },
      { kind: 'html', title: '结合律：重新组合走势', note: '走势类型连接<b>符合结合律</b>：a+B+b 可以重组为 (a+B1)+B2+(B3+b)，把“一个 30 分钟中枢”重排成“三个 5 分钟走势类型”。利用它可以把走势重新组合得更清晰、更利于操作。', html: figJiehe },
    ],
    sections: [
      { type: 'definition', title: '三种多义性', items: [
        { term: '① 多义性都与中枢有关（第33课）', text: '<span class="hl">所有走势的多义性，都与中枢有关。</span>市场若总是标准的 a+A+b+B+c（A、B 中枢级别相同），就太简单了；正是中枢的延伸、扩展等，才让走势呈现多义性。' },
        { term: '② 第一种多义性：中枢延伸（第33课）', text: '一个 5 分钟中枢不断延伸，出现 <b>9 段以上</b> 1 分钟走势——每 3 段构成 1 个 5 分钟中枢，3 个 5 分钟中枢重合就解释成 1 个 <b>30 分钟中枢</b>。消除办法：限制中枢延伸——<span class="hl">延伸不能超过 5 段；一旦出现第 6 段延伸（加形成中枢本身 3 段，共 9 段），就构成更大级别中枢</span>。', formula: '延伸 ≤ 5 段 → 本级别；延伸 ≥ 6 段（共9段）→ 更大级别中枢' },
        { term: '③ 第二种多义性：模本简略（第33课）', text: '不同级别图是对真实走势<b>不同精度</b>的模本。走势级别严格说应从<b>每笔成交</b>递归精确确认，与 5/30 分钟等图无关；用 1/5/30/日/周/月/季/年这套级别，只是<b>简略</b>（你完全可以按等比数列自设级别序列）。' },
        { term: '④ 第三种多义性：多种合理释义（第33课）', text: '还有一种<b>有实质意义</b>的多义性：走势分析中的多种<b>合理释义</b>，它们都符合理论内在逻辑。这种多义性不是负担，反而可用来<b>从多角度</b>分析同一走势。' },
        { term: '⑤ 多义性 ≠ 含糊性（第36课）', text: '含糊性是理论基础不牢的表现；<span class="hl">多义性则是站在严格、精确的理论基础上，用同一理论的不同视角分析同一现象</span>。无论怎么组合，都不会违反理论。' },
      ]},
      { type: 'definition', title: '结合律与重新组合', items: [
        { term: '① 走势类型连接的结合律（第36课）', text: '走势类型连接符合<b>结合律</b>：<code>A+B+C = (A+B)+C = A+(B+C)</code>，A、B、C 的级别<b>可以不同</b>。但<span class="hl">不满足交换律</span>（A+B ≠ B+A）——这就是该运算的特别之处。', formula: 'A+B+C = (A+B)+C = A+(B+C)　（结合律；不交换）' },
        { term: '② 一个高级别走势的拆散重分（第35课）', text: '高级别走势类型由几个低级别走势类型连接而成。设 B（30分钟中枢）由 B1、B2、B3 三个 5 分钟走势构成，则 <code>a+B+b = a+B1+B2+B3+b = (a+B1)+B2+(B3+b)</code>，(a+B1)、B2、(B3+b) 都是 5 分钟走势类型——这正是“走势分解定理二”的由来。' },
        { term: '③ 按级别分解的释义（第36课）', text: '任何一段走势都可根据<b>不同级别</b>分解：<code>A = A1-1+…+A1-m1 = A5-1+…+A5-m5 = A30-1+…+A30-m30 = …</code>。选择某级别操作，等价于选择该等式列中某个子式进行操作。' },
        { term: '④ 当下判断依赖分解方式（第36课）', text: '当下判断的基础是<b>所采取的分解方式</b>：按 5 分钟分解与按 30 分钟分解，同一时间看到的走势意义不同；在 5 分钟分解里完成的走势，在 30 分钟却不一定完成。<b>不同分解角度，可当下看到不同级别的未完成走势。</b>' },
        { term: '⑤ 组合要点：避繁就简（第36课）', text: '利用结合律<b>重新组合</b>使走势更清晰。要点：<span class="hl">尽量避繁就简</span>——因为中枢扩展较复杂，若有组合能避免出现扩展，就采用该组合。当下采用哪种组合，就按该组合的图形意义来判断操作。' },
        { term: '⑥ 纯中枢角度的背驰释义（第33课）', text: '对 a+A+b+B+c，把 b 看成<b>向下离开</b>中枢 B、c 看成<b>向上离开</b>中枢 B。中枢对两个方向离开的回拉作用相同，故“向上离开比向下离开弱”（c&lt;b）就是顶背驰。站在中枢角度，<b>盘整背驰与背驰本质一样</b>，只是力度、级别、位置不同。' },
      ]},
      { type: 'motivation', title: '多义性让你“一眼看穿”走势', text: '多义性不是缺陷，而是缠论的强大之处：同一段走势，可以用<b>多个严格等价的角度</b>去分解——按级别、按结合律重组、按中枢位置。学会切换这些视角，就能把缠绕的走势<b>重新组合成最清晰、最利于操作</b>的形式；而“当下选择最有利组合”的本事，正是从“懂理论”到“会看图”的关键一步。' },
      { type: 'pitfalls', title: '常见误区', items: [
        '把<b>多义性</b>当成<b>含糊性</b>（多义性是严格理论下的多视角，含糊性是理论不牢）。',
        '中枢延伸<b>超过 5 段</b>还当本级别中枢看（应升级为更大级别中枢）。',
        '以为结合律也满足<b>交换律</b>（错：A+B ≠ B+A，顺序不可颠倒）。',
        '死守<b>一种分解</b>（应结合当下走势，选择最清晰、避免扩展的组合）。',
      ]},
      { type: 'exercises', title: '练习', items: [
        { q: '中枢延伸多少段会升级为更大级别中枢？', a: '<b>延伸超过 5 段</b>（即出现第 6 段延伸，加上形成中枢本身的 3 段，共 <b>9 段</b>）时，就构成更大级别中枢（第33课）。' },
        { q: '为什么说“走势类型连接符合结合律、但不满足交换律”？', a: '<b>结合律</b>：A+B+C=(A+B)+C=A+(B+C)，怎么分组结果一样；<b>不满足交换律</b>：A+B≠B+A，因为走势是有时间顺序的，先涨后跌和先跌后涨是两回事。' },
        { q: '“有实质意义的多义性”指什么？', a: '指同一走势存在<b>多种合理释义</b>（如按不同级别分解、按结合律重组），都符合理论逻辑。它不是含糊，而是可以<b>多角度</b>分析、选择最有利分解的工具。' },
      ]},
    ],
  });
})();
