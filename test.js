const spiralFillArray = (n, m) => {
  let res = [];
  if (n < 1 || m < 1) {
    return res;
  }
  for (let i = 0; i < n; i++) {
    res[i] = [];
    for (let j = 0; j < m; j++) {
      res[i][j] = 1;
    }
  }
  //定义遍历数组范围下标
  let rowStart = 0,
    rowEnd = n - 1,
    colStart = 0,
    colEnd = m - 1;
  //定义填充的值
  let cnt = 0;
  while (rowStart < rowEnd || colStart < colEnd) {
    //从左到右
    for (let j = colStart; j <= colEnd; j++) {
      cnt += 1;
      res[rowStart][j] = cnt;
    }
    //从上到下
    for (let i = rowStart + 1; i <= rowEnd; i++) {
      cnt += 1;
      res[i][colEnd] = cnt;
    }
    //当只剩一行/列时，退出循环
    if (rowStart === rowEnd || colStart === colEnd) {
      break;
    }
    //从右到左
    for (let j = colEnd - 1; j >= colStart; j--) {
      cnt += 1;
      res[rowEnd][j] = cnt;
    }
    //从下到上
    for (let i = rowEnd - 1; i >= rowStart + 1; i--) {
      cnt += 1;
      res[i][colStart] = cnt;
    }
    colStart += 1;
    colEnd -= 1;
    rowStart += 1;
    rowEnd -= 1;
  }
  return res;
};
let n = 5;
let m = 3;
console.log(spiralFillArray(n, m));

const judgeRepeatedSubString = (str) => {
  const len = str.length;
  for (let i = 1; i <= len / 2; i++) {
    let substr = str.slice(0, i);
    if (len % substr.length !== 0) {
      continue;
    }
    //如果子串重复n次为原串，返回true
    let repeatNum = len / substr.length;
    let temp = substr.repeat(repeatNum);
    if (str === temp) {
      return true;
    }
  }
  return false;
};
let s = "x1x1x1";
console.log(judgeRepeatedSubString(s));

