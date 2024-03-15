##### 什么是DOM

document object model，文档对象模型，用于连接html和javascript的桥梁。

每个页面都有一个DOM树，用于对页面的表达。真实场景中用户的很多操作会导致浏览器重排【引起DOM树重新计算的行为】。一般的写法都是手动操作DOM，获取页面真实的DOM节点，然后修改数据。在复杂场景或需要频繁操作DOM的应用中，这样的写法非常消耗性能。当然也有许多方式可以避免页面重排，比如把某部分节点position设置为absolute/fixed定位，让其脱离文档流；或者在内存中处理DOM节点，完成之后推进节点等。这些方法维护成本高，代码难以维护。React为了摆脱真实DOM的噩梦，开创性的把DOM树转换为Javascript对象树，这就是虚拟DOM。简单说，它利用JS去构建真实DOM树，用于在浏览器中显示。每当数据有更新时，将重新计算整个虚拟DOM树，并和旧DOM树进行一次对比，对变化的部分进行最小程度的更新，从而避免了大范围的页面重排导致的性能问题。虚拟DOM是内存中的数据，所以本身操作性能高很多。

React赢在利用虚拟DOM可以超高性能的渲染页面，且因为操作的对象是虚拟dom，与真实浏览器无关，与是否是浏览器环境无关，只要存在能将虚拟DOM转换为真实DOM的转换器，就能将其转为真实DOM在界面中展现，从而就达到了利用React跨平台的目的，比如React native的实现。

##### 什么是 Virtual DOM

React 的官网这样描述

Virtual DOM 是一种编程概念。在这个概念里，UI 以一种理想化的，或者说“虚拟的”表现形式被保存于内存中，并通过如 ReactDOM 等类库使之与“真实的”DOM 同步。这一过程叫做协调

这种方式赋予了 React 声明式的 API：您告诉 React 希望让 UI 是什么状态，React 就确保 DOM 匹配该状态。这使您可以从属性操作、事件处理和手动 DOM 更新这些在构建应用程序时必要的操作中解放出来

React 的理念之一是 UI = f(data) ，我们通过改变 data 驱动 UI，不必去关注属性操作、事件处理和手动 DOM 更新，只用关心数据即可。而改变 data 怎么更新 UI，就是 React 做的事情了。React 怎么做的呢？

React 写 UI 到渲染视图过程
用 JSX 来写业务，JSX 其实是 createElement 的语法糖，createElement 生成一个 JS 对象，这个对象就是 Virtual DOM，它描述真实 DOM 树。当状态改变，生成新的 Virtual DOM，两者 Diff，拿着这段 patches 更新页面，减少页面的最小绘制

例如如下 DOM 结构：

html

<ul id="list">
    <li class="item">Item1</li>
    <li class="item">Item2</li>
</ul>

映射成虚拟 DOM 就是这样：

json
{
"tag": "ul",
"attrs": {
"id": "list"
},
"children": [
{
"tag": "li",
"attrs": { "className": "item" },
"children": ["Item1"]
},
{
"tag": "li",
"attrs": { "className": "item" },
"children": ["Item2"]
}
]
}

而我们写的 React 大概是这样：

jsx
function Demo() {
return (
<ul id="list">
<li className="item">Item1</li>
<li className="item">Item2</li>
</ul>
)
}

总结来说，理解 Virtual DOM 的含义可以从以下几点出发：

Virtual DOM 就是描述真实 DOM 的一个对象，并且它至少包含了 tag、props、children 三个属性
Virtual DOM 并不是真实的 DOM，它跟原生 DOM 本质上没有什么关系
本质上 Virtual DOM 对应的是一个 JavaScript 对象，它描述的是视图和应用状态之间的一种映射关系，是某一时刻真实 DOM 状态的内存映射
在视图显示方面，Virtual DOM 对象的节点跟真实 DOM Tree 每个位置的属性一一对应
我们不再需要直接的操作 DOM，只需要关注应用的状态即可，操作 DOM 的事情由框架做了

1.虚拟DOM的生成

React使用JSX/createElement等方法来描述UI，这些描述在内部被转换为虚拟DOM对象。虚拟DOM是真实DOM的轻量级Javascript表示，它包含了组件的层次结构和属性信息。

2.当组件状态或属性变化时

当组件的状态或属性发生变化时，React会重新计算并生产一颗新的虚拟DOM树。此时，Diff算法将开始工作，比较新旧虚拟DOM树之间的差异。

3.Diff算法的比较过程

React18前Diff算法采用深度优先和同层比较的策略来比较新旧虚拟DOM树。它首先比较两个树的根节点，然后递归地比较它们的子节点。

节点类型比较：如果新旧节点的类型不同，React会比较节点的属性。只有属性发生变化时，React才会更新对应的DOM属性。

属性比较：如果节点类型相同，React会比较节点的属性，只有属性发生变化时，React才会更新对应的DOM属性。

子节点比较：对于子节点的比较，React采用了一种启发式的方法。它首先假设两个子节点是相似的，并尝试找到一个最长的递增子序列。然后它根据这个子序列移动添加删除节点，以最小化DOM操作。

批量更新和事务机制
