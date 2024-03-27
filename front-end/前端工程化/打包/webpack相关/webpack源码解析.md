![C85A4563-12BC-4271-A841-28BBF7413D91](https://user-images.githubusercontent.com/25027560/72899115-51fe5a80-3d60-11ea-8f35-476876c4bbf4.png)

![img](https://github.com/gweid/webpack-source-code/raw/main/imgs/img7.jpg)

##### 1.首先webpack方法获取所有的用户配置，返回compiler对象，compiler.run启动编译

##### 2.处理用户自定义的配置，以及默认参数，调用一大堆webpack内置擦火箭，挂入compiler

##### 3.beforeRun

![image-20240327120455267](C:\Users\liqian\AppData\Roaming\Typora\typora-user-images\image-20240327120455267.png)

![image-20240327115909696](C:\Users\liqian\AppData\Roaming\Typora\typora-user-images\image-20240327115909696.png)

https://github.com/gweid/webpack-source-code?tab=readme-ov-file

https://hellogithub2014.github.io/2019/01/03/webpack-loader/