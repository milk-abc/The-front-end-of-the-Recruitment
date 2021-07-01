var findRepeatNumber = function(nums) {
    let num_map=new Map()
    if(nums.length==0){
        return 0;
    }
    let ans=1;
    let name='';
    nums.forEach((item)=>{
        if(num_map.has(item)){
            let temp=num_map.get(item)+1
            if(temp>ans){
                ans=temp;
                name=item;
            }
            num_map.set(item,temp);
        }
        else{
            num_map.set(item,1);
        }
    })
    return [ans,name]
};
let ans=findRepeatNumber([1,1,1,2,2,3,1,'192.168.1.1', '192.118.2.1', '192.168.1.1'])
console.log(ans)