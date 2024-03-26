1.Box 是 CSS 布局的基本单位。直观来说，一个页面是由很多个 Box 组成的。元素的类型和 display 型，决定了这个 Box 的类型。不同类型的 Box，会参与不同的 Formatting Context 格式上下文(一个决定如何渲染文档的容器)，因此 Box 内的元素会以不同的方式渲染。
block-level box：display 属性为 block,table,list-item 的元素，会生成 block-level box。并且参与 block formatting context
inline-level box：display 属性为 inline,inline-block,inline-table 的元素，会生成 inline-level box。并且参与 inline formatting context

格式上下文(Formatting context)
它是页面中的一块渲染区域，并且有一套渲染规则，它决定了其子元素将如何定位，以及和其他元素的关系和相互作用。最常见的 Formatting context 有 Block Formatting context(BFC)和 Inline Formatting context(IFC)。

BFC
它决定了元素如何对其内容进行定位，以及和其他元素的关系和相互作用。BFC 提供了一个环境，HTML 元素在这个环境中按照一定规则进行布局。一个环境中的元素不会影响到其他环境中的布局。比如浮动元素会形成 BFC，浮动元素内部子元素会受该浮动元素的影响，但两个浮动元素之间是互不影响的。可以把它理解成是一个独立的容器，并且这个容器里 box 的布局与这个容器外的毫不相干。

形成 BFC
body 本身是一个 BFC
float 不为 none
overflow 不为 visible
position 的值为 absolute 或 fixed
display 的值为 table 相关的，如 table,table-cell,table-caption 等,inline-block

BFC 的约束规则 1.内部的 Box 会在垂直方向上一个接一个的放置 2.垂直方向的距离由 margin 决定，属于同一个 BFC 的两个相邻 Box 的 margin 会发生重叠
3.BFC 的区域不会与 float 的元素区域重叠，如果一个浮动元素后面隔着一个非浮动的元素也不会覆盖，只要将非浮动元素变为 BFC 就可以 4.每个元素的 margin box 的左边， 与包含块 border box 的左边相接触(对于从左往右的格式化，否则相反)。即使存在浮动也是如此，会变窄 5.计算 BFC 的高度时，浮动子元素也参与计算
6.BFC 就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面元素，反之亦然

块级格式化上下文，页面的一块渲染区域，有一套自己的渲染规则
内部的盒子会在垂直方向上一个接一个的放置
对于同一个 BFC 的两个相邻的盒子的 margin 会发生重叠，与方向无关。
BFC 的区域不会与 float 的元素区域重叠
计算 bfc 的高度时，
BFC 就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素，反之亦然
浮动元素
overflow 不为 visible
display 的值为 flex,table,inline-block
Position 的值为 absolute 或 fixed
