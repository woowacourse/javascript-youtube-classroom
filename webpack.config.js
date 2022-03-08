const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: ['./src/js/index.js', './src/css/index.css'],
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
              presets: [
                [
                  '@babel/preset-env',
                  {
                    targets: { chrome: '55' } /* chrome 55 이상으로 지정 */,
                    debug: true,
                  },
                ],
              ],
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './index.html',
    }),
  ],
};

// const path = require('path');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
// const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// module.exports = {
//   mode: 'development',
//   entry: './src/js/index.js',
//   output: {
//     filename: 'bundle.js',
//     path: path.resolve(__dirname, 'dist'),
//     clean: true,
//   },
//   devtool: 'source-map',
//   devServer: {
//     port: 9000,
//   },
//   module: {
//     rules: [
//       {
//         test: /\.js$/,
//         exclude: /node_modules/,
//         use: [
//           {
//             loader: 'babel-loader',
//             options: {
//               presets: ['@babel/preset-env'],
//             },
//           },
//         ],
//       },
//       {
//         test: /\.css$/,
//         use: ['style-loader', 'css-loader'],
//       },
//     ],
//   },
//   plugins: [
//     new CleanWebpackPlugin(),
//     new HtmlWebpackPlugin({
//       template: './index.html',
//     })
//   ],
// };
