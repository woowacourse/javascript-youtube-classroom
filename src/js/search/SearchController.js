import SearchView from "./SearchView.js";
import { API, YOUTUBE_URL } from "../utils/constants.js";
import { getSearchQueryString } from "../queries/searchQuery.js";
import pageToken from "../state/pageToken.js";
import scrollEventLock from "../state/scrollEventLock.js";

export default class SearchController {
  constructor() {
    this.searchView = new SearchView();
  }

  async searchVideos(keyword) {
    this.keyword = keyword;

    const res = await fetch(
      `${YOUTUBE_URL}/${API.GET.SEARCH}?${getSearchQueryString(keyword)}`
    );
    if (!res.ok) throw new Error(res.status);
    const { items, nextPageToken } = await res.json();

    pageToken.set(nextPageToken);
    this.fetchVideos(items);
  }

  fetchVideos(videoItems) {
    if (videoItems.length === 0) {
      if (pageToken.get()) {
        return;
      }

      this.searchView.showNotFoundImg();
    } else {
      const searchResults = videoItems.map((videoItem) => {
        return {
          videoId: videoItem.id.videoId,
          title: videoItem.snippet.title,
          channelId: videoItem.snippet.channelId,
          channelTitle: videoItem.snippet.channelTitle,
          publishedAt: videoItem.snippet.publishedAt,
        };
      });

      this.searchView.showSearchResults(searchResults, pageToken.get());
    }
  }

  async addVideos($target) {
    const { clientHeight, scrollTop, scrollHeight } = $target;
    const isBottom = clientHeight + scrollTop >= scrollHeight - 5;

    if (isBottom && !scrollEventLock.isLocked()) {
      scrollEventLock.lock();
      await this.searchVideos(this.keyword);
      scrollEventLock.unlock();
    }
  }
}
