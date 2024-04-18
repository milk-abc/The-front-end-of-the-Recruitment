//实现 pow(x, n) ，即计算 x 的 n 次幂函数（即，xn）。
function myPow(x: number, n: number): number {
  let res = 1;
  let x_contibute = x;
  function multi(x, n) {
    if (n === 0) {
      return 1;
    }
    while (n > 0) {
      if (n % 2 === 1) {
        res = res * x_contibute;
      }
      x_contibute = x_contibute * x_contibute;
      n = Math.floor(n / 2);
    }
  }
  return n >= 0 ? multi(x, n) : 1 / multi(x, -n);
}
