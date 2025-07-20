async function test() {
  await new Promise((resolve, reject) => reject("错误"));
}
test().catch((data) => console.log(data));
async function test2() {
  try {
    await new Promise((resolve, reject) => reject("错误"));
  } catch (error) {
    console.log(error);
  }
}
test2();
async function test3() {
  await new Promise((resolve, reject) => reject("错误")).catch((data) =>
    console.log(data)
  );
}
test3();
