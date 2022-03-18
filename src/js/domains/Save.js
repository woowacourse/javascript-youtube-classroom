import { on } from '../utils';
import { ERROR_MESSAGE, VIDEO } from '../constants';
import VideoStore from '../VideoStore';

class Save {
  static _instance = null;

  static get instance() {
    if (!Save._instance) {
      Save._instance = new Save();
    }
    return Save._instance;
  }

  #videos;

  constructor() {
    this.#videos = this.loadVideos();
  }

  subscribeEvents(videoItem) {
    on('.video-item__save-button', '@save', (e) => this.saveVideo(e.detail.videoId), videoItem);
  }

  saveVideo(videoId) {
    try {
      if (this.#videos.length >= VIDEO.MAX_SAVABLE_COUNT) {
        throw new Error(ERROR_MESSAGE.EXCEED_MAX_SAVABLE_COUNT);
      }
      const videoInfo = VideoStore.instance.findVideo(videoId);
      localStorage.setItem(
        'videos',
        JSON.stringify([...this.#videos, { ...videoInfo, isWatched: false }])
      );
      this.#videos = this.loadVideos();
    } catch (error) {
      alert(error.message);
    }
  }

  getVideos() {
    return this.#videos;
  }

  loadVideos() {
    return JSON.parse(localStorage.getItem('videos')) ?? [];
  }

  getFilteredVideos(state) {
    return this.#videos.filter((video) => video.isWatched === state);
  }

  findVideo(videoId) {
    return this.#videos.find((video) => video.id === videoId);
  }
}

export default Save;
