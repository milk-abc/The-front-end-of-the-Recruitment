// var person = {
//   name: "爱",
//   hobby: ["学习", ["看电影", "shopping"], "跑步"],
//   a: undefined,
//   b: Symbol("muyiy"),
//   c: function () {},
//   d: /123/,
//   e: new Date(), //时间戳转化结果不准确，可以转成字符串或时间戳(new Date().vauleOf())
// };
// var person1 = JSON.parse(JSON.stringify(person));
// // person1.name = "网";
// // person1.hobby[0] = "玩耍";
// // console.log(person);
// console.log(person1);
function add(x, y, z) {
  return x + y + z;
}
function curry(fn, args) {
  let len = fn.length;
  args = args || [];
  return function () {
    for (let i = 0; i < arguments.length; i++) {
      args.push(arguments[i]);
    }
    if (len > args.length) {
      return curry(fn, args);
    } else {
      return fn(...args);
    }
  };
}
let addCurry = curry(add);
console.log(addCurry(1)(2)(3));
