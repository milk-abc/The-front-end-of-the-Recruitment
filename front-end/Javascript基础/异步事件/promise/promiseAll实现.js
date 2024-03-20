Promise.prototype.all = function (promises) {
  let res = [];
  let len = 0;
  return new Promise((resolve, reject) => {
    promises.forEach((promise, index) => {
      promise.then(
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
//验证promise
const promises = [
  new Promise((resolve, reject) => {
    setTimeout(() => resolve(3), 100);
  }),
  new Promise((resolve, reject) => {
    setTimeout(() => reject(3), 0);
  }),
  new Promise((resolve, reject) => {
    setTimeout(() => resolve(5), 0);
  }),
];
Promise.prototype
  .all(promises)
  .then((value) => {
    console.log(value);
  })
  .catch((error) => {
    console.error("an error");
  });
