/* eslint-disable class-methods-use-this */
import { CLASSNAME } from "./constants/index.js";
import { $ } from "./utils/index.js";
import MainContainer from "./Main/Container.js";
import SearchContainer from "./Search/SearchContainer.js";

export default class App {
  constructor() {
    this.initializeVariables();
    this.selectHTMLElements();
    this.addEventListeners();
  }

  initializeVariables() {
    this.watchLaterContainer = new MainContainer();
    this.searchContainer = new SearchContainer();
  }

  selectHTMLElements() {
    this.$watchLaterTabButton = $(`.${CLASSNAME.WATCH_LATER_TAB}`);
    this.$historyTabButton = $(`.${CLASSNAME.HISTORY_TAB}`);
    this.$searchTabButton = $(`.${CLASSNAME.SEARCH_TAB}`);
    this.$likeTabButton = $(`.${CLASSNAME.LIKE_TAB}`);
    this.$watchLaterContainer = $(`.${CLASSNAME.WATCH_LATER_CONTAINER}`);
    this.$watchLaterVideoWrapper = $(`.${CLASSNAME.WATCH_LATER_VIDEO_WRAPPER}`);
  }

  addEventListeners() {
    this.$watchLaterTabButton.addEventListener("click", () => {
      this.activateTabButton(this.$watchLaterTabButton);
      this.deactivateTabButton(this.$historyTabButton);

      $.addClass(this.$watchLaterContainer, "watch-later-container");
      $.removeClass(this.$watchLaterContainer, "history-container");
    });

    this.$historyTabButton.addEventListener("click", () => {
      this.activateTabButton(this.$historyTabButton);
      this.deactivateTabButton(this.$watchLaterTabButton);

      $.addClass(this.$watchLaterContainer, "history-container");
      $.removeClass(this.$watchLaterContainer, "watch-later-container");
    });

    this.$searchTabButton.addEventListener(
      "click",
      this.searchContainer.open.bind(this.searchContainer)
    );

    this.$likeTabButton.addEventListener(
      "click",
      this.toggleLikeMode.bind(this)
    );
  }

  toggleLikeMode() {
    $.toggleClass(this.$likeTabButton, "active");
    $.toggleClass(this.$watchLaterVideoWrapper, CLASSNAME.LIKE_MODE);
  }

  activateTabButton($tabButton) {
    $.addClass($tabButton, CLASSNAME.BG_CYAN_100);
  }

  deactivateTabButton($tabButton) {
    $.removeClass($tabButton, CLASSNAME.BG_CYAN_100);
  }
}
