/* 第24章 利润率最大的操作模式 */
(function () {

  function optCh24() {
    const A = [10, 14, 12, 13.5, 16, 14, 17, 20, 23];        // 三买后继续延伸（利润最大）
    const B = [10, 14, 12, 13.5, 16, 14, 15, 13, 12.8];      // 三买后回抽中枢（盘整）
    const mk = (x0, x1, lo, hi, name) => [{ xAxis: x0, yAxis: lo, name }, { xAxis: x1, yAxis: hi }];
    const mp = (i, name, color, pos, arr) => ({ coord: [i, arr[i]], name, symbol: 'circle', symbolSize: 9, itemStyle: { color }, label: { show: true, color, fontSize: 10, position: pos, distance: 6, fontWeight: 'bold', formatter: function (p) { return p.name; } } });
    const seg = (x, y, name, color, pos) => ({ coord: [x, y], name, symbol: 'none', label: { show: true, color, fontSize: 12, fontWeight: 'bold', position: pos || 'top', formatter: function (p) { return p.name; } } });
    return {
      tooltip: { trigger: 'axis', axisPointer: { type: 'cross' } },
      grid: { left: 60, right: 90, top: 40, bottom: 40 },
      xAxis: { type: 'value', min: 0, max: 8, interval: 1 },
      yAxis: { type: 'value', scale: true, name: '价格' },
      series: [
        { name: '三买后继续延伸（利润最大）', type: 'line', data: A.map((p, i) => [i, p]),
          symbol: 'circle', symbolSize: 4, lineStyle: { width: 2.2, color: '#e74c3c' }, itemStyle: { color: '#e74c3c' },
          markArea: { silent: true, itemStyle: { color: 'rgba(37,99,235,0.10)' }, label: { show: true, position: 'insideTop', formatter: function (p) { return p.name || ''; }, color: '#2563eb', fontSize: 11 }, data: [mk(0, 3, 12, 13.5, '最后一个中枢 [12,13.5]')] },
          markLine: { silent: true, symbol: 'none', lineStyle: { color: '#2563eb', type: 'dashed', width: 1 }, label: { show: true, position: 'end', formatter: function (p) { return p.name; }, color: '#2563eb', fontSize: 10 }, data: [
            { yAxis: 13.5, name: 'ZG=13.5' },
            { yAxis: 12, name: 'ZD=12' },
          ] },
          markPoint: { data: [
            mp(0, '底 10', '#16a34a', 'bottom', A),
            mp(4, '离开 16', '#e74c3c', 'top', A),
            { coord: [5, 14], name: '第三类买点', symbol: 'pin', symbolSize: 44, itemStyle: { color: '#16a34a' }, label: { show: true, color: '#16a34a', fontSize: 11, fontWeight: 'bold', position: 'bottom', distance: 24, formatter: function (p) { return p.name; } } },
            seg(7, 22, '继续延伸 → 新高（利润最大）', '#e74c3c', 'top'),
          ] },
        },
        { name: '三买后回抽中枢（盘整）', type: 'line', data: B.map((p, i) => [i, p]),
          symbol: 'circle', symbolSize: 4, lineStyle: { width: 2, color: '#2563eb', type: 'dashed' }, itemStyle: { color: '#2563eb' },
          markPoint: { data: [
            seg(6.6, 13.4, '回抽中枢 → 盘整', '#2563eb', 'bottom'),
            mp(8, '回到中枢 12.8', '#2563eb', 'bottom', B),
          ] },
        },
      ],
    };
  }

  const figClassify = `
<div class="fig"><div class="lbl">围绕最后一个中枢的完全分类</div>
${drawZS([{ p: 11, tag: '底' }, { p: 13, tag: '顶' }, { p: 12, tag: '底' }, { p: 13.5, label: '当下(中)', color: '#6b7280', above: true }], [{ lo: 11.5, hi: 13, x0: 0, x1: 3, label: '中枢' }], { w: 44, h: 92 })}
<div class="cap">① 当下在中枢之中 → 延伸中，不操作</div><div style="margin:6px 0"></div>
${drawZS([{ p: 13, tag: '顶' }, { p: 11, tag: '底' }, { p: 12, tag: '顶' }, { p: 8.5, label: '当下(下)', color: '#16a34a', above: false }], [{ lo: 11, hi: 12.5, x0: 0, x1: 2, label: '中枢' }], { w: 44, h: 92 })}
<div class="cap">② 当下在中枢之下 → 看三卖是否出现</div><div style="margin:6px 0"></div>
${drawZS([{ p: 8, tag: '底' }, { p: 11, tag: '顶' }, { p: 10, tag: '底' }, { p: 14, label: '当下(上)', color: '#e74c3c', above: true }], [{ lo: 10, hi: 11, x0: 0, x1: 2, label: '中枢' }], { w: 44, h: 92 })}
<div class="cap">③ 当下在中枢之上 → 看三买是否出现</div></div>`;

  __chapters.push({
    id: 'ch24', vol: '卷五 · 分解与操作', title: '第24章 利润率最大的操作模式', source: '原文第49课',
    figures: [
      { kind: 'echarts', title: '最后一个中枢 + 三买后的两种演化', note: '先找到<b>最后一个中枢</b> [12,13.5]（蓝色矩形，ZG=13.5 / ZD=12）。次级别<b>向上离开</b>（12→16）后<b>回试不破 ZG</b>，形成<b>第三类买点</b>（绿色 pin，14）。此后<b>两条路</b>：<b>红色实线</b>——继续延伸出新中枢、新高，这是<b>利润最大</b>的持股段；<b>蓝色虚线</b>——不创新高、回抽落回中枢，转为<b>盘整</b>（此时先退出）。', option: optCh24 },
      { kind: 'html', title: '围绕最后一个中枢的三种当下位置', note: '操作的第一步是<b>完全分类</b>：打开走势图，找到当下之前的<b>最后一个操作级别中枢</b>，看当下处于中枢的<b>之中 / 之下 / 之上</b>。之中＝延伸不操作；之下＝看第三类卖点；之上＝看第三类买点。第二、三种又各自按“三买卖点是否已出现”再分两小类。', html: figClassify },
    ],
    sections: [
      { type: 'definition', title: '完全分类：三种当下位置', items: [
        { term: '① 先找最后一个中枢', text: '进到市场，打开走势图，<span class="hl">首先要找的是当下之前最后一个操作级别中枢</span>（如 30 分钟）。这个最后中枢<b>一定可以马上确认，无须任何预测</b>。换新股票时面对的也是同样的情况。', formula: '第一步 = 定位最后一个操作级别中枢', fig: mfig('最后一个中枢', drawZS([{ p: 8, tag: '底' }, { p: 12, tag: '顶' }, { p: 10, tag: '底' }, { p: 13, tag: '顶' }, { p: 11, tag: '底' }, { p: 13.5, label: '最后一个中枢', color: '#2563eb', above: true }], [{ lo: 11, hi: 13, x0: 0, x1: 4, label: '中枢' }], { w: 40, h: 100 }), '先确认当下之前的最后一个操作级别中枢') },
        { term: '② 当下在中枢之中', text: '当下在中枢里，因为此时<b>怎么演化都是对的</b>，<span class="hl">不操作是最好的操作</span>，等待它演化成第二、三类（之下/之上）。技术好者可判次级别的第二类买点（常在中枢中出现）参与。', fig: mfig('在中枢之中：不操作', drawZS([{ p: 11, tag: '底' }, { p: 13, tag: '顶' }, { p: 12, tag: '底' }, { p: 13.5, tag: '顶' }, { p: 12.5, label: '延伸中', color: '#6b7280', above: false }], [{ lo: 11.5, hi: 13, x0: 0, x1: 4, label: '中枢' }], { w: 40, h: 96 }), '中枢延伸中，不操作是最好的操作') },
        { term: '③ 当下在中枢之下', text: '分两小类：<b>1、未出现第三类卖点</b>——中枢震荡依旧，用<b>背驰比较力度</b>找向下离开段的买点（区间套定位）；<b>2、已出现第三类卖点</b>——中枢已结束，此后只形成新下跌中枢或更大中枢，<b>干脆不参与</b>。', fig: mfig('在中枢之下：看三卖', drawZS([{ p: 13, tag: '顶' }, { p: 11, tag: '底' }, { p: 12, tag: '顶' }, { p: 8.5, label: '三卖?', color: '#e74c3c', above: false }], [{ lo: 11, hi: 12.5, x0: 0, x1: 2, label: '中枢' }], { w: 40, h: 96 }), '向下离开，看第三类卖点是否出现') },
        { term: '④ 当下在中枢之上', text: '也分两小类：<b>1、未出现第三类买点</b>——不存在合适买点，等待；<b>2、已出现第三类买点</b>——若离买点形成不远可介入，<span class="hl">最好刚形成时介入</span>。若从买点起已走完次级别并出现盘整顶背驰，则后面是大级别盘整，须等待。', fig: mfig('在中枢之上：看三买', drawZS([{ p: 8, tag: '底' }, { p: 11, tag: '顶' }, { p: 10, tag: '底' }, { p: 14, label: '三买', color: '#16a34a', above: true }], [{ lo: 10, hi: 11, x0: 0, x1: 2, label: '中枢' }], { w: 40, h: 96 }), '向上离开后回试不破 ZG → 第三类买点') },
      ]},
      { type: 'definition', title: '两个利润最大定理', items: [
        { term: '① 第一利润最大定理（固定品种）', text: '对于<b>固定交易品种</b>、确定的操作级别，以下模式利润率最大：<b>只参与</b>确定级别的盘整与上涨；盘整用<b>中枢震荡</b>处理（上方减仓、下方加仓，保证成本降低、筹码不丢）；<b>三买后持股</b>直到新中枢出现再继续震荡；最后，中枢完成的向上移动出现<b>背驰</b>后抛清所有筹码，等待下一个买点。', formula: '利润率最大 = 只做盘整(震荡) + 上涨(三买后持股) + 背驰全抛', fig: mfig('三买后持股直到背驰', drawZS([{ p: 10, tag: '底' }, { p: 13, tag: '顶' }, { p: 11, tag: '底' }, { p: 14, label: '三买', color: '#16a34a', above: true }, { p: 16, tag: '顶' }, { p: 15, tag: '底' }, { p: 18, tag: '顶' }, { p: 17, tag: '底' }, { p: 19, label: '背驰全抛', color: '#e74c3c', above: true }], [{ lo: 11, hi: 13, x0: 0, x1: 2, label: '中枢' }], { w: 36, h: 100 }), '三买后满仓持股，向上移动背驰即全抛') },
        { term: '② 第二利润最大定理（换股）', text: '对于<b>不同交易品种</b>，更激进：<span class="hl">不参与中枢震荡，只在第三类买点买入，一旦形成新中枢就退出</span>。例如 30 分钟级别，中枢完成向上时一旦出现 5 分钟向下级别后，下一个 5 分钟向上<b>不能创新高或出现背驰/盘整背驰</b>，就一定要抛出——因为后面必有一个新的 30 分钟中枢。', formula: '换股模式 = 只做三买，形成新中枢即退出', fig: mfig('只在三买买入、新中枢退出', drawZS([{ p: 8, tag: '底' }, { p: 11, tag: '顶' }, { p: 10, tag: '底' }, { p: 14, label: '三买', color: '#16a34a', above: true }, { p: 15, tag: '顶' }, { p: 13, tag: '底' }, { p: 15.5, tag: '顶' }, { p: 14, label: '新中枢→退', color: '#e74c3c', above: true }], [{ lo: 10, hi: 11, x0: 0, x1: 2, label: '原中枢' }], { w: 36, h: 100 }), '三买买入，一旦形成新中枢立即退出') },
        { term: '③ 震荡盘整背驰 vs 向上移动背驰', text: '必须严格区分两种“背驰段”：<b>中枢震荡中</b>出现的类似盘整背驰段，与<b>中枢完成向上移动</b>的背驰段，二者<b>分别在第三类买点的前后</b>。三买之前中枢未破坏，属震荡；三买之后中枢完成，不再有震荡。弄混了会误判买卖点。', fig: mfig('三买前震荡 / 三买后移动', drawZS([{ p: 10, tag: '底' }, { p: 12, tag: '顶' }, { p: 11, tag: '底' }, { p: 13, tag: '顶' }, { p: 11.5, label: '三买前·震荡', color: '#6b7280', above: false }, { p: 15, tag: '顶' }, { p: 14, tag: '底' }, { p: 16, label: '三买后·移动', color: '#e74c3c', above: true }], [{ lo: 11, hi: 12.5, x0: 0, x1: 3, label: '中枢' }], { w: 36, h: 100 }), '三买前=震荡（可短差）、三买后=移动（须满仓）') },
      ]},
      { type: 'motivation', title: '从“预测”走向“完全分类”', text: '第 49 课把操作浓缩成一句话：<span class="hl">打开走势图，找最后一个中枢，看当下在之中、之下还是之上</span>。它不是预测涨跌，而是对<b>所有可能情况做完全分类</b>，并为每一类配好对策。利润最大的关键不在“看得准”，而在<b>只做自己级别的盘整与上涨、三买后敢于满仓持股、背驰后手起刀落全抛</b>——纪律 + 分类，才是稳定利润的来源。' },
      { type: 'pitfalls', title: '常见误区', items: [
        '没有先定<b>操作级别</b>就去“找中枢”——不同级别有完全不同的中枢与买卖点。',
        '把“中枢震荡差价”做到<b>中枢向上移动</b>里——中枢向上移动时必须<b>满仓</b>，不该做差价。',
        '混淆<b>震荡中的盘整背驰</b>与<b>向上移动的背驰</b>——两者分别在第三类买点前后，意义完全不同。',
        '参与<b>操作级别及以上的下跌</b>或超过操作级别的盘整——这种习惯必须戒掉。',
      ]},
      { type: 'exercises', title: '练习', items: [
        { q: '拿到一只新股票，第一步应该做什么？', a: '先确定<b>操作级别</b>（如 30 分钟），然后找到<b>当下之前最后一个该级别的中枢</b>，判断当下处于中枢之中、之下还是之上，再据完全分类决定对策。' },
        { q: '最后一个中枢出现第三类买点后，走势有哪两种演化？各应怎么操作？', a: '① <b>继续延伸</b>出新中枢、新高——利润最大，<b>满仓持股</b>直到向上移动背驰全抛；② <b>回抽中枢</b>转为盘整——不创新高即先退出，等盘整结束再参与。' },
        { q: '为什么“中枢震荡差价”是唯一最安全的差价？', a: '因为围绕<b>操作级别中枢</b>的震荡差价肯定能做出来、且<b>绝对不会丢失筹码</b>（上方减仓、下方加仓）；而中枢完成向上移动时的差价则可能踏空，所以那时必须满仓。' },
      ]},
    ],
  });
})();
