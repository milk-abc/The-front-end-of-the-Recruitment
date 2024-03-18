为什么需要用到call,apply,bind?

1.对象的继承

2.借用方法

**关键点：A.call/apply(B)将A函数中的this指向B，并执行A函数，只不过call传的是一个个参数，apply传的是参数数组；A.bind(B)只改变this指向但不执行函数。**

一、call的实现

```
var foo={
    value:1
};
function bar(){
    console.log(this.value);
}
bar.call(foo);
```

1.call改变了this的指向，指向到foo

2.bar函数执行

模拟实现的步骤可以分为：

1.将函数设为对象的属性  foo.fn=bar

2.执行该函数  foo.fn()

3.删除该属性  delete foo.fn

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

1.this可以传null，当为null，this指向window

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

二、apply的实现，类似call，不过在参数那里需要注意一下

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

三、bind的实现

**bind()**方法创建一个新的函数，在bind()被调用时，这个新函数的this被指定为bind()的第一个参数，而其余参数将作为新函数的参数，供调用时使用。

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

版本1：实现传参

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

版本2：实现可new的bind；当bind返回的函数作为构造函数时，bind时指定的this值会失效，this值指向新的实例，但传入的参数依然生效

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