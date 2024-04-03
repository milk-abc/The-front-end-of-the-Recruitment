let flat = function (arr) {
  let res = []; //初始化每次递归列表
  arr.forEach((item) => {
    //遍历数组每一项
    if (Object.prototype.toString.call(item) == "[object Array]") {
      //判断数组每一项是数组
      res = res.concat(flat(item)); //需要继续遍历数组这一项，使用递归遍历
    } else {
      res.push(item); //数组的每一项不是数组的时候加入到res中
    }
  });
  return res; //每次递归结束返回，相当于一个暂存数组
};
