var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  devtool: 'eval-source-map',//配置生成Source Maps，选择合适的选项,只在开发阶段使用它
  entry:  [path.resolve(__dirname, "src/main.js")],//唯一入口文件
  output: {
        path: path.resolve(__dirname, 'public'),//打包后的文件存放的地方
        filename: 'bundle.js'//打包后输出文件的文件名
  },
    plugins: [
      new HtmlWebpackPlugin(
        {
          title:'webpack测试页面'
        }
      ),
      new webpack.HotModuleReplacementPlugin() // 启用 HMR
  ],
  devServer: {
    hot: true, // 告诉 dev-server 我们在使用 HMR
    inline: true,
    port: 8080,
    proxy: {
      "/api": "http://localhost:3000" //请求到 /api/* 现在会被代理到请求 http://localhost:3000/api/*
    },
    // publicPath: "/assets/",//修改 publicPath，将 bundle 放在一个目录 确保 publicPath 总是以斜杠(/)开头和结尾。
    // watchContentBase: true,
    // watchOptions: {
    //   aggregateTimeout: 300,
    //   poll: 1000
    // },
    stats: {
      // `webpack --colors` 等同于
      colors: true
    },
    contentBase: path.join(__dirname, "public")//本地服务器所加载的页面所在的目录
  }
}
