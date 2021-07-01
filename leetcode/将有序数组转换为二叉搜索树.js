var sortedArrayToBST = function(nums) {
    let mid=parseInt(nums.length/2);
    if(mid<0||mid>=nums.length){
        return null
    }
    let root=new TreeNode(nums[mid]);
    root.left=sortedArrayToBST(nums.slice(0,mid));
    root.right=sortedArrayToBST(nums.slice(mid+1));
    return root
};