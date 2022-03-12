import { ERROR_MESSAGE, MAX_VIDEO_SAVE } from './constants';

export default class SaveVideoManager {
  #videoIds;

  constructor(storage) {
    this.storage = storage;
    this.#videoIds = this.storage.videoIds;
  }

  saveVideoById(id) {
    if (this.#videoIds.length >= MAX_VIDEO_SAVE) {
      throw new Error(ERROR_MESSAGE.MAX_VIDEO_SAVE);
    }
    this.storage.saveVideoById(id);
    this.#videoIds = this.storage.videoIds;
  }
}
