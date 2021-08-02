//记住instanceof是右边变量的原型在左边变量的原型链上
function newinstance(name){
    this.name=name;
}
let instance=new newinstance('l');
console.log(instance instanceof newinstance)
function instanceof1(obj1,obj2) {
    let obj2proto=obj2.prototype;
    obj1proto=obj1.__proto__;
    while(true){
        if(obj1proto==null){
            return false;
        }
        if(obj1proto==obj2proto){
            return true;
        }
        obj1proto=obj1proto.__proto__;
    }
}