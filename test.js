const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = React.useState(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  return value;
};

const Counter = () => {
  const [value, setValue] = React.useState(0);
  const lastValue = useDebounce(value, 500);

  return (
    <div>
      <p>
        Current: {value} - Debounced: {lastValue}
      </p>
      <button onClick={() => setValue(value + 1)}>Increment</button>
    </div>
  );
};

// ReactDOM.render(<Counter />, document.getElementById("root"));
// 只要传入的 promise 有一个是 fullfilled 则立即 resolve 出去，
//否则将所有 reject 结果收集起来并返回自定义 error
// MyPromise.any = function (promises) {
//   let res = [];
//   promises.forEach((promise, index) => {
//     promise.then(
//       (value) => {
//         return Promise.resolve(value);
//       },
//       (error) => {
//         res[index] = new Error(error);
//         if (res.length === promises.length) {
//           return Promise.reject(res);
//         }
//       }
//     );
//   });
// };
