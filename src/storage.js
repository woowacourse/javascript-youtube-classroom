import { LOCAL_STORAGE_KEY } from './constants.js';
import VideoStorage from './storage/VideoStorage.js';
import PrevSearchResultStorage from './storage/PrevSearchResultStorage.js';
import ArrayStorage from './storage/ArrayStorage.js';

const watchingVideo = new VideoStorage(LOCAL_STORAGE_KEY.WATCHING_VIDEOS);

const watchedVideo = new VideoStorage(LOCAL_STORAGE_KEY.WATCHED_VIDEOS);

const prevSearchResult = new PrevSearchResultStorage(
  LOCAL_STORAGE_KEY.PREV_SEARCH_RESULT
);

const searchQuery = new ArrayStorage(LOCAL_STORAGE_KEY.SEARCH_QUERIES);

const storage = {
  watchingVideo,
  watchedVideo,
  prevSearchResult,
  searchQuery,
};

export default storage;
