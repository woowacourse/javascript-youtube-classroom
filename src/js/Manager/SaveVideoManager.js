import { ERROR_MESSAGE, MAX_VIDEO_SAVE } from './constants';
import { event } from '../util';

export default class SaveVideoManager {
  #videoIds;

  constructor(storage) {
    this.storage = storage;
    this.#videoIds = this.storage.videoIds;

    event.addListener('saveVideo', this.saveVideo.bind(this));
  }

  saveVideo(e) {
    const { videoId, target } = e.detail
    if ( !videoId ) return;
    try {
      this.saveVideoById(videoId);
    } catch (err) {
      return alert(message);
    }
    event.dispatch('saveVideoSuccess', { target });
  }

  saveVideoById(id) {
    if (this.#videoIds.length >= MAX_VIDEO_SAVE) {
      throw new Error(ERROR_MESSAGE.MAX_VIDEO_SAVE);
    }
    this.storage.saveVideoById(id);
    this.#videoIds = this.storage.videoIds;
  }
}
