const path = require('path');

module.exports = {
  entry: './src',
  output: {
    path: path.join(__dirname, 'lib'),
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
  }
};
