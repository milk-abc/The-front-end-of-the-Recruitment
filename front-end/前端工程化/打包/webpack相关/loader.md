css-loader：
加载 CSS 文件并解析 import 的 CSS 文件，最终返回 CSS 代码
sass-loader
less-loader
ts-loader：
像加载 JavaScript 一样加载 TypeScript 2.0+
style-loader:
用于将 css 编译完成的样式，挂载到页面 style 标签上。
babel-loader：
使用 Babel 加载 ES2015+ 代码并将其转换为 ES5
file-loader：
处理文件类型资源，如 jpg,png 等图片。
url-loader：
处理图片类型资源，只不过它与 file-loader 有一点不同，url-loader 可以设置一个根据图片大小进行不同的操作，如果该图片大小大于指定的大小，则将图片进行打包资源，否则将图片转换为 base64 字符串合并到 js 文件里
vue-loader
eslint-loader：
检查代码是否符合规范，是否存在语法错误
