无 defer,async，遇到脚本浏览器会停止解析 html，会立即加载并执行指定脚本

<script async src="script.js"></script>

有 async，加载和渲染后续文档元素的过程将和 script.js 的加载并行进行，加载完之后停止渲染立即执行脚本。

<script defer src="myscript.js"></script>

有 defer，加载后续文档元素的过程将和 脚本 的加载并行进行（异步），但是脚本的执行要在所有元素解析完成之后，DOMContentLoaded 事件触发之前完成。
