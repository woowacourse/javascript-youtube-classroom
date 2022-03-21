import SearchVideoStore from '../stores/SearchVideoStore';
import MyVideoStore from '../stores/MyVideoStore';
import { on } from '../utils';
import { ERROR_MESSAGE } from '../constants';

class Save {
  constructor(videoItem) {
    on({
      selector: '.video-item__save-button',
      eventName: '@save',
      handler: (e) => this.saveVideo(e.detail.videoId),
      component: videoItem,
    });
  }

  saveVideo(videoId) {
    const myVideos = MyVideoStore.instance.getVideos();

    try {
      if (!MyVideoStore.instance.canSaveVideo()) {
        throw new Error(ERROR_MESSAGE.EXCEED_MAX_SAVABLE_COUNT);
      }

      const details = SearchVideoStore.instance.findVideo(videoId);
      const newVideos = [...myVideos, { details, isWatched: false }];

      MyVideoStore.instance.dispatch(newVideos);
    } catch (error) {
      alert(error.message);
    }
  }
}

export default Save;
