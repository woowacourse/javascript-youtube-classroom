import Storage from '../Storage';
import { event } from '../util';

export default class SaveVideoManager {
  #videos;

  constructor() {
    event.addListener('saveVideo', this.saveVideo.bind(this));
    event.addListener('changeWatchedInfo', this.changeWatchedInfo.bind(this));
    event.addListener('deleteVideo', this.deleteVideo.bind(this));

    this.updateSavedVideos();
  }

  updateSavedVideos() {
    this.#videos = Storage.getSavedVideos();
    event.dispatch('updateSavedVideoList', { 
      unwatchedVideos: this.#videos.filter((video) => video.watched === false ),
      watchedVideos: this.#videos.filter((video) => video.watched === true ),
    });
  }

  saveVideo(e) {
    const { video, target } = e.detail
    if ( !video ) return;
    try {
      Storage.saveVideo({ ...video, watched: false })
    } catch (err) {
      alert(err.message);
      return;
    }
    this.updateSavedVideos();
    event.dispatch('saveVideoReturn', { target });
  }

  changeWatchedInfo(e) {
    const videoId = e.detail.id;
    const video = Storage.findVideoById(videoId);
    try {
      Storage.updateVideo({ ...video, watched: !video.watched });
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
