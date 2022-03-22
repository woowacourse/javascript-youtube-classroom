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
    if (savedStorage.length > LIMIT_VIDEO_COUNTS - 1) {
      return;
    }
    if (savedStorage.some(video => video.id === data.id)) {
      return;
    }
    this.setLocalStorage([...savedStorage, data]);
  },
  saveVideo(item) {
    const video = {
      id: item.id.videoId,
      snippet: item.snippet,
      watched: false,
    };
    const savedStorage = this.getLocalStorage();

    if (savedStorage) {
      this.updateLocalStorage(video);
      return;
    }
    this.setLocalStorage([video]);
  },
  toggleWatchedVideo(videoId) {
    const savedVideoStorage = this.getLocalStorage();
    const updatedVideoStorage = savedVideoStorage.map(item => {
      const video = {
        id: item.id,
        snippet: item.snippet,
        watched: item.watched,
      };
      if (item.id === videoId) {
        video.watched = !item.watched;
      }
      return video;
    });
    this.setLocalStorage(updatedVideoStorage);
  },
  deleteSavedVideo(videoId) {
    const savedVideoStorage = this.getLocalStorage();
    const updatedVideoStorage = savedVideoStorage.filter(item => {
      if (videoId !== item.id) {
        const video = {
          id: item.id,
          snippet: item.snippet,
          watched: item.watched,
        };
        return video;
      }
    });
    this.setLocalStorage(updatedVideoStorage);
  },
};

export default storage;
