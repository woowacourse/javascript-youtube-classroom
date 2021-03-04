import SearchView from "./SearchView.js";
import { ALERT_MESSAGE, API, VIDEOS, YOUTUBE_URL } from "../utils/constants.js";
import { getSearchQueryString } from "../queries/searchQuery.js";
import scrollEventLock from "../state/scrollEventLock.js";
import searchHistory from "../state/searchHistory.js";
import videos from "../state/videos.js";
import loadingSearchResults from "../state/loadingSearchResults.js";

export default class SearchController {
  constructor() {
    this.searchView = new SearchView();
    this.nextPageToken = "";
  }

  async searchVideos() {
    if (searchHistory.getPageToken() === "") {
      this.searchView.resetSearchResults();
      loadingSearchResults.resetLoadCount();
      this.searchView.showSkeletonClip();
    }

    const res = await fetch(
      `${YOUTUBE_URL}/${API.GET.SEARCH}?${getSearchQueryString()}`
    );
    if (!res.ok) throw new Error(res.status);
    const { items, nextPageToken } = await res.json();

    this.nextPageToken = nextPageToken;
    this.fetchVideos(items);
  }

  fetchVideos(videoItems) {
    if (videoItems.length === 0) {
      if (searchHistory.getPageToken()) {
        return;
      }

      this.searchView.showNotFoundImg();
    } else {
      videos.setFetchedVideos(videoItems);
      this.searchView.showSearchResults();
      searchHistory.setPageToken(this.nextPageToken);
    }
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

  updateKeywordHistory() {
    this.searchView.showKeywordHistory();
  }

  saveVideo(videoId) {
    if (videos.getSavedVideoCount() >= VIDEOS.SAVED_VIDEOS_MAX_COUNT) {
      alert(ALERT_MESSAGE.SAVE_COUNT_EXCEEDED_ERROR);
      return;
    }

    videos.setSavedVideos(videoId);
    this.searchView.hideSavedVideoButton(videoId);
    this.showSavedVideoCount();
  }

  showSavedVideoCount() {
    this.searchView.showSavedVideoCount();
  }
}
