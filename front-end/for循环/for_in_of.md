for in 会遍历对象自身和原型中可枚举属性
如果不想遍历原型属性用 hasOwnProperty
Object.keys()返回一个不包含原型的属性的数组
Object.getOwnPropertyNames()返回不含原型的所有实例属性
for of 不仅支持数组，还支持大多数类数组对象和字符串
