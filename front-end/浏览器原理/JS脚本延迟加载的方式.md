![img](https://picx.zhimg.com/v2-15984b18da548cd9b532c46d9c6d0863_720w.jpg?source=d16d100b)

1.处理 HTML 标记并构建 DOM 树，包含了页面的所有内容

2.处理 CSS 标记并构建 CSSOM 树，包含了页面的所有样式

3.将 DOM 与 CSSOM 合并成一个渲染树，对于每个可见节点，为其找到适配的 CSSOM 规则并应用它们

4.根据渲染树来布局(layout)，以计算每个节点的几何信息(第一次确定节点的大小和位置称为 layout，后续重新计算节点大小和位置称为回流)

5.绘制渲染树，绘制页面像素信息

6.浏览器会将各层的信息发送给 GPU，GPU 会将各层合成，显示在屏幕上

![img](https://pic1.zhimg.com/v2-3c5c80862bddbb18f5fa82166567d17e_720w.jpg?source=d16d100b)

![img](https://picx.zhimg.com/v2-a3aa45512a652a84adaf3ba032efdf3a_720w.jpg?source=d16d100b)

如果 DOM 树已经构建完成，CSS 还在加载解析中，会阻塞渲染树渲染(渲染时需等 css 加载完毕，因为 render 树需要 css 信息)
在构建 DOM 树时，HTML 解析器若遇到了 javascript(默认未设置 defer 和 ansyc)，那么它会暂停构建 DOM，将控制权交给 javascript 引擎，等 javascript 引擎运行完毕，浏览器再从中断的地方恢复 DOM 构建。如果浏览器尚未完成 CSSOM 的下载和构建，但此时要运行 javascript，那么浏览器将延迟脚本执行和 DOM 构建，直至其完成 CSSOM 的下载和构建，然后再执行脚本，最后再继续构建 DOM。因为 javascript 不仅可以改变 DOM 还可以更改 CSSOM，要不会导致这边在构建，那边 javascript 在改，无法保证最后得到的 DOM 和 CSSOM 是否正确。
这会导致严重的性能问题，我们假设构建 DOM 需要一秒，构建 CSSOM 需要一秒，那么正常情况下只需要一秒钟 DOM 和 CSSOM 就会同时构建完毕然后进入到下一个阶段。但是如果引入了 JavaScript，那么 JavaScript 会阻塞 DOM 的构建并等待 CSSOM 的下载和构建，一秒钟之后，假设执行 JavaScript 需要 0.00000001 秒，那么从中断的地方恢复 DOM 的构建后，还需要一秒钟的时间才能完成 DOM 的构建，总共花费了 2 秒钟才进入到下一个阶段。如图 6-1 所示。
所以，CSS 的加载速度与构建 CSSOM 的速度将直接影响首屏渲染速度，因此在默认情况下 CSS 被视为阻塞渲染的资源。
为什么外链 CSS 要放在头部？

如果将 CSS 放在头部，CSS 的下载解析是可以和 html 的解析同步进行的，放到尾部，要花费额外时间来解析 CSS，如果 CSS 很多的话，浏览器只能先渲染出一个没有样式的页面，等 CSS 加载完后会再渲染成一个有样式的页面，页面会出现明显的闪动的现象。

为什么 script 要放在尾部？

因为当浏览器解析到 script 的时候，就会立即下载执行，中断 html 的解析过程，如果外部脚本加载时间很长（比如一直无法完成下载），就会造成网页长时间失去响应，浏览器就会呈现“假死”状态，这被称为“阻塞效应”。

<script src="script.js"></script> 没有 defer 或 async，浏览器遇到script时，会立即加载并执行指定的脚本。“立即”指的是在渲染该 script 标签之下的文档元素之前，也就是说不等待后续载入的文档元素，读到就加载并执行。
<script async src="script.js"></script> 有 async，加载和渲染后续文档元素的过程将和 script.js 的加载并行进行（异步），加载完script.js后暂停后续文档元素的渲染，执行script.js。
<script defer src="myscript.js"></script> 有 defer，加载后续文档元素的过程将和 script.js 的加载并行进行（异步），但是 script.js 的执行要在所有元素解析完成之后，DOMContentLoaded 事件触发之前完成。

当 DOMContentLoaded 事件触发时，仅当 DOM 加载完成，不包括样式表，图片。
(譬如如果有 async 加载的脚本就不一定完成)

当 onload 事件触发时，页面上所有的 DOM，样式表，脚本，图片都已经加载完成了。 （渲染完毕了）

![img](https://pic1.zhimg.com/v2-5581453723f5d44f701d98e5c9244868_720w.jpg?source=d16d100b)

![preview](https://segmentfault.com/img/bVbklQc/view)

预加载扫描器

浏览器构建 DOM 树时，这个过程占用了主线程。当这种情况发生的时候，预加载扫描仪将解析可用的内容并请求高优先级资源，如 CSS、Javascript 和 web 字体。浏览器会开启一个线程，它将在后台检索资源，以便在主 HTML 解析器到达请求的资源时，它们可能已经在运行，或者已经被下载。预加载扫描仪提供的优化减少了阻塞。这代表着在不存在任何阻塞的情况下，理论上 JS 和 CSS 的下载都非常优先，和位置无关。

https://segmentfault.com/a/1190000017204460

正常 js 脚本是加载 js 和执行 js 都会阻塞渲染，但 defer 和 async 是异步加载，defer 是渲染后再执行,async 是加载后执行

https://mp.weixin.qq.com/s?__biz=Mzg4MTYwMzY1Mw==&mid=2247495963&idx=1&sn=0c4d17e24e176f96ee879c1e4df9068d&source=41#wechat_redirect
