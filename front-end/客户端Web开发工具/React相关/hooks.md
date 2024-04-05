为什么需要 react hooks
React Hooks 是 React 16.8 版本引入的一项重要功能，其出现的必要性主要体现在以下几个方面：

解决共享逻辑和复用状态的问题：在 React 之前，组件之间的状态共享和逻辑复用主要通过组件间的嵌套和传递 props 实现。然而，这种方式在处理更复杂的场景，如多个组件间共享状态或处理副作用时，会导致组件层级嵌套过深，代码冗余，可维护性差。虽然后续出现了HOC但是还是会出现可读性差的情况。

Hooks 的出现提供了一种更直接、简洁的方式来处理这些问题，使得开发者能够更方便地编写、管理和复用 React 组件的逻辑。
减少样板代码，逻辑更清晰：相较于类组件，使用函数组件的 Hooks 可以减少样板代码，使逻辑更加清晰。这有助于提升代码的可读性和可维护性。
复用逻辑：通过自定义 Hook，可以将组件逻辑进行封装和复用。这使得组件之间的共享逻辑更加方便，减少了代码重复，提高了代码的可重用性。
更好的可测试性：Hooks 是基于函数的，因此测试工具可以更轻松地创建和操作组件实例，使得编写可测试的代码更为容易。
更好的性能优化：由于 Hooks 是基于函数的，React 可以更容易地对其进行内部优化，以提高组件渲染的性能。
总的来说，React Hooks 的出现使得开发者能够更灵活地处理 React 组件的状态和逻辑，提高了代码的可读性、可维护性和可重用性，同时也为开发者提供了更好的性能和可测试性。

##### 简单说，Hook将组件中相互关联的部分拆分成更小的函数，提高了可复用

hooks 有useState,useContext,useRef,useReducer,useCallback,useMemo

hooks只在函数组件中存在

##### useState

useState 能让函数组件有自己的状态，是一个管理状态的 hooks API。通过 useState 可以实现状态的初始化、读取、更新。
const [状态名,set 函数]=useState(初始值)

##### useContext

​	通常来说，你会通过 props 将信息从父组件传递到子组件。但是，如果你必须通过许多中间组件向下传递 props，或是在你应用中的许多组件需要相同的信息，传递 props 会变的十分冗长和不便。Context 允许父组件向其下层无论多深的任何组件提供信息，而无需通过 props 显式传递。
传递 props 是将数据通过 UI 树显式传递到使用它的组件的好方法。

​	但是当你需要在组件树中深层传递参数以及需要在组件间复用相同的参数时，传递 props 就会变得很麻烦。最近的根节点父组件可能离需要数据的组件很远，状态提升 到太高的层级会导致 “逐层传递 props” 的情况。

​	要是有一种方法可以在组件树中不需要 props 将数据“直达”到所需的组件中，那可就太好了。React 的 context 功能可以满足我们的这个心愿。将 `level` 参数传递给 `<Section>` 组件而不是传给 `<Heading>` 组件看起来更好一些。这样的话你可以强制使同一个 section 中的所有标题都有相同的尺寸：

```
<Section level={3}>

  <Heading>关于</Heading>

  <Heading>照片</Heading>

  <Heading>视频</Heading>

</Section>
```

​	但是 `<Heading>` 组件是如何知道离它最近的 `<Section>` 的 level 的呢？**这需要子组件可以通过某种方式“访问”到组件树中某处在其上层的数据。**

​	你不能只通过 props 来实现它。这就是 context 大显身手的地方。你可以通过以下三个步骤来实现它：

1. **创建** 一个 context。（你可以将其命名为 `LevelContext`, 因为它表示的是标题级别。)
2. 在需要数据的组件内 **使用** 刚刚创建的 context。（`Heading` 将会使用 `LevelContext`。）
3. 在指定数据的组件中 **提供** 这个 context。 （`Section` 将会提供 `LevelContext`。）

这就是为什么，比起通过 props 传递它们，你可能想把 `tasks` 状态和 `dispatch` 函数都 [放入 context](https://zh-hans.react.dev/learn/passing-data-deeply-with-context)。**这样，所有的在 `TaskApp` 组件树之下的组件都不必一直往下传 props 而可以直接读取 tasks 和 dispatch 函数**。

下面将介绍如何结合使用 reducer 和 context：

1. **创建** context。
2. 将 state 和 dispatch **放入** context。
3. 在组件树的任何地方 **使用** context。

​	有些组件可能需要控制和同步 React 之外的系统。例如，你可能需要使用浏览器 API 聚焦输入框，或者在没有 React 的情况下实现视频播放器，或者连接并监听远程服务器的消息。在本章中，你将学习到一些脱围机制，让你可以“走出” React 并连接到外部系统。大多数应用逻辑和数据流不应该依赖这些功能。

当你希望组件“记住”某些信息，但又不想让这些信息 [触发新的渲染](https://zh-hans.react.dev/learn/render-and-commit) 时，你可以使用 **ref**。

ref 就像组件的一个不被 React 追踪的秘密口袋。例如，可以使用 ref 来存储 [timeout ID](https://developer.mozilla.org/zh-CN/docs/Web/API/setTimeout#return_value)、[DOM 元素](https://developer.mozilla.org/zh-CN/docs/Web/API/Element) 和其他不影响组件渲染输出的对象。

由于 React 会自动更新 [DOM](https://developer.mozilla.org/docs/Web/API/Document_Object_Model/Introduction) 以匹配渲染输出，因此组件通常不需要操作 DOM。但是，有时可能需要访问由 React 管理的 DOM 元素——例如聚焦节点、滚动到此节点，以及测量它的尺寸和位置。React 没有内置的方法来执行此类操作，所以需要一个指向 DOM 节点的 ref 来实现。例如，点击按钮将使用 ref 聚焦输入框：

一般来说，Effect 会在  **每次** 渲染后执行，**而以下代码会陷入死循环中**：

```
const [count, setCount] = useState(0);

useEffect(() => {

  setCount(count + 1);

});
```

每次渲染结束都会执行 Effect；而更新 state 会触发重新渲染。但是新一轮渲染时又会再次执行 Effect，然后 Effect 再次更新 state……如此周而复始，从而陷入死循环。

Effect 通常应该使组件与 **外部** 系统保持同步。如果没有外部系统，你只想根据其他状态调整一些状态，那么 [你也许不需要 Effect](https://zh-hans.react.dev/learn/you-might-not-need-an-effect)。

没有依赖数组作为第二个参数，与依赖数组位空数组 `[]` 的行为是不一致的：

```javascript
useEffect(() => {

  // 这里的代码会在每次渲染后执行

});



useEffect(() => {

  // 这里的代码只会在组件挂载后执行

}, []);



useEffect(() => {

  //这里的代码只会在每次渲染后，并且 a 或 b 的值与上次渲染不一致时执行

}, [a, b]);
```

![image-20240315172621625](C:\Users\liqian\AppData\Roaming\Typora\typora-user-images\image-20240315172621625.png)

useEffect是在真实DOM渲染完成【componentdidmount,componentdidupdate】后执行，存在清理函数的时候先运行清理函数再运行useEffect。

它跟class组件中的componentDidMount、componentDidUpdate和componentWillUnmount具有相同的用途，只不过被合并成了一个API。

![image-20240405173045377](C:\Users\liqian\AppData\Roaming\Typora\typora-user-images\image-20240405173045377.png)

useLayoutEffect是在渲染前执行。

useCallback缓存的是函数，useMemo缓存的是对象

