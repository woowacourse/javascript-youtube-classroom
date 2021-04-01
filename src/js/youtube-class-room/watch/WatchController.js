import WatchView from './WatchView.js';

import { CONFIRM_MESSAGE } from '../../utils/constants.js';

import videos from '../../state/videos.js';
export default class WatchController {
  constructor() {
    this.watchView = new WatchView();
  }

  updateWatchLaterView() {
    this.watchView.markWatchLaterViewButton();
    this.showWatchLaterView();
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

  updateWatchedView() {
    this.watchView.markWatchedViewButton();
    this.showWatchedView();
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

  updateLikedView() {
    this.watchView.markLikedViewButton();
    this.showLikedVideos();
  }

  showLikedVideos() {
    const likedVideos = videos.getSavedVideos().filter((video) => video.liked);

    if (likedVideos.length === 0) {
      this.watchView.showNotLikedImg();
    } else {
      this.watchView.showLikedVideos(likedVideos);
    }
  }

  watchVideo(videoId) {
    videos.setVideoWatched(videoId, true);
  }

  clearWatchedVideoLog(videoId) {
    videos.setVideoWatched(videoId, false);
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
