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
    this.updateSearchResultView(searchKeyword);
  }

  searchVideosByHistory(searchKeyword) {
    this.searchView.setSearchInputValue(searchKeyword);
    this.searchVideos(searchKeyword);
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
      this.nextPageToken = nextPageToken;

      searchHistory.setKeyword(searchKeyword);
      this.updateKeywordHistory();

      return items;
    } catch (err) {
      this.searchView.resetSearchResults();
      alert("동영상을 검색할 수 없습니다.");
      return;
    }
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
      await this.updateSearchResultView(searchHistory.getKeyword());
      scrollEventLock.unlock();
    }
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
