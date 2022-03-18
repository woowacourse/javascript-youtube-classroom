import Subject from '../core/Subject.js';

export default class Store {
  constructor(initState) {
    this.initState = initState;
    this.state = Subject.observable(initState);

    Object.seal(this);
  }

  setState(newState) {
    Object.entries(newState).forEach(([key, value]) => {
      if (!Object.prototype.hasOwnProperty.call(this.state, key)) return;
      this.state[key] = value;
    });
  }

  clear() {
    this.setState(this.initState);
  }
}

export const observe = (observer) => {
  Subject.currentObserver = observer;
  observer.notify();
  Subject.currentObserver = null;
};
