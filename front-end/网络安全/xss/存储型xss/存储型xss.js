const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const fs = require("fs");
app.use(express.static("./存储型xss"));
//parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extend: false }));
app.use(bodyParser.json());
app.use(function (req, res, next) {
  //模拟设置用户token//每次进入都会调用这个函数
  res.setHeader("Content-Type", "text/html;charset=utf-8");
  res.setHeader("Set-Cookie", "token=zkskskdngqkkkgn245tkdkgj;HttpOnly");
  //res.cookie("token", "zkkks");
  next();
});
app.get("/", function (req, res) {
  res.setHeader("X-XSS-Protection", 0);
  res.send("早上好" + req.query["name"]);
});
app.get("/persistence-xss", function (req, res) {
  fs.readFile("./data.txt", function (err, data) {
    if (err) {
      return res.send(err);
    }
    res.send(data);
  });
});
app.post("/postArticle", function (req, res) {
  const content = req.body.content + "\n";
  //存储xss
  fs.writeFile("./data.txt", content, function (err) {
    if (err) {
      return res.send({ status: 500, message: err.message });
    }
    res.send({ status: 200, message: "保存成功" });
  });
});
app.listen(3000);
