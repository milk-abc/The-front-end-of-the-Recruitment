console.log(parseFloat((0.1 + 0.2).toPrecision(12)) === 0.3);
function strip(num, precision = 12) {
  return +parseFloat(num.toPrecision(precision));
}
console.log(strip(0.1 + 0.2) === 0.3);
