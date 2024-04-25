var arr = [3, 5, 7, 1, 2, 8, 9, 4, 10, 13, 6];

var merge_sort = function (arr) {
  if (arr.length <= 1) {
    return arr;
  }

  let index = Math.floor(arr.length / 2);
  let left = arr.slice(0, index);
  let right = arr.slice(index);

  return merge(merge_sort(left), merge_sort(right));
};

var merge = function (left, right) {
  var result = [];

  while (left.length > 0 && right.length > 0) {
    left[0] > right[0] ? result.push(right.shift()) : result.push(left.shift());
  }

  return result.concat(left, right);
};

var arrSorted = merge_sort(arr);
console.log(arrSorted);
