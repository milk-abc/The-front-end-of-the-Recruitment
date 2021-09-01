let arr = [3, 3, 3, 5, 3];
let target = 3;
let newarr = arr.slice(0);
for (let i = newarr.length - 1; i >= 0; i--) {
  if (newarr[i] === target) {
    newarr.splice(i, 1);
  }
}
console.log(newarr.join(","));
console.log(arr);
