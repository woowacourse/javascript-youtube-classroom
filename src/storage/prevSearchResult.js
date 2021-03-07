import { LOCAL_STORAGE_KEY } from '../constants.js';
import { getLocalStorageItem } from './localStorage.js';

const prevSearchResult = {
  getLastQuery() {
    return getLocalStorageItem(LOCAL_STORAGE_KEY.LAST_QUERY);
  },

  getNextPageToken() {
    return getLocalStorageItem(LOCAL_STORAGE_KEY.NEXT_PAGE_TOKEN);
  },

  getSearchedVideos() {
    return getLocalStorageItem(LOCAL_STORAGE_KEY.PREVIOUS_SEARCH_VIDEOS) || [];
  },

  setLastQuery(value) {
    localStorage.setItem(LOCAL_STORAGE_KEY.LAST_QUERY, JSON.stringify(value));
  },

  setNextPageToken(value) {
    localStorage.setItem(
      LOCAL_STORAGE_KEY.NEXT_PAGE_TOKEN,
      JSON.stringify(value)
    );
  },

  setVideos(videos) {
    localStorage.setItem(
      LOCAL_STORAGE_KEY.PREVIOUS_SEARCH_VIDEOS,
      JSON.stringify(videos)
    );
  },
};

export default prevSearchResult;
