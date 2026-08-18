/* 第8章 特征序列与线段划分 · 分步动画（原文第67课） */
(function () {
  // 同一组数据：向上线段的特征序列元素 X1/X2/X3（反向笔区间）
  const seqPts = [
    { p: 10, tag: '底' }, { p: 16, tag: '顶' }, { p: 12, tag: '底' },
    { p: 18, tag: '顶' }, { p: 13, tag: '底' }, { p: 20, tag: '顶' },
  ];
  const X = [
    { lo: 12, hi: 16 }, // X1
    { lo: 13, hi: 17 }, // X2（顶分型中间，最高）
    { lo: 11, hi: 16 }, // X3
  ];

  const cap = t => '<div style="margin-top:6px;font-size:12px;color:#6b7280;line-height:1.6;max-width:560px">' + t + '</div>';

  window.__anims = window.__anims || {};
  __anims['ch8'] = {
    title: '特征序列：线段的反向笔',
    steps: [
      {
        label: '① 向上线段的内部笔（识别反向笔）',
        html: biLineSVG(seqPts, { segColors: { 0: '#2563eb', 1: '#f59e0b', 2: '#2563eb', 3: '#f59e0b', 4: '#2563eb' }, w: 50, h: 130 })
          + cap('向上线段用 S1X1S2X2S3 表示：蓝=向上笔 S（构成线段），橙=向下笔 X。任意相邻 S 之间必有重合，但 X 之间不一定。'),
      },
      {
        label: '② 特征序列元素 = 反向笔区间',
        html: intervalsSVG([
          { lo: 12, hi: 16, label: 'X1 [12,16]' },
          { lo: 13, hi: 17, label: 'X2 [13,17]' },
          { lo: 11, hi: 16, label: 'X3 [11,16]' },
        ], { w: 62, h: 120 })
          + cap('把每个向下笔 X 取区间 [lo,hi] 当作一根 K 线，序列 X1X2X3 即<b>特征序列</b>；做包含处理后得标准特征序列（第67课）。'),
      },
      {
        label: '③ 特征序列构成顶分型',
        html: intervalsSVG([
          { lo: 12, hi: 16, label: 'X1' },
          { lo: 13, hi: 17, label: 'X2·顶', color: '#e74c3c' },
          { lo: 11, hi: 16, label: 'X3' },
        ], { w: 56, h: 120 })
          + cap('X2 上沿 17 最高、下沿 13 也最高 → <b>顶分型</b>。注意：向上线段的特征序列<b>只考察顶分型</b>；向下线段只考察底分型。'),
      },
      {
        label: '④ 结论：无缺口 → 线段在高点结束',
        html: intervalsSVG([
          { lo: 12, hi: 16, label: 'X1' },
          { lo: 13, hi: 17, label: 'X2', color: '#e74c3c' },
          { lo: 11, hi: 16, label: 'X3' },
        ], { w: 56, h: 120 })
          + cap('顶分型第一、二元素 X1[12,16] 与 X2[13,17] 有重叠（无缺口）→ <b>第一种情况</b>：线段在顶分型高点（X2.hi=17 对应顶）处结束。出现特征序列分型，是线段结束的前提。'),
      },
    ],
  };
})();
