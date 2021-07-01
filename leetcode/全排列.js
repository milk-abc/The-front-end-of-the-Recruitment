var permuteUnique = function(nums) {
    let n=nums.length,res=[],visited=[],temp;
    nums.sort()
    let dfs=function(path,index){
        // console.log(index,path)
        if(path.length==n){
            res.push(path.slice());
            return
        }
        for(let i=0;i<n;i++){
            if(visited.includes(i)){
                continue
            }
            if(i>0&&nums[i-1]==nums[i]&&!visited.includes(i-1)){
                continue
            }
            path.push(nums[i])
            visited.push(i)
            dfs(path,i+1)
            path.pop()
            visited.pop()
        }
    }
    dfs([],0)
    return res
};