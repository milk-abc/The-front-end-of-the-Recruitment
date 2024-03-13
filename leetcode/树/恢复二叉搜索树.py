class Solution:
    def recoverTree(self, root: TreeNode) -> None:
        """
        Do not return anything, modify root in-place instead.
        """
        self.firstNode=None
        self.secondNode=None
        self.preNode=TreeNode(float("-inf"))
        def in_order(root):
            if not root:
                return
            in_order(root.left)
            if self.firstNode==None and self.preNode.val>=root.val:#取第一个满足这个条件的上一个节点作为第一个交换节点
                self.firstNode=self.preNode
            if self.firstNode and self.preNode.val>=root.val:#取最后一个满足这个条件的当前节点作为第二个交换节点
                self.secondNode=root
            self.preNode=root
            in_order(root.right)
        in_order(root)
        self.firstNode.val,self.secondNode.val=self.secondNode.val,self.firstNode.val