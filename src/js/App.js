import { CLASSNAME } from "./constants/index.js";
import { $ } from "./utils/DOM.js";
import SearchContainer from "./Search/SearchContainer.js";
import WatchLaterContainer from "./WatchLater/WatchLaterContainer.js";
import HistoryContainer from "./History/HistoryContainer.js";

export default class App {
  constructor() {
    this.$watchLaterTabButton = $(`.${CLASSNAME.WATCH_LATER_TAB}`);
    this.$historyTabButton = $(`.${CLASSNAME.HISTORY_TAB}`);
    this.$searchTabButton = $(`.${CLASSNAME.SEARCH_TAB}`);

    this.watchLaterContainer = new WatchLaterContainer();
    this.historyContainer = new HistoryContainer();
    this.searchContainer = new SearchContainer();

    this.$watchLaterTabButton.addEventListener("click", () => {
      this.historyContainer.hide();
      $.removeClass(this.$historyTabButton, CLASSNAME.BG_CYAN_100);

      this.watchLaterContainer.show();
      $.addClass(this.$watchLaterTabButton, CLASSNAME.BG_CYAN_100);
    });

    this.$historyTabButton.addEventListener("click", () => {
      this.watchLaterContainer.hide();
      $.removeClass(this.$watchLaterTabButton, CLASSNAME.BG_CYAN_100);

      this.historyContainer.show();
      $.addClass(this.$historyTabButton, CLASSNAME.BG_CYAN_100);
    });

    this.$searchTabButton.addEventListener(
      "click",
      this.searchContainer.open.bind(this.searchContainer)
    );
  }
}
