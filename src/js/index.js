import '../css/index.css';
import { MESSAGE, STORAGE_KEY } from './constants';
import { store } from './domain/store';
import SearchModal from './ui/SearchModal';
import { showExceptionSnackBar } from './utils/snackBar';

global.saveVideo = e => {
  const videoId = e.target.closest('li').dataset.videoId;
  try {
    store.setLocalStorage(STORAGE_KEY, videoId);
    showExceptionSnackBar(MESSAGE.SAVE_COMPLETE);
    e.target.setAttribute('hidden', true);
  } catch ({ message }) {
    showExceptionSnackBar(message);
  }
};

new SearchModal();
