//同源策略指的是协议，域名，端口相同
//cookie,localstorage,indexdb无法读取
//dom无法获得；ajax请求无法发送
//网页通过动态添加一个<script>元素，用它向跨域网址发出请求，该请求查询字符串有一个callback参数
//用来指定回调函数的名字
//服务器收到这个请求以后，会将数据放在回调函数的参数位置返回
//jsonp只能发送get请求，因为它是使用带参数的查询字符串
function result(data) {
    //我们就简单的获取apple搜索结果的第一条记录中url数据
    console.log(data.responseData.results[0].unescapedUrl);
}
function addScriptTag(src) {
    //添加<script>标签的方法
    var script = document.createElement('script');
    script.setAttribute("type", "text/javascript");
    script.src = src;
    document.body.appendChild(script);
}
window.onload = function () {
    //搜索apple，将自定义的回调函数名result传入callback参数中
    addScriptTag("http://ajax.googleapis.com/ajax/services/search/web?v=1.0&q=apple&callback=result");
}
//websocket请求头中有一个字段是origin，标识该请求的请求源，服务器可以根据这个字段，判断是否许可本次通信
//CORS允许浏览器向跨源服务器发送XMLHttpRequest请求
//需要IE10及以上

//简单请求Head,get,post;字段Accept,Accept-language,content-language,content-type的值为
//application/x-www-form-urlencoded、multipart/form-data、text/plain
//浏览器发现这次跨域ajax请求是简单请求，就自动在头信息之中添加origin字段，
//标识该请求的请求源，服务器可以根据这个字段，判断是否许可本次通信
//如果不许可，服务器会返回一个正常的HTTP回应，响应头信息没有Access-control-allow-origin字段，
//浏览器会抛出错误，被XMLHttpRequest的onerror回调函数捕获。
//非简单请求,put,delete,content-type的值为application/json
//会在正式通信前增加一次HTTP查询请求，称为预检请求，浏览器先询问服务器，当前网页所在的域名是否在服务器的
//许可名单之中，以及可以使用哪些HTTP头信息字段，只有得到肯定答复，浏览器才会发出正式的XMLHttpRequest请求
//否则就报错。"预检"请求用的请求方法是OPTIONS，表示这个请求是用来询问的。
//服务器收到"预检"请求以后，检查了Origin、Access-Control-Request-Method和
//Access-Control-Request-Headers字段以后，确认允许跨源请求，就可以做出回应。
//服务器响应头Access-Control-Allow-Origin字段，表示允许这个字段的值请求数据
//如果服务器否定了预检请求，会返回一个正常的HTTP回应，但是没有任何CORS相关的头信息字段。
//浏览器就会认定，服务器不同意预检请求，因此触发一个错误，被XMLHttpRequest对象的onerror回调函数捕获
//一旦服务器通过了预检请求，以后每次浏览器正常的CORS请求都跟简单请求一样，会有一个origin头信息字段
//服务器的回应也都会有一个Access-contorl-allow-origin头信息字段
//GET和POST的区别
//GET 方法的参数应该放在 url中，POST 方法参数应该放在 body中
//两种方法本质上是 TCP 连接，没有差别,我们可以在 URL 上写参数，然后方法使用 POST
//也可以在 Body 写参数，然后方法使用 GET。当然，这需要服务端支持。
//从传输的角度来说，他们都是不安全的，因为 HTTP 在网络上是明文传输的，只要在网络节点上捉包，
//就能完整地获取数据报文
//HTTP 协议没有 Body 和 URL 的长度限制，对 URL 限制的大多是浏览器和服务器的原因
HTTP请求中的常用请求头字段
// Accept：用于高速服务器，客户机支持的数据类型
// Accept-Charset：用于告诉服务器，客户机采用的编码格式
// Accept-Encoding：用于告诉服务器，客户机支持的数据压缩格式
// Accept-Language：客户机的语言环境
// Host：客户机通过这个头高速服务器，想访问的主机名
// If-Modified-Since：客户机通过这个头告诉服务器，资源的缓存时间
// Referer：客户机通过这个头告诉服务器，它是从哪个资源来访问服务器的（防盗链）
// User-Agent：客户机通过这个头告诉服务器，客户机的软件环境
// Cookie：客户机通过这个头可以向服务器带数据
// Connection：处理完这次请求后是否断开连接还是继续保持连接
// Date：当前时间值
HTTP响应
// 状态行：用于描述服务器对请求的处理结果。

// 状态码：100~199：表示成功接收请求，要求客户端继续提交下一次请求才能完成整个处理过程。
//  200~299：表示成功接收请求并已完成整个处理过程。常用200
//  300~399：为完成请求，客户需进一步细化请求。例如：请求的资源已经移动一个新地址、常用302（意味着你请求我，我让你去找别人）,307和304（我不给你这个资源，自己拿缓存）
//  400~499：客户端的请求有错误，常用404（意味着你请求的资源在web服务器中没有）403（服务器拒绝访问，权限不够）
//  500~599：服务器端出现错误，常用500
// 多个响应头：响应头用于描述服务器的基本信息，以及数据的描述，服务器通过这些数据的描述信息，可以通知客户端如何处理等一会儿它回送的数据。
// Location：这个头配合302状态码使用，用于告诉客户找谁。
// Server：服务器通过这个头告诉浏览器服务器的类型。
// Content-Encoding：服务器通过这个头告诉浏览器数据的压缩格式。
// Content-Length：服务器通过这个头告诉浏览器回送数据的长度
// Content-Type  ：服务器通过这个头告诉浏览器回送数据的类型
// Last-Modified：告诉浏览器当前资源的最后缓存时间
// Refresh：告诉浏览器隔多久刷新一次
// Content-Disposition：告诉浏览器以下载方式打开数据
// Transfer-Encoding：告诉浏览器数据的传送格式
// ETag：缓存相关的头
// ········三种禁止浏览器缓存的头字段：
//  Expires：告诉浏览器把回送的资源缓存多长时间 -1或0则是不缓存
//  Cache-Control：no-cache
//  Pragma：no-cache
// 服务器通过以上两个头，也就是控制浏览器不要缓存数据

// 实体内容：代表服务器向客户端回送的数据

