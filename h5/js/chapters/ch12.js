/* 第12章 区间套 */
(function () {

  function optCh12() {
    const big = [10, 14, 12, 15, 13, 18, 16, 19, 17, 21];
    const small = [17, 18, 17.5, 19, 18.5, 20, 19.5, 21];
    const mk = (x0, x1, lo, hi, name) => [{ xAxis: x0, yAxis: lo, name }, { xAxis: x1, yAxis: hi }];
    return {
      tooltip: { trigger: 'axis', axisPointer: { type: 'cross' } },
      grid: [
        { left: 60, right: 40, top: 40, height: 180 },
        { left: 60, right: 40, top: 280, height: 140 },
      ],
      xAxis: [
        { type: 'value', gridIndex: 0, min: 0, max: 9, interval: 1, name: '大级别', nameLocation: 'middle', nameGap: 28 },
        { type: 'value', gridIndex: 1, min: 0, max: 7, interval: 1, name: '次级别（放大 c 段）', nameLocation: 'middle', nameGap: 28 },
      ],
      yAxis: [
        { type: 'value', gridIndex: 0, scale: true },
        { type: 'value', gridIndex: 1, scale: true },
      ],
      series: [
        {
          name: '大级别', type: 'line', xAxisIndex: 0, yAxisIndex: 0, data: big.map((p, i) => [i, p]),
          symbol: 'circle', symbolSize: 5, lineStyle: { width: 2, color: '#1f2937' }, itemStyle: { color: '#1f2937' },
          markArea: {
            silent: true, itemStyle: { color: 'rgba(37,99,235,0.10)' },
            label: { show: true, position: 'insideTop', formatter: function (p) { return p.name || ''; }, color: '#2563eb', fontSize: 11 },
            data: [mk(1, 4, 13, 14, '中枢A'), mk(5, 8, 17, 18, '中枢B'), mk(8, 9, 17, 21, 'c段背驰')],
          },
        },
        {
          name: '次级别', type: 'line', xAxisIndex: 1, yAxisIndex: 1, data: small.map((p, i) => [i, p]),
          symbol: 'circle', symbolSize: 5, lineStyle: { width: 2, color: '#7c3aed' }, itemStyle: { color: '#7c3aed' },
          markPoint: {
            data: [{ coord: [7, 21], name: '区间套定位的转折点', symbol: 'pin', symbolSize: 42, itemStyle: { color: '#e74c3c' }, label: { show: true, formatter: function (p) { return p.name; }, color: '#e74c3c', fontSize: 10, fontWeight: 'bold' } }],
          },
        },
      ],
    };
  }

  function taoSVG() {
    const W = 460, H = 260, cx = W / 2, cy = H / 2;
    const levels = [
      { w: 440, h: 210, label: '第一重背驰段（日线）', f: '#fef3c7', s: '#f59e0b' },
      { w: 300, h: 145, label: '第二重背驰段（30分钟）', f: '#e0e7ff', s: '#2563eb' },
      { w: 170, h: 85, label: '第三重（1分钟）', f: '#dcfce7', s: '#16a34a' },
    ];
    let s = `<svg viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" style="display:block;max-width:100%">`;
    levels.forEach(lv => {
      const x = cx - lv.w / 2, y = cy - lv.h / 2;
      s += `<rect x="${x}" y="${y}" width="${lv.w}" height="${lv.h}" rx="10" fill="${lv.f}" stroke="${lv.s}" stroke-width="1.5"/>`;
      s += `<text x="${cx}" y="${y + 18}" text-anchor="middle" font-size="12" fill="#1f2937">${lv.label}</text>`;
    });
    s += `<circle cx="${cx}" cy="${cy}" r="5" fill="#e74c3c"/>`;
    s += `<text x="${cx}" y="${cy - 14}" text-anchor="middle" font-size="12" fill="#e74c3c" font-weight="700">精确转折点</text>`;
    s += '</svg>';
    return s;
  }

  __chapters.push({
    id: 'ch12', title: '第12章 区间套', source: '原文第61、27、28课',
    figures: [
      { kind: 'echarts', title: '区间套定位：逐级缩小到转折点', note: '大级别上 c 段（17→21）是<b>背驰段</b>（创新高但力度弱）；把 c 段<b>放大到次级别</b>，内部又是一段逐级上涨、末端再背驰，最终把转折点<b>当下锁定在 21</b>。这就是“背驰段的背驰段的背驰段”逐级收敛的区间套定位。', option: optCh12 },
      { kind: 'html', title: '区间套 = 多重背驰段的嵌套', note: '像套娃一样，大级别背驰段里套着次级别背驰段、再套着更次级别背驰段，逐级收敛到<b>唯一的精确转折点</b>。第61课：72 点的精确定位，由“65 段背驰段的背驰段的背驰段”构成。', html: taoSVG() },
    ],
    sections: [
      { type: 'definition', title: '区间套定位方法', items: [
        { term: '① 区间套的数学思想（第61课）', text: '借用数学分析的<b>区间套</b>：一列逐级嵌套、长度趋于 0 的闭区间，收敛到<b>唯一一个点</b>。用在走势上，就是用<b>不同级别的背驰</b>逐级缩小范围，最终<b>精确定位走势的转折点</b>。', formula: '区间套：闭区间逐级嵌套 → 收敛到唯一一点（转折点）' },
        { term: '② 先假设背驰段，再逐级验证（第61课）', text: '要比较力度，先搞清楚<b>是哪两段比较</b>——只要围绕同一中枢的两段走势都可以比较力度。走势没走出来时，<b>先假设后一段进入背驰段</b>；一旦实际走出来力度大于前段，就断定背驰段不成立；否则<b>观察该段内部结构的背驰情况，逐次下去</b>，这就是区间套定位。' },
        { term: '③ 多重背驰段（第61课）', text: '第61课实例：65 开始的走势是<b>第一重</b>背驰段，69 开始的是<b>第二重</b>（背驰段的背驰段），71 开始是<b>第三重</b>，71 内部又背驰出现<b>第四重</b>。72 点的精确定位，就是由“背驰段的背驰段的背驰段的背驰段”构成的。', formula: '65段 ⊃ 69段 ⊃ 71段 ⊃ 72点（逐级收敛）' },
        { term: '④ 区间套可“当下”进行（第61课）', text: '区间套定位不是事后看图说话，而是可以<b>当下进行</b>：在没有证据否定背驰之前，就一直观察当前段内部结构的背驰情况，逐级定位，当下锁定转折点。' },
        { term: '⑤ 操作级别决定精度（第61课）', text: '<span class="hl">你的操作级别决定你看哪一级的背驰。</span>按 1 分钟级别操作，1 分钟顶背驰就该走；按月线操作，1 分钟的所有震荡都可以忽略。级别越高，越能容忍小级别波动，也越接近“巴菲特”式的耐心。' },
      ]},
      { type: 'definition', title: '区间套的应用：三重背驰定大底', items: [
        { term: '① 大级别盘整背驰 + 区间套（第27课）', text: '判断<b>历史性底部</b>，要看<b>大级别</b>（日线、周线甚至月线）的<b>盘整背驰</b>，再用区间套逐级缩小到小级别背驰，精确定位大底。级别越大、背驰越多重，底部信号越可靠。' },
        { term: '② 三重背驰（第28课）', text: '用<b>三个级别</b>（如日线、30 分钟、1 分钟）的背驰依次嵌套确认，三重背驰共振时，转折的把握最大。它把“大概见底”变成“当下这一点的精确买点”。' },
        { term: '③ 区间套 + 三类买卖点', text: '区间套是三类买卖点（尤其<b>第一类买卖点</b>）的<b>精确落点工具</b>：背驰定理告诉我们“必然要转折”，区间套告诉我们“转折就在当下这一点”。', },
      ]},
      { type: 'motivation', title: '为什么需要区间套', text: '背驰只说“力度减弱、要转折了”，但<b>具体在哪一点</b>转折，光看一个级别是模糊的。区间套把背驰<b>从“大概”变成“精确”</b>：大级别定位“哪一段在背驰”，小级别定位“这段内部哪一点转折”。它是把理论落到<b>当下可执行</b>的最后一块拼图。' },
      { type: 'pitfalls', title: '常见误区', items: [
        '把区间套简单等同于“<b>放大图看看</b>”（错：区间套是<b>背驰的逐级嵌套定位</b>，核心是每一级都验证力度）。',
        '忘了“<b>先假设背驰段</b>”——背驰段要边走边验证，一旦力度大于前段，背驰就不成立。',
        '用<b>小级别</b>背驰去指导<b>大级别</b>操作（或反之），忽略了“操作级别决定看哪一级”。',
        '以为区间套能<b>预测</b>转折（错：它是<b>当下定位</b>，随走势逐级确认，不是事前算命）。',
      ]},
      { type: 'exercises', title: '练习', items: [
        { q: '什么是“区间套定位”？它的数学原型是什么？', a: '用不同级别的<b>背驰逐级嵌套</b>、收敛到唯一的<b>精确转折点</b>。数学原型是<b>闭区间套定理</b>：逐级嵌套、长度趋于 0 的闭区间收敛到唯一一点。' },
        { q: '为什么第61课说“65 开始的走势可以先假设是进入背驰段”？', a: '因为 65 开始的走势<b>还没走完</b>，只能先假设它与前段（55-60）比较会背驰；等它实际走出来，若力度大于前段，就<b>否定</b>背驰段；若仍可能背驰，就<b>看它内部结构</b>逐级往下定位。' },
        { q: '你的操作级别和区间套有什么关系？', a: '<b>操作级别决定你看哪一级的背驰、用哪一级的区间套</b>：1 分钟级别看 1 分钟背驰并当下进出；月线级别则完全忽略 1 分钟震荡，只看月线级别的背驰与区间套。' },
      ]},
    ],
  });
})();
