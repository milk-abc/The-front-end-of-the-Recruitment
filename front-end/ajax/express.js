const express = require("express");
//创建应用对象
const app = express();
//创建路由规则
//request是对请求报文的封装
//reponse是对响应报文的封装
//因为会发两次请求，第一次是options请求，第二次才是post请求，不写all的话就要写options和post
app.all("/server", (request, response) => {
  //设置响应体
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.setHeader("Access-Control-Allow-Headers", "*");
  response.setHeader("Access-Control-Allow-Methods", "GET,POST,DELETE,OPTIONS");
  // response.setHeader("Access-Control-Allow-Headers", "content-type");
  // response.setHeader("Access-Control-Allow-Credentials", "true");
  //设置响应体 send里面只能接受字符串，不能接收对象
  const data = {
    name: "atgu3",
  };
  //对对象进行字符串转换
  setTimeout(() => {
    response.send(JSON.stringify(data));
  }, 3000);
});
//监听端口
app.listen(8000, () => {
  console.log("服务已启动，8000端口监听中");
});
