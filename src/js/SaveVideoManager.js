import { ERROR_MESSAGE, MAX_VIDEO_SAVE } from './constants';

const setData = (key, data) => localStorage.setItem(key, JSON.stringify(data));
const getData = (key) => JSON.parse(localStorage.getItem(key));

export default class SaveVideoManager {
  constructor() {
    this.videoIds = this.getVideoIds();
  }

  getVideoIds() {
    return getData('id') || [];
  }

  findVideoById(id) {
    return this.videoIds.includes(id);
  }

  saveVideoById(id) {
    if (this.videoIds.length >= MAX_VIDEO_SAVE) {
      throw new Error(ERROR_MESSAGE.MAX_VIDEO_SAVE);
    }
    this.videoIds.push(id);
    setData('id', this.videoIds);
  }
}
