/* 第34章 笔破坏 vs 线段破坏 */
(function () {

  // ---- 主图1：ECharts 单笔向下（笔破坏），但线段未破坏 ----
  function optCh34() {
    const ps = [10, 16, 12, 18, 13, 20, 11, 22];
    const cats = ps.map((_, i) => 'P' + i);
    const biLine = ps.map((p, i) => [cats[i], p]);
    const segLine = [[cats[0], ps[0]], [cats[5], ps[5]], [cats[7], ps[7]]];
    const mp = (i, name, color, pos) => ({ coord: [cats[i], ps[i]], name, symbol: 'circle', symbolSize: 9, itemStyle: { color }, label: { show: true, color, fontSize: 10, position: pos, distance: 6, fontWeight: 'bold', formatter: function (p) { return p.name; } } });
    const seg = (i, y, name, color, pos) => ({ coord: [cats[i], y], name, symbol: 'none', label: { show: true, color, fontSize: 11, fontWeight: 'bold', position: pos, formatter: function (p) { return p.name; } } });
    return {
      tooltip: { trigger: 'axis', axisPointer: { type: 'cross' } },
      grid: { left: 48, right: 30, top: 40, bottom: 34 },
      xAxis: { type: 'category', data: cats, axisLabel: { interval: 0 } },
      yAxis: { type: 'value', scale: true, name: '价格' },
      series: [
        { name: '笔', type: 'line', data: biLine, symbol: 'circle', symbolSize: 5, lineStyle: { color: biColor, width: 1.6 }, itemStyle: { color: biColor },
          markPoint: { data: [
            mp(6, '底11·笔破坏', '#6b7280', 'bottom'),
            seg(6, 14, '单笔向下＝笔破坏', '#6b7280', 'top'),
          ] } },
        { name: '线段', type: 'line', data: segLine, symbol: 'circle', symbolSize: 9, lineStyle: { color: '#2563eb', width: 3 }, itemStyle: { color: '#2563eb' }, z: 30,
          markPoint: { data: [
            mp(0, '底·线段起点', '#16a34a', 'bottom'),
            mp(5, '顶20·线段高点', '#e74c3c', 'top'),
            mp(7, '顶22·新高（线段未破坏）', '#e74c3c', 'top'),
            seg(3, 21.5, '向上线段（多笔构成）', '#2563eb', 'top'),
          ] },
          markLine: { silent: true, symbol: 'none', label: { show: true, position: 'end', formatter: function (p) { return p.name; }, fontSize: 10 }, data: [
            { yAxis: 20, name: '线段高点 20', lineStyle: { color: '#e74c3c', type: 'dashed', width: 1 } },
            { yAxis: 11, name: '笔破坏低点 11（未成线段破坏）', lineStyle: { color: '#16a34a', type: 'dashed', width: 1 } },
          ] } },
      ],
    };
  }

  // ---- 主图2：笔破坏(无效) vs 线段破坏(有效) ----
  const figPenVsSeg = `
<div class="fig" style="min-width:250px"><div class="lbl">笔破坏（无效）：单笔向下，线段继续</div>${drawZS(
    [{ p: 10, tag: '底' }, { p: 16, tag: '顶' }, { p: 12, tag: '底' }, { p: 18, tag: '顶' }, { p: 13, tag: '底' }, { p: 20, tag: '顶' }, { p: 11, tag: '底', label: '笔破坏', color: '#6b7280' }, { p: 22, tag: '顶', label: '新高' }],
    [], { w: 42, h: 130 }
  )}<div class="cap">一笔打下来（20→11）<b>只破坏最后那一笔</b><br>随后创新高 22 → <b>线段未破坏，继续延伸</b></div></div>
<div class="fig" style="min-width:250px"><div class="lbl">线段破坏（有效）：向下线段真正破坏</div>${drawZS(
    [{ p: 10, tag: '底' }, { p: 20, tag: '顶' }, { p: 14, tag: '底' }, { p: 16, tag: '顶' }, { p: 8, tag: '底', label: '线段破坏' }, { p: 9, tag: '顶' }, { p: 7, tag: '底' }],
    [{ lo: 14, hi: 16, x0: 1, x1: 4, label: '向下线段(三笔)' }], { zgzd: true, w: 42, h: 130 }
  )}<div class="cap">向下一<b>线段</b>（三笔有重合）才<b>真正破坏</b>向上线段<br>→ 原线段结束（线段被线段破坏）</div></div>`;

  __chapters.push({
    id: 'ch34', vol: '卷八 · 理论深化', title: '第34章 笔破坏 vs 线段破坏', source: '原文第77、78课',
    figures: [
      { kind: 'echarts', title: '单笔向下（笔破坏）但线段未破坏', note: '一个<b>向上线段</b>（蓝粗线，由 P0→P5 多笔构成），到 P5（顶 20）后<b>一笔打下来</b>到 P6（底 11）——这只是<span class="kw">笔破坏</span>，只破坏了最后那根向上笔，<b>并不破坏线段</b>。随后 P7 创新高 22，说明线段<b>没有结束、继续延伸</b>。<span class="hl">线段的真破坏，必须由“另一个线段”来完成，单笔不算。</span>', option: optCh34 },
      { kind: 'html', title: '笔破坏（无效）vs 线段破坏（有效）', note: '左图：单笔向下只破坏最后那笔，随后创新高，<b>线段未破坏</b>（笔破坏≠线段破坏）。右图：向下一<b>线段</b>（三笔有重合）真正破坏了向上线段，<b>线段结束</b>。<span class="hl">线段必须被线段破坏，才算真破坏。</span>', html: figPenVsSeg },
    ],
    sections: [
      { type: 'definition', title: '笔划分的唯一性（第77课）', items: [
        { term: '① 分型划分唯一', text: '按定义，只要把<b>包含关系</b>处理清楚，3 根 K 线就能决定一个分型。注意：<span class="hl">任何相邻分型之间必须满足结合律</span>，不能有些 K 线分属不同分型。经过包含关系与结合律的最基本处理后，<b>分型的划分是唯一的</b>。', fig: mfig('顶分型唯一', klineSVG([mk(10, 14, true), mk(11, 16, true), mk(10, 13, false)], { w: 30, h: 78 }), '中间 K 线高、低都最高 → 唯一顶分型') },
        { term: '② 笔：一顶一底、顶底交替', text: '笔，必须<b>一顶一底</b>，且顶与底之间至少有一根 K 线不属于顶/底分型。最基本的要求是：<span class="hl">顶分型后必接底分型、底分型后必接顶分型，顶底交替出现</span>——不可能“顶后仍是顶”“底后仍是底”。', fig: mfig('一顶一底交替', drawZS([{ p: 10, tag: '底' }, { p: 15, tag: '顶' }, { p: 11, tag: '底' }, { p: 14, tag: '顶' }, { p: 10.5, tag: '底' }], [], { w: 40, h: 92 }), '顶底顶底交替，笔才成立') },
        { term: '③ 笔划分唯一（三步法）', text: '划分笔的三个步骤：<b>一、</b>确定所有符合标准的分型；<b>二、</b>相邻同性质分型——顶<b>取高</b>（前面低于后面的，X 掉前面的）、底<b>取低</b>；<b>三、</b>余下的顶底相邻，即为一笔。由此<span class="hl">笔的划分是唯一的</span>（可用“第 N 笔出现第一个不同”反证）。', fig: mfig('三步划分笔', drawZS([{ p: 10, tag: '底' }, { p: 15, tag: '顶', label: 'X', color: '#9ca3af' }, { p: 16, tag: '顶' }, { p: 11, tag: '底' }, { p: 14, tag: '顶' }, { p: 10.5, tag: '底' }], [], { w: 36, h: 92 }), '连续两顶取高(16)、X 掉低的(15) → 笔唯一') },
      ]},
      { type: 'definition', title: '笔破坏与线段破坏（第78课）', items: [
        { term: '④ 线段基本要求', text: '线段划分最基本的原则：<span class="hl">线段至少要有三笔</span>，且<b>开始那三笔必须有重合</b>。因为一个完整线段两端的性质不可能是同性质的（不能顶到顶、底到底），所以线段中包含笔的数目<b>都是单数</b>。', fig: mfig('至少三笔、前三笔重合', drawZS([{ p: 10, tag: '底' }, { p: 14, tag: '顶' }, { p: 11, tag: '底' }, { p: 13, tag: '顶' }, { p: 10.5, tag: '底' }], [{ lo: 11, hi: 13, x0: 0, x1: 4, label: '前三笔重合' }], { w: 40, h: 92 }), '上→下→上三笔有重合，才构成一线段') },
        { term: '⑤ 笔破坏 ≠ 线段破坏', text: '<span class="hl">一笔打下来，只破坏“笔”，不破坏“线段”。</span>线段出现第一种情况的“笔破坏”后，如果最终<b>没有</b>在该方向由该笔发展成<b>线段破坏</b>，那么原线段并未结束——随后创新高/新低，线段继续延伸。这就是线段“古怪”的唯一原因。', fig: mfig('笔破坏≠线段破坏', drawZS([{ p: 10, tag: '底' }, { p: 16, tag: '顶' }, { p: 12, tag: '底' }, { p: 18, tag: '顶' }, { p: 13, tag: '底' }, { p: 20, tag: '顶' }, { p: 11, tag: '底', label: '笔破坏', color: '#6b7280' }, { p: 22, tag: '顶', label: '新高' }], [], { w: 40, h: 100 }), '单笔向下只破坏最后那笔，随后创新高 → 线段未破坏') },
        { term: '⑥ 线段必须被线段破坏', text: '线段的破坏是“逆时间传递”的：<span class="hl">被后线段破坏的线段，一定破坏前线段。</span>任何线段都不可能被<b>同方向</b>的线段破坏；向上一笔开始的线段，只能被向下一笔开始的线段破坏。所以真正的线段破坏，<b>必须由“另一个线段”完成</b>。', fig: mfig('线段被线段破坏', drawZS([{ p: 10, tag: '底' }, { p: 20, tag: '顶' }, { p: 14, tag: '底' }, { p: 16, tag: '顶' }, { p: 8, tag: '底', label: '线段破坏' }, { p: 9, tag: '顶' }, { p: 7, tag: '底' }], [{ lo: 14, hi: 16, x0: 1, x1: 4, label: '向下线段' }], { w: 40, h: 100 }), '向下一线段（三笔有重合）才真正破坏向上线段') },
        { term: '⑦ 线段的标准化', text: '如果线段中<b>最高或最低点不是线段的端点</b>，那么在以线段为基础的分析中（如用线段构成最小中枢），<span class="hl">都可以把该线段标准化为“最高低点都在端点”</span>——只关心线段的实际区间（最高点与最低点），把线段当成一个<b>没有内部结构的基本部件</b>。', fig: mfig('线段的标准化', drawZS([{ p: 11, tag: '底', label: '起点' }, { p: 15, tag: '顶' }, { p: 9, label: '最低点', color: '#16a34a' }, { p: 13, label: '终点' }], [], { w: 40, h: 92 }), '只关心实际区间[9,15] → 标准化为最低9→最高15') },
      ]},
      { type: 'motivation', title: '分清“笔”与“线段”的破坏，才不会被单笔波动骗下车', text: '线段之所以存在，就是为了在<b>笔</b>之上再立一道更“钝”的防线：一笔瞬间的反向，太容易被偶然因素（打错单、老鼠仓、一次情绪宣泄）制造出来，若据此就宣布原趋势结束，必然反复被洗。第77、78课反复强调<span class="kw">笔破坏≠线段破坏</span>、<span class="kw">线段必须被线段破坏</span>，其意义正在于：<b>只有同级别的、有充分多笔确认的反向结构，才算趋势真正转折</b>。这既是划分的唯一性保证，也是“不轻易被小级别波动干扰”的操作哲学基础。' },
      { type: 'pitfalls', title: '常见误区', items: [
        '把“一笔打下来”当成线段结束——<b>单笔向下只破坏笔，不破坏线段</b>，须等线段级别的破坏。',
        '以为线段可以被<b>同方向</b>线段破坏——同向线段要么无关、要么是原线段的延续，<b>只能被反向线段破坏</b>。',
        '画出“顶到顶”或“底到底”的线段——线段两端分型<b>不可能同性质</b>，笔数必为单数。',
        '忽略“前三笔重合”——线段开始那三笔<b>没有重合就构不成线段</b>。',
        '把“笔破坏后创新高”的古怪线段当错——那是笔破坏<b>没有发展成线段破坏</b>，原线段继续，并非画错。',
      ]},
      { type: 'exercises', title: '练习', items: [
        { q: '一个向上线段进行中，突然一笔打下来创了新低，这个线段结束了吗？', a: '<b>没有结束。</b>单笔向下只是“笔破坏”，只破坏最后那笔；除非它随后发展成<b>线段破坏</b>（反向三笔有重合、特征序列分型成立），否则原向上线段继续。这就是“笔破坏≠线段破坏”。' },
        { q: '为什么“笔”的划分是唯一的？用一句话说明关键。', a: '因为<b>分型的划分是唯一的</b>（包含关系+结合律处理），而笔由“一顶一底、顶底交替”唯一确定（相邻同性质分型顶取高、底取低），所以笔的划分唯一。' },
        { q: '什么是“线段的标准化”？它有什么用？', a: '当线段<b>最高/最低点不在端点</b>时，可把它标准化为“最高低点都在端点”，只保留线段的实际区间（高、低点）。这样线段就变成<b>没有内部结构的基本部件</b>，为后面用线段构成最小中枢、走势类型提供标准零件（第78课）。' },
      ]},
    ],
  });
})();
