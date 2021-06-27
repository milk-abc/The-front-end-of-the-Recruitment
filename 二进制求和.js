var addBinary = function(a, b) {
    let res=[],i=a.length-1,j=b.length-1,nextval=0;
    while(i>=0||j>=0||nextval){
        let cura=0,curb=0,curval=0;
        if(i>=0){
            cura=parseInt(a[i]);
        }
        if(j>=0){
            curb=parseInt(b[j]);
        }
        console.log(cura,curb,nextval)
        let temp=cura+curb+nextval;
        curval=temp%2;
        res.push(curval);
        if(temp>=2){
            nextval=1;
        }else{
            nextval=0;
        }
        i--;
        j--;
    }
    return res.reverse().join('')
};
console.log(addBinary("1010",'1011'))