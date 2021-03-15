import WatchController from "./WatchController.js";

import elements from "../../utils/elements.js";
import { showSnackbar } from "../../utils/snackbar.js";
import {
  ERROR_MESSAGE,
  DOM_CONSTANTS,
  VIDEO_VIEW_NAME,
} from "../../utils/constants.js";

import videos from "../../state/videos.js";
import videoViewIndex from "../../state/videoViewIndex.js";

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

    elements.$likedViewButton.addEventListener(
      "click",
      this.onClickLikedViewButton.bind(this)
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
      this.onClipButtonEvents(e, false);
    });

    elements.$watchedVideos.addEventListener("click", (e) => {
      this.onClipButtonEvents(e, true);
    });
  }

  onClipButtonEvents(e, isWatched) {
    const buttonType = e.target.dataset.buttonType;
    const videoId = e.target.dataset.videoId;

    if (!buttonType) {
      return;
    }

    switch (buttonType) {
      case DOM_CONSTANTS.DATASET.BUTTON_TYPE.WATCHED:
        isWatched
          ? this.watchController.clearWatchedViedoLog(videoId)
          : this.watchController.watchVideo(videoId);
        break;
      case DOM_CONSTANTS.DATASET.BUTTON_TYPE.LIKED:
        this.watchController.toggleLike(videoId);
        break;
      case DOM_CONSTANTS.DATASET.BUTTON_TYPE.DELETE:
        this.watchController.deleteVideo(videoId);
        break;
    }

    this.watchController.updateCurrentView();
  }

  onLoadApp() {
    videos.initSavedVideos();
    this.watchController.updateWatchLaterView();
  }

  onClickWatchLaterViewButton() {
    videoViewIndex.setViewName(VIDEO_VIEW_NAME.WATCH_LATER);
    this.watchController.updateWatchLaterView();
  }

  onClickWatchedViewButton() {
    videoViewIndex.setViewName(VIDEO_VIEW_NAME.WATCHED);
    this.watchController.updateWatchedView();
  }

  onClickLikedViewButton() {
    videoViewIndex.setViewName(VIDEO_VIEW_NAME.LIKED);
    this.watchController.updateLikedView();
  }

  onClickSaveButton(e) {
    if (!e.target.dataset.videoId) {
      return;
    }

    this.watchController.updateWatchLaterView();
  }

  onClickLikedButton(e) {
    if (!e.target.dataset.likedButton) {
      return;
    }

    showSnackbar(ERROR_MESSAGE.NOT_IMPLEMENTED);
  }
}
