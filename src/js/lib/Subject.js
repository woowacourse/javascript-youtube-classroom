export default class Subject {
  constructor() {
    this.observers = [];
  }

  subscribe(observer) {
    this.observers = [...this.observers, observer];
  }

  unsubscribe(observer) {
    this.observers = this.observers.filter((_observer) => _observer !== observer);
  }

  notify(observer) {
    const targetObserver = this.observers.find((_observer) => _observer === observer);

    if (targetObserver) {
      targetObserver.update();
    }
  }

  notifyAll() {
    if (this.observers.length > 0) {
      this.observers.forEach((observer) => observer.update());
    }
  }
}
