let input1='3 2 0 2';
let input2='1 4 3';
let arr=input2.split(' ').map(value=>parseInt(value));
let [n,m,k,x]=input1.split(' ').map(value=>parseInt(value));
let res=0;
let joinDigit=function(path){
	return path.reduce((cur,next)=>{
		return cur*10+next
	})
}
let dfs=function(arr,m,path){
	if(m===0){
		let temp=joinDigit(path);
		if(temp%x===k){
			let flag=true;
			for(let i=0;i<path.length-1;i++){
				if((path[i]+path[i+1])%2===0){
					flag=false;
					break;
				}
			}
			if(flag){
				res++;
			}
		}
		return res;
	}
	for(let i=0;i<arr.length;i++){
		path.push(arr[i]);
		dfs(arr,m-1,path);
		path.pop();
	}
	return res;
}
let ans=dfs(arr,m,[]);
console.log('ans',ans)
