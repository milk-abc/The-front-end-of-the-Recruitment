"use strict";
// /**
//  * 已知圆心和圆上一点A的坐标，求圆的内接正n边形的点的坐标，A为其中一个点。
//  */
// const computeCoords=(start,point,n)=>{
//   const radius=Math.sqrt(Math.pow(point.x-start.x,2)+Math.pow(point.y-start.y,2));
//   let angles=2*Math.PI/n;
//   let temp=angles/2;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PromisePoolDynamic = void 0;
/**动态并发池 */
var PromisePoolDynamic = /** @class */ (function () {
    /**动态并发池 - 构造函数
     * @param maxConcurrency 最大并发数量
     */
    function PromisePoolDynamic(maxConcurrency) {
        this.limit = maxConcurrency;
        this.runningCount = 0;
        this.queue = [];
    }
    /**添加任务
     * @param task 任务，() => Promise<T>
     * @returns 结果
     */
    PromisePoolDynamic.prototype.addTask = function (task) {
        var _this = this;
        //返回一个新的Promise实例，在任务完成前，会一直是pending状态
        return new Promise(function (resolve, reject) {
            var taskWithCallbacks = { task: task, resolve: resolve, reject: reject };
            if (_this.runningCount < _this.limit) { //并发数量没满则运行
                console.log('任务添加：当前并发数', _this.runningCount, '并发数量未满，直接运行');
                _this.runTask(taskWithCallbacks);
            }
            else { //并发数量满则加入等待队列
                console.log('任务添加：当前并发数', _this.runningCount, '并发数量满，挂起等待');
                _this.queue.push(taskWithCallbacks);
            }
        });
    };
    /**运行任务
     * @param taskWithCallback 带有resolve和reject的任务
     */
    PromisePoolDynamic.prototype.runTask = function (taskWithCallback) {
        var _this = this;
        this.runningCount++; //当前并发数++
        taskWithCallback.task() //从对象中取出任务执行
            .then(function (result) {
            _this.runningCount--;
            taskWithCallback.resolve(result);
            console.log('任务完成', result, '当前并发数', _this.runningCount);
            _this.checkQueue();
        })
            .catch(function (error) {
            _this.runningCount--;
            taskWithCallback.reject(error);
            _this.checkQueue();
        });
    };
    /**运行完成后，检查队列，看看是否有在等待的，有就取出第一个来运行 */
    PromisePoolDynamic.prototype.checkQueue = function () {
        if (this.queue.length > 0 && this.runningCount < this.limit) {
            var nextTask = this.queue.shift();
            console.log('并发池出现空位，取出等待队列的任务', nextTask);
            this.runTask(nextTask);
        }
    };
    return PromisePoolDynamic;
}());
exports.PromisePoolDynamic = PromisePoolDynamic;
