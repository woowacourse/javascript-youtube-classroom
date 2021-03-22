/* eslint-disable class-methods-use-this */
import { CLASSNAME } from "./constants/index.js";
import { $ } from "./utils/index.js";
import { WatchLaterContainer, HistoryContainer } from "./Main/Container.js";
import SearchContainer from "./Search/SearchContainer.js";

export default class App {
  constructor() {
    this.initializeVariables();
    this.selectHTMLElements();
    this.addEventListeners();
  }

  initializeVariables() {
    this.watchLaterContainer = new WatchLaterContainer();
    this.historyContainer = new HistoryContainer();
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
