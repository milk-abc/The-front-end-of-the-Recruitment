##### 1.运行命令初始化package.json  

```
 yarn init
```

##### 2.安装webpack

```
yarn add webpack webpack-cli -D
```

报错 运行

```
yarn config set strict-ssl false
```

##### 3.配置出入口

```
const path = require("path");
module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "[name].bundle.js",
  },
};
```

##### 4.区分开发-线上环境

```
yarn add cross-env -D
```

文件可以通过process.env.NODE_ENV来判断当前的环境

##### 5.配置loader

因为webpack只能理解js，所以loader是让webpack可以处理那些非js类型的文件，可以将所有类型的文件转化为webpack能够理解的有效模块。loader有两个属性，test属性和use属性，test属性标识需要转换的文件，use属性标识用哪个loader。

##### 6.配置plugin

用于webpack功能的扩展





































