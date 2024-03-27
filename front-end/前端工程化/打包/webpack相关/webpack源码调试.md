Webpack 是前端开发的常用工具。

在使用 Webpack 的时候，我们经常会引入额外的 loader 和 plugin 来定制构建过程。而有些 loader 和 plugin 支持传入函数，来提供运行时配置。比如，[webpack-manifest-plugin](https://link.zhihu.com/?target=https%3A//github.com/danethurber/webpack-manifest-plugin) 插件的 `options.filter` 选项。

涉及到 webpack 运行时调用，那就离不开代码调试。

本文就向大家介绍，如何用 VSCode 调试 Webpack。

## 配置 VSCode 调试功能

在package.json的script添加 

```
"debug": "node --inspect-brk=5858 ./node_modules/.bin/webpack --config webpack.config.js"
或者
"debug": "node --inspect-brk ./node_modules/webpack/bin/webpack.js"
```

``--inspect-brk` 是调试端口号，传给 node 进程后，node 就能对外暴露调试端口，进而在 VSCode 里调试。

然后，我们修改一下 .vscode/launch.json 文件，配置调试参数。

```text
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "debug",
      "runtimeExecutable": "npm",
      "runtimeArgs": ["run", "debug"],
      "port": 3100
    }
  ]
}
```

有几个参数比较重要：

1. `runtimeExecutable`: 程序执行器，就是启动程序的脚本。默认是 `node`，但我们这里用 npm 来启动 webpack build 指令，所以这里要配 `npm`

2. `runtimeArgs`: 传递给程序执行器的参数

3. `port`: node 调试端口号，和刚才在 package.json script 中配的 `--inspect-brk` 保持一致

   https://nodejs.org/en/learn/getting-started/debugging

   ![image-20240327113750028](C:\Users\liqian\AppData\Roaming\Typora\typora-user-images\image-20240327113750028.png)

   ![image-20240327113824492](C:\Users\liqian\AppData\Roaming\Typora\typora-user-images\image-20240327113824492.png)

![image-20240327114109855](C:\Users\liqian\AppData\Roaming\Typora\typora-user-images\image-20240327114109855.png)

点击它

## 启动调试

package.json script 和 .vscode/launch.json 都配置妥当后，我们在 Compiler 的 beforeRun函数里打一个断点，然后进入调试模式。

控制台输入npm run debug

可以看到，VSCode 停在了断点处，表明调试 webpack 成功了。

![image-20240327113924463](C:\Users\liqian\AppData\Roaming\Typora\typora-user-images\image-20240327113924463.png)

![image-20240327113942980](C:\Users\liqian\AppData\Roaming\Typora\typora-user-images\image-20240327113942980.png)