import { EVENT } from '../constants';
import Storage from '../Storage';
import { $ } from '../util';
import { addListener, dispatch } from '../util/event';

export default class SaveVideoManager {
  constructor() {
    this.updateSavedVideos();
  }

  updateSavedVideos() {
    const videos = Storage.getSavedVideos();
    dispatch(EVENT.UPDATE_SAVED_VIDEO_LIST, {
      unwatchedVideos: videos.filter((video) => video.watched === false ),
      watchedVideos: videos.filter((video) => video.watched === true ),
    }, $('#app'));
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
    dispatch(EVENT.RESPONSE_SAVE_VIDEO, { result: 'SUCCESS', target }, $('#modal-container'));
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
      Storage.deleteVideoById(videoId);
    } catch (err) {
      alert(err.message);
      return;
    }
    this.updateSavedVideos();
  }
}
