let obj = {
  name: "lq",
  age: "12",
};

function person(age, sex) {
  console.log(this.name);
  console.log(age, sex);
  return this.name;
}

Function.prototype.call1 = function (obj, ...args) {
  obj = obj || window;
  obj.fn = this;
  let res;
  if (!args) {
    res = obj.fn();
  } else {
    res = obj.fn(...args);
  }
  delete obj.fn;
  return res;
};
person.call1(obj, 2, "female");
Function.prototype.apply1 = function (obj, args) {
  obj = obj || window;
  obj.fn = this;
  let res;
  if (!args) {
    res = obj.fn();
  } else {
    res = obj.fn(...args);
  }
  delete obj.fn;
  return res;
};
person.apply1(obj, [2, "female"]);
