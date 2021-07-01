function repeat(){
    for(let i=0;i<4;i++){
        (function(){
            setTimeout(()=>console.log(i),3000*i)
        })(i)
    }
}
repeat()
// let arr=[1,2,3]
// for(let key in arr){
//     console.log(arr[key]);
// }

