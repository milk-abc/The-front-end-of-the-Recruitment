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

middleware是Redux里面很重要的一个概念，Redux的生态主要靠API接入，比如我们想写一个logger的中间件可以这样写：

```
// logger是一个中间件，注意返回值嵌了好几层函数
// 我们后面来看看为什么这么设计
function logger(store) {
  return function(next) {
    return function(action) {
      console.group(action.type);
      console.info('dispatching', action);
      let result = next(action);
      console.log('next state', store.getState());
      console.groupEnd();
      return result
    }
  }
}

// 在createStore的时候将applyMiddleware作为第二个参数传进去
const store = createStore(
  reducer,
  applyMiddleware(logger)
)
```

可以看到上述代码为了支持中间件，createStore支持了第二个参数，这个参数官方称为enhancer，顾名思义它是一个增强器，用来增强store的能力，官方对于enhancer的定义如下：

```
type StoreEnhancer=(next:StoreCreater)=>StoreCreater
```

上面的结构的意思是说enhancer作为一个函数，他接受createStore函数作为参数，同时返回的也必须是一个增强版的createStore函数。注意他的返回值也是一个createStore函数，也就是我们把他的返回值拿出来继续执行应该得到跟之前的createStore一样的返回结构，也就是说我们之前的createStore返回啥结构，他也必须返回该结构，也就是

```
{
    subscribe,
    dispatch,
    getState
}
```

##### applyMiddleware返回值是一个enhancer

前面我们已经有了enhancer的基本结构，applyMiddleware是作为第二个参数传给createStore的，也就是他的返回值是一个enhancer：

```
function applyMiddleware(middleware) {
  // applyMiddleware的返回值应该是一个enhancer
  // 按照我们前面说的enhancer的参数是createStore
  function enhancer(createStore) {
    // enhancer应该返回一个新的createStore
    function newCreateStore(reducer) {
      // 我们先写个空的newCreateStore，直接返回createStore的结果
      const store = createStore(reducer);
      return store
    }

    return newCreateStore;
  }

  return enhancer;
}
```

##### 实现applyMiddleware

上面我们已经有了applyMiddleware的基本结构了，但它会传入一个middleware，返回一个enhancer。需要实现它我们首先需要知道一个中间件有什么功能：

```
function logger(store) {
  return function(next) {
    return function(action) {
      console.group(action.type);
      console.info('dispatching', action);
      let result = next(action);
      console.log('next state', store.getState());
      console.groupEnd();
      return result
    }
  }
}
```

可以改写为

```
function logger(store) {
  function dispatchCreator(dispatch) {
    function newDispatch(action) {
      //调用前加上自己的逻辑
      console.group(action.type);
      console.info("dispatching", action);
      let result = dispatch(action);
      //调用后加上自己的逻辑
      console.log("next state", store.getState());
      console.groupEnd();
      return result;
    }
    return newDispatch;
  }
  return dispatchCreator;
}
```

1.一个中间件接收store作为参数，会返回一个函数

2.返回的这个函数接收老的dispatch函数作为参数，会返回一个新的函数

3.返回的新函数就是新的dispatch函数，这个函数里面可以拿到外面两层传进来的store和老dispatch函数

所以中间件就是加强dispacth的功能，用新的dispatch替换老的dispatch，装饰器模式。前面的enhance也是一个装饰器模式，传入一个createStore，在createStore执行前后加上一些代码，最后又返回一个增强版的createStore。

遵循这个思路，applymiddleware可以实现为：

```
/**applyMiddleware返回一个enhancer，enhancer接收一个createStore,
 *返回一个新的createStore，createStore接收reducer，返回store，
 *store为一个对象，包括subscribe,dispatch,getState等
 **/
function applyMiddleware(middleware) {
  // applyMiddleware的返回值应该是一个enhancer
  function enhancer(createStore) {
    // 按照我们前面说的enhancer的参数是createStore
    // enhancer应该返回一个新的createStore
    function newCreateStore(reducer) {
      // 我们先写个空的newCreateStore，直接返回createStore的结果
      const store = createStore(reducer);
      // 将middleware拿过来执行下，传入store
      // 得到第一层函数
      const dispatchCreator = middleware(store);
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
```

