//二叉搜索树中序遍历左根右放在一个数组中，判断数组是否有序
var isValidBST = function(root) {
    let res=[];
    var dfs=function(root){
        if(root.left){
            dfs(root.left);
        }
        res.push(root.val);
        if(root.right){
            dfs(root.right);
        }
    }
    dfs(root);
    for(let i=0;i<res.length-1;i++){
        if(res[i+1]<=res[i]){
            return false
        }
    }
    return true
};