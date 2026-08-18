/* 第5章 分型 · 分步动画（原文第62/65课） */
(function () {
  // 同一组数据：顶分型三根 + 底分型三根
  const top3 = [mk(9, 11, true), mk(10, 13, true), mk(9, 11, false)];   // 顶分型：中间最高
  const bot3 = [mk(11, 13, false), mk(9, 11, false), mk(11, 13, true)]; // 底分型：中间最低

  const cap = t => '<div style="margin-top:6px;font-size:12px;color:#6b7280;line-height:1.6;max-width:560px">' + t + '</div>';
  const row = (items, gap) => '<div style="display:flex;flex-wrap:wrap;gap:' + (gap || 12) + 'px;align-items:flex-start">' + items.join('') + '</div>';
  const arrow = '<div style="align-self:center;font-size:20px;color:#6b7280">→</div>';

  const topFig = klineAnnSVG(top3, [
    { i: 1, text: '顶', pos: 'top', color: '#e74c3c' },
  ], { w: 44, h: 110, padT: 22, padB: 18 });
  const botFig = klineAnnSVG(bot3, [
    { i: 1, text: '底', pos: 'bottom', color: '#16a34a' },
  ], { w: 44, h: 110, padT: 18, padB: 22 });

  window.__anims = window.__anims || {};
  __anims['ch5'] = {
    title: '分型：三根K线定转折',
    steps: [
      {
        label: '① 三根相邻K线',
        html: klineAnnSVG(top3, [
          { i: 0, text: '左 H=11', pos: 'top', color: '#e74c3c' },
          { i: 1, text: '中 H=13', pos: 'top', color: '#e74c3c' },
          { i: 2, text: '右 H=11', pos: 'top', color: '#e74c3c' },
          { i: 0, text: '左 L=9', pos: 'bottom', color: '#16a34a' },
          { i: 1, text: '中 L=10', pos: 'bottom', color: '#16a34a' },
          { i: 2, text: '右 L=9', pos: 'bottom', color: '#16a34a' },
        ], { w: 48, h: 120, padT: 24, padB: 20 })
          + cap('分型由相邻三根（已消除包含）K 线构成，只看它们的相对高低关系（第62课）。'),
      },
      {
        label: '② 顶分型：中间高也最高、低也最高',
        html: klineAnnSVG(top3, [
          { i: 1, text: '顶 H=13（最高）', pos: 'top', color: '#e74c3c' },
          { i: 0, text: 'H=11', pos: 'top', color: '#e74c3c' },
          { i: 2, text: 'H=11', pos: 'top', color: '#e74c3c' },
          { i: 1, text: 'L=10（也最高）', pos: 'bottom', color: '#16a34a' },
          { i: 0, text: 'L=9', pos: 'bottom', color: '#16a34a' },
          { i: 2, text: 'L=9', pos: 'bottom', color: '#16a34a' },
        ], { w: 48, h: 120, padT: 24, padB: 20 })
          + cap('中间 K 线 H=13 是三根里最高，L=10 也是三根里最高 → <b>顶分型</b>。口诀：中间“高也最高、低也最高”。'),
      },
      {
        label: '③ 底分型：中间低也最低、高也最低',
        html: klineAnnSVG(bot3, [
          { i: 1, text: '底 L=9（最低）', pos: 'bottom', color: '#16a34a' },
          { i: 0, text: 'L=11', pos: 'bottom', color: '#16a34a' },
          { i: 2, text: 'L=11', pos: 'bottom', color: '#16a34a' },
          { i: 1, text: 'H=11（也最低）', pos: 'top', color: '#e74c3c' },
          { i: 0, text: 'H=13', pos: 'top', color: '#e74c3c' },
          { i: 2, text: 'H=13', pos: 'top', color: '#e74c3c' },
        ], { w: 48, h: 120, padT: 20, padB: 24 })
          + cap('中间 K 线 L=9 是三根里最低，H=11 也是三根里最低 → <b>底分型</b>。口诀：中间“低也最低、高也最低”。'),
      },
      {
        label: '④ 顶底交替（结论）',
        html: row([topFig, arrow, botFig, arrow, topFig])
          + cap('消除包含后，任意三根相邻 K 线只有四类：上升K线 / 顶分型 / 下降K线 / 底分型。走势中<b>顶分型后必接底分型</b>，顶底交替，不会顶接顶、底接底。'),
      },
    ],
  };
})();
