//考虑两种情况，一种是aba，一种是abba，中间是一个数和中间是两个数，然后向外扩展
//遍历数组，对每个数都进行两种方式的扩展，取每次的right-left较大的与end-start比较进行更新
var longestPalindrome = function(s) {
    let expand=function(left,right){
        while(left>=0&&right<s.length&&s[left]==s[right]){
           left--;
           right++;
        }
        return [left+1,right-1]
    }
    let start=0,end=0,left1,right1,left2,right2;
    for(let i=0;i<s.length;i++){
        [left1,right1]=expand(i,i);
        [left2,right2]=expand(i,i+1);
        if(right1-left1>end-start){
            [start,end]=[left1,right1];
        }
        if(right2-left2>end-start){
            [start,end]=[left2,right2];
        }
    }
    return s.slice(start,end+1)
};