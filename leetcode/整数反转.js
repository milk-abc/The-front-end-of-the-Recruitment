var reverse = function(x) {
    let res=[];
    let digitStr=String(x);
    let temparr=digitStr.split('');
    if(temparr[0]=="+"||temparr[0]=="-"){
        res.push(temparr[0]);
        res=res.concat(temparr.slice(1).reverse());
    }
    else{
        res=temparr.reverse();
    }
    let digit=parseInt(res.join(''));
    if(digit>Math.pow(2,31)-1||digit<-1*Math.pow(2,31)){
        return 0
    }
    return digit;
};