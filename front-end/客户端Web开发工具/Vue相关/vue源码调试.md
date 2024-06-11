在阅读Vue的代码之前，首先要搭建好它的源码调试环境。本文主要介绍两种Vue3源码调试环境的搭建。

第一种方式
克隆源码
学习源码的第一步是将源码克隆下来：
Git地址：https://github.com/vuejs/core

安装依赖
先将package.json中的puppeteer依赖删掉，再 pnpm install进行安装。


打包
1.运行 pnpm dev，如下图，即表示打包完成，可以ctrl+c终止了。

打包完成后我们可以在 packages\vue\dist 目录下找到打包后的代码。

2.或者运行构建命令：

pnpm run build -s

执行后，所有的都生成了 sourcemap 文件，如下图所示：

启动服务
运行 pnpm serve ，打开 http://localhost:3000/ 。

调试
打开 /packages/vue/examples/composition/todomvc.html，从而访问http://localhost:3000/packages/vue/examples/composition/todomvc


文件开头首先引入了文件 vue.global.js，其底部注释表明了 sourcemap 文件 URL。

第二种方式
安装vitest vscode扩展


运行调试

https://blog.csdn.net/q1003675852/article/details/134789585