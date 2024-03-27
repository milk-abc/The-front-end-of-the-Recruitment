Redux本身是一个单纯的状态机，store存放了所有的状态，action是一个改变状态的通知，Reducer接收到通知就更改store中对应的状态。

源码实现方式就是一个发布订阅的模式。

![image-20240327195241896](C:\Users\liqian\AppData\Roaming\Typora\typora-user-images\image-20240327195241896.png)

##### 观察者模式

```
//Subject 小宝宝
class Subject {
  constructor(name) {
    this.name = name;
    this.state = "开心";
    this.observers = [];
  }
  //需要将观察者放到自个身上
  attach(ther) {
    this.observers.push(ther);
  }
  //更新观察者的状态
  setState(state) {
    this.state = state;
    //循环取出每个观察者
    this.observers.forEach((ther) => {
      //观察者观察小宝宝
      ther.update(this);
    });
  }
}
//观察者
class Observer {
  constructor(name) {
    this.name = name;
  }
  //观察小宝宝的状态
  update(Subject) {
    console.log(this.name + ":" + Subject.name + "当前状态是" + Subject.state);
  }
}
let baby = new Subject("小宝宝");
let father = new Observer("爸爸");
let mother = new Observer("妈妈");
baby.attach(father);
baby.attach(mother);
baby.setState("不开心");
```

发布订阅模式

```
//on 是订阅  emit 发布

//邮局
let e={
	//存订阅者
	_callback:[],
	//订阅
	on(callback){
		this._callback.push(callback);
	}
	//发布
	emit(value){
		this._callback.forEach(method=>{
			method(value);
		})
	}
}
//订阅
e.on(function(value){
	console.log("张三订阅："+value)
})
e.on(function(value){
	console.log("李四订阅："+value)
})
e.on(function(value){
	console.log("王五订阅："+value)
})
e.emit("人民日报")
```

createStore：这个API接受reducer方法作为参数，返回一个store，主要功能都在这个store上。

store上用到了：

store.subscribe：订阅state的变化，当state变化的时候执行回调，可以有多个subscribe，里面的回调会依次执行。

store.dispatch：发布action的方法，每次dispatch action都会执行reducer生成新的state，然后执行subscribe注册的回调。

```
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
};
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
};
let store = createStore(reducer);
//subscribe其实是订阅store的变化，一旦store发生了变化，传入的回调函数就会被调用
//如果是结合页面更新，更新的操作就是在这里执行
store.subscribe(() => console.log(store.getState()));
//将action发出去要用dispatch
store.dispatch({ type: "PUT_MILK", count: 1 });
store.dispatch({ type: "PUT_MILK", count: 1 });
store.dispatch({ type: "TAKE_MILK", count: 1 });
```

![image-20240327211638033](C:\Users\liqian\AppData\Roaming\Typora\typora-user-images\image-20240327211638033.png)

##### 手写combineReducers

combineReducers也是使用非常广泛的API，当我们应用越来越复杂，如果将所有逻辑都写在一个reducer里面，文件过大，所以Redux提供了combineReducers，可以让我们为不同的模块写自己的reducer，最终将他们组合起来。比如我们最开始那个牛奶仓库，由于我们的业务发展很好，我们又增加了一个放大米的仓库，我们可以为这两个仓库创建自己的reducer，然后将他们组合起来，使用方式如下：

```
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
```

##### 手写applyMiddleware

middleware是Redux里面很重要的一个概念，Redux的生态主要靠







































https://www.bilibili.com/video/BV1zU4y1f74E/?spm_id_from=333.337.search-card.all.click&vd_source=d8dd13cb220fa6354c7b6f79b3a210ee

https://dennisgo.cn/Articles/React/Redux.html