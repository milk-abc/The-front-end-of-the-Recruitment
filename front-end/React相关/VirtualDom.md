什么是 Virtual DOM
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
1
2
3
4
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
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
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
1
2
3
4
5
6
7
8
总结来说，理解 Virtual DOM 的含义可以从以下几点出发：

Virtual DOM 就是描述真实 DOM 的一个对象，并且它至少包含了 tag、props、children 三个属性
Virtual DOM 并不是真实的 DOM，它跟原生 DOM 本质上没有什么关系
本质上 Virtual DOM 对应的是一个 JavaScript 对象，它描述的是视图和应用状态之间的一种映射关系，是某一时刻真实 DOM 状态的内存映射
在视图显示方面，Virtual DOM 对象的节点跟真实 DOM Tree 每个位置的属性一一对应
我们不再需要直接的操作 DOM，只需要关注应用的状态即可，操作 DOM 的事情由框架做了