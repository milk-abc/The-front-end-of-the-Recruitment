import React, { lazy, Suspense, useState } from "react";
import smallImg from "./assets/imgs/5kb.png";
import bigImg from "./assets/imgs/22kb.png";
import Class from "./components/Class";
import "./app.less";
import { createContext, useContext } from "react";
const ThemeContext = createContext(null);

// prefetch
// const PreFetchDemo = lazy(() => import(
//   /* webpackChunkName: "PreFetchDemo" */
//   /*webpackPrefetch: true*/
//   '@/components/PreFetchDemo'
// ))
// // preload
// const PreloadDemo = lazy(() => import(
//   /* webpackChunkName: "PreloadDemo" */
//   /*webpackPreload: true*/
//   '@/components/PreloadDemo'
//  ))

function App() {
  const [timeStamp, setTimeStamp] = useState(0);
  let count = 0;
  // const debounce = (fn, time) => {
  //   /**
  //    * 多次触发只触发最后一次
  //    */
  //   let timer = null;
  //   return function (...args) {
  //     if (timer) {
  //       clearTimeout(timer);
  //     }
  //     timer = setTimeout(() => {
  //       fn(...args);
  //     }, time);
  //   };
  // };
  // const test = () => {
  //   console.log("input");
  // };
  // const debounceInput = debounce(test, 500);
  // document.getElementById("input").addEventListener("input", debounceInput);
  return (
    <>
      <div>{timeStamp}</div>
      <button
        onClick={() => {
          count++;
          setTimeStamp(Date.now());
        }}
      >
        +
      </button>
    </>
  );
}

export default App;
