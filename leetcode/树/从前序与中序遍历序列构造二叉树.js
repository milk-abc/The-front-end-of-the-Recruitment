var buildTree = function (preorder, inorder) {
  const dfs = (arr1, arr2) => {
    if (!arr1.length) return null;
    let root = new TreeNode(arr1[0]);
    let mid = arr2.indexOf(arr1[0]);
    root.left = dfs(arr1.slice(1, mid + 1), arr2.slice(0, mid + 1));
    root.right = dfs(arr1.slice(mid + 1), arr2.slice(mid + 1));
    return root;
  };
  return dfs(preorder, inorder);
};
