import { MAX_SAVE_AMOUNT, STORAGE_KEY, ERROR_MESSAGES } from '../constants/constants';

function getSavedVideos() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

function setSavedVideos(video) {
  const savedVideos = getSavedVideos();
  if (savedVideos.length >= MAX_SAVE_AMOUNT) {
    throw new Error(ERROR_MESSAGES.EXCEED_MAX_SAVE_AMOUNT);
  }
  const videoToSave = { ...video, isSaved: true };
  savedVideos.push(videoToSave);
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...savedVideos]));
}

function isSavedVideo(id) {
  return getSavedVideos().find((savedVideo) => savedVideo.videoId === id);
}

const storage = {
  getSavedVideos,
  setSavedVideos,
  isSavedVideo,
};

export default storage;
