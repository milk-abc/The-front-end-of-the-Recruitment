Array.prototype.uniq = function () {
  //return Array.from(new Set(this))
  var obj = [];
  return this.filter((item) => {
    return obj.includes(item) ? false : obj.push(item);
  });
};
let arr = [false, true, undefined, null, NaN, 0, 1, {}, {}, "a", "a", NaN];
console.log(arr.uniq());
console.log([1, 2].push(undefined));

// const readline = require('readline');
// const rl = readline.createInterface({
//    input: process.stdin,
//    output: process.stdout
// });
// rl.on('line', function(data){
//    console.log(data);
// })
