##### 导语：由于webpack是运行在nodejs之上的，一个loader其实就是一个Nodejs模块，这个模块需要导出一个函数。这个导出的函数的工作就是获取处理前的原内容，对原内容执行处理后，返回处理后的内容。那么

```javascript
module.exports=function(source){
    //source为文件的原内容
    return source;
}
```

由于Loader运行在Nodejs中，你可以调用任何Nodejs自带的API，或者安装第三方模块进行调用。

##### 替换字符串的loader

比如我们打包时，想要替换源文件的字符串，这时可以考虑使用Loader，因为loader就是获得源文件内容然后对其进行处理，再返回。

比如src目录下有三个文件：

src/msg1.js

```js
export const msg1
```

https://www.bilibili.com/video/BV1kP41177wp?p=30&vd_source=d8dd13cb220fa6354c7b6f79b3a210ee



