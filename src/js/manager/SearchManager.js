import Observer from "./Observer.js";

export default class SearchManager extends Observer {
  constructor() {
    super();
    this.state = {
      keyword: "",
    };
  }

  getKeyword() {
    return this.state.keyword;
  }

  updateKeyword(keyword) {
    this.#setState({ keyword });
  }

  #setState(newState) {
    this.state = { ...this.state, ...newState };
    this.notify();
  }
}
