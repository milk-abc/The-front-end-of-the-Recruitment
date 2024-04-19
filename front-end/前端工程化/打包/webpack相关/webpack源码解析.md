![image-20240419231147930](C:\Users\liqian\AppData\Roaming\Typora\typora-user-images\image-20240419231147930.png)

![image-20240419223148211](C:\Users\liqian\AppData\Roaming\Typora\typora-user-images\image-20240419223148211.png)

![image-20240419223608597](C:\Users\liqian\AppData\Roaming\Typora\typora-user-images\image-20240419223608597.png)

![image-20240419223746323](C:\Users\liqian\AppData\Roaming\Typora\typora-user-images\image-20240419223746323.png)

![image-20240419230115838](C:\Users\liqian\AppData\Roaming\Typora\typora-user-images\image-20240419230115838.png)

![image-20240419230538859](C:\Users\liqian\AppData\Roaming\Typora\typora-user-images\image-20240419230538859.png)

![image-20240419231947665](C:\Users\liqian\AppData\Roaming\Typora\typora-user-images\image-20240419231947665.png)

首先在cli.js文件中调用webpack(options)，接收用户配置，返回compiler对象。在webpack函数中首先创建compiler对象，然后遍历插件，注册插件执行plugin.apply(compiler)，将plugin的回调注册到compiler的hooks的emit对象上的tap数组中。然后再将options和一堆内置插件挂到compiler上。

然后继续回到cli.js执行compiler.run函数，run函数传入一个回调，在run函数中调用beforeRun->run钩子->compiler.compile，

![C85A4563-12BC-4271-A841-28BBF7413D91](https://user-images.githubusercontent.com/25027560/72899115-51fe5a80-3d60-11ea-8f35-476876c4bbf4.png)

![img](https://github.com/gweid/webpack-source-code/raw/main/imgs/img7.jpg)

##### 1.首先webpack方法获取所有的用户配置，返回compiler对象，compiler.run启动编译

##### 2.处理用户自定义的配置，以及默认参数，调用一大堆webpack内置插件，挂入compiler

##### 3.beforeRun

![image-20240327120455267](C:\Users\liqian\AppData\Roaming\Typora\typora-user-images\image-20240327120455267.png)

![image-20240327115909696](C:\Users\liqian\AppData\Roaming\Typora\typora-user-images\image-20240327115909696.png)

https://github.com/gweid/webpack-source-code?tab=readme-ov-file

https://hellogithub2014.github.io/2019/01/03/webpack-loader/