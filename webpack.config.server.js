const path = require('path');
const config = require('./webpack.config');

config.output.publicPath = 'dist/';
config.devtool = 'source-map';
config.devServer = {
  contentBase: '.',
  port: 9000
};

module.exports = config;
