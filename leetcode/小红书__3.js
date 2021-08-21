let n = 8;
let arr = [1, 1, 2, 2, 2, 1, [0, 2, 8], 1];
let black = 0,
  white = 0,
  emp = [];
for (let i = 0; i < arr.length; i++) {
  if (arr[i] === 1) {
    white++;
  } else if (arr[i] === 2) {
    black++;
  } else {
    emp.push(arr[i].slice(1));
  }
}
console.log(white, black);
let ans = 0;
let res = Infinity;
let dfs = function (white, black, index) {
  if (white + black > n) {
    return;
  }
  if (white === black && white + black === n) {
    res = Math.min(res, ans); //可以不用数组，可以自己定义一个最大值的变量用math.min取最小值
  }
  for (let i = index; i < emp.length; i++) {
    //选择第一个
    ans += emp[i][0];
    white++;
    dfs(white, black, index + 1);
    ans -= emp[i][0];
    white--;
    //选择第二个
    ans += emp[i][1];
    black++;
    dfs(white, black, index + 1);
    ans -= emp[i][1];
    black--;
  }
};
dfs(white, black, 0);
if (res === Infinity) {
  return -1;
}
console.log(res);
