// var longestPalindromeSubseq = function (s) {
//   let n = s.length;
//   let dp = new Array(n);
//   for (let i = 0; i < n; i++) {
//     dp[i] = new Array(n);
//     for (let j = 0; j < n; j++) {
//       if (i === j) {
//         dp[i][j] = 1;
//       } else {
//         dp[i][j] = 0;
//       }
//     }
//   }
//   for (let i = 1; i < n; i++) {
//     for (let j = i - 1; j >= 0; j--) {
//       if (s[i] === s[j]) {
//         dp[i][j] = dp[i - 1][j + 1] + 2;
//       } else {
//         dp[i][j] = Math.max(dp[i][j + 1], dp[i - 1][j]);
//       }
//     }
//   }
//   console.log(dp);
//   return dp[n - 1][0];
// };
let arr = [[1, 2]];
console.log(arr[-1][0]);
