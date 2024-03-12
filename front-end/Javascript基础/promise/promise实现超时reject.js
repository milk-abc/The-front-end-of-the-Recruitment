let promiseWithTimeout = function (promise, timeout) {
  let timer = new Promise((resolve) => {
    setTimeout(resolve, timeout);
  }).then(() => {
    throw new Error("timeout");
  });
  return Promise.race([promise, timer]);
};
//模拟一个可能需要很长时间才能完成的异步操作
let promise=new Promise((resolve,reject)=>{
  setTimeout(()=>{
    resolve(2)
  },1000)
})
promiseWithTimeout(promise,500);