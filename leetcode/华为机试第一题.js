//输入倒入茶水的升数,输入行数,输出指定行每个杯子中的水
//2 1 0.5
function water(total, order) {
  let arr = new Array(order + 1);
  for (let i = 1; i <= order; i++) {
    arr[i] = new Array(order + 1).fill(0);
  }
  arr[1][1] = total;
  for (let i = 1; i < order; i++) {
    for (let j = 1; j <= i; j++) {
      if (arr[i][j] > 1) {
        let redus = (arr[i][j] - 1) / 2;
        arr[i + 1][j] += redus;
        arr[i + 1][j + 1] += redus;
        arr[i][j] = 1;
      }
    }
  }
  return arr[order].slice(1, order + 1);
}
console.log(water(5, 3));
