function repeat() {
  for (let i = 0; i < 4; i++) {
    (function () {
      setTimeout(() => console.log(i), 3000 * i);
    })(i);
  }
}
repeat();
// let arr=[1,2,3]
// for(let key in arr){
//     console.log(arr[key]);
// }
//当一个变量(就像上面的name)既不是该函数内部的局部变量,也不是该函数的参数,相对于作用域来说,

//就是一个自由变量(引用了外部变量),这样就会形成一个闭包.
//闭包的作用1.让外部可以访问到内部函数的变量值  2.闭包在被函数返回后，其作用域一直
//会保存在内存中，直到闭包被毁
//按理来说是访问不了的，为什么呢，因为内部函数一旦结束，变量值也会随着内部函数一起销毁
//怎么才能让内部函数的变量值不被销毁而传递到外部呢？用return
//只要将内部函数作为外部函数的return，那么在函数运行结束之后只要内部函数不销毁(不设Null)
//内部函数的作用域链中依然有对外部函数的引用，那么外部函数的活动对象也不会销毁
//这就是闭包
var name = "The Window";

var object = {
  name: "My Object",

  getNameFunc: function () {
    console.log(this); //this为object
    return function () {
      //返回一个函数给getNameFunc，则getNameFunc可以得到这个函数的内容
      console.log(this); //this为window
      return this.name; //this.name被返回出去，外部可以访问到它
    }; //因为内部函数不能直接访问外部函数的两个变量this和arguments
    //因此这里的this是window,返回"The Window"
  },
};

console.log(object.getNameFunc()());
//输出"The Window"

var name = "The Window";

var object = {
  name: "My Object",

  getNameFunc: function () {
    var that = this; //将this保存在that中
    return function () {
      //闭包在被函数返回之后，其作用域会一直保存在内存中，直到闭包被销毁
      return that.name;
    };
  },
};

console.log(object.getNameFunc()());
//输出"My Object"

var dom = document.getElementsByTagName("p");
for (var i = 0; i < dom.length; i++) {
  dom[i].onclick = function () {
    console.log(i); //假设有三个p，这里会一直打印3，而不是按顺序
  };
}
/*原因：首先代码会先执行for循环，给每个p绑定一个onclick函数，执行完毕之后i得到的值为3，当
我们点击p标签时，会触发onclick事件，执行绑定的匿名函数，但匿名函数中没有定义变量i，所以它
会往上查找，找到了for循环执行完之后的全局变量i，因此就会一直打印3*/

//修改策略1：使用立即执行函数
var dom = document.getElementsByTagName("p");
for (var i = 0; i < dom.length; i++) {
  dom[i].onclick = (function (i) {
    //立即调用的函数表达式如果不在包含作用域中将返回值赋给
    return function () {
      //一个变量，则其包含的所有变量都会被销毁
      console.log(i);
    };
  })(i);
}

/*我们把参数 i 传给立即执行函数，这样，i 的值就传给了立即执行函数的局部变量 i 了。
立即执行函数会直接执行，但是其活动不会销毁，因为它赋值给了onclick，并且里面有个匿名函数。
执行后局部变量 i 与全局变量 i 联系就切断了，也就是执行的时候，传进去的变量 i 是多少，
立即执行函数的局部变量 i 就是多少，并且该局部变量 i 仍然没有消失，因为匿名函数的存在。

这时候，return中的匿名函数的作用域链中会有两个变量 i。当点击文本的时候，它向上搜索 i 
的时候，它找到立即执行函数的局部变量 i ，就停止向上查找了，因此最后的结果就不会是
全局变量 i 的值3了。*/

for (var i = 0; i < dom.length; i++) {
  dom[i].onclick = (function (t) {
    return function () {
      console.log(t); // 0/1/2
      console.log(i); //3
    };
  })(i);
}

/*return中的匿名函数中的 t 就是立即执行函数的局部变量 i，立即执行函数会在for循环时将i的值
传递给函数参数t，因此匿名函数中t的值等于for循环时的对应i值，而匿名函数 i 就是 指全局变量 i，
因为立即执行函数中没有变量i，只能继续向上搜索，然后就找到全局变量的 i 了*/

//修改策略2：使用let
var dom = document.getElementsByTagName("p");
for (let i = 0; i < dom.length; i++) {
  dom[i].onclick = function () {
    console.log(i);
  };
}
/*在ECMAScript6中，如果对for循环使用块级作用域变量关键字let，那么循环会为每个循环创建独立的变量
将循环里面的语句包裹起来，从而让每个单击处理程序都能引用特定的索引，仅限在for循环中声明定义*/
