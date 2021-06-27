var lengthOfLongestSubstring = function(s) {
    let temp='',cnt=0,maxans=0;
    for(let i=0;i<s.length;i++){
        temp+=s[i];
        cnt+=1;
        for(let j=i+1;j<s.length;j++){
            if(temp.indexOf(s[j])==-1){
                temp+=s[j];
                cnt+=1;
            }else{
                break;
            }
        }
        maxans=Math.max(maxans,cnt);
        temp='';
        cnt=0;
    }
    return maxans
};