//找出数组中出现次数为大于n/2的元素
//洗牌算法就是两两不同的数相互抵消
//temp存第一个数,计数为1，继续遍历数组，与其相同计数加1，不同计数减1
//当其计数为0时，下一次循环更新temp为当前数，计数为1，重新开始计数
//返回最后的temp
var majorityElement = function(nums) {
    let temp=nums[0],cnt=1;
    for(let i=1;i<nums.length;i++){
        if(cnt==0){
            temp=nums[i];
            cnt=1;
            continue
        }
        if(nums[i]==temp){
            cnt+=1;
        }
        if(nums[i]!=temp){
            cnt-=1;
        }
    }
    return temp
};