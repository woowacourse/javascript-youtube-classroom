import SavedVideo from '../stores/SavedVideo';
import SearchedVideo from '../stores/SearchedVideo';
import { ERROR_MESSAGE } from '../constants';
import { on } from '../utils';

class Save {
  static _instance = null;

  static get instance() {
    if (!Save._instance) {
      Save._instance = new Save();
    }
    return Save._instance;
  }

  subscribe(videoItem) {
    this.subscribeEvents(videoItem);
  }

  subscribeEvents(videoItem) {
    on('.video-item__save-button', '@save', (e) => this.saveVideo(e.detail.videoId), videoItem);
  }

  saveVideo(videoId) {
    try {
      if (!SavedVideo.instance.isStorable()) {
        throw new Error(ERROR_MESSAGE.EXCEED_MAX_SAVABLE_COUNT);
      }

      const videoInfo = SearchedVideo.instance.findVideo(videoId);
      const videos = SavedVideo.instance.getVideos();

      SavedVideo.instance.dispatch('save', [...videos, { ...videoInfo, isWatched: false }]);
    } catch (error) {
      alert(error.message);
    }
  }
}

export default Save;
