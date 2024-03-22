##### 导语：由于webpack是运行在nodejs之上的，一个loader其实就是一个Nodejs模块，这个模块需要导出一个函数。这个导出的函数的工作就是获取处理前的原内容，对原内容执行处理后，返回处理后的内容。那么

```javascript
module.exports=function(source){
    //source为文件的原内容
    return source;
}
```

由于Loader运行在Nodejs中，你可以调用任何Nodejs自带的API，或者安装第三方模块进行调用