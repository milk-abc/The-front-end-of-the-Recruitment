//求1+2+3+...+n
let f = function (n) {
  if (n === 1) {
    return 1;
  }
  return f(n - 1) + n;
};
console.log(f(4));
//求1*2*3*...*n O(n)
let f1 = function (n) {
  if (n === 1) {
    return 1;
  }
  return f(n - 1) * n;
};
console.log(f1(5));
//尾递归实现 O(1)
let f2 = function (n, total) {
  if (n === 1) {
    return total;
  }
  return f(n - 1, total * n);
};
console.log(f2(5, 1));
