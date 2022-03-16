import {
  MAX_SAVE_AMOUNT,
  ERROR_MESSAGES,
  UNWATCHED_LIST_KEY,
  WATCHED_LIST_KEY,
} from '../constants/constants';

function getUnwatchedVideos() {
  return JSON.parse(localStorage.getItem(UNWATCHED_LIST_KEY)) || [];
}

function getWatchedVideos() {
  return JSON.parse(localStorage.getItem(WATCHED_LIST_KEY)) || [];
}

function saveVideosToUnwatchedList(videoId) {
  const idObj = getUnwatchedVideos();
  if (idObj.length >= MAX_SAVE_AMOUNT) {
    throw new Error(ERROR_MESSAGES.EXCEED_MAX_SAVE_AMOUNT);
  }
  localStorage.setItem(UNWATCHED_LIST_KEY, JSON.stringify([...idObj, videoId]));
}

function saveVideosToWatchedList(videoId) {
  const idObj = getWatchedVideos();
  if (idObj.length >= MAX_SAVE_AMOUNT) {
    throw new Error(ERROR_MESSAGES.EXCEED_MAX_SAVE_AMOUNT);
  }
  localStorage.setItem(WATCHED_LIST_KEY, JSON.stringify([...idObj, videoId]));
}

const storage = {
  getUnwatchedVideos,
  getWatchedVideos,
  saveVideosToUnwatchedList,
  saveVideosToWatchedList,
};

export default storage;
