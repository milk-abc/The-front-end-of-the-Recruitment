function compose(...funcs) {
  return funcs.reduce(
    (a, b) =>
      (...args) =>
        a(b(...args))
  );
}
function createStore(reducer, enhancer) {
  //先处理enhancer
  //如果enhancer存在并且是函数
  //我们将createStore作为参数传给他
  //他应该返回一个新的createStore给我
  //我再拿这个新的createStore执行，应该得到一个store
  //直接返回这个Store就行
  if (enhancer && typeof enhancer === "function") {
    return enhancer(createStore)(reducer);
  }
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
/**applyMiddleware返回一个enhancer，enhancer接收一个createStore,
 *返回一个新的createStore，createStore接收reducer，返回store，
 *store为一个对象，包括subscribe,dispatch,getState等
 **/
function applyMiddleware(...middlewares) {
  // applyMiddleware的返回值应该是一个enhancer
  function enhancer(createStore) {
    // 按照我们前面说的enhancer的参数是createStore
    // enhancer应该返回一个新的createStore
    function newCreateStore(reducer) {
      // 我们先写个空的newCreateStore，直接返回createStore的结果
      const store = createStore(reducer);
      // 将middleware拿过来执行下，传入store
      // 得到第一层函数
      //多个middleware，先解构出dispatch=>newDispatch的结构
      const chain = middlewares.map((middleware) => middleware(store));
      // const dispatchCreator = middleware(store);
      const dispatchCreator = compose(...chain);
      // 解构出原始的dispatch
      const { dispatch } = store;
      // 将原始的dispatch函数传给func执行
      // 得到增强版的dispatch
      const newDispatch = dispatchCreator(dispatch);
      // 返回的时候用增强版的newDispatch替换原始的dispatch
      return { ...store, dispatch: newDispatch };
    }
    return newCreateStore;
  }
  return enhancer;
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
// logger是一个中间件，注意返回值嵌了好几层函数
// 我们后面来看看为什么这么设计
function logger(store) {
  return function (next) {
    return function (action) {
      console.group(action.type);
      console.info("dispatching", action);
      let result = next(action);
      console.log("next state", store.getState());
      console.groupEnd();
      return result;
    };
  };
}
// 在createStore的时候将applyMiddleware作为第二个参数传进去得到一个enhancer
const store = createStore(reducer, applyMiddleware(logger));
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
