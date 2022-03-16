import '../css/index.css';
import Video from './ui/Video';
import SearchModal from './ui/SearchModal';
import { MESSAGE, STORAGE_KEY } from './constants';
import { store } from './domain/store';
import { getVideoInfo } from './domain/youtubeApi';
import { configureVideoData } from './utils/common';
import { showExceptionSnackBar } from './utils/snackBar';

global.saveVideo = e => {
  const videoId = e.target.dataset.videoId;
  try {
    getVideoInfo(videoId).then(response => {
      const saveData = configureVideoData(response.items[0]);
      store.setLocalStorage(STORAGE_KEY, saveData);
      showExceptionSnackBar(MESSAGE.SAVE_COMPLETE);
      e.target.setAttribute('hidden', true);
    });
  } catch ({ message }) {
    showExceptionSnackBar(message);
  }
};

new Video();
new SearchModal();
