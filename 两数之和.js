var twoSum = function(nums, target) {
    let hashmap=new Map();
    for(let i=0;i<nums.length;i++){
        if(hashmap.has(target-nums[i])){
            return [hashmap.get(target-nums[i]),i];
        }
        hashmap.set(nums[i],i);
    }
};