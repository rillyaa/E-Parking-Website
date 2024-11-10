const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common');
 
module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    static: path.resolve(__dirname, 'dist'),
    open: true,
    port: 9000,
    client: {
      overlay: {
        errors: true,
        warnings: true,
      },
    },
    compress: true,
    proxy: [
      {
        context: ['/api'],
        target: 'http://localhost:5000', // Ganti dengan port backend kamu
        changeOrigin: true,
        secure: false,
      }
    ]
  },
  resolve: {
    fallback: {
      "querystring": require.resolve("querystring-es3"),
      "stream": require.resolve("stream-browserify"),
      "path": require.resolve("path-browserify"),
      "fs": false, // fs tidak diperlukan di frontend, set false jika tidak digunakan
      "zlib": false,
      "async_hooks": false,
    }
  }
});