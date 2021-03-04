import SearchController from "./SearchController.js";
import elements from "../utils/elements.js";
import searchHistory from "../state/searchHistory.js";

export default class Search {
  constructor() {
    this.searchController = new SearchController();
  }

  init() {
    elements.$searchForm.addEventListener("submit", this.onSearch.bind(this));
    elements.$searchResults.addEventListener(
      "scroll",
      this.onScroll.bind(this)
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
}
