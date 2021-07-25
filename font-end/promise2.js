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
