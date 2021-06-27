const arr1=[1,2,3,2,3]
let res=arr1.reduce((pretotal,cur)=>{
    console.log(pretotal,cur)
    return pretotal+cur
})
console.log(res)