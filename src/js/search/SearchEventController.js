import SearchController from "./SearchController.js";

import videos from "../state/videos.js";

import elements from "../utils/elements.js";
import {
  ERROR_MESSAGE,
  VIDEOS,
  DOM_SELECTORS,
  CUSTOM_EVENTS,
} from "../utils/constants.js";
import { showSnackbar } from "../utils/snackbar.js";
import {
  openModal,
  closeModal,
  showElement,
  hideElement,
  getFormElements,
} from "../utils/dom.js";

import searchHistory from "../state/searchHistory.js";

export default class SearchEventController {
  constructor() {
    this.searchController = new SearchController();
  }

  bindEvents() {
    window.addEventListener("load", () => searchHistory.initKeywords());

    this.bindModalEvents();
    this.bindSearchEvents();
    this.bindSaveVideoEvents();
  }

  bindModalEvents() {
    elements.$searchButton.addEventListener(
      "click",
      this.onClickSearchButton.bind(this)
    );
    elements.$searchModal.addEventListener(
      "mousedown",
      this.onClickDimmed.bind(this)
    );
    elements.$searchModalClose.addEventListener(
      "click",
      this.onClickSearchModalCloseButton.bind(this)
    );
  }

  bindSearchEvents() {
    elements.$searchForm.addEventListener("submit", this.onSearch.bind(this));
    elements.$keywordHistory.addEventListener(
      "click",
      this.onClickKeywordHistory.bind(this)
    );
    elements.$searchResults.addEventListener(
      CUSTOM_EVENTS.LOAD_SEARCH_ALL,
      this.onLoadSearchAll
    );
  }

  bindSaveVideoEvents() {
    elements.$searchResults.addEventListener(
      "click",
      this.onClickSaveVideoButtons.bind(this)
    );
  }

  onClickSearchButton() {
    openModal(elements.$searchModal);
    getFormElements(
      elements.$searchForm,
      DOM_SELECTORS.NAME.SEARCH_KEYWORD
    ).focus();

    this.searchController.updateKeywordHistory();
    this.searchController.showSavedVideoCount();

    const recentKeyword = searchHistory.getKeywordAll()[0];
    if (recentKeyword) {
      this.searchController.searchVideos(recentKeyword);
    }
  }

  onClickDimmed(e) {
    if (e.target.classList.contains(DOM_SELECTORS.CLASS.MODAL)) {
      this.searchController.resetSearchView();
      closeModal(elements.$searchModal);
    }
  }

  onClickSearchModalCloseButton() {
    this.searchController.resetSearchView();
    closeModal(elements.$searchModal);
  }

  onSearch(e) {
    e.preventDefault();
    const searchKeyword = getFormElements(
      elements.$searchForm,
      DOM_SELECTORS.NAME.SEARCH_KEYWORD
    ).value;
    this.searchController.searchVideos(searchKeyword);
  }

  onClickKeywordHistory(e) {
    if (!e.target.dataset.keyword) {
      return;
    }

    const keyword = e.target.dataset.keyword.replace("+", " ");

    if (e.target.classList.contains(DOM_SELECTORS.CLASS.ICON)) {
      this.searchController.searchVideosByHistory(keyword);
    }
    if (e.target.classList.contains(DOM_SELECTORS.CLASS.JS_REMOVE_BTN)) {
      this.searchController.removeKeywordHistoryChip(keyword);
    }
  }

  onLoadSearchAll() {
    hideElement(elements.$skeletonSearchResults);
    showElement(elements.$searchResults);
  }

  onClickSaveVideoButtons(e) {
    const { videoId } = e.target.dataset;
    if (!videoId) {
      return;
    }

    if (e.target.dataset.videoSaved === "") {
      if (videos.getSavedVideoCount() >= VIDEOS.SAVED_VIDEOS_MAX_COUNT) {
        showSnackbar(ERROR_MESSAGE.SAVE_COUNT_EXCEEDED_ERROR);
        return;
      }

      this.searchController.saveVideo(videoId);
    } else {
      this.searchController.cancelSavedVideo(videoId);
    }
  }
}
