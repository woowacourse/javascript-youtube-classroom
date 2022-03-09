export default class Display {
  container;

  constructor() {
    if (this.constructor === Display) {
      throw new Error('추상 클래스는 인스턴스화 할 수 없습니다.');
    }
    this.init();
  }

  init() {
    this.setContainer();
    this.bindEvents();
    this.subscribeStores();
  }

  setContainer() {}

  bindEvents() {}

  subscribeStores() {}

  addEvent(eventType, selector, handler) {
    const children = [...this.container.querySelectorAll(selector)];
    const isTarget = target => children.includes(target) || target.closest(selector);

    this.container.addEventListener(eventType, event => {
      if (eventType === 'submit') event.preventDefault();
      if (!isTarget(event.target)) return false;
      handler(event);
    });
  }
}
