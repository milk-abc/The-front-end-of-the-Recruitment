let keyword = readline();
keyword = keyword.toLowerCase();
let m = keyword.length;
let targetText = readline()
  .toLowerCase()
  .split(/[,' '.]/);
let n = targetText.length;
let res = {};
for (let i = 0; i < n; i++) {
  if (targetText[i].indexOf(keyword) !== -1) {
    let score = (m / targetText[i].length) * 100;
    if (score >= 50) {
      res[targetText[i]] = score;
    }
  }
}
Object.entries(res).sort((a, b) => b[1] - a[1]);
console.log(Object.keys(res).sort().join(" "));
// let [m, n] = readline().split(" ");
// let arr = new Array(m);
// for (let i = 0; i < m; i++) {
//   arr[i] = readline()
//     .split(" ")
//     .map((item) => parseInt(item));
// }
let m = 3,
  n = 5;
let arr = [
  [1, 0, 0, 0, 0],
  [1, 0, 1, 0, 0],
  [0, 0, 1, 0, 1],
];
let judge = function (arr, m, n) {
  let cnt = Infinity;
  let vis = new Array(m);
  for (let i = 0; i < m; i++) {
    vis[i] = new Array(n).fill(false);
  }
  let dfs = function (i, j, cost, vis) {
    if (i === m - 1 && j === n - 1) {
      cnt = Math.min(cnt, cost);
    }
    vis[i][j] = true;
    let step;
    if (cost % 2 === 0) {
      step = 1;
    } else {
      step = 2;
    }
    let dir = [
      [0, step],
      [0, -step],
      [-step, 0],
      [step, 0],
    ];
    for (let d of dir) {
      let curi = i + d[0],
        curj = j + d[1];
      if (
        curi >= 0 &&
        curi < m &&
        curj >= 0 &&
        curj < n &&
        vis[curi][curj] === false &&
        arr[curi][curj] !== 0
      ) {
        dfs(curi, curj, cost + 1, vis);
      }
    }
    vis[i][j] = false;
  };
  dfs(0, 0, 0, vis);
  return cnt == Infinity ? 0 : cnt;
};
console.log(judge(arr, m, n));
