var isSymmetric = function(root) {
    var judge=function(leftroot,rightroot){
        if(!leftroot&&!rightroot){
            return true;
        }
        if(!leftroot||!rightroot){
            return false;
        }
        if(leftroot.val!=rightroot.val){
            return false;
        }
        return judge(leftroot.left,rightroot.right)&&judge(leftroot.right,rightroot.left)
    }
    return judge(root.left,root.right)
};