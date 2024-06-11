const promise = new Promise((resolve, reject) => {
  resolve(2);
  // reject(2);
}).then(
  (val) => {
    console.log(val);
  },
  (err) => {
    console.log(err);
  }
);
class PromiseA {
  constructor(executor) {
    //状态的转换
    this.status = "pending";
    //值的转换
    this.data = undefined;
    //存回调的数组
    this.callbacks = [];
    //执行函数
    function resolve(value) {
      if (this.status !== "pending") {
        return;
      }
      this.status = "resolved";
      this.data = value;
      if (this.callbacks.length > 0) {
        setTimeout(() => {
          //放入队列中执行所有成功的回调
          this.callbacks.forEach((callbacksObj) => {});
        });
      }
    }
    function reject(reason) {
      if (this.status !== "pending") {
        return;
      }
      this.status = "rejected";
      this.data = reason;
      if (this.callbacks.length > 0) {
        setTimeout(() => {
          //放入队列中执行所有成功的回调
          this.callbacks.forEach((callbacksObj) => {});
        });
      }
    }
    executor(resolve, reject);
  }

  then(onRESOLVED, onREJECTED) {
    onRESOLVED =
      typeof onRESOLVED === "function" ? onRESOLVED : (value) => value;
    onREJECTED =
      typeof onREJECTED === "function"
        ? onREJECTED
        : (reason) => {
            throw reason;
          };
  }
}
const promise = new PromiseA((resolve, reject) => {
  resolve(2);
  // reject(2);
}).then(
  (val) => {
    console.log(val);
  },
  (err) => {
    console.log(err);
  }
);
