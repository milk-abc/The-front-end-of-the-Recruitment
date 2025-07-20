let obj={name:'yuv',hobbits:['travel','reading'],info:{
  age:20,
  job:'engineer'
}};
// let temp='yuv';
// Object.defineProperty(obj,'info',{
//   get(){
//     console.log('读取成功');
//     return temp
//   },
//   set(value){
//     console.log('设置成功');
//     temp=value;
//   }
// });
// obj.info.age=2;
// console.log(obj.info);
let p=new Proxy(obj,{
  get(target,key){
    console.log('读取成功');
    return Reflect.get(target,key);
  },
  set(target,key,value){
    if(key==='length'){
      return true;
    }
    console.log('设置成功');
    return Reflect.set([target,key,value])
  }
});
p.name=20;
p.age=20;
p.hobbits.push('photography');
p.info.age=18;
console.log('p',p)



