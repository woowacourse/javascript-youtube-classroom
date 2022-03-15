import { setCurrentObserver } from '../store/rootStore.js';

export default class Component {
  constructor(target, props) {
    this.target = target;
    this.props = props;
    this.setup();
    this.setEvent();
    this.render();
  }

  setup() {}

  beforeMounted() {}

  afterMounted() {}

  template() {
    return '';
  }

  render() {
    setCurrentObserver(this);
    this.beforeMounted();
    this.target.innerHTML = this.template();
    this.afterMounted();
    setCurrentObserver(null);
  }

  setState(newState) {
    this.state = { ...this.state, ...newState };
    this.render();
  }

  setEvent() {}

  addEvent(eventType, selector, callback) {
    const isTarget = target => target.closest(selector);

    this.target.addEventListener(eventType, event => {
      if (!isTarget(event.target)) return;

      event.preventDefault();
      callback(event);
    });
  }

  $(selector) {
    return this.target.querySelector(selector);
  }
}
