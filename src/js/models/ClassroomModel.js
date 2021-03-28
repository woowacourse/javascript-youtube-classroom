import { getListByKey, setListByKey } from '../utils/localStorage.js';
import { DB_KEY } from '../constants.js';

export default class ClassroomModel {
  constructor() {
    this.videos = getListByKey(DB_KEY.VIDEOS);
  }

  get watchingVideoCount() {
    return this.videos.filter((video) => video.isWatching).length;
  }

  get watchedVideoCount() {
    return this.videos.filter((video) => !video.isWatching).length;
  }

  get likedVideoCount() {
    return this.videos.filter((video) => video.isLiked).length;
  }

  getTargetVideo(videoId) {
    return this.videos.find((video) => video.videoId === videoId);
  }

  addVideo(video) {
    this.videos.push(video);
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

  hasNoLikedVideoSaved() {
    return this.likedVideoCount === 0;
  }

  toggleWatchingVideo(videoId) {
    const target = this.getTargetVideo(videoId);
    target.isWatching = !target.isWatching;
    setListByKey(DB_KEY.VIDEOS, this.videos);
  }

  toggleLikedVideo(videoId) {
    const target = this.getTargetVideo(videoId);
    target.isLiked = !target.isLiked;
    setListByKey(DB_KEY.VIDEOS, this.videos);
  }

  removeVideo(videoId) {
    this.videos = this.videos.filter((video) => video.videoId !== videoId);
    setListByKey(DB_KEY.VIDEOS, this.videos);
  }
}
