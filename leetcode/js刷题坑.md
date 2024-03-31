最近在刷LeetCode，经常就会遇到需要初始化二维数组的情况。由于学术不精，采用new Array().fill([])初始化二位数组，导致了代码无法通过测试用例。本文就是来总结一下得到的教训。

## Array.fill(value, start, end)

我们知道，Array.fill()方法可以替换或填充数组里的值。 参数value为替换值，不可缺省。 start表示开始替换的位置。 end表示替换结束的位置。 如果只有value，则默认替换全部值。

### 替换

```
var fruits = ["Banana", "Orange", "Apple", "Mango"];
fruits.fill("Runoob", 2, 4);
//结果输出为["Banana", "Orange", "Runoob", "Runoob"]
```

### 填充

填充其实可以看作替换的一种（数组为初始化时，默认值为undefined）

```
var arr = new Array(3); //此时数组为[undefined, undefined, undefined]
arr.fill(0);
//结果输出为[0, 0, 0];
```

### 坑点

这里最坑的地方来了(也可能时我太菜TT)，如果value值为一个引用数据类型，则fill之后，数组里面的值指向的是同一个地址。如果改变了其中一个，则其它的都会改变。

```
var arr = new Array(3);
var obj = {name: 'qqq'};
arr.fill(obj);
//这时arr的值为[ { name: 'qqq' }, { name: 'qqq' }, { name: 'qqq' } ]
arr[1].name = 'zzz';
console.log(arr);
//输出的结果为[{ name: 'zzz' }, { name: 'zzz' }, { name: 'zzz' }]
```

所以当我在初始化二维数组时如果采用

```
var arr = new Array(3).fill(new Array(3).fill(0));
```

那么，想通过arr[i][j]改变二维数组中的某一个元素时，arr[0][j],arr[1][j]和arr[2][j]都会被改变。如下

```
var arr = new Array(3).fill(new Array(3).fill(0));
arr[1][1] = 2;
//输出结果为[ [ 0, 2, 0 ], [ 0, 2, 0 ], [ 0, 2, 0 ] ]
```

因此我们在初始化二维数组时，还是采用两个for循环的方式来初始化，虽然代码长了点，但是不会出错啊~

还有初始化二维数组时需要定义变量let 的时候就初始化，要不后面会报错；

```js
const arr:boolean[][]=[];
```

### 附：for循环实现二维数组初始化

```
 const arr=[];
 for(var i = 0; i < 3; i++) {
        arr[i] = new Array();
        for(var j = 0; j < 3; j++) {
            arr[i][j] = 0;
        }
    }
```

https://juejin.cn/post/6844904097141751822
