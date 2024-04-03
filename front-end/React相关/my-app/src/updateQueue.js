export class Update {
  constructor(payload) {
    this.payload = payload;
  }
}
// 给setState创建事件更新队列
export class UpdateQueue {
  constructor() {
    this.firstUpdate = null;
    this.lastUpdate = null;
  }
  enqueueUpdate(update) {
    // 如果this.lastUpdate不存在，说明队列还没开始创建，则把update赋值给 头和尾
    if (this.lastUpdate === null) {
      this.firstUpdate = this.lastUpdate = update;
    }
    // 如果this.lastUpdate尾存在，说明队列已经存在，将update更新事件加到上次队列之后，并把update设置为队列尾
    else {
      this.lastUpdate.nextUpdate = update;
      this.lastUpdate = update;
    }
  }
  forceUpdate(state) {
    // 更新队列，从头开始进行更新
    let currentUpdate = this.firstUpdate;
    // currentUpdate存在值，说明队列还没更新完
    while (currentUpdate) {
      let nextState =
        typeof currentUpdate.payload === "function"
          ? currentUpdate.payload(state)
          : currentUpdate.payload;
      state = { ...state, ...nextState };
      currentUpdate = currentUpdate.nextUpdate;
    }
    this.firstUpdate = this.lastUpdate = null;
    return state;
  }
}
