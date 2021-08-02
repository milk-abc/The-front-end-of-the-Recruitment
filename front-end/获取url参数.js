function getUrlParam(sUrl, sKey) {
  if (!sKey) {
    let match;
    let res = {};
    const regexp = RegExp("[?&](.+?)=(.+?)", "g");
    while ((match = regexp.exec(sUrl)) !== null) {
      if (res.hasOwnProperty(RegExp.$1)) {
        if (!Array.isArray(res[RegExp.$1])) {
          res[RegExp.$1] = [res[RegExp.$1], RegExp.$2];
        } else {
          res[RegExp.$1].push(RegExp.$2);
        }
      } else {
        res[RegExp.$1] = RegExp.$2;
      }
    }
    return res;
  } else {
    const regexp = RegExp(`${sKey}=(.+?)`, "g");
    let match;
    let res = [];
    while ((match = regexp.exec(sUrl)) !== null) {
      res.push(RegExp.$1);
    }
    res = res.length === 0 ? "" : res.length === 1 ? res[0] : res;
    return res;
  }
}
let url = "http://www.nowcoder.com?key=1&key=2&key=3&test=4#hehe";
let ans = getUrlParam(url);
console.log(ans);
