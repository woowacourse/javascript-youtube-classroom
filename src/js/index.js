import '../css/index.css';
import Main from './ui/Main';
import SearchModal from './ui/SearchModal';
import { MESSAGE, STORAGE_KEY } from './constants';
import { store } from './domain/store';
import { configureVideoData } from './utils/common';
import { showExceptionSnackBar } from './utils/snackBar';

class App {
  constructor() {
    this.main = new Main();
    new SearchModal();
  }

  saveVideoHandler(e) {
    const saveData = configureVideoData(e.target.parentNode.dataset);

    try {
      store.setLocalStorage(STORAGE_KEY.VIDEO, saveData);
      showExceptionSnackBar(MESSAGE.SAVE_COMPLETE);
      e.target.setAttribute('hidden', true);
      this.main.addVideo(saveData);
    } catch ({ message }) {
      showExceptionSnackBar(message);
    }
  }

  watchVideoHandler(e) {
    const { videoId } = e.target.dataset;
    const saveVideos = store.getLocalStorage(STORAGE_KEY.VIDEO);

    store.removeLocalStorage(STORAGE_KEY.VIDEO);
    saveVideos.forEach(video => {
      if (video.videoId === videoId) {
        video.watched = !video.watched;
      }
      store.setLocalStorage(STORAGE_KEY.VIDEO, video);
    });

    showExceptionSnackBar(MESSAGE.MODIFY_COMPLETE);

    this.main.removeVideo(e.target);
  }

  deleteVideoHandler(e) {
    if (!confirm(MESSAGE.ASK_DELETE)) return;
    const { videoId } = e.target.dataset;
    const saveVideos = store.getLocalStorage(STORAGE_KEY.VIDEO);

    store.removeLocalStorage(STORAGE_KEY.VIDEO);
    saveVideos.forEach(video => {
      if (video.videoId !== videoId) {
        store.setLocalStorage(STORAGE_KEY.VIDEO, video);
      }
    });

    showExceptionSnackBar(MESSAGE.MODIFY_COMPLETE);

    this.main.removeVideo(e.target);
  }
}

const app = new App();
global.saveVideo = e => {
  app.saveVideoHandler(e);
};
global.reverseWatchVideo = e => {
  app.watchVideoHandler(e);
};
global.deleteVideo = e => {
  app.deleteVideoHandler(e);
};
