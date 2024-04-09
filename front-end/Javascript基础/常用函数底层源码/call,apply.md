为什么需要用到 call,apply,bind?

简单总结: 函数.call(对象，参数)->函数(参数)过程中 this 指向对象，在当前作用域借用一下该函数

1.对象的继承

2.借用方法

**关键点：A.call/apply(B)将 A 函数中的 this 指向 B，并执行 A 函数，只不过 call 传的是一个个参数，apply 传的是参数数组；A.bind(B)只改变 this 指向但不执行函数。**

一、call 的实现

```
var foo={
    value:1
};
function bar(){
    console.log(this.value);
}
bar.call(foo);
```

1.call 改变了 this 的指向，指向到 foo

2.bar 函数执行

模拟实现的步骤可以分为：

1.将函数设为对象的属性 foo.fn=bar

2.执行该函数 foo.fn()

3.删除该属性 delete foo.fn

```
var foo={
    value:1
};
function bar(){
    console.log(this.value);
}
Function.prototype.call2=function(obj){//在原型上添加call2方法，让bar可调用call2
    obj.fn=this;//this=调用call2的对象，也就是bar
    obj.fn();
    delete obj.fn
}
bar.call2(foo);
```

需注意：

1.this 可以传 null，当为 null，this 指向 window

2.函数可以有返回值

```
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title></title>
</head>
<body>
</body>
<script>
    Function.prototype.call2=function(obj,...arg){
        obj=obj||window;
        obj.fn=this;
        let res
        if(!arg){
          res=obj.fn();
        }
        else{
          res=obj.fn(...arg);
        }
        delete obj.fn;
        return res;
    }
    var value = 2;

    let obj = {
        value: 1
    }

    function bar(name, age) {
        console.log(this.value);
        return {
            value: this.value,
            name: name,
            age: age
        }
    }

    bar.call2(null); // 2
    console.log(bar.call2(obj, 'kevin', 18));
    // 1
    // Object {
    //    value: 1,
    //    name: 'kevin',
    //    age: 18
    // }
</script>
</html>
```

二、apply 的实现，类似 call，不过在参数那里需要注意一下

```
Function.prototype.apply2=function(obj,arg){
    obj=obj||window;
    obj.fn=this;
    let res
    if(!arg){
        res=obj.fn();
    }
    else{
        res=obj.fn(...arg);
    }
    delete obj.fn;
    return res;
}
```

三、bind 的实现

**bind()**方法创建一个新的函数，在 bind()被调用时，这个新函数的 this 被指定为 bind()的第一个参数，而其余参数将作为新函数的参数，供调用时使用。

```
function LateBloomer() {
  this.petalCount = Math.ceil(Math.random() * 12) + 1;
}

// 在 1 秒钟后声明 bloom
LateBloomer.prototype.bloom = function() {
  console.log(this===flower)//true 使用new，所有this绑定到实例
  setTimeout(this.declare.bind(this), 1000);//若未使用bind，回调函数内部this为window
};

LateBloomer.prototype.declare = function() {
  console.log('I am a beautiful flower with ' +
    this.petalCount + ' petals!');
};

var flower = new LateBloomer();
flower.bloom();  // 一秒钟后, 调用 'declare' 方法
```

版本 1：实现传参

```
Function.prototype.bind2=function(context){
    let self=this;
    let args=[].slice.call(arguments,1);
    return function(){
        let bindArgs=[].slice.call(arguments);
        self.apply(context,args.concat(bindArgs));
    }
}
```

版本 2：实现可 new 的 bind；当 bind 返回的函数作为构造函数时，bind 时指定的 this 值会失效，this 值指向新的实例，但传入的参数依然生效

```
Function.prototype.bind2=function(context){
    //调用的不是函数要报错
    if (typeof this !== "function") {
      throw new Error("Function.prototype.bind - what is trying to be bound is not callable");
    }
    let self=this;
    let args=[].slice.call(arguments,1);
    //我们直接将 fBound.prototype = this.prototype，
    //当直接修改 fBound.prototype 的时候，也会直接修改绑定函数的 prototype。
    //这个时候，我们应该通过一个空函数来进行中转
    let empty=function(){}
    let fBound=function(){
        let bindArgs=[].slice.call(arguments);
        //当作为构造函数时，this 指向实例，此时empty.prototype在实例的原型链上，结果为 true
        //a.bind(b)
        //于是将绑定函数a的 this 指向该实例，可以让实例获得来自绑定函数a的值
        //当作为普通函数时，this 指向 window，此时结果为 false，将绑定函数的 this 指向 context
        return self.apply(this instanceof empty ? this:context,args.concat(bindArgs));
    }
    empty.prototype=this.prototype;//通过一个空函数来进行中转
    fBound.prototype=new empty();
    return fBound;
}
```

https://github.com/mqyqingfeng/Blog/issues/12github.com/mqyqingfeng/Blog/issues/12

Object.prototype.hasOwnProperty.call(objB,keysA[i])相当于 objB.hasOwnProperty(keysA[i])
