const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const { merge } = require("webpack-merge");
const baseConfig = require("./webpack.base.config");
// const NODE_ENV = process.env.NODE_ENV;
const devMode = process.env.NODE_ENV !== "production";
module.exports = merge(baseConfig, {
  //   mode: NODE_ENV,
  devtool: devMode ? "inline-source-map" : false,
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: true,
        },
      }),
      new CssMinimizerPlugin()
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: "css/[name].[chunkhash:8].css",
    }),
  ],
});
