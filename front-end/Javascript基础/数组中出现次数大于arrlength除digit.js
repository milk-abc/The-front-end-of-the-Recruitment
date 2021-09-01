let arr=[1,3,1,1,2,2,4,4,9,1,2];
let digit=4;
let flag=parseInt(arr.length/digit);
let arr_set=new Map();
let res=[];
let temp;
for(let i=0;i<arr.length;i++){
    if(arr_set.has(arr[i])){
        temp=arr_set.get(arr[i]);
        temp++;
        arr_set.set(arr[i],temp);
    }
    else{
        arr_set.set(arr[i],1);
    }
}
console.log(arr_set,flag)
// for(let key of arr_set.keys()){
//     console.log(key)
//     if(arr_set.get(key)>flag){
//         res.push(key)
//     }
// }
arr_set.forEach((value,key)=>{
    if(value>flag){
        res.push(key)
    }
})
console.log(res)