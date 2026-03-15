function findNearestValue(mat, start, range) {
  const rows = mat.length;
  const cols = mat[0].length;
  const visited = Array.from({ length: rows }, () => Array(cols).fill(false));

  // 四方向（上下左右）
  const directions = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];

  const queue = [[start[0], start[1], 0]]; // x, y, dist
  visited[start[0]][start[1]] = true;

  const nearestPoints = [];
  let minDist = null;

  while (queue.length > 0) {
    const [x, y, dist] = queue.shift();

    // 找到目标点（值为 1 且不是起点）
    if (mat[x][y] === 1 && !(x === start[0] && y === start[1])) {
      if (minDist === null) {
        minDist = dist; // 第一次找到目标，确定最短距离
      }
      if (dist === minDist) {
        nearestPoints.push([x, y]);
      }
      continue; // 不扩展目标节点
    }

    // 超过范围 或 已经找到更短路径
    if (dist >= range || (minDist !== null && dist >= minDist)) continue;

    for (const [dx, dy] of directions) {
      const nx = x + dx;
      const ny = y + dy;
      if (nx >= 0 && nx < rows && ny >= 0 && ny < cols && !visited[nx][ny]) {
        visited[nx][ny] = true;
        queue.push([nx, ny, dist + 1]);
      }
    }
  }

  return nearestPoints;
}

const mat = [
  [1, 0, 0, 0, 0, 0, 0, 0],
  [1, 0, 0, 0, 0, 1, 0, 1],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 0, 0, 1, 0, 1, 0],
  [0, 0, 1, 0, 0, 0, 0, 0],
  [0, 1, 0, 1, 0, 1, 0, 0],
  [0, 0, 0, 0, 1, 0, 0, 1],
  [0, 1, 0, 1, 0, 0, 0, 0],
];
const loc = [1, 3];
const range = 2;
const res = findNearestValue(mat, loc, range);
console.log("res", res);
