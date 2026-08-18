/* 第3章 分型 */
(function () {
  const figFour = `
<div class="fig"><div class="lbl">① 上升K线</div>${klineAnnSVG([mk(9,11,true), mk(10,12,true), mk(11,13,true)], [{ i: 0, text: 'H=11', pos: 'top', color: '#e74c3c' }, { i: 1, text: 'H=12', pos: 'top', color: '#e74c3c' }, { i: 2, text: 'H=13', pos: 'top', color: '#e74c3c' }, { i: 0, text: 'L=9', pos: 'bottom', color: '#16a34a' }, { i: 1, text: 'L=10', pos: 'bottom', color: '#16a34a' }, { i: 2, text: 'L=11', pos: 'bottom', color: '#16a34a' }], { w: 48, h: 118, padT: 22, padB: 18 })}<div class="cap">高低点依次抬高</div></div>
<div class="fig"><div class="lbl hl">② 顶分型</div>${klineAnnSVG([mk(9,11,true), mk(10,13,true), mk(9,11,false)], [{ i: 1, text: '顶 H=13', pos: 'top', color: '#e74c3c' }, { i: 0, text: 'H=11', pos: 'top', color: '#e74c3c' }, { i: 2, text: 'H=11', pos: 'top', color: '#e74c3c' }, { i: 1, text: 'L=10', pos: 'bottom', color: '#16a34a' }, { i: 0, text: 'L=9', pos: 'bottom', color: '#16a34a' }, { i: 2, text: 'L=9', pos: 'bottom', color: '#16a34a' }], { w: 48, h: 118, padT: 22, padB: 18 })}<div class="cap">中间最高：H=13 最大、L=10 也最大</div></div>
<div class="fig"><div class="lbl">③ 下降K线</div>${klineAnnSVG([mk(11,13,false), mk(10,12,false), mk(9,11,false)], [{ i: 0, text: 'H=13', pos: 'top', color: '#e74c3c' }, { i: 1, text: 'H=12', pos: 'top', color: '#e74c3c' }, { i: 2, text: 'H=11', pos: 'top', color: '#e74c3c' }, { i: 0, text: 'L=11', pos: 'bottom', color: '#16a34a' }, { i: 1, text: 'L=10', pos: 'bottom', color: '#16a34a' }, { i: 2, text: 'L=9', pos: 'bottom', color: '#16a34a' }], { w: 48, h: 118, padT: 22, padB: 18 })}<div class="cap">高低点依次降低</div></div>
<div class="fig"><div class="lbl kw">④ 底分型</div>${klineAnnSVG([mk(11,13,false), mk(9,11,false), mk(11,13,true)], [{ i: 1, text: '底 L=9', pos: 'bottom', color: '#16a34a' }, { i: 0, text: 'L=11', pos: 'bottom', color: '#16a34a' }, { i: 2, text: 'L=11', pos: 'bottom', color: '#16a34a' }, { i: 1, text: 'H=11', pos: 'top', color: '#e74c3c' }, { i: 0, text: 'H=13', pos: 'top', color: '#e74c3c' }, { i: 2, text: 'H=13', pos: 'top', color: '#e74c3c' }], { w: 48, h: 118, padT: 22, padB: 18 })}<div class="cap">中间最低：L=9 最小、H=11 也最小</div></div>`;

  __chapters.push({
    id: 'ch05', vol: '卷二 · 形态学', title: '第5章 分型', source: '原文第62、65、79、82课',
    figures: [
      { kind: 'echarts', title: '分型的识别', note: '<b>红色▼</b>是顶分型（中间 K 线最高），<b>绿色▲</b>是底分型（中间 K 线最低）。每个分型由<b>三根连续</b>（已消除包含）的 K 线构成。', option: optCh3 },
      { kind: 'html', title: '三相邻 K 线的四类完全分类', note: '这是第62课图7的核心：消除包含关系后，任意三根相邻 K 线<b>只有</b>这四种组合。其中②④是分型，①③是“上升/下降 K 线”（它们是构成“笔”的中间部分）。', html: figFour },
    ],
    sections: [
      { type: 'definition', title: '顶分型 / 底分型', items: [
        { term: '① 顶分型（第62课）', text: '在消除包含关系后的连续 K 线中取相邻三根：<span class="hl">第二 K 线的高点是相邻三 K 线高点中最高的，而低点也是相邻三 K 线低点中最高的</span>。口诀：中间那根“高也最高、低也最高”。', fig: mfig('顶分型：中间最高', klineAnnSVG([mk(9, 11, true), mk(10, 13, true), mk(9, 11, false)], [{ i: 1, text: '顶（最高）', pos: 'top', color: '#e74c3c' }], { w: 44, h: 110, padT: 22, padB: 20 }), '中间 K 线“高也最高、低也最高”') },
        { term: '② 底分型（第62课）', text: '<span class="hl">第二 K 线的低点是相邻三 K 线低点中最低的，而高点也是相邻三 K 线高点中最低的</span>。口诀：中间那根“低也最低、高也最低”。', fig: mfig('底分型：中间最低', klineAnnSVG([mk(11, 13, false), mk(9, 11, false), mk(11, 13, true)], [{ i: 1, text: '底（最低）', pos: 'bottom', color: '#16a34a' }], { w: 44, h: 110, padT: 20, padB: 22 }), '中间 K 线“低也最低、高也最低”') },
        { term: '③ 顶与底的简称（第62课）', text: '顶分型的<b>最高点</b>叫该分型的<span class="kw">顶</span>；底分型的<b>最低点</b>叫该分型的<span class="kw">底</span>。由于顶分型的底和底分型的顶是没有意义的，所以以后说“顶”和“底”，就分别指<span class="hl">顶分型的顶</span>与<span class="hl">底分型的底</span>。', fig: mfig('顶 = 顶分型的最高点', klineAnnSVG([mk(9, 11, true), mk(10, 13, true), mk(9, 11, false)], [{ i: 1, text: '顶', pos: 'top', color: '#e74c3c' }], { w: 44, h: 110, padT: 22, padB: 20 }), '说“顶”就指顶分型的最高点；“底”指底分型的最低点') },
        { term: '④ 三相邻 K 线的完全分类（第62课）', text: '经过包含处理后，三相邻 K 线的组合只有四类：<b>①上升 K 线</b>、<b>②顶分型</b>、<b>③下降 K 线</b>、<b>④底分型</b>（见上图）。这是分型的理论基础——把任意走势的每一处都归入这四种状态之一。', fig: mfig('四类完全分类', '<div style="display:flex;gap:8px;align-items:flex-start">' + klineAnnSVG([mk(9, 11, true), mk(10, 12, true), mk(11, 13, true)], [{ i: 2, text: '上升', pos: 'top' }], { w: 30, h: 84, padT: 16, padB: 12 }) + klineAnnSVG([mk(9, 11, true), mk(10, 13, true), mk(9, 11, false)], [{ i: 1, text: '顶分型', pos: 'top', color: '#e74c3c' }], { w: 30, h: 84, padT: 16, padB: 12 }) + klineAnnSVG([mk(11, 13, false), mk(10, 12, false), mk(9, 11, false)], [{ i: 2, text: '下降', pos: 'bottom' }], { w: 30, h: 84, padT: 16, padB: 12 }) + klineAnnSVG([mk(11, 13, false), mk(9, 11, false), mk(11, 13, true)], [{ i: 1, text: '底分型', pos: 'bottom', color: '#16a34a' }], { w: 30, h: 84, padT: 16, padB: 12 }) + '</div>', '三根相邻 K 线只有这四种组合') },
        { term: '⑤ 分型的唯一性与客观性（第65课）', text: '分型的定义是<b>唯一的、有统一答案的</b>：只要被分析的 K 线已经走出来，任何人都能在当下给出唯一答案，<b>与时间无关、与人无关、客观且不可更改</b>。这就是缠论“当下性 = 客观性”的来源。', fig: mfig('唯一、客观、不可更改', klineAnnSVG([mk(9, 11, true), mk(10, 13, true), mk(9, 11, false)], [{ i: 1, text: '唯一答案', pos: 'top', color: '#e74c3c' }], { w: 44, h: 110, padT: 22, padB: 20 }), 'K 线已走出 → 分型答案唯一，与时间、人无关') },
        { term: '⑥ 分型 ≠ 转折（第82课）', text: '出现顶分型<b>不等于</b>一定下跌。顶分型只是“可能的顶”，若后续走势继续延伸，它可能只是<span class="kw">中继分型</span>（第82课专门讨论：如何用均线与小级别买卖点判断分型是“中继”还是“延续成笔”）。', fig: mfig('顶分型 ≠ 一定下跌', klineAnnSVG([mk(10, 12, true), mk(11, 14, true), mk(10, 13, false), mk(12, 15, true), mk(13, 16, true)], [{ i: 2, text: '顶分型', pos: 'top', color: '#e74c3c' }, { i: 4, text: '继续新高', pos: 'top' }], { w: 40, h: 110, padT: 22, padB: 20 }), '顶分型后继续创新高 → 中继分型（不是真顶）') },
      ]},
      { type: 'motivation', title: '为什么分型是起点', text: '缠论要判断“哪里可能转折”。分型是转折的<b>最小几何标志</b>——<span class="hl">没有顶分型就没有顶，没有底分型就没有底</span>（第80课）。它是构成“笔”的两端，也是线段、中枢、级别递归的最底层起点。' },
      { type: 'pitfalls', title: '常见误区', items: [
        '把“出现分型”当成“走势必然反转”——分型只是可能转折，需结合小级别买卖点与盘整背驰确认。',
        '用绝对涨跌幅度判断分型——分型只看三根 K 线的<b>相对高低关系</b>。',
        '忘记先做包含处理——未合并就数 K 线，分型会判错。',
        '混淆“分型”与“顶/底”——顶/底特指分型的极值点，不是一段走势的完整顶或底。',
      ]},
      { type: 'exercises', title: '练习', items: [
        { q: '描述一组构成“顶分型”的三根 K 线。', a: '三根相邻（已消除包含）K 线中，中间那根的高点高于左右两根、低点也高于左右两根，即“中间高、两边低”的山形。' },
        { q: '“分型的划分是唯一的”这句话的前提是什么？', a: '前提是<b>被分析的 K 线已经走出来</b>（第65课）。已走出的 K 线，按统一的几何定义，分型的答案是唯一的、客观的。' },
      ]},
    ],
  });
})();
