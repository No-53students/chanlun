/* 第57章 真实K线实战：从原始 K 线到笔（原文第62、65课）
   拿一段「真实」的 K 线序列（带包含关系），用 core.js 的真实算法现场跑一遍：包含处理 → 分型 → 笔 → 中枢。 */
(function () {

  // 18 根原始 K 线（l, h, up），其中 k2 被 k1 包含、k13 被 k12 包含（向上合并取高高）
  const defs = [[10, 12, 1], [11, 13, 1], [11.5, 12.9, 1], [12.5, 14.5, 1], [13.5, 15.5, 1], [14.5, 16.5, 1], [13, 15, 0], [12, 14, 0], [11, 13, 0], [10, 12, 0], [9, 11, 0], [10, 12, 1], [11, 13, 1], [11.5, 12.9, 1], [12.5, 14.5, 1], [13.5, 15.5, 1], [14.5, 16.5, 1], [13, 15, 0]];
  const raw = defs.map(d => mk(d[0], d[1], !!d[2]));
  const { merged, groups } = mergeIncluded(raw);
  const fr = findFractals(merged);
  const bi = findBi(merged, fr.tops, fr.bottoms);
  const contained = new Set(groups.filter(g => g.length > 1).flatMap(g => g.slice(0, -1)));

  const rawLabels = [...contained].map(i => ({ i, text: '被包含', pos: 'top', color: '#f59e0b' }));
  const rawSvg = klineAnnSVG(raw, rawLabels, { w: 24, h: 96 });
  const fracLabels = [];
  fr.tops.forEach(i => fracLabels.push({ i, text: '顶', pos: 'top', color: '#e74c3c' }));
  fr.bottoms.forEach(i => fracLabels.push({ i, text: '底', pos: 'bottom', color: '#16a34a' }));
  const mergedSvg = klineAnnSVG(merged, fracLabels, { w: 26, h: 96 });
  const biPts = bi.map(b => ({ p: b.type === 'top' ? merged[b.i].h : merged[b.i].l, tag: b.type === 'top' ? '顶' : '底' }));
  const biSvg = biLineSVG(biPts, { w: 40, h: 96 });
  const mergeAnim = klineMergeAnimSVG(raw[1], raw[2], merged[1], 'up');

  const figFlow = `
<div class="fig" style="min-width:340px"><div class="lbl">真实 K 线完整流水线：原始 → 合并 → 分型 → 笔</div>
<div style="display:flex;gap:8px;align-items:flex-start;flex-wrap:wrap">
  <div>${rawSvg}<div class="cap">① 原始 K 线（18 根）<br>黄标「被包含」的 2 根</div></div>
  <div class="arrow">→</div>
  <div>${klineSVG(merged, { w: 26, h: 96 })}<div class="cap">② 包含处理（16 根）<br>向上合并取高高</div></div>
  <div class="arrow">→</div>
  <div>${mergedSvg}<div class="cap">③ 分型<br>顶@4、底@9、顶@14</div></div>
  <div class="arrow">→</div>
  <div>${biSvg}<div class="cap">④ 笔<br>顶→底→顶（2 笔）</div></div>
</div>
<div class="cap">拿一段带包含关系的真实 K 线，用真实算法现场跑一遍完整流水线。每一步都机械可复现。</div></div>`;

  __chapters.push({
    id: 'ch57', vol: '卷十二 · 实战精进', title: '第57章 真实K线实战：从原始 K 线到笔', source: '原文第62、65课',
    figures: [
      { kind: 'html', title: '真实 K 线完整流水线', note: '这段 K 线有 <b>18 根</b>，其中 2 根「被包含」（第②根被第①根包含、第13根被第12根包含）。按流水线走：<b>包含处理 → 16 根 → 分型（顶@4、底@9、顶@14）→ 笔（顶→底→顶 共 2 笔）</b>。下面逐句拆解每一步。', html: figFlow },
      { kind: 'html', title: '包含合并动画（向上取高高）', note: '第②根 K 线（黄虚线）被第①根完全包住：<b>向上合并 → 取「高高」</b>，即高点取 max(13,12.9)=13、低点取 max(11,11.5)=11.5，合并成一根。这是所有分型 / 笔 / 中枢的<b>地基</b>——不先做干净 K 线，后面全错。', html: '<div class="fig" style="min-width:320px"><div class="lbl">包含合并：向上取高高</div>' + mergeAnim + '<div class="cap">第①根(红) 包含 第②根(黄虚线)，向上合并 → 取「高高」。</div></div>' },
    ],
    sections: [
      { type: 'definition', title: '完整流程回顾', items: [
        { term: '① 从原始 K 线到笔的七步',
          plain: plainHTML('任何一张图，都先做包含处理得到「干净 K 线」，再找分型、连笔、定线段、画中枢。'),
          flow: flowHTML([
            { title: '① 原始 K 线', lines: ['拿到序列（可能含包含关系）'], tone: 'blue' },
            { title: '② 包含处理', lines: ['相邻 K 线有包含就合并：向上取高高、向下取低低'], tone: 'blue' },
            { title: '③ 分型', lines: ['三根 K 线：中间最高 = 顶分型，中间最低 = 底分型'], tone: 'blue' },
            { title: '④ 笔', lines: ['相邻顶底分型相连，中间隔 ≥4 根独立 K 线'], tone: 'blue' },
            { title: '⑤ 线段', lines: ['至少三笔，被反向线段破坏才结束'], tone: 'amber' },
            { title: '⑥ 中枢', lines: ['连续三段重叠：ZG=最高低点、ZD=最低高点'], tone: 'amber' },
            { title: '⑦ 买卖点', lines: ['走势类型 + 背驰 + 区间套定位'], tone: 'green' },
          ]),
          text: '这一章用<b>真实算法</b>（core.js 里的 mergeIncluded / findFractals / findBi）把前四步现场跑了一遍。下面逐句看每一步在真实数据上的结果。' },
      ]},
      { type: 'definition', title: '① 包含处理：18 根 → 16 根', items: [
        { term: '② 哪些 K 线被包含、怎么合并',
          plain: plainHTML('第②根被第①根包含、第13根被第12根包含。都是「向上段」，合并时取高高（高点取 max、低点取 max）。'),
          text: '这段序列里有两处包含：<b>第②根（l=11.5,h=12.9）被第①根（l=11,h=13）包含</b>、<b>第13根被第12根包含</b>。因为处于向上段，合并规则是<b>向上取高高</b>：高点取 max(13,12.9)=<b>13</b>、低点取 max(11,11.5)=<b>11.5</b>。合并后 18 根变 16 根。',
          fig: mfig('向上合并取高高', mergeAnim, '第②根被第①根包含 → 取高高合并成一根'),
        },
      ]},
      { type: 'definition', title: '② 分型：顶@4、底@9、顶@14', items: [
        { term: '③ 三处顶底分型',
          plain: plainHTML('合并后的 16 根 K 线里，第5根最高=顶分型，第10根最低=底分型，第15根最高=顶分型。'),
          text: '合并后的 16 根 K 线，用三根一组找分型：<b>顶分型@4</b>（h=16.5，比两侧都高）、<b>底分型@9</b>（l=9，比两侧都低）、<b>顶分型@14</b>（h=16.5）。这就是「转折的种子」。',
          fig: mfig('分型标注', mergedSvg, '顶@4、底@9、顶@14 三处顶底分型'),
        },
        { term: '④ 动手练：标出三处分型', text: '在合并后的 K 线上，点击对应位置标出「顶 / 底」分型（点一下标顶、再点标底、再点取消）。', draw: drawHTML({
          kind: 'kline', marks: ['顶', '底'], title: '标出顶底分型', intro: '在合并后的 16 根 K 线上标出三处分型（顶@4、底@9、顶@14）。',
          klines: merged,
          answer: { 4: '顶', 9: '底', 14: '顶' },
        }) },
      ]},
      { type: 'definition', title: '③ 笔：顶→底→顶（2 笔）', items: [
        { term: '⑤ 相邻顶底分型相连成笔',
          plain: plainHTML('顶@4 连底@9 = 向下笔，底@9 连顶@14 = 向上笔。中间隔了 ≥4 根 K 线，符合笔的规则。'),
          text: '相邻顶底分型相连成笔：<b>顶@4(16.5) → 底@9(9)</b> 是一笔向下，<b>底@9(9) → 顶@14(16.5)</b> 是一笔向上。两处分型之间都隔了 ≥4 根独立 K 线（4→9 隔 4 根、9→14 隔 4 根），满足笔的「中间至少 4 根独立 K 线」规则。',
          fig: mfig('笔连线', biSvg, '顶→底→顶 共 2 笔'),
        },
      ]},
      { type: 'definition', title: '④ 中枢：三段笔重叠', items: [
        { term: '⑥ 至少三笔才可能形成中枢',
          plain: plainHTML('2 笔还构不成中枢——中枢要「连续三段（笔）重叠」。再加一段，就画出中枢了。'),
          text: '上面只有 2 笔，还画不出中枢（中枢要<b>连续三段</b>重叠）。示意：底 9 → 顶 16 → 底 12 → 顶 14，三段重叠区间 <b>[12,14]</b>（ZG=14、ZD=12），即中枢。',
          fig: mfig('三段重叠 = 中枢', drawZS([{ p: 9, tag: '底' }, { p: 16, tag: '顶' }, { p: 12, tag: '底' }, { p: 14, tag: '顶', label: 'ZG=14', color: '#e74c3c', above: true }], [{ lo: 12, hi: 14, x0: 0, x1: 3, label: '中枢[12,14]' }], { w: 40, h: 110, zgzd: true }), '三段重叠 [12,14] → 中枢'),
        },
      ]},
      { type: 'motivation', title: '为什么练真实 K 线', text: '前面章节的图都是「示意折线」，而实际盘面给的是<b>一根根带包含关系的 K 线</b>。这一章让你看到：从最原始、最「脏」的 K 线出发，用几条机械规则就能一路走到笔和中枢。练熟这一套，你面对真实行情就不会发怵。' },
      { type: 'pitfalls', title: '真实 K 线易错点', items: [
        '跳步：不做包含处理直接找分型（错：被包含的 K 线会制造「假分型」，必须先合并）。',
        '包含方向判断错：向上段取高高、向下段取低低，方向由「之前趋势」决定，不是当前两根。',
        '分型只看高低点不看两侧（错：分型要「中间那根」的高点/低点同时高于/低于左右两根）。',
        '两处分型隔太近也连成笔（错：顶底分型之间必须隔 ≥4 根独立 K 线）。',
      ]},
      { type: 'exercises', title: '真实 K 线自测', items: [
        { q: '拿到一段带包含关系的 K 线，第一步做什么？', a: '<b>包含处理</b>：相邻 K 线有包含就合并（向上取高高、向下取低低），先得到「无包含」的干净 K 线，再找分型、连笔。' },
        { q: '为什么被包含的 K 线会制造「假分型」？', a: '因为包含意味着「这根 K 线没有独立的高低点信息」，直接找分型会把包含内的波动误判成转折；合并后才是真正的转折点。' },
        { q: '合并后 16 根 K 线，顶分型@4、底分型@9、顶分型@14，能连成几笔？为什么还画不出中枢？', a: '连成 <b>2 笔</b>（顶→底、底→顶）。<b>2 笔不够</b>——中枢要「连续三段（笔）重叠」，至少 3 笔才能形成中枢。' },
      ]},
    ],
  });
})();
