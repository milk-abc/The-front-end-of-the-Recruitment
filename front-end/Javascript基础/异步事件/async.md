```js
async function foo(){
    console.log("here")
    return 123
}
let a=foo();//打印here
console.log(a);//打印promise fullfilled 123
console.log(await a);//打印123


async function foo(){
    throw new Error('error')
    return 123
}
let a=foo();//抛出错误
console.log(a);//打印promise rejected
console.log(await a);//打印错误
```

