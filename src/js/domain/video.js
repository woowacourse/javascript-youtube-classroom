import { store } from './store';
import { showSnackBar } from '../utils/dom';
import { STORAGE_KEY, MESSAGE } from '../constants';

export const video = {
  save(videoData) {
    try {
      store.setLocalStorage(STORAGE_KEY, videoData);
      showSnackBar(MESSAGE.SAVE_SUCCESS);
    } catch {
      showSnackBar(MESSAGE.SAVE_FAILURE);
    }
  },

  check(videoId) {
    try {
      const savedVideoList = store.getLocalStorage(STORAGE_KEY);
      const updatedVideoList = savedVideoList.map(savedVideo => {
        if (savedVideo.videoId === videoId) {
          savedVideo.watched = true;
        }
        return savedVideo;
      });
      localStorage.removeItem(STORAGE_KEY);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedVideoList));
      showSnackBar(MESSAGE.CHECK_SUCCESS);
    } catch {
      showSnackBar(MESSAGE.CHECK_FAILURE);
    }
  },

  remove(videoId) {
    try {
      const savedVideoList = store.getLocalStorage(STORAGE_KEY);
      const updatedVideoList = savedVideoList.filter(savedVideo => savedVideo.videoId !== videoId);
      localStorage.removeItem(STORAGE_KEY);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedVideoList));
      showSnackBar(MESSAGE.REMOVE_SUCCESS);
    } catch {
      showSnackBar(MESSAGE.REMOVE_FAILURE);
    }
  },
};
