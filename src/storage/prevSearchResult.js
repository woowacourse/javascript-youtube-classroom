import { LOCAL_STORAGE_KEY } from '../constants.js';
import {
  getLocalStorageItem,
  setLocalStorageItem,
} from './localStorageUtil.js';

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
    setLocalStorageItem(LOCAL_STORAGE_KEY.LAST_QUERY, JSON.stringify(value));
  },

  setNextPageToken(value) {
    setLocalStorageItem(
      LOCAL_STORAGE_KEY.NEXT_PAGE_TOKEN,
      JSON.stringify(value)
    );
  },

  setVideos(videos) {
    setLocalStorageItem(
      LOCAL_STORAGE_KEY.PREVIOUS_SEARCH_VIDEOS,
      JSON.stringify(videos)
    );
  },
};

export default prevSearchResult;
