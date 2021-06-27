//桶排序第一步找出数组的最大值和最小值，定义每个桶的空间，一般为5
//根据最大值和最小值的差/桶的数量+1得出桶的总数
//为每个桶赋值一个空数组，用于添加映射到这个桶的值
//映射公式为(当前数组的值-minValue)/桶的空间大小=它应该放在第几个桶
//将每个桶中的数进行升序排序，并添加到res中
/**
 * @param {number[]} nums
 * @return {number[]}
 */
 var sortArray = function(nums) {
    if(nums.length==0){
        return nums;
    }
    let minValue=nums[0],maxValue=nums[0];
    for(let i=1;i<nums.length;i++){
        if(minValue>nums[i]){
            minValue=nums[i];
        }else if(maxValue<nums[i]){
            maxValue=nums[i];
        }
    }
    const bucketSize=5;
    let res=[]
    let bucketNum=Math.floor((maxValue-minValue)/bucketSize)+1;
    let bucket=new Array(bucketNum);
    for(let i=0;i<bucket.length;i++){
        bucket[i]=[];
    }
    for(let i=0;i<nums.length;i++){
        bucket[Math.floor((nums[i]-minValue)/bucketSize)].push(nums[i])
    }
    for(let i=0;i<bucket.length;i++){
        bucket[i].sort((a,b)=>a-b)
        res=res.concat(bucket[i])
    }
    return res
};