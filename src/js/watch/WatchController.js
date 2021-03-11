import videos from "../state/videos.js";
import { CONFIRM_MESSAGE } from "../utils/constants.js";
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

  updateWatchedView(savedVideos) {
    const watchedVideos = savedVideos.filter((video) => video.watched);

    this.watchView.markWatchedViewButton();

    if (watchedVideos.length === 0) {
      this.watchView.showNotWatchedImg();
    } else {
      this.watchView.showWatchedVideos(watchedVideos);
    }
  }

  watchVideo(videoId) {
    videos.setVideoWatched(videoId, true);
  }

  clearWatchedViedoLog(videoId) {
    videos.setVideoWatched(videoId, false);
  }

  deleteVideo(videoId) {
    if (window.confirm(CONFIRM_MESSAGE.DELETE)) {
      videos.removeSavedVideo(videoId);
    }
  }
}
