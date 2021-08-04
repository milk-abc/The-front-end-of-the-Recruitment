//async的返回值是一个promise对象
async function fn1() {
  // return 1;
  // throw 2;
  return Promise.reject(3);
}
const result = fn1();
result.then(
  (value) => {
    console.log();
  },
  (reason) => {
    console.log(reason);
  }
);
