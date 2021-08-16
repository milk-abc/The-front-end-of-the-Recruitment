let sa = "baaba";
let sb = "bbbbbbb";
let C = 20;
let D = 30;
let n = sa.length;
let m = sb.length;
let res = 0;
for (let i = 0; i < m - n + 1; i++) {
  let cnt = 0;
  for (let j = i; j < n; j++) {
    if (sa[j] != sb[j]) {
      cnt++;
    }
  }
  res = Math.max(res, cnt);
}
let ans = res * D + (m - n) * C;
console.log(ans);
