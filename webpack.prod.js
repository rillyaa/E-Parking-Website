const { merge } = require('webpack-merge');
const common = require('./webpack.common');
 
module.exports = merge(common, {
  mode: 'production',
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        ],
      },
    ],
  },
  resolve: {
    fallback: {
      "querystring": require.resolve("querystring-es3"),
      "stream": require.resolve("stream-browserify"),
      "path": require.resolve("path-browserify"),
      "fs": false, // fs tidak diperlukan di frontend, set false jika tidak digunakan
      "zlib": false,
      "async_hooks": false,
      "assert":false,
      "util":false,
    }
  }
});