支持多个middleware

我们的applymiddleware还差一个功能，就是支持多个middleware，比如像这样：

```
applyMiddleware(
	thunk,
	logger
)
```

只要我们返回的newDispatch里面依次的将传入的middleware拿出来执行就行，多个函数的串行执行可以使用辅助函数compose，这个函数定义如下，只是需要注意的是我们这里的compose不能把方法拿来执行就完了，应该返回一个包裹了所有方法的方法。

```
function compose(...funcs){
	return funcs.reduce((a,b)=>(...args)=>a(b(...args)))
}
```

这个compose可能比较让人困惑，比如有三个函数，是我们前面接收dispatch返回新dispatch的方法：

```
const fun1=dispatch=>newDispatch1;
const fun2=dispatch=>newDispacth2;
const fun3=dispatch=>newDispacth3;
```

当我们使用了compose(fun1,fun2,fun3)后执行时什么样的呢？

```
第一次执行的是
(func1, func2) => (...args) => func1(fun2(...args))
这次执行完的返回值是下面这个：
const temp = (...args) => func1(fun2(...args))
我们下次再循环的时候是
(temp, func3) => (...args) => temp(func3(...args));
// 这个返回值是下面这个，也就是最终的返回值，其实就是从func3开始从右往左执行完了所有函数
// 前面的返回值会作为后面参数
(...args) => temp(func3(...args));
其实就是fun1(fun2(fun3(...args)))

(newDispatch3) => func1(fun2(newDispatch3))

// 上面这个里面用newDispatch3执行fun2(newDispatch3)会得到newDispatch2
// 然后func1(newDispatch2)会得到newDispatch1
// 注意这时候的newDispatch1其实已经包含了newDispatch3
和newDispatch2的逻辑了，将它拿出来执行这三个方法就都执行了
```

现在我们也可以知道他的中间件为什么要包裹几层函数了：

