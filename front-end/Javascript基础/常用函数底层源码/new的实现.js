function myNew(Func, ...args) {
  console.log(Func, args);
  let obj = new Object();
  obj.__proto__ = Func.prototype;
  let ret = Func.apply(obj, args);
  console.log(ret);
  return typeof ret === "object" ? ret : obj;
}
function Person(name, age) {
  this.name = name;
  this.age = age;
  console.log("this", this);
  return { name: "q" };
}
p1 = new Person("l", 2);
console.log(p1);
p2 = myNew(Person, "l", 2);
console.log(p2);
