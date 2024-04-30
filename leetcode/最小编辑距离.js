function minDistance(word1: string, word2: string): number {
  let dp = [];
  for (let i = 0; i <= word1.length; i++) {
    dp[i] = [];
    for (let j = 0; j <= word2.length; j++) {
      dp[i][j] = Infinity;
    }
  }
  for (let i = 0; i <= word1.length; i++) {
    dp[i][0] = i;
  }
  for (let j = 0; j <= word2.length; j++) {
    dp[0][j] = j;
  }
  for (let i = 1; i <= word1.length; i++) {
    for (let j = 1; j <= word2.length; j++) {
      if (word1[i - 1] === word2[j - 1]) {
        dp[i][j] = Math.min(
          dp[i - 1][j - 1],
          dp[i - 1][j] + 1,
          dp[i][j - 1] + 1
        );
      } else {
        dp[i][j] = Math.min(
          dp[i - 1][j - 1] + 1,
          dp[i - 1][j] + 1,
          dp[i][j - 1] + 1
        );
      }
    }
  }
  return dp[word1.length][word2.length];
}
