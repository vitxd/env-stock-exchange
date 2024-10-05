/**
 * Frontend Monorepo ESLint configuration
 *
 * We don't plan to upgrade to ESLint 9, so we use the old CommonJS config format.
 * It is safe to ignore the deprecated warning from the typings below.
 *
 * @type {import("@typescript-eslint/utils/ts-eslint").Linter.Config}
 */
module.exports = {
  root: true,

  // extends

  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],

  // vue and typescript parsers

  plugins: ['@typescript-eslint', 'prettier'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },

  // ignore patterns

  ignorePatterns: [
    'node_modules',
    'dist',
    'storybook-static',
    '*.config.*',
    '.*rc.*',
  ],
  rules: {
    indent: ['error', 2],
    'linebreak-style': ['error', 'unix'],
    quotes: ['error', 'single', { avoidEscape: true }],
    semi: ['error', 'always'],
    'prettier/prettier': 'error',
  },
};
