import { SETTINGS } from '../constants';
import {
  watchedVideoModel,
  watchingVideoModel,
  prevSearchResultModel,
  searchQueryModel,
} from '../store.js';

const modalService = {
  getPrevSearchInfo() {
    return {
      lastQuery: prevSearchResultModel.getItem().lastQuery,
      pageToken: prevSearchResultModel.getItem().nextPageToken,
    };
  },
  getProcessedVideos(videos) {
    return videos.map(video => ({
      ...video,
      isSaved:
        isVideoIdExist(watchingVideoModel.getItem(), video.videoId) ||
        isVideoIdExist(watchedVideoModel.getItem(), video.videoId),
    }));
  },
  saveSearchQuery(searchQuery) {
    const filteredQueries = searchQueryModel
      .getItem()
      .filter(query => searchQuery !== query);
    filteredQueries.push(searchQuery);
    if (filteredQueries.length > SETTINGS.MAX_SAVED_SEARCH_QUERY_COUNT) {
      filteredQueries.shift();
    }
    searchQueryModel.setItem(filteredQueries);
  },
  savePrevSearchInfo({ lastQuery, nextPageToken }) {
    if (lastQuery) {
      prevSearchResultModel.setItem({ lastQuery });
    }
    if (nextPageToken) {
      prevSearchResultModel.setItem({ nextPageToken });
    }
  },
  savePrevSearchedVideos(videos) {
    prevSearchResultModel.setItem({ prevSearchedVideos: videos });
  },
};

function isVideoIdExist(videos, videoId) {
  return videos.some(video => video.videoId === videoId);
}

export default modalService;
