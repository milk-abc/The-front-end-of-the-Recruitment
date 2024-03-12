let promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(3);
  }, 10);
});
//由于无法知道promise的最终状态，
//所以finally的回调函数中不接收任何参数，
//它仅用于无论最终结果如何都要执行的情况。
Promise.prototype.finally = function (callback) {
  let P = this.constructor;
  return this.then(
    (value) => P.resolve(callback()).then(() => value),
    (reason) =>
      P.resolve(callback()).then(() => {
        throw reason;
      })
  );
};
promise
  .then((res) => {
    return res;
  })
  .finally(() => {
    console.log(1);
  });
