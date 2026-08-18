/* 第6章 特征序列与线段划分 */
(function () {
  // 特征序列主图：向上线段内部笔，逐笔标注笔名与顶/底分型，向下笔(X)即特征序列
  function seqSVG() {
    const pts = [{ p: 10, tag: '底' }, { p: 16, tag: '顶' }, { p: 12, tag: '底' }, { p: 18, tag: '顶' }, { p: 13, tag: '底' }, { p: 20, tag: '顶' }];
    const names = ['S1', 'X1', 'S2', 'X2', 'S3'];
    const isDown = [false, true, false, true, false];
    const w = 52, h = 176, pad = 24;
    const min = 10, max = 20, range = max - min;
    const y = v => pad + (max - v) / range * (h - 2 * pad);
    const x = i => pad + i * w;
    const W = pad * 2 + w * (pts.length - 1);
    let s = `<svg viewBox="0 0 ${W} ${h}" width="${W}" height="${h}" style="display:block;max-width:100%">`;
    for (let i = 0; i < pts.length - 1; i++) {
      const col = isDown[i] ? '#f59e0b' : '#2563eb';
      s += `<line x1="${x(i)}" y1="${y(pts[i].p).toFixed(1)}" x2="${x(i + 1)}" y2="${y(pts[i + 1].p).toFixed(1)}" stroke="${col}" stroke-width="2.5"/>`;
      const mx = (x(i) + x(i + 1)) / 2, my = (y(pts[i].p) + y(pts[i + 1].p)) / 2;
      const ty = isDown[i] ? my + 15 : my - 7;
      s += `<text x="${mx.toFixed(1)}" y="${ty.toFixed(1)}" font-size="11" text-anchor="middle" fill="${col}" font-weight="bold">${names[i]}</text>`;
    }
    pts.forEach((pt, i) => {
      const c = pt.tag === '顶' ? '#e74c3c' : '#16a34a';
      s += `<circle cx="${x(i)}" cy="${y(pt.p).toFixed(1)}" r="3.5" fill="${c}"/>`;
      const ty = pt.tag === '顶' ? y(pt.p) - 9 : y(pt.p) + 15;
      s += `<text x="${x(i)}" y="${ty.toFixed(1)}" font-size="10" text-anchor="middle" fill="${c}" font-weight="bold">${pt.tag}</text>`;
    });
    s += `<text x="${(W / 2).toFixed(1)}" y="${(h - 8).toFixed(1)}" font-size="11" text-anchor="middle" fill="#f59e0b" font-weight="bold">橙＝向下笔 X1、X2 ＝ 特征序列</text>`;
    s += '</svg>';
    return s;
  }

  // 特征序列元素区间 + 顶分型 + 缺口/重叠 标注
  function gapSVG(ivs, opts = {}) {
    const w = opts.w || 54, h = opts.h || 178, pad = 40;
    const min = Math.min(...ivs.map(v => v.lo)), max = Math.max(...ivs.map(v => v.hi));
    const range = (max - min) || 1;
    const y = v => pad + (max - v) / range * (h - 2 * pad);
    const x = i => pad + i * w + w / 2;
    const W = pad * 2 + w * ivs.length;
    let s = `<svg viewBox="0 0 ${W} ${h}" width="${W}" height="${h}" style="display:block;max-width:100%">`;
    ivs.forEach((iv, i) => {
      const col = iv.color || '#f59e0b';
      const top = y(iv.hi).toFixed(1), hgt = Math.max(3, y(iv.lo) - y(iv.hi));
      s += `<rect x="${(x(i) - 13).toFixed(1)}" y="${top}" width="26" height="${hgt.toFixed(1)}" fill="${col}" opacity="0.85" rx="2"/>`;
      s += `<text x="${x(i)}" y="${(y(iv.lo) + 14).toFixed(1)}" font-size="10" text-anchor="middle" fill="#1f2937">${iv.label} [${iv.lo},${iv.hi}]</text>`;
    });
    if (opts.fenxing) {
      ivs.forEach((iv, i) => {
        s += `<circle cx="${x(i)}" cy="${y(iv.hi).toFixed(1)}" r="3" fill="#e74c3c"/>`;
        s += `<text x="${x(i)}" y="${(y(iv.hi) - 6).toFixed(1)}" font-size="9" text-anchor="middle" fill="#e74c3c">${iv.hi}</text>`;
      });
      const pl = ivs.map((iv, i) => `${x(i)},${y(iv.hi).toFixed(1)}`).join(' ');
      s += `<polyline points="${pl}" fill="none" stroke="#e74c3c" stroke-width="1.2" stroke-dasharray="3 3"/>`;
      s += `<text x="${x(1)}" y="${(y(ivs[1].hi) - 18).toFixed(1)}" font-size="11" text-anchor="middle" fill="#e74c3c" font-weight="bold">${opts.fenxing}</text>`;
    }
    if (opts.gap) {
      const g = opts.gap, c = g.color || '#9333ea';
      const gx = (x(0) + x(1)) / 2;
      const y0 = y(g.hi), y1 = y(g.lo);
      s += `<line x1="${gx.toFixed(1)}" y1="${y0.toFixed(1)}" x2="${gx.toFixed(1)}" y2="${y1.toFixed(1)}" stroke="${c}" stroke-width="1.4" stroke-dasharray="3 2"/>`;
      s += `<text x="${gx.toFixed(1)}" y="${(y0 - 8).toFixed(1)}" font-size="10" text-anchor="middle" fill="${c}" font-weight="bold">${g.label}</text>`;
    }
    s += '</svg>';
    return s;
  }

  const figSeq = `
<div class="fig"><div class="lbl">向上线段的特征序列</div>${seqSVG()}<div class="cap">蓝＝向上笔 S1/S2/S3（构成线段）<br>橙＝向下笔 X1/X2 ＝<b>特征序列</b>（与线段方向相反的笔）<br>红/绿标注＝笔的<b>顶/底分型</b></div></div>`;

  const figGap = `
<div class="fig"><div class="lbl good">① 无缺口（第一种情况）</div>${gapSVG([{lo:12,hi:16,label:'X1'},{lo:13,hi:17,label:'X2'},{lo:11,hi:16,label:'X3'}], {fenxing:'顶分型', gap:{lo:13,hi:16,label:'有重叠',color:'#16a34a'}})}<div class="cap">X1 与 X2 区间有重叠（无缺口）<br>顶分型成立 → 线段在该高点结束</div></div>
<div class="fig"><div class="lbl bad">② 有缺口（第二种情况）</div>${gapSVG([{lo:12,hi:16,label:'X1'},{lo:17,hi:20,label:'X2'},{lo:14,hi:19,label:'X3'}], {fenxing:'顶分型(待确认)', gap:{lo:16,hi:17,label:'缺口',color:'#e74c3c'}})}<div class="cap">X1 与 X2 之间留缺口<br>需看反向序列是否出底分型</div></div>`;

  __chapters.push({
    id: 'ch6', title: '第6章 特征序列与线段划分', source: '原文第67、71、77课',
    figures: [
      { kind: 'html', title: '特征序列：与线段方向相反的笔', note: '向上线段的内部笔是 上-下-上-下-上，其中的<b>向下笔</b>（橙色 X1、X2）就是特征序列。向下线段的特征序列则是其中的向上笔。', html: figSeq },
      { kind: 'html', title: '两种情况：第一二元素间有无缺口', note: '把特征序列元素当成 K 线找分型，看分型<b>第一、第二元素</b>间有没有缺口（区间不重叠）：无缺口是第一种情况，有缺口是第二种情况。', html: figGap },
    ],
    sections: [
      { type: 'definition', title: '特征序列与划分标准', items: [
        { term: '① 特征序列（第67课）', text: '以向上笔开始的线段用笔序列 <code>S1X1S2X2S3X3…SnXn</code> 表示（S 向上、X 向下）。定义序列 <code>X1X2…Xn</code> 为<span class="hl">向上线段</span>的<b>特征序列</b>；序列 <code>S1S2…Sn</code> 为<span class="kw">向下线段</span>的特征序列。即：<b>特征序列 = 与线段方向相反的笔</b>。', fig: mfig('特征序列 = 反向笔', biLineSVG([{ p: 10, tag: '底' }, { p: 16, tag: '顶' }, { p: 12, tag: '底' }, { p: 18, tag: '顶' }, { p: 13, tag: '底' }], { segColors: ['#2563eb', '#f59e0b', '#2563eb', '#f59e0b'], w: 50, h: 110 }), '向上线段中，向下笔 X1、X2 即特征序列') },
        { term: '② 缺口（第67课）', text: '特征序列<b>两相邻元素间没有重合区间</b>，称为该序列的一个<span class="hl">缺口</span>。（因为反向笔之间可能不重叠，这正体现了特征序列更能代表线段性质。）', fig: mfig('缺口：两元素无重合区间', intervalsSVG([{ lo: 12, hi: 16, label: 'X1' }, { lo: 17, hi: 20, label: 'X2' }], { w: 50, h: 100 }), 'X1 顶 16 < X2 底 17 → 之间留缺口') },
        { term: '③ 标准特征序列（第67课）', text: '把特征序列的<b>每一元素看成一根 K 线</b>，像普通 K 线找分型那样做<b>包含处理（非包含处理）</b>，得到<span class="hl">标准特征序列</span>。以后凡说特征序列，都指标准特征序列。', fig: mfig('标准特征序列（含包含处理）', intervalsSVG([{ lo: 12, hi: 16, label: 'X1' }, { lo: 13, hi: 17, label: 'X2' }, { lo: 11, hi: 16, label: 'X3' }], { w: 46, h: 100 }), '把元素当 K 线做包含处理 → 标准序列') },
        { term: '④ 只考察一种分型（第67课）', text: '参照顶/底分型定义确定特征序列的顶和底。注意：<b>向上线段的特征序列只考察顶分型；向下线段只考察底分型</b>。', fig: mfig('向上线段只考察顶分型', intervalsSVG([{ lo: 12, hi: 16, label: 'X1' }, { lo: 13, hi: 17, label: 'X2' }, { lo: 11, hi: 16, label: 'X3' }], { w: 46, h: 100 }), '向上线段：特征序列只找顶分型') },
        { term: '⑤ 第一种情况（无缺口，第67课）', text: '特征序列的<b>顶分型</b>中，第一和第二元素间<b>不存在</b>特征序列缺口 → 该线段在该顶分型的<b>高点</b>处结束；<b>底分型</b>第一二元素间无缺口 → 在该底分型的<b>低点</b>处结束。', fig: mfig('第一种情况：无缺口', intervalsSVG([{ lo: 12, hi: 16, label: 'X1' }, { lo: 13, hi: 17, label: 'X2' }, { lo: 11, hi: 16, label: 'X3' }], { w: 46, h: 100 }), 'X1、X2 有重叠（无缺口）→ 线段在该分型结束') },
        { term: '⑥ 第二种情况（有缺口，第67课）', text: '顶分型第一二元素间<b>存在</b>缺口 → 若从该分型最高点开始的向下一笔序列的特征序列<b>出现底分型</b>，则该线段在该顶分型高点处结束；底分型有缺口 → 若反向序列出现顶分型，则在该底分型低点处结束。<b>强调</b>：第二种情况下，后一特征序列不一定封闭前一缺口，且第二个序列中的分型<b>不分第一二种情况，只要有分型即可</b>。', fig: mfig('第二种情况：有缺口', intervalsSVG([{ lo: 12, hi: 16, label: 'X1' }, { lo: 17, hi: 20, label: 'X2' }, { lo: 14, hi: 19, label: 'X3' }], { w: 46, h: 100 }), 'X1、X2 留缺口 → 需看反向序列是否出分型') },
        { term: '⑦ 包含关系的前提（第71课）', text: '特征序列的元素要讨论<b>包含关系</b>，首先必须是<b>同一特征序列</b>的元素；两个不同特征序列之间的元素讨论包含关系<b>没有意义</b>。', fig: mfig('同一序列才可讨论包含', intervalsSVG([{ lo: 12, hi: 16, label: 'X1' }, { lo: 13, hi: 17, label: 'X2' }, { lo: 11, hi: 16, label: 'X3' }], { w: 46, h: 100 }), '不同特征序列之间的元素讨论包含无意义') },
        { term: '⑧ 当下划分程序（第71课）', text: '线段的划分可<b>当下完成</b>：假设某转折点是两线段分界点，用两种划分情况去考察——<b>满足其一，即为真正的分界点；都不满足，则原线段延续</b>。', fig: mfig('当下划分：满足其一即分界', biLineSVG([{ p: 10, tag: '底' }, { p: 16, tag: '顶' }, { p: 12, tag: '底' }, { p: 18, tag: '顶' }], { w: 50, h: 110 }), '用两种划分情况考察转折点，满足其一即真正分界') },
        { term: '⑨ 划分唯一性（第67课）', text: '按此标准，一切同一级别图上的走势都可以<b>唯一地划分为线段的连接</b>——正如可唯一划分为笔的连接，这是中枢与走势类型递归体系的<b>基础的基础</b>。', fig: mfig('唯一划分为线段连接', intervalsSVG([{ lo: 12, hi: 16, label: 'X1' }, { lo: 13, hi: 17, label: 'X2' }, { lo: 11, hi: 16, label: 'X3' }], { w: 46, h: 100 }), '同一级别图上，走势可唯一划分为线段连接') },
      ]},
      { type: 'motivation', title: '为什么需要特征序列', text: '第65课只说“线段被另一线段破坏”，但<b>何时算被破坏</b>还不够精确（可能出现“小级别转大级别”式的不确定）。特征序列把这个问题<b>精确化</b>：把线段内部的反向笔抽出来当 K 线，用“分型 + 缺口”给出线段结束的<b>完全分类</b>，从而消除不确定性，使线段划分像笔一样唯一。' },
      { type: 'pitfalls', title: '常见误区', items: [
        '在不同特征序列的元素之间<b>讨论包含关系</b>（第71课：前提必须是同一特征序列）。',
        '向上线段的特征序列去<b>找底分型</b>（错：向上只考察顶分型，向下只考察底分型）。',
        '第二种情况里，对<b>第二序列的分型</b>再分第一、二种情况（错：只要有分型即可）。',
        '把“出现特征序列分型”当成线段结束的<b>充分条件</b>（它只是前提，还要看缺口与反向分型）。',
      ]},
      { type: 'exercises', title: '练习', items: [
        { q: '一条向上线段的内部笔是 上-下-上-下-上，它的特征序列是什么？', a: '特征序列 = 其中的<b>向下笔</b>（第2、4 笔），即 X1、X2。反向笔才可能不重叠、出现缺口，所以用它来代表线段性质。' },
        { q: '特征序列“第一、第二元素间有缺口”是什么意思？', a: '指构成分型的三个相邻元素中，<b>第一个和第二个元素（都是反向笔）的区间没有重合</b>，中间留下一段空白；有缺口即第二种情况，需再看反向序列是否出现相反分型。' },
      ]},
    ],
  });
})();
