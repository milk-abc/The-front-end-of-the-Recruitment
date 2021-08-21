let str1 = "12343455556789 123";
let str2 = "123 ";
let cnt = 0;
let recur = function (str1, str2) {
  if (str1.indexOf(str2) !== -1) {
    let temp = str1.indexOf(str2);
    let res = str1.slice(0, temp) + str1.slice(temp + str2.length);
    cnt++;
    return recur(res, str2);
  } else {
    return [str1, cnt].join(",");
  }
};
console.log(recur(str1, str2));
