//第一版直接调用apply实现，返回一个函数
Function.prototype.bind1 = function (context) {
  let self = this;
  return function () {
    self.apply(context);
  };
};
//第二版实现可以分两步传参数
Function.prototype.bind2 = function (context) {
  let self = this;
  let args = [].slice.call(arguments, 1);
  return function () {
    let bindArgs = [].slice.call(arguments);
    self.apply(context, args.concat(bindArgs));
  };
};
//第三版实现使用new的时候之前绑定的this失效，指向new的实例对象，传参依然有效
//a.bind(b),new出来的实例可以继承a的原型
Function.prototype.bind3 = function (context) {
  //调用的不是函数要报错
  if (typeof this !== "function") {
    throw new Error(
      "Function.prototype.bind - what is trying to be bound is not callable"
    );
  }
  let self = this;
  let args = [].slice.call(arguments, 1);
  //我们直接将 fBound.prototype = this.prototype，
  //当直接修改 fBound.prototype 的时候，也会直接修改绑定函数的 prototype。
  //这个时候，我们应该通过一个空函数来进行中转
  let empty = function () {};
  let fBound = function () {
    let bindArgs = [].slice.call(arguments);
    //当作为构造函数时，this 指向实例，此时empty.prototype在实例的原型链上，结果为 true
    //a.bind(b)
    //于是将绑定函数a的 this 指向该实例，可以让实例获得来自绑定函数a的值
    //当作为普通函数时，this 指向 window，此时结果为 false，将绑定函数的 this 指向 context
    return self.apply(
      this instanceof empty ? this : context,
      args.concat(bindArgs)
    );
  };
  empty.prototype = this.prototype; //通过一个空函数来进行中转
  fBound.prototype = new empty();
  return fBound;
};
// 由于代码已经写了非常详细的注释，这里我们只解释一下主流程。我们把最开始要进行绑定的函数称为fToBind，返回值称为fBound。
//从代码我们可以看到，bind执行的结果并没有返回fToBind，而是返回一个新的函数fBound,真正的待执行函数被封装在fBound里面。
//当我们绑定完成之后执行fBound的时候，在fBound内部fToBind会调用apply进行绑定并执行。而此时，apply的第一个参数已经是确定下来的了。
//接下来分为两种情况，当判断到当前函数是被当成构造函数执行时，此时忽略强行绑定，保留new操作；
//第二种情况是正常绑定，即获取bind函数传入的this进行绑定。

// 那么问题来了，为什么二次绑定的时候完全无效了，原因在于bind函数返回了一个新的函数fBound，fBound执行时，
//内部fToBind绑定所需要的this都已经确定下来了，当我们进行二次绑定时，操作的对象已经是fBound了，此时再进行bind操作时，我们只能改变fBound的this，
//但函数不作为构造函数执行时fBound内部的绑定操作并不依赖于fBound的this，而是依赖于第一次传入的oThis。
//所以不管我们再怎么绑定，都不能再改变绑定的结果了。

// 简单来说，再次bind的时候，我们已经无法对最原始的待绑定函数进行操作了，我们操作的只是它的代理。
var value = 2;
var foo = {
  value: 1,
};
function bar(name, age) {
  this.habit = "shopping";
  console.log(this.value);
  console.log(name);
  console.log(age);
}
bar.prototype.friend = "kevin";
var binFoo = bar.bind3(foo, "lq");
var obj = new binFoo("2"); //this指向由bar转为foo，再由foo转向obj，并且可以继承bar的原型
