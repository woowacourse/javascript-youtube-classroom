import WatchView from "./WatchView.js";

import { showSnackbar } from "../../utils/snackbar.js";
import {
  CONFIRM_MESSAGE,
  ERROR_MESSAGE,
  SUCCESS_MESSAGE,
  VIDEO_VIEW_NAME,
} from "../../utils/constants.js";

import videos from "../../state/videos.js";
import videoViewIndex from "../../state/videoViewIndex.js";

export default class WatchController {
  constructor() {
    this.watchView = new WatchView();
  }

  updateCurrentView() {
    const currentViewName = videoViewIndex.getCurrentViewName();

    switch (currentViewName) {
      case VIDEO_VIEW_NAME.WATCH_LATER:
        this.updateWatchLaterView();
        break;
      case VIDEO_VIEW_NAME.WATCHED:
        this.updateWatchedView();
        break;
      case VIDEO_VIEW_NAME.LIKED:
        this.updateLikedView();
        break;
    }
  }

  updateWatchLaterView() {
    const watchLaterVideos = videos
      .getSavedVideos()
      .filter((video) => !video.watched);

    this.watchView.markWatchLaterViewButton();

    if (watchLaterVideos.length === 0) {
      this.watchView.showNotSavedImg();
    } else {
      this.watchView.showWatchLaterVideos(watchLaterVideos);
    }
  }

  updateWatchedView() {
    const watchedVideos = videos
      .getSavedVideos()
      .filter((video) => video.watched);

    this.watchView.markWatchedViewButton();

    if (watchedVideos.length === 0) {
      this.watchView.showNotWatchedImg();
    } else {
      this.watchView.showWatchedVideos(watchedVideos);
    }
  }

  updateLikedView() {
    const likedVideos = videos.getSavedVideos().filter((video) => video.liked);

    this.watchView.markLikedViewButton();

    if (likedVideos.length === 0) {
      this.watchView.showNoLikedImg();
    } else {
      this.watchView.showLikedVideos(likedVideos);
    }
  }

  watchVideo(videoId) {
    const succeed = videos.setVideoWatched(videoId, true);

    succeed
      ? showSnackbar(SUCCESS_MESSAGE.WATCH_VIDEO)
      : showSnackbar(ERROR_MESSAGE.INVALID_ACTION_ERROR);
  }

  clearWatchedViedoLog(videoId) {
    const succeed = videos.setVideoWatched(videoId, false);

    succeed
      ? showSnackbar(SUCCESS_MESSAGE.CLEAR_WATCH_VIDEO_LOG)
      : showSnackbar(ERROR_MESSAGE.INVALID_ACTION_ERROR);
  }

  toggleLike(videoId) {
    const liked = videos
      .getSavedVideos()
      .some((video) => video.videoId === videoId && video.liked);
    const succeed = videos.setVideoLiked(videoId, !liked);

    succeed
      ? showSnackbar(
          liked ? SUCCESS_MESSAGE.DISLIKE_VIDEO : SUCCESS_MESSAGE.LIKE_VIDEO
        )
      : showSnackbar(ERROR_MESSAGE.LIKE_ERROR);
  }

  deleteVideo(videoId) {
    if (window.confirm(CONFIRM_MESSAGE.DELETE)) {
      videos.removeSavedVideo(videoId);
    }
  }
}
