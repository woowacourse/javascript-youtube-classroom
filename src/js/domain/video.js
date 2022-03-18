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
};
