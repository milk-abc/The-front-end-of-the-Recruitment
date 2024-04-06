import tpl from "./info.tpl";
const oApp = document.querySelector("#app");
const info = {
  name: "小叶",
  age: 34,
  career: "web开发",
  hobby: "打游戏",
};
oApp.innerHTML = tpl(info);
