import { ERROR_MESSAGE, SAVE_KEY } from '../constants';
import { isOverVideoSaveMaxCount } from '../validation';
import { getVideoInfo } from '../util';

export const setData = (key, data) => localStorage.setItem(key, JSON.stringify(data));
const getData = (key) => JSON.parse(localStorage.getItem(key));

export class SaveVideoManager {
  constructor() {
    this.videoData = this.getVideoData();
  }

  getVideoData() {
    return getData(SAVE_KEY) || [];
  }

  findVideoById(id) {
    return this.videoData.some((video) => video.id === id);
  }

  saveVideo(video) {
    const videoInfo = getVideoInfo(video);
    if (isOverVideoSaveMaxCount(this.videoData)) {
      throw new Error(ERROR_MESSAGE.MAX_VIDEO_SAVE);
    }
    if (this.findVideoById(videoInfo.id)) {
      throw new Error(ERROR_MESSAGE.ALREADY_SAVE);
    }
    this.videoData.push(videoInfo);
    setData(SAVE_KEY, this.videoData);
  }

  changeWatchState(id) {
    this.videoData = this.videoData.map((video) => {
      if (video.id === id) {
        const changedVideo = video;
        changedVideo.watched = !changedVideo.watched;
        return changedVideo;
      }
      return video;
    });
    setData(SAVE_KEY, this.videoData);
  }

  removeVideo(id) {
    this.videoData = this.videoData.filter((video) => video.id !== id);
    setData(SAVE_KEY, this.videoData);
  }
}
