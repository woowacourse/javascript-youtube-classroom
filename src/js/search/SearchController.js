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

  readySearch() {
    this.searchView.resetSearchResults();
    loadingSearchResults.resetLoadCount();
    this.searchView.showSkeletonClip();
  }

  async searchVideos() {
    if (searchHistory.getPageToken() === "") {
      this.readySearch();
    }
    const videoItems = await this.getSearchResult();

    if (videoItems.length === 0) {
      this.fetchNotFoundImg();
    } else {
      this.fetchVideos(videoItems);
    }
  }

  async getSearchResult() {
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

  fetchNotFoundImg() {
    if (this.isScrolled()) {
      return;
    }

    this.searchView.showNotFoundImg();
  }

  fetchVideos(videoItems) {
    videos.setFetchedVideos(videoItems);
    this.searchView.showSearchResults();
    searchHistory.setPageToken(this.nextPageToken);
  }

  async addVideos($target) {
    const { clientHeight, scrollTop, scrollHeight } = $target;
    const isBottom = clientHeight + scrollTop >= scrollHeight - 5;

    if (isBottom && !scrollEventLock.isLocked()) {
      scrollEventLock.lock();
      await this.searchVideos();
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

  updateKeywordHistory() {
    this.searchView.showKeywordHistory();
  }

  isScrolled() {
    return searchHistory.getPageToken() !== "";
  }
}
