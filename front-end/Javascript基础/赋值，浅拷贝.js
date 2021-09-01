a = { aa: 12 };
b = { bb: 3 };
//只有数组,map,set,字符串是可迭代对象
c = { ...a }; //[...a]报错
d = b;
b.bb = 4;
a.aa = 3;
console.log(a, b, c, d);
