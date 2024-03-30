类组件

##### PureComponent

当父组件重新渲染时，React通常会重新渲染子组件。为了优化性能，你可以创建一个组件，在父组件重新渲染时不会重新渲染，前提是新的props和state与旧的props和state相同【浅比较】。为了在props和state相同时跳过重新渲染，类式组件应该继承PureComponent而不是Component：

```react
import { PureComponent, useState } from 'react';

class Greeting extends PureComponent {
  render() {
    console.log("Greeting was rendered at", new Date().toLocaleTimeString());
    return <h3>Hello{this.props.name && ', '}{this.props.name}!</h3>;
  }
}

export default function MyApp() {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  return (
    <>
      <label>
        Name{': '}
        <input value={name} onChange={e => setName(e.target.value)} />
      </label>
      <label>
        Address{': '}
        <input value={address} onChange={e => setAddress(e.target.value)} />
      </label>
      <Greeting name={name} />
    </>
  );
}
```

PureComponent是Component的子类，并且支持所有Component的API。继承PureComponent的子类相当于定义了一个自定义的shouldComponentUpdate方法，该方法将浅比较props和state【Object.is()】，在props和state相同时跳过重新渲染。

##### 注意

```javascript
Object.is(3,3) //true
Object.is({},{}) //false
```

函数组件

##### 当你将这个组件从类组件转换为函数组件时，将其包装在memo：

```react
import { memo, useState } from 'react';

const Greeting = memo(function Greeting({ name }) {
  console.log("Greeting was rendered at", new Date().toLocaleTimeString());
  return <h3>Hello{name && ', '}{name}!</h3>;
});

export default function MyApp() {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  return (
    <>
      <label>
        Name{': '}
        <input value={name} onChange={e => setName(e.target.value)} />
      </label>
      <label>
        Address{': '}
        <input value={address} onChange={e => setAddress(e.target.value)} />
      </label>
      <Greeting name={name} />
    </>
  );
}
```

##### 与 `PureComponent` 不同，memo不会比较新旧 state。在函数组件中，即使没有 `memo`，调用具有相同 state 的set函数，默认已经阻止了渲染。

![image-20240329162647860](C:\Users\liqian\AppData\Roaming\Typora\typora-user-images\image-20240329162647860.png)

当你使用memo时，只要任何一个prop与先前的值不是浅层相等的话，你的组件就会重新渲染。这意味着React会使用Object.is比较组件中的每个prop与其先前的值。注意，Object.is(3,3)为true，但Object.is({},{})为false。

为了最大化使用memo的效果，应该尽量减少props的变化次数。例如，如果props是一个对象，可以使用useMemo避免父组件每次都重新创建该对象：

```react
function Page(){
    const [name,setName]=useState('Taylor');
    const [age,setAge]=useState(42);
    //useMemo用于缓存person对象，只要name,age不变person对象就不会变更
    const person=useMemo(()=>({name,age}),[name,age]);
    return <Profile person={person}>;
}
const Profile=memo(function Profile({person}){
	 return <h3>Hello{person.name && ', '}{person.name}!</h3>;
});
```

最小化props的改变的更好的方法是确保组件在其props中接受必要的最小信息。例如，它可以接受单独的值而不是整个对象：

```react
function Page() {
  const [name, setName] = useState('Taylor');
  const [age, setAge] = useState(42);
  return <Profile name={name} age={age} />;
}

const Profile = memo(function Profile({ name, age }) {
  // ...
});
```

当你需要将一个函数传递给memo组件的时候，要么在组件外声明它，以确保它永远不会改变，要么使用useCallback在重新渲染之间缓存其定义。

```react
function ProductPage({ productId, referrer, theme }) {
  // 在多次渲染中缓存函数
  const handleSubmit = useCallback((orderDetails) => {
    post('/product/' + productId + '/buy', {
      referrer,
      orderDetails,
    });
  }, [productId, referrer]); // 只要这些依赖没有改变

  return (
    <div className={theme}>
      {/* ShippingForm 就会收到同样的 props 并且跳过重新渲染 */}
      <ShippingForm onSubmit={handleSubmit} />
    </div>
  );
}
```

##### 指定自定义比较函数

在极少数情况下，最小化memorized组件的props更改可能是不可行的。在这种情况下，你可以提供一个自定义比较函数，React将使用它来比较旧的和新的props，而不是使用浅比较。这个函数作为memo的第二个参数传递。这个函数作为memo的第二个参数传递。它应该仅在新的props与旧的props具有相同的输出时返回true；否则应该返回false。

```react
const chart=memo(function chart({dataPoints}){
    //
},arePropsEqual)
function arePropsEqual(oldProps,newProps){
    return (
        oldProps.dataPoints.length===newProps.dataPoints.length&&
        oldProps.dataPoints.every((oldPoint,index)=>{
            const newPoint=newProps.dataPoints[index];
            return oldPoint.x===newPoint.x&&oldPoint.y===newPoint.y;
        })
    )
}
```

如果这样做，请使用浏览器开发者工具中的性能面板来确保你的比较函数实际上比重新渲染组件要快。在进行性能测量时，请确保React处于生产模式下运行。

##### 陷阱

如果你提供了一个自定义的arePropsEqual实现，你必须比较每个prop，包括函数。函数通常闭包了父组件的props和state。如果你在oldprops.onclick!==newprops.onclick时返回true，你的组件将在其onclick处理函数中继续“看到”来自先前渲染的props和state，导致非常令人困惑的bug。

避免在arePropsEqual中进行深比较，除非你百分百确定你正在处理的数据结构具有已知有限的深度。深比较可能会变得非常缓慢，并且如果有人稍后更改数据结构，这可能会卡住你的应用数秒钟。















































期待性能更佳逻辑更简单的react

https://www.youtube.com/watch?v=lGEMwh32soc

































https://www.chenhuojun.com/2021/09/12/react%E4%B8%ADpurecomponent%E7%9A%84%E6%B5%85%E6%AF%94%E8%BE%83/