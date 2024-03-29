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











































































