function bindThis(f, oTarget) {
  console.log("arguments", arguments);
  let args = [].slice.call(arguments, 2);
  return function () {
    return f.apply(oTarget, [].slice.call(arguments).concat(args));
  };
}
let f = function () {
  var r = bindThis(
    function (a, b) {
      return this.test + a + b;
    },
    { test: 2 }
  )(2, 3);
  // console.log("r", r);
  return r === 7;
};
f();
