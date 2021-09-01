function F() {}
console.log(F.prototype.__proto__ == Object.prototype);
console.log(Object.prototype.__proto__ === null);
//s='abc'  s=new String('adbc')
