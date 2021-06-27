var removeDuplicates = function(nums) {
    for(let i=0;i<nums.length-1;i++){
        let temp=i;//记录未重复的初始位置
        while(i<nums.length-1&&nums[i+1]==nums[i]){
            i++;//记录重复的最后的位置
        }
        if(i-temp>0){//只有当有重复的值的时候再删除
            nums.splice(temp+1,i-temp)//从初始值后一个开始删除，删除i-temp个
        }
        i=temp;//删除后数组变短，索引回到初始位置，for循环累加1进入下一循环
    }
};