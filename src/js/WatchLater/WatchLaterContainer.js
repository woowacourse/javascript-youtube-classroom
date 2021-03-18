import { CLASSNAME } from "../constants/index.js";
import { $ } from "../utils/DOM.js";
import WatchLaterVideoWrapper from "./WatchLaterVideoWrapper.js";

export default class WatchLaterContainer {
  constructor() {
    this.$watchLaterContainer = $(`.${CLASSNAME.WATCH_LATER_CONTAINER}`);

    this.watchLaterVideoWrapper = new WatchLaterVideoWrapper();
  }

  show() {
    $.show(this.$watchLaterContainer);
  }

  hide() {
    $.hide(this.$watchLaterContainer);
  }
}
