import { CLASSNAME } from "../constants/index.js";
import { $ } from "../utils/DOM.js";
import HistoryVideoWrapper from "./HistoryVideoWrapper.js";

export default class HistoryContainer {
  constructor() {
    this.$historyContainer = $(`.${CLASSNAME.HISTORY_CONTAINER}`);

    this.historyVideoWrapper = new HistoryVideoWrapper();
  }

  show() {
    $.show(this.$historyContainer);
  }

  hide() {
    $.hide(this.$historyContainer);
  }
}
