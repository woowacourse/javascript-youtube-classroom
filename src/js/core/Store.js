export default class Store {
  state = {};

  subscribers = [];

  reducer = {};

  constructor(initialState) {
    if (this.constructor === Store) {
      throw new Error('추상 클래스는 인스턴스화 할 수 없습니다.');
    }
    this.state = initialState;
    this.setReducer();
  }

  getState() {
    return this.state;
  }

  setReducer() {}

  setState(newState) {
    this.state = newState;
    this.subscribers.forEach(subscriber => subscriber(this.state));
  }

  dispatch(type, data) {
    this.reducer[type] && this.reducer[type](data);
  }

  addSubscriber(subscriber) {
    this.subscribers.push(subscriber);
  }
}
