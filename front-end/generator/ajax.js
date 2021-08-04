function myAjax(url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.open("get", url);
  xhr.send();
  xhr.onreadystatechange = function () {
    if (this.readyState == 4) {
      if (this.status == 200) {
        //成功的回调
        callback(null, this.responseText);
      } else {
        //失败的回调
        callback(new Error(), null);
      }
    }
  };
}
