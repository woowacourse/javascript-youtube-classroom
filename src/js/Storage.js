import { ERROR_MESSAGE, MAX_VIDEO_SAVE, RESULT } from './constants';

const setData = (key, data) => { localStorage.setItem(key, JSON.stringify(data)) };
const getData = (key) => JSON.parse(localStorage.getItem(key));

export default class Storage {
  #videos;

  #status;

  constructor() {
    this.#status = null;
    this.#videos = this.#getLocalStorageVideos();
  }

  get videos() { return this.#videos; }

  get status() { return this.#status; }

  #getLocalStorageVideos() {
    let videos;
    try {
      videos = getData('videos') || [];
    } catch (err) {
      this.#status = RESULT.FAIL;
      console.error(ERROR_MESSAGE.FAIL_TO_READ_SAVED_VIDEO_INFO);
      return [];
    }
    this.#status = RESULT.SUCCESS;
    return videos;
  }

  #setLocalStorageVideos(videos) {
    setData('videos', videos);
  }

  saveVideo(video) {
    if (this.findVideoById(video.id)) {
      throw new Error(ERROR_MESSAGE.ALREADY_SAVED_VIDEO);
    }
    if (this.#videos.length >= MAX_VIDEO_SAVE) {
      throw new Error(ERROR_MESSAGE.MAX_VIDEO_SAVE);
    }
    this.#videos.push(video);
    this.#setLocalStorageVideos(this.#videos);
  }
  
  findVideoById(id) {
    return this.#videos.find((video) => video.id === id);
  }

  updateVideo(newVideo) {
    const index = this.#videos.findIndex((video) => video.id === newVideo.id);
    if (index === -1) {
      throw new Error(ERROR_MESSAGE.CAN_NOT_UPDATE_ON_NOT_SAVED_VIDEO);
    }
    this.#videos.splice(index, 1, newVideo);
    this.#setLocalStorageVideos(this.#videos);
  }
  
  deleteVideoById(id) {
    const index = this.#videos.findIndex((video) => video.id === id);
    if (index === -1) {
      throw new Error(ERROR_MESSAGE.CAN_NOT_DELETE_ON_NOT_SAVED_VIDEO);
    }
    this.#videos.splice(index, 1);
    this.#setLocalStorageVideos(this.#videos);
  }
}

