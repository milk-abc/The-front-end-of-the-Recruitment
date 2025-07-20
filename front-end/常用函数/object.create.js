//a=Object.create(b)表示将b赋值给a的原型
//实现它
Object.myCreate = function (proto, propertyObject = undefined) {
  if (propertyObject === null) {
    throw "TypeError";
  } else {
    function Fn() {}
    Fn.prototype = proto;
    const obj = new Fn();
    if (propertyObject !== undefined) {
      Object.defineProperties(obj, propertyObject);
    }
    if (proto === null) {
      //创建一个没有原型对象的对象，object.create(null)
      obj.__proto__ = null;
    }
    return obj;
  }
};
//Object.entries将对象变为数组

