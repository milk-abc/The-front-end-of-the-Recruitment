var isBalanced = function(root) {
    var depth=function(root){
        if(!root){
            return 0;
        }
        let leftDepth=depth(root.left);
        let rightDepth=depth(root.right);
        return Math.max(leftDepth,rightDepth)+1;
    }
    if(!root){
        return true;
    }
    let leftdepth=depth(root.left);
    let rightdepth=depth(root.right);
    if(Math.abs(leftdepth-rightdepth)>1){
        return false;
    }
    else{
        return isBalanced(root.left)&&isBalanced(root.right)
    }
};