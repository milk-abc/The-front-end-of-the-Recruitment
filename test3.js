// /**
//  * 给定一个排序数组和一个目标值，在数组中找到目标值，并返回其索引。如果目标值不存在于数组中，返回它将会被按顺序插入的位置。

// 请必须使用时间复杂度为 O(log n) 的算法。

// 示例 1:

// 输入: nums = [1,3,5,6], target = 5
// 输出: 2
// 示例 2:

// 输入: nums = [1,3,5,6], target = 2
// 输出: 1
// 示例 3:

// 输入: nums = [1,3,5,6], target = 7
// 输出: 4
//  */
// const insertNum = (nums, target) => {
//   let left = 0,
//     right = nums.length - 1;
//   let mid = Math.floor((left + right) / 2);
//   let res = -1;
//   while (left < right) {
//     if (target < nums[mid]) {
//       right = nums[mid - 1];
//       mid = Math.floor((left + right) / 2);
//     } else if (target > nums[mid]) {
//       left = nums[mid + 1];
//       mid = Math.floor((left + right) / 2);
//     } else {
//       break;
//     }
//   }
//   return res === -1 ? left + 1 : mid;
// };
// let nums = [1, 3, 5, 6],
//   target = 7;
// console.log('1',insertNum(nums, target));
// nums = [1,3,5,6], target = 2
// console.log('2',insertNum(nums, target));
/**
 * const array = [
    {id: 1, parent: -1},
    {id: 2, parent: 1},
    {id: 3, parent: 2},
    {id: 4, parent: 2},
    {id: 5, parent: -1},
    {id: 6, parent: 4},
]
// 根据给出的数组生成树形结构，-1为根节点
type TreeItem = {
    id: number,
    children: TreeItem[]
}
type tree = TreeItem[]; 
 */
// const arrayToTree=(array)=>{
//     let tree=[];
//     const root=new TreeItem(-1,[]);
//     array.forEach((item)=>{
//         if(item.parent===-1){
//             root.children.push({id:tem.id,children:levelTransform(-1,item.id)})
//         }
//     })
//     return root;
// }
// const levelTransform=(node,id)=>{
//     const children=[];
//     array.forEach((item)=>{
//         if(item.parent===id){
//             children.push({item.id,children:levelTransform(id,item.id)})
//         }
//     })
//     node.children=children;
//     return children;
// }
// const array = [
//     {id: 1, parent: -1},
//     {id: 2, parent: 1},
//     {id: 3, parent: 2},
//     {id: 4, parent: 2},
//     {id: 5, parent: -1},
//     {id: 6, parent: 4},
// ]
// // 根据给出的数组生成树形结构，-1为根节点
// type TreeItem = {
//     id: number,
//     children: TreeItem[]
// }
// type tree = TreeItem[];

// let arr = [2, [1, 2, 3], [4, 5], [5, 6, [7]]]; //求数组深度
// let arr = [1, 2, [3, [4, 5], 6], 7, [8, 9]];
// let change = function (arr) {
//   let obj = {};
//   obj.children = [];
//   for (let i = 0; i < arr.length; i++) {
//     let temp = {};
//     if (Array.isArray(arr[i])) {
//       temp = change(arr[i]);
//     } else {
//       temp.value = arr[i];
//     }
//     obj.children.push(temp);
//   }
//   return obj;
// };
// console.log(JSON.stringify(change(arr)));
// const change = function (arr) {
//   let obj = {};
//   obj.children = [];
//   for (let i = 0; i < arr.length; i++) {
//     let temp = {};
//     if (Array.isArray(arr[i])) {
//       temp = change(arr[i]);
//     } else {
//       temp.value = arr[i];
//     }
//     obj.children.push(temp);
//   }
//   return obj;
// };
// const res = change(arr);
// console.log("res", res);
const addString = (str1, str2) => {
  let pointer1 = str1.length - 1,
    pointer2 = str2.length - 1;
  let res = "";
  let count = 0;
  while (pointer1 >= 0 || pointer2 >= 0) {
    if (pointer1 >= 0 && pointer2 >= 0) {
      let temp = Number(str1[pointer1]) + Number(str2[pointer2]) + count;
      count = Math.floor(temp / 10);
      res = String(temp % 10) + res;
      pointer1 -= 1;
      pointer2 -= 1;
    } else if (pointer1 >= 0) {
      let temp = Number(str1[pointer1]) + count;
      count = Math.floor(temp / 10);
      res = String((temp % 10) + count) + res;
      pointer1 -= 1;
    } else if (pointer2 >= 0) {
      let temp = Number(str2[pointer2]) + count;
      count = Math.floor(temp / 10);
      res = String((temp % 10) + count) + res;
      pointer2 -= 1;
    }
  }
  return res;
};
console.log(addString("123", "123"));
console.log(addString("155", "155"));
console.log(addString("5", "15"));
// const sliderWindow = (nums, k) => {
//   let left = 0,
//     right = k;
//   const len = nums.length;
//   const res = [];
//   //排序找出最大值，暴力法
//   while (right <= len) {
//     let temp = nums.slice(left, right);
//     let maxValue = Math.max(...temp);
//     res.push(maxValue);
//     left += 1;
//     right += 1;
//   }
//   return res;
// };
// let nums = [1, 3, -1, -3, 5, 3, 6, 7];
// let k = 3;
// console.log(sliderWindow(nums, k));
const myInstanceOf = (a, b) => {
  //一直递归查找a的原型链是不是等于b的原型
  let proto = a.__proto__;
  while (proto) {
    if (proto === b.prototype) {
      return true;
    }
    proto = proto.__proto__;
  }
  return false;
};
