let arr = [2, 3, 4];
let target = 6;
let cnt = 0;
let flag;
for (let i = 0; i < arr.length - 1; i++) {
  for (let len = 2; len <= arr.length - i; len++) {
    let j = i + len - 1;
    flag = true;
    for (let k = i; k <= j - 1; k++) {
      for (let l = k + 1; l <= j; l++) {
        if ((arr[k] ^ arr[l]) === target) {
          flag = false;
          break;
        }
      }
    }
    if (flag) {
      cnt++;
    } else {
      break;
    }
  }
}
console.log(cnt);
