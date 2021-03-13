export default class Component {
  constructor($target, $props) {
    this.$target = $target;
    this.$props = $props;
    this.setup();
    this.initRender();
    this.selectDOM();
    this.bindEvent();
  }

  setup() {
    console.warn(
      `${this.$target.outerHTML}\n에서 setup이(가) 정의되지 않았습니다.`
    );
  }
  initRender() {
    console.warn(
      `${this.$target.outerHTML}\n에서 initRender이(가) 정의되지 않았습니다.`
    );
  }
  render() {
    console.warn(
      `${this.$target.outerHTML}\n에서 render이(가) 정의되지 않았습니다.`
    );
  }
  selectDOM() {
    console.warn(
      `${this.$target.outerHTML}\n에서 selectDOM이(가) 정의되지 않았습니다.`
    );
  }
  bindEvent() {
    console.warn(
      `${this.$target.outerHTML}\n에서 bindEvent이(가) 정의되지 않았습니다.`
    );
  }
}
