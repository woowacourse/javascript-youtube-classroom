export default class Store {
  state = {};
  reducers = {};

  subscribers = [];

  constructor(initialState) {
    if (new.target.name === Store.name) {
      throw new Error('추상 클래스는 인스턴스화 할 수 없습니다.');
    }

    this.state = initialState;
    this.setReducers();
  }

  addReducer(key, event) {
    this.reducers[key] = event;
  }

  getState() {
    return this.state;
  }

  setState(newState) {
    this.state = newState;
    this.subscribers.forEach(subscriber => subscriber(this.state));
  }

  getReducer(type) {
    return this.reducers[type];
  }

  setReducers() {}

  dispatch(type, data) {
    this.getReducer(type)(data);
  }

  addSubscriber(subscriber) {
    this.subscribers.push(subscriber);
  }
}
