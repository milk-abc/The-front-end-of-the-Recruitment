//on 是订阅  emit 发布

//邮局
let e={
	//存订阅者
	_callback:[],
	//订阅
	on(callback){
		this._callback.push(callback);
	}
	//发布
	emit(value){
		this._callback.forEach(method=>{
			method(value);
		})
	}
}
//订阅
e.on(function(value){
	console.log("张三订阅："+value)
})
e.on(function(value){
	console.log("李四订阅："+value)
})
e.on(function(value){
	console.log("王五订阅："+value)
})
e.emit("人民日报")
