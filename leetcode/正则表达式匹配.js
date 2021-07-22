var isMatch = function (s, p) {
  let n = s.length,
    m = p.length;
  let dp = function (s, i, p, j) {
    if (i === n && j === m) {
      return true;
    }
    if (i === n) {
      if ((m - j) % 2 === 1) {
        return false;
      }
      for (; j + 1 < m; j += 2) {
        if (p[j + 1] !== "*") {
          return false;
        }
      }
      return true;
    }
    if (s[i] === p[j] || p[j] === ".") {
      if (j + 1 < m && p[j + 1] === "*") {
        return dp(s, i + 1, p, j) || dp(s, i, p, j + 2);
      } else {
        return dp(s, i + 1, p, j + 1);
      }
    } else {
      if (j + 1 < m && p[j + 1] === "*") {
        return dp(s, i, p, j + 2);
      } else {
        return false;
      }
    }
  };
  return dp(s, 0, p, 0);
};
let s = "ab",
  p = ".*";
console.log(isMatch(s, p));
