HappyPack 可以让 Webpack 同一时间处理多个任务，发挥多核 CPU 的能力，将任务分解给多个子进程去并发的执行，子进程处理完后，再把结果发送给主进程。通过多进程模型，来加速代码构建。
预编译资源模块:dll
利用缓存提升二次构建速度:babel-loader 开启缓存，使用 cache-loader
动态 Polyfill 服务
treeshaking 去除多余的 import 模块
uglifyjs-webpack-plugin 压缩 js
//hotModuleReplacemetnPlugin 用于开发环境热更新插件
