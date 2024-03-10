import React, { Component } from "react";
import { Count } from "../hooks/useState";
export class MyComponent extends Component {
  constructor(props) {
    super(props);
    //初始化state
    this.state = {
      num: 0,
    };
  }
  componentDidMount(): void {}
  add = () => {
    this.setState({ num: this.state.num + 1 });
  };
  render() {
    const { num } = this.state;
    return (
      <div>
        <h1>num 的值是：{num}</h1>
        <button onClick={this.add}>+1</button>
      </div>
    );
  }
}
