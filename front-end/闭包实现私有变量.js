const Example = (function () {
  let _pivate = ''
  class Example {
    constructor() {
      _pivate = 'pivate'
    }
    getName() {
      return _pivate
    }
  }
  return Example
})()
let ex = new Example();
console.log(ex.getName())
console.log(ex._pivate)