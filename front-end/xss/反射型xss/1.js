const express = require("express");
const app = express();

app.use(express.static("./xss"));
app.get("/", function (req, res) {
  res.setHeader("X-XSS-Protection", 0); // 这个处理是为了关闭现代浏览器的xss防护
  res.writeHead(200, { "Content-Type": "text/html;charset=utf-8" });
  res.end("早上好" + req.query["name"]);
});

app.listen(3000);
