class promisePoolDynamic {
  constructor(limit) {
    this.limit = limit;
    this.runningTask = 0;
    this.queue = [];
  }
  addTask(task) {
    //返回一个新的Promise实例，在任务完成前，会一直是pending状态
    return new Promise((resolve, reject) => {
      const taskWithCallbacks = { task, resolve, reject };
      if (this.runningCount < this.limit) {
        console.log(
          "任务添加：当前并发数",
          this.runningCount,
          "并发数量未满，直接运行"
        );
        this.runTask(taskWithCallbacks);
      } else {
        console.log(
          "任务添加：当前并发数",
          this.runningCount,
          "并发数量满，挂起等待"
        );
        this.queue.push(taskWithCallbacks);
      }
    });
  }
  runTask(taskWithCallbacks) {
    this.runningTask += 1;
    taskWithCallbacks
      .task()
      .then((value) => {
        this.runningTask -= 1;
        taskWithCallbacks.resolve(result);
        console.log("任务完成", result, "当前并发数", this.runningTask);
        this.checkQueue();
      })
      .catch((error) => {
        this.runningTask -= 1;
        taskWithCallbacks.reject(error);
        console.log("任务拒绝", result, "当前并发数", this.runningTask);
        this.checkQueue();
      });
  }
  checkQueue() {
    if (this.queue.length > 0 && this.runningTask < this.limit) {
      const nextTask = this.queue.shift();
      console.log("并发池出现空位，取出等待队列的任务", nextTask);
      this.runTask(nextTask);
    }
  }
}
const getTask = () => {
  return async () => {
    await new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve();
      }, 100);
    });
    return new Date();
  };
};
const promisePool = new promisePoolDynamic(3);
promisePool.addTask(getTask());
