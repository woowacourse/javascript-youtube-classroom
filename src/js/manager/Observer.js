export default class Observer {
  constructor() {
    this.handlers = new Map();
    this.handlerIndex = 0;
  }

  subscribe(handler) {
    this.handlers.set(++this.handlerIndex, handler);
    return this.handlerIndex;
  }

  unsubscribe(index) {
    this.handlers.delete(index);
  }

  notify() {
    this.handlers.forEach((handler) => handler());
  }
}
