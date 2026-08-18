/* 第5章 线段 */
(function () {
  const figBasic = `
<div class="fig"><div class="lbl">线段基本形态（至少三笔）</div>${biLineSVG([{p:10,tag:'底'},{p:16,tag:'顶'},{p:12,tag:'底'},{p:18,tag:'顶'}], {w:56,h:150})}<div class="cap">上-下-上三笔<br>前三笔有重叠 → 成一线段</div></div>
<div class="fig"><div class="lbl">线段破坏（两段线段）</div>${biLineSVG([{p:10,tag:'底'},{p:16,tag:'顶'},{p:12,tag:'底'},{p:19,tag:'顶'},{p:9,tag:'底'},{p:14,tag:'顶'},{p:7,tag:'底'}], {segColors:{3:'#f59e0b',4:'#f59e0b',5:'#f59e0b'}, w:56,h:150})}<div class="cap">蓝＝第一段（向上 3 笔）<br>橙＝第二段（向下）<br>线段只能被线段破坏</div></div>`;

  const figOverlap = `
<div class="fig"><div class="lbl good">✓ 前三笔有重叠（成线段）</div>${biLineSVG([{p:10,tag:'底'},{p:15,tag:'顶'},{p:12,tag:'底'},{p:18,tag:'顶'}], {w:56,h:150})}<div class="cap">笔2 低点 12 &lt; 笔1 顶 15<br>回调进入前笔区间 → 重叠</div></div>
<div class="fig"><div class="lbl bad">✗ 前三笔无重叠（不成线段）</div>${biLineSVG([{p:10,tag:'底'},{p:15,tag:'顶'},{p:16,tag:'底'},{p:21,tag:'顶'}], {w:56,h:150})}<div class="cap">笔2 低点 16 &gt; 笔1 顶 15<br>回调不回前笔区间 → 无重叠</div></div>`;

  __chapters.push({
    id: 'ch07', vol: '卷二 · 形态学', title: '第7章 线段', source: '原文第62、65、77、78课',
    figures: [
      { kind: 'echarts', title: '笔连成线段', note: '<b>黄色细线</b>是笔，<b>蓝色粗线</b>是线段。左半是向上线段（底 P0→顶 P5，5 笔），右半是向下线段（顶 P5→底 P10）把它破坏——线段只取首尾两个极值点，中间笔的波动被“忽略”。', option: optCh5 },
      { kind: 'html', title: '线段基本形态 vs 线段破坏', note: '线段至少三笔；一条线段只能被<b>另一条线段</b>破坏，而不是被单独一笔破坏。', html: figBasic },
      { kind: 'html', title: '前三笔必须重叠', note: '这是线段与“类上涨/类下跌”的分水岭：前三笔<b>有重叠</b>才成线段，一路不回踩的三笔<b>不构成</b>线段。', html: figOverlap },
    ],
    sections: [
      { type: 'definition', title: '线段的定义与判定', items: [
        { term: '① 线段的定义（第62课）', text: '所谓的<span class="hl">线段</span>，就是<b>至少由三笔组成</b>。（原文图8 是线段的最基本形态，图9 是线段破坏。）', fig: mfig('线段：至少三笔', biLineSVG([{ p: 10, tag: '底' }, { p: 16, tag: '顶' }, { p: 12, tag: '底' }, { p: 18, tag: '顶' }], { w: 50, h: 110 }), '上-下-上 三笔 = 线段最基本形态') },
        { term: '② 线段的两种（第65课）', text: '线段无非两种：<span class="kw">从向上一笔开始</span>的，和<span class="kw">从向下一笔开始</span>的。', fig: mfig('从向上笔 / 向下笔开始', '<div style="display:flex;gap:12px">' + biLineSVG([{ p: 10, tag: '底' }, { p: 16, tag: '顶' }, { p: 12, tag: '底' }], { w: 40, h: 90 }) + biLineSVG([{ p: 16, tag: '顶' }, { p: 10, tag: '底' }, { p: 14, tag: '顶' }], { w: 40, h: 90 }) + '</div>', '左：向上笔开始；右：向下笔开始') },
        { term: '③ 前三笔必须有重叠（第65课）', text: '线段至少有三笔，但<b>并不是连续的三笔就一定构成线段</b>——这三笔<span class="hl">必须有重叠的部分</span>。这是线段最基本的前提。', fig: mfig('前三笔必须有重叠', biLineSVG([{ p: 10, tag: '底' }, { p: 15, tag: '顶' }, { p: 12, tag: '底' }, { p: 18, tag: '顶' }], { w: 50, h: 110 }), '笔2 低点 12 < 笔1 顶 15 → 有重叠 → 成线段') },
        { term: '④ 笔破坏的定义（第65课）', text: '向上线段的分型序列记为 <code>d1g1d2g2d3g3…dngn</code>（di 底、gi 顶），若存在 i、j（j≥i+2）使 <code>dj ≤ gi</code>，称向上线段被<b>笔破坏</b>；向下线段对称：序列 <code>g1d1g2d2…gndn</code>，若存在 <code>gj ≥ di</code>（j≥i+2），称向下线段被笔破坏。', fig: mfig('笔破坏：dj ≤ gi', drawZS([{ p: 10, label: 'd1', color: '#16a34a' }, { p: 16, label: 'g1', color: '#e74c3c', above: true }, { p: 12, label: 'd2', color: '#16a34a' }, { p: 18, label: 'g2', color: '#e74c3c', above: true }, { p: 11, label: 'dj', color: '#16a34a' }, { p: 17, label: 'g3', color: '#e74c3c', above: true }], [], { w: 42, h: 110, lineColor: '#f59e0b' }), 'dj=11 ≤ g1=16 → 向上线段被笔破坏') },
        { term: '⑤ 线段分解定理（第65课）', text: '<span class="hl">线段被破坏，当且仅当至少被有重叠部分的连续三笔的其中一笔破坏</span>。只要构成有重叠部分的前三笔，就必然形成一线段。换言之，<b>线段破坏的充要条件，就是被另一个线段破坏</b>。', formula: '线段被破坏 ⟺ 被有重叠的连续三笔中某一笔破坏 ⟺ 被另一线段破坏', fig: mfig('线段只能被线段破坏', biLineSVG([{ p: 10, tag: '底' }, { p: 16, tag: '顶' }, { p: 12, tag: '底' }, { p: 19, tag: '顶' }, { p: 9, tag: '底' }, { p: 14, tag: '顶' }, { p: 7, tag: '底' }], { w: 40, h: 110 }), '反向三笔（9→14→7）构成另一线段 → 破坏原线段') },
        { term: '⑥ 线段的方向与端点（第77课）', text: '线段和笔一样有方向：<b>不可能从底到底、也不可能从顶到顶</b>（两端分型必不同性质）。同一线段的两端一顶一底，<b>顶一定高于底</b>。因此线段包含的笔数<b>都是单数</b>。', fig: mfig('两端异质：顶必高于底', biLineSVG([{ p: 10, tag: '底' }, { p: 18, tag: '顶' }, { p: 12, tag: '底' }, { p: 16, tag: '顶' }], { w: 50, h: 110 }), '同一线段一顶一底，顶 > 底，笔数单数') },
        { term: '⑦ 标准化（第78课）', text: '标准化处理后，<span class="kw">向上线段以最低点开始、最高点结束</span>，向下线段以最高点开始、最低点结束，所有线段连成一条<b>首尾相连的折线</b>，成为中枢、走势类型分析最标准的基础部件。', fig: mfig('标准化：首尾相连折线', drawZS([{ p: 10, label: '底', color: '#16a34a' }, { p: 16, label: '顶', color: '#e74c3c', above: true }, { p: 11, label: '底', color: '#16a34a' }, { p: 15, label: '顶', color: '#e74c3c', above: true }], [], { w: 46, h: 110, lineColor: '#2563eb' }), '向上段以最低点始、最高点终，首尾相连') },
        { term: '⑧ 划分唯一性（第77课）', text: '用线段划分的两种情况的规定，不难证明：<b>线段的划分是唯一的</b>。', fig: mfig('规则固定 → 划分唯一', biLineSVG([{ p: 10, tag: '底' }, { p: 16, tag: '顶' }, { p: 12, tag: '底' }], { w: 50, h: 110 }), '按统一规则，线段划分唯一确定') },
      ]},
      { type: 'motivation', title: '为什么需要线段', text: '笔是“分型级”的转折，太琐碎，无法直接支撑中枢与走势类型。线段把若干笔压缩成一段<b>方向明确、极值标准</b>的部件，是中枢的组成单位。从笔到线段，是从“局部转折”上升到“方向段落”的关键一步。' },
      { type: 'pitfalls', title: '常见误区', items: [
        '<b>笔破坏 ≠ 线段破坏</b>：一笔反向突破前线段不算数，线段必须被<b>另一条线段</b>破坏才算完成。',
        '把<b>前三笔无重叠</b>的三笔也当成线段（一路不回踩的类上涨/类下跌不是线段）。',
        '用<b>两笔</b>就画一条线段（线段至少三笔）。',
        '画出<b>顶到顶</b>或<b>底到底</b>的线段（两端分型必须异质，顶必高于底）。',
      ]},
      { type: 'exercises', title: '练习', items: [
        { q: '三笔：底10→顶15→底16→顶21，前三笔有重叠吗？是否构成线段？', a: '笔1[10,15]、笔2[15,16]、笔3[16,21]，笔2 的低点 16 高于笔1 的顶 15，<b>无重叠</b>，所以前三笔<b>不构成线段</b>（是类上涨）。' },
        { q: '“笔破坏”和“线段破坏”有什么区别？', a: '笔破坏只需<b>一笔</b>反向突破（第65课 dj≤gi），但线段完成需要<b>另一条线段</b>（有重叠的连续三笔）来破坏；一笔破坏后若未能发展成线段，原线段仍在延续。' },
      ]},
    ],
  });
})();
