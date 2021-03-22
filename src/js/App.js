/* eslint-disable class-methods-use-this */
import { CLASSNAME } from "./constants/index.js";
import { $ } from "./utils/index.js";
import Container from "./Main/Container.js";
import SearchContainer from "./Search/SearchContainer.js";
import WatchLaterVideoWrapper from "./Main/WatchLaterVideoWrapper.js";
import HistoryVideoWrapper from "./Main/HistoryVideoWrapper.js";

export default class App {
  constructor() {
    this.initializeVariables();
    this.selectHTMLElements();
    this.addEventListeners();
  }

  initializeVariables() {
    this.watchLaterContainer = new Container(
      CLASSNAME.WATCH_LATER_CONTAINER,
      WatchLaterVideoWrapper
    );
    this.historyContainer = new Container(
      CLASSNAME.HISTORY_CONTAINER,
      HistoryVideoWrapper
    );
    this.searchContainer = new SearchContainer();
  }

  selectHTMLElements() {
    this.$watchLaterTabButton = $(`.${CLASSNAME.WATCH_LATER_TAB}`);
    this.$historyTabButton = $(`.${CLASSNAME.HISTORY_TAB}`);
    this.$searchTabButton = $(`.${CLASSNAME.SEARCH_TAB}`);
  }

  addEventListeners() {
    this.$watchLaterTabButton.addEventListener(
      "click",
      this.showWatchLaterOnly.bind(this)
    );

    this.$historyTabButton.addEventListener(
      "click",
      this.showHistoryOnly.bind(this)
    );

    this.$searchTabButton.addEventListener(
      "click",
      this.searchContainer.open.bind(this.searchContainer)
    );
  }

  showWatchLaterOnly() {
    this.watchLaterContainer.show();
    this.activateTabButton(this.$watchLaterTabButton);

    this.historyContainer.hide();
    this.deactivateTabButton(this.$historyTabButton);
  }

  showHistoryOnly() {
    this.watchLaterContainer.hide();
    this.deactivateTabButton(this.$watchLaterTabButton);

    this.historyContainer.show();
    this.activateTabButton(this.$historyTabButton);
  }

  activateTabButton($tabButton) {
    $.addClass($tabButton, CLASSNAME.BG_CYAN_100);
  }

  deactivateTabButton($tabButton) {
    $.removeClass($tabButton, CLASSNAME.BG_CYAN_100);
  }
}
