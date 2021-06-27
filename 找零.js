//目前市面上的纸币主要有1元，5元，10元，20元，50元、100元六种，
//如果要买一件商品x元，有多少种货币组成方式？
let test = function (n) {
  let money = [1, 5, 10, 20, 50, 100];
  let dp = new Array(n + 1).fill(0);
  dp[0] = 1;
  for (let i = 0; i < money.length; i++) {
    for (let j = money[i]; j <= n; j++) {
      dp[j] += dp[j - money[i]]
    }
  }
}