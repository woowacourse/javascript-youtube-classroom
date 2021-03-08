const webpack = require('webpack');
const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  mode: 'development',
  entry: ['babel-polyfill', './src/index.js'],
  devtool: 'source-map',
  plugins: [
    new webpack.DefinePlugin({
      YOUTUBE_API_KEY: JSON.stringify(process.env.YOUTUBE_API_KEY),
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-proposal-class-properties'],
          },
        },
      },
    ],
  },
};
