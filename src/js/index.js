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
        this.main.renderVideo(false);
      });
    } catch ({ message }) {
      showExceptionSnackBar(message);
    }
  }
}

const app = new App();
global.saveVideo = e => {
  app.saveVideoHandler(e);
};
