import { CLASSNAME } from "../constants/index.js";
import { $ } from "../utils/index.js";
import SearchForm from "./SearchForm.js";
import KeywordHistory from "./KeywordHistory.js";
import SearchVideoWrapper from "./SearchVideoWrapper.js";
import SavedVideosCount from "./SavedVideosCount.js";

export default class SearchContainer {
  #searchForm = new SearchForm();

  #keywordHistory = new KeywordHistory();

  #savedVideosCount = new SavedVideosCount();

  #searchVideoWrapper = new SearchVideoWrapper();

  #$modal = $(`.${CLASSNAME.MODAL}`);

  constructor() {
    this.#addEventListeners();
    this.#searchForm.searchKeyword();
  }

  #addEventListeners() {
    this.#$modal.addEventListener("click", ({ target }) => {
      if (
        $.containsClass(target, CLASSNAME.MODAL) ||
        $.containsClass(target, CLASSNAME.MODAL_CLOSE_X)
      ) {
        this.close();
      }
    });
  }

  open() {
    $.open(this.#$modal);
  }

  close() {
    $.close(this.#$modal);
  }
}
