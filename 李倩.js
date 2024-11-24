/**
 * 1. 实现一个函数，判断两个变量值是否相等
 *
 * 注意
 * - 数据类型不限于示例，尽可能考虑边界
 * - function 引用相等即可
 */
const foo1 = {
  a: 1,
  b: "1",
  c: NaN,
  d: [
    {
      a: 1,
      b: 2,
    },
  ],
  f: {
    a: 1,
  },
  g: null,
};

const foo2 = {
  a: 1,
  b: "1",
  c: NaN,
  d: [
    {
      a: 1,
      b: 2,
    },
  ],
  f: {
    a: 1,
  },
  g: null,
};

function isEqual(target1, target2) {
  if (target1 === target2) {
    return true;
  }

  let type1 = typeof target1;
  let type2 = typeof target2;
  if (type1 !== type2) {
    return false;
  }
  if (type1 === "object") {
    if (Object.keys(target1).length !== Object.keys(target2).length) {
      return false;
    }
    for (let key in target1) {
      if (!Object.keys(target2).includes(key)) {
        return false;
      } else {
        let value1 = target1[key];
        let value2 = target2[key];
        if (!isEqual(value1, value2)) {
          return false;
        }
      }
    }
    return true;
  } else if (type1 === "number") {
    if (isNaN(target1) && isNaN(target2)) {
      return true;
    }
    return target1 === target2;
  }
}
console.log(isEqual(foo1, foo2), "isEqual");
/**
 * 2. 实现 queryString 函数来获取解析参数

https://youzan.com/?name=kk&age=3&callback=https%3A%2F%2Fyouzan.com%3Fa%3D1&c[]=2&d=ee%d
 **/

function QueryString(url) {
  let urlSplit = url.split("?")[1].split("&");
  let map = new Map();
  for (let item of urlSplit) {
    let key = item.split("=")[0];
    let value = item.split("=")[1];
    map.set(key, value);
  }
  return map;
}
console.log(
  QueryString(
    "https://youzan.com/?name=kk&age=3&callback=https%3A%2F%2Fyouzan.com%3Fa%3D1&c[]=2&d=ee%d"
  )
);
