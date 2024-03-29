this 在标准函数和箭头函数有不同的行为。在标准函数中，this 引用的把函数当成方法调用的上下文对象。

一、直接调用和作为对象方法调用

1.

```text
var people = {
    Name: "海洋饼干",
    getName : function(){
        console.log(this.Name);
    }
};
var bar = people.getName;

bar();  //undefined，指向window对象，直接调用
---------------------------
var people = {
    Name: "海洋饼干",
    getName : function(){
        console.log(this.Name);
    }
};
people.getName();//海洋饼干，指向people，作为对象方法调用
```

2.

```text
window.color='red';
let o={
    color:'blue'
};
function sayColor(){
    console.log(this.color);
}
sayColor();//red
o.sayColor=sayColor;
o.sayColor();//blue
```

定义在全局上下文中的函数 sayColor()引用了 this 对象。这个 this 到底引用哪个对象必须到函数被调用时才能确定。因此这个值在代码执行的过程中可能会变。如果在全局上下文中调用 sayColor()，这结果会输出"red"，因为 this 指向 window。而在把 sayColor()赋值给 o 之后再调用 o.sayColor()，this 会指向 o，即 this.color 相当于 o.color，所以会显示"blue"。

二、call apply bind

强制改变函数的 this 指向，第一个参数是设置 this 对象

```text
function foo(){
    console.log(this.a);
}
var obj = {
    a : 10
}
foo.call(obj); //10，强制将foo函数内的this指向obj
```

三、new 关键字调用

使用 new 操作符调用构造函数会执行以下操作：

1.创建一个空的新对象

2.新对象内部的[[Prototype]]特性被赋值为构造函数的 prototype

3.构造函数的 this 绑定到新对象(this 指向新对象)

4.执行构造函数内部的代码(给新对象添加属性)

5.如果构造函数返回非空对象，则返回该对象；否则返回刚创建的新对象

```text
function foo(){
    this.a = 10;
    console.log(this);
}
foo();                    // window对象
console.log(window.a);    // 10   默认绑定

var obj = new foo();      // foo{ a : 10 }  创建的新对象的默认名为函数名
                          // 然后等价于 foo { a : 10 };  var obj = foo;
console.log(obj.a);       // 10    new绑定
```

