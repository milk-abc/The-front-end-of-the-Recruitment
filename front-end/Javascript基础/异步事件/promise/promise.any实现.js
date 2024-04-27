// 只要传入的 promise 有一个是 fullfilled 则立即 resolve 出去，
//否则将所有 reject 结果收集起来并返回自定义 error
MyPromise.any = function (promises) {
  let res = [];
  return new Promise((resolve, reject) => {
    promises.forEach((promise, index) => {
      promise.then(
        (value) => {
          resolve(value);
        },
        (error) => {
          res[index] = new Error(error);
          if (res.length === promises.length) {
            reject(res);
          }
        }
      );
    });
  });
};
Promise.any = (promises) => {
  return new Promise((resolve, reject) => {
    let hasOneResolved = false;
    let remaining = promises.length;
    const errors = [];
    promises.forEach((promise, index) => {
      promise.then(
        (data) => {
          if (hasOneResolved) return;
          hasOneResolved = true;
          resolve(data);
        },
        (err) => {
          if (hasOneResolved) return;
          remaining--;
          errors[index] = err;
          remaining || reject(errors);
        }
      );
    });
  });
};
