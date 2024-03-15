let str = "  Hello, World!   ";

// 方法1：使用赋值运算符
str = str.trim();

// 方法2：使用原始字符串的 replace() 方法
str = str.replace(/^\s+|\s+$/g, "");
