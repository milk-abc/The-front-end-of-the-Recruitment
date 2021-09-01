// //// 前瞻：
// exp1(?=exp2) 查找exp2前面的exp1
// // 后顾：
// (?<=exp2)exp1 查找exp2后面的exp1
// // 负前瞻：
// exp1(?!exp2) 查找后面不是exp2的exp1
// // 负后顾：
// (?<!exp2)exp1 查找前面不是exp2的exp1
//"中国人".replace(/(?<=中国)人/, "rr") // 匹配中国人中的人，将其替换为rr，结果为 中国rr
// 数字格式化 1,123,000
//"1234567890".replace(/\B(?=(?:\d{3})+(?!\d))/g,",")
// 结果：1,234,567,890，匹配的是后面是3*n个数字的非单词边界(\B)
// function isAvailableEmail(sEmail) {
//   // let reg = new RegExp("^[.\\w]+(@[\\w]+){1}(\\.[\\w]+)+$", "g");//在RegExp中要多加\
//   return /^[.\w]+@[\w]+(\.[\w]+)+$/.test(sEmail);
// }
// console.log(isAvailableEmail("fro@coder.com"));
// let email = "3292944779@qq.com";
// console.log(
//   /[\d\_\-\.a-zA-Z]+@[\d\_\-\.a-zA-Z]+(\.[\d\_\-\.a-zA-Z]+)/.test(email)
// );
console.log("abc" + 100);
