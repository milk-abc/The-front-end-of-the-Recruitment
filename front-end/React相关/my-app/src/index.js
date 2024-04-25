import { useReducer, useState, useMemo, useCallback } from "./schedule";
import React from "./react";
import ReactDOM from "./react-dom";
// let style = { border: "3px solid red", margin: "5px", padding: "0 5px" };
// let element1 = (
//   <div id="A1" style={style}>
//     A1
//     <div id="B1" style={style}>
//       B1
//       <div id="C1" style={style}>
//         C1
//       </div>
//       <div id="C2" style={style}>
//         C2
//       </div>
//     </div>
//     <div id="B2" style={style}>
//       B2
//     </div>
//   </div>
// );
// console.log("element", element1);
// let container = document.getElementById("root");
// ReactDOM.render(element1, container);
// let render2 = document.getElementById("render2");
// render2.addEventListener("click", () => {
//   let element2 = (
//     <div id="A1-new" style={style}>
//       A1-new
//       <div id="B1-new" style={style}>
//         B1-new
//         <div id="C1-new" style={style}>
//           C1-new
//         </div>
//         <div id="C2-new" style={style}>
//           C2-new
//         </div>
//       </div>
//       <div id="B2-new" style={style}>
//         B2-new
//       </div>
//       <div id="B3" style={style}>
//         B3
//       </div>
//     </div>
//   );
//   ReactDOM.render(element2, render2);
// });
// let render3 = document.getElementById("render3");
// render3.addEventListener("click", () => {
//   let element2 = (
//     <div id="A1-new2" style={style}>
//       A1-new2
//       <div id="B1-new2" style={style}>
//         B1-new2
//         <div id="C1-new2" style={style}>
//           C1-new2
//         </div>
//         <div id="C2-new2" style={style}>
//           C2-new2
//         </div>
//       </div>
//       <div id="B2-new2" style={style}>
//         B2-new2
//       </div>
//     </div>
//   );
//   ReactDOM.render(element2, render2);
// });
//-------------------------------------------------------------------------
// import React, { memo } from "react";
// import ReactDOM from "react-dom";
// class ClassCounter extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = { number: 0 };
//   }
//   onClick = () => {
//     this.setState((state) => ({ number: state.number + 1 }));
//   };
//   render() {
//     return (
//       <div id="counter">
//         <span>{this.state.number}</span>
//         <button onClick={this.onClick}>加1</button>
//       </div>
//     );
//   }
// }
// ReactDOM.render(
//   <ClassCounter name="计数器" />,
//   document.getElementById("root")
// );
function reducer(state, action) {
  switch (action.type) {
    case "ADD":
      return { count: state.count + 1 };
    default:
      return state;
  }
}
/**
 * 每个函数组件都有自己的fiber，每个fiber都有自己的hook，每个hook都有自己的state和updateQueue
 * @returns
 */
function FunctionCounter() {
  const [countState, dispatch] = useReducer(reducer, { count: 0 });
  const [numberState, setNumberState] = useState({ number: 0 });
  return (
    <div>
      <div id="counter1">
        <span>{numberState.number}</span>
        <button
          onClick={() => {
            setNumberState({ number: numberState.number + 1 });
            setNumberState({ number: numberState.number + 1 });
            setNumberState({ number: numberState.number + 1 });
          }}
        >
          加1
        </button>
      </div>
      {/* <div id="counter2">
        <span>{countState.count}</span>
        <button onClick={() => dispatch({ type: "ADD" })}>加1</button>
      </div> */}
    </div>
  );
}
// function FunctionCounter() {
//   console.log("render");
//   return <div>1234</div>;
// }
ReactDOM.render(
  <FunctionCounter name="计数器" />,
  document.getElementById("root")
);
//-------------------------------------------------------------------
// let lastStates = [];
// let index = 0;
// function useState(initialValue) {
//   lastStates[index] = lastStates[index] || initialValue;
//   const currentIndex = index;
//   function setState(newState) {
//     lastStates[currentIndex] = newState;
//     render();
//   }
//   return [lastStates[index++], setState];
// }
// let lastCallback;
// let lastCallbackDependencies;
// function useCallback(callback, dependencies) {
//   if (lastCallbackDependencies) {
//     let changed = !dependencies.every((item, index) => {
//       return item === lastCallbackDependencies[index];
//     });
//     if (changed) {
//       lastCallback = callback;
//       lastCallbackDependencies = dependencies;
//     }
//   } else {
//     //没有渲染过
//     lastCallback = callback;
//     lastCallbackDependencies = dependencies;
//   }
//   return lastCallback;
// }
// let lastMemo;
// let lastMemoDependencies;
// function useMemo(callback, dependencies) {
//   if (lastMemoDependencies) {
//     let changed = !dependencies.every((item, index) => {
//       return item === lastMemoDependencies[index];
//     });
//     if (changed) {
//       lastMemo = callback();
//       lastMemoDependencies = dependencies;
//     }
//   } else {
//     //没有渲染过
//     lastMemo = callback();
//     lastMemoDependencies = dependencies;
//   }
//   return lastMemo;
// }
// function Child({ data, addClick }) {
//   console.log("child render");
//   return <button onClick={addClick}>{data.number}</button>;
// }
// //把函数组件传给memo方法，返回一个新组件，改造后每次渲染前会判断一下属性变了没有，如果属性不变不会渲染，变了才渲染
// Child = memo(Child);
// function App() {
//   let [number, setNumber] = useState(0);
//   let [name, setName] = useState("zhufeng");
//   let addClick = useCallback(() => setNumber(number + 1), [number]); //每次都是新的
//   let data = useMemo(
//     () => ({
//       number,
//     }),
//     [number]
//   ); //每次都是新的
//   return (
//     <div>
//       <input
//         value={name}
//         onChange={(event) => setName(event.target.value)}
//       ></input>
//       <Child data={data} addClick={addClick}></Child>
//     </div>
//   );
// }
// function render() {
//   index = 0;
//   ReactDOM.render(<App />, document.getElementById("root"));
// }
// render();
//-----------------------------------------------------------------------------------------
// import React, { memo } from "react";
// import ReactDOM from "react-dom";
//--------------------------------------------------------------------------------------------
//老状态，动作
// function reducer(state, action) {
//   switch (action.type) {
//     case "add":
//       return state + 1;

