//创建大小为k的最大堆，从后往前建最大堆，保证第一个节点为最大值
//将数组的前k个元素放入堆中
//从下标k继续开始一次遍历数组的剩余元素
//如果元素小于堆顶元素，那么取出堆顶元素，将当前元素入堆
//如果元素大于/等于堆顶元素，不做操作
//建堆
//使用原来的数组，一个数组在另一个维度上可以当做一个完全二叉树
//除了最后一层之外其他的每一次都被完全填充

//从下往上建堆
//[3,1,2,4,5]
let buildheap = function (arr) {
  for (let i = Math.floor(arr.length / 2) - 1; i >= 0; i--) {
    heapify(arr, i, arr.length);
  }
};
//取出最大元素重建堆
let heapify = function (arr, i, len) {
  let left = 2 * i + 1;
  let right = 2 * i + 2;
  let largest = i;
  if (left < len && arr[left] > arr[largest]) {
    largest = left;
  }
  if (right < len && arr[right] > arr[largest]) {
    largest = right;
  }
  if (largest != i) {
    swap(arr, i, largest);
    heapify(arr, largest, len); //递归调整因为改变了值受影响的下面的堆
  }
};
function swap(arr, i, j) {
  let temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}
function heapSort(arr) {
  let len = arr.length;
  buildheap(arr);
  for (let i = len - 1; i > 0; i--) {
    swap(arr, 0, i); //此时最后一个节点为最大值
    len--; //去掉不需要再参与排序的节点
    heapify(arr, 0, len); //从第一个节点开始重新建堆
  }
  return arr;
}
let arr = [1, 4, 5, 6, 2];
console.log(heapSort(arr));
