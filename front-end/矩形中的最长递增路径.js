var longestIncreasingPath = function (matrix) {
  let m = matrix.length,
    n = matrix[0].length;
  let memo = new Array(m);
  for (let i = 0; i < m; i++) {
    memo[i] = new Array(n).fill(0);
  }
  let dfs = function (i, j, matrix) {
    if (memo[i][j]) {
      return memo[i][j];
    }
    memo[i][j]++;
    for (let dir of [
      [-1, 0],
      [1, 0],
      [0, -1],
      [0, 1],
    ]) {
      let new_i = i + dir[0],
        new_j = j + dir[1];
      if (
        new_i >= 0 &&
        new_i < m &&
        new_j >= 0 &&
        new_j < n &&
        matrix[i][j] < matrix[new_i][new_j]
      ) {
        memo[i][j] = Math.max(memo[i][j], dfs(new_i, new_j, matrix) + 1);
      }
    }
    return memo[i][j];
  };
  let res = 1;
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      res = Math.max(res, dfs(i, j, matrix));
    }
  }
  return res;
};
let matrix = [
  [9, 9, 4],
  [6, 6, 8],
  [2, 1, 1],
];
let res = longestIncreasingPath(matrix);
console.log("res", res);
