/* 第53章 中医 · 兵法 · 诗歌 · 操作 */
(function () {

  function optCh53() {
    const mp = (i, p, name, color, pos) => ({ coord: [i, p], name, symbol: 'circle', symbolSize: 9, itemStyle: { color }, label: { show: true, color, fontSize: 10, position: pos, distance: 5, fontWeight: 'bold', formatter: function (p) { return p.name; } } });
    const seg = (x, y, name, color, pos) => ({ coord: [x, y], name, symbol: 'none', label: { show: true, color, fontSize: 11, fontWeight: 'bold', position: pos, formatter: function (p) { return p.name; } } });

    // 下跌趋势：两个中枢，底背驰后回拉最后一个中枢
    const pts = [20, 17, 18, 16.5, 17.5, 15, 16, 14, 15, 13, 14, 12, 13.5, 15, 14.8];

    return {
      tooltip: { trigger: 'axis', axisPointer: { type: 'cross' } },
      grid: { left: 52, right: 40, top: 44, bottom: 44 },
      xAxis: { type: 'value', min: 0, max: 14, interval: 1 },
      yAxis: { type: 'value', scale: true, name: '价格' },
      series: [{
        name: '走势', type: 'line', data: pts.map((p, i) => [i, p]), symbol: 'circle', symbolSize: 4,
        lineStyle: { width: 2.5, color: '#1f2937' }, itemStyle: { color: '#1f2937' },
        markArea: {
          silent: true, itemStyle: { color: 'rgba(37,99,235,0.08)' },
          label: { show: true, position: 'insideTop', formatter: function (p) { return p.name || ''; }, color: '#2563eb', fontSize: 11 },
          data: [
            [{ xAxis: 2, yAxis: 16.5, name: '中枢A [16.5,17.5]' }, { xAxis: 5, yAxis: 17.5 }],
            [{ xAxis: 7, yAxis: 14, name: '中枢B（最后） [14,15]' }, { xAxis: 11, yAxis: 15 }],
          ],
        },
        markLine: {
          silent: true, symbol: 'none',
          label: { show: true, position: 'end', formatter: function (p) { return p.name; }, fontSize: 10 },
          data: [
            { yAxis: 15, name: 'ZG(B)=15', lineStyle: { color: '#2563eb', type: 'dashed', width: 1 } },
            { yAxis: 14, name: 'ZD(B)=14', lineStyle: { color: '#2563eb', type: 'dashed', width: 1 } },
          ],
        },
        markPoint: { data: [
          mp(0, 20, '顶', '#e74c3c', 'top'),
          mp(11, 12, '底背驰·一买', '#16a34a', 'bottom'),
          mp(13, 15, '回拉进中枢B', '#9333ea', 'top'),
          seg(1.5, 18.2, '下跌趋势', '#e74c3c', 'top'),
          seg(12.2, 13.2, '背驰后必回拉中枢', '#16a34a', 'bottom'),
        ] },
      }],
    };
  }

  const figBuhuan = `
<div class="fig" style="min-width:340px"><div class="lbl">“不患”基础与四类类比（第97、98课）</div>
<div style="font-size:12.5px;line-height:1.6;color:#1f2937">
<div style="text-align:center;background:#f0fdf4;border:1px solid #bbf7d0;border-radius:6px;padding:6px 10px"><b style="color:#166534">不患（理论完全描述的基础）</b><br><span style="font-size:11px;color:#6b7280">走势必完美 · 买卖点必现 · 背驰后必回拉中枢</span></div>
<div style="text-align:center;color:#16a34a;font-size:14px;line-height:1.5">↑ 不同中的同</div>
<div style="text-align:center;background:#fef2f2;border:1px solid #fecaca;border-radius:6px;padding:6px 10px"><b style="color:#991b1b">患（当下可变）</b><br><span style="font-size:11px;color:#6b7280">望闻问切 → 开药方（各人不同、无止境）</span></div>
</div>
<div style="display:flex;gap:8px;margin-top:10px;flex-wrap:wrap;font-size:11px;line-height:1.7;color:#1f2937">
<div style="flex:1;min-width:150px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:6px;padding:5px 8px"><b style="color:#2563eb">中医</b><br>理论 → 望闻问切 → 开药方</div>
<div style="flex:1;min-width:150px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:6px;padding:5px 8px"><b style="color:#2563eb">兵法</b><br>布局 → 争夺山头 → 用兵</div>
<div style="flex:1;min-width:150px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:6px;padding:5px 8px"><b style="color:#2563eb">诗歌</b><br>格律 → 依律而作 → 拗体</div>
<div style="flex:1;min-width:150px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:6px;padding:5px 8px"><b style="color:#2563eb">操作</b><br>完全分类 → 看机会显发 → 买卖点</div>
</div>
<div class="cap">操作最像<b>中医、兵法、诗歌</b>：先吃透理论的“不患”基础，再在当下“患”中望闻问切、开药方（买卖点）。<br>理论的输出是最基础的，但<span class="hl">知道输出到运用之间，最终归结于人的修炼</span>。</div></div>`;

  __chapters.push({
    id: 'ch53', vol: '卷十 · 心法与杂史', title: '第53章 中医 · 兵法 · 诗歌 · 操作', source: '原文第97、98课',
    figures: [
      { kind: 'echarts', title: '背驰后必回拉中枢（第98课）', note: '第98课：一个<b>下跌趋势</b>（中枢 A、B）走到最后，<b>底背驰</b>（一买，绿色底）出现。<span class="hl">无论盘整背驰还是趋势背驰，理论只能保证其回拉原来的中枢</span>——图中回抽进最后一个中枢 B（[14,15]，紫色点），这和有没有利好毫无关系。回拉之后如何？交给<b>完全分类</b>去应对。', option: optCh53 },
      { kind: 'html', title: '“不患”基础与四类类比（第97课）', note: '第97课反对“上帝式指标”（一劳永逸的预测/万能拐杖），指出操作最像<b>中医、兵法、诗歌</b>：先吃透理论的<b>“不患”基础</b>（走势必完美、买卖点必现），再在当下<b>“患”</b>中<b>望闻问切</b>、开出各人不同的“药方”（买卖点）。理论的输出是最基础的，但<b>知道输出与运用之间，最终归结于人的修炼</b>。', html: figBuhuan },
    ],
    sections: [
      { type: 'definition', title: '中医、兵法、诗歌对操作的启发（第97课）', items: [
        { term: '① 反对“上帝式指标”', text: '市场中最大的贪婪，就是希望找到一种<b>预测性的、一劳永逸的上帝式指标</b>，先验地决定一切。最下劣的就是找一根<b>万能拐杖</b>，最好自动给出所有买卖、什么都不干地财源滚滚。<span class="hl">贪字和贫字就差那一点，如此贪婪不被市场屠杀才是笑话。</span>', fig: mfig('万能拐杖 = 贪婪', '<div style="font-size:12px;line-height:2;color:#1f2937">万能拐杖 / 一劳永逸 / 预测<br>= 上帝式思维 = <b style="color:#991b1b">贪婪</b><br><span style="color:#6b7280">贪字和贫字就差一点</span></div>', '想找万能拐杖，本质是上帝式贪婪') },
        { term: '② 中医：望闻问切 → 开药方', text: '中医先学理论（分类原则），然后<b>望闻问切</b>（＝看市场机会的当下显发），最后<b>开药方</b>（＝操作）。<span class="kw">会看病基本等于中医的 1/10，而用药、开药方的难度是后面的 9/10</span>——没有最后开药方，前面全白搭；操作同样如此。', fig: mfig('看病 1/10 · 开药方 9/10', '<div style="font-size:12px;line-height:2;color:#1f2937">理论 → <b>望闻问切</b> → <b style="color:#e74c3c">开药方</b><br>看病 ≈ 1/10<br>开药方 ≈ <b>9/10</b></div>', '理论输出是基础，开药方（操作）才是难点') },
        { term: '③ 患与不患：不同中的同', text: '机会必然按理论要求输出，你不需预测点位、时间，只需在病人来的时候<b>望闻问切</b>。所有不同之中，有一个共同的<b>“不患”基础</b>：市场运行的“不患”基础被理论完全描述。<span class="hl">无论怎么折腾，都出不了这基础——这是不同中的同，患中的不患。</span>', fig: mfig('患与不患', '<div style="font-size:12px;line-height:2;color:#1f2937"><b style="color:#166534">不患</b>（基础）：完全分类<br><b style="color:#991b1b">患</b>（当下）：开药方各不同<br>→ 不同中的同</div>', '不患的基础之上，是充分显法的过程') },
        { term: '④ 格律诗 → 拗体（买卖点 → 偏移）', text: '写格律诗开始必须<b>严格按格律</b>（否则是水平问题，别用写拗体自我安慰）；当你已<b>自由于格律</b>时，才可依内容自设声律、构成拗体。操作同理：一般必须<b>遵守买卖点原则</b>，但得心应手后可<b>在买卖点偏移一点的地方</b>买卖（为买更多数量或达到更大目的）。', fig: mfig('格律 → 拗体', drawZS([{ p: 10, tag: '底' }, { p: 13, label: '买卖点（格律）', color: '#16a34a', above: true }, { p: 11, tag: '底' }, { p: 14, label: '偏移一点（拗体）', color: '#9333ea', above: true }, { p: 12, tag: '底' }], [], { w: 38, h: 100 }), '先严格按买卖点，得心应手后再偏移一点') },
      ]},
      { type: 'definition', title: '背驰后必回拉中枢与完全分类（第98课）', items: [
        { term: '⑤ 背驰后必回拉中枢', text: '正确的思维方式：<b>一个背驰（无论盘整背驰还是真背驰）后，理论只能保证其回拉原来的中枢</b>，这和有没有消息、有没有利好<b>毫无关系</b>。回拉之后如何，涉及预测——正确做法是<b>把回拉后的情况完全分类</b>，根据每种分类的后果决定对策。', fig: mfig('背驰 → 必回拉中枢', drawZS([{ p: 18, tag: '顶' }, { p: 14 }, { p: 15 }, { p: 12, label: '背驰', color: '#16a34a' }, { p: 13, label: '回拉中枢', color: '#9333ea', above: true }, { p: 15, tag: '顶' }], [{ lo: 14, hi: 15, x0: 1, x1: 3, label: '最后中枢' }], { zgzd: true, w: 36, h: 100 }), '背驰只保证回拉原中枢，之后靠完全分类') },
        { term: '⑥ 完全分类 + 对策了然', text: '操作时，你后续所有<b>可能面对的情况与对策都必须了然</b>，否则就没资格操作。<span class="hl">对一个真正的操作者，没有任何情况是意外的</span>——所有情况都被完全分类，所有对策都事先有了，只是等着市场自己选择、去触及我们事先给定的开关。', fig: mfig('完全分类 + 对策了然', '<div style="font-size:12px;line-height:2;color:#1f2937">回拉后 → <b>完全分类</b><br>每种分类 → 对应<b>对策</b><br>→ 没有意外，只等开关</div>', '所有情况与对策都了然，才配操作') },
        { term: '⑦ 股票最简单：完全分类唯一', text: '比起中医、打仗，<b>股票是最简单的</b>：因为有了本ID的理论，股票的后续走势都可以<b>严格地、唯一地给出统一的完全分类</b>；而中医、打仗要面对的可能复杂得多，完全分类可能只能是一种假设。所以不要用西医“流水线机械化”的思维来套市场。', fig: mfig('股票 ＜ 中医 ＜ 打仗', '<div style="font-size:12px;line-height:2;color:#1f2937">股票 ＜ 中医 ＜ 打仗（复杂度）<br>因为：<b style="color:#166534">完全分类唯一</b><br>→ 严格唯一给出</div>', '股票后续走势可严格唯一完全分类，故最简单') },
      ]},
      { type: 'motivation', title: '从“预测”到“望闻问切”', text: '第97、98课把操作比作中医、兵法、诗歌，核心就一句话：<b>别去找一劳永逸的预测，去吃透理论的“不患”基础，再在当下“患”中修炼“望闻问切→开药方”的功夫</b>。背驰后必回拉中枢，是理论能给你的少数绝对结论之一；回拉之后怎么办，不靠猜，靠<b>完全分类</b>。这套思维方式一旦转过弯，看走势就不再是“赌明天涨跌”，而是“等它触及我事先设好的开关”。' },
      { type: 'pitfalls', title: '常见误区', items: [
        '想找<b>万能拐杖</b>（自动给出所有买卖的指标）——这是上帝式贪婪，<b>贪字和贫字就差一点</b>。',
        '以为背驰后<b>一定大涨/一定创新高</b>——错：理论只能保证<b>回拉原来的中枢</b>，之后靠完全分类。',
        '把<b>西医流水线</b>思维套市场（同病同药）——错：用药如用兵，<b>因人、因时、因地</b>而异。',
        '一开始就想写<b>拗体</b>（不按买卖点乱来）——错：先严格按格律，<b>自由于格律</b>后才能自设声律。',
        '只看理论输出、<b>不修炼“开药方”的功夫</b>——错：知道输出与运用之间，最终归结于<b>人的修炼</b>。',
      ]},
      { type: 'exercises', title: '练习', items: [
        { q: '第98课说“背驰只能保证什么”？', a: '只能保证<b>回拉原来的中枢</b>（无论盘整背驰还是趋势背驰），这和有没有消息、利好<b>毫无关系</b>；回拉之后如何，就进入<b>完全分类</b>去应对（第98课）。' },
        { q: '为什么把操作比作中医的“开药方”而不是“看病”？', a: '因为<b>会看病基本等于中医的 1/10，用药开药方的难度是后面的 9/10</b>；操作同理，理论输出（分类、机会）是基础，真正的难点在当下<b>因人因时因地开药方</b>（买卖点），需要一生去修炼（第97课）。' },
        { q: '第97课的“患”与“不患”分别指什么？', a: '<b>不患</b>＝不同中的同：市场运行的“不患”基础被理论完全描述（走势必完美、买卖点必现、背驰必回拉中枢），怎么折腾都出不了这基础；<b>患</b>＝当下可变：望闻问切、开药方（各人不同、无止境），是这基础上充分显法的过程（第97课）。' },
      ]},
    ],
  });
})();
