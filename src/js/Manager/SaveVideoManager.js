import { ERROR_MESSAGE, MAX_VIDEO_SAVE } from './constants';
import { event } from '../util';

export default class SaveVideoManager {
  #videos;

  constructor(storage) {
    this.storage = storage;
    this.#videos = this.storage.videos;

    event.addListener('saveVideo', this.trySaveVideo.bind(this));
  }

  trySaveVideo(e) {
    const { videoId, target } = e.detail
    if ( !videoId ) return;
    try {
      this.saveVideo(videoId);
    } catch (err) {
      return alert(message);
    }
    event.dispatch('saveVideoSuccess', { target });
  }

  saveVideo(videoId) {
    if (this.#videos.length >= MAX_VIDEO_SAVE) {
      throw new Error(ERROR_MESSAGE.MAX_VIDEO_SAVE);
    }
    this.storage.saveVideo({
      id: videoId,
      watched: false,
    })
    this.#videos = this.storage.videos;
  }
}
