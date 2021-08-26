//双指针，从后往前遍历，取较大值放在数组末尾
var merge = function (nums1, m, nums2, n) {
  let index1 = m - 1,
    index2 = n - 1;
  for (let i = m + n - 1; i >= 0; i--) {
    if (index1 < 0) {
      nums1[i] = nums2[index2--];
    } else if (index2 < 0) {
      nums1[i] = nums1[index1--];
    } else {
      nums1[i] =
        nums1[index1] > nums2[index2] ? nums1[index1--] : nums2[index2--];
    }
  }
};
