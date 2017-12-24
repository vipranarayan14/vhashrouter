const path = require('path');
const config = require('./webpack.config');

config.devServer = {
  contentBase: path.join(__dirname, "./"),
  port: 9000
};

module.exports = config;
