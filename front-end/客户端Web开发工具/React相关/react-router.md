##### 为什么需要前端路由？

​	以前是多页应用，多个html文件，用户浏览体验不好，现在只保留一个html文件，单页应用

前端路由让我们可以在同一个html文件中进行内容的切换渲染，有更好的浏览体验

##### 前端路由的本质是什么？

​	不同的path不对应不同的component

##### 基本使用

1.引入createBrowserRouter方法和RouterProvider

2.使用createBrowserRouter配置路由path和组件的对应关系生成router实例

3.渲染RouterProvider组件并传入router实例

##### 路由模式

![image-20240330224636073](C:\Users\liqian\AppData\Roaming\Typora\typora-user-images\image-20240330224636073.png)

##### 跳转

编程式导航

![image-20240330225403606](C:\Users\liqian\AppData\Roaming\Typora\typora-user-images\image-20240330225403606.png)

路由传参

![image-20240330225700525](C:\Users\liqian\AppData\Roaming\Typora\typora-user-images\image-20240330225700525.png)

React-Router实现时核心逻辑如下：

1.使用不刷新的路由API，比如history或者hash

2.提供一个事件处理机制，让React组件可以监听路由变化【history】

![image-20240331111604000](C:\Users\liqian\AppData\Roaming\Typora\typora-user-images\image-20240331111604000.png)

3.提供操作路由的接口，当路由变化时，通过事件回调通知React【Router组件中的history.listen】

![image-20240331111301730](C:\Users\liqian\AppData\Roaming\Typora\typora-user-images\image-20240331111301730.png)

4.当路由事件触发时，将变化的路由写入到React的响应式数据上，也就是将这个值写入到根router的state上，然后通过context传给子组件。

5.具体渲染时将路由配置的path和当前浏览器地址做一个对比，匹配上就渲染对应的组件。































































































https://www.bilibili.com/video/BV1x44y1f7DT?p=12&spm_id_from=pageDriver&vd_source=d8dd13cb220fa6354c7b6f79b3a210ee

https://dennisgo.cn/Articles/React/React-Router_Code.html























