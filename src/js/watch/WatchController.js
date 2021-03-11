import videos from "../state/videos.js";
import WatchView from "./WatchView.js";

export default class WatchController {
  constructor() {
    this.watchView = new WatchView();
  }

  updateWatchLaterView(savedVideos) {
    const watchLaterVideos = savedVideos.filter((video) => !video.watched);

    this.watchView.markWatchLaterViewButton();

    if (watchLaterVideos.length === 0) {
      this.watchView.showNotSavedImg();
    } else {
      this.watchView.showWatchLaterVideos(watchLaterVideos);
    }
  }

  watchVideo(videoId) {
    videos.setVideoWatched(videoId);
  }

  clearWatchedViedoLog() {}

  updateWatchedView(savedVideos) {
    const watchedVideos = savedVideos.filter((video) => video.watched);

    this.watchView.markWatchedViewButton();

    if (watchedVideos.length === 0) {
      this.watchView.showNotWatchedImg();
    } else {
      this.watchView.showWatchedVideos(watchedVideos);
    }
  }
}
