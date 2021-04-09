// eslint-disable-next-line max-classes-per-file
import CLASSNAME from "../constants/classname.js";
import { $ } from "../utils/index.js";
import WatchLaterVideoWrapper from "./WatchLaterVideoWrapper.js";

export default class Container {
  constructor() {
    this.$container = $(`.${CLASSNAME.WATCH_LATER_CONTAINER}`);
    this.videoWrapper = new WatchLaterVideoWrapper();
  }

  show() {
    $.show(this.$container);
  }

  hide() {
    $.hide(this.$container);
  }
}
