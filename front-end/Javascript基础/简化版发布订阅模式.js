//观察者模式
//目标的构造函数
class Subject {
  constructor() {
    this.subs = [];
  }
  addSub(sub) {
    this.subs.push(sub);
  }
  notify() {
    this.subs.forEach((sub) => {
      sub.update();
    });
  }
}
class Observer {
  update() {
    console.log("updated");
  }
}
let subject = new Subject();
let ob1 = new Observer();
let ob2 = new Observer();
//目标添加观察者了
//相当于观察者订阅目标，像订阅者
subject.addSub(ob1);
subject.addSub(ob2);
//目标发布消息调用观察者的更新方法，会全部更新
//像发布者
subject.notify(); //update

// 可以看到目标和观察者是直接联系在一起的。观察者把自身添加到了目标对象中，可见和发布订阅模式(解耦)差别还是很大的。
// 在这种模式下，目标更像一个发布者，他让添加进来的所有观察者都执行了update函数，而观察者就像一个订阅者。

//发布订阅模式,通过Dep中间件进行通信
class publisher {
  publish(dep) {
    dep.notify();
  }
}
//主题
class Dep {
  //通知所有观察者更新数据
  constructor() {
    this.subs = []; //放所有订阅者
  }
  //订阅
  addSub(sub) {
    //添加订阅者
    this.subs.push(sub);
  }
  //发布
  notify() {
    this.subs.forEach((sub) => sub.update());
  }
}
class subscribe {
  update() {
    console.log("update");
  }
}
let dep1 = new Dep(); //订阅者可以订阅不同的主题，更新时不需要更新所有主题，只需要更新对应订阅者订阅的主题
let dep2 = new Dep();
let pub = new publisher();
let sub1 = new subscribe();
let sub2 = new subscribe();
dep1.addSub(sub1);
pub.publish(dep1);
dep2.addSub(sub2);
pub.publish(dep2);
