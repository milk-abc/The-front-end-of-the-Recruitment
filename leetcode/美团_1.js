var s = "(()())()"; //(2*2+1)*2=10  [][[][][]2]3 //16
// dfs(外面的left + 1, 外面的right - 1) * digit + digit;
let dfs = function (left, right, s) {
  if (left >= right) {
    return 0;
  }
  let lnum = 0,
    rnum = 0,
    res = 0,
    digit;
  let right_index = left + 1;
  while (right_index < right) {
    if (s[right_index] === ")") {
      rnum++;
    }
    if (s[right_index] === "(") {
      lnum++;
    }
    if (rnum > lnum) {
      break;
    }
    right_index++;
  }
  digit = 2;
  res +=
    dfs(left + 1, right_index - 1, s) * digit +
    1 +
    dfs(right_index + 1, right, s) * digit;
  return res;
};
let ans = dfs(0, s.length - 1, s);
console.log(ans);
