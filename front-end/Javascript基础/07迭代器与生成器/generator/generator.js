//Generator
//function关键字与函数名之间有一个星号
//函数体内使用yield表达式
//调用Generator函数后，该函数并不执行，返回的是一个指向内部状态的指针对象
//下一步必须调用遍历器对象的next方法，使得指针移向下一个状态
function* helloGenerator() {
  yield "hello";
  yield "world";
  return "ending";
}
let hw = helloGenerator();
console.log(hw.next());
console.log(hw.next());
console.log(hw.next());
console.log(hw.next());
function* foo() {
  console.log("test1");
  //暂停执行并向外返回值
  var s = yield "next return data"; //调用next后，返回对象值
  //注意：上面的代码分两次next
  console.log(s);
  console.log("end code");
}
//调用Generator函数后 不会立即执行，返回生成器对象
const generate = foo();
//调用next方法，才会从*开始执行
//返回包含yield内容的对象
const yields = generate.next();
console.log(yields); //{ value: 'next return data', done: false }
//对象中done，表示生成器是否已经执行完毕
//对象中value是函数中yield的返回值
//函数中的代码并没有执行结束

//下一次的next方法调用，会从前面函数的yeild后的代码开始执行
//next方法的传参，是generate函数中,yield的返回值也就是var s=后面的值
const y2 = generate.next(888);
console.log(y2);
