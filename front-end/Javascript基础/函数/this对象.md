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
