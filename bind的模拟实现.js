//第一版直接调用apply实现，返回一个函数
Function.prototype.bind1=function(context){
    let self=this;
    return function(){
        self.apply(context)
    }
}
//第二版实现可以分两步传参数
Function.prototype.bind2=function(context){
    let self=this;
    let args=[].slice.call(arguments,1);
    return function(){
        let bindArgs=[].slice.call(arguments);
        self.apply(context,args.concat(bindArgs));
    }
}
//第三版实现使用new的时候之前绑定的this失效，指向new的实例对象，传参依然有效
//a.bind(b),new出来的实例可以继承a的原型
Function.prototype.bind3=function(context){
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
var value=2;
var foo={
    value:1
};
function bar(name,age){
    this.habit='shopping';
    console.log(this.value);
    console.log(name);
    console.log(age);
}
bar.prototype.friend='kevin';
var binFoo=bar.bind3(foo,'lq');
var obj=new binFoo('2');//this指向由bar转为foo，再由foo转向obj，并且可以继承bar的原型