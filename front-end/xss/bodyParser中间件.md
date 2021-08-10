bodyParser中间件用于解析http请求体，是express默认使用的中间件之一

常见的四种Content-Type类型

1.application/x-www-form-urlencoded 常见的form提交
当表单使用 POST 请求时，数据会被以 x-www-urlencoded 方式编码到 Body 中来传送，
而如果 GET 请求，则是附在 url 链接后面来发送。

GET 请求只支持 ASCII 字符集，因此，如果我们要发送更大字符集的内容，我们应使用 POST 请求。

如果 form 中传递的是二进制数据，那么 application/x-www-form-urlencoded 会把其编码转换成 ASCII 类型。对于 1 个 non-ASCII 字符，它需要用 3 个 ASCII字符来表示，如果要发送大量的二进制数据（non-ASCII），"application/x-www-form-urlencoded" 显然是低效的。

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.post('/api/user/insert', function (req, res) {
    console.log(req.body);
})

2.multipart/form-data 文件提交
用以支持向服务器发送二进制数据

var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();
app.post('/formdata',multipartMiddleware, function (req, res) {
  console.log(req.body);
  res.send("post successfully!");
});

3.application/json 提交json格式的数据

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.post('/api/user/insert', function (req, res) {
    console.log(req.body);
})

4.text/xml 提交xml格式的数据
body-parser默认不支持这种数据格式
解决方法：把请求体参数按照字符串读取出来,然后使用 xml2json 包把字符串解析成json对象，然后对json对象进行操作，方便得多。
注意：我们还是要使用 body-parse 得到字符串,然后再转化.
利用req上定义的事件 data 来获取http请求流, end 事件结束请求流的处理.
利用 xml2json 把上面得到的请求参数流(我们直接转化为字符串)转化为 json 对象.
demo如下：

var express = require('express');
var bodyParser = require('body-parser');
var xml2json=require('xml2json');
var app = express();
app.use(bodyParser.urlencoded({
  extended: true
}));
app.post('/xml', function (req, res) {
  req.rawBody = '';//添加接收变量
  var json={};
  req.setEncoding('utf8');
  req.on('data', function(chunk) { 
    req.rawBody += chunk;
  });
  req.on('end', function() {
  json=xml2json.toJson(req.rawBody);
  res.send(JSON.stringify(json));
  }); 
});
app.listen(3000);