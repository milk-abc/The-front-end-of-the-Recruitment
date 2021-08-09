let way = function (number) {
  let map1 = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
  let map2 = ["1", "0", "X", "9", "8", "7", "6", "5", "4", "3", "2"];

  let temp1 = 0;
  for (let i = 0; i < 14; i++) {
    temp1 += map1[i] * parseInt(number[i]);
  }
  // console.log("temp1", temp1);
  let res = [];
  let target_index = 0;

  for (let i = 0; i < map2.length; i++) {
    if (number[number.length - 1] === map2[i]) {
      target_index = i;
    }
  }
  // console.log("target_index", target_index);
  let str_index = [];
  for (let i = 14; i < 17; i++) {
    if (isNaN(number[i])) {
      str_index.push(i);
    } else {
      temp1 += map1[i] * parseInt(number[i]);
    }
  }
  // console.log("str_index", str_index);
  // let number_temp = number.slice().split("");
  // console.log("num_temp前", number_temp.join(""));

  let dfs = function (str_index, path) {
    if (path.length > str_index.length) {
      return;
    }
    if (path.length === str_index.length) {
      let temp2 = 0;
      for (let i = 0; i < path.length; i++) {
        temp2 += map1[str_index[i]] * path[i];
      }
      // console.log("temp2", temp2);
      if ((temp1 + temp2) % 11 === target_index) {
        if (!res.includes(path.join(""))) {
          res.push(path.join(""));
          return;
        }
      }
    }
    for (let i = 0; i < 10; i++) {
      path.push(i);
      // console.log("path", path);
      dfs(str_index, path);
      path.pop();
    }
  };
  dfs(str_index, []);

  return res.length;
};
// console.log("ans", way("3408811948081556*3"));
console.log("ans", way("520123200501169**4"));
