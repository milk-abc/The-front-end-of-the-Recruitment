//每次将一个数字插入一个有序的数组里，成为一个长度更长的有序数组
//插入排序是从第二个开始,i=1...len-1,j=i-1...0
//没找到合适的位置之前，所有元素后移
let insertSort = function (nums) {
  for (let i = 1; i < nums.length; i++) {
    let cur = nums[i]; //保存需要插入的元素
    let j = i - 1;
    while (j >= 0 && nums[j] > cur) {
      nums[j + 1] = nums[j];
      j--;
    }
    nums[j + 1] = cur;
  }
  return nums;
};
console.log(insertSort([1, 5, 2, 4, 3]));
