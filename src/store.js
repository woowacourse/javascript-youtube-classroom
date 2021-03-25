import { LOCAL_STORAGE_KEY } from './constants.js';
import VideoStorage from './storage/VideoStorage.js';
import PrevSearchResultStorage from './storage/PrevSearchResultStorage.js';
import ArrayStorage from './storage/ArrayStorage.js';

export const watchingVideoStorage = new VideoStorage(
  LOCAL_STORAGE_KEY.WATCHING_VIDEOS
);

export const watchedVideoStorage = new VideoStorage(
  LOCAL_STORAGE_KEY.WATCHED_VIDEOS
);

export const prevSearchResultStorage = new PrevSearchResultStorage(
  LOCAL_STORAGE_KEY.PREV_SEARCH_RESULT
);

export const searchQueryStorage = new ArrayStorage(
  LOCAL_STORAGE_KEY.SEARCH_QUERIES
);
