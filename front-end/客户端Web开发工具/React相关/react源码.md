![image-20240418095831782](C:\Users\liqian\AppData\Roaming\Typora\typora-user-images\image-20240418095831782.png)

首先130行进入render函数执行前会先调用createElement将**FunctionCounter**变成虚拟DOM，type为FunctionCounter，config为该函数组件的所有props属性，children为该函数组件的孩子[]，最后将config和children放入props作为输出。

![image-20240418151511361](C:\Users\liqian\AppData\Roaming\Typora\typora-user-images\image-20240418151511361.png)

render函数的参数第一个是FunctionCounter的虚拟DOM，第二个是root的真实DOM节点。首先声明根fiber，然后进入调度函数。

![image-20240418151902421](C:\Users\liqian\AppData\Roaming\Typora\typora-user-images\image-20240418151902421.png)

如果是第一次挂载，将当前页面正在构建的树初始化为rootFiber，下一作业单元也赋值为rootFiber，初始化effectlist。由于requestIdleCallback后续会一直在浏览器空闲时间中调用workLoop函数，如果浏览器没有在500ms内执行workLoop，那么在下次空闲时间，workLoop会被强制执行。

![image-20240418153556325](C:\Users\liqian\AppData\Roaming\Typora\typora-user-images\image-20240418153556325.png)

![image-20240418153615760](C:\Users\liqian\AppData\Roaming\Typora\typora-user-images\image-20240418153615760.png)

当下一作业单元存在且一直有时间片时，会一直执行performUnitWork函数，第一次该函数的输入为rootFiber。当所有作业单元都执行完后，render阶段完成，开始进入不可中断的用effectList链挂载的阶段。

![image-20240418154742235](C:\Users\liqian\AppData\Roaming\Typora\typora-user-images\image-20240418154742235.png)

performUnitWork函数第一个会调用beginWork函数自上而下创建未挂载的真实DOM且根据通过虚拟DOM创建子fiber树进行增删改，第二个会调用completeUnitOfWork自下而上的收集effectList。

![image-20240418160146585](C:\Users\liqian\AppData\Roaming\Typora\typora-user-images\image-20240418160146585.png)

beginWork函数会根据不同的节点类型tag调用不同的函数，第一次是根fiber，会调用updateHostRoot函数，然后会调用reconcileChildren函数，该函数的输入为根fiber，子虚拟DOM元素。

![image-20240418160730467](C:\Users\liqian\AppData\Roaming\Typora\typora-user-images\image-20240418160730467.png)

![image-20240418160815881](C:\Users\liqian\AppData\Roaming\Typora\typora-user-images\image-20240418160815881.png)

reconcileChildren函数会通过虚拟DOM创建fiber子树，页面第一次初始化时，直接根据子虚拟DOM元素新建一个fiber，打上placement插入的effectTag。如果是更新时会判断当前页面的alternate fiber的子fiber的type是否和子虚拟DOM的type是否一致，一致的话就复用当前页面的alternate fiber的子fiber【当前正在创建的fiber的前前fiber】，打上update的effectTag。新建完fiber后构建fiber之间的父子兄弟节点的关系。

![image-20240418161239135](C:\Users\liqian\AppData\Roaming\Typora\typora-user-images\image-20240418161239135.png)

![image-20240418163647242](C:\Users\liqian\AppData\Roaming\Typora\typora-user-images\image-20240418163647242.png)

当前beginWork只处理了rootFiber的第一个子虚拟DOM节点，创建了其节点对应的childFiber，设置了对应的effectTag操作，设置了对应的return指针表示了rootFiber和该fiber的关系。

![image-20240418164008947](C:\Users\liqian\AppData\Roaming\Typora\typora-user-images\image-20240418164008947.png)

然后performUnitOfWork将该childFiber返回。

![image-20240418164206274](C:\Users\liqian\AppData\Roaming\Typora\typora-user-images\image-20240418164206274.png)

返回后通过while判断nextUnitOfWork还存在，为childFiber，则再次进入performUnitOfWork调度。

![image-20240418154742235](C:\Users\liqian\AppData\Roaming\Typora\typora-user-images\image-20240418154742235.png)

再次进入beginWork，由于当前fiber为函数组件，则进入对应的updateFunctionComponent执行函数

![image-20240418165445781](C:\Users\liqian\AppData\Roaming\Typora\typora-user-images\image-20240418165445781.png)

updateFunctionComponent函数会执行FunctionCounter函数，打印"render"，返回的div标签时会自动调createElement函数生成对应的虚拟DOM元素，再调用reconcileChildren函数，将虚拟DOM元素转成fiber及构建fiber间的关系，fiber中对应的effectTag。

![image-20240418205751618](C:\Users\liqian\AppData\Roaming\Typora\typora-user-images\image-20240418205751618.png)

![image-20240418205805975](C:\Users\liqian\AppData\Roaming\Typora\typora-user-images\image-20240418205805975.png)

![image-20240418210029528](C:\Users\liqian\AppData\Roaming\Typora\typora-user-images\image-20240418210029528.png)

![image-20240418211545766](C:\Users\liqian\AppData\Roaming\Typora\typora-user-images\image-20240418211545766.png)

构建的childFiber被返回，nextUnitOfWork继续循环，调用performUnitOfWork，再次进入beginWork，根据fiber的类型执行对应的函数，此时是div元素，调用updateHost函数。![image-20240418211958709](C:\Users\liqian\AppData\Roaming\Typora\typora-user-images\image-20240418211958709.png)

updateHost函数创建真实DOM节点赋值到fiber的stateNode上，再将当前fiber和子虚拟DOM传入reconcileChildren，构建该文本节点的fiber并返回。

![image-20240418212259207](C:\Users\liqian\AppData\Roaming\Typora\typora-user-images\image-20240418212259207.png)

![image-20240418213007129](C:\Users\liqian\AppData\Roaming\Typora\typora-user-images\image-20240418213007129.png)

返回的fiber赋给nextUnitWork继续进入下一循环，进入performUnitWork函数中的beginWork，根据不同的tag类型调用updateHostText函数，创建真实DOM文本节点，赋值给当前的fiber的stateNode，执行完后由于没有child会进入while循环，开始调用completeUnitOfWork进入收集副作用。

![image-20240418214954481](C:\Users\liqian\AppData\Roaming\Typora\typora-user-images\image-20240418214954481.png)

![image-20240418215812320](C:\Users\liqian\AppData\Roaming\Typora\typora-user-images\image-20240418215812320.png)

收集副作用就是将有effectTag的fiber用nextEffect链接起来，形成root--firstEffect-->'1234'--nextEffect-->div--nextEffect-->functionCounter<--lastEffect--root。

![image-20240418225119413](C:\Users\liqian\AppData\Roaming\Typora\typora-user-images\image-20240418225119413.png)

收集完副作用后nextUnitOfWork为undefined，会跳出循环，开始利用effectList循环链表commit挂载数据。

![image-20240418231209159](C:\Users\liqian\AppData\Roaming\Typora\typora-user-images\image-20240418231209159.png)

以上就是初始化时的整个流程。

---------------------------------------------------------------------------------------------------------------------------------------------

更新时















