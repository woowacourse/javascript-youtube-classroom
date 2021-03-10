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
    return this.model.watchingVideoCount > 0 && this.model.watchedVideoCount === 0;
  }

  hasNoWatchingVideoSaved() {
    return this.model.watchingVideoCount === 0;
  }
}
