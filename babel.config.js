module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          chrome: '87',
        },
        useBuiltIns: 'usage',
        corejs: '3.6.4',
      },
    ],
  ],
  plugins: ['@babel/plugin-transform-runtime'],
};
