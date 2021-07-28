var x = 11;
var obj = {
  x: 22,
  say: () => {
    console.log(this.x);
  },
};
obj.say();
