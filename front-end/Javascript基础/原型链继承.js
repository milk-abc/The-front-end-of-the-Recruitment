//ES5 寄生组合继承
function Parent(name) {
  this.name = name;
}
Parent.prototype.say = function () {
  console.log(this.name);
};
function Child(name, age) {
  Parent.call(this, name);
  this.age = age;
}
Child.prototype = Object.create(Parent.prototype);
// function empty(){}
// empty.prototype=Parent.prototype;
// empty.prototype.constructor=empty;//修正contructor
// Child.prototype=new empty();
Child.prototype.constructor = Child;
console.log(Child.prototype);
console.log(Child.prototype.__proto__ === Parent.prototype);
console.log(Parent.prototype.__proto__ === Object.prototype);
// console.log(Child.prototype.prototype.prototype);
let child = new Child("lq", 23);
child.say();
console.log(child.__proto__ === Child.prototype);
//ES6 class继承
