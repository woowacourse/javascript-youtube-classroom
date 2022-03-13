export default class Display {
  container;
  drawList = [];

  constructor() {
    if (new.target.name === Display.name) {
      throw new Error('추상 클래스는 인스턴스화 할 수 없습니다.');
    }

    this.setContainer();
    this.setDefaultElements();
    this.setRenderList();
    this.bindEvents();
    this.subscribeStores();
  }

  setContainer() {}

  setDefaultElements() {}

  setRenderList() {}

  bindEvents() {}

  subscribeStores() {}

  render(state) {
    this.drawList.forEach(drawEvent => {
      drawEvent(state);
    });
  }

  addDrawList(drawEvent) {
    this.drawList.push(drawEvent);
  }

  addEvent(eventType, selector, handler, option = {}) {
    const children = [...this.container.querySelectorAll(selector)];
    const isTarget = target => children.includes(target) || target.closest(selector);

    this.container.addEventListener(eventType, event => {
      if (option.default === true) event.preventDefault();
      if (!isTarget(event.target)) return false;
      handler(event);
    });
  }
}
