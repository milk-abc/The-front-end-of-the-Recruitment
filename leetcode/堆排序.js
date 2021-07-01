//创建大小为k的最大堆，从后往前建最大堆，保证第一个节点为最大值
//将数组的前k个元素放入堆中
//从下标k继续开始一次遍历数组的剩余元素
//如果元素小于堆顶元素，那么取出堆顶元素，将当前元素入堆
//如果元素大于/等于堆顶元素，不做操作
function buildMaxHeap(arr){
  len=arr.length;
  for(let i=Math.floor(len/2);i>=0;i--){
    heapify(arr,i);
  }
}
function heapify(arr,i){
  let left=2*i+1;
  let right=2*i+2;
  largest=i;
  if(left<len&&arr[left]>arr[largest]){
    largest=left;
  }
  if(right<len&&arr[right]>arr[largest]){
    largest=right;
  }
  if(largest!=i){
    swap(arr,i,largest);//保证根节点是最大值
    heapify(arr,largest);//调整因为改变了值受影响的下面的堆
  }
}
function swap(arr,i,j){
  let temp=arr[i];
  arr[i]=arr[j];
  arr[j]=temp;
}
function heapSort(arr){
  buildMaxHeap(arr);
  for(let i=len-1;i>0;i--){
    swap(arr,0,i);//将最后一个节点和第一个节点交换，此时最后一个节点为最大值
    len--;//将最后一个节点剔除，因为其已经是最大值，不需要再参与排序
    heapify(arr,0);//从第一个节点开始重新建堆让堆有序
  }
  return arr;
}
let arr=[1,4,5,6,2]
console.log(heapSort(arr))