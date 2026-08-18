/* 缠论 H5 · 应用入口：汇总章节 + 挂载 Vue */
(function () {
  const chapters = __chapters;
  const upcoming = ['数据导入与个股分析（建设中）'];
  const { createApp, ref, computed, onMounted, watch, nextTick } = Vue;

  createApp({
    setup() {
      const curIdx = ref(0);
      const navOpen = ref(true);
      const cur = computed(() => chapters[curIdx.value]);
      const prev = computed(() => curIdx.value > 0 ? chapters[curIdx.value - 1] : null);
      const next = computed(() => curIdx.value < chapters.length - 1 ? chapters[curIdx.value + 1] : null);
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

      watch(curIdx, () => nextTick(renderFigures));

      return { chapters, upcoming, cur, prev, next, navOpen };
    },
  }).mount('#app');
})();
