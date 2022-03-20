import { observe } from '../store/Store.js';

export default class Component extends HTMLElement {
  constructor(target) {
    super();

    this.setup();
  }

  connectedCallback() {
    this.setEvent();
    observe(this);
  }

  setup() {}

  beforeMounted() {}

  afterMounted() {}

  template() {
    return '';
  }

  render() {
    this.beforeMounted();
    this.innerHTML = this.template();
    this.afterMounted();
  }

  setState(newState) {
    const updatedState = { ...this.state, ...newState };

    if (JSON.stringify(updatedState) === JSON.stringify(this.state)) return;

    this.state = updatedState;
    this.render();
  }

  setEvent() {}

  addEvent(eventType, selector, callback) {
    const isTarget = (target) => target.closest(selector);

    this.addEventListener(eventType, (event) => {
      if (!isTarget(event.target)) return;

      event.preventDefault();
      callback(event);
    });
  }

  notify() {
    this.render();
  }

  $(selector) {
    return this.querySelector(selector);
  }
}
