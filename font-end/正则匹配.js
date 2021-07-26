//将电话号码中间四位变成*
var isPhone = function (s) {
  let regx = /(\d{3})\d{4}(\d{4})/;
  return s.replace(regx, "$1****$2");
};
var s1 = "13000000000";
console.log(isPhone(s1));
//window.location.href(设置或获取整个URL为字符串)
//http://www.jianshu.com/search?q=123&page=1&type=note
//window.location.search(设置或获取href属性中跟在问号后面的部分)
//?q=123&page=1&type=note
//window.location.hash(设置或获取href属性中在井号“#”后面的分段)
//获取url参数
function getUrlParam(url) {
  let arr = {};
  url.replace(/\??(\w+)=(\w+)&?/g, function (match, matchKey, matchValue) {
    console.log("match", match);
    if (!arr[matchKey]) {
      arr[matchKey] = matchValue;
    } else {
      let temp = arr[matchKey];
      arr[matchKey] = [].concat(temp, matchValue);
    }
  });
  return arr;
}
let url = "http://www.jianshu.com/search?q=123&page=1&page=2&type=note";
console.log(getUrlParam(url));
//判断是否符合指定格式
let format = function (s) {
  let regx = /(\d{3}-){2}\d{4}/;
  return regx.test(s);
};

let s = "123-456-7899";
console.log(format(s));
//判断是否符合USD格式
let judgeUSD = function (s) {
  let regx = /^\$\d{1,3}?(,\d{3})*(\.\d{2})?/;
  return regx.test(s);
};
//判断是否符合url格式
let hd = "https://shopee.com:8080/xxx";
console.log(
  /http(s)?:\/\/[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+(:[0-9]{1,5})/.test(
    hd
  )
);
//判断是否符合电话号码格式
let tel = "020-9999999";
console.log(/010|020\-\d{7,8}/.test(tel));
