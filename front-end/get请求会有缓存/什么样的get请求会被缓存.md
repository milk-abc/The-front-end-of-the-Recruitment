IE 浏览器会缓存网页中的 GET 和 XHR 的内容，请求方式是 get 方式时，IE 浏览器会进行识别。如果该 get 请求的 url 是第一次请求的话，会请求服务器，从数据库中获取数据；如果该 get 请求的 url 不是第一次请求的话，那么该 url 就不会请求服务器，IE 浏览器会直接从缓存中拿到上次该 url 获取的数据。无论是什么插件的 get 方式请求，IE 浏览器都会这样进行处理的，从而导致数据不同步。谷歌浏览器不会出现这种情况。

https://blog.csdn.net/qq_26941173/article/details/84935421
禁止浏览器缓存的常用方法：


1.html 页面设置 meta 标签
<meta http-equiv="Cache-Control" content="no-store"/>
因浏览器不同或者同一浏览器间版本不同，这个方法有很大的兼容性，很多时候没有作用


2.在get请求的URL参数后面加时间戳或者随机数
xhr.open("get", "http://127.0.0.01:3000/home?t" + new Date());
虽然能解决IE每次只从浏览器缓存中读取数据，但每个ajax都会去请求服务器，性能不好


3.前端后端设置对应http头
header:{
	'cache-control':'no-cache',
	'Pragma':'no-cache'//兼容基于http/1.0的客户端
}
后端跨域需要添加一下
response.setHeader('Access-control-allow-headers','cache-control')
