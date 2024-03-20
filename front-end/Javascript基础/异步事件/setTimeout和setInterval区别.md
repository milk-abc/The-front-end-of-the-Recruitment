setTimeout 允许我们将函数推迟到一段时间间隔之后再执行,setTimeout(func,time,args,args,...)
setInterval 允许我们重复运行一个函数，从一段时间间隔之后开始运行，之后以该时间间隔连续重复运行该函数。
let i = 1;
setInterval(function() {
func(i++);
}, 100);
对 setInterval 而言，内部的调度程序会每隔 100 毫秒执行一次 func(i++)
使用 setInterval 时，func 函数的实际调用间隔要比代码中设定的时间间隔要短，因为 func 的执行所花费的时间消耗
了一部分间隔时间。也可能出现这种情况，就是 func 的执行所花费的时间比我们预期的时间更长，并且超出了 100ms。
在这种情况下，javascript 引擎会等待 func 执行完成，然后检查调度程序，如果时间到了，则立即再次执行它。

|func(1)---|func(2)----|
100 100
