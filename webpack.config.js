const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const dotenv = require('dotenv');
const webpack = require('webpack');

module.exports = () => {
  dotenv.config();

  return {
    mode: 'development',
    entry: './src/js/index.js',
    resolve: {
      extensions: ['.js', '.css'],
      alias: {
        '@Display': path.resolve(__dirname, 'src/js/display/'),
        '@Domain': path.resolve(__dirname, 'src/js/domain/'),
        '@Utils': path.resolve(__dirname, 'src/js/utils/'),
        '@Core': path.resolve(__dirname, 'src/js/core/'),
      },
    },
    devServer: {
      port: 9000,
    },
    devtool: 'source-map',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist'),
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
          test: /\.s[ac]ss$/i,
          use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
          exclude: /node_modules/,
        },
      ],
    },
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        template: './index.html',
      }),
      new MiniCssExtractPlugin({ filename: 'css/style.css' }),
      new webpack.DefinePlugin({
        'process.env.YOUTUBE_API_KEY': JSON.stringify(process.env.YOUTUBE_API_KEY),
      }),
      new webpack.EnvironmentPlugin(['YOUTUBE_API_KEY']),
    ],
  };
};
