export default class Display {
  container;

  constructor() {
    if (this.constructor === Display) {
      throw new Error('추상 클래스는 인스턴스화 할 수 없습니다.');
    }
    this.setContainer();
    this.defaultElement();
    this.bindEvents();
    this.subscribeStores();
  }

  setContainer() {}

  defaultElement() {}

  bindEvents() {}

  subscribeStores() {}

  addEvent({ eventType, selector, handler, isPreventedDefault = false }) {
    const children = [...this.container.querySelectorAll(selector)];
    const isTarget = target => children.includes(target) || target.closest(selector);

    this.container.addEventListener(eventType, event => {
      if (isPreventedDefault) event.preventDefault();
      if (!isTarget(event.target)) return false;
      handler(event);
    });
  }
}
