import { showSnackBar } from '../utils/dom';
import { STORAGE_KEY, MESSAGE, MAX_SAVE_COUNT } from '../constants';

export const video = {
  save(videoData) {
    try {
      const savedVideoList = this.get();
      if (savedVideoList.length >= MAX_SAVE_COUNT) {
        throw new Error(MESSAGE.ERROR_EXCESS_SAVE_COUNT);
      }
      savedVideoList.push(videoData);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(savedVideoList));
      showSnackBar(MESSAGE.SAVE_SUCCESS);
    } catch {
      showSnackBar(MESSAGE.SAVE_FAILURE);
    }
  },

  check(videoId) {
    try {
      const savedVideoList = this.get();
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
      const savedVideoList = this.get();
      const updatedVideoList = savedVideoList.filter(savedVideo => savedVideo.videoId !== videoId);
      localStorage.removeItem(STORAGE_KEY);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedVideoList));
      showSnackBar(MESSAGE.REMOVE_SUCCESS);
    } catch {
      showSnackBar(MESSAGE.REMOVE_FAILURE);
    }
  },

  get() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? [];
  },
};
