class Solution:
    def buildTree(self, preorder: List[int], inorder: List[int]) -> TreeNode:
        dict={}
        for i in range(len(preorder)):
            dict[inorder[i]]=i
        def build(preorder,prestart,preend,inorder,instart,inend,dict):
            if prestart>preend or instart>inend:
                return None
            root=TreeNode(preorder[prestart])
            inroot=dict[preorder[prestart]]
            numLeft=inroot-instart
            root.left=build(preorder,prestart+1,prestart+numLeft,inorder,instart,inroot-1,dict)
            root.right=build(preorder,prestart+numLeft+1,preend,inorder,inroot+1,inend,dict)
            return root
        ans=build(preorder,0,len(preorder)-1,inorder,0,len(inorder)-1,dict)
        return ans