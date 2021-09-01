function add() {
  let res = 0
  console.log(arguments.length)//实参的长度 3
  let arr = Array.from(arguments)
  console.log('arr', Array.isArray(arr))
  for (let i = 0; i < arguments.length; i++) {
    res += arguments[i]
  }
  return res
}
add(1, 2, 3)
console.log(add.length)//形参的长度 0
function factorial(n) {
  if ((n == 0) || (n == 1))
    return 1;
  else {
    return (n * arguments.callee(n - 1));
  }
}
console.log(factorial(2))