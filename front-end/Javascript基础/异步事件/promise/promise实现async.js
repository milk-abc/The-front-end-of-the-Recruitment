async function async1() {
  console.log("async1 start");
  await async2();
  console.log("async1 end");
}
async function async1() {
  return new Promise((resolve) => {
    console.log("start");
    resolve(async2());
  }).then(() => {
    console.log("end");
  });
}
