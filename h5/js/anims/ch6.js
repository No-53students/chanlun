/* 第6章 笔 · 分步动画（原文第62/65课） */
(function () {
  // 同一组数据：一段向上笔 = 底分型 + 上升K线 + 顶分型（顶底间至少一根独立K线）
  const KS = [
    mk(9, 11, false),   // k0 底分型左
    mk(8, 10, false),   // k1 底（最低 L=8）
    mk(9, 11, true),    // k2 底分型右
    mk(10, 12, true),   // k3 上升K线（独立）
    mk(12, 14, true),   // k4 上升K线（顶分型左）
    mk(13, 15, true),   // k5 顶（最高 H=15）
    mk(12, 14, false),  // k6 顶分型右
  ];

  const cap = t => '<div style="margin-top:6px;font-size:12px;color:#6b7280;line-height:1.6;max-width:560px">' + t + '</div>';
  const row = (items, gap) => '<div style="display:flex;flex-wrap:wrap;gap:' + (gap || 12) + 'px;align-items:flex-start">' + items.join('') + '</div>';

  // 对比：共用一根K线（违反结合律，不算） vs 顶底间有独立K线（算）
  const badShare = klineAnnSVG(
    [mk(9, 11, true), mk(10, 13, true), mk(9, 11, false), mk(8, 10, false), mk(9, 11, true)],
    [{ i: 1, text: '顶', pos: 'top', color: '#e74c3c' }, { i: 3, text: '底', pos: 'bottom', color: '#16a34a' }, { i: 2, text: '共用K线', pos: 'top', color: '#f59e0b' }],
    { w: 46, h: 116, padT: 22, padB: 20 });
  const okIndep = klineAnnSVG(
    [mk(9, 11, true), mk(10, 13, true), mk(9, 11, false), mk(10, 11, true), mk(9, 11, true), mk(8, 10, false), mk(9, 11, true)],
    [{ i: 1, text: '顶', pos: 'top', color: '#e74c3c' }, { i: 5, text: '底', pos: 'bottom', color: '#16a34a' }, { i: 3, text: '独立K线', pos: 'top', color: '#16a34a' }],
    { w: 38, h: 116, padT: 22, padB: 20 });

  window.__anims = window.__anims || {};
  __anims['ch6'] = {
    title: '笔：顶底相连的推演',
    steps: [
      {
        label: '① 定位顶分型与底分型',
        html: klineAnnSVG(KS, [
          { i: 1, text: '底 L=8', pos: 'bottom', color: '#16a34a' },
          { i: 5, text: '顶 H=15', pos: 'top', color: '#e74c3c' },
        ], { w: 40, h: 120, padT: 22, padB: 20 })
          + cap('先找到底分型（k0-k1-k2，底=k1，L=8）与顶分型（k4-k5-k6，顶=k5，H=15），二者之间隔着独立 K 线 k3。'),
      },
      {
        label: '② 相邻顶底相连成笔（向上笔）',
        html: biLineSVG([{ p: 8, tag: '底' }, { p: 15, tag: '顶' }], { w: 80, h: 120 })
          + cap('两个<b>相邻</b>的顶与底之间构成一笔（第62课）。底分型(8) → 相邻顶分型(15) = <b>向上笔</b>，其间其他波动都忽略不算。'),
      },
      {
        label: '③ 顶底交替：笔的连接',
        html: biLineSVG([{ p: 8, tag: '底' }, { p: 15, tag: '顶' }, { p: 10, tag: '底' }, { p: 16, tag: '顶' }, { p: 11, tag: '底' }], { w: 50, h: 120 })
          + cap('先底后顶 = 向上笔，先顶后底 = 向下笔，上下交替。一顶一底原则：两个同类分型中间无其他分型时，<b>取极值</b>（顶取更高、底取更低）。'),
      },
      {
        label: '④ 结论：顶底间至少一根独立K线（旧笔）',
        html: row([
          '<div>' + badShare + cap('✗ 共用一根K线<br>违反结合律，不算') + '</div>',
          '<div>' + okIndep + cap('✓ 顶底间还有独立K线<br>才是最基本的一笔') + '</div>',
        ])
          + cap('旧笔标准（第62课）：顶、底分型之间必须<b>至少有一根独立 K 线</b>；光有顶底（中间无 K 线）最好也不算。上升一笔 = 底分型 + 上升K线 + 顶分型。'),
      },
    ],
  };
})();
