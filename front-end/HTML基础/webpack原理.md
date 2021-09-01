//提取css代码为单独文件，插件
MiniCssExtractPlugin

//生成一个html文件
htmlWebpackPlugin

//压缩css
optimize-css-assets-wepack-plugin

//压缩html和js
生产环境自动压缩js代码，使用的是uglifyJsPlugin
html通过htmlwebpackplugin压缩html代码，配置minify，移除空格和注释

//tree-shaking：去除在应用程序没有使用的代码
//必须使用 ES6 模块化，mode:production
//作用：减少代码体积
//防止将一些有用的代码删掉，最好配置一下 sideEffects:["*.css","*.less"]

//缓存，可以开启 babel 缓存，第二次构建时，会读取之前的缓存
//打包输出的文件名加上 contenthash，根据 content 生成的 hash 值,不同的文件一定不一样，这样改了谁就重新打包，没有改的就用缓存

//动态 Polyfill 服务

//HappyPack多进程打包

//可以将 node_modules 中代码单独打包一个 chunk 最终输出
//自动分析多入口 chunk 中，有没有公共的文件，如果有会打包成单独一个 chunk
optimization:{
splitchunks:[
chunks:'all'
]
}
//懒加载：当文件需要使用时才加载
//预加载 在 import 里面添加注释 webpackPrefetch:true，会在浏览器空闲的时候再提前加载 js 文件，但不执行
//正常加载可以认为是并行加载，可能加载很多不需要用到的代码
