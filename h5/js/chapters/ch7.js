/* 第7章 中枢 */
(function () {

  function optCh7() {
    const pts = [10, 16, 11, 15]; // 上-下-上 三段次级别走势的端点
    const ZD = 11, ZG = 15, GG = 16, DD = 10;
    return {
      tooltip: { trigger: 'axis', axisPointer: { type: 'cross' } },
      grid: { left: 48, right: 30, top: 24, bottom: 30 },
      xAxis: { type: 'value', min: 0, max: 3, interval: 1 },
      yAxis: { type: 'value', scale: true },
      series: [{
        name: '次级别走势', type: 'line', data: pts.map((p, i) => [i, p]), symbol: 'circle', symbolSize: 6,
        lineStyle: { color: '#1f2937', width: 2 }, itemStyle: { color: '#1f2937' },
        markArea: {
          silent: true, itemStyle: { color: 'rgba(37,99,235,0.10)' },
          label: { show: true, position: 'insideTop', formatter: '中枢 [ZD, ZG]', color: '#2563eb' },
          data: [[{ xAxis: 0, yAxis: ZD, name: 'ZD' }, { xAxis: 3, yAxis: ZG, name: 'ZG' }]],
        },
        markLine: {
          silent: true, symbol: 'none',
          label: { show: true, position: 'end', formatter: '{b}' },
          lineStyle: { type: 'dashed', width: 1 },
          data: [
            { yAxis: ZG, name: 'ZG=15（上沿）' },
            { yAxis: ZD, name: 'ZD=11（下沿）' },
            { yAxis: GG, name: 'GG=16（中枢内最高）', lineStyle: { color: '#e74c3c' } },
            { yAxis: DD, name: 'DD=10（中枢内最低）', lineStyle: { color: '#16a34a' } },
          ],
        },
      }],
    };
  }

  const figPanTrend = `
<div class="fig"><div class="lbl">盘整（只有一个中枢）</div>${drawZS([{p:10,tag:'底'},{p:16,tag:'顶'},{p:11,tag:'底'},{p:15,tag:'顶'},{p:12,tag:'底'},{p:14,tag:'顶'}], [{lo:11,hi:15,x0:0,x1:5}])}<div class="cap">反复围绕 [11,15] 震荡<br>始终只有一个中枢</div></div>
<div class="fig"><div class="lbl">趋势（两个同向中枢）</div>${drawZS([{p:10,tag:'底'},{p:14},{p:11},{p:13},{p:18},{p:22},{p:17},{p:21,tag:'顶'}], [{lo:11,hi:13,x0:0,x1:3},{lo:18,hi:21,x0:4,x1:7}])}<div class="cap">中枢1 [11,13] 与中枢2 [18,21]<br>同向且互不重叠，中间 13→18 为连接段 → 上涨</div></div>`;

  __chapters.push({
    id: 'ch7', title: '第7章 中枢', source: '原文第17、18、20、63课',
    figures: [
      { kind: 'echarts', title: '中枢区间：ZG / ZD / GG / DD', note: '三段<b>次级别走势</b>（上-下-上）的<b>重叠部分</b>就是中枢：<b>ZD</b>＝三个低点里的最高者，<b>ZG</b>＝三个高点里的最低者，蓝色区域就是中枢 <code>[ZD, ZG]</code>。<b>GG/DD</b> 是中枢区间内的最高/最低点。', option: optCh7 },
      { kind: 'html', title: '盘整 vs 趋势：中枢的个数', note: '<b>一个中枢</b>是盘整；<b>两个以上同向且互不重叠</b>的中枢是趋势（向上为上涨、向下为下跌）。趋势的两个中枢之间<b>绝对不允许</b>有任何瞬间波动重叠。', html: figPanTrend },
    ],
    sections: [
      { type: 'definition', title: '中枢的定义与区间', items: [
        { term: '① 中枢的定义（第17课）', text: '某级别走势类型中，<span class="hl">被至少三个连续次级别走势类型所重叠的部分</span>，称为缠中说禅走势中枢。换言之，中枢就是<b>至少三个连续次级别走势类型</b>的重叠部分。' },
        { term: '② 递归到底（第17课）', text: '次级别不能无限细分。对<b>最低不可分解级别</b>，中枢不用“次级别走势类型”定义，而定义为<b>至少三个该级别单位 K 线的重叠部分</b>。实际操作一般把最低级别设为 1 分钟或 5 分钟线。' },
        { term: '③ 中枢的数学表达式（第20课）', text: '设三段次级别走势 A、B、C 的高/低点分别为 a1/a2、b1/b2、c1/c2，则中枢区间为 <code>[max(a2,b2,c2), min(a1,b1,c1)]</code>。', formula: '中枢区间 = [ max(三个低点), min(三个高点) ]' },
        { term: '④ ZG / ZD / GG / DD（第20课）', text: '把与中枢方向一致的次级别走势段记为 Z 段（Zn），其高/低点为 gn/dn：<br><span class="kw">ZG</span> = min(g1,g2)＝中枢<b>上沿</b>；<span class="kw">ZD</span> = max(d1,d2)＝中枢<b>下沿</b>；<span class="kw">GG</span> = max(gn)＝中枢内最高；<span class="kw">DD</span> = min(dn)＝中枢内最低。区间 <code>[ZD, ZG]</code> 就是中枢。', formula: 'ZG = min(g1,g2)　ZD = max(d1,d2)<br>GG = max(gn)　　DD = min(dn)' },
        { term: '⑤ 盘整与趋势（第18课）', text: '<span class="kw">盘整</span>：某完成的走势类型<b>只包含一个</b>中枢。<br><span class="kw">趋势</span>：某完成的走势类型<b>至少包含两个以上依次同向</b>的中枢，方向向上称上涨、向下称下跌。<b>注意</b>：趋势中的多个中枢之间<b>绝对不存在重叠</b>（包括任何瞬间波动）。' },
        { term: '⑥ 基本原理二（第18课）', text: '<span class="hl">任何级别任何完成的走势类型，必然包含一个以上的中枢</span>。（没有中枢的图形只有“一次向上后永远向下”或反之，讨论的前提是该走势可不断延续。）' },
        { term: '⑦ 走势分解定理（第18课）', text: '<b>分解定理一</b>：任何级别的任何走势，都可分解为同级别“盘整”“下跌”“上涨”三种走势类型的连接。<br><b>分解定理二</b>：任何级别的任何走势类型，都至少由三段以上次级别走势类型构成。' },
      ]},
      { type: 'definition', title: '中枢的维持、破坏与级别', items: [
        { term: '① 中枢定理一（第18课）', text: '在<b>趋势</b>中，连接两个同级别中枢的，必然是<b>次级别以下</b>级别的走势类型。（连接段级别越低，力度往往越大——跳空缺口就是最低级别。）' },
        { term: '② 中枢定理二（第18课）', text: '在<b>盘整</b>中，无论离开还是返回中枢的走势类型，都必然是<b>次级别以下</b>的。（若离开/返回是同级别走势，就意味着形成了新的中枢。）' },
        { term: '③ 中枢定理三（第18课）', text: '某级别中枢的<b>破坏</b>，当且仅当：<span class="hl">一个次级别走势离开中枢后，其后的次级别回抽走势不重新回到中枢内</span>。破坏组合只有三种：趋势+盘整、趋势+反趋势、盘整+反趋势（最有力的是“趋势+盘整”）。' },
        { term: '④ 中枢延伸 vs 级别扩张（第20课）', text: '中枢形成后有两种情况：<b>① 延伸</b>——围绕中枢的次级波动始终触及中枢区间，不产生新中枢；<b>② 产生新中枢</b>。而<b>级别扩张</b>是第三种：围绕新中枢的波动与围绕前中枢的某个波动区间<b>产生重叠</b>，由此形成更大级别中枢。' },
        { term: '⑤ 级别延续定理一（第20课）', text: '在更大级别中枢产生<b>之前</b>，该级别走势类型将<b>延续</b>——只能是该级别盘整或趋势的延续。（例如连跌再多，只要没形成更高级别中枢，就难言结束。）' },
        { term: '⑥ 级别延续定理二（第20课）', text: '更大级别中枢产生，<b>当且仅当</b>围绕连续两个同级别中枢产生的波动区间<b>产生重叠</b>。（两个“恒星系统”要组成更大系统，必先外围行星发生关系。）' },
        { term: '⑦ 第三类买卖点（第20课，详见第14章）', text: '次级别走势<b>向上离开</b>中枢后，次级别回试<b>不跌破 ZG</b>，构成第三类买点；<b>向下离开</b>后，次级别回抽<b>不升破 ZD</b>，构成第三类卖点。' },
      ]},
      { type: 'motivation', title: '为什么中枢是“核心中的核心”', text: '第17课明确：<b>中枢是比盘整、趋势更基本的概念</b>。有了中枢，盘整（一个中枢）与趋势（两个同向不重叠中枢）才有了最精确的定义；“走势类型延伸是否结束”的关键，就在于<b>是否产生新中枢</b>。中枢是买卖点（尤其第三类买卖点）、背驰、级别递归的共同支点。' },
      { type: 'pitfalls', title: '常见误区', items: [
        '用<b>本级别 K 线重叠</b>去定义中枢——中枢是<b>次级别走势类型</b>的重叠（只有最低级别才用 K 线重叠）。',
        '把趋势的两个中枢画成<b>有重叠</b>——趋势要求多个中枢<b>绝对不重叠</b>（含瞬间波动）。',
        '混淆<b>中枢延伸</b>（不产生新中枢）与<b>级别扩张</b>（波动重叠产生更大级别中枢）。',
        '把中枢当成简单<b>横盘箱体</b>——中枢有级别、由次级别递归而来，是“走势的能量结构”。',
      ]},
      { type: 'exercises', title: '练习', items: [
        { q: '三段次级别走势 A[10,16]、B[11,15]、C[12,17]，中枢区间是多少？', a: '区间下沿 ZD = max(10,11,12)=12，上沿 ZG = min(16,15,17)=15，所以中枢区间为 <code>[12, 15]</code>。' },
        { q: '一个走势里有三个中枢，第一个和第二个不重叠，第二个和第三个也不重叠，但第一个和第三个有重叠，这是什么？', a: '这是<b>级别扩张</b>：围绕连续两个同级别中枢的波动区间产生重叠（第20课级别延续定理二），正在形成<b>更大级别中枢</b>，而不是一个简单的本级别趋势。' },
      ]},
    ],
  });
})();
