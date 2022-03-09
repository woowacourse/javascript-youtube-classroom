const setData = (key, data) => localStorage.setItem(key, JSON.stringify(data));
const getData = (key) => JSON.parse(localStorage.getItem(key));

const SAVED_VIDEO_MAX = 100;
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
    if (this.videoIds.length >= SAVED_VIDEO_MAX) {
      throw new Error('저장 에러! 영상은 최대 100개만 저장할 수 있습니다.');
    }
    this.videoIds.push(id);
    setData('id', this.videoIds);
  }
}
