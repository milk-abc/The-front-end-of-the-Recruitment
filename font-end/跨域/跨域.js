var express = require("express");
var app = express();
app.use(express.static(__dirname));
app.listen(90);
var app2 = express();
//修改响应头
// app2.get("/", function (req, res) {
//   res.header("Access-Control-Allow-Origin", "http://localhost:90");
//   res.send("您好");
// });
//jsonp
app2.get("/", function (req, res) {
  let func = req.query.callback;
  res.send(func + "('您好')");
});
app2.listen(91);
