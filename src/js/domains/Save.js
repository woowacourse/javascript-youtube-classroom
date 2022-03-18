import SavedVideo from '../stores/SavedVideo';
import SearchedVideo from '../stores/SearchedVideo';
import { VIDEO, ERROR_MESSAGE } from '../constants';
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

  // eslint-disable-next-line max-lines-per-function
  saveVideo(videoId) {
    const videos = SavedVideo.instance.getVideos();

    try {
      if (videos.length >= VIDEO.MAX_SAVABLE_COUNT) {
        throw new Error(ERROR_MESSAGE.EXCEED_MAX_SAVABLE_COUNT);
      }

      const videoInfo = SearchedVideo.instance.findVideo(videoId);

      SavedVideo.instance.dispatch(
        'save',
        JSON.stringify([...videos, { ...videoInfo, isWatched: false }])
      );
    } catch (error) {
      alert(error.message);
    }
  }
}

export default Save;
