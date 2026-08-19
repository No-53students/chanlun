/* 第2章 三个独立系统与资金管理 */
(function () {

  function box(t, c, bg, bc) {
    return `<div style="background:${bg};border:1.5px solid ${bc};border-radius:8px;padding:7px 12px;font-size:12px;font-weight:700;color:${c};text-align:center;line-height:1.55">${t}</div>`;
  }
  function down() {
    return `<div style="text-align:center;color:#6b7280;font-size:16px;line-height:1">↓</div>`;
  }
  function rarr() {
    return `<div style="align-self:center;color:#6b7280;font-size:18px;font-weight:700">×</div>`;
  }
  const RED = { c: '#b91c1c', bg: '#fef2f2', bc: '#fca5a5' };
  const BLUE = { c: '#1d4ed8', bg: '#eff6ff', bc: '#93c5fd' };
  const GREEN = { c: '#15803d', bg: '#f0fdf4', bc: '#86efac' };
  const GRAY = { c: '#374151', bg: '#f9fafb', bc: '#e5e7eb' };
  const PUR = { c: '#7e22ce', bg: '#faf5ff', bc: '#d8b4fe' };

  // ---- 主图1：三系统乘法 → 概率极低 ----
  const figMul = `
<div class="fig" style="min-width:330px"><div class="lbl">三个独立系统做乘法：同时出错概率极低</div>
<div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap;justify-content:center;padding:6px 0">
  ${box('技术面<br>早泄率 30%', BLUE.c, BLUE.bg, BLUE.bc)}
  ${rarr()}
  ${box('比价关系<br>早泄率 40%', PUR.c, PUR.bg, PUR.bc)}
  ${rarr()}
  ${box('基本面<br>早泄率 30%', GREEN.c, GREEN.bg, GREEN.bc)}
  <div style="align-self:center;color:#1f2937;font-size:18px;font-weight:700">=</div>
  ${box('联合早泄率<br>3.6%', RED.c, RED.bg, RED.bc)}
</div>
<div class="cap">30% × 40% × 30% = <b>3.6%</b>：按此程序组，干 100 次只出现不到 4 次「早泄」。<br>前提是三个程序必须<b>互相独立</b>。</div></div>`;

  // ---- 主图2：能搞/不能搞 分类 + 资金管理 ----
  const figClass = `
<div class="fig" style="min-width:330px"><div class="lbl">只搞能搞的 · 早泄立即退出</div>
<div style="display:flex;gap:26px;align-items:flex-start;flex-wrap:wrap">
  <div style="display:flex;flex-direction:column;gap:6px;min-width:150px">
    <div style="font-size:12px;font-weight:700;color:#15803d">【分类：只搞能搞的】</div>
    ${box('能搞的 → 介入', GREEN.c, GREEN.bg, GREEN.bc)}
    ${box('不能搞的 → 无论发生什么都别搞', RED.c, RED.bg, RED.bc)}
  </div>
  <div style="display:flex;flex-direction:column;gap:6px;min-width:150px">
    <div style="font-size:12px;font-weight:700;color:#1d4ed8">【资金管理：风险可控】</div>
    ${box('出现"早泄" → 马上退出', RED.c, RED.bg, RED.bc)}
    ${down()}
    ${box('即使又强力高潮<br>也必须先退出', GRAY.c, GRAY.bg, GRAY.bc)}
    ${down()}
    ${box('严格分批介入 / 退出程序', BLUE.c, BLUE.bg, BLUE.bc)}
  </div>
</div>
<div class="cap">市场只有两种：<b>能搞的</b>和<b>不能搞的</b>。不能搞的无论发生什么都别搞；一旦从能搞变成不能搞（早泄），<b>纪律性地退出</b>。</div></div>`;

  __chapters.push({
    id: 'ch02', vol: '卷一 · 理念与入门', title: '第2章 三个独立系统与资金管理', source: '原文第9、31课（补第8、10课背景）',
    figures: [
      { kind: 'html', title: '三个独立系统做乘法：同时出错概率极低', note: '第 9 课的核心数学原则：任何<b>孤立</b>程序都有较高的「早泄」率，但三个<b>互相独立</b>的程序按<b>乘法原则</b>组合，联合早泄率会<b>断崖式下降</b>。30%×40%×30%＝<b>3.6%</b>，干 100 次只出现不到 4 次早泄——即使每个程序都平庸。', html: figMul },
      { kind: 'html', title: '能搞/不能搞分类与资金管理', note: '第 8、9 课：市场只有两种——<b>能搞的</b>和<b>不能搞的</b>。要严格遵守「只搞能搞的」；而甄别「早泄」的首要防线是<b>严格的资金管理</b>：一旦出现早泄现象，<span class="hl">必须马上退出</span>，即使下面突然又强力高潮了，也必须这样干。', html: figClass },
    ],
    sections: [
      { type: 'definition', title: '甄别"早泄"的数学原则', items: [
        { term: '① 任何程序都必然面对"早泄"（第9课）', text: '设计程序把所有投资对象分类、只搞能搞的，是投资第一原则。但<b>没有任何一个程序能让所选「能搞的」百分百都被搞得高潮迭起</b>——任何操作程序都必然面对「早泄」问题。而「早泄」必须<b>真刀真枪实干</b>才能发现，且是一锤子买卖，这次行不保证下次一定行。', fig: mfig('程序必然面对早泄', box('介入程序（分类）', BLUE.c, BLUE.bg, BLUE.bc) + down() + box('必然有"早泄"', RED.c, RED.bg, RED.bc) + down() + box('一锤子买卖', GRAY.c, GRAY.bg, GRAY.bc), '确定能搞的突然变不能搞 → 套牢') },
        { term: '② 资金管理是首要防线（第9课）', text: '甄别「早泄」首要的是<b>严格的资金管理</b>：<span class="hl">一旦出现「早泄」现象，必须马上退出</span>，即使下面突然又不「早泄」了、又强力高潮了，也必须这样干。「早泄」特敏感，一个偶然因素就可能导致；重来还要等一个长的不应期。有一套严格的分批介入和退出程序，一切就简单了。', fig: mfig('早泄 → 立即退出', box('出现早泄', RED.c, RED.bg, RED.bc) + down() + box('马上退出（纪律）', BLUE.c, BLUE.bg, BLUE.bc) + down() + box('重新等能搞的机会', GREEN.c, GREEN.bg, GREEN.bc), '退出和盈亏无关，只和"能搞与否"有关') },
        { term: '③ 乘法原则：三个独立系统（第9课）', text: '任何一个<b>孤立</b>程序的早泄率都不会太低（低于 10% 是超一流程序，基本没有）。但数学中的<b>乘法原则</b>可以完全解决：三个<b>互相独立</b>的程序早泄率分别为 30%、40%、30%，联合早泄率 = <b>3.6%</b>——干 100 次只出现不到 4 次早泄，绝对惊人。', formula: '联合早泄率 = 30% × 40% × 30% = 3.6%　（干100次 < 4次早泄）', fig: mfig('三系统乘法', '<div style="display:flex;align-items:center;gap:6px;font-size:11px;font-weight:700;color:#1f2937">' + box('30%', BLUE.c, BLUE.bg, BLUE.bc) + '<span>×</span>' + box('40%', PUR.c, PUR.bg, PUR.bc) + '<span>×</span>' + box('30%', GREEN.c, GREEN.bg, GREEN.bc) + '<span>=</span>' + box('3.6%', RED.c, RED.bg, RED.bc) + '</div>', '同时出错的概率相乘') },
        { term: '④ 三个独立系统是什么（第9课）', text: '<b>① 技术指标</b>：单纯涉及价量输入，选任意一个技术指标构成买卖程序即可（水平高的用带均线和成交量的 K 线图）。<b>② 比价关系</b>：任何股票都不是独立的，在整个市场中处在一定的比价关系里，比价关系的变动构成买卖系统，与市场资金流向相关。<b>③ 基本面</b>：不是单纯的公司盈利，而是对市场参与者、人性的了解——如国航李总当兵出身不会让股票长期跌破发行价、认沽权证基本不会让兑现。', fig: mfig('三个独立系统', '<div style="display:flex;flex-direction:column;gap:4px">' + box('① 技术面（价量）', BLUE.c, BLUE.bg, BLUE.bc) + box('② 比价关系（资金流向）', PUR.c, PUR.bg, PUR.bc) + box('③ 基本面（参与者/人性）', GREEN.c, GREEN.bg, GREEN.bc) + '</div>', '三个互相独立的维度') },
        { term: '⑤ 独立性是前提（第9课）', text: '三个程序组之间<b>必须互相独立</b>。人气指标和资金面是一回事、各种技术指标互相相关，把<b>非独立</b>的程序放一起<b>一点意义都没有</b>。就像「鼻子大不会早泄、耳朵大不会早泄、胡子多不会早泄」三个相关判断，合起来也没用。', fig: mfig('独立 vs 非独立', '<div style="display:flex;gap:14px;font-size:11px">' + '<div style="text-align:center">' + box('独立<br>（技术/比价/基本面）', GREEN.c, GREEN.bg, GREEN.bc) + '<div style="color:#15803d;font-weight:700">→ 乘法有效</div></div>' + '<div style="text-align:center">' + box('非独立<br>（各技术指标互相关）', RED.c, RED.bg, RED.bc) + '<div style="color:#b91c1c;font-weight:700">→ 毫无意义</div></div>' + '</div>', '独立性是乘法原则的前提') },
        { term: '⑥ 只搞能搞的（第8、10课）', text: '市场只有两种：<b>能搞的</b>和<b>不能搞的</b>。必须坚持「不能搞的就无论发生什么情况都不能搞」，除非达到能搞标准自动升级。能搞是<b>相对</b>的、不能搞是<b>绝对</b>的；要「<b>只搞能搞的</b>」而不是「只搞喜欢的」——能搞需要「察」而得之，不是靠喜好厌恶。', fig: mfig('能搞 / 不能搞', box('能搞（相对）→ 介入', GREEN.c, GREEN.bg, GREEN.bc) + down() + box('不能搞（绝对）→ 一律不碰', RED.c, RED.bg, RED.bc), '只搞能搞的，不搞喜欢的') },
      ]},
      { type: 'motivation', title: '为什么是"三个独立系统"而不是一个绝招', text: '人性总想找到一个「一买就涨」的绝招，但第 9 课用数学点破：<b>任何孤立程序都无法规避「早泄」</b>。真正的出路是<b>概率</b>——用三个<b>互相独立</b>的系统做乘法，把同时出错的概率压到极低，再配<b>资金管理</b>把风险变得可控。这也是后面「技术面 + 比价 + 基本面」三足鼎立的由来，技术分析只是三个独立系统之一。' },
      { type: 'pitfalls', title: '常见误区', items: [
        '企图找一个「早泄率 0%」的<b>绝招</b>——任何孤立程序都必然面对早泄，<b>低于 10% 已属超一流</b>。',
        '把三个<b>非独立</b>系统（如两个技术指标 + 资金面）当三个独立系统，乘法原则<b>完全失效</b>。',
        '出现早泄后<b>心存侥幸不退出</b>，抱着「下次还会高潮」的幻想等反弹。',
        '把基本面理解成「公司盈利」，忽略了对<b>市场参与者与人性</b>的洞察。',
        '「喜欢」某股票就长期持有，违背了「<b>只搞能搞的</b>」而不是「只搞喜欢的」。',
      ]},
      { type: 'exercises', title: '练习', items: [
        { q: '三个独立程序早泄率分别为 30%、40%、30%，联合早泄率是多少？干 100 次约几次早泄？', a: '联合早泄率 = 30% × 40% × 30% = <b>3.6%</b>。干 100 次只出现不到 <b>4 次</b>早泄。' },
        { q: '三个独立系统分别是什么？为什么「独立性」是前提？', a: '<b>技术面</b>（价量）、<b>比价关系</b>（资金流向）、<b>基本面</b>（参与者/人性）。若三个程序<b>非独立</b>（如各技术指标互相相关），放一起相乘毫无意义，因为它们的错误会<b>同时</b>发生。' },
        { q: '为什么出现「早泄」后，即使又强力高潮了也必须先退出？', a: '退出是<b>资金管理纪律</b>，只和「能搞与否」有关、和盈亏无关。早泄后必须退出的理由，不是因为这次不赚，而是因为<b>介入程序出现破缺</b>，不确定性的风险已不可控；侥幸等待会让大风险兑现。' },
      ]},
      { type: 'definition', title: '资金管理的最稳固基础（第31课）', items: [
        { term: '① 资金必须长期无压力（第31课）', text: '对小资金来说资金管理问题不大，但随着赢利积累、资金越来越大，<b>资金管理就成了最重要的事</b>。资金必须<b>长期无压力</b>：借钱投资、赢利后继续加码，结果往往一场游戏一场梦。缠师举的 96 年例子：不到 10 万靠高比例透支在牛市中做到 2000 多万，最后三周股价急跌、被强制平仓，<span class="hl">打回原点只剩不到 20 万</span>。好的资金管理才能保证长期稳定，对大资金来说，最后比拼的就是资金管理水平。', fig: mfig('资金必须长期无压力', box('借钱 / 高杠杆投资', RED.c, RED.bg, RED.bc) + down() + box('一波急跌强制平仓', GRAY.c, GRAY.bg, GRAY.bc) + down() + box('一场游戏一场梦', RED.c, RED.bg, RED.bc), '无压力资金是投资第一要点') },
        { term: '② 自己的资金不能交给别人管理', text: '<b>自己的盘子一定要自己负责，不能把命运交给别人。</b>92 年的例子：几千万资金托给朋友，朋友自作主张透资抄底，等主人回来时大盘已从 1400 多点跌破 400 点，一切灰飞烟灭。<span class="hl">把命运交给别人，就是这样。</span>不能把自己放置在一个危险的境地——"背水一战、置之死地而后生"都不是资本市场该有的态度。', fig: mfig('盘子自己负责', box('把资金交给别人', RED.c, RED.bg, RED.bc) + down() + box('自作主张透资抄底', GRAY.c, GRAY.bg, GRAY.bc) + down() + box('灰飞烟灭', RED.c, RED.bg, RED.bc), '自己的命运自己负责') },
        { term: '③ 最大原则：成本归零 → 挣股票（核心）', text: '最简单又最有效的管理：<b>成本为 0 以前，要把成本变为 0；成本为 0 以后，就要挣股票</b>，直到股票见到历史性大顶（至少月线以上卖点）。上涨途中利用小级别不断弄短差，并在<b>1 倍升幅附近找大级别卖点出掉部分</b>，把成本降为 0、收回全部本金；之后每笔短差"上面抛了全部回补"，<span class="hl">股票越来越多而成本永远为 0</span>——这才是最可怕的吸血、最稳固的基础。', formula: '成本为0前：降成本→变0　成本为0后：挣股票→等月线以上卖点', fig: mfig('成本归零 → 挣股票', box('① 途中短差 + 1倍处出部分', BLUE.c, BLUE.bg, BLUE.bc) + down() + box('成本 = 0（收回本金）', GREEN.c, GREEN.bg, GREEN.bc) + down() + box('② 每笔抛了全回补 → 股越来越多', PUR.c, PUR.bg, PUR.bc) + down() + box('成本仍为 0 → 等历史大顶砸出', RED.c, RED.bg, RED.bc), '庄家如何洗盘，都让你股越来越多、成本恒 0') },
        { term: '④ 越跌越买，绝不向上加码', text: '<b>买股票宁愿不断跌不断买，也绝对不往上加码。</b>投入前必须在基本面、技术面都研究好，介入就要坚决、<b>一次性买入</b>；连一次性买入的信心都没有，证明根本没准备好，一股都别买。每只股票要留部分机动资金（如 1/10）弄短差降成本，但<span class="hl">每次短差一定不能增加股票的数量</span>，成本才可能真的降下来。', fig: mfig('越跌越买，不追高', box('上涨中加码', RED.c, RED.bg, RED.bc) + down() + box('✗ 一定出问题', RED.c, RED.bg, RED.bc) + '<div style="height:8px"></div>' + box('下跌中分批买', GREEN.c, GREEN.bg, GREEN.bc) + down() + box('✓ 越跌越买', GREEN.c, GREEN.bg, GREEN.bc), '一次性买入 + 留机动资金短差，不增数量') },
        { term: '⑤ 永远保持最大的警觉', text: '技术分析的最终意义，都是<b>为资金管理服务</b>的——投资最终的目的不是股票本身，而是资金，没收回资金，一切都没意义。<span class="hl">股票都是废纸；资金是按比例损失的，一万亿和一万元按比例归零的速度是一样的。</span>无论多大资金，要被消灭都在举手之间，所以<b>永远保持最大的警觉</b>——这是资金管理最重要的一点，没有它，一切管理都是无用的。', fig: mfig('按比例损失 → 归零同速', box('一万亿', BLUE.c, BLUE.bg, BLUE.bc) + '<span style="align-self:center;font-weight:700">≈</span>' + box('一万元', PUR.c, PUR.bg, PUR.bc) + down() + box('按比例归零速度一样', RED.c, RED.bg, RED.bc), '永远保持最大警觉') },
      ]},
    ],
  });
})();
