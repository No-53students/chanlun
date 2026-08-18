/* 第4章 笔 */
(function () {
  const figThree = `
<div class="fig"><div class="lbl bad">✗ 共用一根K线（不算）</div>${klineAnnSVG([mk(9,11,true), mk(10,13,true), mk(9,11,false), mk(8,10,false), mk(9,11,true)], [{ i: 1, text: '顶', pos: 'top', color: '#e74c3c' }, { i: 3, text: '底', pos: 'bottom', color: '#16a34a' }, { i: 2, text: '共用K线', pos: 'top', color: '#f59e0b' }], { w: 46, h: 110, padT: 22, padB: 18 })}<div class="cap">顶分型与底分型<br>共用中间那根K线<br>违反结合律</div></div>
<div class="fig"><div class="lbl bad">△ 光顶底（最好不算）</div>${klineAnnSVG([mk(9,11,true), mk(10,13,true), mk(9,11,false), mk(9,11,true), mk(8,10,false), mk(9,11,true)], [{ i: 1, text: '顶', pos: 'top', color: '#e74c3c' }, { i: 4, text: '底', pos: 'bottom', color: '#16a34a' }, { i: 2, text: '无独立K线', pos: 'top', color: '#f59e0b' }], { w: 42, h: 110, padT: 22, padB: 18 })}<div class="cap">顶底之间没有<br>独立K线</div></div>
<div class="fig"><div class="lbl good">✓ 最基本图形（算）</div>${klineAnnSVG([mk(9,11,true), mk(10,13,true), mk(9,11,false), mk(10,11,true), mk(9,11,true), mk(8,10,false), mk(9,11,true)], [{ i: 1, text: '顶', pos: 'top', color: '#e74c3c' }, { i: 5, text: '底', pos: 'bottom', color: '#16a34a' }, { i: 3, text: '独立K线', pos: 'top', color: '#16a34a' }], { w: 40, h: 110, padT: 22, padB: 18 })}<div class="cap">顶底之间还有<br>一根独立K线</div></div>`;

  __chapters.push({
    id: 'ch06', vol: '卷二 · 形态学', title: '第6章 笔', source: '原文第62、65、77、81课',
    figures: [
      { kind: 'echarts', title: '笔的识别与连线', note: '<b>黄色折线</b>是“笔”——把相邻的顶分型与底分型依次连起来。底→顶为向上笔，顶→底为向下笔，上下交替。', option: optCh4 },
      { kind: 'html', title: '笔的三种基本图形（原文图3/4/5）', note: '顶和底之间必须<b>至少有一根独立 K 线</b>：共用一根 K 线（违反结合律）不算；光有顶底（中间无 K 线）最好也不算；顶底之间还有一根 K 线，才是一笔的<b>最基本图形</b>。', html: figThree },
    ],
    sections: [
      { type: 'definition', title: '笔的构成', items: [
        { term: '① 笔的定义（第62课）', text: '<span class="hl">两个相邻的顶和底之间构成一笔</span>。所谓笔，就是顶和底之间的其他波动都可以忽略不算。注意：一定是<b>相邻</b>的顶和底，隔了几个就不是了。', fig: mfig('相邻顶底 = 一笔', biLineSVG([{ p: 10, tag: '底' }, { p: 16, tag: '顶' }], { w: 70, h: 110 }), '底→顶 = 向上笔；顶→底 = 向下笔') },
        { term: '② 顶底之间至少一根 K 线（第62课）', text: '按结合律，顶和底之间必须<b>至少有一根 K 线</b>：顶底<b>共用一根 K 线</b>（违反结合律）不算一笔；光有顶和底、中间没有其他 K 线，最好也不算；顶底之间还有一根 K 线，是一笔的<b>最基本图形</b>（见上图）。', formula: '上升一笔 = 底分型 + 上升K线 + 顶分型<br>下降一笔 = 顶分型 + 下降K线 + 底分型', fig: mfig('顶底间至少一根独立 K 线', klineAnnSVG([mk(9, 11, true), mk(10, 13, true), mk(9, 11, false), mk(10, 11, true), mk(9, 11, true), mk(8, 10, false), mk(9, 11, true)], [{ i: 1, text: '顶', pos: 'top', color: '#e74c3c' }, { i: 5, text: '底', pos: 'bottom', color: '#16a34a' }, { i: 3, text: '独立K线', pos: 'top' }], { w: 36, h: 110, padT: 22, padB: 20 }), '顶分型与底分型之间还隔着一根 K 线') },
        { term: '③ 一顶一底原则（第65课）', text: '从分型到笔，必须<span class="kw">一顶一底</span>。两个顶或两个底之间有两种情况：<br>① 中间<b>有</b>其他顶和底 → 只是把好几笔当成了一笔，用一顶一底原则拆开即可；<br>② 中间<b>没有</b>其他顶和底 → 说明第一个顶/底后的转折级别太小，第一个顶/底<b>忽略不算</b>。', fig: mfig('同类分型取极值', klineAnnSVG([mk(9, 11, true), mk(10, 13, true), mk(9, 11, false), mk(10, 12, true), mk(11, 14, true), mk(10, 12, false)], [{ i: 1, text: '顶1', pos: 'top', color: '#e74c3c' }, { i: 4, text: '顶2(更高,取它)', pos: 'top', color: '#e74c3c' }], { w: 40, h: 110, padT: 22, padB: 20 }), '两个顶中间无底 → 取更高者，忽略较矮的') },
        { term: '④ 笔的方向与唯一分解（第65课）', text: '先顶后底，构成<span class="kw">向下</span>一笔；先底后顶，构成<span class="kw">向上</span>一笔。所有图形都可<b>唯一地分解为上下交替的笔的连接</b>。比喻：<span class="hl">膝盖就是分型，大腿和小腿就是连接的两笔</span>。', fig: mfig('上下交替的笔', biLineSVG([{ p: 8, tag: '底' }, { p: 14, tag: '顶' }, { p: 10, tag: '底' }, { p: 16, tag: '顶' }, { p: 11, tag: '底' }], { w: 50, h: 110 }), '膝盖=分型，大腿/小腿=两笔，上下交替') },
        { term: '⑤ 笔划分的唯一性（第77课）', text: '在固定规则下，笔的划分是<b>唯一</b>的（第77课给出证明）。这是缠论能“机械化操作”的根基。', fig: mfig('规则固定 → 划分唯一', biLineSVG([{ p: 8, tag: '底' }, { p: 14, tag: '顶' }, { p: 10, tag: '底' }], { w: 50, h: 110 }), '固定规则下，笔的划分唯一确定') },
        { term: '⑥ 旧笔 vs 新笔（第81课）', text: '<b>旧笔</b>（第62课）：顶底分型之间必须至少一根独立 K 线。<b>新笔</b>（第81课微调）：放宽了该要求。本教程与 H5 算法默认采用<b>旧笔</b>标准。', fig: mfig('旧笔（本教程默认）', klineAnnSVG([mk(9, 11, true), mk(10, 13, true), mk(9, 11, false), mk(10, 11, true), mk(9, 11, true), mk(8, 10, false), mk(9, 11, true)], [{ i: 1, text: '顶', pos: 'top', color: '#e74c3c' }, { i: 5, text: '底', pos: 'bottom', color: '#16a34a' }], { w: 36, h: 110, padT: 22, padB: 20 }), '旧笔：顶底间至少一根独立 K 线（新笔放宽）') },
      ]},
      { type: 'motivation', title: '为什么需要笔', text: '分型只是“转折的候选点”，太琐碎。把相邻顶底分型连成<b>笔</b>，就把走势压缩成一段段“方向明确的线段”，它是更高一级构件<b>线段</b>的组成单位（线段至少三笔，见第5章），让分析从“K 线级”上升到“方向级”。' },
      { type: 'pitfalls', title: '常见误区', items: [
        '顶底之间<b>没有隔独立 K 线</b>就硬连成一笔（违反第62课最基本要求）。',
        '两个相邻同类分型（顶接顶）也去连线——同类分型要<b>取极值</b>（顶取更高、底取更低）后再连。',
        '忽略“一顶一底”：中间没有其他顶底时，第一个顶/底要<b>忽略</b>，而不是强行连。',
        '笔的端点一定要落在分型的<b>极值 K 线</b>上（顶用最高、底用最低）。',
      ]},
      { type: 'exercises', title: '练习', items: [
        { q: '一个顶分型后面紧跟一个顶分型（中间无底分型），应如何处理？', a: '两个顶分型同类，取<b>更高的那个</b>作为有效顶，忽略较矮的（第65课“第二种情况”），再等一个底分型来连成向下笔。' },
        { q: '“笔的划分唯一”的前提是什么？', a: '前提是<b>规则固定</b>（采用旧笔还是新笔、包含处理规则一致）。规则一变，划分可能不同。' },
      ]},
    ],
  });
})();
