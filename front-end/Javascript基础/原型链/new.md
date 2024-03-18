使用构造函数创建对象

function Person(name,age){
    this.name=name;
    this.age=age;
    this.sayName=function(){
        console.log(this.name);
    };
}
let person1=new Person("N",11);
let person2=new Person("o",2);
使用new操作符调用构造函数会执行如下操作：

1.在内存中创建一个新的空对象

2.这个新对象内部的prototype特性被赋值为构造函数的prototype属性

3.构造函数内部的this被赋值为这个新对象

4.执行构造函数内部的代码(给新对象添加属性)

5.如果构造函数返回非空对象，则返回该对象，否则返回刚创建的新对象

new的实现

function myNew(Func,...args){
    console.log(Func,args)
    let obj=new Object();
    obj.__proto__=Func.prototype;
    let ret=Func.apply(obj,args);
    console.log(ret)
    return typeof ret==='object'? ret:obj
}
function Person(name,age){
    this.name=name;
    this.age=age;
    return {name:'q'}
}
p1=new Person('l',2);
console.log(p1)
p2=myNew(Person,'l',2);
console.log(p2)
构造函数的主要问题在于其定义的方法会在每个实例上都创建一遍，耗费内存降低性能。可以通过把函数定义移到构造函数外部来实现，构造函数内部只需要一个指向外部函数的指针。这虽然解决了相同逻辑的函数重复定义的问题，但被定义在全局作用域中不合理。