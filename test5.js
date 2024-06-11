Promise.prototype.all = (promises) => {
  //所有期约成功则按需返回结果，其中一个失败立即返回失败的
  return new Promise((resolve, reject) => {
    const res = [];
    const len = promises.length;
    let count = 0;
    promises.forEach((promise, index) => {
      promise.then(
        (value) => {
          count += 1;
          res[index] = value;
          if (count === len) {
            resolve(res);
          }
        },
        (error) => {
          reject(error);
        }
      );
    });
  });
};

let promise1 = new Promise((resolve, reject) => {});
const promises = [];
