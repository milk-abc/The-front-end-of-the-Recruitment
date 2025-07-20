let arr = [2, [1, 2, 3], [4, 5], [5, 6, [7]]]; //求数组深度
let Depth = function (arr) {
  let depth = 0;
  if (!Array.isArray(arr)) {
    return 0;
  }
  for (let i = 0; i < arr.length; i++) {
    let temp = Depth(arr[i]) + 1;
    depth = Math.max(depth, temp);
  }
  return depth;
};
console.log(Depth(arr));
