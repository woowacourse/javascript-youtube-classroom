import { SETTINGS } from '../constants';
import {
  watchedVideoStorage,
  watchingVideoStorage,
  prevSearchResultStorage,
  searchQueryStorage,
} from '../store.js';

const modalService = {
  getPrevSearchInfo() {
    return {
      lastQuery: prevSearchResultStorage.getItem().lastQuery,
      pageToken: prevSearchResultStorage.getItem().nextPageToken,
    };
  },

  getProcessedVideos(videos) {
    return videos.map(video => ({
      ...video,
      isSaved:
        isVideoIdExist(watchingVideoStorage.getItem(), video.videoId) ||
        isVideoIdExist(watchedVideoStorage.getItem(), video.videoId),
    }));
  },

  saveSearchQuery(searchQuery) {
    const filteredQueries = searchQueryStorage
      .getItem()
      .filter(query => searchQuery !== query);
    filteredQueries.push(searchQuery);
    if (filteredQueries.length > SETTINGS.MAX_SAVED_SEARCH_QUERY_COUNT) {
      filteredQueries.shift();
    }
    searchQueryStorage.setItem(filteredQueries);
  },

  savePrevSearchInfo({ lastQuery, nextPageToken }) {
    if (lastQuery) {
      prevSearchResultStorage.setItem({ lastQuery });
    }
    if (nextPageToken) {
      prevSearchResultStorage.setItem({ nextPageToken });
    }
  },
  savePrevSearchedVideos(videos) {
    prevSearchResultStorage.setItem({ prevSearchedVideos: videos });
  },
};

function isVideoIdExist(videos, videoId) {
  return videos.some(video => video.videoId === videoId);
}

export default modalService;
