import Store from '../core/Store.js';
import Subject from '../core/Subject.js';

export default class AppStore extends Store {
  init() {
    this.state = Subject.observable(this.initState);

    Object.seal(this);
  }
}

export const observe = (observer) => {
  Subject.currentObserver = observer;
  observer.notify();
  Subject.currentObserver = null;
};
