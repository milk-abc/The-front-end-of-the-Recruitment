let flat=function(arr,n){
    let res=[];
    arr.forEach((item)=>{
        if(item.constructor==Array&&n>0){
            res=res.concat(flat(item,n-1));
        }
        else{
            res.push(item);
        }
    })
    return res;
}
let arr=[[1,2],[[[3,4]]]];
console.log(flat(arr,4))