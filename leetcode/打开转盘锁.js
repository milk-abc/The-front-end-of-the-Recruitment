var openLock = function (deadends, target) {
  let plusOne = function (s, j) {
    let arr = s.split("");
    if (arr[j] === "9") {
      arr[j] = "0";
    } else {
      arr[j] = parseInt(arr[j]) + 1;
    }
    return arr.join("");
  };
  let minusOne = function (s, j) {
    let arr = s.split("");
    if (arr[j] === "0") {
      arr[j] = "9";
    } else {
      arr[j] = parseInt(arr[j]) - 1;
    }
    return arr.join("");
  };
  let deads = new Set();
  for (let dead of deadends) {
    deads.add(dead);
  }
  let vis = new Set();
  let q1 = new Set();
  let q2 = new Set();
  q1.add("0000");
  q2.add(target);
  let step = 0;
  let temp;
  console.log(q1.size);
  while (q1.size && q2.size) {
    console.log("q1", q1, "q2", q2);
    temp = new Set();
    for (let cur of q1) {
      if (deads.has(cur)) {
        continue;
      }
      if (q2.has(cur)) {
        return step;
      }
      vis.add(cur);
      for (let j = 0; j < 4; j++) {
        let up = plusOne(cur, j);
        let down = minusOne(cur, j);
        if (!vis.has(up)) {
          temp.add(up);
        }
        if (!vis.has(down)) {
          temp.add(down);
        }
      }
    }
    step++;
    q1 = q2;
    q2 = temp;
  }
  return -1;
};
let deadends = ["8888"];
let target = "0009";
let res = openLock(deadends, target);
console.log(res);
