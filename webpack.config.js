const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

let mode = 'development';
let target = "web";

if (process.env.NODE_ENV === 'production') {
  mode = 'production';
  target = "browserslist";
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
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
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