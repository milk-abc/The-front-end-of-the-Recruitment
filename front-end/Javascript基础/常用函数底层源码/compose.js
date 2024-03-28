const compose = (...arr) => {
  if (arr.length === 0) {
    return (arg) => arg;
  }
  return arr.reduce((a, b) => {
    return (...args) => {
      return a(b(...args));
    };
  });
};
const addnum1 = (a) => {
  return a + 1;
};
const addnum10 = (a) => {
  return a + 10;
};
const addnum20 = (a) => {
  return a + 20;
};
const res = compose(addnum1, addnum10, addnum20)(10);
console.log("res", res);
