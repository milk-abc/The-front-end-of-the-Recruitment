// function fn1(ctx,next){
// 	ctx.log.push('fn1-1');
// 	next();
// 	ctx.log.push('fn1-2');
// }
// function fn2(ctx,next){
// 	ctx.log.push('fn2');
// 	next();
// }
// function fn3(ctx,next){
// 	ctx.log.push('fn3');
// 	next();
// }

// function compose(ctx, fnArr, final) {
//   function next(i) {
//     fnArr[i] &&
//       fnArr[i](ctx, () => {
//         next(i + 1);
//       });
//   }
//   next(0);
//   final(ctx);
// }
/**
 * 三数之和 10 [1,2,3,4,5,6]
 * 两数之和
 */
const twoSum = (arr, sum) => {
  arr.sort();
  let left = 0,
    right = arr.length - 1;
  const res = [];
  while (left < right) {
    if (arr[left] + arr[right] < sum) {
      left += 1;
    } else if (arr[left] + arr[right] > sum) {
      right -= 1;
    } else {
      res.push([arr[left], arr[right]]);
      left += 1;
      right -= 1;
    }
  }
  return res;
};
console.log(twoSum([1, 9], 10));
