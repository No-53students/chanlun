/* 第48章 月线分段 · 教科书式走势示范 */
(function () {

  // 主图1：月线级别分段（分型·笔·线段）
  function optCh48() {
    const ps = [10, 22, 14, 26, 18, 30];
    const topScatter = [1, 3, 5].map(i => ({ name: '顶分型', value: [i, ps[i] + 0.5] }));
    const botScatter = [0, 2, 4].map(i => ({ name: '底分型', value: [i, ps[i] - 0.5] }));
    const biLine = ps.map((p, i) => [i, p]);
    const segLine = [[0, ps[0]], [5, ps[5]]];
    const mk = (x0, x1, lo, hi, name) => [{ xAxis: x0, yAxis: lo, name }, { xAxis: x1, yAxis: hi }];
    const seg = (x, y, name, color) => ({ coord: [x, y], name, symbol: 'none', label: { show: true, color, fontSize: 11, fontWeight: 'bold', position: 'top', formatter: function (p) { return p.name; } } });
    return {
      tooltip: { trigger: 'axis', axisPointer: { type: 'cross' } },
      grid: { left: 48, right: 30, top: 40, bottom: 40 },
      xAxis: { type: 'value', min: -0.2, max: 5.2, interval: 1, axisLabel: { formatter: 'M{value}' } },
      yAxis: { type: 'value', scale: true, name: '价格' },
      series: [
        { name: '笔', type: 'line', data: biLine, symbol: 'circle', symbolSize: 5, lineStyle: { color: '#f59e0b', width: 1.8 }, itemStyle: { color: '#f59e0b' } },
        { name: '线段', type: 'line', data: segLine, symbol: 'circle', symbolSize: 8, lineStyle: { color: '#2563eb', width: 3 }, itemStyle: { color: '#2563eb' }, z: 30,
          markArea: {
            silent: true, itemStyle: { color: 'rgba(37,99,235,0.10)' },
            label: { show: true, position: 'insideTop', formatter: function (p) { return p.name || ''; }, color: '#2563eb', fontSize: 11 },
            data: [mk(1, 4, 18, 22, '线段类中枢 [18,22]')],
          },
          markPoint: { data: [
            seg(0.2, 9.5, '◀ 向上线段（3笔以上）', '#2563eb'),
          ] },
        },
        { name: '顶分型', type: 'scatter', data: topScatter, symbol: 'triangle', symbolRotate: 180, symbolSize: 16, itemStyle: { color: '#e74c3c' }, label: { show: true, position: 'top', formatter: function (p) { return p.name; }, color: '#e74c3c', fontSize: 10, fontWeight: 'bold' }, z: 20 },
        { name: '底分型', type: 'scatter', data: botScatter, symbol: 'triangle', symbolSize: 16, itemStyle: { color: '#16a34a' }, label: { show: true, position: 'bottom', formatter: function (p) { return p.name; }, color: '#16a34a', fontSize: 10, fontWeight: 'bold' }, z: 20 },
      ],
    };
  }

  // 主图2：教科书式走势的最有利分解
  const figBest = `
<div class="fig" style="min-width:280px"><div class="lbl">最有利分解：8-17中枢 + 17-38上涨离开</div>${drawZS(
  [{ p: 12 }, { p: 14 }, { p: 13 }, { p: 15, label: '8-17', color: '#2563eb' }, { p: 17, label: '离开', color: '#1f2937' }, { p: 16, label: '三买', color: '#16a34a' }, { p: 18.5, tag: '顶', label: '17-38' }],
  [{ lo: 13, hi: 15, x0: 0, x1: 3, label: '5分钟中枢' }],
  { w: 44, h: 150 }
)}<div class="cap">结合律：把走势<b>最有利地</b>分解为 8-17 的5分钟中枢 + 17-38 的1分钟上涨（第三买点离开）</div></div>
<div class="fig" style="min-width:250px"><div class="lbl">中枢形成后：三种走势分类</div>
<div style="font-size:12.5px;line-height:2;color:#1f2937">
<span style="background:#e0e7ff;color:#3730a3;padding:2px 8px;border-radius:6px"><b>①</b> 向上<b>第三买点</b>→新中枢</span><br>
<span style="background:#fee2e2;color:#991b1b;padding:2px 8px;border-radius:6px"><b>②</b> 向下<b>第三卖点</b>→新中枢</span><br>
<span style="background:#fef3c7;color:#92400e;padding:2px 8px;border-radius:6px"><b>③</b> <b>中枢延伸</b>或扩展成更大级别中枢</span>
</div>
<div class="cap">无须预测，走势自然选择，只需观察着就可以</div></div>`;

  __chapters.push({
    id: 'ch48', vol: '卷九 · 实战操作与图解', title: '第48章 月线分段 · 教科书式走势示范', source: '原文第69、70课',
    figures: [
      { kind: 'echarts', title: '月线分段：分型·笔·线段在大级别成立', note: '第69课把分型、笔、线段推广到<b>月线</b>：用月线图分辨，等于用一个<b>精度超低的显微镜</b>，只能看大概，但这个大概是最实质性的大方向。图中橙色折线是<b>笔</b>（顶分型↔底分型交替连接），蓝色粗线是<b>线段</b>（至少三笔构成），中间三笔重叠区间 [18,22] 即<span class="kw">线段类中枢</span>。月线分型、笔、线段的规范与1分钟图完全一样。', option: optCh48 },
      { kind: 'html', title: '教科书式走势：最有利分解与三种分类', note: '第70课强调<span class="hl">结合律是连接走势之间最重要的规则</span>——因为结合律，可以随走势当下发展不断变换所看的中枢，做<b>最有利观察的分解</b>。左图把一个走势最有利地分解为"8-17 的 5 分钟中枢 + 17-38 的 1 分钟上涨"；右图是中枢形成后理论上仅有的<b>三种演化</b>，无须预测，走势自然选择。', html: figBest },
    ],
    sections: [
      { type: 'definition', title: '月线分段与上海大走势（第69课）', items: [
        { term: '① 分型·笔·线段推广到月线', text: '分型、笔、线段，在1分钟图上可以分辨，在月线图上道理一样。区别只在于：<span class="hl">用月线图分辨，等于用一个精度超低的显微镜，只能看一个大概，但这个大概却是最实质性的，是一个大方向</span>。月线图上的历史大顶大底，都能用线段划分清晰地标出来。', fig: mfig('月线分型（精度低但看大方向）', klineSVG([mk(10, 13), mk(8, 11), mk(10, 13.5)], { w: 28, h: 76 }), '月线图＝超低精度显微镜，看大概与大方向') },
        { term: '② 笔的两条规范', text: '月线分型若不符合笔的规范，就打"X"剔除。规范有两条：<b>一、顶和底之间至少有一根 K 线</b>（不能顶分型直接挨着底分型）；<b>二、必须满足顶接着底、或底接着顶</b>（不能两个顶分型或两个底分型连续）。不满足其一，就不能构成一笔。', formula: '① 顶底之间至少一K线　② 顶必须接底、底必须接顶', fig: mfig('笔的两条规范', '<div style="font-size:12px;line-height:1.9;color:#1f2937">① 顶、底之间<b>至少有一K线</b><br>② 顶必须接着<b>底</b>、底必须接着<b>顶</b></div>', '不满足其一，分型不能成笔') },
        { term: '③ 分型的可修改性＝图形未完成', text: '分型在当下可能随时修改，<b>但一旦完成的图形，修改就不可能了</b>——<span class="hl">分型可修改，恰恰证明图形没完成</span>。这个"未完成性"反而是极为有利的性质：结合"走势必完美"，图形未完成时只剩极少的可能，这些可能就成为综合判断的关键条件，使走势的边界条件极端明确与狭小。', fig: mfig('分型可修改＝图形未完成', drawZS([{ p: 10, label: '底?', color: '#6b7280' }, { p: 14, tag: '顶' }, { p: 11, label: '底(可改)', color: '#16a34a' }, { p: 13, label: '顶?', color: '#6b7280' }], [], { w: 40, h: 96 }), '图形未完成时取舍可改；一旦完成，修改不可能') },
        { term: '④ 走势必完美才是理论的核心', text: '本ID理论的关键<span class="hl">不是什么中枢、走势类型，而是"走势必完美"</span>，这才是理论的核心。正因为所有图形必然完成，才能依靠各级别图形的"未完成性质"，给出百分百的纯理论保证——<b>这和概率无关</b>。要真正理解这个关键，不能只看字面意思。', fig: mfig('走势必完美＝理论核心', '<div style="font-size:12px;line-height:1.9;color:#1f2937">核心不是中枢、走势类型<br>而是<b style="color:#2563eb">走势必完美</b><br>→ 任何走势<b>必然完成</b><br>→ 未完成性给出<b>边界条件</b></div>', '百分百纯理论保证，与概率无关') },
      ]},
      { type: 'definition', title: '教科书式走势示范（第70课）', items: [
        { term: '⑤ 结合律与变换不变性', text: '对于走势来说，<span class="kw">结合律就是连接走势之间关系最重要的规则</span>。可以认为，<span class="hl">本ID的理论就是走势在保持结合律下具有变换不变性的一套理论</span>，而且是唯一能保持分解变换不变且保持结合律的理论。不理解结合律，就无法理解走势本身。', fig: mfig('结合律＝变换不变性', '<div style="font-size:12px;line-height:1.9;color:#1f2937">走势在<b>结合律</b>下<br>分解变换<b>不变</b><br>→ 唯一保持此性质的理论<br>→ 可做<b>最有利观察</b>的分解</div>', '结合律是连接走势之间最重要的规则') },
        { term: '⑥ 最有利分解：随当下变换中枢', text: '随着走势的当下发展，本ID不断变换着所看的中枢，<b>根本原因就在于结合律</b>：<span class="hl">因为结合律，可以对走势进行最有利观察的分解</span>，这样才更容易明白走势究竟在干什么。按30分钟操作的就只看5分钟中枢移动无须理睬；按5分钟操作的就等5分钟上涨背驰走人；按1分钟操作的就先走再看回抽。', fig: mfig('最有利分解：随当下变换中枢', drawZS([{ p: 12 }, { p: 14 }, { p: 13, label: '8-17', color: '#2563eb' }, { p: 16, label: '离开', color: '#1f2937' }, { p: 15, label: '三买', color: '#16a34a' }, { p: 18, tag: '顶', label: '17-38' }], [{ lo: 13, hi: 14, x0: 0, x1: 2, label: '5分钟中枢' }], { w: 36, h: 100 }), '不断变换所看的中枢，选择当下最有利的分解') },
        { term: '⑦ 中枢形成后，理论上只有三种走势', text: '一个中枢形成后，在理论上只有三种走势：<b>①</b> 向上出现第三类买点、走出次级别向上走势类型，构成新中枢；<b>②</b> 向下出现第三类卖点、走出次级别向下走势类型，构成新中枢；<b>③</b> 中枢延伸，或出现第三类买卖点后扩展成更大级别的中枢。<span class="hl">没必要预测走势选什么，走势自然选择，观察着就可以。</span>', fig: mfig('中枢后三种演化', '<div style="font-size:12px;line-height:1.9;color:#1f2937">① 向上<b>第三买点</b>→新中枢<br>② 向下<b>第三卖点</b>→新中枢<br>③ <b>中枢延伸</b>或扩展成更大中枢</div>', '无须预测，走势自然选择，只观察') },
        { term: '⑧ 背驰段：关键认清哪段与哪段比', text: '判断背驰，<span class="hl">关键是知道哪一段和哪一段相比</span>。第70课中，明显是 <code>27-32</code> 与 <code>35-38</code> 这两段去比（前后两个中枢同级别）。连相比的对象都没分清，就谈不上背驰段，更不用说精确定位；比的时候可以看更小级别图加对应两段的 MACD 面积。', fig: mfig('背驰段：哪段与哪段比', drawZS([{ p: 12, label: '8-17', color: '#2563eb', above: true }, { p: 15 }, { p: 14 }, { p: 16, label: '27-32', color: '#1f2937' }, { p: 14.5 }, { p: 17, label: '35-38(弱)', color: '#16a34a' }], [{ lo: 14, hi: 15, x0: 0, x1: 2, label: '中枢' }], { w: 36, h: 100 }), '关键认清相比的两段：27-32 与 35-38') },
      ]},
      { type: 'motivation', title: '从"大方向"到"当下分解"', text: '第69课和第70课一个讲"大"、一个讲"小"：<b>月线分段</b>让你看清最实质的大方向（分型、笔、线段在月线同样成立，"走势必完美"是理论核心）；<b>教科书式走势示范</b>则把结合律、最有利分解、三种分类落到一张当下的图上，教你"哪段跟哪段比"。两者合起来，就是缠论最成熟的操作姿态：<span class="hl">用大级别定方向、用小级别分解当下、用结合律选最有利视角</span>——既不预测，也不含糊。' },
      { type: 'pitfalls', title: '常见误区', items: [
        '把月线分型、笔、线段当成<b>另一套规则</b>——道理与1分钟图完全一样，只是显微镜精度不同。',
        '顶分型和底分型<b>中间没有至少一根K线</b>仍强行连成一笔——这违反笔的规范，必须剔除。',
        '把"中枢、走势类型"当成理论核心——错，核心是<b>走势必完美</b>。',
        '分解时<b>随意打破结合律</b>或胡乱变换中枢——分解必须符合规范，不能乱套。',
        '判背驰却<b>连相比的两段都没分清楚</b>——先认清哪段与哪段比，才谈得上背驰段。',
      ]},
      { type: 'exercises', title: '练习', items: [
        { q: '为什么说月线图是"精度超低的显微镜"，却最实质？', a: '月线图只能看一个大概，但<b>这个大概是最实质性的，是一个大方向</b>。分型、笔、线段的道理在月线和1分钟图上完全一样，只是分辨率不同。' },
        { q: '两个顶分型（或两个底分型）连续出现，能否连成一笔？', a: '不能。笔的规范要求<b>顶必须接着底、底必须接着顶</b>，顶底之间至少有一根K线；连续两个同类型分型只能取一个，另一个不算笔中分型。' },
        { q: '一个中枢形成后，走势理论上有哪几种演化？', a: '只有三种：<b>①</b>向上第三类买点→新中枢；<b>②</b>向下第三类卖点→新中枢；<b>③</b>中枢延伸或扩展成更大级别中枢。无须预测，走势自然选择，观察即可。' },
      ]},
    ],
  });
})();
