/* eslint-env node */

const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'production',
  plugins: [new CopyWebpackPlugin([{ from: 'src' }])],
  // entry: './src/index.js',
  output: {
    filename: 'bundle.js',
  },
  module: {
    // required as I'm using class props
    rules: [
      {
        test: /\.js$/,
        include: __dirname + '/src',
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
};
