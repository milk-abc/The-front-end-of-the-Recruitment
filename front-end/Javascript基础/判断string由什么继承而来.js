console.log(String.__proto__ === Function.prototype);
console.log(Array.__proto__ === Function.prototype);
//可见由Function继承而来
let arr = [1, 2, 3];

// 它继承自 Array.prototype？
console.log(arr.__proto__ === Array.prototype); // true

// 接下来继承自 Object.prototype？
console.log(arr.__proto__.__proto__ === Object.prototype); // true

// 原型链的顶端为 null。
console.log(arr.__proto__.__proto__.__proto__); // null

// 所有得内建原型顶端都是Object.prototype，一切都从对象继承而来。
