//https://juejin.cn/post/6844904158273765384
//相对于屏幕
function getMousePos(event) {
  var e = event || window.event;
  return { x: e.screenX, y: e.screenY };
}
//相对浏览器窗口
function getMousePos(event) {
  var e = event || window.event;
  return { x: e.clientX, y: e.clientY };
}
//相对文档
function getMousePos(event) {
  var e = event || window.event;
  var scrollX =
    document.documentElement.scrollLeft ||
    document.body.scrollLeft ||
    window.pageXOffset; //window.pageXOffset
  var scrollY =
    document.documentElement.scrollTop ||
    document.body.scrollTop ||
    window.pageYOffset;
  var x = e.pageX || e.clientX + scrollX;
  var y = e.pageY || e.clientY + scrollY;
  return { x, y };
}
