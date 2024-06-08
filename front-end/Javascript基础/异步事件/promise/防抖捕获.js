function debounce(func, timeout) {
  let timer = null;
  return function () {
    return new Promise((resolve, reject) => {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        try {
          const value = func.apply(this, arguments);
          resolve(value);
        } catch (e) {
          reject(e);
        }
      }, timeout);
    });
  };
}
const test = () => {
  console.log("hhh");
  throw new Error("error");
  return 123;
};
const debouncePromise = debounce(test, 100000);
debouncePromise().then(
  (value) => console.log(value),
  (error) => console.log("123", error)
);
