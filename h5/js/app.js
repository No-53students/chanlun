/* 缠论 H5 · 应用入口：汇总章节 + 挂载 Vue */
(function () {
  const chapters = __chapters;
  const glossary = window.__glossary || [];
  const anims = window.__anims || {};
  const originals = window.__originals || {};
  const quizzes = window.__quizzes || {};
  const upcoming = ['数据导入与个股分析（建设中）'];
  const { createApp, ref, computed, onMounted, watch, nextTick } = Vue;

  createApp({
    setup() {
      const curIdx = ref(0);
      const navOpen = ref(true);
      const cur = computed(() => chapters[curIdx.value]);
      const prev = computed(() => curIdx.value > 0 ? chapters[curIdx.value - 1] : null);
      const next = computed(() => curIdx.value < chapters.length - 1 ? chapters[curIdx.value + 1] : null);
      const groupedChapters = computed(() => {
        const groups = [], index = {};
        for (const c of chapters) {
          const v = c.vol || '其他';
          if (!index[v]) { index[v] = { vol: v, chapters: [] }; groups.push(index[v]); }
          index[v].chapters.push(c);
        }
        return groups;
      });

      // 分步动画演示
      const anim = computed(() => anims[cur.value.id] || null);
      const animStep = ref(0);
      // 原文对照
      const original = computed(() => originals[cur.value.id] || null);
      // 交互练习（选择题）
      const quiz = computed(() => quizzes[cur.value.id] || []);
      const quizPicked = ref([]);
      function pickQuiz(qi, oi) {
        if (quizPicked.value[qi] == null) quizPicked.value[qi] = oi;
      }
      // 全局搜索（术语 + 章节）
      const searchQuery = ref('');
      const searchTerms = computed(() => {
        const q = searchQuery.value.trim();
        if (!q) return [];
        return glossary.filter(g => g.term.includes(q) || (g.aliases || []).some(a => a.includes(q))).slice(0, 6);
      });
      const searchChapters = computed(() => {
        const q = searchQuery.value.trim();
        if (!q) return [];
        return chapters.filter(c => c.title.includes(q) || (c.source || '').includes(q)).slice(0, 6);
      });

      let charts = [];

      function route() {
        const id = location.hash.replace(/^#\//, '') || chapters[0].id;
        const i = chapters.findIndex(c => c.id === id);
        if (i >= 0) curIdx.value = i;
      }

      function renderFigures() {
        charts.forEach(c => c.dispose());
        charts = [];
        cur.value.figures.forEach((f, i) => {
          if (f.kind === 'echarts') {
            const el = document.getElementById('fig' + i);
            if (el) {
              const c = echarts.init(el);
              c.setOption(f.option());
              charts.push(c);
            }
          }
        });
      }

      onMounted(() => {
        window.addEventListener('hashchange', route);
        route();
        nextTick(renderFigures);
        window.addEventListener('resize', () => charts.forEach(c => c.resize()));
      });

      watch(curIdx, () => {
        animStep.value = 0;
        quizPicked.value = [];
        searchQuery.value = '';
        nextTick(renderFigures);
      });

      return {
        chapters, upcoming, cur, prev, next, navOpen, groupedChapters,
        anim, animStep, original, quiz, quizPicked, pickQuiz,
        searchQuery, searchTerms, searchChapters,
      };
    },
  }).mount('#app');
})();
