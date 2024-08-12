import React, { PureComponent } from "react";
import "./Class.less";
// 装饰器为，组件添加age属性
function addAge(Target: Function) {
  Target.prototype.age = 111;
}
// 使用装饰圈
@addAge
class Class extends PureComponent {
  age?: number;
  aaaaaaaaa?: number;
  type?: string;

  render() {
    const { type } = this.props;
    return (
      <div className={`B${type === "b" ? " C" : ""}`}>
        <div className="D">aaa</div>
      </div>
    );
  }
}
Class.prototype.aaaaaaaaa = 1111;
export default Class;
