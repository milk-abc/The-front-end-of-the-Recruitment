class Solution:
    def change(self, amount: int, coins: List[int]) -> int:
        n=len(coins)
        f=[0 for j in range(amount+1)]
        f[0]=1
        for i in range(1,n+1):
            val=coins[i-1]
            for j in range(val,amount+1):
                f[j]+=f[j-val]
        return f[amount]