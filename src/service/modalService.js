import { SETTINGS } from '../constants';
import storage from '../storage.js';

const modalService = {
  getPrevSearchInfo() {
    return {
      lastQuery: storage.prevSearchResult.getItem().lastQuery,
      pageToken: storage.prevSearchResult.getItem().nextPageToken,
    };
  },

  getProcessedVideos(videos) {
    return videos.map(video => ({
      ...video,
      isSaved:
        isVideoIdExist(storage.watchingVideo.getItem(), video.videoId) ||
        isVideoIdExist(storage.watchedVideo.getItem(), video.videoId),
    }));
  },

  saveSearchQuery(searchQuery) {
    const filteredQueries = storage.searchQuery
      .getItem()
      .filter(query => searchQuery !== query);
    filteredQueries.push(searchQuery);
    if (filteredQueries.length > SETTINGS.MAX_SAVED_SEARCH_QUERY_COUNT) {
      filteredQueries.shift();
    }
    storage.searchQuery.setItem(filteredQueries);
  },

  savePrevSearchInfo({ lastQuery, nextPageToken }) {
    if (lastQuery) {
      storage.prevSearchResult.setItem({ lastQuery });
    }
    if (nextPageToken) {
      storage.prevSearchResult.setItem({ nextPageToken });
    }
  },
  savePrevSearchedVideos(videos) {
    storage.prevSearchResult.setItem({ prevSearchedVideos: videos });
  },
};

function isVideoIdExist(videos, videoId) {
  return videos.some(video => video.videoId === videoId);
}

export default modalService;
