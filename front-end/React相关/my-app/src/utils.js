export function setProps(dom, oldProps, newProps) {
  for (let key in oldProps) {
    if (key !== "children") {
      if (newProps.hasOwnProperty(key)) {
        //老的有新的也有，更新为新的
        setProp(dom, key, newProps[key]);
      } else {
        //老的有新的没有删掉
        dom.removeAttribute(key);
      }
    }
  }
  for (let key in newProps) {
    if (key !== "children") {
      if (!oldProps.hasOwnProperty(key)) {
        //老的没有新的有就添加属性
        setProp(dom, key, newProps[key]);
      }
    }
  }
}
function setProp(dom, key, value) {
  if (/^on/.test(key)) {
    //onClick 这里没用合成事件
    dom[key.toLowerCase()] = value;
  } else if (key === "style") {
    if (value) {
      for (let styleName in value) {
        dom.style[styleName] = value[styleName];
      }
    }
  } else {
    dom.setAttribute(key, value);
  }
}
