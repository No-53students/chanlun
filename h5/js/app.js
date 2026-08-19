/* 缠论 H5 · 应用入口：汇总章节 + 挂载 Vue */
(function () {
  const chapters = __chapters;
  const psyList = window.__psy || [];
  const stockList = window.__stock || [];
  const mapInfo = window.__map || null;
  const glossary = window.__glossary || [];
  const anims = window.__anims || {};
  const originals = window.__originals || {};
  const quizzes = window.__quizzes || {};
  const tutors = window.__tutors || {};
  const levels = window.__levels || {};
  const TABS = [
    { id: 'chanlun', label: '缠论 H5', list: chapters },
    { id: 'psy', label: '心理', list: psyList },
    { id: 'stock', label: '其他股票知识', list: stockList },
  ];
  const upcoming = ['数据导入与个股分析（建设中）'];
  const { createApp, ref, computed, onMounted, watch, nextTick } = Vue;

  createApp({
    setup() {
      const curIdx = ref(0);
      const navOpen = ref(window.innerWidth > 768);
      const tab = ref('chanlun');
      const isMobile = ref(window.matchMedia('(max-width: 768px)').matches);
      const dark = ref(false);
      function applyTheme() {
        document.documentElement.setAttribute('data-theme', dark.value ? 'dark' : 'light');
        localStorage.setItem('chanlun-theme', dark.value ? 'dark' : 'light');
      }
      function toggleTheme() { dark.value = !dark.value; applyTheme(); }
      const activeList = computed(() => (TABS.find(t => t.id === tab.value) || TABS[0]).list);
      const cur = computed(() => activeList.value[curIdx.value]);
      const prev = computed(() => curIdx.value > 0 ? activeList.value[curIdx.value - 1] : null);
      const next = computed(() => curIdx.value < activeList.value.length - 1 ? activeList.value[curIdx.value + 1] : null);
      const groupedChapters = computed(() => {
        const groups = [], index = {};
        for (const c of activeList.value) {
          const v = c.vol || '其他';
          if (!index[v]) { index[v] = { vol: v, chapters: [] }; groups.push(index[v]); }
          index[v].chapters.push(c);
        }
        return groups;
      });
      const showTabs = computed(() => !isMobile.value || navOpen.value);

      // 分步动画演示
      const anim = computed(() => anims[cur.value.id] || null);
      const animStep = ref(0);
      const animPlaying = ref(false);
      let animTimer = null;
      function stopAnim() {
        animPlaying.value = false;
        if (animTimer) { clearInterval(animTimer); animTimer = null; }
      }
      function stepAnim(delta) {
        stopAnim();
        const n = anim.value ? anim.value.steps.length : 0;
        animStep.value = Math.min(n - 1, Math.max(0, animStep.value + delta));
      }
      function toggleAnimPlay() {
        if (animTimer) { stopAnim(); return; }
        if (!anim.value) return;
        animPlaying.value = true;
        animTimer = setInterval(() => {
          const n = anim.value.steps.length;
          animStep.value = (animStep.value + 1) % n;
        }, 2500);
      }
      // 原文对照
      const original = computed(() => originals[cur.value.id] || null);
      // 交互练习（选择题）
      const quiz = computed(() => quizzes[cur.value.id] || []);
      const quizPicked = ref([]);
      function pickQuiz(qi, oi) {
        if (quizPicked.value[qi] != null) return;
        quizPicked.value[qi] = oi;
        const q = quiz.value[qi];
        if (q && oi !== q.answer) {
          recordWrong({ ch: cur.value.id, title: cur.value.title, q: q.q, wrong: q.options[oi], right: q.options[q.answer], explain: q.explain });
        }
      }
      // 鼓励机制：新章节首次进入弹窗打气
      const cheer = ref(null);
      const CHEERS = [
        { emoji: '🎉', text: '迈出第一步，就是最大的进步！' },
        { emoji: '🚀', text: '保持节奏，缠论越学越顺！' },
        { emoji: '💪', text: '又攻克一章，离「走势必完美」更近了！' },
        { emoji: '🌟', text: '稳扎稳打，中枢与买卖点尽在掌握！' },
      ];
      function maybeCheer() {
        if (tab.value !== 'chanlun') return;
        let visited = [];
        try { visited = JSON.parse(localStorage.getItem('chanlun-visited') || '[]'); } catch (e) { visited = []; }
        if (!Array.isArray(visited)) visited = [];
        const id = cur.value.id;
        if (visited.indexOf(id) >= 0) return;
        visited.push(id);
        localStorage.setItem('chanlun-visited', JSON.stringify(visited));
        const idx = activeList.value.findIndex(c => c.id === id);
        const c = CHEERS[idx % CHEERS.length];
        cheer.value = { emoji: c.emoji, title: cur.value.title, text: c.text };
      }
      // 错题本：记录做错的选择题 / 决策题，localStorage 持久化
      const wrongBook = ref([]);
      const showWrongBook = ref(false);
      const showMap = ref(false);
      function loadWrongBook() {
        try { wrongBook.value = JSON.parse(localStorage.getItem('chanlun-wrongbook') || '[]'); } catch (e) { wrongBook.value = []; }
        if (!Array.isArray(wrongBook.value)) wrongBook.value = [];
      }
      function saveWrongBook() { localStorage.setItem('chanlun-wrongbook', JSON.stringify(wrongBook.value)); }
      function recordWrong(entry) {
        if (wrongBook.value.some(w => w.ch === entry.ch && w.q === entry.q)) return;
        wrongBook.value.unshift(entry);
        saveWrongBook();
      }
      function clearWrong() { wrongBook.value = []; saveWrongBook(); }
      // 当下推演模拟器：走势逐笔走出，关键节点提问，答对/看清后才继续
      const tutor = computed(() => tutors[cur.value.id] || null);
      const tutorStep = ref(0);
      const tutorPicked = ref(null);
      const tutorStepData = computed(() => tutor.value ? tutor.value.steps[tutorStep.value] : null);
      const tutorPts = computed(() => tutor.value ? tutor.value.steps.slice(0, tutorStep.value + 1).map(s => ({ p: s.p, tag: s.tag })) : []);
      const tutorZones = computed(() => tutor.value && tutor.value.zones ? tutor.value.zones.filter(z => z.step <= tutorStep.value).map(({ lo, hi, x0, x1, label }) => ({ lo, hi, x0, x1, label })) : []);
      const tutorSvg = computed(() => tutorPts.value.length ? (tutorZones.value.length ? drawZS(tutorPts.value, tutorZones.value, { w: 40, h: 130 }) : biLineSVG(tutorPts.value, { w: 40, h: 130 })) : '');
      const tutorNote = computed(() => tutorStepData.value ? (tutorStepData.value.note || '') : '');
      const tutorQuestion = computed(() => tutorStepData.value ? (tutorStepData.value.question || null) : null);
      const tutorLabel = computed(() => tutorStepData.value ? (tutorStepData.value.label || '') : '');
      const tutorBlocked = computed(() => tutorQuestion.value && tutorPicked.value == null);
      function tutorNext() {
        if (tutorBlocked.value || !tutor.value) return;
        if (tutorStep.value < tutor.value.steps.length - 1) { tutorStep.value++; tutorPicked.value = null; }
      }
      function tutorPrev() {
        if (tutorStep.value > 0) { tutorStep.value--; tutorPicked.value = null; }
      }
      function tutorReset() { tutorStep.value = 0; tutorPicked.value = null; }
      function tutorPick(oi) {
        if (tutorPicked.value != null) return;
        tutorPicked.value = oi;
        const q = tutorQuestion.value;
        if (q && oi !== q.answer) {
          recordWrong({ ch: cur.value.id, title: cur.value.title, q: q.q, wrong: q.options[oi], right: q.options[q.answer], explain: q.explain });
        }
      }
      // 级别递归透镜：同一段走势在不同级别下的「分解」，滑块切换级别
      const level = computed(() => levels[cur.value.id] || null);
      const levelIdx = ref(0);
      const levelData = computed(() => level.value ? level.value.levels[levelIdx.value] : null);
      const levelSvg = computed(() => levelData.value ? drawZS(levelData.value.pts, levelData.value.zones || [], { w: 40, h: 140 }) : '');
      const levelNote = computed(() => levelData.value ? (levelData.value.note || '') : '');
      function setLevel(i) { levelIdx.value = i; }
      // 全局搜索（术语 + 章节）
      const searchQuery = ref('');
      // 移动端点击目录/搜索结果后收起抽屉
      function closeNav() {
        if (window.matchMedia('(max-width: 768px)').matches) navOpen.value = false;
      }
      const searchTerms = computed(() => {
        const q = searchQuery.value.trim();
        if (!q) return [];
        return glossary.filter(g => g.term.includes(q) || (g.aliases || []).some(a => a.includes(q))).slice(0, 6);
      });
      const searchChapters = computed(() => {
        const q = searchQuery.value.trim();
        if (!q) return [];
        return activeList.value.filter(c => c.title.includes(q) || (c.source || '').includes(q)).slice(0, 6);
      });

      let charts = [];

      function tabOfId(id) {
        if (id && id.indexOf('psy') === 0) return 'psy';
        if (id && id.indexOf('stock') === 0) return 'stock';
        return 'chanlun';
      }
      function route() {
        const saved = localStorage.getItem('chanlun-last-chapter');
        const id = location.hash.replace(/^#\//, '') || saved || chapters[0].id;
        tab.value = tabOfId(id);
        const list = (TABS.find(t => t.id === tab.value) || TABS[0]).list;
        const i = list.findIndex(c => c.id === id);
        if (i >= 0) curIdx.value = i;
        maybeCheer();
      }
      function switchTab(id) {
        const list = (TABS.find(t => t.id === id) || TABS[0]).list;
        if (!list.length) return;
        const target = list[0].id;
        if (location.hash !== '#/' + target) location.hash = '#/' + target;
        else route();
        closeNav();
      }

      function renderFigures() {
        charts.forEach(c => c.dispose());
        charts = [];
        (cur.value.figures || []).forEach((f, i) => {
          if (f.kind === 'echarts') {
            const el = document.getElementById('fig' + i);
            if (el) {
              const c = echarts.init(el);
              const opt = f.option();
              // ECharts 动起来：整图平滑入场 + 走势逐段生长
              opt.animation = true;
              opt.animationDuration = 650;
              opt.animationDurationUpdate = 500;
              opt.animationEasing = 'cubicOut';
              (opt.series || []).forEach(function (s) {
                if (s.type === 'line' || s.type === 'bar') {
                  s.animationDelay = function (idx) { return idx * 70; };
                }
              });
              c.setOption(opt);
              charts.push(c);
            }
          }
        });
      }

      onMounted(() => {
        dark.value = localStorage.getItem('chanlun-theme') === 'dark';
        applyTheme();
        loadWrongBook();
        window.addEventListener('hashchange', route);
        route();
        nextTick(renderFigures);
        window.addEventListener('resize', () => {
          isMobile.value = window.matchMedia('(max-width: 768px)').matches;
          charts.forEach(c => c.resize());
        });
      });

      watch(() => tab.value + ':' + curIdx.value, () => {
        stopAnim();
        animStep.value = 0;
        quizPicked.value = [];
        tutorStep.value = 0;
        tutorPicked.value = null;
        levelIdx.value = 0;
        searchQuery.value = '';
        window.scrollTo(0, 0);
        localStorage.setItem('chanlun-last-chapter', cur.value.id);
        nextTick(renderFigures);
      });

      return {
        chapters, upcoming, cur, prev, next, navOpen, groupedChapters,
        tab, tabs: TABS, switchTab, showTabs,
        anim, animStep, animPlaying, stepAnim, toggleAnimPlay, original, quiz, quizPicked, pickQuiz,
        tutor, tutorStep, tutorPicked, tutorSvg, tutorNote, tutorQuestion, tutorLabel, tutorBlocked,
        tutorNext, tutorPrev, tutorReset, tutorPick,
        level, levelIdx, levelSvg, levelNote, setLevel,
        searchQuery, searchTerms, searchChapters,
        dark, toggleTheme, cheer,
        wrongBook, showWrongBook, clearWrong, showMap, mapInfo,
        closeNav,
      };
    },
  }).mount('#app');
})();
