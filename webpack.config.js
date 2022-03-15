const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    // import 할 때 .js와 .css를 붙이지 않아도 된다.
    extensions: ['.js', '.css'],
  },
  devServer: {
    // 매번 build 하지 않아도, 자동으로 build 된다.
    static: {
      directory: path.resolve(__dirname, 'dist'),
    },
    port: 8080,
  },
  devtool: 'source-map', // 디버깅이 가능하도록, 우리가 짠 코드대로 보여준다.
  module: {
    rules: [
      {
        test: /\.js$/, // 로더를 적용할 파일
        exclude: /node_modules/, // node_modules는 로더를 처리하지 않는다.
        use: [
          {
            loader: 'babel-loader', // babel.config.js를 사용하지 않아도 babel을 처리해준다.
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.png$/,
        loader: 'file-loader',
        options: {
          name: 'assets/[contenthash].[ext]',
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
    }),
    new CleanWebpackPlugin(),
  ],
};
