var foo = 1;
function bar() {
  //foo变量提升到这里var foo;值为undefined
  if (!foo) {
    var foo = 10;
  }
  console.log(foo);
}
bar();
