import { getListByKey, setListByKey } from '../utils/localStorage.js';
import { DB_KEY } from '../constants.js';

export default class ClassroomModel {
  constructor() {
    this.videos = getListByKey(DB_KEY.VIDEOS);
    this.watchingVideoCount = this.getWatchingVideoCount();
    this.watchedVideoCount = this.getWatchedVideoCount();
  }

  getVideo(videoId) {
    return this.videos.find((video) => video.videoId === videoId);
  }

  getVideoCount() {
    return this.videos.length;
  }

  getWatchingVideoCount() {
    return this.videos.filter((video) => video.isWatching).length;
  }

  getWatchedVideoCount() {
    return this.videos.filter((video) => !video.isWatching).length;
  }

  isOnlyWatchingVideoSaved() {
    return this.watchingVideoCount > 0 && this.watchedVideoCount === 0;
  }

  hasNoWatchingVideoSaved() {
    return this.watchingVideoCount === 0;
  }

  hasNoWatchedVideoSaved() {
    return this.watchedVideoCount === 0;
  }

  saveVideo(targetVideo) {
    targetVideo.isSaved = true;
    targetVideo.isWatching = true;
    this.videos.push(targetVideo);
    this.updateWatchingVideoCount();
    setListByKey(DB_KEY.VIDEOS, this.videos);
  }

  moveVideo(videoId) {
    const target = this.getVideo(videoId);
    target.isWatching = !target.isWatching;
    this.updateWatchingVideoCount();
    this.updateWatchedVideoCount();
    setListByKey(DB_KEY.VIDEOS, this.videos);
  }

  removeVideo(videoId, isWatching) {
    this.videos = this.videos.filter((video) => video.videoId !== videoId);
    isWatching ? this.updateWatchingVideoCount() : this.updateWatchedVideoCount();
    setListByKey(DB_KEY.VIDEOS, this.videos);
  }

  updateWatchingVideoCount() {
    this.watchingVideoCount = this.getWatchingVideoCount();
  }

  updateWatchedVideoCount() {
    this.watchedVideoCount = this.getWatchedVideoCount();
  }
}
