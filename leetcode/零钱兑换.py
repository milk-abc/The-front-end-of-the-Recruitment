class Solution:
    def coinChange(self, coins: List[int], amount: int) -> int:
        def recur(n):
            if n==0:
                return 0
            if n<0:
                return -1
            temp=float('inf')
            for coin in coins:
                subp=recur(n-coin)
                if subp==-1:
                    continue
                temp=min(temp,subp)
            return temp+1 if temp!=float('inf') else -1
        return recur(amount)