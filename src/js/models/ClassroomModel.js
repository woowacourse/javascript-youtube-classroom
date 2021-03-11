import { getListByKey, setListByKey } from '../utils/localStorage.js';
import { KEY_VIDEOS } from '../constants.js';

export default class ClassroomModel {
  constructor() {
    this.init();
  }

  init() {
    this.videos = getListByKey(KEY_VIDEOS);
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
    const videos = getListByKey(KEY_VIDEOS);
    const target = videos.find((video) => video.videoId === videoId);

    target.isWatching = !target.isWatching;
    this.updateWatchingVideoCount(target.isWatching);
    this.updateWatchedVideoCount(!target.isWatching);
    setListByKey(KEY_VIDEOS, videos);
  }

  updateWatchingVideoCount(isWatching) {
    this.watchingVideoCount += isWatching ? 1 : -1;
  }

  updateWatchedVideoCount(isWatched) {
    this.watchedVideoCount += isWatched ? 1 : -1;
  }
}
