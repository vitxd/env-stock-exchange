window.application = {};

document.addEventListener('alpine:init', () => {
  Alpine.store('deployment', {
    data: {},
    loading: true,
    async load() {
      this.loading = true;
      const response = await axios.get('/api/deployment');
      this.data = response.data.data;
      this.loading = false;
      console.log('$store.deployment.data', this.data);
    },
    init() {
      this.load();
    },
  });
});

application.deploymentTable = function () {
  return {
    makeKey(col, row) {
      return `${col}.${row}`;
    },

    get def() {
      const cols = [];
      const rows = [];
      const map = {};

      const data = this.$store.deployment.data;
      Object.entries(data).map(([col, colData]) => {
        cols.push(col);
        Object.entries(colData).forEach(([row, rowData]) => {
          map[this.makeKey(col, row)] = rowData;
          if (!rows.includes(row)) {
            rows.push(row);
          }
        });
      });

      return { cols, rows, map };
    },
  };
};
