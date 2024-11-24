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
// class PubSub{
// 	constructor(){

// 	}
// }
// class Publisher{

// }
// class Subscriber{

// }
// const TYPE_A="music";
// const TYPE_B="movie";
// const TYPE_C="novel";

// const pubsub=new PubSub();
// const publisherA=new Publisher('publisherA',pubsub);
// publisherA.publish(TYPE_A,"music");
// publisherA.publish(TYPE_B,"movie");
// const subscriberA=new Subscriber('subscriberA',pubsub);
// subscriberA.subscribe(TYPE_A,function(data){
//     console.log("subscriberA",data);
// });
function promiseLimit(axios) {
  let runningCount = 0;
  const limit = 2;
  const queue = [];
  return function (url) {
    function getTask() {
      return async () => {
        await new Promise((resolve) => {
          setTimeout(resolve, 1000);
        });
        return new Date();
      };
      // return new Promise((resolve, reject) => {
      // 	axios.get(url).then(res => {
      // 		resolve(res.data);
      // 	}).catch(err => {
      // 		reject(err);
      // 	})
      // })
    }
    function addTask(task) {
      return new Promise((resolve, reject) => {
        const taskWithCallbacks = { task, resolve, reject };

        runningCount++;
        if (runningCount < limit) {
          axios.get(url).then((res) => {
						
            resolve(res);
            runningCount--;
            if (queue.length > 0) {
              let nextUrl = queue.shift();
              axios.get(nextUrl).then((res) => {});
            }
          });
        } else {
          queue.push(url);
        }
      });
    }
  };
}
