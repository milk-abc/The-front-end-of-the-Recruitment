//维护一个单调栈stack，栈底到栈顶单调递减
//放的是所有备选的num[j]和numk，在栈中的是num[j],出栈的numk
//只有当遍历到的数num[i]大于栈顶，栈中的元素开始出栈，直到栈顶元素比num[i]大，再压入num[i]做备选
//此时numk保存的是最大的比栈顶小的数,这样才不会遗漏所有可能的num[i]，找到最具潜力的(j,k)对
//接下来只要找到任意一个num[i]<numk就可以得到num[j]>numk>num[i]
//对于arr=[3,5,0,3,4],得到第一步stack=[4,3,0],numk=-无穷
//遇到5,stack弹出0,3,4作为numk，压入5，得stack=[5],numk=4
//遇到3,num[i]<numk,return true
var find132pattern = function(nums) {
    let stack=[],numk=-Infinity;
    for(let i=nums.length-1;i>=0;i--){
        if(nums[i]<numk){
            return true
        }
        while(stack&&nums[i]>stack[stack.length-1]){
            numk=stack.pop()
        }
        stack.push(nums[i])
    }
    return false
};