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
});