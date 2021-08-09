//怎么判断undefined和null
console.log(typeof undefined === "undefined");
console.log(typeof null === "object");
//怎么区分null和空对象{} []
console.log(!null); //true
console.log(!{}); //false
console.log(![]); //false
console.log([].length === 0); //true
console.log(!""); //true
console.log(!"0"); //false
console.log(!0); //true
