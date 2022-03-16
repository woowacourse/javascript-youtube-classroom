import { MAX_SAVE_AMOUNT, STORAGE_KEY, ERROR_MESSAGES } from '../constants/constants';

function getSavedVideos() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY));
}

function setSavedVideos(videoId) {
  const idObj = getSavedVideos() || {};
  if (Object.keys(idObj).length >= MAX_SAVE_AMOUNT) {
    throw new Error(ERROR_MESSAGES.EXCEED_MAX_SAVE_AMOUNT);
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...idObj, [videoId]: true }));
}

const storage = {
  getSavedVideos,
  setSavedVideos,
};

export default storage;
