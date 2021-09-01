https://blog.csdn.net/viewyu12345/article/details/79171215
1.onclick事件在同一时间只能指向唯一对象

2.addEventListener给一个事件注册多个listener

3.addEventListener对任何DOM都是有效的，而onclick仅限于HTML

4.addEventListener可以控制listener的触发阶段，（捕获/冒泡）。对于多个相同的事件处理器，不会重复触发，不需要手动使用removeEventListener清除

5.IE9使用attachEvent和detachEvent

onclick添加事件
element.onclick = functionRef;
删除事件
element.onclick = null;
一个click处理器在同一时间只能指向唯一的对象。因此就算对于一个对象绑定了多次，但是仍然只会出现最后的一次绑定。

addEventListener绑定click事件
currentTarget.addEventListener(type, listener, option)
两次绑定的事件，都能够成功运行，也就是前后弹出 ‘我是addEvent1’ '我是addEvent2'

由此可知，对于一个可以绑定的事件对象，想多次绑定事件都能运行，选用addEventListener

通过addEventListener添加的事件必须通过相对应的为removeListener注销事件。但是如果用匿名函数的方式注册的事件，不能使用removeListener注销，因为没用对应事件的引用。
也正是这种方式，对于一个对象多次绑定同样的eventName，那么不会重复执行，只会执行一次。对于上面的匿名函数，就算内容一样，也会依次执行，因为并不能算是相同事件处理器。

里面的this引用，不是window对象，而是触发事件的元素的引用。