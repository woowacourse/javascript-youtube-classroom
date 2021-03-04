import SearchController from "./SearchController.js";
import elements from "../utils/elements.js";
import searchHistory from "../state/searchHistory.js";
import { openModal, closeModal } from "../utils/dom.js";

export default class Search {
  constructor() {
    this.searchController = new SearchController();
  }

  init() {
    elements.$searchButton.addEventListener(
      "click",
      this.onClickSearchButton.bind(this)
    );
    elements.$searchModalClose.addEventListener(
      "click",
      this.onClickSearchModalCloseButton
    );

    elements.$searchForm.addEventListener("submit", this.onSearch.bind(this));
    elements.$searchResults.addEventListener(
      "scroll",
      this.onScroll.bind(this)
    );

    elements.$searchResults.addEventListener(
      "click",
      this.onClickSaveVideoButton.bind(this)
    );
  }

  onSearch(e) {
    e.preventDefault();
    const searchKeyword = e.target.elements["search-keyword"].value;

    searchHistory.resetPageToken();
    searchHistory.setKeyword(searchKeyword);
    this.searchController.updateKeywordHistory();
    this.searchController.searchVideos();
  }

  onScroll(e) {
    this.searchController.addVideos(e.target);
  }

  onClickSearchButton() {
    openModal(elements.$searchModal);
    elements.$searchForm.elements["search-keyword"].focus();

    this.searchController.updateKeywordHistory();
    this.searchController.showSavedVideoCount();
  }

  onClickSearchModalCloseButton() {
    closeModal(elements.$searchModal);
  }

  onClickSaveVideoButton(e) {
    if (!e.target.dataset.videoId) return;
    this.searchController.saveVideo(e.target.dataset.videoId);
  }
}
