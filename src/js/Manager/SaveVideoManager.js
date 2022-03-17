import { event } from '../util';

export default class SaveVideoManager {
  #videos;

  constructor(storage) {
    this.storage = storage;

    event.addListener('saveVideo', this.saveVideo.bind(this));
    event.addListener('changeWatchedInfo', this.changeWatchedInfo.bind(this));
    event.addListener('deleteVideo', this.deleteVideo.bind(this));

    this.updateSavedVideos();
  }

  get watchedVideos() { return this.#videos.filter((video) => video.watched === true )}

  get unwatchedVideos() { return this.#videos.filter((video) => video.watched === false )}

  updateSavedVideos() {
    this.#videos = this.storage.videos;
    event.dispatch('updateSavedVideoList', { 
      unwatchedVideos: this.unwatchedVideos,
      watchedVideos: this.watchedVideos,
    });
  }

  saveVideo(e) {
    const { video, target } = e.detail
    if ( !video ) return;
    try {
      this.storage.saveVideo({ ...video, watched: false })
    } catch (err) {
      alert(err.message);
      return;
    }
    this.updateSavedVideos();
    event.dispatch('saveVideoReturn', { target });
  }

  changeWatchedInfo(e) {
    const videoId = e.detail.id;
    const video = this.storage.findVideoById(videoId);
    try {
      this.storage.updateVideo({ ...video, watched: !video.watched });
    } catch (err) {
      alert(err.message);
      return;
    }
    this.updateSavedVideos();
  }

  deleteVideo(e) {
    const videoId = e.detail.id;
    try {
      this.storage.deleteVideoById(videoId);
    } catch (err) {
      alert(err.message);
      return;
    }
    this.updateSavedVideos();
  }
}
