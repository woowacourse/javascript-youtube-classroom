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

  #$modalClose = $(`.${CLASSNAME.MODAL_CLOSE}`);

  #$modalInner = $(`.${CLASSNAME.MODAL_INNER}`);

  constructor() {
    this.#addEventListeners();
    this.#searchForm.searchKeyword();
  }

  #addEventListeners() {
    this.#$modalClose.addEventListener("click", this.close.bind(this));
  }

  open() {
    $.open(this.#$modal);
  }

  close() {
    $.close(this.#$modal);
  }
}
