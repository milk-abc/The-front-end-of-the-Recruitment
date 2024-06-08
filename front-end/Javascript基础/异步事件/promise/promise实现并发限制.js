/**
 * 动态并发池
 */
class PromisePoolDynamic {
  /**最大并发量 */
  /**当前在跑的数量 */
  /**等待队列 */
  /**
   * @param maxConcurrency 最大并发量
   */
  constructor(maxConcurrency) {
    this.limit = maxConcurrency;
    this.runningCount = 0;
    this.queue = [];
  }
  /**
   * 添加任务
   *@param task 任务,()=>Promise<T>
   */
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
  /**
   * 运行任务
   */
  runTask(taskWithCallback) {
    this.runningCount += 1;
    taskWithCallback
      .task()
      .then((result) => {
        this.runningCount -= 1;
        taskWithCallback.resolve(result);
        console.log("任务完成", result, "当前并发数", this.runningCount);
        this.checkQueue();
      })
      .catch((error) => {
        this.runningCount -= 1;
        taskWithCallback.reject(error);
        this.checkQueue();
      });
  }
  /**
   * 检查队列
   */
  checkQueue() {
    if (this.queue.length > 0 && this.runningCount < this.limit) {
      const nextTask = this.queue.shift();
      console.log("并发池出现空位，取出等待队列的任务", nextTask);
      this.runTask(nextTask);
    }
  }
}

/**创造一个1s后得到结果的Promise */
const getTask = () => {
  return async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return new Date();
  };
};

/**动态并发池的测试用例 */
const promisePoolDynamicTest = () => {
  const promisePoolDynamic = new PromisePoolDynamic(3); //一个最大并发3的动态并发池
  //最大并发3，我一次性添加7个任务
  promisePoolDynamic.addTask(getTask());
  promisePoolDynamic.addTask(getTask());
  promisePoolDynamic.addTask(getTask());
  promisePoolDynamic.addTask(getTask());
  promisePoolDynamic.addTask(getTask());
  promisePoolDynamic.addTask(getTask());
  promisePoolDynamic.addTask(getTask());
};
promisePoolDynamicTest();
