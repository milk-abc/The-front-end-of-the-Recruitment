class Solution:
    def minDepth(self, root: TreeNode) -> int:
        def recur(root):
            if not root:
                return 0
            ldepth=recur(root.left)
            rdepth=recur(root.right)
            if ldepth==0 and rdepth!=0:
                return rdepth+1
            if ldepth!=0 and rdepth==0:
                return ldepth+1
            return min(ldepth,rdepth)+1
        return recur(root)