Promise.prototype.allSettled = function (promises) {
  let res = [];
  return new Promise((resolve) => {
    promises.forEach((p) => {
      p.then(
        (value) => res.push({ status: "fulfilled", value: value }),
        (reason) => {
          res.push({ status: "reject", reason: reason });
        }
      ).finally(() => {
        resolve(data);
      });
    });
  });
};
