let reverse = function (s) {
  s = s.split("");
  let n = s.length,
    mid = Math.floor(n / 2) - 1,
    temp;
  for (let i = 0; i <= mid; i++) {
    temp = s[n - i];
    s[n - i] = s[i];
    s[i] = temp;
  }
  return s.join("");
};
