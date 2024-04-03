import React from "react";
import ReactDOM from "react-dom/client";
//虚拟DOM
let element = (
  <div id="A1">
    <div id="B1">
      <div id="C1"></div>
      <div id="C2"></div>
    </div>
    <div id="B2"></div>
  </div>
);
console.log("element", element);
//如果节点多，层级特别深
//因为JS是单线程，而且GUI渲染和JS执行是互斥的，会阻塞渲染，且一旦卡死不可恢复
//新版本 React请求调度->浏览器事件处理 js执行 布局绘制 空闲事件->浏览器在空闲事件执行调度
function render(element, parentDOM) {
  //创建DOM元素
  let dom = document.createElement(element.type); //div
  //处理属性
  Object.keys(element.props)
    .filter((key) => key !== "children")
    .forEach((key) => {
      dom[key] = element.props[key];
    });
  if (Array.isArray(element.props.children)) {
    element.props.children.forEach((child) => {
      //把每个子虚拟DOM变成真实DOM元素插入父元素DOM里
      render(child, dom);
    });
  }
  parentDOM.appendChild(dom);
}
render(element, document.getElementById("root"));
