引入 loader-utils 模块，使用 getOptions 函数得到对应 loader 的 options，引入 babel/core 模块，使用此模块的 transform 函数将源码按对应 options 异步生成对应结果由回调返回。想要异步可以使用 this.async()
