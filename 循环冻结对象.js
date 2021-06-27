function freeze(obj){
    Object.freeze(obj);
    for(let key in obj){
        if(typeof(obj[key])=="object"){
            freeze(obj[key])
        }
    }
}
const obj={
    one:{
        name: 'Scarlett',
        age: 37,
        [Symbol()]: 'Johansson'
    }
}
freeze(obj)
obj.one.newprop=2
delete obj.one
obj.one.name='lq'
console.log(obj)//顺着作用域链往外找能找到的