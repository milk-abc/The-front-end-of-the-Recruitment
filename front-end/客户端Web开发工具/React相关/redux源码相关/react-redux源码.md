##### 前言

单纯的Redux只是一个状态机，是没有UI呈现的，所以一般我们使用的时候都会配合一个UI库，比如在React中使用Redux就会用到React-redux这个库。这个库的作用是将Redux的状态机和React的UI呈现绑定在一起，当你dispatch action改变state的时候，会自动更新页面。

比起redux，react-redux额外提供了Provider，connect。

要实现这个功能，首先我们要在项目里面添加`react-redux`库，然后用它提供的`Provider`包裹整个`React`App的根组件：

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import store from './store'
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
```

后面如果要用`Redux`里面的数据的话，只需要用`connect`API将对应的`state`和方法连接到组件里面就行了，比如我们的计数器组件需要`count`这个状态和加一，减一，重置这三个`action`，我们用`connect`将它连接进去就是这样：

```javascript
import React from 'react';
import { connect } from 'react-redux';
import { increment, decrement, reset } from './actions';

function Counter(props) {
  const { 
    count,
    incrementHandler,
    decrementHandler,
    resetHandler
   } = props;

  return (
    <>
      <h3>Count: {count}</h3>
      <button onClick={incrementHandler}>计数+1</button>
      <button onClick={decrementHandler}>计数-1</button>
      <button onClick={resetHandler}>重置</button>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    count: state.count
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    incrementHandler: () => dispatch(increment()),
    decrementHandler: () => dispatch(decrement()),
    resetHandler: () => dispatch(reset()),
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Counter)
```

上面代码可以看到connect是一个高阶函数，它的第一阶会接收mapstatetoprops和mapdispatchtoprops两个参数，这两个参数都是函数。mapStateToprops可以自定义需要将哪些state连接到当前组件，这些自定义的state可以在组件里面通过props拿到。mapDispatchToProps方法会传入dispatch函数，我们可以自定义一些方法，这些方法可以调用dispatch去dispatch action，从而触发state的更新，这些自定义的方法也可以通过组件的props拿到。mapdispatchtoprops方法会传入dispatch函数，我们可以自定义一些方法，这些方法可以调用dispatch去dispatch action，从而触发state的更新，这些自定义的方法也可以通过组件的props拿到，connect的第二阶接收的参数是一个组件，我们可以猜测这个函数的作用就是将前面自定义的state和方法注入到这个组件里面，同时要返回一个新的组件给外部调用，所以connect其实也是一个高阶组件。

到这里我们汇总来看下我们都用到了哪些API，这些API就是我们后面要手写的目标：

Provider：用来包裹根组件的组件，作用是注入Redux的store

createStore：Redux用来创建store的核心方法，返回一个对象，包括subscribe，dispatch，getState

connect：用来将state和dispatch注入给需要的组件，返回一个新组件，他其实是个高阶组件

所以React-Redux核心其实就两个API，而且两个都是组件，作用还很类似，都是往组件里面注入参数，Provider是往根组件注入store，connect是往需要的组件注入state和dispatch。

在手写之前我们先来思考下，加入没有这两个API，只用Redux可以吗？当然是可以的！其实我们用Redux的目的不就是希望用它将整个应用的状态都保存下来，每次操作只用dispatch action去更新状态，然后ui就自动更新了吗？那我从根组件开始，每一级都把store传下去不就行了吗？每个子组件需要读取状态的时候，直接用store.getState()就行了，更新状态的时候就store.dispatch，这样其实也能达到目的。但是如果这样写，子组件如果嵌套层数很多，每一集都需要手动传入store，比较麻烦，所以最好可以将store全局的注入组件树，而不需要一层层作为props传递，这个东西就是Provider！而且如果每个组件都独立依赖Redux会破坏React的数据流向。

##### React的Context API

React其实提供了一个全局注入变量的API，这就是context api。假如我现在有一个需求是要给我们所有组件传一个文字颜色的配置，我们的颜色配置在最顶级的组件上，当这个颜色改变的时候，下面所有组件都要自动应用这个颜色。那我们可以使用context api注入这个配置：

##### 先使用React.createContext创建一个context

```
// 我们使用一个单独的文件来调用createContext
// 因为这个返回值会被Provider和Consumer在不同的地方引用
import React from 'react';
const TestContext = React.createContext();
export default TestContext;
```

##### 使用Context.Provider包裹根组件

创建好了context，如果我们要传递变量给某些组件，我们需要在他们的根组件上加上TestContext.Provider，然后将变量作为value参数传给TestContext.Provider：

```react
import TestContext from './TestContext'

const setting={
    color:'#d89151'
}

ReactDOM.render(
    <TestContext.Provider value={setting}>
    <App/>
    </TestContext.Provider>,
    document.getElementById('root')
)
```

##### 使用Context.Consumer接收参数

上面我们使用Context.Provider将参数传递出去了，这样被Context.Provider包裹的所有子组件都可以拿到这个变量，只是拿这个变量的时候需要使用Context.Consumer包裹，比如我们前面的Counter组件就可以拿到这个颜色了，只需要将它返回的JSX用Context.Consumer包裹一下就行：

```
//注意要引入同一个Context
import TestContext from './TestContext';
//返回的JSX用Context.Consumer包裹起来
//注意context.consumer里面是一个方法，这个方法就可以访问到context参数
//这里的context也就是前面Provider传进来的setting，我们可以拿到上面的color变量
return (
	<TestContext.Consumer>
		{
			context=>
			<>
				<h3 style={{color:context.color}}>Count:{count}</h3>
			</>
		}
	</TestContext.Consumer>
)
```

##### 使用useContext接收参数

除了上面的Context.Consumer可以用来接收context参数，新版React还有useContext这个hook可以接收context参数，使用起来更简单，比如上面代码可以这样写：

```react
const context = useContext(TestContext);
return (
    <>
    	<h3 style={{color:context.color}}>Count:{count}</h3>
    </>
)
```

所以我们完全可以用context.api来传递redux store，现在我们也可以猜测React-redux的Provider其实就是包装了Context.Provider，而传递的参数就是redux store，而React-Redux的connect HOC其实就是包装的Context.Consumer或者usetContext。我们可以按照这个思路来自己实现下React-redux。

##### 手写Provider

上面说了Provider用了context api，所以我们要先建一个context文件，导出需要用的context：

```react
// Context.js
import React from 'react';
const ReactReduxContext=React.createContext();
export default ReactReduxContext;
```

这个文件很简单，新建一个context再导出就行了。

然后将这个Context应用到我们的Provider组件里面：

```react
import React from 'react';
import ReactReduxContext from './Context';
function Provider(props){
    const {store,children}=props;
    //这是要传递的context
    const contextValue={store};
    //返回ReactReduxContext包裹的组件，传入contextValue
    //里面的内容就是直接返回children
    return (
        <ReactReduxContext.Provider value={contextValue}>
            {children}
        </ReactReduxContext.Provider>
    )
}
```

Provider的组件代码也不难，直接将传进来的store放到context上，然后直接渲染children就行。

##### 手写connect

connect主要是要将store注入到对应的组件里去

###### 基本功能

```react
// 第一层函数接收mapStateToProps和mapDispatchToProps
function connect(mapStateToProps, mapDispatchToProps) {
  //第二层函数是个高阶组件，里面获取context
  //然后执行mapstatetoprops和mapdispatchtoprops
  //再将这个结果组合用户的参数作为最终参数渲染wrappedcomponent
  //wrappedcomponent就是我们使用context包裹的自己的组件
  return function connectHOC(wrappedComponent) {
    function connectFunction(props) {
      //复制一份props到warpperprops
      const { ...wrapperProps } = props;
      //获取context的值
      const context = useContext(ReactReduxContext);
      const { store } = context; //解构出store
      const state = store.getState(); //拿到state
      // 执行mapStateToProps和mapDispatchToProps
      const stateProps = mapStateToProps(state);
      const dispatchProps = mapDispatchToProps(store.dispatch);
      //组装最终的props
      const actualChildProps = Object.assign(
        {},
        stateProps,
        dispatchProps,
        wrapperProps
      );
      return <wrappedComponent {...actualChildProps}></wrappedComponent>;
    }
    return connectFunction;
  };
}
```

##### 触发更新

用上面的Provider和connect替换官方的react-redux其实已经可以渲染出页面了，但是点击按钮还不会有反应，因为我们虽然通过disptach改变了store中的state，但是这种改变并没有触发我们组件的更新。之前Redux那篇文章讲过，可以用store.subscribe来监听state的变化并执行回调，我们这里需要注册的回调时检查我们最终给WrappedComponent的props有没有变化，如果有变化就重新渲染connectfunction，所以我们需要解决两个问题：

1.当我们state变化的时候检查最终给到connnectfunction的参数有没有变化

2.如果这个参数有变化，我们需要重新渲染connectfunction

##### 检查参数变化

要检查参数的变化，我们需要知道上次渲染的参数和本地渲染的参数，然后拿过来比一下就知道了。为了知道上次渲染的参数，我们可以直接在connectfunction里面使用useref将上次渲染的参数记录下来：

```
//记录上次渲染参数
const lastChildProps=useRef();
//首次渲染后【但阻止了浏览器绘制屏幕，在浏览器重新绘制屏幕之前触发】再执行回调
useLayoutEffect(()=>{
    //赋值后会立即重新渲染一次，再用新的值绘制屏幕，保证渲染后的值是新值
	lastChildProps.current=actualChildProps;
},[]);
//首先会执行渲染
render(){}
```

注意lastChildProps.current是在第一次渲染结束后绘制屏幕前赋值，而且需要使用useLayoutEffect来保证渲染后绘制屏幕前立即同步执行，拿新值绘制屏幕。

因为我们检测参数变化是需要重新计算actualChildProps，计算的逻辑其实都是一样的，

```react
function childPropsSelector(store, wrapperProps) {
  const state = store.getState();   // 拿到state

  // 执行mapStateToProps和mapDispatchToProps
  const stateProps = mapStateToProps(state);
  const dispatchProps = mapDispatchToProps(store.dispatch);

  return Object.assign({}, stateProps, dispatchProps, wrapperProps);
}
```

然后就是注册store的回调，在里面来检测参数是否变了，如果变了就强制更新当前组件，对比两个对象是否相等，React-Redux里面是采用的shalloEqual，也就是浅比较，也就是只对比一层，如果你mapStateToProps返回了好几层结构，比如这样：

```react
{
    stateA:{
        value:1
    }
}
```

你去改了stateA.value是不会触发重新渲染的，React-Redux这样设计我想是出于性能考虑，如果是深比较，比如递归去比较，比较浪费性能，而且如果有循环引用还可能造成死循环。采用浅比较就需要用户遵循这种范式，不要传入多层结构。

```react
/**
 *
 * Object.is将+0和-0当作不相等，而===把他们当作相等
 * Object.is把 Number.NaN和Number.NaN当作相等，而===把他们当作不相等
 * @param y
 * @returns
 */
function is(x, y) {
  if (x === y) {
    return x !== 0 || y !== 0 || 1 / x === 1 / y;
  } else {
    return x !== x && y !== y;
  }
}
function shallowEqual(objA, objB) {
  if (is(objA, objB)) return true;
  if (
    typeof objA !== "object" ||
    objA === null ||
    typeof objB !== "object" ||
    objB === null
  ) {
    return false;
  }
  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);
  if (keysA.length !== keysB.length) return false;
  for (let i = 0; i < keysA.length; i++) {
    if (
      !Object.prototype.hasOwnProperty.call(objB, keysA[i]) ||
      !is(objA[keysA[i]], objB[keysA[i]])
    ) {
      return false;
    }
  }
  return true;
}
```

在回调里面检测参数变化：

```react
//在subscribe中注册回调，dispatch中才能派发回调
store.subscribe(()=>{
    const newChildProps=childPropsSelector(store,wrapperProps);
    //如果参数变了，记录新的值到lastChildProps上
    //并且强制更新当前组件
    if(!shallowEqual(newChildProps,lastChildProps.current)){
        lastChildProps.current=newChildProps;
        //需要一个API来强制更新当前组件
        
    }
})
```

##### 强制更新

要强制更新当前组件的方法不止一个，如果你是用的Class组件，可以直接this.setState({})，老版的React-redux就是这么干的。但是新版React-redux用hook重写了，那我们可以用React提供的useReducer或者useState hook，React-Redux源码用了useReducer，为了跟他保持一致，这边也用useReducer：

```react
function storeStateUpdatesReducer(count) {
  return count + 1;
}

