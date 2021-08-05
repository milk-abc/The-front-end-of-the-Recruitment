var restoreIpAddresses = function (s) {
  let res = [];
  let dfs = function (s, depth, index, path) {
    if (index > s.length) {
      return;
    }
    if (depth === 4 && index === s.length) {
      res.push(path.join("."));
      return;
    }
    if (depth === 4 && index < s.length) {
      return;
    }
    for (let gap = 1; gap <= 3; gap++) {
      if (s[index] === "0" && gap > 1) {
        return;
      }
      let cur = parseInt(s.substr(index, gap));
      if (cur >= 0 && cur <= 255) {
        path.push(cur);
        depth++;
      } else {
        return;
      }
      // console.log("前", depth, index + gap, path, res);
      dfs(s, depth, index + gap, path);
      path.pop();
      depth--;
      // console.log("后", depth, index, gap, path, res);
    }
  };
  dfs(s, 0, 0, []);
  return res;
};
let ans = restoreIpAddresses("101023");
console.log("ans", ans);
