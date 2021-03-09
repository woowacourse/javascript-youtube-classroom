export default class Component {
  constructor($target, $props) {
    this.$target = $target;
    this.$props = $props;
    this.initRender();
    this.selectDOM();
    this.bindEvent();
    this.setup();
  }

  setup() {}
  initRender() {}
  render() {}
  selectDOM() {}
  bindEvent() {}
}
