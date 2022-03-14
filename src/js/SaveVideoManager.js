import { ERROR_MESSAGE } from './constants';
import { isOverVideoSaveMaxCount } from './validation';

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
    if (isOverVideoSaveMaxCount(this.videoIds)) {
      throw new Error(ERROR_MESSAGE.MAX_VIDEO_SAVE);
    }
    if (this.findVideoById(id)) {
      throw new Error('이미 저장한 동영상입니다');
    }
    this.videoIds.push(id);
    setData('id', this.videoIds);
  }
}
