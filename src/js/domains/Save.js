import { on } from '../utils';
import { ERROR_MESSAGE, VIDEO } from '../constants';

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

      localStorage.setItem('videos', JSON.stringify([...this.#videos, { videoId }]));
      this.#setVideos();
    } catch (error) {
      alert(error.message);
    }
  }

  getVideos() {
    return this.#videos;
  }

  #setVideos() {
    this.#videos = this.loadVideos();
  }

  loadVideos() {
    return JSON.parse(localStorage.getItem('videos')) ?? [];
  }
}

export default Save;
