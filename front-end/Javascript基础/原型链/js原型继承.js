function func1() {
  this.a = [1];
}
func1.prototype.sayname = function () {
  console.log(111);
};

function func2() {
  func1.call(this);
}
func2.prototype = new func1();
const f2 = new func2();
const f3 = new func2();
f2.a.push(2);
console.log(f3.a, func2.prototype.a);
f3.sayname();
