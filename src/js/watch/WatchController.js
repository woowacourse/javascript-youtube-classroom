import WatchView from "./WatchView.js";

export default class WatchController {
  constructor() {
    this.watchView = new WatchView();
  }

  updateWatchLaterView(savedVideos) {
    const watchLaterVideos = savedVideos.filter((video) => !video.watched);

    this.watchView.markWatchLaterButton();

    if (watchLaterVideos.length === 0) {
      this.watchView.showNotSavedImg();
    } else {
      this.watchView.showWatchLaterVideos(watchLaterVideos);
    }
  }

  updateWatchedView(savedVideos) {
    const watchedVideos = savedVideos.filter((video) => video.watched);

    this.watchView.markWatchedButton();

    if (watchedVideos.length === 0) {
      this.watchView.showNotWatchedImg();
    } else {
      this.watchView.showWatchedVideos(watchedVideos);
    }
  }
}
