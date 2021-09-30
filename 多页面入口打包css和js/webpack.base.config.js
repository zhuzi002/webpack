const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// const CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;   改插件webpack5已经被移除掉了，取而代之optimization.splitChunks
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const devMode = process.env.NODE_ENV !== "production";

module.exports = {
  entry: {
    module1: "./js/entry1.js",
    module2: "./js/entry2.js",
    // common: ["./js/common.js"],
    // vendors: ['jQuery'],
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "js/[name].[chunkhash:8].js",
    //[name]文件名，[chunkhash:8]的意思是每次输出在文件后随机生成一个8位数，让文件不一样
  },
  // externals: {
  //   jquery: 'jQuery',
  // },
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          // 将 JS 字符串生成为 style 节点
          // "style-loader",
          // 将 CSS 转化成 CommonJS 模块
          "css-loader",
          // 将 Sass 编译成 CSS
          "sass-loader",
        ],
      },
      {
        test: require.resolve("jquery"),
        loader: "expose-loader",
        options: {
          exposes: ["$", "jQuery"],
        },
      },
    ],
  },
  plugins: [
    new BundleAnalyzerPlugin(),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: "module1",
      filename: "module1.html",
      chunks: ["module1","vendors"],
      template: "./page/module1/module1.html",
    }),
    new HtmlWebpackPlugin({
      title: "module2",
      filename: "module2.html",
      chunks: ["module2"],
      template: "./page/module2/module2.html",
    }),
    // 抽离css插件
    new MiniCssExtractPlugin({
      filename: "css/[name].[chunkhash:8].css",
    }),
  ],
  // 抽离,切割公共组件插件
  optimization: {
    splitChunks: {
      cacheGroups: {
        // 打包第三方库的文件
        vendors: {
          name: "vendors",
          test: /[\\/]node_modules[\\/](jquery)[\\/]/,
          chunks: "all",
          priority: 10,
          minChunks: 1, // 同时引用了 1 次才打包
        },
        // 打包业务中公共代码
        common: {
          name: "common",
          chunks: "initial",
          minSize: 1,
          priority: 0,
          minChunks: 2, // 同时引用了 2 次才打包
        },
      },
    },
    runtimeChunk: { name: "manifest" },
  },
  watch: true,
};
