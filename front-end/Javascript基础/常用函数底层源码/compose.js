const compose = (...arr) => {
  if (arr.length === 0) {
    return (arg) => arg;
  }
  return arr.reduce((a, b) => {
    return (...args) => {
      return b(a(...args));
    };
  });
};
const addnum1 = (a) => {
  return a + 1;
};
const addnum10 = (a) => {
  return a + 10;
};
const res = compose()(10);
console.log("res", res);
