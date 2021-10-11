function minNumberDisappeared(large, small, dest) {
  // write code here
  let index = dest[0];
  let x = dest[1];
  let y = dest[2];
  let n = small.length;
  let m = small[0].length;
  let cur = new Array(n);
  for (let i = 0; i < n; i++) {
    cur[i] = new Array(m).fill(0);
  }
  for (let i = 1; i < n; i++) {
    cur[i][0] += cur[i - 1][0] + small[i - 1][0];
  }
  console.log(cur);
  let dx = x - cur[index - 1][0];
  let dy = y - cur[index - 1][1];
  for (let i = 0; i < n; i++) {
    cur[i][0] += dx;
    cur[i][1] += dy;
  }
  console.log(cur); //左上角的点
  for (let i = 0; i < n; i++) {}
}
let large = [1024, 768];
let small = [
  [100, 100],
  [80, 150],
  [300, 20],
  [20, 300],
  [200, 600],
];
let dest = [5, 0, 300];
console.log(minNumberDisappeared(large, small, dest));
