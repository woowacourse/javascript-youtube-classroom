export default class Store {
  static singletonStore = null;
  constructor() {
    if (Store.singletonStore) return Store.singletonStore;
    this.subscribers = [];
    this.states = {};
    Store.singletonStore = this;
  }

  setup(states = {}, reduce) {
    this.states = states;
    this.reduce = reduce;
    this.preStates = this.states;
  }

  getStates() {
    return this.states;
  }

  getPrevStates() {
    return this.preStates;
  }

  subscribe(func) {
    this.subscribers.push(func);
  }

  notifySubscribers() {
    this.subscribers.forEach(
      function (subscriber) {
        subscriber(this.preStates, this.states);
      }.bind(this)
    );
  }

  dispatch(action) {
    console.log('Action : ', action);
    console.log('State : ', this.states);
    this.preStates = this.states;
    this.states = this.reduce(this.states, action);
    this.notifySubscribers();
  }
}
