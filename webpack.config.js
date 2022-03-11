const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'development',
  entry: './src/js/App.js',
  resolve: {
    extensions: ['.js', '.css'],
  },
  devServer: {
    port: 9000,
  },
  devtool: 'source-map',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    assetModuleFilename: 'assets/images/[name][ext][query]',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        ],
      },
      {
        test: /\.css$/i,
        use: [
          process.env.NODE_ENV === 'production'
            ? MiniCssExtractPlugin.loader // 프로덕션 환경
            : 'style-loader', // 개발 환경
          'css-loader',
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.html$/i,
        loader: 'html-loader',
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.DefinePlugin({
      YOUTUBE_URL: JSON.stringify(
        'https://competent-haibt-c82cf4.netlify.app/youtube/v3/search?'
      ),
      YOUTUBE_URL_DUMMY: JSON.stringify(
        'https://competent-haibt-c82cf4.netlify.app/dummy/youtube/v3/search?'
      ),
    }),
    new HtmlWebpackPlugin({
      template: './index.html',
    }),
    new MiniCssExtractPlugin({ filename: 'css/style.css' }),
  ],
};
