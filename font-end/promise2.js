function fn(msg) {
  return new Promise(function (resolve, rejected) {
    setTimeout(function () {
      resolve(msg);
    }, 10);
  });
}
fn("hello")
  .then((value) => {
    return fn(value + "lagou");
  })
  .then((value) => {
    return fn(value + "I ? U");
  })
  .then((value) => {
    console.log(value);
  });
let fs = require("fs");
function fn1(filename) {
  return new Promise(function (resolve, rejected) {
    fs.readFile(filename, "utf8", function (err, data) {
      if (err) {
        rejected(err);
      }
      resolve(data);
    });
  });
}
fn1("./1.txt")
  .then((value) => {
    return fn1(value);
  })
  .then((value) => {
    return fn1(value);
  })
  .then((value) => {
    console.log(value);
  });
