class Observer {
  constructor(value) {
    this.walk(value);
  }
  walk(obj) {
    Object.keys(obj).forEach((key) => {
      if (typeof obj[key] === "object") {
        this.walk(obj[key]);
      }
      defineReactive(obj, key, obj[key]);
    });
  }
}
function defineReactive(obj, key, value) {
  let dep = new Dep();
  Object.defineProperty(obj, key, {
    get: () => {
      if (Dep.target) {
        dep.add(Dep.target);
      }
      return value;
    },
    set: (newvalue) => {
      value = newvalue;
      dep.notify();
    },
  });
}
export function observer(value) {
  return new Observer(value);
}
export class Dep {
  constructor() {
    this.deppend = [];
  }
  add() {
    this.deppend.push(Dep.target);
  }
}
