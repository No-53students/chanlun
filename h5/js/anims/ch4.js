/* 第4章 K线与包含关系 · 分步动画（原文第62/65课） */
(function () {
  // 同一组数据贯穿全章：向上段（k1 包 k2）+ 向下段（k5 包 k6）
  const K = [
    { o: 90, c: 94, l: 88, h: 95 },    // k0 起点
    { o: 96, c: 99, l: 90, h: 100 },   // k1 确立向上（包含方）
    { o: 97, c: 98, l: 92, h: 99 },    // k2 被 k1 包含
    { o: 100, c: 103, l: 94, h: 104 }, // k3 向上
    { o: 102, c: 97, l: 95, h: 102 },  // k4 转折（阴线）
    { o: 96, c: 91, l: 90, h: 96 },    // k5 向下（包含方）
    { o: 92, c: 90, l: 91, h: 95 },    // k6 被 k5 包含
  ];
  // 合并后的无包含序列（k1+k2 向上取高高；k5+k6 向下取低低）
  const merged = [
    K[0],
    { o: 96, c: 99, l: 92, h: 100 },
    K[3],
    K[4],
    { o: 92, c: 90, l: 90, h: 95 },
  ];

  const cap = t => '<div style="margin-top:6px;font-size:12px;color:#6b7280;line-height:1.6;max-width:560px">' + t + '</div>';
  const row = (items, gap) => '<div style="display:flex;flex-wrap:wrap;gap:' + (gap || 12) + 'px;align-items:flex-start">' + items.join('') + '</div>';

  const figUp = klineAnnSVG([K[1], K[2]], [
    { i: 0, text: 'K1 H=100', pos: 'top', color: '#e74c3c' },
    { i: 1, text: 'K2 H=99', pos: 'top', color: '#f59e0b' },
    { i: 0, text: 'K1 L=90', pos: 'bottom', color: '#16a34a' },
    { i: 1, text: 'K2 L=92', pos: 'bottom', color: '#f59e0b' },
  ], { w: 60, h: 140, padT: 24, padB: 24 });
  const figDown = klineAnnSVG([K[5], K[6]], [
    { i: 0, text: 'K5 H=96', pos: 'top', color: '#e74c3c' },
    { i: 1, text: 'K6 H=95', pos: 'top', color: '#f59e0b' },
    { i: 0, text: 'K5 L=90', pos: 'bottom', color: '#16a34a' },
    { i: 1, text: 'K6 L=91', pos: 'bottom', color: '#f59e0b' },
  ], { w: 60, h: 140, padT: 24, padB: 24 });

  window.__anims = window.__anims || {};
  __anims['ch4'] = {
    title: 'K线包含关系：一步步合并',
    steps: [
      {
        label: '① 原始K线',
        html: klineAnnSVG(K, [], { w: 44, h: 128, padT: 20, padB: 20 })
          + cap('7 根原始 K 线（尚未处理）。缠论几何分析只看每根 K 线的高低点区间 [L, H]，不分阳线阴线。'),
      },
      {
        label: '② 找出互相包含的相邻K线',
        html: klineAnnSVG(K, [
          { i: 1, text: '包住', pos: 'top', color: '#f59e0b' },
          { i: 2, text: '被包含', pos: 'bottom', color: '#f59e0b' },
          { i: 5, text: '包住', pos: 'top', color: '#f59e0b' },
          { i: 6, text: '被包含', pos: 'bottom', color: '#f59e0b' },
        ], { w: 44, h: 128, padT: 22, padB: 22 })
          + cap('K1⊃K2：K1.H=100≥99=K2.H 且 K1.L=90≤92=K2.L；K5⊃K6 同理。一根 K 线高低点全在另一根范围里，即为<b>包含关系</b>（第62课），必须合并。'),
      },
      {
        label: '③ 判断方向：向上取高高 / 向下取低低',
        html: row([
          '<div>' + figUp + cap('向上：新 H=max(100,99)=100<br>新 L=max(90,92)=92（取高高）') + '</div>',
          '<div>' + figDown + cap('向下：新 H=min(96,95)=95<br>新 L=min(90,91)=90（取低低）') + '</div>',
        ]),
      },
      {
        label: '④ 合并后（结论）',
        html: klineAnnSVG(merged, [
          { i: 1, text: '合并后 H=100', pos: 'top', color: '#e74c3c' },
          { i: 1, text: '合并后 L=92', pos: 'bottom', color: '#16a34a' },
          { i: 4, text: '合并后 H=95', pos: 'top', color: '#e74c3c' },
          { i: 4, text: '合并后 L=90', pos: 'bottom', color: '#16a34a' },
        ], { w: 52, h: 128, padT: 22, padB: 22 })
          + cap('两处包含合并后，序列变成 5 根<b>无包含关系</b>的独立 K 线——这是分型、笔判断的统一前提。方向看“之前的趋势”（第65课），不是当前两根谁高。'),
      },
      {
        label: '▶ 合并动效（自动演示）',
        html: row([
          '<div>' + klineMergeAnimSVG(K[1], K[2], merged[1], 'up') + cap('向上合并：K1 包 K2 → 取高高，合并后 H=100') + '</div>',
          '<div>' + klineMergeAnimSVG(K[5], K[6], merged[4], 'down') + cap('向下合并：K5 包 K6 → 取低低，合并后 L=90') + '</div>',
        ]),
      },
    ],
  };
})();
