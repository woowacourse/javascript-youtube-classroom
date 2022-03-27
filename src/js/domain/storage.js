import { MAX_SAVE_AMOUNT, STORAGE_KEY, ERROR_MESSAGES } from '../constants/constants';

const getSavedVideoArray = () => JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

const setSavedVideoArray = (videoArray) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(videoArray));
};

const addSavedVideo = (video) => {
  const savedVideos = getSavedVideoArray();
  if (savedVideos.length >= MAX_SAVE_AMOUNT) {
    throw new Error(ERROR_MESSAGES.EXCEED_MAX_SAVE_AMOUNT);
  }
  const videoToSave = { ...video, isSaved: true, isWatched: false };
  savedVideos.push(videoToSave);
  setSavedVideoArray(savedVideos);
};

const isSavedVideo = (id) => getSavedVideoArray().find((savedVideo) => savedVideo.videoId === id);

const storage = {
  getSavedVideoArray,
  addSavedVideo,
  isSavedVideo,
  setSavedVideoArray,
};

export default storage;
