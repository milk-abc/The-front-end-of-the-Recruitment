var levelOrder = function(root) {
  let res=[];
  if(!root){
      return res
  }
  let queue=[];
  queue.push(root);
  while(queue.length){
      let temp=[]
      const curLen=queue.length;//用const保证不会修改curLen
      for(let i=0;i<curLen;i++){
          let curnode=queue.shift();
          temp.push(curnode.val)
          if(curnode.left){
              queue.push(curnode.left)
          }
          if(curnode.right){
              queue.push(curnode.right)
          }
      }
      res.push([...temp])//解引用
  }
  return res
};