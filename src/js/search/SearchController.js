import SearchView from "./SearchView.js";

import searchHistory from "../state/searchHistory.js";
import videos from "../state/videos.js";
import loadingSearchResults from "../state/loadingSearchResults.js";

import { API, ERROR_MESSAGE, VIDEOS, YOUTUBE_URL } from "../utils/constants.js";
import { observeScrollBottom } from "../utils/scrollBottomObserver.js";
import { showSnackbar } from "../utils/snackbar.js";

import { getSearchQueryString } from "../queries/searchQuery.js";

export default class SearchController {
  constructor() {
    this.searchView = new SearchView();
    this.nextPageToken = "";
    this.init();
  }

  init() {
    this.searchView.addSkeletonUITemplate(VIDEOS.SKELETON_REPEAT_NUMBER);
  }

  activateSearchLoading() {
    this.searchView.resetSearchResults();
    loadingSearchResults.resetLoadCount();
    this.searchView.showSkeletonClip();
  }

  async updateSearchResultView(searchKeyword) {
    if (searchHistory.getPageToken() === "") {
      this.activateSearchLoading();
    }
    const videoItems = await this.fetchSearchResult(searchKeyword);

    if (videoItems.length === 0) {
      this.searchView.showNotFoundImg(searchHistory.getPageToken());
    } else {
      this.attachVideos(videoItems);
    }
  }

  async fetchSearchResult(searchKeyword) {
    try {
      const res = await fetch(
        `${YOUTUBE_URL}/${API.GET.SEARCH}?${getSearchQueryString(
          searchKeyword,
          searchHistory.getPageToken()
        )}`
      );

      if (!res.ok) {
        throw new Error(res.status);
      }

      const { items, nextPageToken } = await res.json();
      if (this.nextPageToken === "") {
        searchHistory.setKeyword(searchKeyword);
      }
      this.updateKeywordHistory();
      this.nextPageToken = nextPageToken;

      return items;
    } catch (err) {
      this.searchView.resetSearchResults();
      showSnackbar(ERROR_MESSAGE.SEARCH_ERROR);
      return;
    }
  }

  attachVideos(videoItems) {
    videos.setFetchedVideos(videoItems);
    this.searchView.showSearchResults(
      videos.getRecentVideos(),
      searchHistory.getPageToken()
    );

    if (searchHistory.getPageToken() === "") {
      observeScrollBottom(this.addVideosByScroll.bind(this));
    }
    searchHistory.setPageToken(this.nextPageToken);
  }

  showSavedVideoCount() {
    this.searchView.showSavedVideoCount();
  }

  updateKeywordHistory() {
    this.searchView.showKeywordHistory();
  }

  removeKeywordHistoryChip(keyword) {
    searchHistory.removeKeyword(keyword);
    this.updateKeywordHistory();
  }

  searchVideos(searchKeyword) {
    searchHistory.resetPageToken();
    this.nextPageToken = "";
    this.updateSearchResultView(searchKeyword);
  }

  async addVideosByScroll() {
    await this.updateSearchResultView(searchHistory.getKeyword());
  }

  searchVideosByHistory(searchKeyword) {
    this.searchView.setSearchInputValue(searchKeyword);
    this.searchVideos(searchKeyword);
  }

  saveVideo(videoId) {
    videos.setSavedVideos(videoId);
    this.searchView.showSaveCancelButton(videoId);
    this.showSavedVideoCount();
  }

  cancelSavedVideo(videoId) {
    videos.removeSavedVideo(videoId);
    this.searchView.showSaveButton(videoId);
    this.showSavedVideoCount();
  }

  resetSearchView() {
    this.searchView.resetSearchInput();
    this.searchView.resetSearchResults();
  }
}
