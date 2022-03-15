export default class Store {
  state = {};
  reducers = {};

  subscribers = [];

  constructor(initialState, reducers) {
    this.state = initialState;
    this.reducers = reducers;
  }

  getState() {
    return this.state;
  }

  setState(newState) {
    this.state = newState;
    this.subscribers.forEach(subscriber => subscriber(this.state));
  }

  async dispatch(type, data) {
    const newState = await this.reducers[type](this.state, data);
    if (newState) this.setState(newState);
  }

  addSubscriber(subscriber) {
    this.subscribers.push(subscriber);
  }
}
