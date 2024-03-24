/**
 * function name(params：形参) {
     arguments：实参-函数调用传入的参数
   }
    name(1,2,3)=>1,2,3是实参-函数调用传入的参数
    默认参数是undefined，剩余参数语法允许将不确定数量的参数表示为数组
 * @returns 
 */
function add() {
  let res = 0;
  console.log(arguments.length); //实参的长度 3
  let arr = Array.from(arguments);
  console.log("arr", Array.isArray(arr));
  for (let i = 0; i < arguments.length; i++) {
    res += arguments[i];
  }
  return res;
}
add(1, 2, 3); //实参的长度 3
console.log(add.length); //形参的长度 0
/**
 * 在下面的示例中，multiply 函数使用剩余参数收集从第二个参数开始到最后的参数。
 * 然后，该函数将它们与第一个参数相乘。
 * @param {*} multiplier
 * @param  {...any} theArgs
 * @returns
 */
function multiply(multiplier, ...theArgs) {
  return theArgs.map((x) => multiplier * x);
}

const arr = multiply(2, 1, 2, 3);
console.log(arr); // [2, 4, 6]

function factorial(n) {
  if (n == 0 || n == 1) return 1;
  else {
    return n * arguments.callee(n - 1);
  }
}
console.log(factorial(2));
