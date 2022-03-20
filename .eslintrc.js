module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
    jest: true,
  },
  extends: ['airbnb-base', 'eslint:recommended', 'plugin:prettier/recommended'],
  rules: {
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
    'import/extensions': [
      'off',
      {
        extensions: ['.js'],
      },
    ],
    'no-cond-assign': 'off',
    'no-return-assign': 'off',
    'no-param-reassign': 'off',
    'func-names': 'off',
    'default-param-last': 'off',
  },
  parserOptions: {
    ecmaVersion: 13,
  },
};
