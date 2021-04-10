/* eslint-disable class-methods-use-this */
import { CLASSNAME } from "./constants/index.js";
import { $ } from "./utils/index.js";
import MainContainer from "./Main/MainContainer.js";
import SearchContainer from "./Search/SearchContainer.js";

export default class App {
  #searchContainer = new SearchContainer();

  #mainContainer = new MainContainer();

  #$watchLaterTabButton = $(`.${CLASSNAME.WATCH_LATER_TAB}`);

  #$historyTabButton = $(`.${CLASSNAME.HISTORY_TAB}`);

  #$searchTabButton = $(`.${CLASSNAME.SEARCH_TAB}`);

  #$likeTabButton = $(`.${CLASSNAME.LIKE_TAB}`);

  #$mainContainer = $(`.${CLASSNAME.MAIN_CONTAINER}`);

  #$MainVideoWrapper = $(`.${CLASSNAME.MAIN_VIDEO_WRAPPER}`);

  constructor() {
    this.#addEventListeners();
  }

  #addEventListeners() {
    this.#$watchLaterTabButton.addEventListener("click", () => {
      this.#activateTabButton(this.#$watchLaterTabButton);
      this.#deactivateTabButton(this.#$historyTabButton);

      $.addClass(this.#$mainContainer, "watch-later-container");
      $.removeClass(this.#$mainContainer, "history-container");
    });

    this.#$historyTabButton.addEventListener("click", () => {
      this.#activateTabButton(this.#$historyTabButton);
      this.#deactivateTabButton(this.#$watchLaterTabButton);

      $.addClass(this.#$mainContainer, "history-container");
      $.removeClass(this.#$mainContainer, "watch-later-container");
    });

    this.#$searchTabButton.addEventListener(
      "click",
      this.#searchContainer.open.bind(this.#searchContainer)
    );

    this.#$likeTabButton.addEventListener(
      "click",
      this.#toggleLikeMode.bind(this)
    );
  }

  #toggleLikeMode() {
    $.toggleClass(this.#$likeTabButton, CLASSNAME.ACTIVE);
    $.toggleClass(this.#$MainVideoWrapper, CLASSNAME.LIKE_MODE);
  }

  #activateTabButton($tabButton) {
    $.addClass($tabButton, CLASSNAME.BG_CYAN_100);
  }

  #deactivateTabButton($tabButton) {
    $.removeClass($tabButton, CLASSNAME.BG_CYAN_100);
  }
}
