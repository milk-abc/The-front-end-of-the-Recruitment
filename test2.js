// // Object.prototype.a = "a";
// // Function.prototype.a = "a1";
// // // function Person() {}
// // const Person = function () {};
// // var newPerson = new Person();
// // console.log(Person.a);
// // console.log(newPerson.a);
// // console.log(newPerson.__proto__.constructor === Person);
// // console.log(
// //   newPerson.__proto__.__proto__.constructor.constructor.constructor === Function
// // );

// class History {
//   constructor() {
//     this.history = [];
//     this.current = 0;
//   }
//   perform(name) {
//     while (this.current < this.history.length - 1) {
//       this.history.pop();
//     }
//     this.history.push(name);
//     this.current = this.history.length - 1;
//   }
//   undo() {
//     if (this.current > 0) this.current--;
//   }
//   redo() {
//     if (this.current < this.history.length - 1) this.current++;
//   }
//   getCurrent() {
//     return this.history[this.current];
//   }
// }
// const historyFn = new History();
// historyFn.perform("1");
// console.log("current1", historyFn.getCurrent());
// historyFn.perform("2");
// console.log("current2", historyFn.getCurrent());
// historyFn.perform("3");
// console.log("current3", historyFn.getCurrent());
// historyFn.undo();
// console.log("current4", historyFn.getCurrent());
// historyFn.undo();
// console.log("current5", historyFn.getCurrent());
// historyFn.redo();
// console.log("current6", historyFn.getCurrent());
// historyFn.perform("4");
// console.log("current7", historyFn.getCurrent());


