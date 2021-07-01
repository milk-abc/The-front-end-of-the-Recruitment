var p1 = new Promise((resolve, reject) => {
    setTimeout(()=>{
        console.log('p1');
        resolve("one")
    });
  });
  var p2 = new Promise((resolve, reject) => {
    setTimeout(()=>{
        console.log('p2');
        resolve('two')
    });
  });
  
  Promise.all([p1, p2]).then(values => {
    console.log(values);
  }, reason => {
    console.log(reason)
  });
