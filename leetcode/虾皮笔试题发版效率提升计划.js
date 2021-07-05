// 发版效率提升计划
// failed是发版失败次数,total是总发版次数,dependencies是依赖关系
// 随着 Shopee 业务的不断扩张，项目数量越来越多。为了做到有序发版，小李需要先统计出当前发版的成功率，再做针对性的优化。

// 首先，在不考虑依赖的情况下，项目有两个数据：总发版次数 total、发版失败的次数 fail。我们认为 (total-fail)/total*100% 就是这个项目“自身的成功率”。

// 其次，如果一个项目依赖了多个项目，那么这个项目的成功率应当是：该项目的自身成功率*所有依赖项都成功的概率。

// 整个系统发版的成功率就是：所有最下游（不依赖任何项目）的项目都成功的概率。

// 小李想选择一个项目做优化，把项目的自身成功率增加到 1。他想知道，这最多可以让系统的发版成功率增加到多少。返回的结果请使用 xxx% 的格式，四舍五入保留 6 位小数（注意 JavaScript 中的 toFixed 不是四舍五入，请自行使用 Math.round 来处理）。

// P.S. 我们认为整个系统有 N 个项目，编号分别是 0～N-1
var deploy = function (failed, total, dependencies) {
  let ans = 1;
  let score = [];
  let N = failed.length;
  for (let i = 0; i < failed.length; i++) {
    let temp = (total[i] - failed[i]) / total[i];
    score.push(temp);
  }
  let adj = new Array(N);
  let indegree = new Array(N).fill(0);
  for (let i = 0; i < N; i++) {
    adj[i] = new Array();
  }
  for (let i = 0; i < N; i++) {
    if (dependencies[i].length === 0) {
      score[i] = 1;
    }
    for (let j = 0; j < dependencies[i].length; j++) {
      adj[dependencies[i][j]].push(i);
      indegree[i] += 1;
    }
  }
  let queue = [];
  for (let i = 0; i < indegree.length; i++) {
    if (indegree[i] === 0) {
      queue.push(i);
    }
  }
  while (queue.length) {
    let pre = queue.shift();
    for (let i = 0; i < adj[pre].length; i++) {
      let index = adj[pre][i];
      score[index] *= score[pre];
      if (!queue.includes(adj[pre][i])) {
        queue.push(adj[pre][i]);
      }
    }
  }
  ans = score[score.length - 1];
  ans = (Math.round(ans * 1000000) / 10000).toFixed(6) + "%";
  return ans;
};
let ans = deploy(
  [1, 1, 1, 1, 1],
  [10, 10, 10, 10, 10],
  [[], [0], [0], [1, 2], [3]]
);
console.log(ans);
