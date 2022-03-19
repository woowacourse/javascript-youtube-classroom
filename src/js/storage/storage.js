import { VIDEO, STORAGE_KEY } from '../constants/constants.js';

const storage = {
  setLocalStorage(video) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(video));
  },
  getLocalStorage() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY));
  },
  updateLocalStorage(videoData) {
    const savedVideoData = this.getLocalStorage();
    if (savedVideoData.length > VIDEO.MAX_SAVE_COUNT) {
      return;
    }
    if (savedVideoData.some((video) => video.videoId === videoData[0].videoId)) {
      return;
    }
    this.setLocalStorage([...savedVideoData, ...videoData]);
  },
  saveVideo(videoData) {
    if (this.getLocalStorage()) {
      this.updateLocalStorage(videoData);
      return;
    }
    this.setLocalStorage(videoData);
  },
  resetLocalStorage() {
    localStorage.clear();
  },
};

export default storage;
