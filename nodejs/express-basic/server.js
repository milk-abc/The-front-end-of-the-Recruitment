const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const router = require("./router/index.js");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/", router);
app.listen(8080, () => {
  console.log("localhost:8080");
});
