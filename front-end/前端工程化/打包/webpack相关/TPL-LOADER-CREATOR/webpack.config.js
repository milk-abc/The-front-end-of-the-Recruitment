/**
 * mode development production
 * entry 入口文件
 * output path filename 打包输出路径
 * devtool:调试的开发工具 source-map
 * module rules loader
 * plugins 插件
 * devServer 开发服务器
 */
const { resolve } = require("path");
const htmlWebPlugin = require("html-webpack-plugin");
const MdToHtmlPlugin = require("./plugins/md-to-html-plugin");
module.exports = {
  mode: "development",
  entry: resolve(__dirname, "src/app.js"),
  output: {
    path: resolve(__dirname, "build"),
    filename: "app.js",
  },
  devtool: "source-map",
  resolveLoader: {
    modules: ["node_modules", resolve(__dirname, "loaders")],
  },
  module: {
    rules: [
      {
        test: /\.tpl$/,
        use: [
          "babel-loader",
          {
            loader: "tpl-loader",
            options: {
              log: true,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new htmlWebPlugin({
      template: resolve(__dirname, "index.html"),
    }),
    new MdToHtmlPlugin({
      template: resolve(__dirname, "test.md"),
      filename: "test.html",
    }),
  ],
  devServer: {
    port: 3333,
  },
};
