var maxProfit = function (prices) {
  let minValue = Infinity;
  let maxPriot = 0;
  for (let i = 1; i < prices.length; i++) {
    minValue = Math.min(minValue, prices[i - 1]);
    if (prices[i] > minValue) {
      maxPriot = Math.max(maxPriot, prices[i] - minValue);
    }
  }
  return maxPriot;
};
