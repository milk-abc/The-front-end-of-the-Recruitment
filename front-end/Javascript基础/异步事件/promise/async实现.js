let count = 0;
function request2(url) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(url + count++);
    }, 500);
  });
}
// async function run() {
//   const res = await request2("1111");
//   const res2 = await request2(res);
//   console.log(res2);
// }
// run();
function* generate() {
  const res = yield request2("1111");
  const res2 = yield request2(res);
  console.log(res2);
}
function run() {
  const generator = generate();
  function exec(params) {
    const { value, done } = generator.next(params);
    if (!done) {
      value.then((val) => exec(val));
    }
  }
  exec();
}
run();
