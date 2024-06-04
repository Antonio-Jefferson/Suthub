module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  extends: [
    '@nuxtjs/eslint-config-typescript',
    'plugin:vue/vue3-recommended',
    'plugin:prettier/recommended',
  ],
  plugins: ['vue'],
  rules: {
    'vue/multi-word-component-names': 'off',
    'prettier/prettier': ['error', { singleQuote: true, endOfLine: 'auto' }],
  },
};
