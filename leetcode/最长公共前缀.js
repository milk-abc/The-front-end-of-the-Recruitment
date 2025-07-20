var longestCommonPrefix = function(strs) {
    let temp=strs[0];
    for(let i=1;i<strs.length;i++){
        let minlen=Math.min(temp.length,strs[i].length),curtemp='';
        for(let j=0;j<minlen;j++){
            if(temp[j]===strs[i][j]){
                curtemp+=temp[j];
            }
            else{
                break;
            }
        }
        temp=curtemp;
    }
    return temp
};