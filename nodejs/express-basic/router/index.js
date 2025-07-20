const express = require("express");
const router = express.Router();
const { list } = require("../controller");
//获取数据
router.get("/", list);
//添加数据
router.post("/index", (req, res, next) => {
  const data = req.body;
  console.log(data);
  res.send(data);
});
//修改数据-覆盖式修改
router.put("/index", (req, res, next) => {
  const data = req.body;
  console.log(data);
  res.send("put response");
});
//修改数据-增量修改
router.patch("/index", (req, res, next) => {
  res.send("patch response");
});
//删除数据
router.delete("/index", (req, res, next) => {
  res.send("delete response");
});
router.all("./index", (req, res, next) => {
  res.send("hello");
});
module.exports = router;
