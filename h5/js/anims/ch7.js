/* 第7章 线段 · 分步动画（原文第62/65课） */
(function () {
  // 同一组数据：向上线段 = 5 笔（底10→顶16→底12→顶18→底13→顶20）
  const segPts = [
    { p: 10, tag: '底' }, { p: 16, tag: '顶' }, { p: 12, tag: '底' },
    { p: 18, tag: '顶' }, { p: 13, tag: '底' }, { p: 20, tag: '顶' },
  ];
  const first3 = segPts.slice(0, 4); // 前三笔

  const cap = t => '<div style="margin-top:6px;font-size:12px;color:#6b7280;line-height:1.6;max-width:560px">' + t + '</div>';
  const row = (items, gap) => '<div style="display:flex;flex-wrap:wrap;gap:' + (gap || 12) + 'px;align-items:flex-start">' + items.join('') + '</div>';

  // 线段破坏：反向三笔构成另一线段
  const broken = biLineSVG(
    [{ p: 10, tag: '底' }, { p: 16, tag: '顶' }, { p: 12, tag: '底' }, { p: 19, tag: '顶' }, { p: 9, tag: '底' }, { p: 14, tag: '顶' }, { p: 7, tag: '底' }],
    { segColors: { 3: '#f59e0b', 4: '#f59e0b', 5: '#f59e0b' }, w: 48, h: 140 });

  window.__anims = window.__anims || {};
  __anims['ch7'] = {
    title: '线段：三笔重叠成段',
    steps: [
      {
        label: '① 笔序列：上-下-上-下-上',
        html: biLineSVG(segPts, { w: 50, h: 130 })
          + cap('一条向上线段由 5 笔组成：底10→顶16→底12→顶18→底13→顶20（第62课：线段至少三笔）。'),
      },
      {
        label: '② 线段至少三笔',
        html: biLineSVG(first3, { w: 56, h: 130 })
          + cap('取前三笔：底10→顶16→底12→顶18，这“上-下-上”三笔就是线段最基本形态。线段无非两种：从向上笔开始，或从向下笔开始。'),
      },
      {
        label: '③ 前三笔必须有重叠',
        html: drawZS(
          [{ p: 10, tag: '底' }, { p: 16, tag: '顶' }, { p: 12, tag: '底' }, { p: 18, tag: '顶' }],
          [{ lo: 12, hi: 16, x0: 0, x1: 3, label: '前三笔重叠 [12,16]' }],
          { w: 56, h: 140 })
          + cap('笔2 低点 12 &lt; 笔1 顶 16，回调进入前笔区间 → 前三笔<b>有重叠</b>才成线段；一路不回踩的三笔不构成线段（第65课）。'),
      },
      {
        label: '④ 笔破坏 ≠ 线段破坏',
        html: row([
          '<div>' + biLineSVG([{ p: 10, tag: '底' }, { p: 16, tag: '顶' }, { p: 12, tag: '底' }, { p: 18, tag: '顶' }, { p: 11, tag: '底' }], { segColors: { 4: '#f59e0b' }, w: 48, h: 140 }) + cap('一笔向下到 11，跌破前顶 16（dj=11 ≤ g1=16）＝<b>笔破坏</b>；但只有一笔，原线段仍延续') + '</div>',
          '<div>' + biLineSVG([{ p: 10, tag: '底' }, { p: 16, tag: '顶' }, { p: 12, tag: '底' }, { p: 18, tag: '顶' }, { p: 9, tag: '底' }, { p: 14, tag: '顶' }, { p: 7, tag: '底' }], { segColors: { 4: '#f59e0b', 5: '#f59e0b', 6: '#f59e0b' }, w: 48, h: 140 }) + cap('发展成反向三笔（9→14→7，有重叠）＝另一条线段 → 原线段<b>破坏</b>') + '</div>',
        ])
          + cap('<b>笔破坏 ≠ 线段破坏</b>：一笔反向突破只需 dj≤gi（笔破坏），但线段完成要等反向<b>有重叠的连续三笔</b>成另一线段（线段分解定理）。'),
      },
      {
        label: '⑤ 延伸与终结（结论）',
        html: row([
          '<div>' + biLineSVG(segPts, { w: 48, h: 140 }) + cap('延伸：继续出新笔（13→20），仍是同一向上线段') + '</div>',
          '<div>' + broken + cap('终结：反向三笔（橙）成另一线段，才破坏原线段') + '</div>',
        ])
          + cap('线段被破坏，当且仅当被有重叠部分的连续三笔中某一笔破坏——<b>线段只能被线段破坏</b>，单独一笔反向不算（线段分解定理）。'),
      },
    ],
  };
})();
