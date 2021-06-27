async function async1 () {
    console.log('async1 start');//2
    await new Promise(resolve => {
      console.log('promise1')//3
      setTimeout(()=>console.log('timer2'))//宏1 7
      resolve('promise resolve')
    })
    console.log('async1 success');//微1 5
    return 'async1 end'
}
console.log('srcipt start')//1
async1().then(res => {
    console.log(res) //6
})
new Promise(resolve => {
    console.log('promise2')//4
    setTimeout(() => {
        console.log('timer')//宏2 8
    })
})