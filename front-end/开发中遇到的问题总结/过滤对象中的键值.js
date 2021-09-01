const Obj = {
  HTML: 1,
  HEAD: 1,
  META: 2,
  TITLE: 1,
  BODY: 1,
  DIV: 3,
  P: 4,
};
let ans = 4;
let filter = function (obj) {
  return Object.keys(obj)
    .filter((key) => {
      return key === "P";
    })
    .reduce((total, cur) => {
      total[cur] = obj[cur];
      return total;
    }, {});
};
console.log(filter(Obj));
