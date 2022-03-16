import { MAX_VIDEO_COUNT } from '../constants/constants.js';

const storage = {
  setLocalStorage(video) {
    localStorage.setItem('data', JSON.stringify(video));
  },
  getLocalStorage() {
    return JSON.parse(localStorage.getItem('data'));
  },
  updateLocalStorage(videoId) {
    const savedStorage = this.getLocalStorage();
    if (savedStorage.length > MAX_VIDEO_COUNT) {
      return;
    }
    if (savedStorage.some((savedId) => savedId === videoId)) {
      return;
    }
    this.setLocalStorage([...savedStorage, videoId]);
  },
  saveVideo(videoId) {
    if (this.getLocalStorage()) {
      this.updateLocalStorage(videoId);
      return;
    }
    this.setLocalStorage([videoId]);
  },
};

export default storage;
