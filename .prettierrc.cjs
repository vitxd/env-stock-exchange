module.exports = {
  plugins: ['@trivago/prettier-plugin-sort-imports'],

  // BASELINE PRETTIER OPTIONS
  // https://prettier.io/docs/en/options
  singleQuote: true,

  // PLUGIN: Sort Imports
  // https://github.com/trivago/prettier-plugin-sort-imports?tab=readme-ov-file
  importOrder: ['<THIRD_PARTY_MODULES>', '^#(.*)$', '^[./]'],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
};
