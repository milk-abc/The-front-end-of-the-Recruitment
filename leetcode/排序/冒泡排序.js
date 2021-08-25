//冒泡排序是每次取最大的放在最后
let bubbleSort = function (nums) {
  for (let i = nums.length - 1; i >= 0; i--) {
    let sorted = false;
    for (let j = 0; j < i; j++) {
      if (nums[j] > nums[j + 1]) {
        [nums[j], nums[j + 1]] = [nums[j + 1], nums[j]];
        sorted = true;
      }
    }
    if (!sorted) {
      break;
    }
  }
  return nums;
};
let nums = [3, 2, 4, 1];
console.log(bubbleSort(nums));
