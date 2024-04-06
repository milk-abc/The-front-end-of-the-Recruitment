写一个简单的babel-loader

最简单的Loader是一个什么都不做，原样返回JS代码的loader，像这样：

```js
module.exports=function(source){
    return source
}
```

但是我们的babel-loader显然需要调用babel来编译代码，我们查一下babel-core文档，可以调用babel.transform API来编译代码。再加上一些presets的设置，我们可以把上面的代码做一下改造如下：

```js
var babel=require("babel-core");
module.exports=function(source){
    var babelOptions={
        presets:['env']
    };
    var result=babel.transform(source,babelOptions);
    return result.code;
}
```

我们可以直接在webpack config文件里面加一个resolveLoader的配置即可，我们这里把babel-loader指定为自己写的。

















































































