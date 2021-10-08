let str = "aaaabbbcccty";
let clearWord = function (str) {
  let stack = [];
  for (let i = 0; i < str.length; i++) {
    while (
      i < str.length &&
      stack[stack.length - 1] === "a" &&
      str[i] === "c"
    ) {
      stack.pop();
      i++;
    }
    if (str[i] !== "b") {
      stack.push(str[i]);
    }
  }
};
