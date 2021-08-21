let line = readline();
let arr = line.split(" ").map((item) => parseInt(item));
let n = arr.length;
let left = new Array(n);
for (let i = 0; i < n; i++) {
  if (i > 0 && arr[i] > arr[i - 1]) {
    left[i] = left[i - 1] + 1;
  } else {
    left[i] = 1;
  }
}
let right = 0,
  res = 0;
for (let i = n - 1; i >= 0; i--) {
  if (i < n - 1 && arr[i] > arr[i - 1]) {
    right++;
  } else {
    right = 1;
  }
  res += Math.max(left[i], right);
}
console.log(res);
