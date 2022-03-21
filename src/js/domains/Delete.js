import MyVideoStore from '../stores/MyVideoStore';
import { on } from '../utils';
import { CONFIRM_MESSAGE } from '../constants';

class Delete {
  constructor(videoItem) {
    on({
      selector: '.video-item__delete-button',
      eventName: '@delete',
      handler: (e) => this.deleteVideo(e.detail.videoId),
      component: videoItem,
    });
  }

  deleteVideo(videoId) {
    if (!window.confirm(CONFIRM_MESSAGE.DELETE_VIDEO)) return;

    const videos = MyVideoStore.instance.getVideos();
    const newVideos = videos.filter((video) => videoId !== video.details.id);

    MyVideoStore.instance.dispatch(newVideos);
  }
}

export default Delete;
