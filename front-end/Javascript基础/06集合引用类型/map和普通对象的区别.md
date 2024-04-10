##### 何时使用Map来代替JS对象

JS普通对象{key:'value'}用于存放结构化的数据。如果将数字用作键JS会隐式的将对象的键转换为字符串，这种默认行为丢失了类型的一致性，普通对象带有着Objetc原型上的属性和方法，会在遍历插入的时候造成影响。并且对象无法保证插入的有序性

##### 1.Map接收任何类型的键

如果对象的键不是symbol，JS会隐式的将其转换为字符串，而Map不会改变。

普通JS对象不支持对象作为键，会覆盖

![image-20240409120039690](C:\Users\liqian\AppData\Roaming\Typora\typora-user-images\image-20240409120039690.png)

只能使用数组对象

```js
const foo = { name: 'foo' };
const bar = { name: 'bar' };
 
const kindOfMap = [
  [foo, 'Foo related data'],
  [bar, 'Bar related data']
]
```

但是按值访问很麻烦。但WeakMap很容易就做到这点，且允许对键对象进行垃圾收集，从而防止内存泄露。、

```js
const foo = { name: 'foo' };
const bar = { name: 'bar' };
 
const mapOfObjects = new WeakMap();
 
mapOfObjects.set(foo, 'Foo related data');
mapOfObjects.set(bar, 'Bar related data');
 
mapOfObjects.get(foo); // => 'Foo related data'
```

##### 2.map对键名没有限制

普通对象会继承对象原型上的属性和方法，如果定义时覆盖了原型上的属性和方法会出错

```js
function isPlainObject(value) {
  return value.toString() === '[object Object]';
}
 
const actor = {
  name: 'Harrison Ford',
  toString: 'Actor: Harrison Ford'
};
 
// Does not work!
isPlainObject(actor); // TypeError: value.toString is not a function
```

map没有这个问题，键值名称不受限制

##### 3.map自身可迭代，但对象需要辅助函数

##### 4.map的大小可以直接获得，但普通对象需要额外逻辑

总结：

普通JS对象通常可以很好的保存结构化数据，但它们也有一些局限性。

1.只能用字符串或symbol作为键

2.自己的对象属性可能会与从原型继承的属性键冲突（例如toString,constructor等）。

3.对象不能用作键



































