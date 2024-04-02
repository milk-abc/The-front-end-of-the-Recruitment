![image-20240316145433006](C:\Users\liqian\AppData\Roaming\Typora\typora-user-images\image-20240316145433006.png)

fiber 是 react 16 以上的版本引入的非常重要的概念。
什么是 fiber?
fiber 是 v16 之后的虚拟 dom diff 算法，stack 是 v16 前的虚拟 dom diff 算法，使用的是深度优先遍历去遍历节点，会将下面这张图转变为
![alt text](image-1.png)

```json
const root={
	key:'A',
	children:[
		{
            key:'B',
            children:[
                {
                    key:'D',
                },
                {
                    key:'E',
                }

            ]
		},
        {
            key:'C',
            children:[
                {
                    key:'F',
                },
                {
                    key:'G'
                }
            ]
        }
	]
}
const walk=(root)=>{
    root.children.forEach((child)=>{
        walk(child)
    })
}
walk(root);

```

这棵树使用的是递归遍历，树越大栈越深，如果发生中断，那么整棵树都不能恢复。并且寻找节点期间浏览器无法响应，树越大越卡顿。

![image-20240316144348637](C:\Users\liqian\AppData\Roaming\Typora\typora-user-images\image-20240316144348637.png)

![image-20240316160311995](C:\Users\liqian\AppData\Roaming\Typora\typora-user-images\image-20240316160311995.png)
![alt text](image-3.png)

https://juejin.cn/post/7225957841319379005#heading-3

什么是 fiber
fiber 是 react16 提出的一种新的架构，支持中断异步。Fiber 对象是一个用于保存「组件状态」、「组件对应的 DOM 的信息」、以及「工作任务 (work)」的数据结构，负责管理组件实例的更新、渲染任务、以及与其他 fiber node 的关系。每个组件（react element）都有一个与之对应关联的 Fiber 对象实例（fiber node），和 react element 不一样的是，fiber node 不需要再每一次界面更新的时候都重新创建一遍。
在执行 Reconciliation 这个算法的期间，组件 render 方法所返回的 react element 的信息（属性）都会被合并到对应的 fiber node 中。这些 fiber node 因此也组成了一棵与 react element tree 相对应的 fiber node tree。（我们要牢牢记住的是：每个 react element 都会有一个与之对应的 fiber node）。

##### 双缓存技术

在React中，DOM的更新采用了双缓存技术。在React中最多会同时存在两颗fiber树，当前在屏幕中显示的内容对应的Fiber树叫做current Fiber树，当发生更新时，React会在内存中重新构建一颗新的Fiber树，这颗正在构建的Fiber树叫做workInProgress Fiber树。在双缓存技术中，workInProgress Fiber树就是即将要显示在页面中的Fiber树就是即将要显示在页面中的Fiber树，当这颗Fiber树构建完成后，React会使用它直接替换current Fiber树达到快速更新DOM的目的，因为workInProgress Fiber树是在内存中构建的所以构建它的速度是非常快的。一旦workInProgress Fiber树在屏幕上呈现，它就会变成current Fiber树。

在current Fiber节点对象中有一个alternate属性指向对应的workInProgress Fiber节点对象，在workInProgress Fiber节点中有一个alternate属性也指向对应的current Fiber节点对象。

![image-20240401143217241](C:\Users\liqian\AppData\Roaming\Typora\typora-user-images\image-20240401143217241.png)

![image-20240401143433911](C:\Users\liqian\AppData\Roaming\Typora\typora-user-images\image-20240401143433911.png)

![image-20240401234643231](C:\Users\liqian\AppData\Roaming\Typora\typora-user-images\image-20240401234643231.png)

![image-20240402010225534](C:\Users\liqian\AppData\Roaming\Typora\typora-user-images\image-20240402010225534.png)

![image-20240402010414353](C:\Users\liqian\AppData\Roaming\Typora\typora-user-images\image-20240402010414353.png)

![image-20240402094740980](C:\Users\liqian\AppData\Roaming\Typora\typora-user-images\image-20240402094740980.png)





























































