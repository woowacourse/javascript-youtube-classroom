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
    this.MainContainer = new MainContainer();
    this.searchContainer = new SearchContainer();
  }

  selectHTMLElements() {
    this.$watchLaterTabButton = $(`.${CLASSNAME.WATCH_LATER_TAB}`);
    this.$historyTabButton = $(`.${CLASSNAME.HISTORY_TAB}`);
    this.$searchTabButton = $(`.${CLASSNAME.SEARCH_TAB}`);
    this.$likeTabButton = $(`.${CLASSNAME.LIKE_TAB}`);

    this.$MainContainer = $(`.${CLASSNAME.MAIN_CONTAINER}`);
    this.$MainVideoWrapper = $(`.${CLASSNAME.MAIN_VIDEO_WRAPPER}`);
  }

  addEventListeners() {
    this.$watchLaterTabButton.addEventListener("click", () => {
      this.activateTabButton(this.$watchLaterTabButton);
      this.deactivateTabButton(this.$historyTabButton);

      $.addClass(this.$MainContainer, "watch-later-container");
      $.removeClass(this.$MainContainer, "history-container");
    });

    this.$historyTabButton.addEventListener("click", () => {
      this.activateTabButton(this.$historyTabButton);
      this.deactivateTabButton(this.$watchLaterTabButton);

      $.addClass(this.$MainContainer, "history-container");
      $.removeClass(this.$MainContainer, "watch-later-container");
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
    $.toggleClass(this.$likeTabButton, CLASSNAME.ACTIVE);
    $.toggleClass(this.$MainVideoWrapper, CLASSNAME.LIKE_MODE);
  }

  activateTabButton($tabButton) {
    $.addClass($tabButton, CLASSNAME.BG_CYAN_100);
  }

  deactivateTabButton($tabButton) {
    $.removeClass($tabButton, CLASSNAME.BG_CYAN_100);
  }
}
