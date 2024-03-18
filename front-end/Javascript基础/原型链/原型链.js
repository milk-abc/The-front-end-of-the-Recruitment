function F() {}
console.log(F.prototype.__proto__ == Object.prototype);
console.log(Object.prototype.__proto__ === null);
//s='abc'  s=new String('adbc')
var F = function () {};
Object.prototype.a = function () {
  console.log("a");
};

Function.prototype.b = function () {
  console.log("b");
};

var f = new F();

f.a();
// f.b();

F.a();
F.b();

// 在JS里，万物皆对象。Fucntion是对象，Function.prototype是对象。对象具有属性__proto__隐式原型。一个对象的隐式原型指向构造该对象的构造函数的原型

// Function是个特殊的对象，除了__proto__属性还有prototype属性

// 指向一个对象，这个对象的用途就是包含所有实例共享的属性和方法

// Function.__proto__ === Function.prototype这个应该就是表示是Function创造了Function

// 并且Function所有的实例会共享Function.prototype上的所有属性和方法

// Object，Function，其他function都由Function创造

// xxx.prototype是个对象

// 实例也是个对象

// 它们只有proto属性

// xxx.prototype对象是由Object创造
