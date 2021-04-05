import { CLASSNAME } from "./constants/index.js";
import { $ } from "./utils/DOM.js";
import SearchContainer from "./Search/SearchContainer.js";
import WatchLaterContainer from "./WatchLater/WatchLaterContainer.js";
import HistoryContainer from "./History/HistoryContainer.js";
import LikeContainer from "./Like/LikeContainer.js";

export default class App {
  constructor() {
    this.$watchLaterTabButton = $(`.${CLASSNAME.WATCH_LATER_TAB}`);
    this.$historyTabButton = $(`.${CLASSNAME.HISTORY_TAB}`);
    this.$searchTabButton = $(`.${CLASSNAME.SEARCH_TAB}`);
    this.$likeTabButton = $(`.${CLASSNAME.LIKE_TAB}`);

    this.watchLaterContainer = new WatchLaterContainer();
    this.historyContainer = new HistoryContainer();
    this.searchContainer = new SearchContainer();
    this.likeContainer = new LikeContainer();

    this.$watchLaterTabButton.addEventListener("click", () => {
      this.changeAllTabsToUnselected();
      this.changeTabToSelected(
        this.watchLaterContainer,
        this.$watchLaterTabButton
      );
    });

    this.$historyTabButton.addEventListener("click", () => {
      this.changeAllTabsToUnselected();
      this.changeTabToSelected(this.historyContainer, this.$historyTabButton);
    });

    this.$likeTabButton.addEventListener("click", () => {
      this.changeAllTabsToUnselected();
      this.changeTabToSelected(this.likeContainer, this.$likeTabButton);
    });

    this.$searchTabButton.addEventListener(
      "click",
      this.searchContainer.open.bind(this.searchContainer)
    );
  }

  // eslint-disable-next-line class-methods-use-this
  changeTabToSelected(container, tabButton) {
    container.show();
    $.addClass(tabButton, CLASSNAME.BG_CYAN_100);
  }

  changeAllTabsToUnselected() {
    this.watchLaterContainer.hide();
    this.historyContainer.hide();
    this.likeContainer.hide();
    $.removeClass(this.$watchLaterTabButton, CLASSNAME.BG_CYAN_100);
    $.removeClass(this.$historyTabButton, CLASSNAME.BG_CYAN_100);
    $.removeClass(this.$likeTabButton, CLASSNAME.BG_CYAN_100);
  }
}
