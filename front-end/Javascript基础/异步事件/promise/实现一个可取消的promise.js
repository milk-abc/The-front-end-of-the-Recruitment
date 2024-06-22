/**
 * ES6的promise实现是很可靠的，但是仍然有不足之处，比方说它没有实现取消promise的功能。
 * 这导致，只要promise的逻辑开始执行，就没有办法阻止，只能干等着它执行完成。
 * 而很多时候，我们会碰到promise正在处理中，但是我们已经不需要/不关系它的结果的情况。
 * 比方说，我们在组件mount完之后发送ajax请求获取页面数据，并交予相关回调处理，但是我们在组件
 * unmount的时候该ajax请求还没有返回结果，此时就需要取消这个promise，让程序不再执行后续的处理逻辑。
 * ES6没有为我们提供原生的cancel方法，我们需要手动实现。这里我的实现基于对promise的二次封装，以及promise类的
 * 静态方法promise.race
 */
function withCancel(originalPromise) {
  let cancel = () => {};
  let isCancelled = false;
  const cancelPromise = new Promise((resolve, reject) => {
    cancel = (e) => {
      isCancelled = true;
      reject(e);
    };
  });
  //异步任务执行完毕后取消无效
  const groupPromise = Promise.race([originalPromise, cancelPromise]).catch(
    (e) => {
      //isCancelled标志位，表明用户是否主动触发cancel。如果是主动触发，不要抛出异常
      if (isCancelled) {
        console.log("promise is cancelled");
        console.log(e);
        return new Promise(() => {});
      } else {
        return Promise.reject(e);
      }
    }
  );
  return Object.assign(groupPromise, { cancel });
}
