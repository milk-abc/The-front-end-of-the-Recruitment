let func = (x) => x;
let true_func = function (x) {
  return x;
};
let func1 = (x) => {
  x;
};
let true_func1 = function (x) {
  x;
};
let func2 = (x) => ({ x: x });
let true_func2 = function (x) {
  return { x: x };
};
let func3 = (x) => ({ x });
let true_func3 = function (x) {
  return { x };
};
console.log(
  func(1),
  true_func(1),
  func1(1),
  true_func1(1),
  func2(1),
  true_func2(1),
  func3(1),
  true_func3(1)
);
