/* 第9章 特征序列的缺口判定 */
(function () {

  // 特征序列元素条 + 第一、二元素间的「缺口 / 重叠」标注
  function gapSeqSVG(ivs, gap, opts = {}) {
    const w = opts.w || 54, h = opts.h || 128, pad = 18;
    const min = Math.min(...ivs.map(x => x.lo)), max = Math.max(...ivs.map(x => x.hi));
    const range = (max - min) || 1;
    const y = v => pad + (max - v) / range * (h - 2 * pad);
    const x = i => pad + i * w + w / 2;
    const W = pad * 2 + w * ivs.length;
    let s = `<svg viewBox="0 0 ${W} ${h}" width="${W}" height="${h}" style="display:block">`;
    ivs.forEach((iv, i) => {
      const col = iv.color || '#f59e0b';
      const top = y(iv.hi).toFixed(1), hgt = Math.max(3, y(iv.lo) - y(iv.hi));
      s += `<rect x="${(x(i) - 13).toFixed(1)}" y="${top}" width="26" height="${hgt.toFixed(1)}" fill="${col}" opacity="0.85" rx="2"/>`;
      s += `<text x="${x(i)}" y="${(y(iv.lo) + 14).toFixed(1)}" font-size="10" text-anchor="middle" fill="#1f2937">${iv.label}</text>`;
    });
    if (gap) {
      const gx = (x(gap.i) + x(gap.i + 1)) / 2;
      const c = gap.color || '#9333ea';
      const y0 = y(gap.hi), y1 = y(gap.lo);
      s += `<line x1="${gx.toFixed(1)}" y1="${y0.toFixed(1)}" x2="${gx.toFixed(1)}" y2="${y1.toFixed(1)}" stroke="${c}" stroke-width="1.6" stroke-dasharray="3 2"/>`;
      s += `<text x="${gx.toFixed(1)}" y="${((y0 + y1) / 2 + 4).toFixed(1)}" font-size="10" text-anchor="middle" fill="${c}" font-weight="bold">${gap.label}</text>`;
    }
    s += '</svg>';
    return s;
  }

  // ---- 主图1：ECharts 特征序列缺口全景（第二种情况：第一二元素间有缺口）----
  function optCh09() {
    const ps = [10, 16, 12, 20, 17, 19, 14]; // P0..P6：向上线段的笔端点
    const mk = (x0, x1, lo, hi, name) => [{ xAxis: x0, yAxis: lo, name }, { xAxis: x1, yAxis: hi }];
    const mp = (i, name, color, pos) => ({ coord: [i, ps[i]], name, symbol: 'circle', symbolSize: 8, itemStyle: { color }, label: { show: true, color, fontSize: 10, position: pos, distance: 5, fontWeight: 'bold', formatter: function (p) { return p.name; } } });
    const seg = (x, y, name, color, pos) => ({ coord: [x, y], name, symbol: 'none', label: { show: true, color, fontSize: 11, fontWeight: 'bold', position: pos || 'top', formatter: function (p) { return p.name; } } });
    return {
      tooltip: { trigger: 'axis', axisPointer: { type: 'cross' } },
      grid: { left: 48, right: 120, top: 36, bottom: 42 },
      xAxis: { type: 'value', min: 0, max: 6, interval: 1 },
      yAxis: { type: 'value', scale: true, name: '价格' },
      series: [{
        name: '线段笔', type: 'line', data: ps.map((p, i) => [i, p]),
        symbol: 'circle', symbolSize: 5, lineStyle: { width: 2, color: '#1f2937' }, itemStyle: { color: '#1f2937' },
        markArea: {
          silent: true, itemStyle: { color: 'rgba(245,158,11,0.13)', borderColor: '#f59e0b', borderType: 'dashed' },
          label: { show: true, position: 'insideTop', formatter: function (p) { return p.name || ''; }, color: '#b45309', fontSize: 10 },
          data: [mk(1, 2, 12, 16, '第1元素 X1 [12,16]'), mk(3, 4, 17, 20, '第2元素 X2 [17,20]'), mk(5, 6, 14, 19, '第3元素 X3 [14,19]')],
        },
        markLine: {
          silent: true, symbol: 'none',
          lineStyle: { color: '#9333ea', type: 'dashed', width: 1 },
          label: { show: true, position: 'end', formatter: function (p) { return p.name; }, color: '#9333ea', fontSize: 10 },
          data: [
            { yAxis: 16, name: 'X1上沿=16（缺口下边）' },
            { yAxis: 17, name: 'X2下沿=17（缺口上边）' },
            { yAxis: 20, name: '顶分型高点=20', lineStyle: { color: '#e74c3c' } },
          ],
        },
        markPoint: {
          data: [
            mp(0, '底·线段起点', downColor, 'bottom'),
            mp(3, '顶·顶分型高点 20', upColor, 'top'),
            seg(2.5, 16.6, '缺口 [16,17]', '#9333ea', 'top'),
            seg(2.5, 8.2, '◀ 向上线段（特征序列＝向下笔 X1X2X3）', '#6b7280', 'bottom'),
          ],
        },
      }],
    };
  }

  // ---- 主图2：两种情况对比（无缺口 / 有缺口）----
  const figTwo = `
<div class="fig" style="min-width:250px"><div class="lbl good">① 无缺口（第一种情况）</div>${gapSeqSVG([{ lo: 12, hi: 16, label: '第1·X1' }, { lo: 13, hi: 17, label: '第2·X2' }, { lo: 11, hi: 16, label: 'X3' }], { i: 0, lo: 13, hi: 16, label: '有重叠', color: '#16a34a' }, { w: 54, h: 128 })}<div class="cap">X1、X2 区间有重叠（<b>无缺口</b>）<br>顶分型成立 → 线段在 X2 高点结束</div></div>
<div class="fig" style="min-width:250px"><div class="lbl bad">② 有缺口（第二种情况）</div>${gapSeqSVG([{ lo: 12, hi: 16, label: '第1·X1' }, { lo: 17, hi: 20, label: '第2·X2' }, { lo: 14, hi: 19, label: 'X3' }], { i: 0, lo: 16, hi: 17, label: '缺口', color: '#e74c3c' }, { w: 54, h: 128 })}<div class="cap">X1 上沿 16 &lt; X2 下沿 17（<b>有缺口</b>）<br>需看反向序列是否出现底分型</div></div>`;

  // ---- 主图3：最早破坏那笔就是转折点第一笔的「中间地带」----
  const figMid = `
<div class="fig" style="min-width:250px"><div class="lbl">延伸三笔 → 第三笔破第一笔结束位置</div>${drawZS([{ p: 10, tag: '底' }, { p: 16, tag: '顶' }, { p: 11, tag: '底' }, { p: 14, tag: '顶' }, { p: 10.5, tag: '底', label: '新线段', color: '#9333ea' }], [{ lo: 11, hi: 16, x0: 0, x1: 3, label: '第一笔范围 [11,16]' }], { w: 46, h: 130 })}<div class="cap">破坏那笔（顶→11）是转折点第一笔<br>延伸三笔、第三笔破第一笔结束位 11 → 新线段成立</div></div>
<div class="fig" style="min-width:250px"><div class="lbl">第三笔完全在第一笔范围内</div>${drawZS([{ p: 10, tag: '底' }, { p: 16, tag: '顶' }, { p: 13, tag: '底' }, { p: 15, tag: '顶' }, { p: 13.5, tag: '底' }], [{ lo: 13, hi: 16, x0: 0, x1: 4, label: '第一笔范围 [13,16]' }], { w: 46, h: 130 })}<div class="cap">第三笔(15)未破 16、也未破 13 → 分不出方向<br>先破 13 → 新线段；先破 16 → 旧线段延续</div></div>`;

  __chapters.push({
    id: 'ch09', vol: '卷二 · 形态学', title: '第9章 特征序列的缺口判定', source: '原文第67、71课',
    figures: [
      { kind: 'echarts', title: '特征序列第一、二元素间的缺口', note: '向上线段的<b>特征序列</b>是其中的<b>向下笔</b>（橙色 X1、X2、X3）。判断线段结束的<b>唯一标准</b>：看分型<b>第一、第二元素</b>间有无缺口——X1 上沿 16 与 X2 下沿 17 之间留出空白（紫色虚线），即<b>有缺口（第二种情况）</b>；此时顶分型高点 20 是否真正结束线段，还要看反向序列是否出现底分型。', option: optCh09 },
      { kind: 'html', title: '两种情况：第一、二元素间有无缺口', note: '把特征序列元素当成 K 线找分型，分型<b>第一元素</b>＝假设转折点前线段的最后一个特征元素，<b>第二元素</b>＝从转折点开始的第一笔，二者同方向。<b>无缺口</b>是第一种情况（线段在该分型直接结束）；<b>有缺口</b>是第二种情况（需反向序列再出分型确认）。', html: figTwo },
      { kind: 'html', title: '最早破坏那笔就是转折点第一笔', note: '这种情况下，这笔属于「中间地带」——既不算前段特征序列、也不算后段特征序列，处于<b>待定</b>状态。它一旦延伸出三笔以上、且第三笔破第一笔结束位置，<b>新线段才形成</b>；若第三笔始终在第一笔范围内，则要看先破哪一端。', html: figMid },
    ],
    sections: [
      { type: 'definition', title: '缺口判定的唯一标准', items: [
        { term: '① 唯一判断标准（第71课）', plain: plainHTML('判断标准<b>只有一个</b>：分型第一、二元素间<b>有无缺口</b>。无缺口＝第一种情况，有缺口＝第二种情况——先分清这个，后面都好办。'), text: '67 课把线段划分分为两种情况，<span class="hl">分清楚是哪种情况，对划分线段十分关键</span>。判断的标准<b>只有一个</b>：特征序列的分型中，<b>第一和第二元素间是否存在特征序列的缺口</b>。无缺口即第一种情况，有缺口即第二种情况。', fig: mfig('判断标准唯一', gapSeqSVG([{ lo: 12, hi: 16, label: 'X1' }, { lo: 17, hi: 20, label: 'X2' }, { lo: 14, hi: 19, label: 'X3' }], { i: 0, lo: 16, hi: 17, label: '缺口', color: '#e74c3c' }, { w: 46, h: 110 }), '只看第一、二元素间有无缺口') },
        { term: '② 第一元素与第二元素（第71课）', plain: plainHTML('第一元素＝假设转折点<b>前</b>线段的最后一个反向笔；第二元素＝转折点<b>开始</b>的第一笔。这俩方向相同，中间有缝就是缺口。'), text: '特征序列分型中，<span class="kw">第一元素</span>就是<b>假设转折点前线段的最后一个特征元素</b>；<span class="kw">第二元素</span>就是<b>从这转折点开始的第一笔</b>。显然这两者<b>方向相同</b>，因此：两者之间有缺口 → 第二种情况；无缺口 → 第一种情况，然后按定义考察即可。', fig: mfig('第一、二元素', intervalsSVG([{ lo: 12, hi: 16, label: '第1' }, { lo: 17, hi: 20, label: '第2' }, { lo: 14, hi: 19, label: '第3' }], { w: 46, h: 110 }), '第1＝转折点前最后特征元素，第2＝转折点第一笔') },
        { term: '③ 第一种情况·无缺口（第67课）', plain: plainHTML('无缺口 → 线段<b>直接在该分型结束</b>，不用再等确认。'), text: '特征序列的<b>顶分型</b>中，第一、第二元素间<b>不存在</b>缺口 → 该线段在顶分型的<b>高点</b>处结束；<b>底分型</b>第一、二元素间无缺口 → 在该底分型的<b>低点</b>处结束。', fig: mfig('第一种情况：无缺口', gapSeqSVG([{ lo: 12, hi: 16, label: 'X1' }, { lo: 13, hi: 17, label: 'X2' }, { lo: 11, hi: 16, label: 'X3' }], { i: 0, lo: 13, hi: 16, label: '有重叠', color: '#16a34a' }, { w: 46, h: 110 }), 'X1、X2 重叠（无缺口）→ 线段直接结束') },
        { term: '④ 第二种情况·有缺口（第67课）', plain: plainHTML('有缺口 → 当场不能定，要<b>等反向序列再出一个相反分型</b>；第二个分型<b>不分第一、二种情况，只要有分型就行</b>，且它<b>不一定封闭前一缺口</b>。'), tree: treeHTML({
          start: 'n0',
          nodes: {
            n0: { q: '分型第一、二元素间 有缺口（第二种情况）。从该分型极值点起，反向序列是否出现「相反分型」？', opts: [
              { t: '出现（顶分型有缺口→反向出底分型；底分型有缺口→反向出顶分型）', next: 'end' },
              { t: '不出现', next: 'cont' },
            ]},
            end: { result: 'green', t: '出现 → 线段在该分型极值点【结束】。' },
            cont: { result: 'red', t: '不出现 → 原线段【延续】。' },
          }
        }), text: '顶分型第一、二元素间<b>存在</b>缺口 → 若从该分型最高点开始的向下一笔序列的特征序列<b>出现底分型</b>，则该线段在该顶分型高点处结束；底分型有缺口 → 反向序列出现顶分型则在该底分型低点结束。<span class="hl">强调</span>：后一特征序列<b>不一定封闭前一缺口</b>，且第二个序列的分型<b>不分第一、二种情况，只要有分型即可</b>。', fig: mfig('第二种情况：有缺口', gapSeqSVG([{ lo: 12, hi: 16, label: 'X1' }, { lo: 17, hi: 20, label: 'X2' }, { lo: 14, hi: 19, label: 'X3' }], { i: 0, lo: 16, hi: 17, label: '缺口', color: '#e74c3c' }, { w: 46, h: 110 }), '有缺口 → 需反向序列出现相反分型确认') },
        { term: '⑤ 包含关系的前提（第71课）', plain: plainHTML('还是那句：<b>同一特征序列</b>里的元素才能比包含，跨序列讨论包含没意义。'), text: '特征序列元素要讨论<b>包含关系</b>，首先前提是这些元素<b>都在同一特征序列里</b>；两个不同特征序列之间的元素，讨论包含关系<b>没意义</b>。特征序列元素的方向与其对应段方向<b>刚好相反</b>（向上段的特征序列元素向下、向下段的向上），所以不同段之间根本不可能存在包含。', fig: mfig('同一序列才可讨论包含', intervalsSVG([{ lo: 12, hi: 16, label: 'X1' }, { lo: 13, hi: 17, label: 'X2' }, { lo: 11, hi: 16, label: 'X3' }], { w: 46, h: 110 }), '不同特征序列之间的元素，讨论包含无意义') },
        { term: '⑥ 转折点前后两元素无包含（第71课）', plain: plainHTML('转折点<b>前后</b>那两笔不同性质，不比包含；转折点<b>之后</b>的同方向笔才可做包含处理。'), text: '在假设的转折点<b>前后那两个元素</b>，是<b>不存在包含关系</b>的——因为这两者已被假设为不同性质的东西，不一定是同一特征序列。但假设转折点<b>之后</b>的顶分型元素，<b>可以应用包含关系</b>（它们必是同一类的东西：或同属原线段特征序列，或同属新线段非特征序列）。', fig: mfig('前后两元素不含、后元素可含', gapSeqSVG([{ lo: 12, hi: 16, label: '前·X1' }, { lo: 13, hi: 17, label: '后·X2' }, { lo: 11, hi: 16, label: 'X3' }], { i: 0, lo: 13, hi: 16, label: '后元素间可含', color: '#2563eb' }, { w: 46, h: 110 }), '转折点前后两元素无包含；其后元素间可包含') },
      ]},
      { type: 'definition', title: '三种情形与当下划分', items: [
        { term: '① 前段未被笔破坏时（第71课）', text: '在<b>前一段没有被笔破坏</b>时，依然不能定义后特征序列的元素，此时可以存在前一特征序列的分型；由于还在<b>同一特征序列</b>中，序列元素的<b>包含关系是可以成立</b>的。', fig: mfig('前段未破坏：同序列、含成立', intervalsSVG([{ lo: 12, hi: 16, label: 'X1' }, { lo: 13, hi: 17, label: 'X2' }, { lo: 11, hi: 16, label: 'X3' }], { w: 46, h: 110 }), '还在同一特征序列里 → 可做包含处理') },
        { term: '② 前段被笔破坏、破坏那笔非第一笔（第71课）', text: '当前一段被笔破坏、且<b>最早破坏的一笔不是转折点开始的第一笔</b>时，特征序列的分型结构也成立：此时<b>转折点前最后一个特征元素与转折点后第一个特征元素之间肯定有缺口</b>，且后者与最早破坏那笔肯定不是包含关系（否则该缺口不可能被封闭，破坏那笔也就破坏不了前线段）。', fig: mfig('破坏笔非第一笔：必有缺口', gapSeqSVG([{ lo: 12, hi: 16, label: '前·X1' }, { lo: 17, hi: 20, label: '后·X2' }, { lo: 14, hi: 19, label: 'X3' }], { i: 0, lo: 16, hi: 17, label: '缺口', color: '#e74c3c' }, { w: 46, h: 110 }), '转折点前后两特征元素之间必有缺口') },
        { term: '③ 最早破坏那笔就是转折点第一笔（第71课）', plain: plainHTML('这笔是「中间地带」——前不算、后不算，<b>待定</b>；要等它延伸出三笔以上，新线段才算成立。'), text: '若最早破坏那笔<b>就是转折点下来的第一笔</b>，这笔就属于<b>「中间地带」</b>——既不能说它是前一段特征序列，更不能说是后一段特征序列，处于<b>待定</b>状态。此时即使出现看似特征序列包含关系的走势，也不能算。它一旦<b>延伸出三笔以上，新的线段就形成</b>，那时再谈前线段特征序列的包含关系就没意义了。', fig: mfig('中间地带：待定', biLineSVG([{ p: 10, tag: '底' }, { p: 16, tag: '顶' }, { p: 11, tag: '底' }, { p: 14, tag: '顶' }, { p: 10.5, tag: '底' }], { segColors: ['#2563eb', '#9333ea', '#9333ea', '#9333ea'], w: 46, h: 110 }), '破坏那笔（紫）是转折点第一笔 → 待定，延伸三笔方成新线段') },
        { term: '④ 第三笔完全在第一笔范围内（第71课）', plain: plainHTML('方向分不出来时，就看<b>先破哪一端</b>：先破第一笔的结束位置 → 新线段成立；先破第一笔的开始位置 → 旧线段延续。'), text: '更复杂的情况：<b>第三笔完全在第一笔的范围内</b>，这三笔就分不出向上还是向下，也就<b>定义不了特征序列</b>（特征序列与走势相反，走势连方向都没有，就无从判断）。结果无非两种：<span class="kw">1</span> 先破第一笔的<b>结束位置</b> → 新线段成立、旧线段被破坏；<span class="kw">2</span> 先破第一笔的<b>开始位置</b> → 旧线段只被一笔破坏后延续原方向，新线段不出现。', fig: mfig('第三笔在第一笔范围内', drawZS([{ p: 10, tag: '底' }, { p: 16, tag: '顶' }, { p: 13, tag: '底' }, { p: 15, tag: '顶' }, { p: 13.5, tag: '底' }], [{ lo: 13, hi: 16, x0: 0, x1: 4, label: '第一笔范围 [13,16]' }], { w: 40, h: 104 }), '方向未定：先破 13 成新线段，先破 16 旧线段延续') },
        { term: '⑤ 当下划分程序（第71课）', text: '线段的划分<b>都可以当下完成</b>，无非如下程序：<span class="hl">假设某转折点是两线段的分界点</span>，然后对此用线段划分的两种情况去考察——<b>满足其中一种，这点就是真正的分界点；都不满足，那就不是，原线段依然延续</b>。就这么简单。', fig: mfig('当下划分程序', biLineSVG([{ p: 10, tag: '底' }, { p: 16, tag: '顶' }, { p: 12, tag: '底' }, { p: 18, tag: '顶' }], { w: 46, h: 110 }), '假设分界点 → 用两种情况考察，满足其一即分界') },
        { term: '⑥ 顶分型右侧元素是「辅助线」（第71课）', text: '分型<b>必然属于前后两段</b>（是分水岭、连接点），与「包含」不同（包含是对同一段说的）。若线段<b>最终被破坏</b>，分型<b>右侧的元素</b>（如顶分型右侧的向下元素）<b>肯定不属于前后任何一段的特征序列</b>——它只是一般判断上的方便预设，如同几何里添加<b>辅助线</b>，不属于图形本身，但对研究有帮助。', fig: mfig('右侧元素＝辅助线', gapSeqSVG([{ lo: 12, hi: 16, label: 'X1' }, { lo: 17, hi: 20, label: 'X2·顶' }, { lo: 14, hi: 19, label: 'X3·右侧' }], { i: 0, lo: 16, hi: 17, label: '缺口', color: '#e74c3c' }, { w: 46, h: 110 }), '顶分型右侧元素（X3）只是方便判断的辅助线') },
      ]},
      { type: 'motivation', title: '为什么「缺口」是线段划分的关键', text: '第 67 课给出特征序列后，线段划分已经精确；第 71 课「再分辨」是为了把其中最容易晕的<b>包含关系前提</b>与<b>第一、二元素缺口</b>讲透。抓住一句话即可：<span class="hl">特征序列的元素要讨论包含，首先必须是同一特征序列的元素</span>；而判断线段结束的标准只有一个——<b>分型第一、二元素间有无缺口</b>。分清这一点，线段划分就从「感觉」变成了「当下可执行的完全分类」。' },
      { type: 'pitfalls', title: '常见误区', items: [
        '在<b>不同特征序列</b>的元素之间讨论包含关系（第71课：前提必须是同一特征序列）。',
        '把「最早破坏那笔就是转折点第一笔」直接当成<b>线段已结束</b>（错：这笔是「中间地带」待定，要延伸三笔才成新线段）。',
        '第二种情况里，对<b>第二序列的分型</b>再分第一、二种情况（错：只要有分型即可）。',
        '以为特征序列分型出现就<b>必然结束</b>线段（它只是前提，还要看缺口与反向分型）。',
      ]},
      { type: 'exercises', title: '练习', items: [
        { q: '判断线段结束的标准有哪几种？', a: '只有<b>一个</b>标准：特征序列分型中<b>第一、第二元素间是否存在缺口</b>。无缺口是第一种情况，有缺口是第二种情况。' },
        { q: '特征序列「第一、第二元素间有缺口」具体指什么？', a: '第一元素（假设转折点前线段的最后一个特征元素）与第二元素（转折点开始的第一笔）的<b>区间没有重合</b>，中间留出空白。如 X1 上沿 16 &lt; X2 下沿 17，缺口就是 [16,17]。' },
        { q: '最早破坏那笔就是转折点第一笔时，什么时候新线段才成立？', a: '这笔是「中间地带」待定状态。当它<b>延伸出三笔以上、且第三笔破第一笔的结束位置</b>时，新线段才成立；若第三笔始终在第一笔范围内，则看先破结束位置还是开始位置。' },
      ]},
    ],
  });
})();
