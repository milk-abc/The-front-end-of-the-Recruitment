//连续的子数组和
//输入：nums = [23,2,4,6,7], k = 6
//输出：true;解释：[2,4] 是一个大小为 2 的子数组，并且和为 6 。
//利用前缀和presum=[0,23,25,29,35,41],(presum[3]-presum[1])%k==0得presum[3]%k==presum[1]%k
//因此只需要找前缀和中对k取余相等的数且这两个数之间的索引差>=2
var checkSubarraySum = function(nums, k) {
    n=nums.length
    let presum=new Array(n+1).fill(0);
    let map=new Map(),reminder;
    for(let i=1;i<=n;i++){
        presum[i]=presum[i-1]+nums[i-1];
    }
    console.log(presum)
    for(let i=0;i<=n;i++){
        reminder=presum[i]%k
        if(map.has(reminder)){
            if(i-map.get(reminder)>=2){
                return true
            }
        }else{
            map.set(reminder,i)
        }
    }
    return false
};