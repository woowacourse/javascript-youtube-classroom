import ArrayStorage from './ArrayStorage.js';
import { ERROR_LOG } from '../constants.js';

export default class VideoStorage extends ArrayStorage {
  #videoKeys = ['videoId', 'title', 'channelTitle', 'publishedAt', 'thumbnail', 'isLiked', 'isChecked'];
  constructor(key) {
    super(key);
  }

  setItem(items) {
    if (!this.isVideoList(items)) {
      throw new Error(ERROR_LOG.NOT_VIDEO);
    }
    super.setItem(items);
  }

  isVideoList(items) {
    return items.every(item => this.isRightVideoFormat(item));
  }

  isRightVideoFormat(item) {
    return Object.keys(item).every(key => this.#videoKeys.includes(key));
  }
}
