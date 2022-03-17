import { ERROR_MESSAGE } from '../constants';
import { isOverVideoSaveMaxCount } from '../validation';

const setData = (key, data) => localStorage.setItem(key, JSON.stringify(data));
const getData = (key) => JSON.parse(localStorage.getItem(key));

export default class SaveVideoManager {
  constructor() {
    this.videoData = this.getVideoData();
  }

  getVideoData() {
    return getData('id') || [];
  }

  findVideoById(id) {
    return this.videoData.some((video) => video.id === id);
  }

  saveVideoBy(video) {
    const videoInfo = {
      id: video.dataset.videoId,
      thumbnail: video.children[0].currentSrc,
      title: video.children[1].textContent,
      channelName: video.children[2].textContent,
      publishedDate: video.children[3].textContent,
      watched: false,
    };
    if (isOverVideoSaveMaxCount(this.videoData)) {
      throw new Error(ERROR_MESSAGE.MAX_VIDEO_SAVE);
    }
    if (this.findVideoById(videoInfo.id)) {
      throw new Error('이미 저장한 동영상입니다');
    }
    this.videoData.push(videoInfo);
    setData('id', this.videoData);
  }
}
