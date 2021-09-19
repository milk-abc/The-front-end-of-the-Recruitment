class queue {
  constructor() {
    this.data = [];
  }
  enqueue(element) {
    this.data.push(element);
  }
  dequeue() {
    return this.data.shift();
  }
}
