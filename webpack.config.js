const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './prod/main.js',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'hash-router.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['babel-preset-env']
          }
        }
      }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, "test"),
    port: 9000
  }
};
