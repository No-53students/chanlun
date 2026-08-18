/* 第10章 中枢 · 分步动画（原文第17/20课） */
(function () {
  // 同一组数据：三段次级别走势（上-下-上），端点低1→高1→低2→高2
  const P = [
    { p: 10, label: '低1', color: '#16a34a' },
    { p: 16, label: '高1', color: '#e74c3c', above: true },
    { p: 11, label: '低2', color: '#16a34a' },
    { p: 15, label: '高2', color: '#e74c3c', above: true },
  ];

  const cap = t => '<div style="margin-top:6px;font-size:12px;color:#6b7280;line-height:1.6;max-width:560px">' + t + '</div>';

  window.__anims = window.__anims || {};
  __anims['ch10'] = {
    title: '中枢：三段重叠的构造',
    steps: [
      {
        label: '① 次级别走势（三段：上-下-上）',
        html: drawZS(P, [], { w: 56, h: 140, lineColor: '#1f2937' })
          + cap('三段连续次级别走势 A(10→16)、B(16→11)、C(11→15)，即上-下-上。中枢 = 被<b>至少三个连续次级别走势类型</b>重叠的部分（第17课）。'),
      },
      {
        label: '② 三段有重叠 → 重叠区间',
        html: drawZS(P, [{ lo: 11, hi: 15, x0: 0, x1: 3, label: '重叠部分' }], { w: 56, h: 140 })
          + cap('三段共同覆盖的价格区间 [11,15]，就是它们的<b>重叠部分</b>——这是中枢的雏形。'),
      },
      {
        label: '③ 重叠区间 = ZG / ZD',
        html: drawZS(P, [{ lo: 11, hi: 15, x0: 0, x1: 3, label: '中枢 [ZD,ZG]' }], { zgzd: true, w: 56, h: 140 })
          + cap('中枢区间 = [max(低点), min(高点)]：<b>ZD</b>=max(10,11)=11（下沿），<b>ZG</b>=min(16,15)=15（上沿）（第20课数学表达式）。'),
      },
      {
        label: '④ 结论：中枢成形（ZG/ZD/GG/DD）',
        html: drawZS(
          [
            { p: 10, label: 'DD', color: '#16a34a' },
            { p: 16, label: 'GG', color: '#e74c3c', above: true },
            { p: 11, label: 'ZD', color: '#16a34a' },
            { p: 15, label: 'ZG', color: '#e74c3c', above: true },
          ],
          [{ lo: 11, hi: 15, x0: 0, x1: 3, label: '中枢 [ZD,ZG]' }],
          { zgzd: true, w: 56, h: 140 })
          + cap('<b>ZG</b>=min(高点)=15、<b>ZD</b>=max(低点)=11 界定中枢区间；<b>GG</b>=16 是中枢内最高、<b>DD</b>=10 是中枢内最低。中枢是比盘整、趋势更基本的概念。'),
      },
    ],
  };
})();
