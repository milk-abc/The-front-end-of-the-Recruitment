function getUrlParam(sUrl, sKey) {
  let s = sUrl.split("?")[1];
  let reg = RegExp("(.+?)=(.+?)&?", "g");
  while((match=re))
}
let url = "http://www.nowcoder.com?key=1&key=2&key=3&test=4#hehe";
let ans = getUrlParam(url);
console.log(ans);
