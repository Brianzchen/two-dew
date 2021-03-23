const path = require('path');
const { merge } = require('webpack-merge');

const common = require('../webpack.config');

const config = merge(common, {
  mode: 'development',
  output: {
    filename: 'index.js',
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.join(__dirname, '../dist'),
    watchContentBase: true,
    port: '3000',
    open: true,
    overlay: true,
    historyApiFallback: {
      rewrites: [
        { from: /./, to: 'index.html' },
      ],
    },
  },
});

module.exports = config;
