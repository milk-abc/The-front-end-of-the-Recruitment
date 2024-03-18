![alt text](image-2.png)

![image-20240312102829332](C:\Users\liqian\AppData\Roaming\Typora\typora-user-images\image-20240312102829332.png)

![image-20240312102847498](C:\Users\liqian\AppData\Roaming\Typora\typora-user-images\image-20240312102847498.png)

![image-20240312102939348](C:\Users\liqian\AppData\Roaming\Typora\typora-user-images\image-20240312102939348.png)

![image-20240312103105497](C:\Users\liqian\AppData\Roaming\Typora\typora-user-images\image-20240312103105497.png)

JavaScript 控制着 HTML 的内容！这也是为什么 在 React 中，渲染逻辑和标签共同存在于同一个地方——组件。

##### JSX规则

1.只能返回一个根元素：如果想要在一个组件中包含多个元素，需要用一个父标签把它们包裹起来，可以使用一个<div></div>、<></>

这个空标签被称作 *[Fragment](https://zh-hans.react.dev/reference/react/Fragment)*。React Fragment 允许你将子元素分组，而不会在 HTML 结构中添加额外节点。

JSX 虽然看起来很像 HTML，但在底层其实被转化为了 JavaScript 对象，你不能在一个函数中返回多个对象，除非用一个数组把他们包装起来。这就是为什么多个 JSX 标签必须要用一个父元素或者 Fragment 来包裹。【后续看源码解释】

2.标签必须闭合

像 `<img>` 这样的自闭合标签必须书写成 `<img />`，而像 `<li>oranges` 这样只有开始标签的元素必须带有闭合标签，需要改为 `<li>oranges</li>`。

3.使用驼峰式命名法给 所有 大部分属性命名！ 

JSX如何使用JavaScript

- 如何使用引号传递字符串 直接传递
- 在 JSX 的大括号内引用 JavaScript 变量 
- 在 JSX 的大括号内调用 JavaScript 函数
- 在 JSX 的大括号内使用 JavaScript 对象

### 可以在哪使用大括号 

在 JSX 中，只能在以下两种场景中使用大括号：

1. 用作 JSX 标签内的**文本**：`<h1>{name}'s To Do List</h1>` 是有效的，但是 `<{tag}>Gregorio Y. Zara's To Do List</{tag}>` 无效。
2. 用作紧跟在 `=` 符号后的 **属性**：`src={avatar}` 会读取 `avatar` 变量，但是 `src="{avatar}"` 只会传一个字符串 `{avatar}`。

## 使用 “双大括号”：JSX 中的 CSS 和 对象 

除了字符串、数字和其它 JavaScript 表达式，你甚至可以在 JSX 中传递对象。对象也用大括号表示，例如 `{ name: "Hedy Lamarr", inventions: 5 }`。因此，为了能在 JSX 中传递，你必须用另一对额外的大括号包裹对象：`person={{ name: "Hedy Lamarr", inventions: 5 }}`。

传递对象复杂时可以用函数封装，传递函数进去。
