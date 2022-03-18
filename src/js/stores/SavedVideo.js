import { on } from '../utils';
import { ERROR_MESSAGE, VIDEO } from '../constants';
import SearchedVideo from './SearchedVideo';

class SavedVideo {
  static _instance = null;

  static get instance() {
    if (!SavedVideo._instance) {
      SavedVideo._instance = new SavedVideo();
    }
    return SavedVideo._instance;
  }

  #videos;

  #subscribers = [];
  // MyVideoList : 비디오 상태가 변경되면 알아내야 하기 때문

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

      const videoInfo = SearchedVideo.instance.findVideo(videoId);

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

export default SavedVideo;
