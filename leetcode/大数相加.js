//所谓的大数相加就是字符串逆序补0求和
var addStrings = function(num1, num2) {
    let i=num1.length-1,j=num2.length-1;
    let res=[],nextval=0;
    while(i>=0||j>=0||nextval>0){
        let curnum1=0,curnum2=0;
        if(i>=0){
            curnum1=parseInt(num1[i]);
        }
        if(j>=0){
            curnum2=parseInt(num2[j]);
        }
        let curval=curnum1+curnum2+nextval;
        res.push(curval%10);
        nextval=parseInt(curval/10);
        i--;
        j--;
    }
    return res.reverse().join('');
};