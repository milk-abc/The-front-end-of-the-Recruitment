let bfs = function (arr, nodenum) {
  //构建图
  let degree = new Array(nodenum + 1).fill(0);
  let newarr = new Array(nodenum + 1);
  for (let i = 0; i <= nodenum; i++) {
    newarr[i] = [];
  }
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].length - 1; j++) {
      newarr[arr[i][j]].push(arr[i][j + 1]);
      degree[arr[i][j + 1]]++;
    }
  }
  console.log("newarr", newarr);
  let start;
  for (let i = 1; i < degree.length; i++) {
    if (degree[i] === 0) {
      start = i;
    }
  }
  console.log("degree", degree);
  let visited = new Array(nodenum + 1).fill(false);
  let dfs = function (newarr,visited) {
    visited[start] = true;
    queue.push(start);
    while (queue.length !== 0) {
      
    }
  };
};
let arr = [
  [1, 2, 4],
  [1, 3, 4],
  [3, 2],
];
bfs(arr, 4);