// ConnectFunction里面
function ConnectFunction(props) {
  // ... 前面省略n行代码 ... 

  // 使用useReducer触发强制更新
  const [
    ,
    forceComponentUpdateDispatch
  ] = useReducer(storeStateUpdatesReducer, 0);
  // 注册回调
  store.subscribe(() => {
    const newChildProps = childPropsSelector(store, wrapperProps);
    if(!shallowEqual(newChildProps, lastChildProps.current)) {
      lastChildProps.current = newChildProps;
      forceComponentUpdateDispatch();
    }
  });

  // ... 后面省略n行代码 ...
}
```

##### 保证组件更新顺序

前面我们的Counter组件使用connect连接了redux store，假如他下面还有个子组件也连接到了store，我们就要考虑他们的回调的 执行顺序的问题了。我们知道React是单向数据流的，参数都是由父组件传给子组件的，现在引入了Redux，即使父组件和子组件都引用了同一个变量count，但是子组件完全可以不从父组件拿这个参数，而是直接从Redux拿，这样就打破了react本来的数据流向。在父->子这种单向数据流中，如果他们的一个公用变量变化了，肯定是父组件先更新，然后参数传给子组件再更新，但是在redux里，数据变成了Redux->父，Redux->子，父与子完全可以根据Redux的数据进行独立更新，而不能完全保证父级先更新，子级再更新的流程。所以React-redux花了不少功夫来手动保证这个更新顺序，React-redux保证这个更新顺序的方案是在redux store外，再单独创建一个监听者类Subscription：

1.Subscription负责处理所有的state变化的回调

2.如果当前连接redux的组件是第一个连接redux的组件，也就是说他是连接redux的根组件，他的state回调直接注册到redux store；同时新建一个Subscription实例Subscription通过context传递给子级。

3.如果当前连接redux的组件不是连接redux的根组件，也就是说他上面有组件已经注册到redux store了，那么他可以拿到上面通过context传下来的subscription，源码里面这个变量叫parentSub，那当前组件的更新回调就注册到parentSub上【这样父组件的state更新dispatch的时候就会执行更新回调更新子组件】。同时再新建一个Subscription实例，替代context上的subscription，继续往下传，也就是说他的子组件的回调会注册到当前subscription上。

4.当state变化了，根组件注册到redux store上的回调会执行更新根组件，同时根组件需要手动执行子组件的回调，子组件回调执行会触发子组件更新，然后子组件再执行自己subscription上注册的回调，触发孙子组件更新，孙子组件再调用注册到自己Subscription上的回调。。。。这样就是实现了从根组件开始，一层一层更新子组件的目的，保证了父—>子这样的更新顺序。

##### Subscription类

所以我们先新建一个Subscription类：

```react
export default class Subscription {
  constructor(store, parentSub) {
    this.store = store;
    this.parentSub = parentSub;
    this.listeners = [];
    this.handleChangeWrapper = this.handleChangeWrapper.bind(this);
  }
  //子组件注册回到到subscription上
  addNestedSub(listener) {
    this.listeners.push(listener);
  }
  //执行子组件的回调
  notifyNestedSubs() {
    const length = this.listeners.length;
    for (let i = 0; i < length; i++) {
      const callback = this.listeners[i];
      callback();
    }
  }
  //回调函数的包装
  handleChangeWrapper() {
    if (this.onStateChange) {
      this.onStateChange();
    }
  }
  //注册回调的函数
  //如果Parentsub有值，就将回调注册到parentsub上
  //如果parentsub没值，那当前组件就是根组件，回调注册到redux store上
  trySubscribe() {
    this.parentSub
      ? this.parentSub.addNestedSub(this.handleChangeWrapper)
      : this.store.subscribe(this.handleChangeWrapper);
  }
}
```

##### 改造Provider

然后在我们前面自己实现的react-redux里面，我们的根组件始终是Provider，所以Provider需要实例化一个Subscription并放到context上，而且每次state更新的需要手动调用子组件回调，代码改造如下：

```react
import React,{useMemo,useEffect} from 'react';
import ReactReduxContext from './Context';
import Subscription from './Subscription';
function Provider(props){
    const {store,children}=props;
    //这是传递的context
    //里面放入store和Subscription实例
    const contextValue = useMemo(() => {
    const subscription = new Subscription(store)
    // 注册回调为通知子组件，这样就可以开始层级通知了
    subscription.onStateChange = subscription.notifyNestedSubs
    return {
      store,
      subscription
    }
  }, [store])
    //拿到之前的state的值
    const previousState = useMemo(() => store.getState(), [store]);
    //每次previousState变化的时候
    //用notifyNestedSubs通知子组件
    useEffect(()=>{
        const {subscription}=contextValue;
        //将Onstatechange【更新回调函数】方法加入注册，注册回调的函数
        subscription.trySubscribe();
        if(previousState!==store.getState()){
            subscription.notifyNestedSubs();
        }
    },[contextValue,previousState])
    //返回ReactReduxContext包裹的组件，传入contextValue
    //里面的内容就直接是children，我们不动他
    return (
    <ReactReduxContext.Provider value={contextValue}>
      {children}
    </ReactReduxContext.Provider>
  )
}
export default Provider;
```

##### 改造connect

有了subscription类，connect就不能直接注册到store了，而是应该注册到父级subscription上，更新的时候除了更新自己还要通知子组件更新。在渲染包裹的组件时，也不能直接渲染了，而是应该再次使用Context.Provider包裹下，传入修改过的contextValue,这个contextValue里面的subscription应该替换为自己的。改造后代码如下：

```react
import React, { useContext, useRef, useLayoutEffect, useReducer } from 'react';
import ReactReduxContext from './Context';
import shallowEqual from './shallowEqual';
import Subscription from './Subscription';

