/**
 * forEach和for循环的效率
 */
const random = (min, max) => Math.floor(Math.random() * (max - min)) + min;

const list = Array.from(Array(10000), (v, k) => ({ num: random(0, 100) }));
let a;
// console.time("...");
// a = [...list];
// console.timeEnd("...");

console.time("object.assign");
a = Object.assign([], list);
console.timeEnd("object.assign");
