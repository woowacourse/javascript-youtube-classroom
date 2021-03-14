import { CLASSNAME } from "../constants.js";
import { $ } from "../utils/DOM.js";

export default class HistoryContainer {
  constructor() {
    this.$historyContainer = $(CLASSNAME.HISTORY_CONTAINER);
  }

  show() {
    $.show(this.$historyContainer);
  }

  hide() {
    $.hide(this.$historyContainer);
  }
}
