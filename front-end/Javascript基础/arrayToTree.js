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
  data.forEach((item) => {
    if (item.pid == pid) {
      let obj = item;
      const temp = arrayToTree(data, item.id);
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

const data = [
  { id: 12, parentId: 1, name: "朝阳区" },
  { id: 241, parentId: 24, name: "田林街道" },
  { id: 31, parentId: 3, name: "广州市" },
  { id: 13, parentId: 1, name: "昌平区" },
  { id: 2421, parentId: 242, name: "上海科技绿洲" },
  { id: 21, parentId: 2, name: "静安区" },
  { id: 242, parentId: 24, name: "漕河泾街道" },
  { id: 22, parentId: 2, name: "黄浦区" },
  { id: 11, parentId: 1, name: "顺义区" },
  { id: 2, parentId: 0, name: "上海市" },
  { id: 24, parentId: 2, name: "徐汇区" },
  { id: 1, parentId: 0, name: "北京市" },
  { id: 2422, parentId: 242, name: "漕河泾开发区" },
  { id: 32, parentId: 3, name: "深圳市" },
  { id: 33, parentId: 3, name: "东莞市" },
  { id: 3, parentId: 0, name: "广东省" },
];

function toTree(data, pid) {
  const tree = [];
  data.forEach((item) => {
    if (item.parentId === pid) {
      let obj = item;
      const temp = toTree(data, item.id);
      if (temp.length) {
        obj.children = temp;
      }
      tree.push(obj);
    }
  });
  return tree;
}

const treeData = toTree(data, 0);
console.log("treeData", JSON.stringify(treeData, null, 2));
