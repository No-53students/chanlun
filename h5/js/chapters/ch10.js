/* 第7章 中枢 */
(function () {

  // 小图容器：标签 + SVG + 图注
  const mfig = (lbl, svg, cap) => `<div class="fig"><div class="lbl">${lbl}</div>${svg}<div class="cap">${cap}</div></div>`;

  // ---- 主图1：ECharts 中枢 ZG / ZD / GG / DD ----
  function optCh7() {
    const pts = [10, 16, 11, 15]; // 上-下-上 三段次级别走势的端点
    const ZD = 11, ZG = 15, GG = 16, DD = 10;
    const mp = (i, name, color, pos) => ({ coord: [i, pts[i]], name, symbol: 'circle', symbolSize: 8, itemStyle: { color }, label: { show: true, color, fontSize: 10, position: pos, distance: 4, fontWeight: 'bold' } });
    const seg = (x, y, name, color, pos) => ({ coord: [x, y], name, symbol: 'none', label: { show: true, color, fontSize: 11, fontWeight: 'bold', position: pos } });
    return {
      tooltip: { trigger: 'axis', axisPointer: { type: 'cross' } },
      grid: { left: 48, right: 110, top: 30, bottom: 30 },
      xAxis: { type: 'value', min: 0, max: 3, interval: 1 },
      yAxis: { type: 'value', scale: true },
      series: [{
        name: '次级别走势', type: 'line', data: pts.map((p, i) => [i, p]), symbol: 'circle', symbolSize: 6,
        lineStyle: { color: '#1f2937', width: 2 }, itemStyle: { color: '#1f2937' },
        markArea: {
          silent: true, itemStyle: { color: 'rgba(37,99,235,0.10)' },
          label: { show: true, position: 'insideTop', formatter: function (p) { return p.name || '中枢 [11,15]'; }, color: '#2563eb', fontSize: 11 },
          data: [[{ xAxis: 0, yAxis: ZD, name: '中枢 [11,15]' }, { xAxis: 3, yAxis: ZG }]],
        },
        markLine: {
          silent: true, symbol: 'none',
          label: { show: true, position: 'end', formatter: '{b}' },
          lineStyle: { type: 'dashed', width: 1 },
          data: [
            { yAxis: ZG, name: 'ZG=15（上沿=min(高点)）' },
            { yAxis: ZD, name: 'ZD=11（下沿=max(低点)）' },
            { yAxis: GG, name: 'GG=16（中枢内最高）', lineStyle: { color: '#e74c3c' } },
            { yAxis: DD, name: 'DD=10（中枢内最低）', lineStyle: { color: '#16a34a' } },
          ],
        },
        markPoint: {
          data: [
            mp(0, '底分型 DD=10', '#16a34a', 'bottom'),
            mp(1, '顶分型 GG=16', '#e74c3c', 'top'),
            mp(2, '底分型 ZD=11', '#16a34a', 'bottom'),
            mp(3, '顶分型 ZG=15', '#e74c3c', 'top'),
            seg(0.5, 14.5, '①上', '#1f2937', 'top'),
            seg(1.5, 11.5, '②下', '#1f2937', 'bottom'),
            seg(2.5, 14.5, '③上', '#1f2937', 'top'),
          ],
        },
      }],
    };
  }

  // ---- 主图2：盘整 vs 趋势（增强详细标注）----
  const figPanTrend = `
<div class="fig" style="min-width:260px"><div class="lbl">盘整：只有一个中枢</div>${drawZS(
  [{ p: 10, tag: '底' }, { p: 16, tag: '顶' }, { p: 11, tag: '底' }, { p: 15, tag: '顶' }, { p: 12, tag: '底' }, { p: 14, tag: '顶' }],
  [{ lo: 11, hi: 15, x0: 0, x1: 5, label: '唯一的盘整中枢 [11,15]' }],
  { zgzd: true, w: 52, h: 140 }
)}<div class="cap">反复围绕 [11,15] 震荡，<br>始终只有一个中枢 → <b>盘整</b></div></div>
<div class="fig" style="min-width:300px"><div class="lbl">趋势：两个同向中枢（上涨）</div>${drawZS(
  [{ p: 10, tag: '底' }, { p: 14 }, { p: 11 }, { p: 13 }, { p: 18, label: '连接段', color: '#2563eb', above: true }, { p: 22, tag: '顶' }, { p: 17 }, { p: 21, tag: '顶' }],
  [{ lo: 11, hi: 13, x0: 0, x1: 3, label: '中枢1 [11,13]' }, { lo: 18, hi: 21, x0: 4, x1: 7, label: '中枢2 [18,21]' }],
  { zgzd: true, w: 52, h: 140 }
)}<div class="cap">中枢1[11,13] 与中枢2[18,21]<br>同向且<b>互不重叠</b>，13→18 为连接段 → <b>上涨</b></div></div>`;

  // ---- 讲解点小图 ----

  // ① 中枢定义：三段次级别重叠
  const figDef = mfig('三段次级别走势重叠',
    drawZS([{ p: 10, label: '低1', color: '#16a34a' }, { p: 16, label: '高1', color: '#e74c3c' }, { p: 11, label: '低2', color: '#16a34a' }, { p: 15, label: '高2', color: '#e74c3c' }],
      [{ lo: 11, hi: 15, x0: 0, x1: 3, label: '中枢' }], { zgzd: true, w: 42, h: 104 }),
    '上-下-上三段的重叠区间 = 中枢');

  // ② 递归到底：最低级别用单位 K 线重叠
  const figRecur = mfig('最低级别：三根单位 K 线重叠',
    klineSVG([mk(10, 13), mk(11, 14), mk(12, 13.5)], { w: 42, h: 90 }),
    '三根 K 线都有 [12,13] 这一段 → 该重叠 = 最低级别中枢');

  // ③ 数学表达式：三段高低点
  const figFormula = mfig('中枢区间 = [max(低点), min(高点)]',
    drawZS([{ p: 10, label: 'a2', color: '#16a34a' }, { p: 16, label: 'a1', color: '#e74c3c' }, { p: 11, label: 'b2', color: '#16a34a' }, { p: 15, label: 'b1', color: '#e74c3c' }, { p: 12, label: 'c2', color: '#16a34a' }, { p: 17, label: 'c1', color: '#e74c3c' }],
      [{ lo: 12, hi: 15, x0: 0, x1: 5, label: '中枢' }], { zgzd: true, w: 40, h: 108 }),
    'A[10,16] B[11,15] C[12,17]<br>中枢 = [max(10,11,12), min(16,15,17)] = [12,15]');

  // ④ ZG / ZD / GG / DD
  const figZGZD = mfig('ZG / ZD / GG / DD 四值',
    drawZS([{ p: 10, label: 'DD', color: '#16a34a' }, { p: 16, label: 'GG', color: '#e74c3c', above: true }, { p: 11, label: 'd2', color: '#16a34a' }, { p: 15, label: 'g2', color: '#e74c3c', above: true }],
      [{ lo: 11, hi: 15, x0: 0, x1: 3, label: '[ZD,ZG]' }], { zgzd: true, w: 42, h: 108 }),
    'ZG=min(高点) 上沿、ZD=max(低点) 下沿<br>GG=最高点、DD=最低点');

  // ⑤ 盘整 vs 趋势（迷你）
  const figPTmini = mfig('一个中枢 vs 两个中枢',
    drawZS([{ p: 10 }, { p: 15 }, { p: 11 }, { p: 14 }, { p: 12 }], [{ lo: 11, hi: 14, x0: 0, x1: 4, label: '盘整' }], { w: 38, h: 90 })
    + '<div style="margin-top:6px"></div>'
    + drawZS([{ p: 10 }, { p: 14 }, { p: 11 }, { p: 13 }, { p: 18 }, { p: 21 }, { p: 17 }], [{ lo: 11, hi: 13, x0: 0, x1: 3, label: '中枢1' }, { lo: 18, hi: 21, x0: 4, x1: 6, label: '中枢2' }], { w: 38, h: 90 }),
    '上：一个中枢=盘整；下：两个同向不重叠中枢=趋势');

  // ⑥ 基本原理二：有中枢 vs 无中枢
  const figBasic2 = mfig('有中枢 vs 无中枢',
    '<div style="display:flex;gap:18px;align-items:flex-end">'
    + drawZS([{ p: 10 }, { p: 14 }, { p: 11 }, { p: 13 }], [{ lo: 11, hi: 13, x0: 0, x1: 3, label: '中枢' }], { w: 34, h: 80 })
    + drawZS([{ p: 10 }, { p: 18 }, { p: 16 }, { p: 20 }], [], { w: 34, h: 80 })
    + '</div>',
    '左：有中枢（可延续）；右：单边无重叠（一次向上后永远向下，讨论前提不成立）');

  // ⑦ 走势分解定理：三种走势类型连接
  const figDecompose = mfig('任意走势 = 盘整/上涨/下跌 的连接',
    drawZS([{ p: 10, label: '盘整' }, { p: 14 }, { p: 11 }, { p: 13, label: '下跌', color: '#16a34a' }, { p: 8, label: '底', color: '#16a34a' }, { p: 12, label: '上涨' }, { p: 16, label: '顶', color: '#e74c3c' }],
      [{ lo: 11, hi: 13, x0: 0, x1: 3, label: '盘整中枢' }], { w: 40, h: 100 }),
    '盘整 + 下跌 + 上涨 依次连接<br>任何走势都可这样分解');

  // Section2 小图

  // 定理一：趋势中连接段是次级别以下
  const figThm1 = mfig('连接段级别 < 中枢级别',
    drawZS([{ p: 10, label: '底' }, { p: 14 }, { p: 11 }, { p: 13, label: '连接段(次级别以下)', color: '#2563eb', above: true }, { p: 18 }, { p: 22, label: '顶', color: '#e74c3c' }, { p: 17 }],
      [{ lo: 11, hi: 13, x0: 0, x1: 3, label: '中枢1' }, { lo: 18, hi: 21, x0: 4, x1: 6, label: '中枢2' }], { w: 40, h: 104 }),
    '两个中枢之间用一段“次级别以下”走势相连<br>（跳空缺口 = 最低级别连接）');

  // 定理二：盘整离开/返回是次级别以下
  const figThm2 = mfig('盘整：离开/返回都次级别以下',
    drawZS([{ p: 10 }, { p: 15, label: '离开(次级以下)', color: '#2563eb', above: true }, { p: 12, label: '返回(次级以下)', color: '#2563eb', above: true }, { p: 13 }, { p: 11 }],
      [{ lo: 11, hi: 13, x0: 0, x1: 4, label: '盘整中枢' }], { w: 40, h: 100 }),
    '离开、返回中枢的走势若与中枢同级别，<br>就等于形成了新中枢');

  // 定理三：破坏 = 离开后回抽不回中枢
  const figThm3 = mfig('中枢破坏：回抽不重回中枢',
    drawZS([{ p: 10, label: '底', color: '#16a34a' }, { p: 15, label: '离开', color: '#e74c3c', above: true }, { p: 13, label: '回抽不回', color: '#2563eb', above: true }, { p: 17, label: '顶', color: '#e74c3c' }],
      [{ lo: 11, hi: 13, x0: 0, x1: 3, label: '原中枢' }], { w: 42, h: 104 }),
    '离开后回抽低点 13 不落回中枢 [11,13]<br>→ 中枢被破坏，走势升级');

  // 延伸 vs 级别扩张
  const figExtend = mfig('中枢延伸：始终不产生新中枢',
    drawZS([{ p: 10 }, { p: 15 }, { p: 11 }, { p: 14 }, { p: 12 }, { p: 13.5 }, { p: 11.5 }, { p: 13 }],
      [{ lo: 11, hi: 14, x0: 0, x1: 7, label: '中枢延伸（9 段以内）' }], { w: 34, h: 96 }),
    '围绕中枢的次级波动始终触及中枢区间，<br>不产生新中枢 → 级别不变');
  const figExpand = mfig('级别扩张：波动重叠成更大中枢',
    drawZS([{ p: 10 }, { p: 14 }, { p: 11 }, { p: 13 }, { p: 12 }, { p: 16 }, { p: 12.5 }, { p: 15 }],
      [{ lo: 11, hi: 13, x0: 0, x1: 3, label: '前中枢' }, { lo: 13, hi: 15, x0: 4, x1: 7, label: '新中枢' }], { w: 34, h: 96 }),
    '两个中枢的波动区间产生重叠<br>→ 形成更大级别中枢');
  const figExtendExpand = '<div class="fig"><div class="lbl">延伸 vs 级别扩张（对比）</div>'
    + drawZS([{ p: 10 }, { p: 15 }, { p: 11 }, { p: 14 }, { p: 12 }, { p: 13.5 }, { p: 11.5 }, { p: 13 }],
        [{ lo: 11, hi: 14, x0: 0, x1: 7, label: '中枢延伸（不产生新中枢）' }], { w: 34, h: 96 })
    + '<div class="cap">上：延伸——级别不变</div><div style="margin-top:8px"></div>'
    + drawZS([{ p: 10 }, { p: 14 }, { p: 11 }, { p: 13 }, { p: 12 }, { p: 16 }, { p: 12.5 }, { p: 15 }],
        [{ lo: 11, hi: 13, x0: 0, x1: 3, label: '前中枢' }, { lo: 13, hi: 15, x0: 4, x1: 7, label: '新中枢' }], { w: 34, h: 96 })
    + '<div class="cap">下：扩张——两个中枢波动重叠 → 更大级别中枢</div></div>';

  // 级别延续定理二：两个中枢波动重叠 → 大级别中枢
  const figCont2 = mfig('两个中枢波动重叠 → 更大级别中枢',
    drawZS([{ p: 10 }, { p: 14 }, { p: 11 }, { p: 13 }, { p: 12 }, { p: 16 }, { p: 12.5 }, { p: 15 }],
      [{ lo: 11, hi: 13, x0: 0, x1: 3, label: '中枢A' }, { lo: 13, hi: 15, x0: 4, x1: 7, label: '中枢B' }, { lo: 11, hi: 15, x0: 0, x1: 7, label: '大级别中枢' }], { w: 34, h: 100 }),
    '中枢A、中枢B 的波动区间 [12,13] 重叠<br>→ 产生更大级别中枢');

  // 第三类买卖点
  const figBS3 = mfig('第三类买卖点',
    drawZS([{ p: 10, label: '底', color: '#16a34a' }, { p: 15, label: '离开', color: '#e74c3c', above: true }, { p: 13, label: '3买', color: '#16a34a', above: true }, { p: 17, label: '顶', color: '#e74c3c', above: true }],
      [{ lo: 11, hi: 13, x0: 0, x1: 3, label: '中枢' }], { w: 42, h: 104 }),
    '向上离开后回试不跌破 ZG → <b>第三类买点</b><br>（向下离开后回抽不升破 ZD → 第三类卖点）');

  __chapters.push({
    id: 'ch10', vol: '卷三 · 中枢与走势', title: '第10章 中枢', source: '原文第17、18、20、63课',
    figures: [
      { kind: 'echarts', title: '中枢区间：ZG / ZD / GG / DD', note: '三段<b>次级别走势</b>（上-下-上，四个端点低1→高1→低2→高2）的<b>重叠部分</b>就是中枢：<b>ZD</b>＝三个低点里的最高者，<b>ZG</b>＝三个高点里的最低者，蓝色区域就是中枢 <code>[ZD, ZG]</code>。<b>GG/DD</b> 是中枢区间内的最高/最低点。', option: optCh7 },
      { kind: 'html', title: '盘整 vs 趋势：中枢的个数', note: '<b>一个中枢</b>是盘整；<b>两个以上同向且互不重叠</b>的中枢是趋势（向上为上涨、向下为下跌）。趋势的两个中枢之间<b>绝对不允许</b>有任何瞬间波动重叠，中间用一段<b>次级别以下</b>的连接段相连。', html: figPanTrend },
    ],
    sections: [
      { type: 'definition', title: '中枢的定义与区间', items: [
        { term: '① 中枢的定义（第17课）', text: '某级别走势类型中，<span class="hl">被至少三个连续次级别走势类型所重叠的部分</span>，称为缠中说禅走势中枢。换言之，中枢就是<b>至少三个连续次级别走势类型</b>的重叠部分。', fig: figDef },
        { term: '② 递归到底（第17课）', text: '次级别不能无限细分。对<b>最低不可分解级别</b>，中枢不用“次级别走势类型”定义，而定义为<b>至少三个该级别单位 K 线的重叠部分</b>。实际操作一般把最低级别设为 1 分钟或 5 分钟线。', fig: figRecur },
        { term: '③ 中枢的数学表达式（第20课）', text: '设三段次级别走势 A、B、C 的高/低点分别为 a1/a2、b1/b2、c1/c2，则中枢区间为 <code>[max(a2,b2,c2), min(a1,b1,c1)]</code>。', formula: '中枢区间 = [ max(三个低点), min(三个高点) ]', fig: figFormula },
        { term: '④ ZG / ZD / GG / DD（第20课）', text: '把与中枢方向一致的次级别走势段记为 Z 段（Zn），其高/低点为 gn/dn：<br><span class="kw">ZG</span> = min(g1,g2)＝中枢<b>上沿</b>；<span class="kw">ZD</span> = max(d1,d2)＝中枢<b>下沿</b>；<span class="kw">GG</span> = max(gn)＝中枢内最高；<span class="kw">DD</span> = min(dn)＝中枢内最低。区间 <code>[ZD, ZG]</code> 就是中枢。', formula: 'ZG = min(g1,g2)　ZD = max(d1,d2)<br>GG = max(gn)　　DD = min(dn)', fig: figZGZD },
        { term: '⑤ 盘整与趋势（第18课）', text: '<span class="kw">盘整</span>：某完成的走势类型<b>只包含一个</b>中枢。<br><span class="kw">趋势</span>：某完成的走势类型<b>至少包含两个以上依次同向</b>的中枢，方向向上称上涨、向下称下跌。<b>注意</b>：趋势中的多个中枢之间<b>绝对不存在重叠</b>（包括任何瞬间波动）。', fig: figPTmini },
        { term: '⑥ 基本原理二（第18课）', text: '<span class="hl">任何级别任何完成的走势类型，必然包含一个以上的中枢</span>。（没有中枢的图形只有“一次向上后永远向下”或反之，讨论的前提是该走势可不断延续。）', fig: figBasic2 },
        { term: '⑦ 走势分解定理（第18课）', text: '<b>分解定理一</b>：任何级别的任何走势，都可分解为同级别“盘整”“下跌”“上涨”三种走势类型的连接。<br><b>分解定理二</b>：任何级别的任何走势类型，都至少由三段以上次级别走势类型构成。', fig: figDecompose },
      ]},
      { type: 'definition', title: '中枢的维持、破坏与级别', items: [
        { term: '① 中枢定理一（第18课）', text: '在<b>趋势</b>中，连接两个同级别中枢的，必然是<b>次级别以下</b>级别的走势类型。（连接段级别越低，力度往往越大——跳空缺口就是最低级别。）', fig: figThm1 },
        { term: '② 中枢定理二（第18课）', text: '在<b>盘整</b>中，无论离开还是返回中枢的走势类型，都必然是<b>次级别以下</b>的。（若离开/返回是同级别走势，就意味着形成了新的中枢。）', fig: figThm2 },
        { term: '③ 中枢定理三（第18课）', text: '某级别中枢的<b>破坏</b>，当且仅当：<span class="hl">一个次级别走势离开中枢后，其后的次级别回抽走势不重新回到中枢内</span>。破坏组合只有三种：趋势+盘整、趋势+反趋势、盘整+反趋势（最有力的是“趋势+盘整”）。', fig: figThm3 },
        { term: '④ 中枢延伸 vs 级别扩张（第20课）', text: '中枢形成后有两种情况：<b>① 延伸</b>——围绕中枢的次级波动始终触及中枢区间，不产生新中枢；<b>② 产生新中枢</b>。而<b>级别扩张</b>是第三种：围绕新中枢的波动与围绕前中枢的某个波动区间<b>产生重叠</b>，由此形成更大级别中枢。', fig: figExtendExpand },
        { term: '⑤ 级别延续定理一（第20课）', text: '在更大级别中枢产生<b>之前</b>，该级别走势类型将<b>延续</b>——只能是该级别盘整或趋势的延续。（例如连跌再多，只要没形成更高级别中枢，就难言结束。）', fig: figExtend },
        { term: '⑥ 级别延续定理二（第20课）', text: '更大级别中枢产生，<b>当且仅当</b>围绕连续两个同级别中枢产生的波动区间<b>产生重叠</b>。（两个“恒星系统”要组成更大系统，必先外围行星发生关系。）', fig: figCont2 },
        { term: '⑦ 第三类买卖点（第20课，详见第14章）', text: '次级别走势<b>向上离开</b>中枢后，次级别回试<b>不跌破 ZG</b>，构成第三类买点；<b>向下离开</b>后，次级别回抽<b>不升破 ZD</b>，构成第三类卖点。', fig: figBS3 },
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
