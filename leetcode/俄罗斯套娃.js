var maxEnvelopes = function (envelopes) {
  envelopes.sort(function (x, y) {
    if (x[0] === y[0]) return y[1] - x[1];
    return x[0] - y[0];
  });
  let n = envelopes.length;
  let dp = new Array(n).fill(1);
  // console.log(envelopes)
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < i; j++) {
      if (envelopes[j][1] < envelopes[i][1]) {
        dp[i] = Math.max(dp[i], dp[j] + 1);
      }
    }
  }
  // console.log(dp)
  return Math.max(...dp);
};
