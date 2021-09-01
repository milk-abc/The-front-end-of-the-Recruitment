class EventEmitter {
  constructor() {
    this._events = {}
  }
  on(event, callback) {
    let callbacks = this._events[event] || []
    callbacks.push(callback)
    this._events[event] = callbacks
    return this
  }
  off(event, callback) {
    let callbacks = this._events[event]
    if (callbacks) {
      this._events[event] = callbacks.filter(fn => fn !== callback)
    }
    return this
  }
  emit(...args) {
    const event = args[0]
    const params = [].slice.call(args, 1)
    const callbacks = this._events[event]
    callbacks.forEach(fn => fn.apply(this, params))
    return this
  }
  once(event, callback) {
    let fn = (...args) => {
      callback.apply(this, args)
      this.off(event, fn)
    }
    this.on(event, fn)
    return this
  }
}
const emitter = new EventEmitter();
function f1(man) {
  console.log(`kill ${man}`);
}
emitter.on('arson', man => {
  console.log(`expel ${man}`);
});
emitter.on('arson', man => {
  console.log(`save ${man}`);
});
emitter.on('arson', f1);
emitter.emit('arson', 'low-end');
emitter.off('arson', f1);
emitter.emit('arson', 'low-end');