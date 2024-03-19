let arr = [1, 2, [3, [4, 5], 6], 7, [8, 9]];
let change = function (arr) {
  let obj = {};
  obj.children = [];
  for (let i = 0; i < arr.length; i++) {
    let temp = {};
    if (Array.isArray(arr[i])) {
      temp = change(arr[i]);
    } else {
      temp.value = arr[i];
    }
    obj.children.push(temp);
  }
  return obj;
};
console.log(JSON.stringify(change(arr)));
