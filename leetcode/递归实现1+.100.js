let recur = function (i) {
  let res = 0;
  if (i === 1) {
    return 1;
  }
  //2+..+100的
  res = i + recur(i - 1);
  return res;
};
let ans = recur(100);
console.log("ans", ans);
