import VideoStorage from './storageModel/VideoStorage.js';
import { LOCAL_STORAGE_KEY } from './constants.js';
import PrevSearchResult from './storageModel/PrevSearchResult.js';
import ArrayStorage from './storageModel/ArrayStorage.js';
import VideoList from './model/VideoList.js';
import VideoFilter from './model/VideoFilter.js';
import VideoSlicer from './model/VideoSlicer.js';

export const savedVideoModel = new VideoStorage(LOCAL_STORAGE_KEY.SAVED_VIDEOS);
export const searchQueryModel = new ArrayStorage(LOCAL_STORAGE_KEY.SEARCH_QUERIES);
export const prevSearchResultModel = new PrevSearchResult(LOCAL_STORAGE_KEY.PREV_SEARCH_INFO);

export const searchedVideoModel = new VideoList();
export const videoSlicer = new VideoSlicer();
export const savedVideoFilter = new VideoFilter();
