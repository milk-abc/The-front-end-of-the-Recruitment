//Generator
//function关键字与函数名之间有一个星号
//函数体内使用yield表达式
//调用Generator函数后，该函数并不执行，返回的是一个指向内部状态的指针对象
//下一步必须调用遍历器对象的next方法，使得指针移向下一个状态
function* helloGenerator(){
  yield 'hello';
  yield 'world';
  return 'ending';
}
let hw=helloGenerator();