import { EVENT } from '../constants';
import Storage from '../Storage';
import { addListener, dispatch } from '../util/event';

export default class SaveVideoManager {
  constructor() {
    addListener(EVENT.REQUEST_SAVE_VIDEO, this.saveVideo.bind(this));
    addListener(EVENT.REQUEST_CHANGE_VIDEO_WATCHED_INFO, this.changeWatchedInfo.bind(this));
    addListener(EVENT.REQUEST_DELETE_VIDEO, this.deleteVideo.bind(this));

    this.updateSavedVideos();
  }

  updateSavedVideos() {
    const videos = Storage.getSavedVideos();
    dispatch(EVENT.UPDATE_SAVED_VIDEO_LIST, { 
      unwatchedVideos: videos.filter((video) => video.watched === false ),
      watchedVideos: videos.filter((video) => video.watched === true ),
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
    dispatch(EVENT.RESPONSE_SAVE_VIDEO, { result: 'SUCCESS', target });
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