//     default:
//       return state;
//   }
// }
// let lastState;
// function useReducer(reducer, initialValue) {
//   lastState = lastState || initialValue;
//   function dispatch(action) {
//     lastState = reducer(lastState, action);
//     render();
//   }
//   return [lastState, dispatch];
// }
// //useReducer
// function Counter() {
//   let [state, dispatch] = useReducer(reducer, 0);
//   return (
//     <div>
//       <p>{state}</p>
//       <button onClick={() => dispatch({ type: "add" })}>+</button>
//     </div>
//   );
// }
// function render() {
//   ReactDOM.render(<Counter />, document.getElementById("root"));
// }
// render();
//---------------------------------------------------------------------------------------------
// import React, { memo, useState } from "react";
// import ReactDOM from "react-dom";
// let AppContext = React.createContext();
// //AppContext Provider Consumer
// function useContext(context) {
//   return context._currentValue;
// }
// function Counter() {
//   let { state, setState } = useContext(AppContext);
//   return (
//     <div>
//       <p>{state.number}</p>
//       <button onClick={() => setState({ number: state.number + 1 })}>+</button>
//     </div>
//   );
// }
// function App() {
//   let [state, setState] = useState({ number: 0 });
//   return (
//     <AppContext.Provider value={{ state, setState }}>
//       <div>
//         <div>
//           <Counter></Counter>
//         </div>
//       </div>
//     </AppContext.Provider>
//   );
// }
// function render() {
//   ReactDOM.render(<App />, document.getElementById("root"));
// }
// render();
//--------------------------------------------------------------------------------------------
// import React, { useState } from "react";
// import ReactDOM from "react-dom";
// //useEffect是一个钩子，它里面的函数会在组件渲染完成后执行
// let lastDependencies;
// function useEffect(callback, dependencies) {
//   if (lastDependencies) {
//     let changed = !dependencies.every(
//       (item, index) => item == lastDependencies[index]
//     );
//     if (changed) {
//       callback();
//       lastDependencies = dependencies;
//     }
//   } else {
//     callback();
//     lastDependencies = dependencies;
//   }
// }
// function Counter() {
//   let [name, setName] = useState("zhufeng");
//   let [number, setNumber] = useState(0);
//   //依赖不传，每次更新都会执行，如果传一个空组件，只会第一次执行
//   useEffect(() => {
//     console.log(number);
//   }, [number]);
//   return (
//     <div>
//       <p>{name}</p>
//       <p>{number}</p>
//       <button onClick={() => setName(Date.now() + "")}>修改名称</button>
//       <button onClick={() => setNumber(number + 1)}>+</button>
//     </div>
//   );
// }
// function render() {
//   ReactDOM.render(<Counter />, document.getElementById("root"));
// }
// render();
//-------------------------------------------------------------------------------------------
// import React from "react";
// import ReactDOM from "react-dom";
// let lastRef;
// function useRef(initialRef) {
//   lastRef = lastRef || initialRef;
//   return {
//     current: lastRef,
//   };
// }
// let lastDependencies;
// function useEffect(callback, dependencies) {
//   //执行栈->微任务->渲染->宏任务
//   //为了实现渲染后执行回调，需要将回调放在宏任务中
//   if (lastDependencies) {
//     let changed = !dependencies.every(
//       (item, index) => item == lastDependencies[index]
//     );
//     if (changed) {
//       setTimeout(callback);
//       lastDependencies = dependencies;
//     }
//   } else {
//     setTimeout(callback);
//     lastDependencies = dependencies;
//   }
// }
// let lastLayoutDependencies;
// function useLayoutEffect(callback, dependencies) {
//   //执行栈->微任务->渲染->宏任务
//   //为了实现渲染前执行回调，需要将回调放在微任务中
//   if (lastLayoutDependencies) {
//     let changed = !dependencies.every(
//       (item, index) => item == lastLayoutDependencies[index]
//     );
//     if (changed) {
//       // Promise.resolve().then(callback);
//       queueMicrotask(callback);
//       lastLayoutDependencies = dependencies;
//     }
//   } else {
//     // Promise.resolve().then(callback);
//     queueMicrotask(callback);
//     lastLayoutDependencies = dependencies;
//   }
// }
// function Animation() {
//   //ref是一个对象，它有current属性，ref.current指向这个div的真实DOM元素
//   const ref = useRef();
//   //useEffect是在浏览器渲染完成后执行
//   useEffect(() => {
//     ref.current.style.transform = `translate(500px)`;
//     ref.current.style.transition = `all 500ms`;
//   });
//   //useLayoutEffect是在浏览器渲染前执行
//   // useLayoutEffect(() => {
//   //   ref.current.style.transform = `translate(500px)`;
//   //   ref.current.style.transition = `all 500ms`;
//   // });
//   let style = {
//     width: "100px",
//     height: "100px",
//     background: "red",
//   };
//   return (
//     <div style={style} ref={ref}>
//       内容
//     </div>
//   );
// }
// function render() {
//   ReactDOM.render(<Animation />, document.getElementById("root"));
// }
// render();
