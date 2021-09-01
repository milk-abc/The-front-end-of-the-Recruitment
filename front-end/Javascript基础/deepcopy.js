//浅拷贝：concat,slice,object.assign，扩展运算符
//深拷贝：json.parse(json.stringify())，
//json.stringify在对象中遇到undefined,symbol,function会自动忽略，在数组则会返回null
let deepcopy=function(obj) {
    if(typeof obj!=='object'){
        // 只拷贝对象
        return;
    }
    // 根据obj的类型判断是新建一个数组还是对象
    let newObj=obj instanceof Array ? [] : {};
    // 遍历obj，并且判断是obj的属性才拷贝
    for(let key in obj){
        if(obj.hasOwnProperty(key)){
            newObj[key]=typeof obj[key]==='object' ? deepcopy(obj[key]) : obj[key];
        }
    }
}
