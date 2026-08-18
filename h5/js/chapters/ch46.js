/* 第46章 操作细节 · 一个具体走势的分析 */
(function () {

  // 主图1：a+A+b+B+c 完整走势的分解（结合律分解）
  function optCh46() {
    const pts = [8, 11, 10, 12, 10, 14, 12, 14, 12, 17];
    const mk = (x0, x1, lo, hi, name) => [{ xAxis: x0, yAxis: lo, name }, { xAxis: x1, yAxis: hi }];
    const mp = (i, name, color, pos) => ({ coord: [i, pts[i]], name, symbol: 'circle', symbolSize: 8, itemStyle: { color }, label: { show: true, color, fontSize: 10, position: pos, distance: 5, fontWeight: 'bold', formatter: function (p) { return p.name; } } });
    const seg = (x, y, name, color) => ({ coord: [x, y], name, symbol: 'none', label: { show: true, color, fontSize: 12, fontWeight: 'bold', position: 'top', formatter: function (p) { return p.name; } } });
    return {
      tooltip: { trigger: 'axis', axisPointer: { type: 'cross' } },
      grid: { left: 52, right: 92, top: 46, bottom: 40 },
      xAxis: { type: 'value', min: -0.3, max: 9.3, interval: 1 },
      yAxis: { type: 'value', scale: true, name: '价格' },
      series: [{
        name: '走势', type: 'line', data: pts.map((p, i) => [i, p]),
        symbol: 'circle', symbolSize: 4, lineStyle: { width: 2, color: '#1f2937' }, itemStyle: { color: '#1f2937' },
        markArea: {
          silent: true, itemStyle: { color: 'rgba(37,99,235,0.10)' },
          label: { show: true, position: 'insideTop', formatter: function (p) { return p.name || ''; }, color: '#2563eb', fontSize: 11 },
          data: [mk(1, 4, 10, 12, '中枢A [10,12]'), mk(5, 8, 12, 14, '中枢B [12,14]')],
        },
        markLine: {
          silent: true, symbol: 'none',
          lineStyle: { color: '#2563eb', type: 'dashed', width: 1 },
          label: { show: true, position: 'end', formatter: function (p) { return p.name; }, color: '#2563eb', fontSize: 10 },
          data: [
            { yAxis: 12, name: 'ZG(A)=12' }, { yAxis: 10, name: 'ZD(A)=10' },
            { yAxis: 14, name: 'ZG(B)=14' }, { yAxis: 12, name: 'ZD(B)=12' },
          ],
        },
        markPoint: { data: [
          mp(0, 'a起点', '#16a34a', 'bottom'),
          mp(9, 'c顶(背驰)', '#e74c3c', 'top'),
          seg(0.5, 9.6, 'a 进入段', '#1f2937'),
          seg(4.5, 13.4, 'b 次级别连接', '#9333ea'),
          seg(8.5, 15.6, 'c 背驰段', '#e74c3c'),
        ] },
      }],
    };
  }

  // 主图2：MACD 周期选择（先定比较段，再选周期）
  const figMacd = `
<div class="fig" style="min-width:330px"><div class="lbl">MACD 周期选择：先定比较段，再选周期</div>
<div style="font-size:12.5px;line-height:2.1;color:#1f2937;padding:4px 0">
<span style="background:#e0e7ff;color:#3730a3;padding:3px 10px;border-radius:6px"><b>①</b> 先定比较哪<b>两段走势</b></span><br>
<span style="color:#6b7280;padding-left:10px">按中枢与走势结构分析，选出要比较力度的两段</span><br>
<span style="background:#fef3c7;color:#92400e;padding:3px 10px;border-radius:6px"><b>②</b> 再选 <b>MACD 周期</b></span><br>
<span style="color:#6b7280;padding-left:10px">1分钟 / 5分钟 / 30分钟，哪个图上力度对比更清晰、更灵敏就用哪个</span><br>
<span style="background:#f0fdf4;color:#166534;padding:3px 10px;border-radius:6px"><b>③</b> 最后用 MACD <b>辅助</b>判断背驰</span><br>
<span style="color:#6b7280;padding-left:10px">黄白线最优先，柱子面积在复杂走势里重要</span>
</div>
<div class="cap">1分钟与30分钟 MACD <b>无实质区别</b>，只是计算周期不同、灵敏与迟钝之别；<span class="hl">先定比较段，再选周期</span>，顺序不能颠倒。</div></div>`;

  __chapters.push({
    id: 'ch46', vol: '卷九 · 实战操作与图解', title: '第46章 操作细节 · 一个具体走势的分析', source: '原文第50、54课',
    figures: [
      { kind: 'echarts', title: '一个完整走势的分解：a+A+b+B+c', note: '一个<b>上涨趋势</b>的标准分解：<span class="kw">a（进入段）</span> + <span class="kw">A（中枢）</span> + <span class="kw">b（连接段）</span> + <span class="kw">B（中枢）</span> + <span class="kw">c（背驰段）</span>。注意<span class="hl">两个同级别中枢 A、B 之间必须有次级别的走势 b 连接</span>（紫色段）——这是第54课反复强调的<b>分解原则</b>。中枢 A、B 各由"下-上-下"三段次级别重叠构成（蓝色矩形），c 段最后创新高却与 b 段力度衰减，即趋势背驰。整个分解可任意"重新括号"（结合律），但连接关系不变。', option: optCh46 },
      { kind: 'html', title: '操作细节：MACD 只是力度辅助', note: '第50课的一个关键细节：<span class="hl">MACD 只是力度比较的辅助</span>。1分钟和30分钟的 MACD 之间并无实质区别，只是计算周期不同（线性、灵敏与迟钝之别）。所以正确的顺序是：<b>先定好比较哪两段走势，然后才去选择用 1 分钟还是 30 分钟的 MACD 更适宜辅助判断</b>。绝不能颠倒——先看 MACD、再凑走势，是本末倒置。', html: figMacd },
    ],
    sections: [
      { type: 'definition', title: '操作中的细节（第50课）', items: [
        { term: '① 先定比较段，再选 MACD 周期', text: 'MACD 只是<b>力度比较的辅助</b>。1分钟和30分钟 MACD 之间没有实质区别，只是计算周期不同、稍微灵敏与迟钝的区别。因此顺序原则是：<span class="hl">先根据中枢与走势运动的分析，选出需要比较力度的走势段，最后才用 MACD 辅助判断</span>。两段走势在1分钟上很复杂、在30分钟上很清晰，就选30分钟看。', fig: mfig('顺序：比较段 → 周期', '<div style="font-size:12px;line-height:1.9;color:#1f2937">先定比较哪<b>两段走势</b><br>→ 再选 <b>MACD 周期</b>（灵敏度）<br>→ 最后辅助判断<b>背驰</b></div>', '1分钟/30分钟 MACD 无实质区别，只是灵敏度不同') },
        { term: '② 学习路径：静态 → 模拟 → 实盘', text: '理论应用到实践是有过程的：<b>第一步</b>先看懂所有<b>已有的走势</b>（静态分析）；<b>第二步</b>做<b>模拟操作</b>，每次记录下来、根据后续走势总结修正；<b>第三步</b>有足够把握后才开始<b>真正买卖</b>。一开始就真金白银，绝大多数人会在输赢上迷失，忽略操作本身的问题。', fig: mfig('学习路径：静态→模拟→实盘', '<div style="font-size:12px;line-height:1.9;color:#1f2937">① 看懂<b>已有走势</b>（静态）<br>→ ② <b>模拟操作</b>（记录·总结）<br>→ ③ <b>真正买卖</b>（实盘）</div>', '先静态、再模拟、最后实盘，先交学费是正常的') },
        { term: '③ 搞清理论是为了树立信心，绝非迷信', text: '为什么一定要把理论搞清楚？因为要<b>先从根子上解开疑惑</b>，知道理论如几何般严格精确，才能<span class="hl">无疑地操作而不瞻前顾后</span>。但这绝对不能迷信——<b>因为相信某个人而相信某套理论，就是脑子进水</b>，必须从道理、逻辑上彻底搞清楚。买点买了还跌、卖点卖了还涨，是精度不足的正常现象。', fig: mfig('搞清理论＝树立信心', '<div style="font-size:12px;line-height:1.9;color:#1f2937">理论如<b>几何般严格</b><br>→ 从道理逻辑<b>彻底搞清楚</b><br>→ 才能<b>无疑地操作</b><br><span style="color:#6b7280">"因为相信谁而相信"=脑子进水</span></div>', '不迷信，要真懂；精度靠长期实践提高') },
      ]},
      { type: 'definition', title: '一个具体走势的分析（第54课）', items: [
        { term: '④ 结合律：连接运算可重新括号', text: '走势类型的连接运算<span class="kw">符合结合律</span>，但<b>不满足交换律</b>。这意味着对同一个走势，可以<b>拆散重分、重新括号</b>（如 <code>a+B+b = (a+B1)+B2+(B3+b)</code>），从而得到不同的分解，但各段的先后次序不能颠倒。这是第54课进行"多样性分解"的理论基础。', formula: 'a+B1+B2+B3+b = (a+B1)+B2+(B3+b)　（结合律）', fig: mfig('结合律：a+A+b 可重新括号', drawZS([{ p: 8, tag: '底', label: 'a' }, { p: 11 }, { p: 10 }, { p: 12, tag: '顶' }, { p: 10.5, label: 'A' }, { p: 13.5, tag: '顶', label: 'b' }], [{ lo: 10, hi: 12, x0: 1, x1: 4, label: '中枢A' }], { w: 40, h: 100 }), '连接满足结合律（可重组括号），不满足交换律') },
        { term: '⑤ 分解原则：两同级别中枢间必有次级别连接', text: '<span class="hl">两个同级别中枢之间必须有次级别的走势连接</span>。例如把 <code>g0d4</code> 分解成 <code>(d1g1+g1d2+d2g2)+(g2d3+d3g3+g3d4)</code> 是不被允许的，因为两个同级别中枢之间没有次级别连接（且方向不对）。这与"三次级别重叠扩展成高一级别中枢"的情况不同——后者允许三个小括弧相加而之间没有次级别。', fig: mfig('两同级别中枢间须有次级别连接', drawZS([{ p: 8, label: 'a', color: '#1f2937' }, { p: 11 }, { p: 10 }, { p: 12 }, { p: 10, label: 'A', color: '#2563eb' }, { p: 14, label: 'b', color: '#9333ea' }, { p: 12 }, { p: 14 }, { p: 12, label: 'B', color: '#2563eb' }, { p: 15, label: 'c', color: '#e74c3c' }], [{ lo: 10, hi: 12, x0: 1, x1: 4, label: '中枢A' }, { lo: 12, hi: 14, x0: 5, x1: 8, label: '中枢B' }], { w: 34, h: 104 }), 'b 是连接 A、B 两同级别中枢的次级别走势') },
        { term: '⑥ 分解多样性：选当下有明确意义的那种', text: '同一个走势有多种合法分解，<b>哪一种都可以，但要选择当下有明确意义、能指导操作的那一种</b>（例如是中枢震荡的，或有第三类买卖点的）。但所有分解必须符合分解原则，否则就乱套了。多种分解不是麻烦，反而是<b>相互印证</b>的好办法。', fig: mfig('分解多样性：两种都合法', '<div style="font-size:11.5px;line-height:1.8;color:#1f2937">g0d4 = g0d1+<b style="color:#2563eb">(d1g1+g1d2+d2g2)</b>+g2d3+d3g3+g3d4<br>= g0d1+d1g1+g1d2+<b style="color:#2563eb">(d2g2+g2d3+d3g3)</b>+g3d4<br><span style="color:#6b7280">选"当下有明确意义"的那一种</span></div>', '两种分解都合法，选能当下指导操作的一种') },
        { term: '⑦ 三个次级别中枢重叠 → 高一级别中枢', text: '当三个次级别中枢的波动区间发生重叠，就构成<span class="kw">高一级别的中枢</span>。第54课中，<code>g0g5 = g0d1 + {(d1g1+g1d2+d2g2)+(g2d3+d3g3+g3d4)+(d4g4+g4d5+d5g5)}</code>，大括弧里三个1分钟中枢重叠构成一个5分钟中枢（区间 [d2,g5]）。此时要把1分钟走势当成线段，高低点即线段端点。', fig: mfig('三个1分钟中枢重叠→5分钟中枢', drawZS([{ p: 11 }, { p: 10 }, { p: 12 }, { p: 10.5 }, { p: 12.5 }, { p: 11 }, { p: 13 }, { p: 11 }], [{ lo: 10, hi: 12, x0: 0, x1: 2, label: '①' }, { lo: 10.5, hi: 12.5, x0: 2, x1: 4, label: '②' }, { lo: 11, hi: 13, x0: 4, x1: 6, label: '③' }], { w: 34, h: 100 }), '三中枢重叠区间[11,12]＝高一级别(5分钟)中枢') },
      ]},
      { type: 'motivation', title: '从"静态分解"到"当下操作"', text: '第50、54课是一对绝配：<b>第50课</b>解决"操作中的细节"——MACD 只是辅助、先定比较段再选周期、按"静态→模拟→实盘"的路径走；<b>第54课</b>则给出一张具体走势图的完整分解示范，把"结合律""分解原则""多样性分解""级别扩展"这些抽象规则落到了一个个 g/d 点上。二者合在一起传达同一个信息：<span class="hl">缠论的分析是可严格验证、可当下执行的</span>——先把已有的图分析清楚，再把分解用到当下的走势上，操作才有了确定的地基。' },
      { type: 'pitfalls', title: '常见误区', items: [
        '<b>先看 MACD、再凑走势</b>——错。MACD 只是辅助，必须先定比较哪两段，再选周期。',
        '把 1 分钟和 30 分钟 MACD 当成两套不同的东西——它们<b>无实质区别</b>，只是计算周期与灵敏度不同。',
        '两个同级别中枢<b>直接相贴</b>（中间没有次级别连接）当成合法分解——这违反分解原则，不被允许。',
        '把<b>三次级别重叠扩展成高一级别中枢</b>与"两个同级别中枢"混为一谈——两者规则不同，前者允许无次级别连接。',
        '迷信"因为相信某人而相信理论"，而非从道理逻辑上彻底搞清——这是操作心理上最大的隐患。',
      ]},
      { type: 'exercises', title: '练习', items: [
        { q: '一段走势在 1 分钟图上的 MACD 很杂乱，30 分钟图上则两个柱子面积清晰可辨，应该用哪个图辅助判断背驰？', a: '用<b>30 分钟</b>的 MACD。顺序是先定好要比较力度的两段走势，再选择更适宜辅助判断的周期（关系到灵敏度）；1分钟与30分钟 MACD 无实质区别。' },
        { q: '为什么把 g0d4 分解成 (d1g1+g1d2+d2g2)+(g2d3+d3g3+g3d4) 是不被允许的？', a: '因为括弧中的<b>两个同级别中枢之间没有次级别的走势连接</b>，且连接方向不对；分解必须符合"两同级别中枢间必有次级别连接"的原则（这与三次级别重叠扩展成高一级别中枢的情况不同）。' },
        { q: '"结合律"给走势分析带来了什么好处？', a: '走势类型的连接运算<b>满足结合律（不满足交换律）</b>，因此同一个走势可以拆散重分、重新括号，得到多种合法分解；据此可选择<b>当下有明确意义、能指导操作</b>的那一种分解，并用多种分解相互印证。' },
      ]},
    ],
  });
})();
