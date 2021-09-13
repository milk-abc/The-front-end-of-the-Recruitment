HappyPack,parallel-webpack,thread-loader 可以让 Webpack 同一时间处理多个任务，发挥多核 CPU 的能力，将任务分解给多个子进程去并发的执行，子进程处理完后，再把结果发送给主进程。通过多进程模型，来加速代码构建。
使用 DllPlugin 插件，把所有引入的第三方的代码都打包生成一个文件里，只在第一次打包时分析第三方代码，之后再执行打包时，直接用上次分析好的结果即可。
使用 splitChunksPlugin 插件，对代码进行拆分，提取多个模块的公共代码，这些代码只需要打包一次。
treeshaking 去除多余的 import 模块
利用缓存提升二次构建速度:babel-loader 开启缓存，使用 cache-loader
动态 Polyfill 服务
uglifyjs-webpack-plugin 压缩 js
optimize-css-assets-plugin 压缩 css
htmlwebpackplugin 配置 minify 压缩 html
hotModuleReplacemetnPlugin 用于开发环境热更新替换自动刷新
小图片使用 base64 格式，减少 http 请求
SSR 渲染，预渲染
cdn转发
content-encoding:gzip http压缩
缓存，设置expires,cache-control,Last-Modified,etag
路由懒加载，组件动态加载，图片懒加载
利用好script标签种的async和defer属性
async:并行下载，下载完立即执行
defer：并行下载，DomContentLoaded之前执行
url-loader 会将引入的图片以base64 编码并打包到文件中，最终只需要引入这个dataURL 就能访问图片了
