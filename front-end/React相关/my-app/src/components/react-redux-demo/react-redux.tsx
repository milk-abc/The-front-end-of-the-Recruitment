import React, { useContext } from "react";
import ReactReduxContext from "./context";
function Provider(props) {
  const { store, children } = props;
  const contextValue = { store };
  return (
    <ReactReduxContext.Provider value={store}>
      {children}
    </ReactReduxContext.Provider>
  );
}
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


