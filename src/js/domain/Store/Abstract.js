export default class Store {
  state = {};
  reducers = {};

  subscribers = [];

  constructor(initialState) {
    if (new.target === Store) {
      throw new Error('추상 클래스는 인스턴스화 할 수 없습니다.');
    }

    this.state = initialState;
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

  dispatch(type, data) {
    this.getReducer(type)(data);
  }

  addSubscriber(subscriber) {
    this.subscribers.push(subscriber);
  }
}
