Promise.prototype.allSettled = function (promises) {
  let res = [];
  let len = promises.length;
  return new Promise((resolve) => {
    promises.forEach((p, index) => {
      p.then(
        (value) => {
          res[index] = { status: "fulfilled", value: value };
        },
        (reason) => {
          res[index] = { status: "reject", reason: reason };
        }
      ).finally(() => {
        len--;
        if (len === 0) {
          resolve(res);
        }
      });
    });
  });
};
