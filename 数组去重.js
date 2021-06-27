let uniqueArr=function(arr){
    arrSet=new Set(arr);
    return Array.from(arrSet)
}
let uniqueArr2=function(arr){
    let newarr=[];
    for(let i=0;i<arr.length;i++){
        if(newarr.indexOf(arr[i])===-1){
            newarr.push(arr[i]);
        }
    }
    return newarr
}
let uniqueArr3=function(arr){
    return arr.filter((item,index,arr)=>{
        return arr.indexOf(item,0)===index
    })
}
arr=[1,1,2,3,2,'2','5'];
console.log(uniqueArr(arr));
