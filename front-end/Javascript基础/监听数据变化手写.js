let obj = { name: "li" };
Object.keys(obj).forEach((key) => {
  //value一直给对应的key保留着，留在get,set方法中
  let value = obj[key];
  Object.defineProperty(obj, key, {
    get() {
      console.log("get");
      return value;
    },
    set(newval) {
      if (value !== newval) {
        console.log("set");
        value = newval;
      }
    },
  });
});
//vue中的双向绑定关键在于data如何更新view，因为view更新data其实可以通过事件监听即可
//数据改变如何监听视图，只需要在Object.defineProperty的set方法中定义一些更新view的方法
//1.需要设置一个监听器Observer，用来监听所有属性
//2.需要给节点设置watcher来订阅如果属性发生变化，需要通知订阅者watcher拿新值更新节点
//3.需要一个消息订阅器Dep来专门收集订阅者和发布通知
//4.需要一个指令解析器Compile，对每个节点元素进行扫描和解析，将相关指令初始化为对应的watcher
//并替换模板数据并绑定响应的事件监听函数
//实现一个Observer，用来劫持并监听所有属性，如果有变动的，就通知订阅者
//实现一个订阅者Watcher，可以收到属性的变化通知并执行响应的函数，从而更新视图
//实现一个解析器Compile，可以扫描和解析每个节点的相关指令，并根据其初始化模板数据记忆初始化相应的订阅器
//Observer
function Dep() {
  this.subs = [];
}
Dep.prototype = {
  addSub(sub) {
    this.subs.push(sub);
  },
  notify() {
    this.subs.forEach(function (sub) {
      sub.update();
    });
  },
};
class Watcher {
  constructor(vm, exp, cb) {
    this.cb = cb;
    this.vm = vm;
    this.exp = exp;
    this.value = this.get(); //将自己添加到订阅器的操作
  }

  get() {
    //vm.$data.school vm.$data.school.name
    //获取值会调用get方法
    Dep.target = this; //就是watcher
    //取值 把这个观察者和数据关联起来
    let value = CompilerUtil.getVal(this.vm, this.expr);
    Dep.target = null;
    return value;
  }
  update() {
    let newValue = CompilerUtil.getVal(this.vm, this.expr);
    if (newValue !== this.oldValue) {
      this.cb(newValue);
    }
  }
}
function observer(data) {
  if (!data || typeof data !== "object") {
    return;
  }
  Object.keys(data).forEach(function (key) {
    let val = data[key];
    observer(val);
    let dep = new Dep();
    Object.defineProperty(data, key, {
      enumerable: true,
      configurable: true,
      get() {
        dep.addSub(watcher);
        return val;
      },
      set(newval) {
        val = newval;
        console.log(
          key.toString() + "已经被监听了，现在值为" + newval.toString()
        );
        dep.notify();
      },
    });
  });
}
let dog = { name: "lili", friend: { name: "ooo" } };
observer(dog);
console.log(dog.name);
dog.friend.name = "ppp";
console.log(dog.friend.name);
