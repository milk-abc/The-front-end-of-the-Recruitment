//ES5中的面向对象
//对象的创建使用对象字面量和构造函数，原型模式
function parent(name) {
    this.name = name;
}
parent.prototype.sayname = function () {
    console.log(this.name)
}
function child() {
    parent.call(this)
}
// let empty=function() {

// }
// empty.prototype=parent.prototype
// child.prototype=new empty()
child.prototype = Object.create(parent.prototype);
child.prototype.constructor = child;
let child1 = new child();
//ES6中的面向对象
//对象的创建使用类
class Animal {
    constructor(name) {
        this.name = name;
    }
    speak() {
        console.log(this.name);
    }
}
class dog extends Animal {
    constructor(name) {
        super(name);
    }
    speak() {
        super.speak();
    }
}