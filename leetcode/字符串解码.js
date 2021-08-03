var decodeString = function (s) {
  let recur = function (s, i) {
    let res = "",
      digit = 0,
      temp = "";
    while (i < s.length) {
      console.log("i", i);
      if (!isNaN(s[i])) {
        digit = 10 * digit + parseInt(s[i]);
      } else if (s[i] === "[") {
        [i, temp] = recur(s, i + 1); //进入新的一层递归
        res += temp.repeat(digit);
        digit = 0;
      } else if (s[i] === "]") {
        //回到上一层递归
        return [i, res];
      } else {
        res = res + s[i];
      }
      i++;
    }
    return res;
  };
  return recur(s, 0);
};
let s = "3[a]2[bc]";
console.log(decodeString(s));
