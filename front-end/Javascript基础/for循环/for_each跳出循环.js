let arr = [1, 2, 4];
//for each内部不能使用continue和break会报错
//使用return跳出本次循环
// arr.forEach((item, index) => {
//   if (item === 2) {
//     return;
//   }
//   console.log(item);
// });
//跳出整个循环
// try {
//   arr.forEach((item, index) => {
//     if (item === 2) {
//       throw new Error();
//     }
//     console.log(item);
//   });
// } catch (e) {}
//跳出嵌套循环
try {
  arr.forEach((item, index) => {
    try {
      arr.forEach((item, index) => {
        if (item === 2) {
          throw new Error(); //想要跳出嵌套循环
        }
        console.log("index", item);
      });
    } finally {
    }
  });
} catch (e) {}
