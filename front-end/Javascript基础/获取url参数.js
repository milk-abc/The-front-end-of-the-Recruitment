function getUrlParam(sUrl, sKey) {
  let reg = new RegExp("[?&](.+?)=(.+?)", "g");
  let res = sKey ? [] : {};
  while ((match = reg.exec(sUrl)) != null) {
    if (sKey) {
      if (RegExp.$1 === sKey) {
        res.push(RegExp.$2);
      }
    } else {
      if (!res.hasOwnProperty(RegExp.$1)) {
        res[RegExp.$1] = RegExp.$2;
      } else {
        res[RegExp.$1] = [...res[RegExp.$1], RegExp.$2];
      }
    }
  }
  res = Array.isArray(res)
    ? res.length === 0
      ? ""
      : res.length === 1
      ? res[0]
      : res
    : res;
  return res;
}
let url = "http://www.nowcoder.com?key=1&key=2&key=3&test1=4#hehe";
let ans = getUrlParam(url, "test1");
console.log(ans);
