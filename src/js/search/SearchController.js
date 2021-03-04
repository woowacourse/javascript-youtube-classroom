import SearchView from "./SearchView.js";
import { API, YOUTUBE_URL } from "../utils/constants.js";
import { getSearchQueryString } from "../queries/searchQuery.js";
import scrollEventLock from "../state/scrollEventLock.js";
import searchHistory from "../state/searchHistory.js";
import videos from "../state/videos.js";

export default class SearchController {
  constructor() {
    this.searchView = new SearchView();
    this.nextPageToken = "";
  }

  async searchVideos() {
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
    videos.setSavedVideos(videoId);
    this.searchView.hideSavedVideoButton(videoId);
    this.showSavedVideoCount();
  }

  showSavedVideoCount() {
    this.searchView.showSavedVideoCount();
  }
}
