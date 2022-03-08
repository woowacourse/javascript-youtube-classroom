export default class Component {
  #target;

  #props;

  constructor(target, props) {
    this.#target = target;
    this.#props = props;
    this.setup();
    this.setEvent();
    this.render();
  }

  setup() {}

  mounted() {}

  template() {
    return '';
  }

  render() {
    this.#target.innerHTML = this.template();
    this.mounted();
  }

  setState(newState) {
    this.$state = { ...this.$state, ...newState };
    this.render();
  }

  setEvent() {}

  addEvent(eventType, selector, callback) {
    const isTarget = (target) => target.closest(selector);
    this.$target.addEventListener(eventType, (event) => {
      if (!isTarget(event.target)) return;

      callback(event);
    });
  }
}
