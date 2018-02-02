const path = require('path');
const filename = 'vhashrouter';

const baseConfig = {
  entry: './src/index.js',
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
  }
};

const browserConfig = Object.assign({}, baseConfig, {

  output: {
    filename: `${filename}.js`,
    library: 'vHashRouter',
    libraryExport: 'vHashRouter',
    libraryTarget: 'window',
    path: path.join(__dirname, 'dist')
  }

});

const npmConfig = Object.assign({}, baseConfig, {

  output: {
    filename: `${filename}.npm.js`,
    library: 'vHashRouter',
    libraryTarget: 'umd',
    path: path.join(__dirname, 'dist')
  }

});

module.exports = [
  browserConfig,
  npmConfig
];
