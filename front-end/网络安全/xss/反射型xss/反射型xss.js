const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 8888;

// 对post方式 Content-Type: application/x-www-form-urlencoded  进行解析 以拿到 body的信息
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/**
 * @description: 返回 注册的 用户名
 * @param {type}
 * @return:
 */

app.post("/register", function (req, resp) {
  resp.setHeader("Access-Control-Allow-Origin", "*");
  resp.setHeader("Access-Control-Allow-Headers", "*");
  resp.setHeader("Access-Control-Allow-Methods", "GET,POST,DELETE,OPTIONS");
  const { username, password, safe } = req.body;
  console.log(username, password, safe);

  //设置response编码为utf-8
  resp.writeHead(200, { "Content-Type": "text/html;charset=utf-8" });

  // console.log(`注册成功,欢迎 ${username}\n`);
  // resp.write(`<script>alert('yyy')</script>`);
  // safe 有值时过滤 username
  resp.end(
    String.raw`注册成功\\n,欢迎 ${safe ? SaferHTML(username) : username}`
  );
});

/**
 * @description: 过滤 HTML 字符串
 * @param {type}
 * @return:
 */
function SaferHTML(templateData) {
  let s = "";
  for (let arg of templateData) {
    s += arg.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }
  return s;
}

app.listen(port, () => console.log(`Server listening on port ${port}!`));
