const path = require('path');
const config = require('./webpack.config');

config.output.path = path.join(__dirname, 'test');
config.devServer = {
  contentBase: path.join(__dirname, "test"),
  port: 9000
};

module.exports = config;
