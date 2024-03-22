// const compose = (arr) => {
//   return arr.reduce((total, cur) => {
//     return Object.assign(total, cur);
//   }, {});
// };
const compose = (...arr) => {
  return arr.reduce((a, b) => {
    console.log("1", a, b);
    return (...args) => {
      return b(a());
    };
  });
};
const addnum1 = (a) => {
  return a + 1;
};
const addnum10 = (a) => {
  return a + 10;
};
const res = compose(addnum1, addnum10)(10);
// compose([add1,add2,add3])=>compose(add4)
console.log("res", res);
