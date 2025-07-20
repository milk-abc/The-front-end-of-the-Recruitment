Promise.prototype.all = function (promises) {
  let res = [];
  let len = 0;
  return new Promise((resolve, reject) => {
    promises.forEach((promise, index) => {
      Promise.resolve(promise).then(
        (value) => {
          len++;
          res[index] = value;
          if (len === promises.length) {
            resolve(res);
          }
        },
        (error) => reject(error)
      );
    });
  });
};
