/* eslint-disable class-methods-use-this */
import { CLASSNAME } from "./constants/index.js";
import { $ } from "./utils/index.js";
import Container from "./Main/Container.js";
import SearchContainer from "./Search/SearchContainer.js";
import WatchLaterVideoWrapper from "./Main/WatchLaterVideoWrapper.js";
import HistoryVideoWrapper from "./Main/HistoryVideoWrapper.js";

export default class App {
  constructor() {
    this.$watchLaterTabButton = $(`.${CLASSNAME.WATCH_LATER_TAB}`);
    this.$historyTabButton = $(`.${CLASSNAME.HISTORY_TAB}`);
    this.$searchTabButton = $(`.${CLASSNAME.SEARCH_TAB}`);

    this.watchLaterContainer = new Container(
      CLASSNAME.WATCH_LATER_CONTAINER,
      WatchLaterVideoWrapper
    );
    this.historyContainer = new Container(
      CLASSNAME.HISTORY_CONTAINER,
      HistoryVideoWrapper
    );
    this.searchContainer = new SearchContainer();

    this.$watchLaterTabButton.addEventListener("click", () => {
      this.historyContainer.hide();
      this.deactivateTabButton(this.$historyTabButton);

      this.watchLaterContainer.show();
      this.activateTabButton(this.$watchLaterTabButton);
    });

    this.$historyTabButton.addEventListener("click", () => {
      this.watchLaterContainer.hide();
      this.deactivateTabButton(this.$watchLaterTabButton);

      this.historyContainer.show();
      this.activateTabButton(this.$historyTabButton);
    });

    this.$searchTabButton.addEventListener(
      "click",
      this.searchContainer.open.bind(this.searchContainer)
    );
  }

  activateTabButton($tabButton) {
    $.addClass($tabButton, CLASSNAME.BG_CYAN_100);
  }

  deactivateTabButton($tabButton) {
    $.removeClass($tabButton, CLASSNAME.BG_CYAN_100);
  }
}
