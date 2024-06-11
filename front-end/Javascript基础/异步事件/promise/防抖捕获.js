function debounce(func, timeout) {
  let timer = null;
  return function () {
    return new Promise((resolve, reject) => {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        try {
          const value = func.apply(this, arguments);
          resolve(value);
        } catch (err) {
          reject(404);
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
const debouncePromise = debounce(test, 1000);
debouncePromise()
  .then((value) => console.log(value))
  .catch((err) => console.log("123", err));
