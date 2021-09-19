let a = [
  { id: 1, pid: null },
  { id: 2, pid: 1 },
  { id: 3, pid: 1 },
  { id: 4, pid: 2 },
  { id: 5, pid: 2 },
  { id: 6, pid: 5 },
  { id: 7, pid: 4 },
];
function arrayToTree(data, pid = null) {
  let tree = [];
  let temp;
  data.forEach((item) => {
    if (item.pid == pid) {
      let obj = item;
      temp = arrayToTree(data, item.id);
      if (temp.length > 0) {
        obj.children = temp;
      }
      tree.push(obj);
    }
  });
  return tree;
}
let res = arrayToTree(a, null);
console.log(JSON.stringify(res));
