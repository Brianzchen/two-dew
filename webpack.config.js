const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: path.resolve(__dirname, 'frame/index.js'),
  output: {
    path: path.resolve(__dirname, 'dist/scripts'),
    filename: '[contenthash].index.js',
    chunkFilename: '[contenthash].[name].chunk.js',
    publicPath: '/scripts/',
  },
  resolve: {
    alias: {
      aphrodite: 'aphrodite/no-important',
    },
    extensions: ['*', '.js', '.jsx', '.css'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: path.resolve(__dirname, 'dist/index.html'),
      template: path.resolve(__dirname, 'public/index.html'),
    }),
  ],
  module: {
    rules: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        include: [
          path.resolve('./frame'),
          path.resolve('./packages'),
        ],
      },
    ],
  },
};
