import { getListByKey } from '../utils/localStorage.js';
import { KEY_VIDEOS_WATCHING, KEY_VIDEOS_WATCHED } from '../constants.js';

export default class ClassroomModel {
  constructor() {
    this.init();
  }

  init() {
    this.watchingVideoCount = getListByKey(KEY_VIDEOS_WATCHING).length;
    this.watchedVideoCount = getListByKey(KEY_VIDEOS_WATCHED).length;
  }

  isOnlyWatchingVideoSaved() {
    return this.watchingVideoCount > 0 && this.watchedVideoCount === 0;
  }

  hasNoWatchingVideoSaved() {
    return this.watchingVideoCount === 0;
  }

  getVideos() {
    this.watchingVideos = getListByKey(KEY_VIDEOS_WATCHING);
    this.watchedVideos = getListByKey(KEY_VIDEOS_WATCHED);

    return {
      watchingVideos: this.watchingVideos,
      watchedVideos: this.watchedVideos,
    };
  }
}
