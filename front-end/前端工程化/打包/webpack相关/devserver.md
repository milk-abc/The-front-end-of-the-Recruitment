https://juejin.cn/post/7147636643099312136

##### 为什么要用devServer？

关键词：开发环境自动编译，自动刷新

如果没有devserver，我们的开发方式将会是编写源码->输入webpack打包命令编译->点击刷新浏览器，这种方式周期比较长，而且容易出错。devServer能够提供功能在于这几点：

1.以http服务形式加载文件，而非文件引入。

2.提供sourcemap支持

3.开发环境自动编译自动刷新

##### 核心原理

devServer可以启动一个HTTP服务，在webpack构建的时候，监听文件，如果文件发生变化，将会启动webpack的自动编译。webpack打包的结果会放在**内存**中，httpserver能直接从内存读取这些文件。

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5037c6b7857146ad941afee01841f7cc~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

##### proxy

在实际开发中，肯定会去调用后端接口，根据同源策略，此时一定会有跨域的问题。在开发环境中，一般处理跨域问题的方式是跨域资源共享CORS和跨域中间件devServerApplymiddleware，跨域中间件是webpack-dev-server提供的功能。

https://www.bilibili.com/video/BV1kP41177wp?p=43&spm_id_from=pageDriver&vd_source=d8dd13cb220fa6354c7b6f79b3a210ee

```
module.export = {
    ...
    devServer: {
        ...
        proxy: {
            "/api": {
                // 目标地址
                target: "https://api.xx.xx.xx",
                // 必要时重写路径
                pathReWrite: {
                    "^/api":''
                },
                // 确保请求主机名是target中的主机名
                changeOrigin: true
            },
            ...
        }
    }
}
```

