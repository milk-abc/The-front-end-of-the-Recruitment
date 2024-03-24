const compose = (arr) => {
  return arr.reduce((total, cur) => {
    // 第一个参数为上一次调用 callbackFn 的结果。
    //在第一次调用时，如果指定了 initialValue 则为指定的值，否则为 array[0] 的值。
    console.log("1", total, cur);
    return Object.assign(total, cur);
  });
};
const arr = [{ x: 1 }, { y: 2 }, { z: 3 }];
console.log(compose(arr));
