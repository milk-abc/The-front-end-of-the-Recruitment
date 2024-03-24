##### webpack模块打包

webpack根据webpack.config.js中的入口文件，在入口文件里识别模块依赖，模块依赖可以用CommonJS【同步】写，也可以用ES6 Module规范写，甚至可以两者混合使用。因为从webpack2开始，内置了对ES6、CommonJS、AMD模块化语句的支持，webpack会对各种模块进行语法分析，并做转换编译。

#### 可以用bundle.js进行调试
