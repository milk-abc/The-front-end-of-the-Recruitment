//无重复字符的最长子串，返回长度
// "abbbcbd"  "cbd"
const longestSubString = (str) => {
  let left = 0,
    right = 0;
  const set = new Set();
  let ans = 0;
  while (left < s.length) {
    while (right < s.length && !set.has(s[right])) {
      set.add(s[right]);
      right++;
    }
    ans = Math.max(ans, right - left);
    set.delete(s[left]);
    left++;
  }
  return ans;
};
const ans = longestSubString("abbbcbd");
console.log("ans", ans);
