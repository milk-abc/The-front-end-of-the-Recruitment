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
function findKthLargest(nums, k) {
  const quickSort = (arr, low, high) => {
    if (low < high) {
      const privot = paritition(arr, low, high);
      quickSort(arr, low, privot - 1);
      quickSort(arr, privot + 1, high);
    }
  };
  const paritition = (arr, low, high) => {
    let privot = arr[low];
    while (low < high) {
      while (low < high && arr[high] >= privot) {
        high--;
      }
      arr[low] = arr[high];
      while (low < high && arr[low] <= privot) {
        low++;
      }
      arr[high] = arr[low];
    }
    arr[low] = privot;
    return low;
  };
  quickSort(nums, 0, nums.length - 1);
  return nums[k - 1];
}
let arr = [1, 4, 1, 2, 1];
// arr1 = getLeastNumbers(arr, 3);
arr1 = findKthLargest(arr, 3);
console.log(arr);
console.log(arr1);
