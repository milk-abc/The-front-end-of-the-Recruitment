// var p1 = new Promise((resolve, reject) => {
//     setTimeout(()=>{
//         console.log('p1');
//         resolve("one")
//     });
//   });
//   var p2 = new Promise((resolve, reject) => {
//     setTimeout(()=>{
//         console.log('p2');
//         resolve('two')
//     });
//   });

//   Promise.all([p1, p2]).then(values => {
//     console.log(values);
//   }, reason => {
//     console.log(reason)
//   });
const p = new Promise((resolve, reject) => {
  resolve(1);
  // reject(1);
})
  .then(
    (value) => {
      console.log("resolve0", value);
      return 2; //同步任务可以直接return返回作为下一个then的参数值
    },
    //不写error回调函数的默认回调函数
    (reason) => {
      throw reason;
    }
  )
  .then(
    (value) => {
      console.log("resolve1", value);
      throw 3;
      // return new Promise((resolve, reject) => {
      //   setTimeout(() => {
      //     //异步任务必须要包在promise中才能作为下一个then的参数
      //     resolve(3);
      //   }, 1000);
      // });
    },
    (reason) => {
      Promise.reject(reason);
    }
  )
  .then(
    (value) => {
      console.log("resolve2", value);
    },
    (reason) => {
      throw reason; //异常穿透
    }
  )
  .catch((reason) => {
    console.log("reject3", reason);
    // throw reason;
    //return Promsie.reject(reason);
    return new Promise(() => {}); //返回一个pending的promise
    //实现中断promise链
  })
  .then(
    (value) => {
      console.log("resolve2", value);
    },
    (reason) => {
      console.log("reject3", reason);
    }
  );
