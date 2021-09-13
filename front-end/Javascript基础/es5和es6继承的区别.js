//静态方法的继承
function Super(name, age) {
  this.name = name;
  this.age = age;
}
Super.prototype.sayName = function () {
  return this.name;
};
//定义静态属性和方法
Super.num = 1;
Super.sayWord = function (word) {
  return word;
};
//定义子类
function Sub(name, age, sex) {
  //继承实例属性
  Super.call(this, name, age);
  this.sex = sex;
}
//es5子类不会继承父类的静态属性和方法
//es5的继承实质上是先创建子类的实例对象，然后再将父类的方法添加到this上
Sub.prototype = Object.create(Super.prototype);
Sub.prototype.constructor = Sub;
let instance = new Sub("张三", "18", "男");
console.log(Super.sayWord("hello"));
console.log(Sub.sayWord("hello"));
console.log(instance.sayWord("hello"));
//es6子类可以继承父类的静态属性和方法，但实例不会继承
//es6实质上是先创建父类的实例对象this，然后再用子类的构造函数修改this
class Super {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  sayName() {
    return this.name;
  }
  static sayWord(word) {
    return word;
  }
}
class Sub extends Super {
  constructor(name, age, sex) {
    super(name, age); //创建父类的实例对象
    this.sex = sex;
  }
}
let instance = new Sub("张三", "18", "男");
console.log(Super.sayWord("hello world"));
console.log(Sub.sayWord("hello world"));
console.log(instance.sayWord("hello world"));
