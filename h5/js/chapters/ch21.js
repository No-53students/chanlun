/* 第14章 同级别分解 */
(function () {

  function optCh14() {
    const pts = [10, 16, 13, 18, 15, 20, 17, 22]; // A0..A6：7 段同级别走势，交替上下
    const mk = (x0, x1, lo, hi, name) => [{ xAxis: x0, yAxis: lo, name }, { xAxis: x1, yAxis: hi }];
    const marks = [
      { coord: [0, 10], name: 'A0=a（上涨段）', color: '#e74c3c' },
      { coord: [1, 16], name: 'a 高点', color: '#1f2937' },
      { coord: [3, 18], name: 'A2 升破 a 高点', color: '#1f2937' },
      { coord: [4, 15], name: 'A3 跌回 a 高点', color: '#1f2937' },
    ];
    const seg = (x, y, name, color) => ({ coord: [x, y], name, symbol: 'none', label: { show: true, color, fontSize: 11, fontWeight: 'bold', position: 'top', formatter: function (p) { return p.name; } } });
    const segData = [
      seg(0.5, 13, 'A0↑', '#e74c3c'),
      seg(1.5, 14.5, 'A1↓', '#16a34a'),
      seg(2.5, 15.5, 'A2↑', '#e74c3c'),
      seg(3.5, 16.5, 'A3↓', '#16a34a'),
      seg(4.5, 17.5, 'A4↑', '#e74c3c'),
      seg(5.5, 18.5, 'A5↓', '#16a34a'),
      seg(6.5, 19.5, 'A6↑', '#e74c3c'),
      seg(3.5, 21.5, '比较 Ai 与 Ai+2 力度（盘整背驰）', '#1f2937'),
    ];
    const markPointData = marks.map(m => ({
      coord: m.coord, name: m.name, symbol: 'pin', symbolSize: 36,
      itemStyle: { color: m.color },
      label: { show: true, formatter: function (p) { return p.name; }, color: m.color, fontSize: 10, fontWeight: 'bold' },
    })).concat(segData);
    return {
      tooltip: { trigger: 'axis', axisPointer: { type: 'cross' } },
      grid: { left: 60, right: 70, top: 40, bottom: 40 },
      xAxis: { type: 'value', min: 0, max: 7, interval: 1 },
      yAxis: { type: 'value', scale: true, name: '价格' },
      series: [{
        name: '走势', type: 'line', data: pts.map((p, i) => [i, p]),
        symbol: 'circle', symbolSize: 5, lineStyle: { width: 2, color: '#1f2937' }, itemStyle: { color: '#1f2937' },
        markArea: {
          silent: true, itemStyle: { color: 'rgba(37,99,235,0.10)' },
          label: { show: true, position: 'insideTop', formatter: function (p) { return p.name || ''; }, color: '#2563eb', fontSize: 11 },
          data: [mk(1, 4, 15, 16, '30分钟中枢 [15,16]（A1+A2+A3）')],
        },
        markLine: {
          silent: true, symbol: 'none',
          lineStyle: { color: '#2563eb', type: 'dashed', width: 1 },
          label: { show: true, position: 'end', formatter: function (p) { return p.name; }, color: '#2563eb', fontSize: 10 },
          data: [
            { yAxis: 16, name: 'ZG=16' },
            { yAxis: 15, name: 'ZD=15' },
          ],
        },
        markPoint: { data: markPointData },
      }],
    };
  }

  const figShift = `
<div class="fig" style="min-width:320px"><div class="lbl">同级别分解的“换档”（第40课）</div>
${drawZS([
{p:10,label:'A0↑',color:'#e74c3c'},
{p:16,label:'A1↓',color:'#16a34a',above:true},
{p:12,label:'A2↑',color:'#e74c3c'},
{p:18,label:'A3↓',color:'#16a34a',above:true},
{p:14,label:'A4↑',color:'#e74c3c'},
{p:20,label:'A5↓',color:'#16a34a',above:true},
{p:16,label:'结束',color:'#6b7280'}
], [], {w:52,h:150})}
<div style="display:flex;align-items:center;gap:4px;font-size:12px;font-family:ui-monospace,Consolas,monospace;flex-wrap:wrap">
<span style="background:#fecaca;color:#991b1b;padding:4px 9px;border-radius:6px">A0↑</span><span>+</span><span style="background:#bbf7d0;color:#166534;padding:4px 9px;border-radius:6px">A1↓</span><span>+</span><span style="background:#fecaca;color:#991b1b;padding:4px 9px;border-radius:6px">A2↑</span><span>+</span><span style="background:#bbf7d0;color:#166534;padding:4px 9px;border-radius:6px">A3↓</span><span>+</span><span style="background:#fecaca;color:#991b1b;padding:4px 9px;border-radius:6px">A4↑</span><span>+</span><span style="background:#bbf7d0;color:#166534;padding:4px 9px;border-radius:6px">A5↓</span>
</div><div class="cap">5分钟同级别分解：6 段交替上下的 5 分钟走势（红=偶段上、绿=奇段下）</div>
<div style="text-align:center;margin:6px 0;color:#6b7280">↓ 合并换档：A0+A1+A2+A3 = B1，A4+A5 = B2</div>
<div style="display:flex;align-items:center;gap:4px;font-size:13px;font-family:ui-monospace,Consolas,monospace;flex-wrap:wrap">
<span style="background:#bfdbfe;color:#1e3a8a;padding:6px 16px;border-radius:6px">B1</span><span>+</span><span style="background:#bfdbfe;color:#1e3a8a;padding:6px 16px;border-radius:6px">B2</span>
</div><div class="cap">换档后：30分钟同级别分解（由小级别自动升级）</div></div>`;

  // ---- 讲解点小图 ----

  // ① 什么是同级别分解
  const figSameLevel = mfig('固定级别拆成段落',
    drawZS([{ p: 10, label: '起点', color: '#6b7280' }, { p: 16, label: 'A1↑', color: '#e74c3c', above: true }, { p: 12, label: 'A2↓', color: '#16a34a' }, { p: 18, label: 'A3↑', color: '#e74c3c', above: true }, { p: 14, label: 'A4↓', color: '#16a34a' }, { p: 20, label: 'A5↑', color: '#e74c3c', above: true }],
      [], { w: 40, h: 104 }),
    '任意走势被同一固定级别切成 A1+A2+A3+… 交替段落');

  // ② 分解的唯一性
  const figUnique = mfig('唯一性：同级别分解无歧义',
    '<div style="display:flex;gap:14px;align-items:flex-end">'
    + drawZS([{ p: 10 }, { p: 16 }, { p: 11 }, { p: 15 }, { p: 12 }], [{ lo: 11, hi: 15, x0: 0, x1: 3, label: '按中枢(可多义)' }], { w: 34, h: 88 })
    + drawZS([{ p: 10, label: 'A1', color: '#e74c3c', above: true }, { p: 16, label: 'A2', color: '#16a34a' }, { p: 11, label: 'A3', color: '#e74c3c', above: true }, { p: 15, label: 'A4', color: '#16a34a' }], [], { w: 34, h: 88 })
    + '</div>',
    '左：按中枢可能多义；右：同级别逐段 A1..An 唯一确定');

  // ③ 不需要中枢延伸/扩展
  const figNoExtend = mfig('不需要中枢延伸/扩展',
    '<div style="display:flex;gap:14px;align-items:flex-end">'
    + drawZS([{ p: 10 }, { p: 16 }, { p: 11 }, { p: 15 }], [{ lo: 11, hi: 15, x0: 0, x1: 3, label: '1个中枢' }], { w: 34, h: 88 })
    + drawZS([{ p: 10 }, { p: 14 }, { p: 11 }, { p: 13 }, { p: 12 }, { p: 15 }, { p: 12.5 }], [{ lo: 11, hi: 13, x0: 0, x1: 3, label: '盘整1' }, { lo: 12, hi: 14, x0: 3, x1: 6, label: '盘整2' }], { w: 34, h: 88 })
    + '</div>',
    '左：三段上下上=1个中枢；右：延伸6段=两个盘整连接');

  // ④ 允许“盘整+盘整”
  const figAllowPanPan = mfig('允许 盘整+盘整（同级别）',
    drawZS([{ p: 10 }, { p: 14 }, { p: 11 }, { p: 13 }, { p: 18 }, { p: 21 }, { p: 17 }], [{ lo: 11, hi: 13, x0: 0, x1: 3, label: '盘整1' }, { lo: 18, hi: 21, x0: 4, x1: 6, label: '盘整2' }], { w: 38, h: 96 }),
    '同级别分解允许盘整+盘整；按中枢（非同级别）则不允许');

  // ⑤ 最基本的韵律
  const figRhythm = mfig('向上段先买后卖 / 向下段先卖后买',
    drawZS([{ p: 10, label: '买', color: '#16a34a' }, { p: 16, label: '卖', color: '#e74c3c', above: true }, { p: 11, label: '买', color: '#16a34a' }, { p: 15, label: '卖', color: '#e74c3c', above: true }, { p: 12, label: '买', color: '#16a34a' }],
      [], { w: 40, h: 96 }),
    '向上段：买→卖；向下段：卖→买（先卖后买）');

  // ⑥ 向上段的运作
  const figUpOperate = mfig('向上段：三段运作',
    drawZS([{ p: 10, label: '起点', color: '#6b7280' }, { p: 16, label: '①第1段上', color: '#e74c3c', above: true }, { p: 11, label: '②第2段下', color: '#16a34a' }, { p: 15, label: '③第3段上', color: '#e74c3c', above: true }],
      [], { w: 40, h: 100 }),
    '第1段背驰卖；第2段不破前低买；第3段背驰则卖');

  // ⑦ 向下段的运作
  const figDownOperate = mfig('向下段：先卖后买',
    drawZS([{ p: 17, label: '起点', color: '#6b7280' }, { p: 12, label: '①第1段下', color: '#16a34a' }, { p: 15, label: '②第2段上', color: '#e74c3c', above: true }, { p: 11, label: '③第3段下', color: '#16a34a' }],
      [], { w: 40, h: 100 }),
    '向下段与向上段相反：先卖后买');

  // ⑧ 机械节奏的意义
  const figMechanic = mfig('机械韵律',
    drawZS([{ p: 10, label: '买', color: '#16a34a' }, { p: 14, label: '卖', color: '#e74c3c', above: true }, { p: 11, label: '买', color: '#16a34a' }, { p: 15, label: '卖', color: '#e74c3c', above: true }, { p: 12, label: '买', color: '#16a34a' }, { p: 16, label: '卖', color: '#e74c3c', above: true }],
      [], { w: 36, h: 92 }),
    '反复“买→卖→买→卖”形成韵律感');

  // ⑨ a+A 的分解
  const figAplusA = mfig('a=A0，Ai 奇向下偶向上',
    drawZS([{ p: 10, label: 'A0=a↑', color: '#e74c3c' }, { p: 16, label: 'A1↓', color: '#16a34a', above: true }, { p: 12, label: 'A2↑', color: '#e74c3c' }, { p: 15, label: 'A3↓', color: '#16a34a', above: true }, { p: 11, label: 'A4↑', color: '#e74c3c' }],
      [], { w: 40, h: 104 }),
    'a 定义为 A0；Ai 奇数向下、偶数向上，A=A1+A2+…+Am');

  // ⑩ 一般性 a+A 情况
  const figGeneralAA = mfig('A3 跌回 a 高点 → 30分钟中枢',
    drawZS([{ p: 10, label: 'a=A0', color: '#e74c3c' }, { p: 16, label: 'a高点', color: '#e74c3c', above: true }, { p: 13, label: 'A1', color: '#16a34a' }, { p: 18, label: 'A2升破', color: '#e74c3c', above: true }, { p: 15, label: 'A3跌回', color: '#16a34a' }],
      [{ lo: 15, hi: 16, x0: 1, x1: 4, label: '30分钟中枢' }], { zgzd: true, w: 40, h: 108 }),
    'A2 升破 a 高点、A3 跌回其下 → A1+A2+A3 = 30分钟中枢');

  // ⑪ Ai 与 Ai+2 比较力度
  const figForceCmp = mfig('Ai 与 Ai+2 力度比较（盘整背驰）',
    drawZS([{ p: 10, label: 'A0', color: '#e74c3c' }, { p: 16, label: 'A1', color: '#16a34a', above: true }, { p: 12, label: 'A2(比A0)', color: '#e74c3c' }, { p: 15, label: 'A3(比A1)', color: '#16a34a', above: true }, { p: 11, label: 'A4(比A2)', color: '#e74c3c' }],
      [], { w: 40, h: 104 }),
    '同向相邻段 Ai 与 Ai+2 比较力度，背驰即操作');

  // ⑫ 两类图形与操作
  const figTwoTypes = mfig('两类图形与操作',
    '<div style="display:flex;gap:16px;align-items:flex-end">'
    + drawZS([{ p: 10, label: 'Ai', color: '#e74c3c' }, { p: 16, label: 'Ai+3不破', color: '#e74c3c', above: true }, { p: 12, label: '持有', color: '#2563eb' }], [], { w: 34, h: 88 })
    + drawZS([{ p: 10, label: '偶段', color: '#e74c3c' }, { p: 15, label: '背驰→卖', color: '#e74c3c', above: true }, { p: 11, label: '奇段', color: '#16a34a' }, { p: 14, label: '背驰→买', color: '#16a34a' }], [], { w: 34, h: 88 })
    + '</div>',
    '①不破则继续持有；②盘整背驰则 偶卖/奇买');

  // ⑬ 小级别进入、大级别上涨
  const figSmallBig = mfig('小级别进入 + 大级别上涨',
    drawZS([{ p: 10, label: '小级别进', color: '#16a34a' }, { p: 14 }, { p: 12 }, { p: 16 }, { p: 14 }, { p: 20, label: '大级别上涨', color: '#e74c3c', above: true }],
      [{ lo: 12, hi: 16, x0: 0, x1: 5, label: '震荡' }], { w: 38, h: 104 }),
    '小级别进入却遇大级别上涨：可升级为大级别操作');

  // ⑭ 自动换档
  const figAutoShift = mfig('自动换档',
    drawZS([{ p: 10, label: 'Ai', color: '#e74c3c' }, { p: 15, label: 'Ai+1', color: '#16a34a', above: true }, { p: 11, label: 'Ai+2', color: '#e74c3c' }, { p: 14, label: 'Ai+3', color: '#16a34a', above: true }, { p: 13 }],
      [{ lo: 11, hi: 14, x0: 1, x1: 3, label: '30分钟中枢' }], { w: 40, h: 100 }),
    'Ai+1+Ai+2+Ai+3 构成高一级别中枢 → 自动换档');

  // ⑮ 换档的条件
  const figShiftCond = mfig('换档条件 A0+…+At = B1+B2',
    drawZS([{ p: 10, label: 'A0', color: '#6b7280' }, { p: 14 }, { p: 11 }, { p: 13 }, { p: 16, label: 'A4', color: '#6b7280' }, { p: 18 }, { p: 15 }],
      [{ lo: 11, hi: 13, x0: 0, x1: 3, label: 'B1' }, { lo: 16, hi: 18, x0: 4, x1: 6, label: 'B2' }], { w: 38, h: 100 }),
    '只要 A0+…+At = B1+B2，即可换档成高一级别分解');

  // ⑯ 多重赋格
  const figFugue = mfig('多重赋格：N 层各自节奏',
    '<div style="display:flex;flex-direction:column;gap:5px;align-items:flex-start">'
    + drawZS([{ p: 10, label: '30分', color: '#2563eb' }, { p: 14 }, { p: 11 }, { p: 13 }], [], { w: 38, h: 56 })
    + drawZS([{ p: 10, label: '日线', color: '#e74c3c' }, { p: 18 }, { p: 12 }, { p: 17 }], [], { w: 38, h: 56 })
    + drawZS([{ p: 10, label: '周线', color: '#16a34a' }, { p: 22 }, { p: 13 }, { p: 20 }], [], { w: 38, h: 56 })
    + '</div>',
    'N 重级别（30分/日/周…）各按节奏，独立又统一（赋格）');

  __chapters.push({
    id: 'ch21', vol: '卷五 · 分解与操作', title: '第21章 同级别分解', source: '原文第38、39、40课',
    figures: [
      { kind: 'echarts', title: 'a+A 的同级别分解与力度比较', note: '把走势按固定级别拆成 <b>a=A0、A1、A2、A3…</b>（偶段向上、奇段向下）。图中 A2 升破 a 高点、A3 跌回 a 高点，于是 <b>A1+A2+A3 构成 30 分钟中枢 [15,16]</b>（第39课“一般性 a+A 情况”）。操作上只需不断比较 <b>Ai 与 Ai+2 的力度</b>（盘整背驰）决定买卖。', option: optCh14 },
      { kind: 'html', title: '同级别分解的“换档”与多重赋格', note: '同一段走势，5 分钟同级别分解（A0…A5）可以<b>合并换档</b>成 30 分钟同级别分解（B1+B2）。第40课：只要 A0+A1+…+At = B1+B2，就可按高一级别分解继续操作——如同开车根据路况<b>换档</b>，多重级别各自独立又整体协调，像一曲<b>赋格</b>。', html: figShift },
    ],
    sections: [
      { type: 'definition', title: '同级别分解的定义与唯一性', items: [
        { term: '① 什么是同级别分解（第38课）', text: '<span class="hl">把所有走势按某一固定级别的走势类型进行分解。</span>例如以 30 分钟为操作标准，就把任何图形都分解成一段段 30 分钟走势类型的连接，操作中只选<b>上涨和盘整</b>类型、避开所有下跌类型。', formula: '同级别分解：全走势 = A1 + A2 + A3 + …（固定级别）', fig: figSameLevel },
        { term: '② 分解的唯一性（第38课）', text: '多义性不是含糊性。一个好的分解，其规则下必须保证<b>分解的唯一性</b>。根据<span class="hl">“缠中说禅走势分解定理”</span>，<b>同级别分解具有唯一性</b>，不存在任何含糊乱分解的可能——这是它最大的优点。', fig: figUnique },
        { term: '③ 不需要中枢延伸/扩展（第38课）', text: '同级别分解视角下<b>不需要中枢延伸或扩展</b>的概念：对 30 分钟来说，只要 5 分钟次级别的<b>三段“上下上”或“下上下”</b>有价格区间重合，就构成 30 分钟中枢。若次级别延伸出 6 段，就<b>当成两个 30 分钟盘整类型的连接</b>。', fig: figNoExtend },
        { term: '④ 允许“盘整+盘整”（第38课）', text: '<span class="hl">在同级别分解下，允许“盘整+盘整”的连接。</span>注意：以前说的“不允许盘整+盘整”是在<b>非同级别分解</b>（按中枢）方式下的，二者不可搞混。', formula: '同级别分解 → 允许 盘整+盘整；非同级别（按中枢）→ 不允许', fig: figAllowPanPan },
      ]},
      { type: 'definition', title: '机械化操作程式（第38课）', items: [
        { term: '① 最基本的韵律', text: '同级别分解给出一个<b>机械化操作程式</b>，最大的韵律是：<span class="hl">向上段先买后卖、向下段先卖后买</span>。这个韵律错了，操作就一团糟。', fig: figRhythm, },
        { term: '② 向上段的运作（第38课）', text: '从下跌背驰开始（30 分钟分解为例）：<b>第一段向上</b>——内部背驰/盘整背驰结束点先卖出；<b>第二段向下</b>——①不跌破第一段低点则重新买入；②跌破则与更前向下段比较：盘整背驰就买入，否则观望等新背驰；<b>第三段向上</b>——①低于第一段高点则一定卖出；②超过则看是否对第一段盘整背驰：背驰卖出、不背驰继续持有。如此延续，直到某段向上不创新高或盘整背驰，结束向上段运作。', fig: figUpOperate },
        { term: '③ 向下段的运作', text: '向下段刚好<b>相反</b>：先卖后买，从向上段结束的背驰点开始，所有操作反过来即可。', fig: figDownOperate },
        { term: '④ 机械节奏的意义（第39课）', text: '按这个机械节奏操作，人会形成一种<b>韵律感</b>；长期下来，该操作的图形出现时甚至会有生理感应。关键是先把<b>心态与韵律</b>调节好，一步错了就停下来。', fig: figMechanic },
      ]},
      { type: 'definition', title: 'Ai 与 Ai+2 的力度比较（第39课）', items: [
        { term: '① a+A 的分解（第39课）', text: '对 5 分钟同级别分解，取典型 <code>a+A</code>：a 通过结合运算总是一个 5 分钟走势类型，A 分解为 <code>A = A1 + A2 + … + Am</code>。把 a 定义为 <code>A0</code>，则 <b>Ai 当 i 为奇数时向下、i 为偶数时向上</b>。', formula: 'a=A0；Ai 奇=向下、偶=向上；A = A1+A2+…+Am', fig: figAplusA },
        { term: '② 一般性 a+A 情况（第39课）', text: '若 A2 升破 a 高点而 A3 不跌回，则 a+A1+A2+A3 可整体看成一个新的 a′（仍是 5 分钟走势）。<b>一般性地考虑 A3 跌破 a 高点</b>时，A1、A2、A3 必然构成 30 分钟中枢——于是这一般性情况都归结为：<span class="hl">a 是 5 分钟走势类型，A 包含一个 30 分钟中枢</span>。', formula: 'A3 跌破 a 高点 → A1+A2+A3 = 30分钟中枢', fig: figGeneralAA },
        { term: '③ Ai 与 Ai+2 比较力度（第39课）', text: '把 a 定为 A0，则 <b>Ai 与 Ai+2 之间不断比较力度</b>，用<b>盘整背驰</b>方法决定买卖点（这和围绕中枢震荡类似，但这里是站在同级别分解基础上）。下一个 Ai+2 是当下产生的，不影响前面 Ai+1 的唯一性分解。', fig: figForceCmp },
        { term: '④ 两类图形与操作（第39课）', text: '机械方法把图形分成两类：<b>①</b>“i 为偶 Ai+3 不跌破 Ai 高点”或“i 为奇 Ai+3 不升破 Ai 低点”；<b>②</b>“Ai 与 Ai+2 盘整背驰”。<b>盘整背驰</b>时：i+2 为偶→卖出、i+2 为奇→买入；<b>无背驰</b>时继续持有/不回补，直到某段创新高/新低失败或盘整背驰才操作。', formula: 'Ai vs Ai+2 盘整背驰 → 偶卖奇买；否则持有/观望', fig: figTwoTypes },
      ]},
      { type: 'definition', title: '多重赋格与换档（第40课）', items: [
        { term: '① 小级别进入、大级别上涨（第40课）', text: '小级别进入却遇到大级别上涨，两个选择：一、继续按小级别操作（累、精度要求高、资金容量低）；二、<b>升级为大级别操作 + 部分保持小级别操作</b>。资金较大时后者更实用。', fig: figSmallBig },
        { term: '② 自动换档（第40课）', text: '“Ai 与 Ai+2 盘整背驰”会演化出“i 为偶 Ai+3 跌破 Ai 高点”或“i 为奇 Ai+3 升破 Ai 低点”，从而演化出<b>高一级别的中枢</b>（如 Ai+1、Ai+2、Ai+3 构成 30 分钟中枢）。这保证同级别分解下，小级别操作可<b>按自动模式换档成高一级别操作</b>。', fig: figAutoShift },
        { term: '③ 换档的条件（第40课）', text: '只要从 A0 到某个 At，使得 <code>A0+A1+…+At = B1+B2</code>（B1、B2 是 30 分钟级别的同级别分解），就可继续按后一种分解操作。是否换档，与你的<b>时间、操作风格、资金规模</b>有关。', fig: figShiftCond },
        { term: '④ 多重赋格（第40课）', text: '对资金规模大的，这种级别操作可一直延伸成 <b>N 重层次</b>，每一重对应一定的资金与筹码、不同的节奏与波动，如同<b>赋格曲</b>：简单的动机在 N 个层次上运动，合成统一乐曲。每一层次操作<b>独立又在一个整体中</b>。', formula: '同级别分解的多重赋格：N 层级别各按其节奏，独立又统一', fig: figFugue },
      ]},
      { type: 'motivation', title: '把复杂走势“肢解”成可机械操作的段落', text: '同级别分解是缠论<b>从理论走向可执行</b>的关键：它把任意缠绕的走势，用固定级别<b>唯一地</b>肢解成一段段走势类型，然后只需“<b>只做上涨段、避开下跌段</b>”，配合 Ai 与 Ai+2 的力度比较，就能形成一套<b>机械化、不依赖预测</b>的操作程式。理解了它，操作就不再是“猜涨跌”，而是“按节奏换档”。' },
      { type: 'pitfalls', title: '常见误区', items: [
        '把同级别分解的<b>多义性</b>当成可以<b>胡乱分解</b>（同级别分解是<b>唯一</b>的，规则最严格）。',
        '在同级别分解下还去套用<b>中枢延伸/扩展</b>概念（同级别分解不需要这些）。',
        '混淆“<b>同级别允许盘整+盘整</b>”与“<b>非同级别不允许</b>”这两种规则。',
        '忽略了<b>向上段先买后卖、向下段先卖后买</b>的基本韵律，导致节奏错乱。',
      ]},
      { type: 'exercises', title: '练习', items: [
        { q: '为什么说同级别分解具有唯一性？', a: '因为它把所有走势<b>按某一固定级别</b>的走势类型分解，规则下不存在模糊地带；根据“缠中说禅走势分解定理”，<b>同级别分解具有唯一性</b>（第38课）。' },
        { q: '同级别分解下，为什么允许“盘整+盘整”？', a: '同级别分解<b>不定义中枢延伸/扩展</b>，次级别延伸 6 段就当成两个盘整连接，所以<b>允许盘整+盘整</b>；“不允许盘整+盘整”是<b>非同级别</b>（按中枢）分解下的规则（第38课）。' },
        { q: '第39课说“Ai 与 Ai+2 之间比较力度”，用什么方法？何时买入卖出？', a: '用<b>盘整背驰</b>比较 Ai 与 Ai+2 的力度；若盘整背驰，<b>i+2 为偶（向上段）卖出、i+2 为奇（向下段）买入</b>；若无背驰则继续持有/观望（第39课）。' },
      ]},
    ],
  });
})();
