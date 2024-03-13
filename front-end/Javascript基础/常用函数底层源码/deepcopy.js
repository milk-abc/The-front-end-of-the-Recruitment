//浅拷贝：concat,slice,object.assign，扩展运算符
//深拷贝：json.parse(json.stringify())，
//json.stringify在对象中遇到undefined,symbol,function会自动忽略，在数组则会返回null
//为了解决循环引用问题，需要一个额外的数据结构来跟踪已经复制过的对象
let deepcopy = function (obj, visited = new WeakMap()) {
  if (typeof obj !== "object" || obj === null) {
    // 只拷贝对象
    return obj;
  }
  if (visited.has(obj)) {
    return visited.get(obj);
  }
  // 根据obj的类型判断是新建一个数组还是对象
  let newObj = obj instanceof Array ? [] : {};
  visited.set(obj, newObj);
  // 遍历obj，并且判断是obj的属性才拷贝
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      newObj[key] =
        typeof obj[key] === "object" ? deepcopy(obj[key], visited) : obj[key];
    }
  }
  return newObj;
};
