```js
const compose = (...arr) => {
  if (arr.length === 0) {
    return (arg) => arg;
  }
  return arr.reduce((a, b) => {
    console.log("a", a.toString());
    console.log("b", b.toString());
    return (...args) => {
      console.log("args", args);
      const c = a(b(...args));
      console.log("c", c);
      return c;
    };
  });
};
const addnum1 = (a) => {
  return a + 1;
};
const addnum10 = (a) => {
  return a + 10;
};
const addnum20 = (a) => {
  return a + 20;
};
const res = compose(addnum1, addnum10, addnum20)(10);
console.log("res", res);
--------------------------------
打印
a (a) => {
  return a + 1;
}
b (a) => {
  return a + 10;
}
a (...args) => {
      console.log("args", args);
      const c = a(b(...args));
      console.log("c", c);
      return c;
    }
b (a) => {
  return a + 20;
}
a (...args) => {
      console.log("args", args);
      const c = a(b(...args));
      console.log("c", c);
      return c;
    }
b (a) => {
  return a + 30;
}
args [ 10 ]
args [ 40 ]
args [ 60 ]
c 71
c 71
c 71
res 71
```

compose的核心在于闭包作用域的引用，反向链式；需要抽象来看，将问题整合