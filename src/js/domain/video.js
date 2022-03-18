import { store } from './store';
import { showSnackBar } from '../utils/dom';
import { STORAGE_KEY, MESSAGE } from '../constants';

export const video = {
  save(videoId) {
    try {
      store.setLocalStorage(STORAGE_KEY, videoId);
      showSnackBar(MESSAGE.SAVE_COMPLETE);
    } catch ({ message }) {
      showSnackBar(message);
    }
  },
};
