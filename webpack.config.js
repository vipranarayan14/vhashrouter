const path = require('path');

module.exports = {
  entry: {
    'browser/vhashrouter': './src/browser.js',
    'npm/vhashrouter': './src/index.js'
  },
  module: {
    loaders: [{
      exclude: /node_modules/,
      test: /\.js$/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['babel-preset-env']
        }
      }
    }]
  },
  output: {
    filename: '[name].js',
    path: path.join(__dirname, 'dist')
  },
};
