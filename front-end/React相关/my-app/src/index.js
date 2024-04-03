import React from "./react";
import ReactDOM from "./react-dom";
let style = { border: "3px solid red", margin: "5px", padding: "0 5px" };
let element1 = (
  <div id="A1" style={style}>
    A1
    <div id="B1" style={style}>
      B1
      <div id="C1" style={style}>
        C1
      </div>
      <div id="C2" style={style}>
        C2
      </div>
    </div>
    <div id="B2" style={style}>
      B2
    </div>
  </div>
);
console.log("element", element1);
let container = document.getElementById("root");
ReactDOM.render(element1, container);
let render2 = document.getElementById("render2");
render2.addEventListener("click", () => {
  let element2 = (
    <div id="A1-new" style={style}>
      A1-new
      <div id="B1-new" style={style}>
        B1-new
        <div id="C1-new" style={style}>
          C1-new
        </div>
        <div id="C2-new" style={style}>
          C2-new
        </div>
      </div>
      <div id="B2-new" style={style}>
        B2-new
      </div>
      <div id="B3" style={style}>
        B3
      </div>
    </div>
  );
  ReactDOM.render(element2, render2);
});
let render3 = document.getElementById("render3");
render3.addEventListener("click", () => {
  let element2 = (
    <div id="A1-new2" style={style}>
      A1-new2
      <div id="B1-new2" style={style}>
        B1-new2
        <div id="C1-new2" style={style}>
          C1-new2
        </div>
        <div id="C2-new2" style={style}>
          C2-new2
        </div>
      </div>
      <div id="B2-new2" style={style}>
        B2-new2
      </div>
    </div>
  );
  ReactDOM.render(element2, render2);
});
