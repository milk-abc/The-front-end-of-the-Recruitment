##### 第一种

1、打开 `vscode` 内置终端，右上角选择 `JavaScript Debug Terminal`

![image-20240411111440592](C:\Users\liqian\AppData\Roaming\Typora\typora-user-images\image-20240411111440592.png)

2、在代码里面打断点（需要断点处输入 `debugger` 或者 打标 `Breakpoint`）

3、终端运行执行命令即可

### **第二种**

------

1、mac 通过快捷键 选择 `Debug: Toggle Auto Attach` ，开启 `Auto Attach` (该方式要去 node 版本要大于 12)

2、在代码里面打断点（需要断点处输入 `debugger` 或者 打标 `Breakpoint`）

3、终端通过命令 `node --inspect index.js` 执行代码

### **第三种**

------

有些时候在看一些开源库的时候，想通过断点方式查看源代码，可以通过配置 `launch.json` 指定运行时执行环境

比如，`package.json` 有 `scripts`



![img](https://img-blog.csdnimg.cn/e196b14c417c41a18078baece218b064.png)

 vscode 调试时 ，配置 `launch.json` 如下

![img](https://img-blog.csdnimg.cn/img_convert/a12c2e304d079c2ae4e908f7ccf0af47.png)

其中，`runtimeExecutable` 指定运行时的执行环境  ，这里指定为 `npm`，`runtimeArgs` 指定运行时执行环境对应的执行参数，这里指定运行 `run dev`。

配置好之后，按 F5 开启调试，实际执行的就是 `npm run dev` ，这样我们就可以在源代码打断点进行查看代码的执行过程了

> 更多调试技巧可以查看 vscode 官网 ，[地址](https://code.visualstudio.com/docs/nodejs/nodejs-debugging#_javascript-debug-terminal)

### **第四种**

------

> ndb is an improved debugging experience for Node.js, enabled by Chrome DevTools

借助 [ndb](https://www.npmjs.com/package/ndb) ，正如它自己在官网上描述一样，`ndb` 提升了调试 `nodejs` 的体验，它是通过启用一个 Chrome Devtools 来进行调试的。

在使用它前，你需要安装，可以通过 `npm install -g ndb` ，安装完之后在代码里面需要断点的地方输入输入 `debugger` ，然后运行 `ndb index.js` ，会发现打开了一个 Chrome Devtools 并且已经断点

![img](https://img-blog.csdnimg.cn/img_convert/b369f58838beac96d22cd5a106faa1bf.png)

https://www.ruanyifeng.com/blog/2018/03/node-debugger.html

https://blog.csdn.net/qq_43067585/article/details/125178534

##### 









