import logo from "./logo.svg";
import "./App.css";
// import { Count } from "./components/use_state/01base.tsx";
// import { MyComponent } from "./components/classcomponent/01state.tsx";
import { Count2 } from "./components/hooks/useRef.tsx";
import { useEffect, useState } from "react";

function App() {
  // const [count, setCount] = useState(0);
  // console.log("render1");
  // useEffect(() => {
  //   console.log("effect");
  //   return () => {
  //     console.log("clear effect");
  //   };
  // });

  // 创建 Demo 类，相当于 class Demo {} 的写法
  // function Demo() {
  //   // 相当于箭头函数 不了解的同学请恶补一下吧
  //   var _this = this;
  //   this.handleClick = function () {
  //     console.log(_this);
  //   };
  // }
  // 创建 Demo 类，相当于 class Demo {} 的写法
  function createElement(dom, params) {
    console.log(2, this);
    var domObj = document.createElement(dom);
    domObj.onclick = params.onclick;
    domObj.innerHTML = "Hello";
    document.body.appendChild(domObj);
  }

  function Demo() {
    console.log(3, this);
  }
  Demo.prototype.handleClick = function () {
    console.log(this);
  };

  Demo.prototype.render = function () {
    console.log(1, this.handleClick);
    createElement("button", {
      onclick: this.handleClick,
    });
  };

  new Demo().render(); // 运行 render 方法

  // console.log("render2");
  // document.addEventListener("click", () => {
  //   console.log(1);
  // });
  return (
    <div>
      {/* <div>{count}</div>
      <button onClick={() => setCount(count + 1)}>ADD</button> */}
    </div>
  );
}

export default App;
