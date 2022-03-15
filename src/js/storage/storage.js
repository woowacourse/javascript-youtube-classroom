import { LIMIT_VIDEO_COUNTS } from '../constants/constants.js';

const storage = {
  setLocalStorage(video) {
    localStorage.setItem('savedVideoStorage', JSON.stringify(video));
  },
  getLocalStorage() {
    return JSON.parse(localStorage.getItem('savedVideoStorage'));
  },
  updateLocalStorage(data) {
    const savedStorage = this.getLocalStorage();
    if (savedStorage.length > LIMIT_VIDEO_COUNTS) {
      return;
    }
    if (savedStorage.some(video => video.id === data.id)) {
      return;
    }
    this.setLocalStorage([...savedStorage, data]);
  },
  saveVideo(videoId) {
    const video = {
      id: videoId,
    };
    const savedStorage = this.getLocalStorage();

    if (savedStorage) {
      this.updateLocalStorage(video);
      return;
    }
    this.setLocalStorage([video]);
  },
};

export default storage;
