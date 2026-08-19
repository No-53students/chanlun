/* 第9章 特征序列的缺口判定 · 分步动画（原文第67/71课） */
(function () {
  // 本地小工具：特征序列元素条 + 第一、二元素间的「缺口 / 重叠」竖线标注
  function gapBars(ivs, gap, opts) {
    const w = opts.w || 54, h = opts.h || 130, pad = 22;
    const min = Math.min.apply(null, ivs.map(x => x.lo)), max = Math.max.apply(null, ivs.map(x => x.hi));
    const range = (max - min) || 1;
    const y = v => pad + (max - v) / range * (h - 2 * pad);
    const x = i => pad + i * w + w / 2;
    const W = pad * 2 + w * ivs.length;
    let s = '<svg viewBox="0 0 ' + W + ' ' + h + '" width="' + W + '" height="' + h + '" style="display:block">';
    ivs.forEach(function (iv, i) {
      const col = iv.color || '#f59e0b';
      const top = y(iv.hi).toFixed(1), hgt = Math.max(3, y(iv.lo) - y(iv.hi));
      s += '<rect x="' + (x(i) - 13).toFixed(1) + '" y="' + top + '" width="26" height="' + hgt.toFixed(1) + '" fill="' + col + '" opacity="0.85" rx="2"/>';
      s += '<text x="' + x(i) + '" y="' + (y(iv.lo) + 14).toFixed(1) + '" font-size="10" text-anchor="middle" fill="#1f2937">' + iv.label + '</text>';
    });
    if (gap) {
      const gx = ((x(gap.i) + x(gap.i + 1)) / 2).toFixed(1);
      const c = gap.color || '#9333ea';
      s += '<line x1="' + gx + '" y1="' + y(gap.hi).toFixed(1) + '" x2="' + gx + '" y2="' + y(gap.lo).toFixed(1) + '" stroke="' + c + '" stroke-width="1.6" stroke-dasharray="3 2"/>';
      s += '<text x="' + gx + '" y="' + ((y(gap.hi) + y(gap.lo)) / 2 + 4).toFixed(1) + '" font-size="10" text-anchor="middle" fill="' + c + '" font-weight="bold">' + gap.label + '</text>';
    }
    s += '</svg>';
    return s;
  }

  const cap = t => '<div style="margin-top:6px;font-size:12px;color:#6b7280;line-height:1.6;max-width:560px">' + t + '</div>';
  const row = (items, gap) => '<div style="display:flex;flex-wrap:wrap;gap:' + (gap || 12) + 'px;align-items:flex-start">' + items.join('') + '</div>';

  const figNoGap = gapBars(
    [{ lo: 12, hi: 16, label: '第1·X1' }, { lo: 13, hi: 17, label: '第2·X2' }, { lo: 11, hi: 16, label: 'X3' }],
    { i: 0, lo: 13, hi: 16, label: '有重叠', color: '#16a34a' }, { w: 54, h: 130 });
  const figGap = gapBars(
    [{ lo: 12, hi: 16, label: '第1·X1' }, { lo: 17, hi: 20, label: '第2·X2' }, { lo: 14, hi: 19, label: 'X3' }],
    { i: 0, lo: 16, hi: 17, label: '缺口', color: '#e74c3c' }, { w: 54, h: 130 });

  window.__anims = window.__anims || {};
  __anims['ch9'] = {
    title: '特征序列缺口判定：两种情况的推演',
    steps: [
      {
        label: '① 第一、二元素间无缺口（第一种情况）',
        html: figNoGap
          + cap('X1[12,16] 与 X2[13,17] 区间有重叠 [13,16]（<b>无缺口</b>）→ 第一种情况：顶分型成立，线段在顶分型高点直接结束（第67课）。'),
      },
      {
        label: '② 第一、二元素间有缺口（第二种情况）',
        html: figGap
          + cap('X1 上沿 16 &lt; X2 下沿 17，中间留出空白 [16,17]（<b>有缺口</b>）→ 第二种情况：顶分型高点是否真结束，还需看反向序列是否出现底分型。'),
      },
      {
        label: '③ 两种情况的判定差异',
        html: row([
          '<div>' + figNoGap + cap('无缺口 → 线段在该分型<b>直接结束</b>') + '</div>',
          '<div>' + figGap + cap('有缺口 → 需反向序列<b>再出相反分型</b>确认') + '</div>',
        ]),
      },
      {
        label: '④ 第二种情况：反向序列出底分型 → 线段才结束',
        html: row([
          '<div>' + figGap + cap('向上线段特征序列 X1X2X3：X1 与 X2 间<b>有缺口</b> → 顶分型高点 20 待确认') + '</div>',
          '<div>' + biLineSVG([{ p: 20, tag: '顶' }, { p: 15, tag: '底' }, { p: 18, tag: '顶' }, { p: 13, tag: '底' }, { p: 16, tag: '顶' }, { p: 12, tag: '底' }], { w: 48, h: 140 }) + cap('从 20 开始的向下一笔序列，其反向序列（向上笔）最终<b>出现底分型</b> → 线段在 20 结束') + '</div>',
        ])
          + cap('第二种情况完整推演：有缺口后<b>不是</b>当场结束，而要等反向序列<b>再出一个相反分型</b>（顶分型有缺口 → 看反向是否出底分型）。出现了 → 线段在顶分型高点 20 结束；始终不出现 → 原线段延续。第二个分型<b>不分第一、二种情况，只要有分型即可</b>。'),
      },
      {
        label: '⑤ 结论：唯一标准 = 第一、二元素间有无缺口',
        html: figGap
          + cap('判断线段结束的标准<b>只有一个</b>（第71课）：特征序列分型中<b>第一、二元素间是否存在缺口</b>。第一元素 = 假设转折点前线段最后特征元素；第二元素 = 转折点开始的第一笔，二者<b>方向相同</b>。无缺口即第一种，有缺口即第二种。'),
      },
    ],
  };
})();
