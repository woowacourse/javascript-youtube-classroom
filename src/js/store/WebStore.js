import Store from '../core/Store.js';

export default class WebStore extends Store {
  init() {
    this.state =
      JSON.parse(localStorage.getItem(this.key)) ||
      JSON.parse(JSON.stringify(this.initState));

    Object.seal();
  }

  update(newState) {
    Object.entries(newState).forEach(([key, value]) => {
      if (!Object.prototype.hasOwnProperty.call(this.state, key)) return;
      this.state[key] = value;
    });

    localStorage.setItem(this.key, JSON.stringify(this.state));
  }

  clear() {
    this.update(this.initState);
  }
}
