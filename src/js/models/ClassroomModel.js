import { getListByKey, setListByKey, deleteTargetItemByKey } from '../utils/localStorage.js';
import { DB_KEY } from '../constants.js';

export default class ClassroomModel {
  constructor() {
    this.init();
  }

  init() {
    this.videos = getListByKey(DB_KEY.VIDEOS);
    this.videosCount = this.videos.length;
    this.watchingVideoCount = this.videos.filter((video) => video.isWatching).length;
    this.watchedVideoCount = this.videosCount - this.watchingVideoCount;
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

  moveVideo(videoId) {
    const videos = getListByKey(DB_KEY.VIDEOS);
    const target = videos.find((video) => video.videoId === videoId);

    target.isWatching = !target.isWatching;
    this.updateWatchingVideoCount(target.isWatching);
    this.updateWatchedVideoCount(!target.isWatching);
    setListByKey(DB_KEY.VIDEOS, videos);
  }

  updateWatchingVideoCount(isWatching) {
    this.watchingVideoCount += isWatching ? 1 : -1;
  }

  updateWatchedVideoCount(isWatched) {
    this.watchedVideoCount += isWatched ? 1 : -1;
  }

  removeVideo(videoId, isWatching) {
    deleteTargetItemByKey(DB_KEY.VIDEOS, 'videoId', videoId);
    isWatching ? (this.watchingVideoCount -= 1) : (this.watchedVideoCount -= 1);
  }
}
