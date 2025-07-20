app.use(path,callback)中的 callback 既可以是 router 对象又可以是函数
app.get(path,callback)中的 callback 只能是函数

当一个路由有好多个子路由时用 app.use(path,router)
例子：
http://localhost:3000/home/one
http://localhost:3000/home/second
http://localhost:3000/home/three
路由/home 后面有三个子路由紧紧跟随，分别是/one,/second,/three
如果使用 app.get()，则要不断的重复,很麻烦，也不利用区分

app.get("/home",callback)
app.get("/home/one",callback)
app.get("/home/second",callback)
app.get("/home/three",callback)
我们可以创建一个 router.js 专门用来一个路由匹配多个子路由

var express = require('express')
var router = express.Router()
router.get("/",(req,res)=>{
res.send("/")
})
router.get("/one",(req,res)=>{
res.send("one")
})
router.get("/second",(req,res)=>{
res.send("second")
})
router.get("/treen",(req,res)=>{
res.send("treen")
})
module.exports = router;
在 app.js 中导入 router.js

var express = require('express')
var router = require("./router")
var app = express()

app.use('/home',router) //router 路由对象中的路由都会匹配到"/home"路由后面
app.get('/about', function (req, res) {
console.log(req.query)
res.send('你好，我是 Express!')
})

// 4 .启动服务
app.listen(3000, function () {
console.log('app is running at port 3000.')
})
那么，什么时用 app.use，什么时用 app.get 呢？

路由规则是 app.use(path,router)定义的，router 代表一个由 express.Router()创建的对象，在路由对象中可定义多个路由规则。可是如果我们的路由只有一条规则时，可直接接一个回调作为简写，也可直接使用 app.get 或 app.post 方法。即
当一个路径有多个匹配规则时，使用 app.use（）

app.use(express.static('public'));
为了提供对静态资源文件（图片，css，js 文件）的服务，请使用 Express 内置的中间函数 express.static.

传递一个包含静态资源的目录给 express.static 中间件用于立即开始提供文件。 比如用以下代码来提供 public 目录下的图片、css 文件和 js 文件：
app.use(express.static('public'));

如果前台想请求后台 public 目录下 images/08.jpg 静态的图片资源
通过： http://localhost:3000/images/08.jpg

通过多次使用 express.static 中间件来添加多个静态资源目录:

app.use(express.static('public'));
app.use(express.static('file'));
Express 将会按照你设置静态资源目录的顺序来查看静态资源文件。

为了给静态资源文件创建一个虚拟的文件前缀（文件系统中不存在），可以使用 express.static 函数指定一个虚拟的静态目录，如下：

app.use('/static', express.static('public'))
现在你可以使用‘/static’作为前缀来加载 public 文件夹下的文件了

https://www.jianshu.com/p/1d92463ebb69
https://expressjs.com/zh-cn/guide/writing-middleware.html

开发
以下是称为“myLogger”的中间件函数的简单示例。此函数仅在应用程序的请求通过它时显示“LOGGED”。中间件函数会分配给名为 myLogger 的变量。

var myLogger = function (req, res, next) {
console.log('LOGGED');
next();
};

请注意以上对 next() 的调用。调用此函数时，将调用应用程序中的下一个中间件函数。 next() 函数不是 Node.js 或 Express API 的一部分，而是传递给中间件函数的第三自变量。next() 函数可以命名为任何名称，但是按约定，始终命名为“next”。为了避免混淆，请始终使用此约定。

要装入中间件函数，请调用 app.use() 并指定中间件函数。 例如，以下代码在根路径 (/) 的路由之前装入 myLogger 中间件函数。

var express = require('express');
var app = express();

var myLogger = function (req, res, next) {
console.log('LOGGED');
next();
};

app.use(myLogger);

app.get('/', function (req, res) {
res.send('Hello World!');
});

app.listen(3000);

应用程序每次收到请求时，会在终端上显示消息“LOGGED”。

中间件装入顺序很重要：首先装入的中间件函数也首先被执行。

如果在根路径的路由之后装入 myLogger，那么请求永远都不会到达该函数，应用程序也不会显示“LOGGED”，因为根路径的路由处理程序终止了请求/响应循环。

中间件函数 myLogger 只是显示消息，然后通过调用 next() 函数将请求传递到堆栈中的下一个中间件函数。

下一个示例将名为 requestTime 的属性添加到请求对象。我们将此中间件函数命名为“requestTime”。

var requestTime = function (req, res, next) {
req.requestTime = Date.now();
next();
};

现在，该应用程序使用 requestTime 中间件函数。此外，根路径路由的回调函数使用由中间件函数添加到 req（请求对象）的属性。

var express = require('express');
var app = express();

var requestTime = function (req, res, next) {
req.requestTime = Date.now();
next();
};

app.use(requestTime);

app.get('/', function (req, res) {
var responseText = 'Hello World!';
responseText += 'Requested at: ' + req.requestTime + '';
res.send(responseText);
});

app.listen(3000);

您向应用程序根发出请求时，此应用程序当前在浏览器中显示请求的时间戳记。
