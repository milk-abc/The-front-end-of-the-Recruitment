function createStore(reducer) {
  let state;
  let listeners = [];
  function subscribe(callback) {
    listeners.push(callback);
  }
  function dispatch(action) {
    state = reducer(state, action);
    listeners.forEach((listener) => listener());
  }
  function getState() {
    return state;
  }
  const store = {
    subscribe,
    dispatch,
    getState,
  };
  return store;
}
const initState = {
  milk: 0,
};
function reducer(state = initState, action) {
  switch (action.type) {
    case "PUT_MILK":
      return { ...state, milk: state.milk + action.count };
    case "TAKE_MILK":
      return { ...state, milk: state.milk - action.count };
    default:
      return state;
  }
}
let store = createStore(reducer);
//subscribe其实是订阅store的变化，一旦store发生了变化，传入的回调函数就会被调用
//如果是结合页面更新，更新的操作就是在这里执行
store.subscribe(() => console.log(store.getState()));
//将action发出去要用dispatch
store.dispatch({ type: "PUT_MILK", count: 1 });
store.dispatch({ type: "PUT_MILK", count: 1 });
store.dispatch({ type: "TAKE_MILK", count: 1 });
