// eslint-disable-next-line max-classes-per-file
import CLASSNAME from "../constants/classname.js";
import { $ } from "../utils/index.js";
import HistoryVideoWrapper from "./HistoryVideoWrapper.js";
import WatchLaterVideoWrapper from "./WatchLaterVideoWrapper.js";

class Container {
  constructor(className, WrapperClass) {
    if (this.constructor.name === "Container") {
      throw new Error(
        "Container class는 abstract class로서 instance화 될 수 없습니다."
      );
    }

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

class WatchLaterContainer extends Container {
  constructor() {
    super(CLASSNAME.WATCH_LATER_CONTAINER, WatchLaterVideoWrapper);
  }
}

class HistoryContainer extends Container {
  constructor() {
    super(CLASSNAME.HISTORY_CONTAINER, HistoryVideoWrapper);
  }
}

export { WatchLaterContainer, HistoryContainer };
