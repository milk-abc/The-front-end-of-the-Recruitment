class EventBus {
  constructor() {
    this.events = {};
  }
  on(event, callback) {
    let callbacks = this.events[event] || [];
    callbacks.push(callback);
    return this;
  }
  emit(args) {
    let event = args[0];
    let params = [].slice.call(args, 1);
    let callbacks = this.events[event];
    callbacks.forEach((callback) => callback.apply(this, params));
    return this;
  }
  off(event, callback) {
    let callbacks = this.events[event];
    if (callbacks) {
      this.events[event] = this.callbacks.filter((fn) => fn !== callback);
    }
    return this;
  }
  once(event, callback) {
    let fn = (...args) => {
      callback.apply(this, args);
      this.off(event, callback);
    };
    this.on(event, fn);
  }
}
