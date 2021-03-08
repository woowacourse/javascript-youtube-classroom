import SearchView from "./SearchView.js";

import scrollEventLock from "../state/scrollEventLock.js";
import searchHistory from "../state/searchHistory.js";
import videos from "../state/videos.js";
import loadingSearchResults from "../state/loadingSearchResults.js";

import { API, YOUTUBE_URL } from "../utils/constants.js";

import { getSearchQueryString } from "../queries/searchQuery.js";

export default class SearchController {
  constructor() {
    this.searchView = new SearchView();
    this.nextPageToken = "";
  }

  searchVideos(searchKeyword) {
    searchHistory.resetPageToken();
    searchHistory.setKeyword(searchKeyword);
    this.updateKeywordHistory();
    this.updateSearchResultView();
  }

  activateSearchLoading() {
    this.searchView.resetSearchResults();
    loadingSearchResults.resetLoadCount();
    this.searchView.showSkeletonClip();
  }

  async updateSearchResultView() {
    if (searchHistory.getPageToken() === "") {
      this.activateSearchLoading();
    }
    const videoItems = await this.fetchSearchResult();

    if (videoItems.length === 0) {
      this.searchView.showNotFoundImg(searchHistory.getPageToken());
    } else {
      this.attachVideos(videoItems);
    }
  }

  async fetchSearchResult() {
    const res = await fetch(
      `${YOUTUBE_URL}/${API.GET.SEARCH}?${getSearchQueryString()}`
    );
    if (!res.ok) {
      throw new Error(res.status);
    }

    const { items, nextPageToken } = await res.json();
    this.nextPageToken = nextPageToken;

    return items;
  }

  attachVideos(videoItems) {
    videos.setFetchedVideos(videoItems);
    this.searchView.showSearchResults(
      videos.getRecentVideos(),
      searchHistory.getPageToken()
    );
    searchHistory.setPageToken(this.nextPageToken);
  }

  async addVideosByScroll($target) {
    const { clientHeight, scrollTop, scrollHeight } = $target;
    const isBottom = clientHeight + scrollTop >= scrollHeight - 5;

    if (isBottom && !scrollEventLock.isLocked()) {
      scrollEventLock.lock();
      await this.updateSearchResultView();
      scrollEventLock.unlock();
    }
  }

  saveVideo(videoId) {
    videos.setSavedVideos(videoId);
    this.searchView.hideSavedVideoButton(videoId);
    this.showSavedVideoCount();
  }

  showSavedVideoCount() {
    this.searchView.showSavedVideoCount();
  }

  removeKeywordHistoryChip(keyword) {
    searchHistory.removeKeyword(keyword);
    this.updateKeywordHistory();
  }

  updateKeywordHistory() {
    this.searchView.showKeywordHistory();
  }
}
