function myAjax(url) {
  return new Promise(function (resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.open("get", url);
    xhr.send();
    xhr.onreadystatechange = function () {
      if (this.readyState == 4) {
        if (this.status == 200) {
          //成功的回调
          resolve(this.responseText);
        } else {
          //失败的回调
          reject(new Error());
        }
      }
    };
  });
}
