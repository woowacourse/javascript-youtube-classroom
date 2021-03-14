import VideoStorage from './storageModel/VideoStorage.js';
import { LOCAL_STORAGE_KEY } from './constants.js';
import PrevSearchResult from './storageModel/PrevSearchResult.js';
import ArrayStorage from './storageModel/ArrayStorage.js';

export const watchingVideoModel = new VideoStorage(
  LOCAL_STORAGE_KEY.WATCHING_VIDEOS
);

export const watchedVideoModel = new VideoStorage(
  LOCAL_STORAGE_KEY.WATCHED_VIDEOS
);

export const prevSearchResultModel = new PrevSearchResult(
  LOCAL_STORAGE_KEY.PREV_SEARCH_RESULT
);

export const searchQueryModel = new ArrayStorage(
  LOCAL_STORAGE_KEY.SEARCH_QUERIES
);
