import { ERROR_MESSAGE, MAX_VIDEO_SAVE } from './constants';
import { event } from '../util';

export default class SaveVideoManager {
  #videos;

  constructor(storage) {
    this.storage = storage;
    this.#videos = this.storage.videos;

    event.addListener('saveVideo', this.trySaveVideo.bind(this));
    event.addListener('clickUnwatchedVideoListButton', () => {
      console.log('updateOnUnwatchedVideoList');
      event.dispatch('updateOnUnwatchedVideoList', { videos: this.unwatchedVideos });
    });
    event.addListener('clickWatchedVideoListButton', () => {
      console.log('updateOnWatchedVideoList');
      event.dispatch('updateOnWatchedVideoList', { videos: this.watchedVideos });
    });
  }

  get watchedVideos() { return this.#videos.filter((video) => video.watched === true )}

  get unwatchedVideos() { return this.#videos.filter((video) => video.watched === false )}

  trySaveVideo(e) {
    const { video, target } = e.detail
    if ( !video ) return;
    try {
      this.saveVideo(video);
    } catch (err) {
      return alert(message);
    }
    event.dispatch('saveVideoSuccess', { target });
  }

  saveVideo(video) {
    if (this.#videos.length >= MAX_VIDEO_SAVE) {
      throw new Error(ERROR_MESSAGE.MAX_VIDEO_SAVE);
    }
    this.storage.saveVideo({
      ...video,
      watched: false,
    })
    this.#videos = this.storage.videos;
  }

  updateVideoToWatched(videoId) {
    const video = this.storage.findVideoById(videoId);
    this.storage.updateVideo({
      ...video,
      watched: true,
    });
    this.#videos = this.storage.videos;
  }

  updateVideoToUnwatched(videoId) {
    const video = this.storage.findVideoById(videoId);
    this.storage.updateVideo({
      ...video,
      watched: false,
    });
    this.#videos = this.storage.videos;
  }
}
