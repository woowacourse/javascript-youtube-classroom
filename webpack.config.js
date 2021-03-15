const webpack = require('webpack');
const dotenv = require('dotenv');
const path = require('path');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
dotenv.config();


module.exports = {
  mode: 'development',
  entry: ['babel-polyfill', path.join(__dirname, 'src', 'index.js')],
  output: {
    path: path.join(__dirname, 'bundle'),
    filename: 'bundle.js',
  },
  devtool: 'source-map',
  plugins: [
    new webpack.DefinePlugin({
      YOUTUBE_API_KEY: JSON.stringify(process.env.YOUTUBE_API_KEY_1),
    }),
    new CaseSensitivePathsPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: [
              '@babel/plugin-proposal-class-properties',
              '@babel/plugin-proposal-private-methods',
            ],
          },
        },
      },
    ],
  },
};
