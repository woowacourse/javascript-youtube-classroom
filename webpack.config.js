const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
const dotenv = require('dotenv');
const path = require('path');
dotenv.config();

module.exports = {
  mode: 'development',
  entry: ['babel-polyfill', './src/index.js'],
  output: {
    path: path.join(__dirname, 'bundle'),
    filename: 'bundle.js',
  },
  devtool: 'source-map',
  plugins: [
    new webpack.DefinePlugin({
      YOUTUBE_API_KEY: JSON.stringify(process.env.YOUTUBE_API_KEY_2),
    }),
    new MiniCSSExtractPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-proposal-class-properties', '@babel/plugin-proposal-private-methods'],
          },
        },
      },
      {
        test: /\.(css|scss|sass)$/,
        use: [MiniCSSExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
    ],
  },
};
