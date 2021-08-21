//n代表总共有多少人,m代表有几行
// let solve = function () {
//   let N = 4,
//     arr = [
//       [1, 2, 4],
//       [1, 3, 4],
//       [3, 2],
//     ];
//   let children = new Array(N + 1);
//   let parent = new Array(N + 1);
//   for (let i = 0; i <= N; i++) {
//     children[i] = [];
//     parent[i] = [];
//   }
//   for(let i=0;i<arr.length;i++){
//     let pre=-1;
//     for(let j=0;j<arr[i].length;j++){
//       if(pre!=-1){
//         children[pre].push(arr[i][j]);
//         parent[arr[i][j]].push(pre);
//       }
//       pre=arr[i][j];
//     }
//   }
// };
//可使用拓扑排序来做
let bfs = function (arr, nodenum) {
  //构建图
  let degree = new Array(nodenum + 1).fill(0);
  let adj = new Array(nodenum + 1);
  for (let i = 0; i <= nodenum; i++) {
    adj[i] = [];
  }
  let queue = [];
  for (let i = 0; i < arr.length; i++) {
    let pre = -1;
    for (let j = 0; j < arr[i].length; j++) {
      if (pre !== -1) {
        degree[arr[i][j]] += 1;
        adj[pre].push(arr[i][j]);
      }
      pre = arr[i][j];
    }
  }
  console.log("degree", degree);
  console.log("adj", adj);
  for (let i = 1; i < degree.length; i++) {
    if (degree[i] === 0) {
      queue.push(i);
    }
  }

  while (queue.length) {
    if (queue.length !== 1) {
      break;
    }
    pre = queue.shift();
    nodenum--;
    for (let cur of adj[pre]) {
      degree[cur] -= 1;
      if (degree[cur] === 0) {
        queue.push(cur);
      }
    }
  }
  return nodenum === 0;
};
let arr = [
  [1, 2, 4],
  [1, 3, 4],
  [3, 2],
];
let ans = bfs(arr, 4);
console.log("ans", ans);
