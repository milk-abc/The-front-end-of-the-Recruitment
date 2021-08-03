/*
自定义Promise函数模块IIFE
*/
(function (window) {
  const PENDING = "pending";
  const RESOLVED = "resolved";
  const REJECTED = "rejected";
  class Promise {
    constructor(excutor) {
      //将当前promise对象保存起来
      const self = this;
      self.status = "PENDING"; //给promise对象指定status属性，初始值为PENDING
      self.data = undefined; //给promise对象指定一个用于存储结果数据的属性
      self.callbacks = []; //每个元素的结构:{onRESOLVED(){},onREJECTED(){}}
      function resolve(value) {
        //如果当前状态不是PENDING，直接结束
        if (self.status !== "PENDING") {
          return;
        }
        //将状态改为RESOLVED
        self.status = "RESOLVED";
        //保存value数据
        self.data = value;
        //如果有待执行callback函数，立即异步执行回调函数
        if (self.callbacks.length > 0) {
          setTimeout(() => {
            //放入队列中执行所有成功的回调
            self.callbacks.forEach((callbacksObj) => {
              callbacksObj.onRESOLVED(value);
            });
          });
        }
      }
      function reject(reason) {
        //如果当前状态不是PENDING，直接结束
        if (self.status !== "PENDING") {
          return;
        }
        //将状态改为REJECTED
        self.status = "REJECTED";
        //保存value数据
        self.data = reason;
        //如果有待执行callback函数，立即异步执行回调函数
        if (self.callbacks.length > 0) {
          setTimeout(() => {
            //放入队列中执行所有失败的回调
            self.callbacks.forEach((callbacksObj) => {
              callbacksObj.onREJECTED(reason);
            });
          });
        }
      }
      //立即同步执行excutor
      try {
        excutor(resolve, reject);
      } catch (error) {
        //如果执行器抛出异常,promise对象变为REJECTED状态
        reject(error);
      }
    }
    then(onRESOLVED, onREJECTED) {
      ////指定默认的成功的回调
      onRESOLVED =
        typeof onRESOLVED === "function" ? onRESOLVED : (value) => value;
      //指定默认的失败的回调(实现错误/异常传透)
      onREJECTED =
        typeof onREJECTED === "function"
          ? onREJECTED
          : (reason) => {
              throw reason;
            };
      //假设当前状态还是PENDING状态，将回调函数保存起来
      const self = this;
      //返回一个新的promise对象
      return new Promise((resolve, reject) => {
        //调用指定回调函数处理，根据执行结果，改变return的promise状态
        function handle(callback) {
          try {
            const result = callback(self.data);
            //如果回调函数返回的是promise,return的promise结果就是这个promise的结果
            if (result instanceof Promise) {
              // result.then(
              //   value=>{
              //     resolve(value);
              //   },
              //   reason=>{
              //     reject(reason);
              //   }
              // )
              result.then(resolve, reject);
            } else {
              //如果回调函数返回的不是promise,return的promise就会成功,value就是返回的值
              resolve(result);
            }
          } catch (error) {
            //如果抛出异常,return的promise就会失败,reason就是error
            reject(error);
          }
        }
        if (self.status === "PENDING") {
          self.callbacks.push({
            onRESOLVED() {
              handle(onRESOLVED);
            },
            onREJECTED() {
              handle(onREJECTED);
            },
          });
        } else if (self.status === "RESOLVED") {
          setTimeout(() => {
            //1.如果抛出异常,return的promise就会失败,
            handle(onRESOLVED);
          });
        } else {
          //rejected
          setTimeout(() => {
            handle(onREJECTED);
          });
        }
      });
    }
    // Promise原型对象的catch()
    //指定失败的回调函数
    //返回一个新的promise对象
    catch(onREJECTED) {
      return this.then(undefined, onREJECTED);
    }
    //Promise函数对象resolve方法
    //返回一个指定结果的成功的promise
    static resolve = function (value) {
      //返回一个成功/失败的promise
      return new Promise((resolve, reject) => {
        //value是promise
        if (value instanceof Promise) {
          //使用value的结果作为promise的结果
          value.then(resolve, reject);
        } else {
          //value不是promise=>promise变为成功，数据是value
          resolve(value);
        }
      });
    };
    //返回一个promise对象，它在指定的时间后才确定结果
    static resolveDelay = function (value, time) {
      //返回一个成功/失败的promise
      return new Promise((resolve, reject) => {
        //value是promise
        setTimeout(() => {
          if (value instanceof Promise) {
            //使用value的结果作为promise的结果
            value.then(resolve, reject);
          } else {
            //value不是promise=>promise变为成功，数据是value
            resolve(value);
          }
        }, time);
      });
    };
    //返回一个promise对象，它在指定的时间后才失败
    static rejectDelay = function (reason, time) {};
    //Promise函数对象reject方法
    //返回一个指定结果的失败的promise
    static reject = function (reason) {
      return new Promise((resolve, reject) => {
        reject(reason);
      });
    };
    //Promise函数对象all方法
    //返回一个promise,只有当所有promise都成功时才成功，否则只要有一个失败就失败
    static all = function (promises) {
      const values = new Array(promises.length); //用来保存所有成功value的数组
      //用来保存成功promise的数量
      let resolveCount = 0;
      //返回一个新的promise
      return new Promise((resolve, reject) => {
        //遍历获取每个promise结果
        promises.forEach((p, index) => {
          Promise.resolve(p).then(
            (value) => {
              //p成功，将成功的value保存到values
              resolveCount++;
              values[index] = value;
              //如果全部成功了，将return的promise改变成功
              if (resolveCount === promises.length) {
                resolve(values);
              }
            },
            (reason) => {
              //只要有一个失败，return的promise就失败
              reject(reason);
            }
          );
        });
      });
    };
    //Promise函数对象race方法
    //返回一个promise,其结果由第一个完成的promise决定
    static race = function (promises) {
      return new Promise((resolve, reject) => {
        //遍历获取每个promise结果
        promises.forEach((p, index) => {
          Promise.resolve(p).then(
            (value) => {
              //一旦有成功的，将return变为成功
              resolve(value);
            },
            (reason) => {
              //一旦失败，将return变为失败
              reject(reason);
            }
          );
        });
      });
    };
  }
  //向外暴露Promise函数
  window.Promise = Promise;
})(window);
