//先排序再双指针
//去重有两点关键，第一是i的去重当nums[i]==nums[i-1]时直接continue；
//第二是L和R的去重，当固定i，已得到L和R使其为0时，
var threeSum = function(nums) {
    nums.sort((a,b)=>a-b);
    // console.log(nums)
    let res=[],L,R,temp;
    for(let i=0;i<nums.length;i++){
        if(nums[i]>0){
            return res;
        }
        if(i>0&&nums[i]==nums[i-1]){
            continue
        }
        L=i+1,R=nums.length-1;
        while(L<R){
            temp=nums[i]+nums[L]+nums[R];
            if(temp==0){
                res.push([nums[i],nums[L],nums[R]]);
                while(L<R&&nums[L]==nums[L+1]){
                    L++;
                }
                while(L<R&&nums[R]==nums[R-1]){
                    R--;
                }
                console.log(nums[i],nums[L],nums[R])
                L++;
                R--;
            }
            if(temp<0){
                L++;
            }
            if(temp>0){
                R--;
            }
        }
    }
    return res
};