function storeStateUpdatesReducer(count) {
  return count + 1;
}
function connect(
  mapStateToProps = () => {}, 
  mapDispatchToProps = () => {}
  ) {
  function childPropsSelector(store, wrapperProps) {
    const state = store.getState();   // 拿到state

    // 执行mapStateToProps和mapDispatchToProps
    const stateProps = mapStateToProps(state);
    const dispatchProps = mapDispatchToProps(store.dispatch);

    return Object.assign({}, stateProps, dispatchProps, wrapperProps);
  }

  return function connectHOC(WrappedComponent) {
    function ConnectFunction(props) {
      const { ...wrapperProps } = props;

      const contextValue = useContext(ReactReduxContext);

      const { store, subscription: parentSub } = contextValue;  // 解构出store和parentSub

      const actualChildProps = childPropsSelector(store, wrapperProps);
      //更新前的旧值
      const lastChildProps = useRef();
      useLayoutEffect(() => {
        lastChildProps.current = actualChildProps;
      }, [actualChildProps]);

      const [
        ,
        forceComponentUpdateDispatch
      ] = useReducer(storeStateUpdatesReducer, 0)

      // 新建一个subscription实例
      const subscription = new Subscription(store, parentSub);

      // state回调抽出来成为一个方法
      const checkForUpdates = () => {
        const newChildProps = childPropsSelector(store, wrapperProps);
        // 如果参数变了，记录新的值到lastChildProps上
        // 并且强制更新当前组件
        if(!shallowEqual(newChildProps, lastChildProps.current)) {
          lastChildProps.current = newChildProps;

          // 需要一个API来强制更新当前组件
          forceComponentUpdateDispatch();

          // 然后通知子级更新
          subscription.notifyNestedSubs();
        }
      };

      // 使用subscription注册回调
      subscription.onStateChange = checkForUpdates;
      subscription.trySubscribe();

      // 修改传给子级的context
      // 将subscription替换为自己的
      const overriddenContextValue = {
        ...contextValue,
        subscription
      }

      // 渲染WrappedComponent
      // 再次使用ReactReduxContext包裹，传入修改过的context
      return (
        <ReactReduxContext.Provider value={overriddenContextValue}>
          <WrappedComponent {...actualChildProps} />
        </ReactReduxContext.Provider>
      )
    }

    return ConnectFunction;
  }
}

export default connect;
```

##### 总结：

1. `React-Redux`是连接`React`和`Redux`的库，同时使用了`React`和`Redux`的API。
2. `React-Redux`主要是使用了`React`的`context api`来传递`Redux`的`store`。
3. `Provider`的作用是接收`Redux store`并将它放到`context`上传递下去。
4. `connect`的作用是从`Redux store`中选取需要的属性传递给包裹的组件。
5. `connect`会自己判断是否需要更新，判断的依据是需要的`state`是否已经变化了。
6. `connect`在判断是否变化的时候使用的是浅比较，也就是只比较一层，所以在`mapStateToProps`和`mapDispatchToProps`中不要反回多层嵌套的对象。
7. 为了解决父组件和子组件各自独立依赖`Redux`，破坏了`React`的`父级->子级`的更新流程，`React-Redux`使用`Subscription`类自己管理了一套通知流程。
8. 只有连接到`Redux`最顶级的组件才会直接注册到`Redux store`，其他子组件都会注册到最近父组件的`subscription`实例上。
9. 通知的时候从根组件开始依次通知自己的子组件，子组件接收到通知的时候，先更新自己再通知自己的子组件。















































































































































.https://github.com/reduxjs/react-redux/blob/7.x/src/utils/Subscription.js







































































