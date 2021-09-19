let arr = [
  [".", ".", ".", "."],
  [".", "#", "#", "."],
  [".", "#", "#", "."],
  [".", "#", "#", "#"],
];
let m = arr.length,
  n = arr[0].length;
let cnt = Infinity;
let dir = [
  [0, 1],
  [0, -1],
  [-1, 0],
  [1, 0],
];
let vis = new Array(m);
for (let i = 0; i < m; i++) {
  vis[i] = new Array(n).fill(false);
}
let a = 5,
  b = 10;
let dfs = function (i, j, cost, vis) {
  // console.log(i, j, cost, vis);
  if (i >= m || j >= n || vis[i][j]) {
    return;
  }
  if (i === m - 1 && j === n - 1) {
    cnt = Math.min(cnt, cost);
  }
  vis[i][j] = true;
  for (let d of dir) {
    let curi = i + d[0],
      curj = j + d[1];
    if (
      curi >= 0 &&
      curi < m &&
      curj >= 0 &&
      curj < n &&
      vis[curi][curj] === false
    ) {
      if (arr[curi][curj] === ".") {
        dfs(curi, curj, cost, vis);
      } else if (arr[curi][curj] === "#") {
        dfs(curi, curj, cost + a, vis);
      }
    }
  }
  vis[i][j] = false;
};
dfs(0, 0, 0, vis);
console.log(cnt);
