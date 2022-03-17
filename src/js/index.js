import '../css/index.css';
import Main from './ui/Main';
import SearchModal from './ui/SearchModal';
import { MESSAGE, STORAGE_KEY } from './constants';
import { store } from './domain/store';
import { getVideoInfo } from './domain/youtubeApi';
import { configureVideoData } from './utils/common';
import { showExceptionSnackBar } from './utils/snackBar';

class App {
  constructor() {
    this.main = new Main();
    new SearchModal();
  }

  saveVideoHandler(e) {
    const { videoId } = e.target.dataset;
    try {
      getVideoInfo(videoId).then(response => {
        const saveData = configureVideoData(response.items[0]);
        store.setLocalStorage(STORAGE_KEY, saveData);
        showExceptionSnackBar(MESSAGE.SAVE_COMPLETE);
        e.target.setAttribute('hidden', true);
        this.main.renderVideo(this.tab);
      });
    } catch ({ message }) {
      showExceptionSnackBar(message);
    }
  }

  watchVideoHandler(e) {
    const { videoId } = e.target.dataset;
    const saveVideos = store.getLocalStorage(STORAGE_KEY);

    store.removeLocalStorage(STORAGE_KEY);
    saveVideos.forEach(video => {
      if (video.videoId === videoId) {
        video.watched = !video.watched;
      }
      store.setLocalStorage(STORAGE_KEY, video);
    });

    showExceptionSnackBar(MESSAGE.MODIFY_COMPLETE);

    this.main.renderVideo(this.main.tab);
  }

  deleteVideoHandler(e) {
    if (!confirm(MESSAGE.ASK_DELETE)) return;
    const { videoId } = e.target.dataset;
    const saveVideos = store.getLocalStorage(STORAGE_KEY);

    store.removeLocalStorage(STORAGE_KEY);
    saveVideos.forEach(video => {
      if (video.videoId !== videoId) {
        store.setLocalStorage(STORAGE_KEY, video);
      }
    });

    showExceptionSnackBar(MESSAGE.MODIFY_COMPLETE);

    this.main.renderVideo(this.main.tab);
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
