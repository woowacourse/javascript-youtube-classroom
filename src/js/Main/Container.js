// eslint-disable-next-line max-classes-per-file
import CLASSNAME from "../constants/classname.js";
import { $ } from "../utils/index.js";
import VideoWrapper from "./VideoWrapper.js";

export default class Container {
  constructor() {
    this.$container = $(`.${CLASSNAME.MAIN_CONTAINER}`);
    this.videoWrapper = new VideoWrapper();
  }

  show() {
    $.show(this.$container);
  }

  hide() {
    $.hide(this.$container);
  }
}
