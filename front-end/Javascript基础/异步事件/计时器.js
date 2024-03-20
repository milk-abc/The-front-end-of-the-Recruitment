//从start到end,每隔100秒输出其中的一个数字,包含start和end,每次增幅为1
//返回的对象中需要包含一个cancel方法,用于停止定时操作

//第一个数要立即输出
function count(start, end) {
  console.log(start);
  let timer = setInterval(() => {
    if (start < end) {
      console.log(++start);
    } else {
      clearInterval(timer);
    }
  }, 100);
  let cancel = function () {
    clearInterval(timer);
  };
  return { cancel };
}
let f = count(1, 5);
