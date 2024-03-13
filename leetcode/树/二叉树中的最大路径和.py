class Solution:
    def maxPathSum(self, root: TreeNode) -> int:
        self.ans=float('-inf')
        def oneSide(root):
            if not root:
                return 0
            #后续遍历
            left=max(0,oneSide(root.left))
            right=max(0,oneSide(root.right))
            self.ans=max(self.ans,left+right+root.val)
            return max(left,right)+root.val
        oneSide(root)
        return self.ans