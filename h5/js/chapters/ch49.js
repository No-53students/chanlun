/* 第49章 心态纪律总纲 */
(function () {

  // 主图1：买点买卖点卖的节奏图
  function optCh49() {
    const pts = [10, 13, 11, 15, 13, 9, 12];
    const cats = pts.map((_, i) => 'T' + i);
    const mp = (i, name, color, pos) => ({ coord: [cats[i], pts[i]], name, symbol: 'circle', symbolSize: 9, itemStyle: { color }, label: { show: true, color, fontSize: 10, position: pos, distance: 6, fontWeight: 'bold', formatter: function (p) { return p.name; } } });
    const seg = (x, y, name, color, pos) => ({ coord: [x, y], name, symbol: 'none', label: { show: true, color, fontSize: 11, fontWeight: 'bold', position: pos || 'top', formatter: function (p) { return p.name; } } });
    return {
      tooltip: { trigger: 'axis', axisPointer: { type: 'cross' } },
      grid: { left: 48, right: 24, top: 40, bottom: 36 },
      xAxis: { type: 'category', data: cats, axisLabel: { interval: 0 } },
      yAxis: { type: 'value', scale: true, name: '价格' },
      series: [{
        name: '走势', type: 'line', data: pts, symbol: 'circle', symbolSize: 5,
        lineStyle: { width: 2, color: '#1f2937' }, itemStyle: { color: '#1f2937' },
        markPoint: { data: [
          mp(0, '一买(底背驰)', '#16a34a', 'bottom'),
          mp(2, '二买(回试)', '#16a34a', 'bottom'),
          mp(3, '一卖(顶背驰)', '#e74c3c', 'top'),
          mp(4, '二卖(反弹)', '#e74c3c', 'top'),
          mp(5, '买点(下跌中)', '#16a34a', 'bottom'),
          seg('T1', 14.3, '卖点·在上涨中形成', '#e74c3c', 'top'),
          seg('T4', 8.3, '买点·在下跌中形成', '#16a34a', 'bottom'),
        ] },
      }],
    };
  }

  // 主图2：心态纪律总纲流程图
  const figMind = `
<div class="fig" style="min-width:340px"><div class="lbl">心态纪律总纲：四正 → 戒五毒 → 节奏 → 等待</div>
<div style="font-size:12.5px;line-height:2.1;color:#1f2937">
<span style="background:#e0e7ff;color:#3730a3;padding:2px 8px;border-radius:6px"><b>四正</b> 正闻·正见·正学·正行</span> → <span style="background:#f3e8ff;color:#6b21a8;padding:2px 8px;border-radius:6px"><b>戒五毒</b> 贪嗔痴疑慢</span><br>
<span style="background:#fee2e2;color:#991b1b;padding:2px 8px;border-radius:6px"><b>节奏</b> 买点买·卖点卖</span> → <span style="background:#fef3c7;color:#92400e;padding:2px 8px;border-radius:6px"><b>等待</b> 持股·持币</span><br>
<span style="color:#6b7280;font-size:12px">可预测的是<b>形态</b>（不患），非点位（患）；只授"渔"不荐股；买之前戏、卖之高潮</span>
</div>
<div class="cap">把情绪、贪嗔痴疑慢抛掉，回归<b>当下的走势</b>，用"买点买卖点卖"的节奏去等待被理论绝对保证的买卖点。</div></div>`;

  __chapters.push({
    id: 'ch49', vol: '卷十 · 心法与杂史', title: '第49章 心态纪律总纲', source: '原文第34、41、45、51、52、55、23、42课',
    figures: [
      { kind: 'echarts', title: '节奏：买点买卖点卖', note: '第41课开宗明义：<span class="hl">市场的节奏只有一个——买点买、卖点卖</span>。图中可见，<b>买点总在下跌中形成（第一、二类买点），卖点总在上涨中形成（第一、二类卖点）</b>。买点上的股票就是好股票，卖点上的股票就是坏股票，除此之外的好坏分类都是瞎掰。被贪婪与恐惧支配、追涨杀跌的人，唯一命运就是"死"。', option: optCh49 },
      { kind: 'html', title: '心态纪律总纲一览', note: '六课串成一条心法主线：<span class="kw">正闻、正见、正学、正行</span>（第34课）是根；<b>戒除贪嗔痴疑慢</b>（第52课）是修；<b>买点买卖点卖</b>（第41课）是节奏；<b>持股与持币＝等待</b>（第45课）是两种最基本的操作；<b>只授渔不荐股</b>（第51课）是自立；<b>买之前戏、卖之高潮</b>（第55课）是认清买卖不对等、熟悉股性。', html: figMind },
    ],
    sections: [
      { type: 'definition', title: '四正与节奏（第34、41课）', items: [
        { term: '① 正闻·正见·正学·正行', text: '入市者若要有成就，必须<span class="kw">正闻、正见、正学、正行</span>，缺一不可。<span class="hl">"正"不是"正确"，而是"正是"、是"当下"</span>——要当下闻、当下见、当下学、当下行。对股市而言，<b>只有走势是当下的，离开走势，一切都与当下无关</b>；任何操作陷入与当下走势相反的状态，唯一正确的选择就是离开。', fig: mfig('四正：正闻正见正学正行', '<div style="font-size:12px;line-height:1.9;color:#1f2937"><b>正</b>＝正是、<b>当下</b><br>当下闻→见→学→行<br><span style="color:#6b7280">离开走势，一切与当下无关</span></div>', '只有走势是当下的，正即当下') },
        { term: '② 买点买卖点卖', text: '市场的节奏只有一个：<b>买点买、卖点卖</b>。买点总在下跌中形成，卖点总在上涨中；<span class="hl">买点上的股票就是好股票，卖点上的股票就是坏股票</span>，除此之外的好坏分类都是瞎掰。即使是第三类买卖点，也是分别在回调与反弹中形成的，哪里需要追涨杀跌？', fig: mfig('买点买卖点卖', drawZS([{ p: 10, tag: '底', label: '买(跌中)' }, { p: 13, tag: '顶', label: '卖(涨中)' }, { p: 11, tag: '底', label: '买' }, { p: 14, tag: '顶', label: '卖' }, { p: 12, tag: '底', label: '买' }], [], { w: 36, h: 100 }), '市场的节奏只有一个：买点买、卖点卖，绝不追涨杀跌') },
        { term: '③ 节奏比精度更重要', text: '买卖点判断的<b>精度</b>可以随学习与实践不断提高，但<span class="hl">这一套程序与节奏是不会改变的——节奏比精度更重要</span>。初学者即便对买卖点判断不精确，也必须以此节奏要求自己，强迫执行；市场给了三次改错机会（第一、二、三类买卖点），连错三次还犯同样错误，就该休息。', fig: mfig('节奏＞精度', '<div style="font-size:12px;line-height:1.9;color:#1f2937">精度可<b>提高</b>（靠实践）<br>节奏<b>不能乱</b>（程序不变）<br><span style="color:#6b7280">三次改错机会：一买二买三买</span></div>', '错过一买还有二买、三买；连错三次，死了活该') },
      ]},
      { type: 'definition', title: '等待 · 学佛 · 传销 · 买卖不对等（第45、51、52、55课）', items: [
        { term: '④ 持股与持币＝等待', text: '买入卖出1秒就完成，填充其间、更重要的两种基本操作是<span class="kw">持股与持币</span>。<span class="hl">所有股票的操作，归根结底只有两个字：等待</span>——等待那个被理论绝对保证的买卖点。买卖点是"生长"出来的，不能像等待彗星那样精确预知时间；但走势类型的可能结构是可以分类的，唯一需要的就是观察当下、让市场选择。', fig: mfig('持股与持币＝等待', '<div style="font-size:12px;line-height:1.9;color:#1f2937">买点买入 → <b>持股</b>（等卖点）<br>卖点卖出 → <b>持币</b>（等买点）<br>归根结底两个字：<b>等待</b></div>', '两种最基本操作：持股、持币') },
        { term: '⑤ 可预测的是形态，非点位（不患/患）', text: '市场走势<b>当然可以绝对预测</b>，但可预测的是<b>基本形态</b>，不是点位。<span class="hl">形态是"不患"的，点位是"不患"之"患"</span>——点位都是当下形成的，追求对点位的非当下把握，就是脑子进水。同时，<b>背驰的级别一定不小于转折的级别</b>，这是市场预测的最基础手段：30分钟顶背驰后，后面必然是30分钟级别下跌或扩展成30分钟以上盘整，这是最绝对、最有用、被理论保证的预测。', fig: mfig('不患与患：形态可预测，点位不可', '<div style="font-size:12px;line-height:1.9;color:#1f2937">形态是<b style="color:#2563eb">"不患"</b>（可绝对预测）<br>点位是<b style="color:#e74c3c">"不患"之"患"</b>（当下形成）<br>背驰级别<b>≥</b>转折级别</div>', '立足"不患"之上，才有对点位之"患"的当下把握') },
        { term: '⑥ 只授"渔"，不荐股（传销把戏）', text: '短线股评荐股者的把戏，本质是<span class="kw">传销</span>：先建核心会员、交会费优先买入，再向外扩散、吸引接盘，直到资金流入与筹码松动平衡、系统崩溃。所以<span class="hl">只把"渔"的方法交给各位，让各位自己去找鱼吃，关键是级别买卖点而不是对象</span>；务必远离借股票收费者，技术过关才是根本。', fig: mfig('只授"渔"，不荐股', '<div style="font-size:12px;line-height:1.9;color:#1f2937">荐股＝<b>传销把戏</b><br>（会员→扩散→树倒猢狲散）<br>学<b>方法</b>，找<b>买卖点</b><br><span style="color:#6b7280">关键是级别买卖点，不是对象</span></div>', '远离借股票收费者；技术过关才是根本') },
        { term: '⑦ 买之前戏，卖之高潮', text: '<span class="hl">买和卖是不对等的</span>，因为买卖的前后状态<b>不同构</b>：钱与时间无关，筹码与时间有关，故（钱→筹码）与（筹码→钱）不是同构的。因此买必然是<b>反复的前戏</b>（降成本、增筹码、熟悉股性），卖则要在<b>大级别背驰的"高潮"中退出</b>。每个股票都有其独特的<b>股性</b>（频率、幅度、形态复杂度），熟悉股性才能在N次高潮与不应中得心应手。', fig: mfig('买之前戏，卖之高潮', '<div style="font-size:12px;line-height:1.9;color:#1f2937">买与卖<b>不对等</b>（前后状态不同构）<br>买＝<b>前戏</b>（反复·降成本·熟悉股性）<br>卖＝<b>高潮</b>（大级别背驰中退）<br>核心：了解<b>股性</b></div>', '钱与时间无关，筹码与时间有关，故买卖不同构') },
      ]},
      { type: 'mindset', title: '市场与人生（第23课）', items: [
        { term: '① 最终比的是修养与人格及见识', text: '技术只是最粗浅的东西，同样的技术在纯技术层面大家都能理解，关键却在<b>应用</b>——这里差别极大。<span class="hl">投资市场最终比的是修养与人格及见识，光从技艺上着手，永远只能是匠人，不可能成为真正的高手。</span>', fig: mfig('技艺是术，修养是道', '<div style="font-size:12px;line-height:1.9;color:#1f2937">纯技术 = <b>粗浅</b>，大家都能懂<br>关键 = <b>应用</b>（差别极大）<br><span style="color:#7e22ce">最终比：修养 · 人格 · 见识</span></div>', '光从技艺着手，永远是匠人') },
        { term: '② 自由不是逃避', text: '市场充满了无穷的诱惑与陷阱，对应着人的贪婪与恐惧。但「远离市场就是道」是自渎——<b>道不远人</b>，人的贪婪恐惧、市场的诱惑陷阱，哪里与道相远？<span class="hl">自由不是逃避、解脱更不是逃避。</span>只有在资本市场这最恶浊之处，才有大自由、大解脱。', fig: mfig('道不远人', '<div style="font-size:12px;line-height:1.9;color:#1f2937">诱惑陷阱 = 对应贪婪恐惧<br>「远离市场」= <b>自渎</b><br><span style="color:#7e22ce">自由 / 解脱 ≠ 逃避</span></div>', '在最恶浊处，才有大自由大解脱') },
        { term: '③ 每周一小时：独处观照', text: '现代社会能找 7 天打禅七是奢侈，但<b>每周抽一小时</b>抛开一切束缚、独自一人，在房间里、高山上、星空下，张开没有眼睛的眼睛、没有耳朵的耳朵，俯视世界、倾听世界。何处不是房间高山？何处有束缚需要抛开？最终仍要回到市场中磨炼。', fig: mfig('每周一小时独处', '<div style="font-size:12px;line-height:1.9;color:#1f2937">抛开一切 · 独自一人<br>无眼之眼 · 无耳之耳<br><span style="color:#7e22ce">俯视世界 · 倾听世界</span></div>', '何处不是房间高山？最终回到市场磨炼') },
      ]},
      { type: 'mindset', title: '不适合参与市场的十种人（第42课）', text: '缠师直言：有这十种表现的人，<b>不适合参与市场</b>。性格决定命运——<span class="hl">认清自己比认清市场更重要。</span>每天收盘后花十分钟，复盘自己当天的操作与心理过程，是认识自己的第一步。', items: [
        { term: '① 耳朵控制大脑型', text: '听到什么不经大脑，耳朵直接操纵手，几乎每次买卖都这样完成——不适合。' },
        { term: '② 疯狂购物型', text: '几万资金却持有十几甚至几十只股票，什么股都想拥有、涨了都说「我也有」——不适合。' },
        { term: '③ 不受控制型', text: '每次操作明知不对就是控制不住，一到关键抉择就掉链子——不适合。' },
        { term: '④ 永远认错型', text: '永远认错、<b>死不改错</b>，同样的毛病永远犯却改不了——不适合。' },
        { term: '⑤ 祥林嫂型', text: '永远唉声叹气，甚至享受悲剧情调——离开吧。' },
        { term: '⑥ 赌徒型', text: '把市场当赌场——根本没必要在市场里。' },
        { term: '⑦ 股评型', text: '明明亏得一塌糊涂，就爱吹，市场是用来侃的——当股评去吧。' },
        { term: '⑧ 入戏太深型', text: '把股市波动当连续剧，每个细微变动都情绪失控——太累，回家看肥皂剧。' },
        { term: '⑨ 偏执狂型', text: '认死理、万牛拉不回，在万变的市场中没有活路。' },
        { term: '⑩ 赵括型', text: '纸上谈兵，只懂理论不会操作，如同战场上的赵括没有活路。' },
      ]},
      { type: 'motivation', title: '技术之外，还有一颗心', text: '缠论学到一定阶段，卡住绝大多数人的不再是"看不懂"，而是"做不到"。这六课正是缠师反复叮咛的<b>心法</b>：先立<span class="kw">四正</span>（回归当下走势），再<span class="kw">戒五毒</span>（贪嗔痴疑慢），守住<span class="kw">节奏</span>（买点买卖点卖），安于<span class="kw">等待</span>（持股持币），自立不依赖荐股，认清买卖不对等、熟悉股性。技术是"术"，心法是"道"——<span class="hl">术可精进，道不可离</span>；节奏对了，技术只是迟早的精度问题，节奏错了，再高的技术也救不了你。' },
      { type: 'pitfalls', title: '常见误区', items: [
        '把"正"理解成"正确"的名言之争——<b>正＝正是＝当下</b>，不是正确。',
        '<b>追涨杀跌</b>、把涨N倍后的涨停当买点——违背"买点买卖点卖"的节奏，连错三次死了活该。',
        '把操作当成<b>只有买入卖出</b>、忽略持股与持币——买入卖出1秒就完，持股持币才是更重要的操作。',
        '<b>追求预测具体点位</b>、想逃离"不患"而谋其"患"——点位是当下形成的，可预测的只有形态。',
        '依赖<b>荐股、听消息</b>而非自己掌握买卖点——荐股是传销把戏，技术过关才是根本。',
      ]},
      { type: 'exercises', title: '练习', items: [
        { q: '"正闻、正见、正学、正行"里的"正"是什么意思？', a: '<b>"正"不是"正确"，而是"正是"、是"当下"</b>——要当下闻、当下见、当下学、当下行。对股市而言，只有走势是当下的，离开走势一切都与当下无关。' },
        { q: '为什么说"持股与持币才是更重要的操作"？', a: '因为买入卖出1秒就完成，填充其间更长时间的是<b>持股与持币</b>这两种基本操作；所有操作归根结底只有两个字——<b>等待</b>，等待被理论绝对保证的买卖点。' },
        { q: '可预测的到底是"点位"还是"形态"？依据是什么？', a: '可绝对预测的是<b>基本形态</b>，不是点位。形态是<b>"不患"</b>的，点位是<b>"不患"之"患"</b>（当下形成中）。据此，"背驰的级别不小于转折的级别"就是最基础的预测手段：30分钟顶背驰后必然30分钟级别下跌或扩展成30分钟以上盘整。' },
      ]},
    ],
  });
})();
