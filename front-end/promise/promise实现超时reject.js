let promiseWithTimeout = function (promise, timeout) {
  function delayPromise(timeout) {
    return new Promise((resolve) => {
      setTimeout(resolve, timeout);
    });
  }
  let timer = delayPromise(timeout).then(() => {
    throw new Error("timeout");
  });
  return Promise.race([promise, timer]);
};
