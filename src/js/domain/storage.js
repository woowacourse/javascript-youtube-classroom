import { MAX_SAVE_AMOUNT, STORAGE_KEY, ERROR_MESSAGES } from '../constants/constants';

function getSavedVideos() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

function setSavedVideos(videoArray) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(videoArray));
}

function addSavedVideos(video) {
  const savedVideos = getSavedVideos();
  if (savedVideos.length >= MAX_SAVE_AMOUNT) {
    throw new Error(ERROR_MESSAGES.EXCEED_MAX_SAVE_AMOUNT);
  }
  const videoToSave = { ...video, isSaved: true, isWatched: false };
  savedVideos.push(videoToSave);
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...savedVideos]));
}

function isSavedVideo(id) {
  return getSavedVideos().find((savedVideo) => savedVideo.videoId === id);
}

const storage = {
  getSavedVideos,
  addSavedVideos,
  isSavedVideo,
  setSavedVideos,
};

export default storage;
