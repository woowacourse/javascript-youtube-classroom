export default class SearchManager {
  constructor() {
    this.handlers = new Map();
    this.handlerIndex = 0;
    this.state = {
      keyword: "",
    };
  }

  subscribe(handler) {
    this.handlers.set(++this.handlerIndex, handler);
    return this.handlerIndex;
  }

  unsubscribe(index) {
    this.handlers.delete(index);
  }

  getKeyword() {
    return this.state.keyword;
  }

  updateKeyword(keyword) {
    this.#setState({ keyword });
  }

  #setState(newState) {
    this.state = { ...this.state, ...newState };
    this.#notify();
  }

  #notify() {
    this.handlers.forEach((handler) => handler());
  }
}
