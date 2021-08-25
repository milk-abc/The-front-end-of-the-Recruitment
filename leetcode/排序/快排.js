//选择排序是i=0...len-1  j=i+1...len  每次取最小的放在i位置

var getLeastNumbers = function (arr, k) {
  let quicksort = function (arr, l, r) {
    if (l >= r) {
      return;
    }
    let pivot = arr[l];
    let i = l,
      j = r;
    while (i < j) {
      while (i < j) {
        if (arr[j] > pivot) {
          arr[i] = arr[j];
          break;
        }
        j -= 1;
      }
      if (i < j) {
        i += 1;
      }
      while (i < j) {
        if (arr[i] < pivot) {
          arr[j] = arr[i];
          break;
        }
        i += 1;
      }
      if (i < j) {
        j -= 1;
      }
    }
    arr[i] = pivot;
    console.log("1", arr);
    quicksort(arr, l, i - 1);
    quicksort(arr, i + 1, r);
  };
  quicksort(arr, 0, arr.length - 1);
  return arr.slice(0, k);
};
let arr = [1, 4, 1, 2, 1];
arr1 = getLeastNumbers(arr, 3);
console.log(arr);
console.log(arr1);
