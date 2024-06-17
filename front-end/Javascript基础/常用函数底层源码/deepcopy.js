//浅拷贝：concat,slice,object.assign，扩展运算符
//深拷贝：json.parse(json.stringify())，
//json.stringify在对象中遇到undefined,symbol,function会自动忽略，在数组则会返回null
//为了解决循环引用问题，需要一个额外的数据结构来跟踪已经复制过的对象
/**
 * https://www.cnblogs.com/zhangguicheng/p/12173538.html
Object.keys()  方法会返回一个给可见定对象的自身可枚举属性组成的数组。
Reflect.ownKeys()  返回一个由目标对象自身的属性键组成的数组(所有属性)。
Object.getOwnPropertyNames() 方法返回一个由指定对象的所有自身属性的属性名（包括不可枚举属性但不包括 Symbol 值作为名称的属性）组成的数组。
 */
let deepCopy = function (obj, visited = new WeakMap()) {
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
  for (let key of Reflect.ownKeys(obj)) {
    newObj[key] =
      typeof obj[key] === "object" ? deepCopy(obj[key], visited) : obj[key];
  }
  return newObj;
};
let obj1 = {};
let obj2 = { b: obj1 };
obj1["a"] = obj2;
let obj3 = deepCopy(obj2);
obj3["a"] = 3;
console.log("deepCopy", obj2, obj3);
