import MyVideoStore from '../stores/MyVideoStore';
import { on } from '../utils';

class Watch {
  constructor(videoItem) {
    on({
      selector: '.video-item__watch-button',
      eventName: '@watch',
      handler: (e) => this.watchVideo(e.detail.videoId),
      component: videoItem,
    });
  }

  watchVideo(videoId) {
    const videos = MyVideoStore.instance.getVideos();

    videos.forEach((video) => {
      if (video.details.id === videoId) {
        video.isWatched = true;
      }
    });

    MyVideoStore.instance.dispatch(videos);
  }
}

export default Watch;
