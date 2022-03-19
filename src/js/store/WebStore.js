import { ALERT_MESSAGE, MAX_SAVE_COUNT } from '../constant.js';

export default class WebStore {
  #key;

  #cached;

  constructor(key) {
    this.#key = key;
    this.#cached = JSON.parse(localStorage.getItem(this.#key)) || [];
  }

  #cache(data) {
    this.#cached = [...data];
  }

  load() {
    return [...this.#cached] || JSON.parse(localStorage.getItem(this.#key));
  }

  save(data) {
    console.log('data', data);
    if (this.#cached.length >= MAX_SAVE_COUNT) {
      throw new Error(ALERT_MESSAGE.EXCEED_MAX_SAVE_VOLUME);
    }
    this.#cache(data);
    localStorage.setItem(this.#key, JSON.stringify(data));
  }

  saveVideo(video) {
    console.log('video', video);
    this.save([...this.#cached, { ...video, saved: true, watched: false }]);
  }

  getWatchedVideo() {
    return this.#cached.filter(video => video.watched === true);
  }

  getWatchedVideoLength() {
    return this.getWatchedVideo().length;
  }

  getWatchingVideoLength() {
    return this.#cached.length - this.getWatchedVideoLength();
  }

  changeWatchedInLocalStorage(videoId) {
    const payload = this.#cached.map(video => {
      if (video.videoId === videoId) {
        video.watched = !video.watched;
      }
      return video;
    });
    this.save(payload);
  }

  deleteVideoInLocalStorage(videoId) {
    const payload = this.#cached.filter(video => video.videoId !== videoId);
    this.save(payload);
  }
}

export const webStore = new WebStore('savedVideos');
