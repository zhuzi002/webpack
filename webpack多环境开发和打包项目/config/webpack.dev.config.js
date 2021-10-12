const { merge } = require("webpack-merge");
const baseConfig = require("./webpack.base.config");
const NODE_ENV = process.env.NODE_ENV;
const HOST = process.env.HOST || 'localhost' || '0.0.0.0';
console.log(NODE_ENV, "NODE_ENV");
module.exports = merge(baseConfig, {
  mode: NODE_ENV,
  devServer: {
    host: HOST,
    open: true,
    port: '8888',
    compress: true, // 是否对代码进行压缩
  },
  devtool: "inline-source-map",
});
