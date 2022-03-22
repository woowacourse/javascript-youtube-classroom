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
        '@Store': path.resolve(__dirname, 'src/js/Store/'),
        '@Utils': path.resolve(__dirname, 'src/js/utils/'),
        '@Constants': path.resolve(__dirname, 'src/js/constants.js'),
        '@Storage': path.resolve(__dirname, 'src/js/storage/'),
        '@Images': path.resolve(__dirname, 'src/assets/images'),
        '@Api': path.resolve(__dirname, 'src/js/api.js'),
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
          test: /\.css$/i,
          use: [MiniCssExtractPlugin.loader, 'css-loader'],
          exclude: /node_modules/,
        },
        {
          test: /\.(png|jpe?g|svg)$/i,
          use: [
            {
              loader: 'file-loader',
            },
          ],
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
