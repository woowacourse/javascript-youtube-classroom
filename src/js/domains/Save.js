import SearchVideoStore from '../stores/SearchVideoStore';
import MyVideoStore from '../stores/MyVideoStore';
import { on } from '../utils';
import { ERROR_MESSAGE, VIDEO } from '../constants';

class Save {
  constructor(videoItem) {
    on({
      selector: '.video-item__save-button',
      eventName: '@save',
      handler: (e) => this.saveVideo(e.detail.videoId),
      component: videoItem,
    });
  }

  // eslint-disable-next-line max-lines-per-function
  saveVideo(videoId) {
    const myVideos = MyVideoStore.instance.getVideos();

    try {
      if (myVideos.length >= VIDEO.MAX_SAVABLE_COUNT) {
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
