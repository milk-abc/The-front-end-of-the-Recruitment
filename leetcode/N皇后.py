class Solution:
    def solveNQueens(self, n: int) -> List[List[str]]:
        results=[]
        def isVaild(board,row,col):
            for i in range(row):
                if board[i][col]=='Q':
                    return False
            i,j=row-1,col+1
            while i>=0 and j<n:
                if board[i][j]=='Q':
                    return False
                i-=1
                j+=1
            h,k=row-1,col-1
            while h>=0 and k>=0:
                if board[h][k]=='Q':
                    return False
                h-=1
                k-=1
            return True
        def dfs(board,row):
            if row==n:
                res=['' for i in range(n)]
                for i in range(n):
                    res[i]=''.join(board[i])
                results.append(res)
                return
            for col in range(n):
                if isVaild(board,row,col):
                    board[row][col]='Q'
                    dfs(board,row+1)
                    board[row][col]='.'
        board=[['.' for j in range(n)] for i in range(n)]
        dfs(board,0)
        return results