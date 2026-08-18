/* 第22章 缺口 · 类中枢 · 类背驰 · 奔走型 */
(function () {

  function optCh22() {
    const pts = [20, 18, 16, 14, 10, 11.5, 9.8, 10.8, 9, 8, 9.5, 8.5, 8.8, 7, 6.2];
    const mk = (x0, x1, lo, hi, name) => [{ xAxis: x0, yAxis: lo, name }, { xAxis: x1, yAxis: hi }];
    const mp = (i, name, color, pos) => ({ coord: [i, pts[i]], name, symbol: 'circle', symbolSize: 9, itemStyle: { color }, label: { show: true, color, fontSize: 10, position: pos, distance: 6, fontWeight: 'bold', formatter: function (p) { return p.name; } } });
    const pin = (i, name, color) => ({ coord: [i, pts[i]], name, symbol: 'pin', symbolSize: 40, itemStyle: { color }, label: { show: true, color, fontSize: 11, fontWeight: 'bold', formatter: function (p) { return p.name; } } });
    const seg = (x, y, name, color) => ({ coord: [x, y], name, symbol: 'none', label: { show: true, color, fontSize: 12, fontWeight: 'bold', position: 'top', formatter: function (p) { return p.name; } } });
    return {
      tooltip: { trigger: 'axis', axisPointer: { type: 'cross' } },
      grid: { left: 60, right: 80, top: 40, bottom: 40 },
      xAxis: { type: 'value', min: 0, max: 14, interval: 1 },
      yAxis: { type: 'value', scale: true, name: '价格' },
      series: [{
        name: '走势', type: 'line', data: pts.map((p, i) => [i, p]),
        symbol: 'circle', symbolSize: 4, lineStyle: { width: 2, color: '#1f2937' }, itemStyle: { color: '#1f2937' },
        markArea: {
          silent: true, itemStyle: { color: 'rgba(37,99,235,0.10)' },
          label: { show: true, position: 'insideTop', formatter: function (p) { return p.name || ''; }, color: '#2563eb', fontSize: 11 },
          data: [mk(4, 7, 9.8, 10.8, '类中枢A [9.8,10.8]'), mk(9, 12, 8.5, 9.5, '类中枢B [8.5,9.5]')],
        },
        markLine: {
          silent: true, symbol: 'none',
          lineStyle: { color: '#2563eb', type: 'dashed', width: 1 },
          label: { show: true, position: 'end', formatter: function (p) { return p.name; }, color: '#2563eb', fontSize: 10 },
          data: [
            { yAxis: 10.8, name: 'ZG(A)=10.8' },
            { yAxis: 9.8, name: 'ZD(A)=9.8' },
            { yAxis: 9.5, name: 'ZG(B)=9.5' },
            { yAxis: 8.5, name: 'ZD(B)=8.5' },
          ],
        },
        markPoint: { data: [
          mp(0, '顶 20', '#e74c3c', 'top'),
          pin(4, '逆向缺口 14→10', '#9333ea'),
          mp(14, '底·类背驰 6.2', '#16a34a', 'bottom'),
          seg(1.5, 17.5, '◀ 下跌走势', '#1f2937'),
          seg(6, 11.8, '奔走型·上下上', '#2563eb'),
        ] },
      }],
    };
  }

  const figBenZou = `
<div class="fig" style="min-width:250px"><div class="lbl">奔走型：第三类买卖点后的快速单边</div>${drawZS(
  [{ p: 10, tag: '底' }, { p: 14, tag: '顶', label: '离开' }, { p: 12, tag: '底', label: '微回试', color: '#9333ea' }, { p: 17, tag: '顶', label: '快速单边' }],
  [{ lo: 12, hi: 14, x0: 0, x1: 3, label: '微型类中枢' }],
  { zgzd: true, w: 52, h: 150 }
)}<div class="cap">上下上：第二上低点(12)刚与第一上低点(10)<b>稍微重合</b><br>→ 回试极浅，几乎单边 → <b>奔走型</b></div></div>
<div class="fig" style="min-width:250px"><div class="lbl">普通回抽：回试较深</div>${drawZS(
  [{ p: 10, tag: '底' }, { p: 14, tag: '顶', label: '离开' }, { p: 11, tag: '底', label: '深回试', color: '#2563eb' }, { p: 13, tag: '顶' }, { p: 12, tag: '底' }],
  [{ lo: 11, hi: 13, x0: 1, x1: 4, label: '明显类中枢' }],
  { zgzd: true, w: 52, h: 150 }
)}<div class="cap">回试深、重叠多 → 形成<b>明显类中枢</b><br>（盘整，而非奔走型的快速单边）</div></div>`;

  __chapters.push({
    id: 'ch22', vol: '卷五 · 分解与操作', title: '第22章 缺口 · 类中枢 · 类背驰 · 奔走型', source: '原文第64课',
    figures: [
      { kind: 'echarts', title: '带缺口的下跌：类中枢 · 类背驰', note: '下跌走势中，一处<b>逆向缺口</b>（14 直接跳到 10，紫色 pin）破坏原笔，须当成<b>一段</b>；其后两处<b>类中枢</b> A、B（线段以下无真中枢，只能叫类中枢，蓝色矩形），A 由<b>奔走型</b>“上下上”构成（第二上低点 9.8 刚与第一上低点 10 稍重合）。最后一段下跌 <b>8.8→6.2</b> 与前面相比 MACD 绿柱面积衰减 → <b>类背驰</b>（绿色底）。', option: optCh22 },
      { kind: 'html', title: '奔走型 vs 普通回抽', note: '<b>奔走型</b>是第三类买卖点之后的快速单边：离开中枢后回试<b>极浅</b>，构成一个“上下上”里第二上低点刚与第一上低点<b>稍微重合</b>的微型类中枢，随后继续单边。与之对照，<b>普通回抽</b>回试较深、重叠明显，形成较大的类中枢（盘整）。', html: figBenZou },
    ],
    sections: [
      { type: 'definition', title: '缺口的分解处理（第64课）', items: [
        { term: '① 顺向缺口：包含在一笔里', text: '缺口（跳空）若<b>顺着原来那笔</b>的方向下来，没有破坏前面那笔，就与一般走势没有区别，<span class="hl">缺口还是包含在原来的一笔里</span>。（如早盘低开、顺着昨天那笔下来的缺口。）', fig: mfig('顺向缺口 ⊂ 一笔', drawZS([{ p: 16, tag: '顶', label: '顶' }, { p: 12, label: '缺口(顺向)', color: '#9333ea' }, { p: 8, tag: '底', label: '底' }], [], { w: 44, h: 100 }), '顺着原笔下来的缺口，不破坏前一笔 → 仍是一笔') },
        { term: '② 逆向缺口：必然当成一段', text: '有些<b>突然逆着走势来的缺口</b>（如 530 那一次），<span class="hl">必然要当成一段（线段）</span>，而不能光当成一笔、或包含在某一笔里。因为缺口没有三笔？可以看成 <code>0 = 0 + 0 + 0</code>，一个缺口可看成三个缺口的叠加，<b>这样就有三笔以上了</b>。', formula: '逆向缺口 = 一段　（0 = 0 + 0 + 0）', fig: mfig('逆向缺口 = 一段', drawZS([{ p: 8, tag: '底' }, { p: 14, tag: '顶' }, { p: 6, label: '缺口=一段', color: '#9333ea' }, { p: 9, tag: '顶' }], [], { w: 44, h: 100 }), '突然逆着走势来的缺口，必须当一段，而非一笔') },
        { term: '③ 线段破坏的严格性', text: '线段必须要被破坏才算结束，但<b>必须要被线段破坏</b>才算真破坏，<span class="hl">单纯的一笔不能破坏线段</span>——这就避免了一些偶然因素对走势的干扰。', fig: mfig('笔不能破坏线段', drawZS([{ p: 10, tag: '底' }, { p: 15, tag: '顶' }, { p: 12, label: '一笔(破坏无效)', color: '#6b7280' }, { p: 16, tag: '顶' }, { p: 13, tag: '底' }], [], { w: 40, h: 96 }), '一笔打下来不算破坏，须等线段级别破坏') },
      ]},
      { type: 'definition', title: '类中枢 · 类背驰 · 奔走型', items: [
        { term: '① 类中枢', text: '严格意义上，<span class="hl">线段以下是没有中枢的</span>，所以线段以下的重叠结构，只能叫 <span class="kw">类中枢</span>（微型类中枢）。它由缺口或不足三段次级别走势构成，是中枢的“近似物”。', formula: '线段以下的重叠 = 类中枢（非真中枢）', fig: mfig('类中枢', drawZS([{ p: 10, tag: '底' }, { p: 12, tag: '顶' }, { p: 11, tag: '底' }, { p: 12.5, tag: '顶' }], [{ lo: 11, hi: 12, x0: 0, x1: 3, label: '类中枢' }], { w: 44, h: 100 }), '线段以下无真中枢，重叠只能叫“类中枢”') },
        { term: '② 类背驰', text: '在两个类中枢（或一个类中枢前后）之间，用 <b>MACD 柱子面积</b>比较力度，与一般趋势中的背驰判断<b>完全一样</b>：类中枢之后的那一段，力度明显衰减，即为<span class="kw">类背驰</span>。', formula: '类背驰 = 类中枢后一段 MACD 面积衰减', fig: mfig('类背驰', drawZS([{ p: 16, tag: '顶' }, { p: 12 }, { p: 13, tag: '顶' }, { p: 11 }, { p: 12, tag: '顶' }, { p: 8, tag: '底', label: '类背驰', color: '#16a34a' }], [{ lo: 11, hi: 13, x0: 0, x1: 4, label: '类中枢' }], { w: 40, h: 100 }), '类中枢后一段力度衰减（绿柱面积缩小）→ 类背驰') },
        { term: '③ 奔走型', text: '<span class="hl">奔走型</span>是第三类买卖点后的<b>快速单边</b>：一个“上下上”结构中，第二上的低点<b>刚和第一上的低点稍微重合</b>，构成一个极小的微型类中枢，随后走势继续单边“奔走”。', formula: '奔走型 = 上下上（第二上低点稍与第一上低点重合）', fig: mfig('奔走型', drawZS([{ p: 10, tag: '底' }, { p: 14, tag: '顶' }, { p: 12, tag: '底', label: '微回试', color: '#9333ea' }, { p: 17, tag: '顶', label: '单边' }], [{ lo: 12, hi: 14, x0: 0, x1: 3, label: '微型类中枢' }], { w: 44, h: 100 }), '第二上低点(12)刚与第一上低点(10)稍重合 → 快速单边') },
        { term: '④ 类第三类买卖点', text: '对前面的微型类中枢，可对应产生<span class="kw">类第三类卖点</span>（或买点）。其后有两种变化：<b>① 转大级别类中枢</b>；<b>② 类中枢移动</b>，直到形成新的类中枢为止。', fig: mfig('类第三类卖点', drawZS([{ p: 12, tag: '顶' }, { p: 10, tag: '底' }, { p: 11.5, tag: '顶' }, { p: 9, label: '类三卖', color: '#e74c3c' }, { p: 8, tag: '底' }], [{ lo: 10, hi: 11.5, x0: 0, x1: 2, label: '类中枢' }], { w: 44, h: 100 }), '离开类中枢后回抽不升破 ZD → 类第三类卖点') },
      ]},
      { type: 'motivation', title: '把“近似”也纳入理论', text: '级别一旦往下细分，精确的三段次级别走势往往凑不齐，此时走势不会“无定义可依”。缠师在 64 课里给出了一整套<b>近似语言</b>：<span class="kw">缺口</span>（顺向归入一笔、逆向当成一段）、<span class="kw">类中枢</span>、<span class="kw">类背驰</span>、<span class="kw">奔走型</span>。它们的意义在于：<b>在最低级别、最精细的图上，理论依然完整可操作</b>，尤其对短线与小级别操作，这是把走势“当下”分解清楚的关键。' },
      { type: 'pitfalls', title: '常见误区', items: [
        '把所有缺口都当“一段”——只有<b>逆着走势突然出现</b>的缺口才当一段，顺向缺口仍包含在原一笔里。',
        '把线段以下的重叠当成<b>真中枢</b>——严格说线段以下没有中枢，只能叫“类中枢”。',
        '认为类背驰与背驰是两套方法——其实<b>完全一样</b>，都是比较中枢前后 MACD 柱子面积。',
        '把“回试”都当成奔走型——奔走型要求回试<b>极浅</b>（第二上低点刚与第一上低点稍重合），回试深就成了普通盘整。',
      ]},
      { type: 'exercises', title: '练习', items: [
        { q: '一个早盘低开的缺口，顺着昨天那笔下来、没有破坏它，该当一笔还是当一段？', a: '当<b>一笔里的</b>（顺向缺口，包含在原来那笔里），与一般走势无异。只有突然逆着走势来的缺口（如 530），才必然当成一段。' },
        { q: '为什么逆向缺口能“当成一段”，而它明明只有一次跳空、没有三笔？', a: '把缺口看成 <code>0 = 0 + 0 + 0</code>，即<b>三个缺口的叠加</b>，这样就有三笔以上，自然够成一段。' },
        { q: '“类背驰”与“趋势背驰”的判断方法有何异同？', a: '<b>完全相同</b>——都是比较两段（类）中枢前后对应段的 MACD 柱子面积，后段面积明显衰减即背驰。区别只在参照对象是“类中枢”还是“真中枢”。' },
      ]},
    ],
  });
})();
