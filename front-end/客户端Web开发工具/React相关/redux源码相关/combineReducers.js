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
function combineReducers(reducerMap) {
  const reducerKeys = Object.keys(reducerMap);
  const reducer = (state = {}, action) => {
    const newState = {};
    for (let i = 0; i < reducerKeys.length; i++) {
      //reducerMap里面每个键的值都是一个reducer，我们把它拿出来运行下就可以得到对应键新的state值
      //然后将所有reducer返回的state按照参数里面的key组装好
      //最后再返回组装好的newState就行
      const key = reducerKeys[i];
      const currentReducer = reducerMap[key];
      const prevState = state[key];
      newState[key] = currentReducer(prevState, action);
    }
    return newState;
  };
  return reducer;
}
const initMilkState = {
  milk: 0,
};
function milkReducer(state = initMilkState, action) {
  switch (action.type) {
    case "PUT_MILK":
      return { ...state, milk: state.milk + action.count };
    case "TAKE_MILK":
      return { ...state, milk: state.milk - action.count };
    default:
      return state;
  }
}
const initRiceState = {
  rice: 0,
};
function riceReducer(state = initRiceState, action) {
  switch (action.type) {
    case "PUT_RICE":
      return { ...state, rice: state.rice + action.count };
    case "TAKE_RICE":
      return { ...state, rice: state.rice - action.count };
    default:
      return state;
  }
}
//使用combineReducers组合两个reducer
const reducer = combineReducers({
  milkState: milkReducer,
  riceState: riceReducer,
});
let store = createStore(reducer);
//subscribe其实是订阅store的变化，一旦store发生了变化，传入的回调函数就会被调用
//如果是结合页面更新，更新的操作就是在这里执行
store.subscribe(() => console.log(store.getState()));
//将action发出去要用dispatch
store.dispatch({ type: "PUT_MILK", count: 1 });
store.dispatch({ type: "PUT_MILK", count: 1 });
store.dispatch({ type: "TAKE_MILK", count: 1 });

store.dispatch({ type: "PUT_RICE", count: 1 });
store.dispatch({ type: "PUT_RICE", count: 1 });
store.dispatch({ type: "TAKE_RICE", count: 1 });
