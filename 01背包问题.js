let C=6
let w=[1,2,3,4,6]
let v=[6,10,12,1,2,3]
let n=w.length
let dp=new Array()
for(let i=0;i<n+1;i++){
  dp[i]=new Array()
  for(let j=0;j<C+1;j++){
    dp[i][j]=0
  }
}
for(let i=1;i<n+1;i++){
  for(let j=1;j<C+1;j++){
    if(j<w[i-1]){
      dp[i][j]=dp[i-1][j]
    }else{
      dp[i][j]=Math.max(dp[i-1][j],dp[i-1][j-w[i-1]]+v[i-1])
    }
  }
}
console.log(dp[n][C])