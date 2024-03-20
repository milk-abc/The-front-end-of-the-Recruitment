代码一旦开始以异步模式执行，则唯一与之交互的方式就是使用异步结构-期约的方式。try catch 无法捕获。
promise 有 pending,resolved,rejected 状态，其实例的方法是连接外部同步代码与内部异步代码之间的桥梁。这些方法可以访问异步操作返回的数据，处理 promise 成功和失败的结果。

##### promise.prototype.then()：是为期约实例添加处理程序的主要方法，这个then方法接收最多两个参数：onResolved处理程序和onRejected处理程序，这两个参数都是可选的，如果提供的话，则会在期约分别进入“兑现”和“拒绝”状态时执行。

promise.prototype.then(onResolved,onRejected)

##### promise.prototype.catch()：用于给期约添加拒绝处理程序。这个方法只接收一个参数：OnRejected处理程序。事实上，这个方法就是一个语法糖，调用它就相当于调用promise.prototype.then(null,onRejected)

##### promise.prototype.finally()：用于给期约添加onfinally处理程序，这个处理程序在期约转换为解决或拒绝状态时都会执行。这个方法可以避免onResolved,onRejected处理程序中出现冗余代码。但onfinally处理程序没有办法知道期约的状态是解决还是拒绝，所以这个方法主要用于添加清理代码。

