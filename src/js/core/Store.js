export default class Store {
  state;

  constructor(key, initState) {
    this.key = key;
    this.initState = initState;

    this.init();
  }

  init() {
    throw new Error('override');
  }

  load(callback) {
    return callback(this.state);
  }

  update(newState) {
    Object.entries(newState).forEach(([key, value]) => {
      if (!Object.prototype.hasOwnProperty.call(this.state, key)) return;

      this.state[key] = value;
    });
  }

  clear() {
    this.update(this.initState);
  }
}
