reducer用于整合状态逻辑，reducer会通过dispatch一个action来指明"用户刚刚做了什么"，而状态更新逻辑则保存在reducer函数里，

reducer函数会传入两个参数，第一个参数是现有的state，第二个是用户的操作指令action，该函数会根据操作指令匹配对应的状态更新逻辑，更新状态action进行返回。

尽管 `reducer` 可以 “减少” 组件内的代码量，但它实际上是以数组上的 [`reduce()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce) 方法命名的。

`reduce()` 允许你将数组中的多个值 “累加” 成一个值：

```
const arr = [1, 2, 3, 4, 5];

const sum = arr.reduce(

  (result, number) => result + number,
  0

); // 1 + 2 + 3 + 4 + 5
const sum = arr.reduce(fn,initalval)
```

你传递给 `reduce` 的函数被称为 “reducer”。它接受 `目前的结果` 和 `当前的值`，然后返回 `下一个结果`。React 中的 `reducer` 和这个是一样的：它们都接受 `目前的状态` 和 `action` ，然后返回 `下一个状态`。这样，action 会随着时间推移累积到状态中。

```
//index.js
import tasksReducer from './tasksReducer.js';

let initialState = [];
let actions = [
  {type: 'added', id: 1, text: '参观卡夫卡博物馆'},
  {type: 'added', id: 2, text: '看木偶戏'},
  {type: 'deleted', id: 1},
  {type: 'added', id: 3, text: '打卡列侬墙'},
];

let finalState = actions.reduce(tasksReducer, initialState);

const output = document.getElementById('output');
output.textContent = JSON.stringify(finalState, null, 2);


//tasksReducer.js
export default function tasksReducer(tasks, action) {
  switch (action.type) {
    case 'added': {
      return [
        ...tasks,
        {
          id: action.id,
          text: action.text,
          done: false,
        },
      ];
    }
    case 'changed': {
      return tasks.map((t) => {
        if (t.id === action.task.id) {
          return action.task;
        } else {
          return t;
        }
      });
    }
    case 'deleted': {
      return tasks.filter((t) => t.id !== action.id);
    }
    default: {
      throw Error('未知 action: ' + action.type);
    }
  }
}
```

![image-20240314220305149](C:\Users\liqian\AppData\Roaming\Typora\typora-user-images\image-20240314220305149.png)

## 编写一个好的 reducers 

编写 `reducers` 时最好牢记以下两点：

- **reducers 必须是纯粹的。** 这一点和 [状态更新函数](https://zh-hans.react.dev/learn/queueing-a-series-of-state-updates) 是相似的，`reducers` 是在渲染时运行的！（actions 会排队直到下一次渲染)。 这就意味着 `reducers` [必须纯净](https://zh-hans.react.dev/learn/keeping-components-pure)，即当输入相同时，输出也是相同的。它们不应该包含异步请求、定时器或者任何副作用（对组件外部有影响的操作）。它们应该以不可变值的方式去更新 [对象](https://zh-hans.react.dev/learn/updating-objects-in-state) 和 [数组](https://zh-hans.react.dev/learn/updating-arrays-in-state)。
- **每个 action 都描述了一个单一的用户交互，即使它会引发数据的多个变化。** 举个例子，如果用户在一个由 `reducer` 管理的表单（包含五个表单项）中点击了 `重置按钮`，那么 dispatch 一个 `reset_form` 的 action 比 dispatch 五个单独的 `set_field` 的 action 更加合理。如果你在一个 `reducer` 中打印了所有的 `action` 日志，那么这个日志应该是很清晰的，它能让你以某种步骤复现已发生的交互或响应。这对代码调试很有帮助！