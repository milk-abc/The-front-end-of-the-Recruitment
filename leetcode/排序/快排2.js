function findKthLargest(nums: number[], k: number): number {
  const quickSort = (arr: number[], low: number, high: number) => {
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
  return nums[nums.length - k];
}
