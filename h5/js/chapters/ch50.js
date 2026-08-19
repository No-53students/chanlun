/* 第50章 资金食物链 · 政策性风险 */
(function () {

  function optCh50() {
    const mp = (i, p, name, color, pos) => ({ coord: [i, p], name, symbol: 'circle', symbolSize: 8, itemStyle: { color }, label: { show: true, color, fontSize: 10, position: pos, distance: 5, fontWeight: 'bold', formatter: function (p) { return p.name; } } });
    const seg = (x, y, name, color, pos) => ({ coord: [x, y], name, symbol: 'none', label: { show: true, color, fontSize: 11, fontWeight: 'bold', position: pos, formatter: function (p) { return p.name; } } });

    const trend = [10, 11.2, 12.4, 13.6, 14.8, 16, 17.2, 18.4, 19.6, 20.8, 22, 23.2];
    const actual = [10, 12, 14, 16, 15, 12.5, 11, 14, 17, 19, 21, 23.5];

    return {
      tooltip: { trigger: 'axis', axisPointer: { type: 'cross' } },
      legend: { data: ['长期趋势（无政策分力）', '实际走势（叠加政策分力）'] },
      grid: { left: 56, right: 30, top: 40, bottom: 40 },
      xAxis: { type: 'value', min: 0, max: 11, interval: 1 },
      yAxis: { type: 'value', scale: true, name: '价格' },
      series: [
        { name: '长期趋势（无政策分力）', type: 'line', data: trend.map((p, i) => [i, p]), symbol: 'none', lineStyle: { width: 2, color: '#94a3b8', type: 'dashed' }, z: 1 },
        { name: '实际走势（叠加政策分力）', type: 'line', data: actual.map((p, i) => [i, p]), symbol: 'circle', symbolSize: 4, lineStyle: { width: 2.5, color: '#1f2937' }, itemStyle: { color: '#1f2937' }, z: 10,
          markArea: {
            silent: true, itemStyle: { color: 'rgba(231,76,60,0.10)' },
            label: { show: true, position: 'insideTop', formatter: function (p) { return p.name || ''; }, color: '#e74c3c', fontSize: 11 },
            data: [[{ xAxis: 3, yAxis: 16, name: '硬调控（政策分力砸出回调）' }, { xAxis: 6, yAxis: 11 }]],
          },
          markPoint: { data: [
            mp(6, 11, '政策砸出的黄金坑', '#16a34a', 'bottom'),
            seg(2.2, 15.3, '上涨被政策打断', '#e74c3c', 'top'),
            seg(8.4, 15, '回拉后重拾升势', '#16a34a', 'bottom'),
            seg(5.0, 23.8, '长期趋势不改', '#64748b', 'top'),
          ] },
        },
      ],
    };
  }

  const figChain = `
<div class="fig" style="min-width:340px"><div class="lbl">主力资金的食物链（第66课）</div>
<div style="font-size:12.5px;line-height:1.55;color:#1f2937">
<div style="text-align:center;background:#fef2f2;border:1px solid #fecaca;border-radius:6px;padding:6px 10px"><b style="color:#991b1b">最高级别主力（老油条）</b><br><span style="font-size:11px;color:#6b7280">食物链最上层 · 根底在市场之外</span></div>
<div style="text-align:center;color:#e74c3c;font-size:14px;line-height:1.5">↓ 维持生态平衡 · 绞杀暴发户</div>
<div style="text-align:center;background:#fef3c7;border:1px solid #fde68a;border-radius:6px;padding:6px 10px"><b style="color:#92400e">次级别主力 / 板块资金</b><br><span style="font-size:11px;color:#6b7280">联手 · 默契 · 暗算 · 拆台</span></div>
<div style="text-align:center;color:#e74c3c;font-size:14px;line-height:1.5">↓ 黄雀 · 螳螂 · 蝉</div>
<div style="text-align:center;background:#e0e7ff;border:1px solid #c7d2fe;border-radius:6px;padding:6px 10px"><b style="color:#3730a3">中小庄家 / 老鼠仓</b><br><span style="font-size:11px;color:#6b7280">不折腾就没江湖地位 · 被垫高成本</span></div>
<div style="text-align:center;color:#e74c3c;font-size:14px;line-height:1.5">↓ 合力末端</div>
<div style="text-align:center;background:#f0fdf4;border:1px solid #bbf7d0;border-radius:6px;padding:6px 10px"><b style="color:#166534">散户个体</b><br><span style="font-size:11px;color:#6b7280">影响力可忽略 · 只需看合力结果</span></div>
</div>
<div class="cap">无数<b>分力</b>按实力分层汇聚成<b>合力</b>（走势）。散户只需知道<b>怎么吃到馅饼</b>（买卖点），无须知道馅饼怎么制造——<br>任何资金，站在走势的角度，不过就是构造不同级别的买卖点而已。</div></div>`;

  __chapters.push({
    id: 'ch50', vol: '卷十 · 心法与杂史', title: '第50章 资金食物链 · 政策性风险', source: '原文第66、74、13、26课',
    figures: [
      { kind: 'html', title: '主力资金的食物链：分力汇聚成合力', note: '第66课：市场每一刻走势由<b>当下合力</b>构成，但有些分力特别巨大，故分析合力不能脱离这些大分力。<b>所谓“市场主力”从来不是一拨人</b>，而是分派别、分层次的：最高级别主力居食物链最上层（彼此知根知底、等对方出破绽一拥而上），逐级往下到散户个体，分几个层次；最高主力会<b>维持生态平衡</b>、绞杀影响平衡的暴发户。散户无须知道馅饼怎么制造，只需会<b>吃馅饼</b>（按买卖点）。', html: figChain },
      { kind: 'echarts', title: '政策只是“一个分力”（第74课）', note: '灰色虚线是<b>无政策分力</b>的长期趋势，黑色实线是<b>叠加了政策分力</b>的实际走势。第74课核心：<span class="hl">政策只是一个分力，不可能单独改变长期走势</span>——硬调控最多造成中短期大转折（图中砸出回调、挖出黄金坑），但改变不了大方向；且政策分力的作用时间、能量都不是无限的，<b>只有中短期力量，没有长期力量</b>。', option: optCh50 },
    ],
    sections: [
      { type: 'definition', title: '主力资金的食物链（第66课）', items: [
        { term: '① 合力与分力', text: '市场每一时刻的走势，都由<b>当下的合力</b>构成。若每个分力都相等、独立，市场运转与现实不同；<span class="hl">现实是有些分力特别巨大，对合力的分析不能脱离这些大分力。</span>走势是合力结果，分力背后是真实的人。', formula: '走势 = Σ 分力（各分力权重不均）', fig: mfig('合力 = 各分力之和', '<div style="font-size:12px;line-height:2;color:#1f2937">主力分力 A <b style="color:#e74c3c">➜</b><br>主力分力 B <b style="color:#e74c3c">➜</b> <b style="color:#9333ea">合力（走势）</b><br>散户分力 C <b style="color:#94a3b8">➜（可忽略）</b></div>', '有些分力特别巨大，故不能脱离大分力谈合力') },
        { term: '② 一个分力远大于其他分力 → 稳定性突变', text: '若特别巨大的分力只有一个、其他分力相对可忽略，则<b>合力就与这分力基本无异</b>——<span class="kw">控盘程度极高</span>的股票往往如此。但<span class="hl">这种“一个分力远大于其他”的系统，其稳定性会产生突变</span>。', fig: mfig('控盘股：合力≈该分力', drawZS([{ p: 10, tag: '底' }, { p: 11, label: '被控盘', color: '#64748b' }, { p: 12 }, { p: 13, label: '合力≈主力', color: '#64748b', above: true }, { p: 14, tag: '顶' }], [], { w: 40, h: 96 }), '单分力主导 → 走势几乎由它决定，稳定性突变') },
        { term: '③ 食物链层级', text: '所谓“市场只有一拨主力在画K线”的说法是<b>想象</b>，从没存在过。市场分裂着不同利益集团，主力<b>分派别</b>：最高级别主力（老油条）居最上层，逐级到散户，分几个层次；最高主力会维持生态平衡、<b>绞杀暴发户</b>。任何主力都不能<b>逆经济大势</b>而行。', fig: mfig('食物链：逐级而下的生态', '<div style="font-size:11.5px;line-height:1.9;color:#1f2937"><b style="color:#991b1b">最高主力</b> → 维持平衡<br><b style="color:#92400e">板块资金</b> → 联手拆台<br><b style="color:#3730a3">中小庄家</b> → 折腾<br><b style="color:#166534">散户</b> → 只看合力</div>', '食物链最上层维持生态平衡，绞杀破坏平衡者') },
        { term: '④ 散户只吃馅饼、不问制造', text: '对散户而言，<span class="hl">无须知道天上掉的馅饼怎么制造，只需知道怎么吃到。</span>无论什么资金，站在走势角度，都不过构造不同级别的买卖点——所以散户只需<b>把技术理论搞清楚</b>，就能游刃有余。', fig: mfig('只需吃馅饼：按买卖点', drawZS([{ p: 14, tag: '顶' }, { p: 10 }, { p: 12 }, { p: 8, label: '一买', color: '#16a34a' }, { p: 10, label: '二买', color: '#9333ea' }, { p: 13, tag: '顶' }], [{ lo: 10, hi: 12, x0: 1, x1: 3, label: '中枢' }], { w: 36, h: 100 }), '买点买、卖点卖，就是吃到馅饼') },
      ]},
      { type: 'definition', title: '政策只是一个分力 + 九点防范（第74课）', items: [
        { term: '⑤ 政策只是一个分力', text: '政策不可能单独改变长期走势。<span class="hl">政策只有中短期的力量，而没有长期的力量。</span>政策分力的作用时间、能量都不是无限的，且任何政策都有边界——一旦超越边界，新的政策（新分力）就要产生。同一个政策在 <code>5000点</code> 和 <code>1000点</code> 的效果也不一样。', fig: mfig('政策分力：中短期、有边界', drawZS([{ p: 10, tag: '底' }, { p: 13, label: '上涨', color: '#16a34a', above: true }, { p: 14, tag: '顶' }, { p: 11, label: '政策砸下', color: '#e74c3c' }, { p: 12, label: '继续', color: '#16a34a', above: true }, { p: 16, tag: '顶' }], [{ lo: 11, hi: 13, x0: 0, x1: 5, label: '长期趋势' }], { w: 40, h: 100 }), '政策只能砸出中短期回调，长期方向不改') },
        { term: '⑥ 硬调控 vs 软调控', text: '调控分两种：<b>硬调控</b>（社论、讲话、严查等，直接针对价格）；<b>软调控</b>（结合更大方面考虑，温和、连续）。若软调控不得力、市场疯狂足以毁掉市场，<b>硬调控成为唯一选择</b>——这是市场的悲哀，不是调控者的悲哀。', fig: mfig('硬调控 vs 软调控', '<div style="font-size:12px;line-height:2;color:#1f2937"><b style="color:#991b1b">硬调控</b>：社论/讲话/严查<br><b style="color:#166534">软调控</b>：温和·连续·兼顾大局</div>', '软调控不得力，硬调控才被迫出手') },
        { term: '⑦ 九点防范 + 成本为0', text: '政策风险<b>只能防范，不可预测</b>。九点要点：① 低估阶段注意向多政策、泡沫阶段注意向空调控；② 最终盈利在个股（长线价值是抵御中短分力的底线）；③ 控制仓位、<b>绝不借贷炒股</b>；④ 养成好习惯；⑤ 贪婪与恐惧都是祸首；⑥ 别企望提前一天跑掉（保密程度已极高）；⑦ 必要对冲（权证等）；⑧ 硬调控一旦出现，一切机会出逃；⑨ 关键还是上涨时<b>赚足利润</b>。而<span class="hl">成本为 0 是彻底逃避风险的唯一办法</span>。', fig: mfig('成本为0 = 最安全', '<div style="font-size:12px;line-height:2;color:#1f2937">成本 → <b style="color:#e74c3c">0</b><br>→ 安心持股 + 效率<br>→ <b style="color:#166534">彻底逃避风险唯一办法</b></div>', '反复强调：只有成本为0的，才是安全的') },
      ]},
      { type: 'definition', title: '不带套的操作不是好操作（第13课）', items: [
        { term: '⑧ 被动带套 vs 主动带套', text: '不带套的操作一定不是好操作，尤其资金量大的。<b>被动带套</b>：介入时根本不知道为何介入，在盲目状态下被套，再按「亏损多少就止损」的错误理论去操作。<b>主动带套</b>有两层：其一，介入不可能一次完成，大资金不主动带套根本买不到足够货；其二，任何介入都要加一个<b>主动的防护</b>——<span class="hl">一旦走势从「能搞」变为「不能搞」，立刻退出，而这个防护的启动与盈亏无关、只与当下走势有关。</span>', fig: mfig('被动 vs 主动带套', '<div style="font-size:12px;line-height:2;color:#1f2937"><b style="color:#b91c1c">被动带套</b>：盲目介入 → 套牢 → 按亏损止损<br><b style="color:#15803d">主动带套</b>：能搞变不能搞 → 立即退出（与盈亏无关）</div>', '带套是主动防护，不是被套后的被动止损') },
        { term: '⑨ 从来不存在真正的“止损”', text: '<span class="hl">从来不存在真正的止损问题，只存在「股票是否依然在能搞的范围内」的问题。</span>只有这种意义下才存在止损：走势从能搞变成了不能搞。此时退出可能已经大大赢利——<b>唯一退出的原因只是走势已经不能搞了，和盈亏无关。</b>根据盈亏进出，就是根据被动因素进出，就是被动带套。', fig: mfig('止损 = 能搞变不能搞', '<div style="font-size:12px;line-height:2;color:#1f2937">止损 ≠ 亏损到某价就割<br>止损 = <b style="color:#e74c3c">能搞 → 不能搞</b><br>（退出与盈亏无关）</div>', '止蚀问题不存在，只有“能搞范围”问题') },
        { term: '⑩ 一买/二买之后的退出纪律', text: '第一类买点买入后，若上涨时又出现「男上位」缠绕，一定要退出（说明引导买入的缠绕不是最后一个，程序判断出问题）；第二类买点后，若缠绕跌破前面男上位最低位，说明程序出问题，必须在任何反弹中出清。<span class="hl">任何操作都没有百分百准确，一旦出现特殊情况，一定要先退出来</span>——这是在投资生涯中长期存活的最重要一点。', fig: mfig('特殊情形 → 先退出来', '<div style="font-size:12px;line-height:2;color:#1f2937">一买后上涨又男上位缠绕 → 退出<br>二买后跌破前男上位最低 → 反弹出清<br><b style="color:#e74c3c">特殊情况 → 一律先退</b></div>', '没有百分百准确的操作，特殊情形先退出') },
        { term: '⑪ 技术系统只是“海选”', text: '任何按均线等构成的买卖程序，都只是综合判断的<b>一个子判断</b>。技术系统只是「<b>海选</b>」，之后还需要「<b>复赛</b>」「<b>PK</b>」，才能选出真正该介入的股票——同样的程序选出的股票，为何有的涨得多、有的涨得少。买入程序的成功率还与<b>市场强度</b>相关：强市可达 90% 以上，弱市则低得多。', fig: mfig('海选 → 复赛 → PK', '<div style="font-size:12px;line-height:2;color:#1f2937">技术系统 = <b style="color:#1d4ed8">海选</b><br>→ 复赛<br>→ <b style="color:#15803d">PK 选真正该介入者</b></div>', '技术系统只是综合判断的一个子判断') },
      ]},
      { type: 'definition', title: '市场风险的回避（第26课）', items: [
        { term: '⑫ 一切风险都归结为价格波动风险', text: '风险可以带上各种定性（政策风险、系统风险、交易风险、流通风险、经营风险……），但<span class="hl">站在纯技术角度，一切风险都必然体现在价格走势上</span>，最终都反映为价格波动风险。有些股票市盈率很高却一直涨，纯技术角度只能在技术上衡量其风险，无需考虑市盈率之类。', fig: mfig('一切风险 → 价格波动', '<div style="font-size:12px;line-height:2;color:#1f2937">政策/系统/流通/经营风险<br>↓<br><b style="color:#e74c3c">价格走势（价格波动风险）</b></div>', '风险归根结底都反映在价格上') },
        { term: '⑬ 理论成立的前提：交易能延续', text: '缠论成立最重要的前提：被分析的品种<b>必须在可预见的时间内能继续交易</b>。唯一不能控制的就是交易被突然停止（或「不算了」，如 327 事件），<span class="hl">这是技术的最大死穴</span>。只要交易延续、交易算数，理论就没有任何盲点需要特别留意；对要停止交易的品种，最好别用什么理论。', fig: mfig('交易延续 = 理论前提', '<div style="font-size:12px;line-height:2;color:#1f2937">前提：可预见时间内<b style="color:#15803d">继续交易</b><br>死穴：<b style="color:#e74c3c">交易被停止 / 不算数</b></div>', '唯一不能控制的是交易突然停止') },
        { term: '⑭ 限期资金 = 自动停止交易', text: '<b>任何交易都必须先有钱</b>；一旦钱是有限期的（借贷、透支），就等于自动设置了一个停止交易的时限——这是所有失败交易中最常见的一种。任何交易的钱最好<b>无限期</b>、或限期足够长；有期限的钱唯一办法是把操作级别降到足够低，但那只是没办法的办法。', fig: mfig('限期资金 = 时限', '<div style="font-size:12px;line-height:2;color:#1f2937">借贷 / 透支 → <b style="color:#e74c3c">自动设停止交易时限</b><br>钱应<b style="color:#15803d">无限期</b>或限期足够长</div>', '有期限的钱是最常见的失败交易源头') },
        { term: '⑮ 股票是废纸，把成本做成负数', text: '股票就是废纸一张，唯一功能是让你把一笔钱经过若干时间合法换成另一笔钱的凭证。市场的唯一风险，就是你投入的钱在后面的时刻不能用相应凭证换回更多的钱。<span class="hl">真正的高手，是有本事在相应时期内把任何凭证变成负价格的人</span>——缠论本质上只探讨一个问题：如何把任何价格的凭证，在足够长的时间内变成负数。', fig: mfig('把凭证变成负价格', '<div style="font-size:12px;line-height:2;color:#1f2937">股票 = 废纸（换钱凭证）<br>高手 = 把任何凭证 → <b style="color:#e74c3c">负价格</b></div>', '唯一风险：凭证换不回更多钱') },
        { term: '⑯ 级别的意义：只和买卖量有关', text: '级别的意义只有一个：<b>基本只和买卖量有关</b>——日线级别的买卖量比 1 分钟级别多得多。高手「任何卖点都是卖点、任何买点都是买点」，唯一需要控制的是<b>买卖的量</b>；对成本为正的股票永远不信任，只想尽快搞成负数。结论：<b>一笔足够长的钱 + 熟练运用缠论 = 战无不胜</b>。', fig: mfig('一笔长钱 + 熟练运用', '<div style="font-size:12px;line-height:2;color:#1f2937">级别 = <b style="color:#1d4ed8">买卖量</b><br>一笔足够长的钱 + 熟练运用<br>= <b style="color:#15803d">战无不胜</b></div>', '级别只和买卖量有关') },
      ]},
      { type: 'motivation', title: '把政策与庄家还原成“分力”', text: '散户最容易犯的两种幻想：一是把“主力”想象成一拨无所不能的人，二是把“政策”想象成洪水猛兽。第66、74课共同做的一件事，就是<b>祛魅</b>——庄家是分层的、会死掉的；政策只是一个有边界、有期限的分力。把一切还原为<b>合力与分力</b>后，散户就有了正确位置：<b>不预测政策、不猜测主力，只看合力（走势）给出的买卖点</b>，用成本为 0 与好仓位作为兜底。这才是真正能长期活下来的心态。' },
      { type: 'pitfalls', title: '常见误区', items: [
        '以为“主力只有一拨人在画K线”——错：主力<b>分派别、分层次</b>，联手、默契、暗算、拆台都是常态。',
        '把政策当<b>能决定长期走势</b>的力量——错：政策只是<b>一个分力</b>，只有中短期力量。',
        '<b>借贷炒股</b>去博机会——错：把市场当赌场，永远入不了资本市场的门。',
        '硬调控出台前<b>想提前一天跑掉</b>——错：政策保密程度极高、反应时间越来越小，大资金都来不及。',
        '把政策性风险当<b>系统风险</b>去预测——错：它是<b>非系统风险</b>，只能防范、不可准确预测。',
      ]},
      { type: 'exercises', title: '练习', items: [
        { q: '为什么分析“合力”不能脱离那些特别巨大的“分力”？', a: '因为市场每一刻走势都由<b>当下合力</b>构成，但现实里有些分力特别巨大；若只有一个大分力（如控盘股），<b>合力就与该分力基本无异</b>，而这种单分力主导的系统<b>稳定性会发生突变</b>，所以必须纳入分析（第66课）。' },
        { q: '如何理解“政策只是一个分力”？', a: '政策<b>不可能单独改变长期走势</b>，只有中短期力量、没有长期力量；政策分力的作用时间、能量都<b>有限、有边界</b>，一旦超越边界就有新政策（新分力）产生；同一政策在不同点位（5000点 vs 1000点）效果也不同（第74课）。' },
        { q: '第74课说“彻底逃避市场风险的唯一办法”是什么？', a: '<b>成本为 0</b>。反复强调：只有成本为 0 的，才是安全的——这样才有安心持股的可能与效率，也是抵御一切中短期分力（包括政策）的最终基础（第74课）。' },
      ]},
    ],
  });
})();
