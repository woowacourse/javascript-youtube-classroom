import { $ } from "../utils/index.js";

export default class Container {
  constructor(className, WrapperClass) {
    this.$container = $(`.${className}`);

    this.videoWrapper = new WrapperClass();
  }

  show() {
    $.show(this.$container);
  }

  hide() {
    $.hide(this.$container);
  }
}
