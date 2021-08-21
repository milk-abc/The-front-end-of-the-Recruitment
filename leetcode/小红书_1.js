let way = function (number) {
  let map1 = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
  let map2 = ["1", "0", "X", "9", "8", "7", "6", "5", "4", "3", "2"];
  let temp1 = 0;
  for (let i = 0; i < 14; i++) {
    temp1 += map1[i] * parseInt(number[i]);
  }
  let res = [];
  let target_index = 0;

  for (let i = 0; i < map2.length; i++) {
    if (number[number.length - 1] === map2[i]) {
      target_index = i;
    }
  }

  let str_index = [];
  for (let i = 14; i < 17; i++) {
    if (isNaN(number[i])) {
      str_index.push(i);
    } else {
      temp1 += map1[i] * parseInt(number[i]);
    }
  }
  let dfs = function (str_index, path) {
    if (path.length > str_index.length) {
      return;
    }
    if (path.length === str_index.length) {
      let temp2 = 0;
      for (let i = 0; i < path.length; i++) {
        temp2 += map1[str_index[i]] * path[i];
      }
      if ((temp1 + temp2) % 11 === target_index) {
        if (!res.includes(path.join(""))) {
          res.push(path.join(""));
          return;
        }
      }
    }
    for (let i = 0; i < 10; i++) {
      path.push(i);
      dfs(str_index, path);
      path.pop();
    }
  };
  dfs(str_index, []);
  return res.length;
};
console.log("ans", way("520123200501169**4"));
