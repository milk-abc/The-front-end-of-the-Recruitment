function connect(root: Node | null): Node | null {
  //层序遍历
  const queue = [];
  if (!root) {
    return null;
  }
  queue.push(root);
  const res = [];
  while (queue.length) {
    const level = [];
    const len = queue.length;
    const node = queue.shift();
    level.push(node.val);
    for (let i = 0; i < len; i++) {
      queue.push(node.left);
      queue.push(node.right);
    }
    res.push(...level);
  }

  return root;
}
