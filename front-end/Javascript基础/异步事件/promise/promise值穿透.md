Promise.resolve(1)
.then(() => {
return 2;
})
.then(Promise.resolve(3))
.catch((err) => 3)
.then((res) => {
console.log(res);
});
Promise.resolve(1)
.then(2)
.then(3)
.then((res) => console.log(res));

Promise.resolve(1)
.then(() => {
return 2;
})
.then(3)
.then((res) => {console.log(res);return undefined});

void 函数的执行 return undefined

只要加了 return 就能返回到下一层

如果没有加 return 就不能传到下一层

此时下一层就默认使用上一层的值,也就是值穿透