![img](https://picx.zhimg.com/80/v2-bb4078419039806d0ac8bdff68eba6c0_720w.webp?source=d16d100b)

```text
function foo(){
    this.a = 10;
    return new String("捣蛋鬼");
}
var obj = new foo();
console.log(obj.a);       // undefined
console.log(obj);         // "捣蛋鬼"
```

![img](https://picx.zhimg.com/80/v2-2a87417f3025ec5fb41c06f0c9c5418f_720w.webp?source=d16d100b)

四、作为事件处理程序调用：对于用作 DOM 事件侦听器的常规函数，`this`指向触发事件的目标对象。

```text
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <style type="text/css">
    </style>
</head>

<body>
    <button id="btn">点击</button>
</body>
-------------------------------------
<script>
    var button=document.getElementById("btn");
    function processFormData (evt) {
      console.log(this)
    }
    button.addEventListener('click', processFormData, false);
</script>
-----------------------------------------
<script>
    var button=document.getElementById("btn");
    button.onclick=function(){
        console.log(this)
    }
</script>

</html>
```

![img](https://pic1.zhimg.com/80/v2-44555afe07c3f82164651aa5d3c28d60_720w.webp?source=d16d100b)

```text
// 被调用时，将关联的元素变成蓝色
function bluify(e){
  console.log(this === e.currentTarget); // 总是 true

  // 当 currentTarget 和 target 是同一个对象时为 true
  console.log(this === e.target);
  this.style.backgroundColor = '#A5D9F3';
}

// 获取文档中的所有元素的列表
var elements = document.getElementsByTagName('*');

// 将bluify作为元素的点击监听函数，当元素被点击时，就会变成蓝色
for(var i=0 ; i<elements.length ; i++){
  elements[i].addEventListener('click', bluify, false);
}
```

https://segmentfault.com/a/1190000011194676

五、作为一个内联事件处理函数

当代码被内联 [on-event 处理函数](http://link.zhihu.com/?target=https%3A//developer.mozilla.org/zh-CN/docs/orphaned/Web/Guide/Events/Event_handlers) 调用时，它的`this`指向监听器所在的 DOM 元素：

```text
<button onclick="alert(this.tagName.toLowerCase());">
  Show this
</button>
```

上面的 alert 会显示 `button`。注意只有外层代码中的 `this` 是这样设置的：、

```text
<button onclick="alert((function(){return this})());">
  Show inner this
</button>
```

在这种情况下，没有设置内部函数的 `this`，所以它指向 global/window 对象（即非严格模式下调用的函数未设置 `this` 时指向的默认对象）。

https://github.com/Vibing/blog/issues/13

总结：new 对象的实例中的 this 指向该对象；
箭头函数的 this 是引用的上一级的 this【和源码有关】

---------------------------------------------------------------------------------------------------------



## 内容大概

- 普通函数的this
- 箭头函数的this

## 普通函数

### 1.结论

先说结论，**普通函数的this的指向在函数定义的时候是确定不了的，只有函数执行的时候才能确定this到底指向谁，实际上this的最终指向的是那个调用它的对象，并且是最近的那个**

### 2.分析

例子1：

```arcade
function a(){ 
    var user = "函数内部a";
    console.log(this.user); //undefined
    console.log(this); //Window
}
a();
```

我们知道像这种调用方式，都是window调用，所以输出如上，验证一下

例子2：

```arcade
var user = "window的a";
function a(){ 
    var user = "函数内部a";
    console.log(this.user); //window的a
    console.log(this); //Window
}
a(); 
```

a()前面没有东西默认window.a(),调用方是window，所以此时输出“window的a”

例子3：

```arcade
var o = {
    user:"追梦子",
    fn:function(){
        console.log(this.user);  //追梦子
 }
}
o.fn();
```

这里的this指向的是对象o，因为你调用这个fn是通过o.fn()执行的，那自然指向就是对象o，这里再次强调一点，this的指向在函数创建的时候是决定不了的，在调用的时候才能决定，谁调用的就指向谁，一定要搞清楚这个。

例子4：

```javascript
var user = "window追梦子"
var o = {
    user:"追梦子",
    fn:function(){
        console.log(this.user);  //追梦子
 }
}
window.o.fn();
```

这里虽然最外层是window调用，但是输出的this是对象o，这跟我上面说的结论一样，**this的最终指向的是那个调用它的对象，并且是最近的那个**

例子5：

```javascript
var o = {
    user:"追梦子",
    fn:function(){
        console.log(this) // o
        setTimeout(function(){
            console.log(this);  //window
        },1000)
        
 }
}
o.fn();
```

fn被对象o触发，所以输出o，**定时器和延时器塞队列，最后是由window触发的，所以输出window**

## 箭头函数（敲黑板，重点）

### 1.结论

- **在定义的时候就确认了this的指向**，跟普通函数在使用的时候确认是完全不同
- **作用域总是指向当前作用域的上一个，上一个，上一个（很重要说3遍）！**
- 当前作用域的上一个指向的对象，就是this的指向

PS：JS的作用域一般指的是函数作用域，全局作用域，使用let那种块级作用域不算

### 2.分析

例子1：

```arcade
var b=11;
var obj={
 b:22,
 say:()=>{
 console.log(this.b);
}
}
obj.say();//输出的值为11
```

say是箭头函数，当前作用域的上一个作用域就是全局，而全局指的是window，所以输出11

例子2：

```arcade
var b=11;
var obj={
 b:22,
 say:function(){
  return () => {
     console.log(this.b);
  }
 }
}
obj.say()();//输出的值为22
```

say里面return的那个是箭头函数，当前作用域的上一个作用域是say函数，然后say函数作用域指的是obj，所以输出22

例子3：

```arcade
var str = 'window';  
 
const obj = {
    str:'obj',
    fn: ()=>{
    console.log(this.str);    
    },
    fn2: function(){
    console.log(this.str)
    return {
        str: 'newObj',
        fn: ()=>{
        console.log(this.str);    
        }    
    }
    }
}
 
obj.newFn = ()=>{
    console.log(this.str);    
}
 
obj.fn(); //window
obj.newFn(); //window
obj.fn2().fn(); //输出obj，obj
```

1. fn上一级是全局，所以是window
2. newFn是在外面定义的，不过解析也是跟fn一样
3. fn2是obj触发，所以输出obj，fn2里面返回了一个对象，对象里面有一个fn箭头函数，这个fn的上一级作用域是fn2（这里注意不要被newObj迷惑）fn2指向的对象是obj，所以输出还是obj

例子4：

```arcade
var obj = {
  str:'obj',
  fn: function(){
   return {
    str: 'inlineObj',
    fn1: function(){
     console.log(this.str); 
     return ()=>{
      console.log(this.str); 
     }
    },
    fn2: ()=>{
     console.log(this.str); 
    }
   }
  }
 }
 
 obj.fn().fn1()(); //输出inlineObj，inlineObj
 obj.fn().fn2(); //输出obj
```

1.obj.fn()这里注意已经返回了一个对象，所以触发fn1的时候，输出inlineObj，fn1里面return一个箭头函数，上一级作用域是fn1，fn1指向return的那个{},所以输出也是inlineObj
2.fn2的上一级作用域是fn,fn指向obj，所以输出obj

## 更改this的指向

### 普通函数可以改

```arcade
var user = "window的a";
function a(){ 
    var user = "函数内部a";
    console.log(this.user);
}
var obj = {
    user:'obj的a'
}
a() //window的a
a.call(obj) //obj的a
```

### 箭头函数不可以改

```arcade
var obj = {
  str:'obj',
  fn: function(){
    console.log(this.str)
   },
  fn2: function(){
    return () => {
        console.log(this.str)
    }
    
  }
}
var obj2 = {
    str:'obj2'
}
obj.fn()  //obj
obj.fn.call(obj2) //obj2
obj.fn2()() //obj
obj.fn2().call(obj2) //obj
```

可以看到，箭头函数就算用了call换了this指向，输出还是当初定义的那个范围

## 一些比较特别

### 点击事件

```javascript
<div id="dianji">点击事件</div>

document.getElementById('dianji').addEventListener('click',function(){
    console.log(this); // 输出dom
 })
document.getElementById('dianji').addEventListener('click',() =>{
    console.log(this); // window
 })
```

.addEventListener前面是dom，所以普通函数触发的时候输出dom，谁调用输出谁，而箭头函数的上一级作用域是全局，所以输出window

### 当this碰到return

返回空对象{}

```actionscript
function fn()  
{ 
    this.user = '追梦子'; 
    return {};  
}
new fn().user    //undefined
```

返回函数

```actionscript
function fn()  
{ 
    this.user = '追梦子'; 
    return function aaa(){};
}
new fn().user    //undefined
```

返回数字

```actionscript
function fn()  
{ 
    this.user = '追梦子'; 
    return 1;
}
new fn().user  //追梦子
```

返回null

```actionscript
function fn()  
{ 
    this.user = '追梦子'; 
    return null;
}
new fn().user  //追梦子
```

上面的列子主要说明
**如果返回值是一个引用数据类型（函数，对象都属于object），那么this指向的就是那个返回的对象，如果返回值不是一个对象（基础数据类型，数值，字符串，布尔，null，undefined）那么this还是指向函数的实例。**

https://zhuanlan.zhihu.com/p/57204184

https://segmentfault.com/a/1190000024546545
