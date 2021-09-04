//函数式编程
//函数可以赋值给其他变量，也可以作为参数，传入另一个函数，或者作为别的函数的返回值
//只使用表达式，不使用语句。也就是说，每一步都是单纯的运算，而且都有返回值
//函数要保持独立，所有功能就是返回一个新的值，没有其他行为，尤其是不得修改外部变量的值
//使用函数减少代码重复
//更易于理解
//每一个函数都可以被看做独立单元，很有利于进行单元测试和debug，以及模块化组合
//函数式编程不需要考虑"死锁"（deadlock），因为它不修改变量，所以根本不存在"锁"线程的问题。
//不必担心一个线程的数据，被另一个线程修改，可以把工作分摊到多个线程，部署"并发编程"。
function add(a, b, c) {
  return a + b + c;
}
console.log(add(1, 2, 3));
function curry(fn, args) {
  let argsLen = fn.length;
  args = args || [];
  return function () {
    for (let i = 0; i < arguments.length; i++) {
      args.push(arguments[i]);
    }
    if (args.length < argsLen) {
      return curry(fn, args);
    } else {
      return fn(...args);
    }
  };
}
let addCurry = curry(add);
console.log(addCurry(1)(2)(3));
