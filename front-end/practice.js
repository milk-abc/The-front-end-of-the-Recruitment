let printMatrix = function (matrix) {
  if (matrix.length === 0 || matrix[0].length === 0) {
    return [];
  }
  const rows = matrix.length,
    cols = matrix[0].length;
  const res = [];
  let left = 0,
    right = cols - 1,
    top = 0,
    bottom = rows - 1;
  while (left <= right && top <= bottom) {
    for (let i = left; i <= right; i++) {
      res.push(matrix[top][i]);
    }
    for (let i = top + 1; i <= bottom; i++) {
      res.push(matrix[i][right]);
    }
    if (left < right && top < bottom) {
      for (let i = right - 1; i > left; i--) {
        res.push(matrix[bottom][i]);
      }
      for (let i = bottom; i > top; i--) {
        res.push(matrix[i][left]);
      }
    }
    left++;
    right--;
    top++;
    bottom--;
  }
  return res;
};
console.log(
  printMatrix([
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ]).join(",")
);
