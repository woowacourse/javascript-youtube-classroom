import { observe } from '../store/rootStore.js';

export default class Component {
  target;

  constructor(target, props) {
    this.target = target;
    this.props = props;
    this.setup();
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
    this.target.innerHTML = this.template();
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

    this.target.addEventListener(eventType, (event) => {
      if (!isTarget(event.target)) return;

      event.preventDefault();
      callback(event);
    });
  }

  notify() {
    this.render();
  }

  $(selector) {
    return this.target.querySelector(selector);
  }
}