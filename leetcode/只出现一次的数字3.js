var singleNumber = function (nums) {
  let temp = 0;
  //先求出两个不同的数的异或值
  for (let num of nums) {
    temp ^= num;
  }
  let dir = 1;
  //找出不同的两个数任意一位不同的位数假设为2
  while ((dir & temp) === 0) {
    dir <<= 1;
  }
  //因为除了不同的两个数以外其他所有数第二位是相同的
  //那么你拿第二位为1的dir去&，相同的数此位为1用&1会被分到第一种情况
  //如果为0都会被分到第二种情况，但是成对的分开
  //但是不同的两个数这一位不同，假设A是0那么B是1，用&1可以将两个分开
  //这样就变成了两组中每组有一个不同的数，对每组进行异或操作就可以得到最终结果
  let ans = new Array(2).fill(0);
  for (let num of nums) {
    if (dir & num) {
      ans[0] ^= num;
    } else {
      ans[1] ^= num;
    }
  }
  return ans;
};
console.log(singleNumber([-1, 0, -1, 1]));
