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

  #subscribers = [];

  constructor() {
    this.#videos = this.loadVideos();
  }

  subscribe(element) {
    this.#subscribers.push(element);
  }

  dispatch(action, data) {
    localStorage.setItem('videos', data);
    this.#videos = this.loadVideos();

    this.#subscribers.forEach((subscriber) => {
      subscriber.notify(action, data);
    });
  }

  subscribeEvents(videoItem) {
    on('.video-item__save-button', '@save', (e) => this.saveVideo(e.detail.videoId), videoItem);
  }

  subscribeWatchEvent(videoItem) {
    on('.video-item__state-button', '@watch', (e) => this.updateVideoState(e.detail.id), videoItem);
    on('.video-item__state-button', '@remove', (e) => this.removeVideo(e.detail.id), videoItem);
  }

  saveVideo(videoId) {
    try {
      if (this.#videos.length >= VIDEO.MAX_SAVABLE_COUNT) {
        throw new Error(ERROR_MESSAGE.EXCEED_MAX_SAVABLE_COUNT);
      }

      const videoInfo = VideoStore.instance.findVideo(videoId);

      this.dispatch('save', JSON.stringify([...this.#videos, { ...videoInfo, isWatched: false }]));
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

  updateVideoState(videoId) {
    const currentVideo = this.findVideo(videoId);

    currentVideo.isWatched = !currentVideo.isWatched;
    this.dispatch('watch', JSON.stringify([...this.#videos]));
  }

  removeVideo(videoId) {
    this.dispatch('remove', JSON.stringify(this.#videos.filter((video) => video.id !== videoId)));
  }
}

export default Save;
