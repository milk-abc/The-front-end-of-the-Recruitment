//插入排序
//原数组为[5,2,4,3]
//从第二个数开始遍历，取前一个数的索引，在遍历到当前数的前面都是已经排好序的数组
//往前查找当前元素插入的位置，没找到的时候将元素往后移，表现就是num[pre+1]=num[pre],pre--
//找到后将之前保存的cur赋值给nums[pre+1]
var sortArray = function(nums) {
    let pre,cur;
    for(let i=1;i<nums.length;i++){
        pre=i-1;
        cur=nums[i];
        while(pre>=0&&cur<nums[pre]){
            nums[pre+1]=nums[pre];
            pre--;
        }
        nums[pre+1]=cur;
    }
    return nums
};