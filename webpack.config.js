const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: './src/js/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'youtube-classroom.bundle.js',
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.(png)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              publicPath: './dist/',
              name: '[name].[ext]?[hash]',
              limit: 100000,
            },
          },
          {
            loader: 'file-loader',
            options: {
              publicPath: './dist/',
            },
          },
        ],
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [['@babel/preset-env']],
          },
        },
      },
    ],
  },
  devServer: {
    static: {
      directory: path.resolve(__dirname, 'dist'),
    },
    port: 8080,
  },
  plugins: [new HtmlWebpackPlugin({ template: './index.html' }), new MiniCssExtractPlugin()],
};
