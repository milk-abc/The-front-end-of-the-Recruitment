// 异步事件setInterval到时后会把回调函数放入消息队列中eventqueue，
// 主线程的宏任务执行完毕后依次执行消息队列的微任务，
// 等微任务执行完了再循环回来执行宏任务。如果消息队列中存在大量任务，
// 其他任务执行时间就会造成定时器回调函数的延迟，如果不处理则会一直叠加延迟。
// 解决方案
//https://developer.51cto.com/art/202104/658534.htm
//1.直接setTimeout嵌套循环触发，但如果setTimeout触发前有大量同步事件
//会阻塞到点的宏任务执行，产生误差
//2.希望能够主动去触发获取最开始的时间，以及不断的去轮询当前时间
//如果差值是预期的时间，那么这个定时器肯定是准确的，但是容易卡死页面
//function timer(time) {
// 	const startTime = Date.now();
// 	while(true) {
// 			const now = Date.now();
// 			if(now - startTime >= time) {
// 					console.log('误差', now - startTime - time);
// 					return;
// 			}
// 	}
// }
// timer(5000);
//3.用webworker新开一个线程去运行那个代码，但是worker线程会被while给占用，
//导致无法接受到信息，多个定时器无法同时执行，另一方面，由于onmessage还是
//属于事件循环内，如果主线程有大量阻塞还是会让时间越差越大
//4.requestAnimationFrame()希望执行一个动画，并且要求浏览器在下次重绘之前调用指定
//的回调函数更新动画。该方法需要传入一个回调函数作为参数，该回调函数会在浏览器
//下一次重绘之前执行，回调函数执行次数通常是每秒60次，也就是每16.7ms执行一次，
//但是并不一定保证为16.7ms
// 模拟代码
// function setTimeout2 (cb, delay) {
// 	let startTime = Date.now()
// 	loop()

// 	function loop () {
// 		const now = Date.now()
// 		if (now - startTime >= delay) {
// 			cb();
// 			return;
// 		}
// 		requestAnimationFrame(loop)
// 	}
// }
//5.setTimeout系统时间补偿
function timer() {
  var speed = 50,
    counter = 1,
    start = new Date().getTime();
  function instance() {
    var ideal = counter * speed;
    real = new Date().getTime() - start;
    counter++;
    console.log("idea", ideal);
    console.log("real", real);
    let diff = real - ideal;
    console.log("diff", diff);
    setTimeout(function () {
      instance();
    }, speed - diff);
  }
  setTimeout(function () {
    instance();
  }, speed);
}
timer();
