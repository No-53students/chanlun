/* 第51章 逗庄家杂史 1-4 */
(function () {

  function optCh51() {
    const mp = (i, p, name, color, pos) => ({ coord: [i, p], name, symbol: 'circle', symbolSize: 8, itemStyle: { color }, label: { show: true, color, fontSize: 10, position: pos, distance: 5, fontWeight: 'bold', formatter: function (p) { return p.name; } } });
    const pin = (i, p, name, color, pos) => ({ coord: [i, p], name, symbol: 'pin', symbolSize: 40, itemStyle: { color }, label: { show: true, color, fontSize: 10, fontWeight: 'bold', position: pos, distance: 24, formatter: function (p) { return p.name; } } });
    const seg = (x, y, name, color, pos) => ({ coord: [x, y], name, symbol: 'none', label: { show: true, color, fontSize: 11, fontWeight: 'bold', position: pos, formatter: function (p) { return p.name; } } });

    // 做顶出货全过程：三周 +70% → 跌停 → 此后 -90%
    const price = [10, 10.8, 11.6, 12.4, 13.2, 14, 14.8, 15.6, 16.4, 17, 15.3, 15.8, 13.5, 11.2, 9.5, 7.8, 6.5, 5.2];

    return {
      tooltip: { trigger: 'axis', axisPointer: { type: 'cross' } },
      grid: { left: 52, right: 40, top: 44, bottom: 44 },
      xAxis: { type: 'value', min: 0, max: 17, interval: 1 },
      yAxis: { type: 'value', scale: true, name: '价格' },
      series: [{
        name: '做顶出货', type: 'line', data: price.map((p, i) => [i, p]), symbol: 'circle', symbolSize: 4,
        lineStyle: { width: 2.5, color: '#1f2937' }, itemStyle: { color: '#1f2937' },
        markArea: {
          silent: true, itemStyle: { color: 'rgba(37,99,235,0.08)' },
          label: { show: true, position: 'insideTop', formatter: function (p) { return p.name || ''; }, color: '#2563eb', fontSize: 11 },
          data: [[{ xAxis: 0, yAxis: 10, name: '分批出货（从不拉抬一笔）' }, { xAxis: 9, yAxis: 17 }]],
        },
        markLine: {
          silent: true, symbol: 'none',
          label: { show: true, position: 'end', formatter: function (p) { return p.name; }, fontSize: 10 },
          data: [
            { yAxis: 17, name: '做顶高位 17（+70%）', lineStyle: { color: '#e74c3c', type: 'dashed', width: 1 }, label: { color: '#e74c3c' } },
            { yAxis: 10, name: '起步价 N=10', lineStyle: { color: '#64748b', type: 'dashed', width: 1 }, label: { color: '#64748b' } },
          ],
        },
        markPoint: { data: [
          seg(3.0, 12.9, '低位分批出', '#92400e', 'bottom'),
          seg(6.5, 15.5, '压单即被扫', '#92400e', 'top'),
          pin(10, 15.3, '最后一天屠刀·跌停', '#e74c3c', 'top'),
          mp(17, 5.2, '高位下来 -90%', '#16a34a', 'bottom'),
          seg(13, 6.5, '多杀多·一蹶不振', '#64748b', 'bottom'),
        ] },
      }],
    };
  }

  const figTopBottom = `
<div class="fig" style="min-width:340px"><div class="lbl">做顶出货 vs 做底吃货（第85、87课）</div>
<div style="display:flex;gap:14px;align-items:flex-start;flex-wrap:wrap">
<div style="flex:1;min-width:150px">${drawZS(
  [{ p: 10, tag: '底' }, { p: 16, label: '个股单顶', color: '#e74c3c', above: true }, { p: 8, tag: '底' }],
  [], { w: 34, h: 120 }
)}<div style="font-size:11px;color:#6b7280;text-align:center">个股顶：分力少、对比明显 → <b>简单</b></div></div>
<div style="flex:1;min-width:180px">${drawZS(
  [{ p: 10, tag: '底' }, { p: 14, tag: '顶' }, { p: 11.5, tag: '底' }, { p: 15, tag: '顶' }, { p: 12, tag: '底' }, { p: 14.5, label: '大盘多顶', color: '#e74c3c', above: true }, { p: 9, tag: '底' }],
  [{ lo: 11.5, hi: 14, x0: 0, x1: 5, label: '顶部震荡' }], { w: 24, h: 120 }
)}<div style="font-size:11px;color:#6b7280;text-align:center">大盘顶：分力多 → <b>复杂、反复折腾</b></div></div>
<div style="flex:1;min-width:170px">${drawZS(
  [{ p: 14, tag: '顶' }, { p: 8, label: '假突破', color: '#64748b' }, { p: 10, label: '瀑布', color: '#e74c3c' }, { p: 5, tag: '底', label: '吸筹' }, { p: 12, label: 'V反转', color: '#16a34a', above: true }, { p: 16, label: '拉抬脱离', color: '#16a34a', above: true }],
  [{ lo: 9, hi: 11, x0: 0, x1: 1, label: '压力区' }], { w: 30, h: 120 }
)}<div style="font-size:11px;color:#6b7280;text-align:center">做底吃货：假突破 → 瀑布 → <b>V反转吸筹拉抬</b></div></div>
</div>
<div class="cap">做顶靠的是<b>分批出货、不拉抬</b>，最终靠<b>贪嗔痴疑慢</b>让别人接盘；做底靠的是<b>把成本洗到 0</b>。<br>大盘顶分力多、复杂反复；个股顶分力少、简单直接——但<span class="hl">无论什么花招，合力结果还是买卖点</span>。</div></div>`;

  __chapters.push({
    id: 'ch51', vol: '卷十 · 心法与杂史', title: '第51章 逗庄家杂史 1-4', source: '原文第75、76、85、87课',
    figures: [
      { kind: 'echarts', title: '做顶出货全过程（第85课）：从不拉抬一笔', note: '第85课经典案例：持股仅 30% 多、已涨 N 倍，三周内<b>从不拉抬一笔</b>，只在低位<b>分批出货</b>，再配合“夹空”“抢筹码”的传闻与老鼠仓增仓，最后一天<b>屠刀齐出、当天跌停</b>，此后该股<b>从高位下跌 90% 以上</b>、再也翻不过身。成功只因为<b>那些人的贪嗔痴疑慢</b>。', option: optCh51 },
      { kind: 'html', title: '做顶出货 vs 做底吃货 形态对比', note: '第85课：<b>大盘顶 vs 个股顶</b>——大盘分力多，顶部<b>复杂、反复折腾</b>（多顶），个股分力少，顶部<b>简单</b>（常单顶/双顶）。第87课：<b>做底吃货</b>——假突破洗筹、瀑布砸穿平台、V 型反转吸筹、最后拉抬脱离套牢区；核心是<span class="hl">成本降到 0 才拉抬，真拉抬不花钱</span>。', html: figTopBottom },
    ],
    sections: [
      { type: 'definition', title: '玩庄家的分力博弈（第75、76课）', items: [
        { term: '① 庄家 vs 玩庄家的人', text: '个股操作中影响合力的无非两类资金：<b>庄家</b>与<b>玩庄家的人</b>。多数人把庄家想象得无所不能，其实<span class="hl">死的庄家比活下来的多得多</span>，很多就是给玩庄家的人搞死的。资金量重要，但<b>技巧更关键</b>——1/10 资金制造的效果可能比 10 倍资金还大。', fig: mfig('散户看合力 · 大资金玩分力', '<div style="font-size:12px;line-height:2;color:#1f2937"><b style="color:#166534">散户</b>：只看合力结果<br><b style="color:#991b1b">大资金</b>：参与分力博弈<br><span style="color:#6b7280">1/10 资金可造 10 倍效果</span></div>', '散户影响力可忽略，只看合力最终结果即可') },
        { term: '② 时间上害死庄家', text: '玩死庄家无非两种。<b>时间上</b>：有洁癖的庄家总想把盘洗得一尘不染，你不断折腾让他觉得筹码特乱，他就洗呀洗，<b>洗到行情都走完了还在洗</b>——这种往往走出<b>复杂的大级别中枢</b>。日常折腾更要<b>垫高其成本</b>。', fig: mfig('时间上：洗到行情结束', drawZS([{ p: 10, tag: '底' }, { p: 12, tag: '顶' }, { p: 10.5, tag: '底' }, { p: 12.5, tag: '顶' }, { p: 10.8, tag: '底' }, { p: 12.2, tag: '顶', label: '还在洗', color: '#6b7280' }, { p: 11, tag: '底' }], [{ lo: 10.5, hi: 12, x0: 0, x1: 6, label: '复杂大中枢' }], { w: 32, h: 100 }), '不断折腾，让洁癖庄家洗到行情结束') },
        { term: '③ 空间上害死庄家', text: '<b>空间上</b>：庄家要风助他风、要雨助他雨，<b>先养其骄</b>，等其不可一世时<b>稳、准、狠</b>一下要命——先砸出<b>相当狠的第一段</b>，引发散户恐慌盘后<b>回接</b>（只接散户恐慌盘，不接庄家抛盘），再用足够子弹打<b>塔山阻击战</b>，最好直接倒出 V 型反转。', fig: mfig('空间上：第一段 + 塔山阻击战', drawZS([{ p: 16, tag: '顶' }, { p: 12, label: '第一段狠砸', color: '#e74c3c' }, { p: 13, label: '回接恐慌盘', color: '#f59e0b' }, { p: 8, label: 'V型', color: '#e74c3c' }, { p: 10, label: '塔山阻击', color: '#9333ea' }, { p: 15, label: '反扑被阻击', color: '#16a34a', above: true }], [], { w: 36, h: 100 }), '先养其骄，突然出手，第一段狠砸后阻击反扑') },
        { term: '④ 攻击对象：找资金弱点', text: '搞死庄家首先对其<b>资金面、来路</b>充分了解。<span class="hl">资金上的弱点是攻击的最好前提。</span>暴发户、新庄家、以及“刚成功一把正在 G 点上”的，都是绝佳猎杀对象；老狐狸也能攻击，但要准备<b>长期作战</b>。', fig: mfig('绝佳猎杀对象', '<div style="font-size:12px;line-height:2;color:#1f2937">暴发户 / 新庄家<br><b style="color:#991b1b">刚成功一把、正 G 着的</b><br>→ 最易收拾</div>', '资金有弱点，是攻击的最好前提') },
      ]},
      { type: 'definition', title: '做顶出货 vs 做底吃货（第85、87课）', items: [
        { term: '⑤ 做顶：分批、不拉抬', text: '第85课经典做顶：<span class="hl">整个做顶过程中根本没拉抬过一笔，都是分批出货</span>，最正常的手法，谁也说不出违规；也不说一句影响股价的话，靠的只是<b>那些人的贪嗔痴疑慢</b>——散户、小庄家、老鼠仓的<b>多杀多</b>就把人逼死了。', fig: mfig('做顶：分批出货', drawZS([{ p: 10, tag: '底' }, { p: 13, label: '异动', color: '#16a34a', above: true }, { p: 15, label: '+40%', color: '#16a34a', above: true }, { p: 17, label: '+70%', color: '#16a34a', above: true }, { p: 15.3, label: '跌停', color: '#e74c3c' }, { p: 7, label: '-90%', color: '#e74c3c' }], [], { w: 40, h: 104 }), '不拉抬、分批出，最后一天屠刀齐出跌停') },
        { term: '⑥ 大盘顶 vs 个股顶', text: '<b>大盘的顶部</b>分力更多、合力更复杂，所以一般<b>不会简单</b>，破位前反而多犹豫、多折腾；越大型的顶部越是如此。<b>个股的顶部</b>大多不复杂（除非很多人参与的大型股票），因为分力少、对比明显。<span class="kw">顶部是有级别的</span>，中期顶部调整后就不是顶了。', fig: mfig('个股顶简单 · 大盘顶复杂', '<div style="display:flex;gap:6px;align-items:flex-start">' + drawZS([{ p: 10, tag: '底' }, { p: 16, label: '个股单顶', color: '#e74c3c', above: true }, { p: 8, tag: '底' }], [], { w: 26, h: 86 }) + drawZS([{ p: 10, tag: '底' }, { p: 14, tag: '顶' }, { p: 11.5, tag: '底' }, { p: 15, tag: '顶' }, { p: 12, tag: '底' }, { p: 14.5, label: '大盘多顶', color: '#e74c3c', above: true }, { p: 9, tag: '底' }], [], { w: 20, h: 86 }) + '</div>', '分力少→顶简单；分力多→顶复杂、反复折腾') },
        { term: '⑦ 做底吃货：成本与 0 成本', text: '吸货<b>无所谓底部</b>，只要有筹码、有钱、有足够时间，什么成本都能摊下来。<span class="hl">最关键是成本的下降——成本没到 0，根本没大力拉抬的必要；真拉抬不需要花钱。</span>基本 0 成本筹码，反复拉抬变成纯负数，最后 N 的 N 次方倍，满手负成本再甩卖，才是最安全。', fig: mfig('0成本 → 负成本 → N^N 倍', '<div style="font-size:12px;line-height:2;color:#1f2937">成本 → <b style="color:#e74c3c">0</b><br>→ 反复拉抬 → <b style="color:#9333ea">负成本</b><br>→ N 的 N 次方倍</div>', '成本到 0 才拉抬；拉抬要花钱说明价已高') },
      ]},
      { type: 'motivation', title: '故事背后还是买卖点', text: '这四课全是“梦话”，但梦话里藏着真东西：<b>庄家不是神，也会被搞死</b>；做顶、做底的手法千变万化，时间上、空间上、心理上无所不用其极。缠师反复点明一句收尾——<span class="hl">无论什么花招，最终合力的结果还是买卖点，买卖点是不患的</span>。所以散户听故事不是去模仿套路，而是记住：<b>别去猜庄家想干什么，只按自己的级别、买卖点去操作</b>。' },
      { type: 'pitfalls', title: '常见误区', items: [
        '把庄家当成<b>无所不能、吃人不吐骨</b>的神——错：死的庄家比活下来的<b>多得多</b>。',
        '以为大盘顶部一形成就<b>立刻崩掉</b>——错：大盘顶分力多、<b>反复折腾</b>，破位前机会反而多多。',
        '觉得<b>个股顶部和大盘一样复杂</b>——错：个股分力少，顶部大多<b>简单</b>（单顶/双顶）。',
        '想<b>模仿</b>做顶出货的花招去操盘——错：散户只需看好走势，<b>买卖点才是不患的</b>。',
        '吸货时追求一个“绝对底部”——错：<b>吸货无所谓底部</b>，关键是成本，成本到 0 才拉抬。',
      ]},
      { type: 'exercises', title: '练习', items: [
        { q: '“玩死一个庄家”归根结底是哪两种方式？', a: '<b>时间上害死</b>（不断折腾让其洗盘洗到行情结束、垫高成本）与<b>空间上害死</b>（先养其骄，突然稳准狠砸出第一段，回接散户恐慌盘，塔山阻击战，最好 V 型反转）（第76课）。' },
        { q: '为什么大盘顶比个股顶复杂？', a: '因为<b>顶部是分力博弈的结果</b>：大盘集中其中的<b>分力更多</b>，合力更复杂，顶部不会是简单图形、破位前反复犹豫；个股（除非大型股票）<b>分力少、对比明显</b>，顶部就复杂不起来（第85课）。' },
        { q: '第87课说“真拉抬不需要花钱”，怎么理解？', a: '关键在<b>成本</b>：成本没到 0，没有大力拉抬的必要，要来回折腾把筹码成本洗到 0；成本到 0 后反复拉抬都变成<b>纯负数（负成本）</b>，拉抬自然不花钱——如果拉抬要花钱，说明价已高、资金流入跟不上，早该回头砸了（第87课）。' },
      ]},
    ],
  });
})();
