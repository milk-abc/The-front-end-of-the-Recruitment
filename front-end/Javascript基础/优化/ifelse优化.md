三目运算符
策略模式
function func() {
  if (type === 'a') {
    // 执行内容 1
  } else if (type === 'b') {
    // 执行内容 2
  } else if (type === 'c') {
    // 执行内容 3
  }
  // 后续代码
}

// 使用策略模式优化
function func() {
  let handlerA = () => { console.log('执行内容1') }
  let handlerB = () => { console.log('执行内容2') }
  let handlerC = () => { console.log('执行内容3') }
  let handlerMap = {
    a: handlerA,
    b: handlerB,
    c: handlerC
  }
  handlerMap[type] && handlerMap[type]()
  // 后续代码
}