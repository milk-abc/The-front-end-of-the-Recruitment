function promiseTimeout(promise, time) {
  const timeout = new Promise((resolve, reject) => {
    setTimeout(resolve, time);
  }).then(() => {
    throw new Error("timeout");
  });
  return Promise.race([promise, timeout]);
}
let promise = function () {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, 5000);
  });
};
promiseTimeout(promise, 200).then((data)=>{
  console.log(data)
});
