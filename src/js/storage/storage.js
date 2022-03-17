import { MAX_VIDEO_COUNT } from '../constants/constants.js';

const storage = {
  setLocalStorage(video) {
    localStorage.setItem('data', JSON.stringify(video));
  },
  getLocalStorage() {
    return JSON.parse(localStorage.getItem('data'));
  },
  updateLocalStorage(videoData) {
    const savedVideoData = this.getLocalStorage();
    if (savedVideoData.length > MAX_VIDEO_COUNT) {
      return;
    }
    if (savedVideoData.some((video) => video.videoId === videoData.videoId)) {
      return;
    }
    this.setLocalStorage([...savedVideoData, videoData]);
  },
  saveVideo(videoData) {
    if (this.getLocalStorage()) {
      this.updateLocalStorage(videoData);
      return;
    }
    this.setLocalStorage([videoData]);
  },
};

export default storage;
