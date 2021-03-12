import WatchController from "./WatchController.js";

import elements from "../../utils/elements.js";
import { showSnackbar } from "../../utils/snackbar.js";
import { ERROR_MESSAGE } from "../../utils/constants.js";

import videos from "../../state/videos.js";
export default class WatchEventController {
  constructor() {
    this.watchController = new WatchController();
  }

  bindEvents() {
    window.addEventListener("load", this.onLoadApp.bind(this));

    this.bindNavEvents();
    this.bindSaveVideoEvents();
    this.bindClipButtonEvents();
  }

  bindNavEvents() {
    elements.$watchLaterViewButton.addEventListener(
      "click",
      this.onClickWatchLaterViewButton.bind(this)
    );
    elements.$watchedViewButton.addEventListener(
      "click",
      this.onClickWatchedViewButton.bind(this)
    );
  }

  bindSaveVideoEvents() {
    elements.$searchResults.addEventListener(
      "click",
      this.onClickSaveButton.bind(this)
    );
  }

  bindClipButtonEvents() {
    elements.$watchLaterVideos.addEventListener("click", (e) => {
      this.onClickWatchedButton(e);
      this.onClickLikedButton(e);
      this.onClickDeleteButton(e, false);
    });
    elements.$watchedVideos.addEventListener("click", (e) => {
      this.onClickClearWatchLogbutton(e);
      this.onClickLikedButton(e);
      this.onClickDeleteButton(e, true);
    });
  }

  onLoadApp() {
    videos.initSavedVideos();
    this.watchController.updateWatchLaterView(videos.getSavedVideos());
  }

  onClickWatchLaterViewButton() {
    this.watchController.updateWatchLaterView(videos.getSavedVideos());
  }

  onClickWatchedViewButton() {
    this.watchController.updateWatchedView(videos.getSavedVideos());
  }

  onClickSaveButton(e) {
    if (!e.target.dataset.videoId) {
      return;
    }

    this.watchController.updateWatchLaterView(videos.getSavedVideos());
  }

  onClickWatchedButton(e) {
    const videoId = e.target.dataset.watchedButton;
    if (!videoId) {
      return;
    }

    this.watchController.watchVideo(videoId);
    this.watchController.updateWatchLaterView(videos.getSavedVideos());
  }

  onClickClearWatchLogbutton(e) {
    const videoId = e.target.dataset.watchedButton;
    if (!videoId) {
      return;
    }

    this.watchController.clearWatchedViedoLog(videoId);
    this.watchController.updateWatchedView(videos.getSavedVideos());
  }

  onClickLikedButton(e) {
    if (!e.target.dataset.likedButton) {
      return;
    }

    showSnackbar(ERROR_MESSAGE.NOT_IMPLEMENTED);
  }

  onClickDeleteButton(e, isWatched) {
    const videoId = e.target.dataset.deleteButton;
    if (!videoId) {
      return;
    }

    this.watchController.deleteVideo(videoId);
    if (isWatched) {
      this.watchController.updateWatchedView(videos.getSavedVideos());
    } else {
      this.watchController.updateWatchLaterView(videos.getSavedVideos());
    }
  }
}
