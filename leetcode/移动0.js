//left代表已替换了的非0的元素下标,right用来移动查找非0元素，找到就替换left位置的元素，并且left指针和right
//指针都往后移；否则只有right指针往后移
var moveZeroes = function (nums) {
  let left = 0,
    right = 0;
  while (right < nums.length) {
    if (nums[right] != 0) {
      nums[left] = nums[right];
      left++;
      right++;
    } else {
      right++;
    }
  }
  for (let i = left; i < nums.length; i++) {
    nums[i] = 0;
  }
};
