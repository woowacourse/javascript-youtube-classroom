class Store {
  constructor() {
    this.state = { query: "", nextPageToken: "", items: [] };

    this.listeners = {
      query: [],
      nextPageToken: [],
      items: [],
    };
  }

  setState(state) {
    const previousState = this.state;
    this.state = { ...this.state, ...state };

    Object.keys(this.state)
      .filter((key) => this.state[key] !== previousState[key])
      .forEach((key) => {
        this.listeners[key].forEach((listener) => listener(this.state[key]));
      });
  }

  addStateListener(stateType, stateHandler) {
    this.listeners[stateType].push(stateHandler);
  }
}

const store = new Store();

export default store;
