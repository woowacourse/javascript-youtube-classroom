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
  'prettier/prettier': ['error', { endOfLine: 'auto' }],
  rules: {
    'max-depth': ['error', 2],
    'max-lines-per-function': ['error', 20],
    'no-new': 'off',
    'no-alert': 'off',
    'no-param-reassign': 'off',
    'class-methods-use-this': 'off',
    'object-curly-newline': 'off',
    'import/extensions': 'off',
  },
  ignorePatterns: ['*test.js'],
};
