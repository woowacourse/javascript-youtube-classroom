import { store } from './store';
import { showSnackBar } from '../utils/dom';
import { STORAGE_KEY, MESSAGE } from '../constants';

export const video = {
  save(e) {
    const videoId = e.target.closest('li').dataset.videoId;

    try {
      store.setLocalStorage(STORAGE_KEY, videoId);
      showSnackBar(MESSAGE.SAVE_COMPLETE);
      e.target.setAttribute('hidden', true);
    } catch ({ message }) {
      showSnackBar(message);
    }
  },
};
