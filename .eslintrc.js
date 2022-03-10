module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['airbnb-base'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'max-depth': ['error', 2],
    'max-lines-per-function': ['error', 20],
    'no-new': 'off',
    'no-alert': 'off',
    'class-methods-use-this': 'off',
    'import/extensions': 'off',
  },
  ignorePatterns: ['*test.js'],
};
