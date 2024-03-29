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

期待性能更佳逻辑更简单的react

https://www.youtube.com/watch?v=lGEMwh32soc

































https://www.chenhuojun.com/2021/09/12/react%E4%B8%ADpurecomponent%E7%9A%84%E6%B5%85%E6%AF%94%E8%BE%83/