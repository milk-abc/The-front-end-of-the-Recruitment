/**
 * 保证一个类只有一个实例,并提供一个访问它的全局访问点。
 */
const singlemodel = (() => {
  /**
   * 闭包让instance一直存在内存里
   */
  let instance;
  function init() {
    return {};
  }
  return () => {
    if (!instance) {
      instance = init();
    }
    return instance;
  };
})();
const single1 = singlemodel();
const single2 = singlemodel();
console.log(single1 === single2);
//true
