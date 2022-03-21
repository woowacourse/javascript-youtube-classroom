import { EVENT, RESULT } from '../constants';
import { $ } from '../util';
import { dispatch } from '../util/event';

export default class SaveVideoManager {
  constructor({ storage }) {
    this.storage = storage;
  }

  updateSavedVideos() {
    const { videos, status } = this.storage;
    const unwatchedVideos = videos.filter((video) => video.watched === false);
    const watchedVideos = videos.filter((video) => video.watched === true);
    dispatch(EVENT.UPDATE_SAVED_VIDEO_LIST, { response: status, unwatchedVideos, watchedVideos }, $('#app'));
  }

  saveVideo(video) {
    if ( !video ) return RESULT.FAIL;
    try {
      this.storage.saveVideo({ ...video, watched: false })
    } catch (err) {
      alert(err.message);
      return RESULT.FAIL;
    }
    this.updateSavedVideos();
    return RESULT.SUCCESS;
  }

  changeWatched(videoId) {
    const video = this.storage.findVideoById(videoId);
    try {
      this.storage.updateVideo({ ...video, watched: !video.watched });
    } catch (err) {
      alert(err.message);
      return RESULT.FAIL;
    }
    this.updateSavedVideos();
    return RESULT.SUCCESS;
  }

  deleteVideo(videoId) {
    try {
      this.storage.deleteVideoById(videoId);
    } catch (err) {
      alert(err.message);
      return RESULT.FAIL;
    }
    this.updateSavedVideos();
    return RESULT.SUCCESS;
  }
}
