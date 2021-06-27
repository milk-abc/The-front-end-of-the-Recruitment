/**
 * @param {string} s
 * @return {boolean}
 */
 var isValid = function(s) {
    let stack=[];
    for(let item of s){
        if((['(','{','['].includes(item))){
            stack.push(item);
        }
        if(item==')'){
            let temp=stack.pop();
            if(temp!='('){
                return false;
            }
        }
        if(item=='}'){
            let temp=stack.pop();
            if(temp!='{'){
                return false;
            }
        }
        if(item==']'){
            let temp=stack.pop();
            if(temp!='['){
                return false;
            }
        }
    }
    if(stack.length==0){
        return true;
    }else{
        return false;
    }
};