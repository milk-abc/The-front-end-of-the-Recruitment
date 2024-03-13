function debounce(fn, delay) {
  let timer;
  return function(){
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn(...arguments);
    }, delay);
  };
}
// function throttle(fn,delay){
// 	let timer=null;
// 	return function(){
// 		if(timer){
// 			return
// 		}
// 		timer=setTimeout(()=>{
// 			fn(...arguments)
// 			timer=null
// 		},delay)
// 	}
// }
function throttle(fn,delay){
	let timer=null;
	return function(){
		if(timer){
			return;
		}
		timer=setTimeout(()=>{
			fn(...arguments)
			timer=null
		})

	}
}
