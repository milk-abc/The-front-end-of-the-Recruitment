const express = require("express");
const app = express();
//因为除了get请求外还有个options预检请求，所以用app.all函数来通用
app.all("/home", function (request, response) {
  response.setHeader("Access-control-allow-origin", "*");
  response.setHeader("Access-control-allow-headers", "Cache-Control,Pragma");
  response.send("okk");
});
app.listen(3000, () => {
  console.log("服务已启动，3000端口监听中");
});