> 第一层：目的是传入`store`参数
>
> 第二层：第二层的结构是`dispatch => newDispatch`，多个中间件的这层函数可以`compose`起来，形成一个大的`dispatch => newDispatch`
>
> 第三层：这层就是最终的返回值了，其实就是`newDispatch`，是增强过的`dispatch`，是中间件的真正逻辑所在。
>
> ```
> function compose(...funcs) {
>   return funcs.reduce(
>     (a, b) =>
>       (...args) =>
>         a(b(...args))
>   );
> }
> function createStore(reducer, enhancer) {
>   //先处理enhancer
>   //如果enhancer存在并且是函数
>   //我们将createStore作为参数传给他
>   //他应该返回一个新的createStore给我
>   //我再拿这个新的createStore执行，应该得到一个store
>   //直接返回这个Store就行
>   if (enhancer && typeof enhancer === "function") {
>     return enhancer(createStore)(reducer);
>   }
>   let state;
>   let listeners = [];
>   function subscribe(callback) {
>     listeners.push(callback);
>   }
>   function dispatch(action) {
>     state = reducer(state, action);
>     listeners.forEach((listener) => listener());
>   }
>   function getState() {
>     return state;
>   }
>   const store = {
>     subscribe,
>     dispatch,
>     getState,
>   };
>   return store;
> }
> /**applyMiddleware返回一个enhancer，enhancer接收一个createStore,
>  *返回一个新的createStore，createStore接收reducer，返回store，
>  *store为一个对象，包括subscribe,dispatch,getState等
>  **/
> function applyMiddleware(...middlewares) {
>   // applyMiddleware的返回值应该是一个enhancer
>   function enhancer(createStore) {
>     // 按照我们前面说的enhancer的参数是createStore
>     // enhancer应该返回一个新的createStore
>     function newCreateStore(reducer) {
>       // 我们先写个空的newCreateStore，直接返回createStore的结果
>       const store = createStore(reducer);
>       // 将middleware拿过来执行下，传入store
>       // 得到第一层函数
>       //多个middleware，先解构出dispatch=>newDispatch的结构
>       const chain = middlewares.map((middleware) => middleware(store));
>       // const dispatchCreator = middleware(store);
>       const dispatchCreator = compose(...chain);
>       // 解构出原始的dispatch
>       const { dispatch } = store;
>       // 将原始的dispatch函数传给func执行
>       // 得到增强版的dispatch
>       const newDispatch = dispatchCreator(dispatch);
>       // 返回的时候用增强版的newDispatch替换原始的dispatch
>       return { ...store, dispatch: newDispatch };
>     }
>     return newCreateStore;
>   }
>   return enhancer;
> }
> function combineReducers(reducerMap) {
>   const reducerKeys = Object.keys(reducerMap);
>   const reducer = (state = {}, action) => {
>     const newState = {};
>     for (let i = 0; i < reducerKeys.length; i++) {
>       //reducerMap里面每个键的值都是一个reducer，我们把它拿出来运行下就可以得到对应键新的state值
>       //然后将所有reducer返回的state按照参数里面的key组装好
>       //最后再返回组装好的newState就行
>       const key = reducerKeys[i];
>       const currentReducer = reducerMap[key];
>       const prevState = state[key];
>       newState[key] = currentReducer(prevState, action);
>     }
>     return newState;
>   };
>   return reducer;
> }
> const initMilkState = {
>   milk: 0,
> };
> function milkReducer(state = initMilkState, action) {
>   switch (action.type) {
>     case "PUT_MILK":
>       return { ...state, milk: state.milk + action.count };
>     case "TAKE_MILK":
>       return { ...state, milk: state.milk - action.count };
>     default:
>       return state;
>   }
> }
> const initRiceState = {
>   rice: 0,
> };
> function riceReducer(state = initRiceState, action) {
>   switch (action.type) {
>     case "PUT_RICE":
>       return { ...state, rice: state.rice + action.count };
>     case "TAKE_RICE":
>       return { ...state, rice: state.rice - action.count };
>     default:
>       return state;
>   }
> }
> //使用combineReducers组合两个reducer
> const reducer = combineReducers({
>   milkState: milkReducer,
>   riceState: riceReducer,
> });
> // logger是一个中间件，注意返回值嵌了好几层函数
> // 我们后面来看看为什么这么设计
> function logger(store) {
>   return function (next) {
>     return function (action) {
>       console.group(action.type);
>       console.info("dispatching", action);
>       let result = next(action);
>       console.log("next state", store.getState());
>       console.groupEnd();
>       return result;
>     };
>   };
> }
> // 在createStore的时候将applyMiddleware作为第二个参数传进去得到一个enhancer
> const store = createStore(reducer, applyMiddleware(logger));
> //subscribe其实是订阅store的变化，一旦store发生了变化，传入的回调函数就会被调用
> //如果是结合页面更新，更新的操作就是在这里执行
> store.subscribe(() => console.log(store.getState()));
> //将action发出去要用dispatch
> store.dispatch({ type: "PUT_MILK", count: 1 });
> store.dispatch({ type: "PUT_MILK", count: 1 });
> store.dispatch({ type: "TAKE_MILK", count: 1 });
> 
> store.dispatch({ type: "PUT_RICE", count: 1 });
> store.dispatch({ type: "PUT_RICE", count: 1 });
> store.dispatch({ type: "TAKE_RICE", count: 1 });
> 
> ```
>
> 































https://www.bilibili.com/video/BV1zU4y1f74E/?spm_id_from=333.337.search-card.all.click&vd_source=d8dd13cb220fa6354c7b6f79b3a210ee

https://dennisgo.cn/Articles/React/Redux.html