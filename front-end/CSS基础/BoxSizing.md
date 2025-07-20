CSS 默认的 `box-sizing` 值是 `content-box`，而不是 `border-box`。`box-sizing` 属性决定了如何计算一个元素的总宽度和总高度，而 `content-box` 模式的默认值是，宽和高只包含内容区域，不包括边框和内边距。﻿

`border-box` 模式则将边框和内边距也纳入到宽和高之中，所以总的宽度和高度就等于你指定的宽度和高度。﻿

因此，如果你想让元素的宽度和高度包含边框和内边距，就需要在CSS 中显式地将 `box-sizing` 设置为 `border-box`。很多CSS 框架和样式表都会全局设置 `* { box-sizing: border-box; }` 来方便地使用 `border-box` 模型。﻿

总结： CSS 默认的 `box-sizing` 是 `content-box`，而不是 `border-box`。要使用 `border-box` 模型，需要显式地在CSS 中设置。﻿