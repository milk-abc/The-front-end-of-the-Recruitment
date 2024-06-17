const list = [
  { key: 1, value: "A", parentKey: 0 },
  { key: 2, value: "B", parentKey: 0 },
  { key: 3, value: "C", parentKey: 1 },
  { key: 4, value: "D", parentKey: 1 },
  { key: 5, value: "E", parentKey: 2 },
  { key: 6, value: "F", parentKey: 3 },
  { key: 7, value: "G", parentKey: 4 },
];

const convert = (list, key = 0) => {
  let res = [];
  list.forEach((item) => {
    if (item.parentKey === key) {
      res.push(item);
      item.children = convert(list, item.key);
    }
  });
  return res;
};
let res = convert(list);
console.log(JSON.stringify(res));
