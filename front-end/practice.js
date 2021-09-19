let num = 17;
let maxRank = 0;
for (let i = 0; i < 32; i++) {
  let temp = 1 << i;
  let up = 0,
    down = 0;
  if (temp > num) {
    up = temp - num;
    down = (num - 1) << (i - 1);
    maxRank = up < down ? i : i - 1;
    break;
  } else if (temp == num) {
    console.log(1);
    break;
  }
}
let res = 0;
while (num > 0) {
  let mod = 1 << maxRank;
  if (num / mod == 1) {
    res++;
  }
  num %= mod;
  if (num == 0) {
    break;
  }
  res += num;
}
console.log(res);
