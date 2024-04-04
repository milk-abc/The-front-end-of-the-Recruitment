import { ELEMENT_TEXT } from "./constants";
import { scheduleRoot } from "./schedule";
import { Update, UpdateQueue } from "./updateQueue";
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
class Component {
  constructor(props) {
    this.props = props;
  }
  setState(payload) {
    //可能是对象，也可能是一个函数
    let update = new Update(payload);
    // this.updateQueue = new updateQueue();
    // this.updateQueue.enqueueUpdate(update);
    //updateQueue其实是放在此类组件对应的fiber节点的internalFiber上
    this.internalFiber.updateQueue.enqueueUpdate(update);
    scheduleRoot(); //从当前节点开始调度
  }
}
Component.prototype.isReactComponent = {}; //类组件

const React = {
  createElement,
  Component,
};
export default React;
