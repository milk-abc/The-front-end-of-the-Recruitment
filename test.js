//无重复字符的最长子串，返回长度
// "abbbcbd"  "cbd"
const longestSubString = (str) => {
  let left = 0,
    right = 0;
  let set = new Set();
  let ans = 0;
  while (right < str.length) {
    while (!set.has(str[right])) {
      set.add(str[right]);
      right++;
    }
    left++;
    set.delete(str[right]);
    ans = Math.max(ans, right - left + 1);
  }
  return ans;
};
const ans = longestSubString("abbbcbd");
console.log("ans", ans);
