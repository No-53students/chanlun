/* 第1章 理念与投机世界观 */
(function () {

  // 小图构件：竖排盒子 + 箭头
  function box(t, c, bg, bc) {
    return `<div style="background:${bg};border:1.5px solid ${bc};border-radius:8px;padding:7px 12px;font-size:12px;font-weight:700;color:${c};text-align:center;line-height:1.55">${t}</div>`;
  }
  function down() {
    return `<div style="text-align:center;color:#6b7280;font-size:16px;line-height:1">↓</div>`;
  }
  const RED = { c: '#b91c1c', bg: '#fef2f2', bc: '#fca5a5' };
  const BLUE = { c: '#1d4ed8', bg: '#eff6ff', bc: '#93c5fd' };
  const GREEN = { c: '#15803d', bg: '#f0fdf4', bc: '#86efac' };
  const GRAY = { c: '#374151', bg: '#f9fafb', bc: '#e5e7eb' };
  const PUR = { c: '#7e22ce', bg: '#faf5ff', bc: '#d8b4fe' };

  // ---- 主图1：破心魔 → 看和干 主线流程 ----
  const figMain = `
<div class="fig" style="min-width:300px"><div class="lbl">主线：破心魔 → 看和干</div>
<div style="display:flex;flex-direction:column;gap:9px;align-items:center;padding:4px 0">
  <div style="display:flex;gap:10px;flex-wrap:wrap;justify-content:center">
    ${box('心魔①<br>庄家迷信', RED.c, RED.bg, RED.bc)}
    ${box('心魔②<br>喜好陷阱', RED.c, RED.bg, RED.bc)}
    ${box('心魔③<br>分析妄想', RED.c, RED.bg, RED.bc)}
  </div>
  ${down()}
  ${box('逐一破除 · 唯一标准 = 输赢<br>（不是喜好，不是分析）', BLUE.c, BLUE.bg, BLUE.bc)}
  ${down()}
  ${box('看 和 干<br>（当下介入 · 相信眼睛）', GREEN.c, GREEN.bg, GREEN.bc)}
</div>
<div class="cap">第 1-5 课的世界观主线：先破掉三重心魔（庄家无所不能的迷信、个人喜好的陷阱、纯分析的妄想），<br>确立「<b>输赢是唯一标准</b>」，最后落到「<b>看和干</b>」——用眼睛、用当下的介入。</div></div>`;

  // ---- 主图2：喜好的死亡陷阱 vs 利用陷阱 ----
  const figTrap = `
<div class="fig" style="min-width:300px"><div class="lbl">你的喜好 = 死亡陷阱；学会利用陷阱</div>
<div style="display:flex;gap:26px;align-items:flex-start;flex-wrap:wrap">
  <div style="display:flex;flex-direction:column;gap:6px;min-width:150px">
    <div style="font-size:12px;font-weight:700;color:#b91c1c">【被陷阱害】</div>
    ${box('因为"好"而买入<br>（喜好）', RED.c, RED.bg, RED.bc)}
    ${down()}
    ${box('比翼之情 · 天长地久', PUR.c, PUR.bg, PUR.bc)}
    ${down()}
    ${box('死亡陷阱', RED.c, RED.bg, RED.bc)}
  </div>
  <div style="display:flex;flex-direction:column;gap:6px;min-width:150px">
    <div style="font-size:12px;font-weight:700;color:#15803d">【用陷阱生财】</div>
    ${box('要买时 → 空头陷阱<br>= 最佳机会', GREEN.c, GREEN.bg, GREEN.bc)}
    ${down()}
    ${box('要卖时 → 多头陷阱<br>= 你的天堂', GREEN.c, GREEN.bg, GREEN.bc)}
  </div>
</div>
<div class="cap">市场需要的是<b>露水之缘</b>而不是<b>比翼之情</b>。<br>看破陷阱只是第一步，进一步要<b>利用陷阱</b>来赢钱。</div></div>`;

  __chapters.push({
    id: 'ch01', vol: '卷一 · 理念与入门', title: '第1章 理念与投机世界观', source: '原文第1、2、3、4、5课',
    figures: [
      { kind: 'html', title: '破心魔 → 看和干（世界观主线）', note: '前五课没有一张 K 线图，只讲<b>心态</b>。市场表面是市场，背面是<b>战场</b>：破除「庄家无所不能」的迷信、杜绝「个人喜好」、抛弃「纯分析」的妄想，确立「<b>输赢是唯一标准</b>」，最终归结为一句话——<b>市场无须分析，只要看和干</b>。', html: figMain },
      { kind: 'html', title: '喜好的死亡陷阱 vs 利用陷阱', note: '第 3 课：<span class="hl">在市场中要生存，第一条就是杜绝一切喜好。</span>任何让你买入的理由，都不是因为股票好，而是你企图通过买入赢钱。看破陷阱后要学会<b>利用陷阱</b>：你要买时，<b>空头陷阱</b>是最佳机会；你要卖时，<b>多头陷阱</b>是天堂。', html: figTrap },
    ],
    sections: [
      { type: 'definition', title: '投机世界观的五个支柱', items: [
        { term: '① 唯一标准是输赢（第1课）', text: '市场从来都是<b>明白人挣糊涂人的钱</b>。在资本市场中，<span class="hl">没有慈善家，只有赢家和输家</span>。而不会赢钱的经济人，只是废人！无论你在其他方面如何成功，到了市场里，<b>赢输就是唯一标准</b>，除此之外，都是废话。', formula: '资本市场 = 赢家 + 输家（没有慈善家）', fig: mfig('唯一标准：输赢', box('在其他行业的成功', GRAY.c, GRAY.bg, GRAY.bc) + down() + box('在市场里 = 废话', RED.c, RED.bg, RED.bc) + down() + box('会赢钱 = 唯一标准', GREEN.c, GREEN.bg, GREEN.bc), '赢钱之外，皆为废话') },
        { term: '② 没有庄家，只有赢家和输家（第2课）', text: '所谓庄家被神话成<b>无所不能</b>——既能超越技术指标、更能超越基本面。但缠师说：<span class="hl">所谓的庄家，前赴后继，尸骨早堆成了山。</span>市场没有什么庄家，有的只是<b>赢家和输家</b>，以及极少数高明猎手。市场是一个围猎的游戏，关键是你是否有屠龙刀。', fig: mfig('破除庄家迷信', box('庄家 = 无所不能<br>（常识的谬误）', RED.c, RED.bg, RED.bc) + down() + box('尸骨早堆成了山', GRAY.c, GRAY.bg, GRAY.bc) + down() + box('只有赢家 / 输家 / 猎手', GREEN.c, GREEN.bg, GREEN.bc), '市场 = 围猎游戏') },
        { term: '③ 你的喜好，就是你的死亡陷阱（第3课）', text: '<span class="hl">在市场中要生存，第一条就是杜绝一切喜好。</span>市场的诱惑，永远通过你的喜好而陷你于死亡。市场需要的是<b>露水之缘</b>而不是<b>比翼之情</b>。看破陷阱是第一步，进一步要<b>利用陷阱</b>：你要买时，<b>空头陷阱</b>是最佳机会；你要卖时，<b>多头陷阱</b>是天堂。', fig: mfig('喜好 → 死亡陷阱', box('因为"好"而买入', RED.c, RED.bg, RED.bc) + down() + box('喜好 = 诱饵', PUR.c, PUR.bg, PUR.bc) + down() + box('陷你于死亡', RED.c, RED.bg, RED.bc), '能赢钱的股票才是好股票') },
        { term: '④ 理性是"干出来的、当下的"（第4课）', text: '所谓理性模式后面，都对应一套价值系统，企图以此战胜市场，是一切资本谎言的基础。真正的理性<b>从来都是当下的、实践的</b>：<span class="hl">理性是干出来的。</span>相对那些光说不干的所谓理性，今早 15 元多买 N 中工就是理性。', fig: mfig('理性 = 干出来', box('光说不干的"理性"<br>（文字游戏）', GRAY.c, GRAY.bg, GRAY.bc) + down() + box('当下的实践<br>= 真理性', GREEN.c, GREEN.bg, GREEN.bc), '今天，你干了吗？') },
        { term: '⑤ 市场无须分析，只要看和干（第5课）', text: '股评、专家不过是市场上的<b>寄生虫</b>，真正的猎手<b>只观察、操作</b>。<span class="hl">猎物不是分析而得的，而是你看到的。</span>相信你的眼睛，不要相信你的脑筋，更不要让脑筋动了你的眼睛。这里无所谓分析，<b>只是看和干</b>。', fig: mfig('分析 vs 看和干', box('分析（脑筋 · 成见）<br>= 掉进陷阱', RED.c, RED.bg, RED.bc) + down() + box('看和干（眼睛 · 直觉）', GREEN.c, GREEN.bg, GREEN.bc), '用嘴打不了豺狼') },
      ]},
      { type: 'motivation', title: '为什么先讲"世界观"而不是"技术"', text: '缠论的技术体系（分型、笔、线段、中枢、买卖点）是后几十课才展开的。前五课先打<b>地基</b>：把「庄家无所不能」的迷信、「个人喜好」的陷阱、「纯分析」的妄想三重心魔逐一破除，确立「<b>输赢是唯一标准</b>」，最后落到「<b>看和干</b>」。没有这个心态地基，后面再精密的买卖点也会被<b>贪婪与恐惧</b>毁掉。战胜市场，本质是战胜自己的<b>贪婪、恐惧、愚蠢</b>。' },
      { type: 'pitfalls', title: '常见误区', items: [
        '把「分析」当目的，研究基本面、技术面成瘾，忘了市场唯一标准是<b>输赢</b>。',
        '迷信「庄家无所不能」，把亏损归咎于庄家操盘，而<b>不找自己的原因</b>。',
        '用「这只股票好」的<b>喜好</b>代替「能搞」的判断，为持股上涨编故事。',
        '光说不干，把「理性」当<b>文字游戏</b>，逃避当下的介入与退出。',
        '被脑筋动了眼睛：满脑成见，看到的只是把自己引向陷阱的<b>诱饵</b>。',
      ]},
      { type: 'exercises', title: '练习', items: [
        { q: '为什么说「不会赢钱的经济人，只是废人」？', a: '市场从来是<b>明白人挣糊涂人的钱</b>；资本市场没有慈善家，只有<b>赢家和输家</b>。无论你在其他方面多成功，到了市场里<b>输赢是唯一标准</b>，除此之外都是废话。' },
        { q: '「你的喜好就是你的死亡陷阱」怎么理解？如何转化为「利用陷阱」？', a: '市场的诱惑总通过你的<b>喜好</b>把你引入死亡，所以要<b>杜绝一切喜好</b>（露水之缘而非比翼之情）。看破之后要<b>利用陷阱</b>：你要买时，<b>空头陷阱</b>是最佳机会；你要卖时，<b>多头陷阱</b>是天堂。' },
        { q: '「市场无须分析，只要看和干」如何落地？', a: '猎物不是<b>分析</b>出来的而是<b>看到</b>的：相信眼睛、不要相信脑筋，更不要让脑筋动了眼睛。真正的猎手只<b>观察、操作</b>，用嘴打不了豺狼——无所谓分析，只是看和干。' },
      ]},
    ],
  });
})();
