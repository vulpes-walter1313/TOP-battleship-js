const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

let mode = 'development';

if (process.env.NODE_ENV === 'production') {
  mode = 'production';
}

module.exports = {
  entry: './src/index.js',
  mode: mode,
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'main.js'
  },
  module: {
    rules: [
      {
        test: /.js$/i,
        exclude: /node_modules/
      },
      {
        test: /.scss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ]
      }
    ]
  },
  plugins: [new HtmlWebpackPlugin({template: './src/index.html'}), new MiniCssExtractPlugin()],
  devtool: 'source-map',
  devServer: {
    contentBase: './dist',
    hot: true,
    host: '0.0.0.0'
  }
}