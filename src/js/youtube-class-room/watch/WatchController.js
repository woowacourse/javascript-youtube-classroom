import WatchView from './WatchView.js';

import { CONFIRM_MESSAGE, DOM_CONSTANTS } from '../../utils/constants.js';

import videos from '../../state/videos.js';
export default class WatchController {
  constructor() {
    this.watchView = new WatchView();
  }

  updateWatchLaterView() {
    this.watchView.markWatchLaterViewButton();
    this.showWatchLaterView();
  }

  updateWatchedView() {
    this.watchView.markWatchedViewButton();
    this.showWatchedView();
  }

  updateLikedView() {
    this.watchView.markLikedViewButton();
    this.showLikedVideos();
  }

  showWatchLaterView() {
    const watchLaterVideos = videos
      .getSavedVideos()
      .filter((video) => !video.watched);

    if (watchLaterVideos.length === 0) {
      this.watchView.showNotSavedImg();
    } else {
      this.watchView.showWatchLaterVideos(watchLaterVideos);
    }
  }

  showWatchedView() {
    const watchedVideos = videos
      .getSavedVideos()
      .filter((video) => video.watched);

    if (watchedVideos.length === 0) {
      this.watchView.showNotWatchedImg();
    } else {
      this.watchView.showWatchedVideos(watchedVideos);
    }
  }

  showLikedVideos() {
    const likedVideos = videos.getSavedVideos().filter((video) => video.liked);

    if (likedVideos.length === 0) {
      this.watchView.showNotLikedImg();
    } else {
      this.watchView.showLikedVideos(likedVideos);
    }
  }

  toggleWatchedButton(watchedButton) {
    const videoId = watchedButton.dataset.watchedButton;
    if (!videoId) return;

    const videoClassList = watchedButton.classList;

    if (videoClassList.contains(DOM_CONSTANTS.CLASS_NAME.OPACITY_HOVER)) {
      videos.setVideoWatched(videoId, true);
      videoClassList.remove(DOM_CONSTANTS.CLASS_NAME.OPACITY_HOVER);
    } else {
      videos.setVideoWatched(videoId, false);
      videoClassList.add(DOM_CONSTANTS.CLASS_NAME.OPACITY_HOVER);
    }
  }

  toggleLikedButton(likedButton) {
    const videoId = likedButton.dataset.likedButton;
    if (!videoId) {
      return;
    }

    const videoClassList = likedButton.classList;

    if (videoClassList.contains(DOM_CONSTANTS.CLASS_NAME.OPACITY_HOVER)) {
      this.toggleLikedVideo(videoId, true);
      videoClassList.remove(DOM_CONSTANTS.CLASS_NAME.OPACITY_HOVER);
    } else {
      this.toggleLikedVideo(videoId, false);
      videoClassList.add(DOM_CONSTANTS.CLASS_NAME.OPACITY_HOVER);
    }
  }

  toggleLikedVideo(videoId, isLiked) {
    videos.setVideoLiked(videoId, isLiked);
  }

  deleteVideo(videoId) {
    if (window.confirm(CONFIRM_MESSAGE.DELETE)) {
      videos.removeSavedVideo(videoId);
    }
  }
}
