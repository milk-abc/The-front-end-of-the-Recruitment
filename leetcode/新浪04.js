let m = 6,
  n = 8,
  d = 2;
let rowm = parseInt(m / 7);
let computeCol = function (row, num) {
  let col;
  if (row % 2 === 0) {
    //索引偶数行从小到大 0开始
    col = num % 7;
  } else {
    col = 6 - (num % 7);
  }
  return col;
};
let colm = computeCol(rowm, m);
let rown = parseInt(n / 7);
let coln = computeCol(rown, n);
console.log(Math.abs(rown - rowm) + Math.abs(coln - colm));
