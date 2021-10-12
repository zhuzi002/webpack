const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const devMode = process.env.NODE_ENV === "development";
const testMode = process.env.NODE_ENV === "test";

module.exports = {
  entry: ['./index.js'],
  output: {
    path: path.resolve(__dirname, "../dist"),
    filename: "js/[name].[chunkhash:8].js",
    //[name]文件名，[chunkhash:8]的意思是每次输出在文件后随机生成一个8位数，让文件不一样
  },
  module: {
    rules: [
      {
        test: /\.(le|sa|sc|c)ss$/,
        use: [
          // 将 JS 字符串生成为 style 节点
          devMode ? "style-loader" : MiniCssExtractPlugin.loader,
          // 将 CSS 转化成 CommonJS 模块
          {
            loader: "css-loader",
            options: {
              // 每一个 CSS 的 `@import` 与 CSS 模块/ICSS 都会运行 `postcss-loader`，不要忘了 `sass-loader` 将不属于 CSS 的 `@import` 编译到一个文件中
              // 如果您需要在每个 CSS 的 `@import` 上运行 `sass-loader` 和 `postcss-loader`，请将其设置为 `2`。
              importLoaders: 1,
              // minimize: true,
              sourceMap: process.env.NODE_ENV !== "production",
            },
          },
          // 将 Sass 编译成 CSS
          "sass-loader",
          "less-loader"
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({ template: "./public/index.html" }),
  ],
  // watch: true 
};
