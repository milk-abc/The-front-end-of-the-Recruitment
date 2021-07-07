var permute = function (nums) {
  let results = [];
  let vis = new Set();
  let dfs = function (path, nums) {
    if (path.length === nums.length) {
      results.push([...path]);
    }
    for (let i = 0; i < nums.length; i++) {
      if (!vis.has(nums[i])) {
        path.push(nums[i]);
        vis.add(nums[i]);
        dfs(path, nums);
        path.pop();
        vis.delete(nums[i]);
      }
    }
  };
  dfs([], nums);
  return results;
};
