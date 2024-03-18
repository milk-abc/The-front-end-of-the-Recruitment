虽然使用Object构造函数或对象字面量可以方便的创建对象，但是创建具有同样接口的多个对象需要重复编写很多代码。

1.使用工厂模式创建对象

```
function createPerson(name,age){
    let o = new Object();
    o.name=name;
    o.age=age;
    o.sayName=function(){
        console.log(this.name);
    };
    return o;
}
let person1=createPerson("N",11);
let person2=createPerson("o",2);
```

这种工厂模式虽然可以解决创建多个类似对象的问题，但是没有解决对象标识问题，即新创建的对象是什么类型。

2.使用构造函数创建对象

```
function Person(name,age){
    this.name=name;
    this.age=age;
    this.sayName=function(){
        console.log(this.name);
    };
}
let person1=new Person("N",11);
let person2=new Person("o",2);
```

使用new操作符调用构造函数会执行如下操作：

1.在内存中创建一个新的空对象

2.这个新对象内部的prototype特性被赋值为构造函数的prototype属性

3.构造函数内部的this被赋值为这个新对象

4.执行构造函数内部的代码(给新对象添加属性)

5.如果构造函数返回非空对象，则返回该对象，否则返回刚创建的新对象

new的实现

```
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
```

构造函数的主要问题在于其定义的方法会在每个实例上都创建一遍，耗费内存降低性能。可以通过把函数定义移到构造函数外部来实现，构造函数内部只需要一个指向外部函数的指针。这虽然解决了相同逻辑的函数重复定义的问题，但被定义在全局作用域中不合理。

3.原型模式：定义的属性和方法可以被对象实例共享

```
function Person(){
}
Person.prototype.name='l'
Person.prototype.sayName=function(){
    console.log(this.name);
}
p1=new Person(')
p2=new Person()
console.log(p1.sayName==p2.sayName)//true
```

只要创建一个函数，就会为这个函数创建一个prototype属性指向原型对象。所有原型对象默认有一个constructor属性指回与之关联的构造函数。每次调用构造函数创建一个新实例，这个实例的_*proto*_属性指向构造函数的原型对象。实例与构造函数原型有直接的关系，但实例与构造函数之间没有。

```
Person.prototype.constructor === Person
p1.__proto__ === Person.prototype
Person.prototype.__proto__ === Object.prototype
Person.prototype.__proto__.constructor === Object
Person.prototype.__proto__.__proto__===null
```

通过对象访问属性时，会先搜索对象实例本身，如果没有找到这个属性，则搜索会沿着指针进入原型对象，只要找到即可返回对应的值。

原型模式的主要问题是来自包含引用值的属性

```
什么是原型链？
每个构造函数都有一个原型对象，原型有一个属性指回构造函数，而实例有一个内部指针指向原型。如果原型是另一个类型的实例，意味着这个原型本身有一个内部指针指向另一个原型，相应的另一个原型也有一个指针指向另一个构造函数。这样就在实例和原型之间构造了一条原型链。如果一个实例的原型链中出现过相应的构造函数，则instanceof返回true。
一、原型链继承
function Parent () {
    this.name = 'kevin';
}

Parent.prototype.getName = function () {
    console.log(this.name);
}

function Child () {
    this.age=1;
}
Child.prototype=new Parent();
let child1=new Child();
child1.getName()
问题
1.引用类型的属性被所有实例共享
function Parent () {
    this.name = ['kevin'];
}

Parent.prototype.getName = function () {
    console.log(this.name);
}

function Child () {
}
Child.prototype=new Parent();
let child1=new Child();
child1.name.push('li')
let child2=new Child();
child2.getName()//[ 'kevin', 'li' ]
2.子类型在实例化时不能给父类型的构造函数传参，无法在不影响所有对象实例的情况下把参数传进父类的构造函数。
function Parent (name) {
    this.name = name;
}
Parent.prototype.getName = function () {
    console.log(this.name);
}
function Child (name) {
}
Child.prototype=new Parent('li');
let child1=new Child();
let child2=new Child();
child2.getName()//'li'
二、借用构造函数
function Parent (name) {
    this.name = name;
}
function Child (name) {
    Parent.call(this,name);
}
let child1=new Child(['li']);
child1.name.push('kk')
let child2=new Child();
console.log(child2.name);//undefined
在子类构造函数中调用父类构造函数，相当于在新的Child实例对象例如child1上会运行Parent函数中的所有初始化代码。结果时每个实例都会有自己的name属性。
优点：
1.解决了引用类型的属性被所有实例共享的问题
2.可以在Child向Parent传参
问题：
方法都在构造函数中定义，每次创建实例都会创建一遍方法。
三、组合继承：原型链继承+借用构造函数继承
function Parent (name) {
    this.name = name;
}
Parent.prototype.getName = function () {
    console.log(this.name);
}
function Child (name) {
    Parent.call(this,name);
}
Child.prototype=new Parent();
let child1=new Child(['li']);
child1.name.push('kk')
child1.getName();//[ 'li', 'kk' ]
let child2=new Child();
child2.getName();//undefined
优点：能够正常使用 instanceof 和 isPrototypeOf，使用最多
缺点：会调用两次父构造函数，new Parent，Parent.call
四、原型式继承
function createObj(o) {
    function F(){}
    F.prototype = o;
    return new F();
}
Object.create 的模拟实现，将传入的对象作为创建的对象的原型。
缺点：
包含引用类型的属性值始终都会共享相应的值，这点跟原型链继承一样。
var person = {
    name: 'kevin',
    friends: ['daisy', 'kelly']
}

var person1 = createObj(person);
var person2 = createObj(person);

person1.name = 'person1';
console.log(person2.name); // kevin

person1.firends.push('taylor');
console.log(person2.friends); // ["daisy", "kelly", "taylor"]
五、寄生组合继承
避免组合继承的多一次的重复调用，可以不使用 Child.prototype = new Parent() ，而是间接的让 Child.prototype 通过一个空对象访问到 Parent.prototype。
function Parent (name) {
    this.name = name;
    this.colors = ['red', 'blue', 'green'];
}

Parent.prototype.getName = function () {
    console.log(this.name)
}

function Child (name, age) {
    Parent.call(this, name);
    this.age = age;
}

// 关键的三步
var F = function () {};

F.prototype = Parent.prototype;

Child.prototype = new F();


var child1 = new Child('kevin', '18');

console.log(child1);
最后我们封装一下这个继承方法：
function object(o) {
    function F() {}
    F.prototype = o;
    return new F();
}

function prototype(child, parent) {
    var prototype = object(parent.prototype);
    prototype.constructor = child;
    child.prototype = prototype;
}

// 当我们使用的时候：
prototype(Child, Parent);
优点：能够正常使用 instanceof 和 isPrototypeOf，效率高
```

![img](https://pica.zhimg.com/80/v2-1e998a9f23a597fec96fb8a3cf64efb0_720w.png?source=d16d100b)





添加图片注释，不超过 140 字（可选）