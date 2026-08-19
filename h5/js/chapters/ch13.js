/* 第9章 级别与递归 */
(function () {

  function optCh9() {
    const coarse = [10, 16, 11, 15];      // 5分钟图：3 段（一个中枢）
    const fine = [10, 13, 16, 14, 11, 13, 15]; // 1分钟图：同样 3 段，每段再拆 2 小段
    const ZD = 11, ZG = 15;
    const line = { symbol: 'circle', symbolSize: 5, lineStyle: { width: 2, color: '#1f2937' }, itemStyle: { color: '#1f2937' } };
    const area = (name, x1) => ({ silent: true, itemStyle: { color: 'rgba(37,99,235,0.10)' }, label: { show: true, position: 'insideTop', formatter: function (p) { return p.name || name; }, color: '#2563eb', fontSize: 11 }, data: [[{ xAxis: 0, yAxis: ZD, name: name }, { xAxis: x1, yAxis: ZG }]] });
    const zl = () => ({
      silent: true, symbol: 'none',
      label: { show: true, position: 'end', formatter: '{b}', color: '#2563eb', fontSize: 10 },
      lineStyle: { type: 'dashed', width: 1, color: '#2563eb' },
      data: [
        { yAxis: ZG, name: 'ZG=15' },
        { yAxis: ZD, name: 'ZD=11' },
      ],
    });
    const mp = (series, i, name, color, pos) => ({ coord: [i, series[i]], name, symbol: 'circle', symbolSize: 8, itemStyle: { color }, label: { show: true, color, fontSize: 10, position: pos, distance: 4, fontWeight: 'bold' } });
    const seg = (x, y, name, color, pos) => ({ coord: [x, y], name, symbol: 'none', label: { show: true, color, fontSize: 11, fontWeight: 'bold', position: pos } });
    return {
      tooltip: { trigger: 'axis', axisPointer: { type: 'cross' } },
      title: [
        { text: '5分钟图', left: 'center', top: 2, textStyle: { fontSize: 13, fontWeight: 'bold', color: '#1f2937' } },
        { text: '1分钟图', left: 'center', top: 206, textStyle: { fontSize: 13, fontWeight: 'bold', color: '#1f2937' } },
      ],
      grid: [
        { left: 60, right: 96, top: 26, height: 152 },
        { left: 60, right: 96, top: 228, height: 152 },
      ],
      xAxis: [
        { type: 'value', gridIndex: 0, min: 0, max: 3, interval: 1, axisLabel: { fontSize: 10 } },
        { type: 'value', gridIndex: 1, min: 0, max: 6, interval: 1, axisLabel: { fontSize: 10 } },
      ],
      yAxis: [
        { type: 'value', gridIndex: 0, scale: true },
        { type: 'value', gridIndex: 1, scale: true },
      ],
      series: [
        Object.assign({}, line, {
          name: '5分钟图', type: 'line', xAxisIndex: 0, yAxisIndex: 0, data: coarse.map((p, i) => [i, p]),
          markArea: area('中枢 [11,15]', 3),
          markLine: zl(),
          markPoint: { data: [
            mp(coarse, 0, '底', '#16a34a', 'bottom'),
            mp(coarse, 1, '顶', '#e74c3c', 'top'),
            mp(coarse, 2, '底', '#16a34a', 'bottom'),
            mp(coarse, 3, '顶', '#e74c3c', 'top'),
            seg(0.5, 14.5, '①上', '#2563eb', 'top'),
            seg(1.5, 12, '②下', '#2563eb', 'bottom'),
            seg(2.5, 14.5, '③上', '#2563eb', 'top'),
          ] },
        }),
        Object.assign({}, line, {
          name: '1分钟图', type: 'line', xAxisIndex: 1, yAxisIndex: 1, data: fine.map((p, i) => [i, p]),
          markArea: area('同一中枢 [11,15]', 6),
          markLine: zl(),
          markPoint: { data: [
            mp(fine, 0, '底', '#16a34a', 'bottom'),
            mp(fine, 2, '顶', '#e74c3c', 'top'),
            mp(fine, 4, '底', '#16a34a', 'bottom'),
            mp(fine, 6, '顶', '#e74c3c', 'top'),
            mp(fine, 1, '次级', '#94a3b8', 'top'),
            mp(fine, 3, '次级', '#94a3b8', 'bottom'),
            mp(fine, 5, '次级', '#94a3b8', 'top'),
            seg(3, 11.8, '每段再拆 2 小段', '#6b7280', 'top'),
          ] },
        }),
      ],
    };
  }

  function chainSVG() {
    const steps = [
      { t: 'a0：K线 → 分型 → 笔 → 线段', d: '（最低级别，可替换的启始规则）', f: '#fef3c7', s: '#f59e0b' },
      { t: 'a1：1分钟中枢 = 3个线段重叠', d: '（f1 启始：造出最低级别中枢）', f: '#e0e7ff', s: '#2563eb' },
      { t: 'a2：5分钟中枢 = 3个1分钟走势类型重叠', d: '（f2 递归：次级别走势类型重叠）', f: '#dcfce7', s: '#16a34a' },
      { t: 'a3：30分钟中枢 = 3个5分钟走势类型重叠', d: '（f2 递归：逐级上升，共 8 个级别）', f: '#f3e8ff', s: '#9333ea' },
    ];
    const bw = 400, bh = 50, gap = 40, cx = 260;
    const H = steps.length * (bh + gap) - gap;
    let s = `<svg viewBox="0 0 520 ${H}" width="520" height="${H}" style="display:block;max-width:100%">`;
    s += `<defs><marker id="arr" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6 Z" fill="#2563eb"/></marker></defs>`;
    steps.forEach((st, i) => {
      const y = i * (bh + gap), x = cx - bw / 2;
      s += `<rect x="${x}" y="${y}" width="${bw}" height="${bh}" rx="8" fill="${st.f}" stroke="${st.s}" stroke-width="1.5"/>`;
      s += `<text x="${cx}" y="${y + 20}" text-anchor="middle" font-size="13" fill="#1f2937" font-weight="bold">${st.t}</text>`;
      s += `<text x="${cx}" y="${y + 38}" text-anchor="middle" font-size="11" fill="#6b7280">${st.d}</text>`;
      if (i < steps.length - 1) {
        const ay = y + bh;
        s += `<line x1="${cx}" y1="${ay}" x2="${cx}" y2="${ay + gap}" stroke="#2563eb" stroke-width="2" marker-end="url(#arr)"/>`;
        s += `<text x="${cx + 14}" y="${ay + gap - 8}" font-size="12" fill="#2563eb" font-weight="bold">${i === 0 ? 'f1' : 'f2'}</text>`;
      }
    });
    s += '</svg>';
    return s;
  }

  __chapters.push({
    id: 'ch13', vol: '卷三 · 中枢与走势', title: '第13章 级别与递归', source: '原文第63、81、84课',
    figures: [
      { kind: 'echarts', title: '显微镜：同一走势的不同精细度', note: '上面的<b>5分钟图</b>只能看到 3 段、一个中枢 <code>[11,15]</code>；换<b>1分钟图</b>，同样的 3 段每段内部还能再拆出 2 个小段。走势与中枢是<b>客观存在</b>的“观察物”，级别图只是<b>显微镜的倍数</b>——倍率越高，看到越精细的次级别结构，但那个中枢本身不变。', option: optCh9 },
      { kind: 'html', title: '递归定义：f1 与 f2', note: '级别不是凭空来的，是<b>递归</b>出来的：<b>f1(a0)=a1</b> 用分型/笔/线段搭出最低级别中枢；<b>f2(an)=an+1</b> 用“次级别走势类型的重叠”一级级往上造出更高级别中枢。f1 与 f2 是<b>两套不同的规则</b>。', html: chainSVG() },
    ],
    sections: [
      { type: 'definition', title: '级别的来源：递归定义', items: [
        { term: '① 递归定义解决存在性问题（第63课）', text: '一个数学/几何对象首先要证明其<b>存在</b>。前面关于中枢的递归定义，正是解决“中枢或走势类型是<b>按级别存在</b>”的存在性问题——它既是存在性证明，又是<b>可操作</b>的找中枢方法。', fig: mfig('递归 = 存在性证明 + 可操作方法', '<div style="font-size:12px;line-height:1.9;color:#1f2937">a0(K线) <b style="color:#f59e0b">→f1→</b> a1(1分钟中枢) <b style="color:#2563eb">→f2→</b> a2(5分钟中枢) <b style="color:#2563eb">→f2→</b> a3…</div>', '递归既证明“按级别存在”，又是找中枢的方法') },
        { term: '② 递归定义的两部分：f1 与 f2（第84课）', text: '中枢定义的关键在于<b>递归性</b>。一般递归定义由两部分组成：<span class="kw">一、f1(a0)=a1</span>；<span class="kw">二、f2(an)=an+1</span>。第二条（中枢过程规则）从不改变；第一条（启始规则）可随意设置，且 <b>f1 与 f2 可以是完全不同的两个函数</b>。', formula: 'f1(a0) = a1　；　f2(an) = a(n+1)', fig: mfig('两套规则：f1 与 f2', '<div style="font-size:12px;line-height:1.9;color:#1f2937"><b style="color:#f59e0b">f1(a0)=a1</b>：分型/笔/线段 → 最低级别中枢<br><b style="color:#2563eb">f2(an)=a(n+1)</b>：次级别走势类型重叠 → 更高级别中枢</div>', 'f1 启始（可替换），f2 过程规则（不变）') },
        { term: '③ f1：最低级别的构造（第84课）', text: '用<b>分型、线段</b>这样的函数关系去构造<b>最低级别</b>的中枢、走势类型（即 a1）。这是递归的<b>启始程序</b>，并非必然需要——也可用收盘价、成交量等定义，<b>只要能保证分解的唯一性</b>即可。', fig: mfig('f1：线段构造最低级别中枢', drawZS([{ p: 10, label: '线段1', color: '#f59e0b' }, { p: 15 }, { p: 11, label: '线段2', color: '#f59e0b' }, { p: 14 }, { p: 12, label: '线段3', color: '#f59e0b' }], [{ lo: 11, hi: 14, x0: 0, x1: 4, label: '1分钟中枢' }], { w: 40, h: 100 }), '3 个线段重叠 → 最低级别中枢（a1）') },
        { term: '④ f2：更高级别的构造（第84课）', text: '最低级别<b>以上</b>，用<b>另一套规则</b>（f2）去定义：更高级别中枢 = <span class="hl">至少三个连续次级别走势类型的重叠</span>。它和 f1 完全不同，但递归结构不变。', fig: mfig('f2：次级别走势类型重叠', drawZS([{ p: 10 }, { p: 16 }, { p: 11 }, { p: 15 }, { p: 12 }, { p: 17 }, { p: 13 }, { p: 16 }], [{ lo: 11, hi: 15, x0: 0, x1: 3, label: '次级别1' }, { lo: 12, hi: 16, x0: 2, x1: 5, label: '次级别2' }, { lo: 12, hi: 16, x0: 4, x1: 7, label: '次级别3' }], { w: 32, h: 100 }), '3 个次级别走势类型重叠 → 更高级别中枢') },
        { term: '⑤ 存在性 vs 可操作性（第63课）', text: '光有存在性定义（递归）不够——像质数分解那样，理想化却可能算不动。于是有了<b>分型、笔、线段</b>这套变通方法，以及不同级别图的研究，让递归变成<b>当下可操作</b>的程序。', fig: mfig('从“存在”到“可操作”', '<div style="font-size:12px;line-height:1.9;color:#1f2937">递归定义（存在性）<b style="color:#2563eb">→</b> 分型/笔/线段（可操作）<b style="color:#2563eb">→</b> 不同级别图（落地）</div>', '光有存在性不够，要有可操作程序') },
      ]},
      { type: 'definition', title: '级别与图、与时间的关系', items: [
        { term: '① 显微镜比喻（第63课）', text: '<span class="hl">什么级别的图，和什么级别的中枢，没有任何必然关系。</span>走势类型与中枢是“显微镜下的观察物”，客观存在（由递归定义保证）；级别图只是“显微镜”，不同倍数看到不同精细程度。不能把显微镜和它观察的东西混为一谈。', fig: mfig('级别图 = 显微镜倍数', '<div style="display:flex;gap:8px;align-items:flex-start">' + drawZS([{ p: 10 }, { p: 16 }, { p: 11 }, { p: 15 }], [{ lo: 11, hi: 15, x0: 0, x1: 3, label: '中枢' }], { w: 30, h: 80 }) + drawZS([{ p: 10 }, { p: 13 }, { p: 16 }, { p: 14 }, { p: 11 }, { p: 13 }, { p: 15 }], [{ lo: 11, hi: 15, x0: 0, x1: 6, label: '同一中枢' }], { w: 30, h: 80 }) + '</div>', '左：5分钟图（粗）；右：1分钟图（细），中枢不变') },
        { term: '② 从 1 分钟递归出 8 个级别（第63课）', text: '选定<b>1分钟图</b>为最基本图：先定义分型/笔/线段 → 线段定义<b>1分钟中枢</b> → 1分钟走势类型 → 再按递归，逐步定义 <b>5分钟、30分钟、日、周、月、季度、年</b>的中枢与走势类型，共 <span class="kw">8 个级别</span>。', fig: mfig('从1分钟递归出8个级别', '<div style="font-size:12px;line-height:1.9;color:#1f2937">1分钟 <b style="color:#2563eb">→</b> 5分钟 <b style="color:#2563eb">→</b> 30分钟 <b style="color:#2563eb">→</b> 日 <b style="color:#2563eb">→</b> 周 <b style="color:#2563eb">→</b> 月 <b style="color:#2563eb">→</b> 季 <b style="color:#2563eb">→</b> 年</div>', '8 个级别，逐级递归') },
        { term: '③ 级别与时间无关（第84课）', text: '<span class="hl">级别，本质上与时间无关，级别也不是什么时间结构。级别，只是按照本ID的规则，自生长出来的一种分类方法。</span>一个最低级别不到的走势类型，可以生长 100 年也不长成更高级别。级别被破坏，就是因为被破坏，与时间因素无关。', formula: '级别 = 按规则自生长的分类，与时间无关', fig: mfig('级别与时间无关', drawZS([{ p: 10 }, { p: 14 }, { p: 11 }, { p: 13, label: '100年', color: '#6b7280', above: true }, { p: 12 }, { p: 14 }, { p: 11 }, { p: 13 }], [{ lo: 11, hi: 13, x0: 0, x1: 7, label: '仍是最低级别' }], { w: 30, h: 100 }), '最低级别走势可生长 100 年也不长级') },
        { term: '④ 三大客观支点（第84课）', text: '① <b>走势的不可重复性</b>；② <b>自同构性结构的绝对复制性</b>（任何级别结构相同，故能递归）；③ <b>理论的纯逻辑推导</b>。这三点构成缠论视角的三个客观支点。', fig: mfig('三大客观支点', '<div style="font-size:12px;line-height:1.9;color:#1f2937">① 走势的<b>不可重复性</b><br>② <b>自同构结构</b>的绝对复制性<br>③ 理论的<b>纯逻辑推导</b></div>', '这三点是缠论视角的客观支点') },
        { term: '⑤ 分型 ≠ 分形（第84课）', text: '<span class="kw">分型</span>建立在一个 K 线组合的<b>纯粹分类</b>基础上，结论绝对唯一；而<span class="kw">分形</span>是归纳性结构，<b>划分不唯一</b>、必有缺陷。两者本质不同。', fig: mfig('分型 ≠ 分形', '<div style="font-size:12px;line-height:1.9;color:#1f2937"><b style="color:#16a34a">分型</b>：K线组合的纯粹分类，结论唯一<br><b style="color:#e74c3c">分形</b>：归纳结构，划分不唯一、有缺陷</div>', '分型是唯一分类，分形是归纳近似') },
      ]},
      { type: 'motivation', title: '为什么“级别”是缠论的骨架', text: '级别让“同一段走势”能在不同层次被<b>唯一地分解</b>：1分钟的中枢、5分钟的走势、30分钟的趋势……层层递归。它同时回答了两个关键问题：<b>买卖点是哪个级别的</b>、<b>背驰是哪个级别的</b>。没有级别，中枢、走势类型、买卖点、背驰全都悬空；而“级别与时间无关”恰恰提醒我们：<b>不要被 K 线的时间周期图骗了</b>，级别是结构自生长的结果。' },
      { type: 'pitfalls', title: '常见误区', items: [
        '把“<b>级别</b>”等同于“<b>时间周期图</b>”（5分钟图 ≠ 5分钟级别；级别与图、与时间无关）。',
        '以为更高级别中枢必须<b>等更长的时间</b>才形成（错：级别与时间无关，可能瞬间扩展，也可能 100 年不长级）。',
        '混淆 <b>f1 与 f2</b>：最低级别用“分型/笔/线段”，更高用“次级别走势类型重叠”，两套规则不同。',
        '把<b>分型</b>和<b>分形</b>混为一谈（分型是唯一分类，分形是归纳近似）。',
      ]},
      { type: 'exercises', title: '练习', items: [
        { q: '“5分钟图上的中枢就是5分钟级别的中枢”这句话对吗？', a: '<b>不对</b>。级别图（显微镜）与级别（观察物）没有必然关系。一个 5 分钟级别中枢可能出现在 30 分钟图上；反过来 5 分钟图上的某个中枢也可能是 1 分钟级别的。要看它由<b>哪个次级别的走势类型</b>重叠而成。' },
        { q: 'f1 和 f2 分别是什么？为什么它们是两套不同规则？', a: '<b>f1(a0)=a1</b>：用分型/笔/线段构造<b>最低级别</b>中枢（启始，可替换）；<b>f2(an)=a(n+1)</b>：用<b>次级别走势类型的重叠</b>构造更高级别中枢。最低级别之下没有更次级别可用，故必须换规则，所以两套不同。' },
      ]},
      { type: 'evolution', title: '级别：从“递归”到“自相似性自组”', text: '“级别”这个词在原文里被反复打磨：从最早的“次级别不能无限分”的递归交代，到 f1/f2 递归函数，再到第81课点破其哲学本质——级别是自相似性自组出来的。', items: [
        { term: '① 第17课（2006-12）：递归问题的第一次交代', text: '首次定义中枢时，缠师就埋下伏笔：“<span class="hl">这里有一个递归的问题，就是这次级别不能无限下去……级别之次也不可能无限</span>”，并给出最低级别用“单位 K 线重叠”的定义。级别是递归出来的，这一步只是交代了“有递归这回事”。', fig: mfig('递归不能无限分下去', drawZS([{ p: 10, label: '最低级别', color: '#f59e0b' }, { p: 14 }, { p: 11 }, { p: 13 }], [{ lo: 11, hi: 13, x0: 0, x1: 3, label: '单位K线重叠' }], { w: 38, h: 96 }), '次级别不能无限分，最低级别改用 K 线重叠') },
        { term: '② 第63/84课：f1 与 f2 递归函数', text: '级别被严格写成<b>递归定义</b>：<b>f1(a0)=a1</b>（用分型/笔/线段造最低级别中枢，启始规则可替换）；<b>f2(an)=a(n+1)</b>（用次级别走势类型重叠造更高级别，过程规则不变）。级别从此有了严格的数学结构，且<span class="hl">与时间无关</span>。', formula: 'f1(a0)=a1（启始，可替换）　f2(an)=a(n+1)（过程，不变）', fig: mfig('f1 与 f2 递归', '<div style="font-size:12px;line-height:1.9;color:#1f2937"><b style="color:#f59e0b">f1</b>：线段 → 最低级别中枢<br><b style="color:#2563eb">f2</b>：次级别走势类型重叠 → 更高级别</div>', '两套规则，递归造出全部级别') },
        { term: '③ 第81课（2007-09）：哲学本质——自相似性自组', text: '第81课把级别的问题讲到底：“<span class="hl">级别是自相似性自组出来的，或者说是生长出来的</span>”。人的贪嗔痴疑慢不变，自相似性就存在，级别就必然自组出来。<span class="hl">“走势是有生命的”</span>——级别不是人定的格子，是走势按基因图谱自己长出来的。', fig: mfig('级别自组，如生命生长', '<div style="font-size:12px;line-height:1.9;color:#1f2937">贪嗔痴疑慢 → 自相似性<br>→ <b style="color:#d97706">级别自组（生长）</b><br>“看走势，如听一朵花开”</div>', '级别是自相似性自组出来的，非人定格子') },
      ]},
      { type: 'quote', title: '级别的原话金句（第81课）', text: '级别不是人定的格子，而是自相似性自组出来的——缠师在第81课点破级别的哲学本质：', quotes: [
        { text: '级别是自相似性自组出来的，或者说是生长出来的。', src: '第81课' },
        { text: '看走势，不能光看一个级别，必须立体地看。', src: '第81课' },
        { text: '有多少不同构的自相似性结构，就有多少种分析股市的正确道路。', src: '第81课' },
      ]},
    ],
  });
})();
