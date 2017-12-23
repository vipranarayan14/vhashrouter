const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './prod/main.js',
  output: {
    path: __dirname,
    filename: './dist/hash-router.js'
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
  }
};
