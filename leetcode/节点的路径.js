//查找某个节点的路径
function TreeNode(v) {
  this.val = v;
  this.left = this.right = null;
}
const root = new TreeNode(1);
root.left = new TreeNode(2);
root.right = new TreeNode(3);
root.left.left = new TreeNode(4);
root.left.right = new TreeNode(5);
root.right.left = new TreeNode(6);
root.right.right = new TreeNode(7);
let find = function (root, target) {
  if (!root) {
    return [];
  }
  let recur = function (root, target, path) {
    if (root.val === target) {
      path = [...path, root.val];
      return path;
    }
    if (root.left) {
      let res = recur(root.left, target, [...path, root.val]);
      if (res.length > 0) {
        return res;
      }
    }
    if (root.right) {
      let res = recur(root.right, target, [...path, root.val]);
      if (res.length > 0) {
        return res;
      }
    }
    return [];
  };
  return recur(root, target, []);
};
let ans = find(root, 7);
console.log(ans);
