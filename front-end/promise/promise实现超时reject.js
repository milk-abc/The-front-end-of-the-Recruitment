let promiseWithTimeout = function (promise, timeout) {
  let timer = new Promise((resolve) => {
    setTimeout(resolve, timeout);
  }).then(() => {
    throw new Error("timeout");
  });
  return Promise.race([promise, timer]);
};
