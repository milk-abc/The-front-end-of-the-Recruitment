import { ELEMENT_TEXT } from "./constants";
/**
 * 创建元素(虚拟DOM)的方法
 * @param {*} type 元素的类型 div span p
 * @param {*} config 配置对象 属性 key ref
 * @param  {...any} children 放着所有的儿子，这里会做成一个数组
 * @returns
 */
function createElement(type, config, ...children) {
  delete config.__self;
  delete config.__source;
  return {
    type,
    props: {
      ...config,
      children: children.map((child) => {
        //做了一个兼容处理，如果是React元素的话返回自己，如果是文本类型、字符串，返回元素对象
        return typeof child === "object"
          ? child
          : {
              type: ELEMENT_TEXT,
              props: { text: child, children: [] },
            };
      }),
    },
  };
}

const React = {
  createElement,
};
export default React;
