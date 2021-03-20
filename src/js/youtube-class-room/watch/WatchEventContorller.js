import WatchController from "./WatchController.js";

import elements from "../../utils/elements.js";
import { DOM_CONSTANTS } from "../../utils/constants.js";

import videos from "../../state/videos.js";

export default class WatchEventController {
  constructor() {
    this.watchController = new WatchController();
    this.pageIndex = 0;
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

    elements.$minimalNavInner.addEventListener(
      "click",
      this.onClickMinNavInner.bind(this)
    );
  }

  bindSaveVideoEvents() {
    elements.$searchResults.addEventListener(
      "click",
      this.onClickSaveButton.bind(this)
    );
  }

  bindClipButtonEvents() {
    elements.$savedVidoes.addEventListener(
      "click",
      this.onClipButtonEvents.bind(this)
    );
  }

  onLoadApp() {
    videos.initSavedVideos();
    this.watchController.updateWatchLaterView();
  }

  onClipButtonEvents(e) {
    const buttonType = e.target.dataset.buttonType;
    const videoId = e.target.dataset.videoId;

    if (!buttonType) {
      return;
    }

    switch (buttonType) {
      case DOM_CONSTANTS.DATASET.BUTTON_TYPE.WATCHED:
        this.watchController.toggleWatched(videoId);
        break;
      case DOM_CONSTANTS.DATASET.BUTTON_TYPE.LIKED:
        this.watchController.toggleLiked(videoId);
        break;
      case DOM_CONSTANTS.DATASET.BUTTON_TYPE.DELETE:
        this.watchController.deleteVideo(videoId);
        break;
    }

    this.watchController.updateCurrentView();
  }

  onClickWatchLaterViewButton() {
    this.pageIndex = 0;
    this.watchController.updateWatchLaterView();
  }

  onClickWatchedViewButton() {
    this.pageIndex = 1;
    this.watchController.updateWatchedView();
  }

  onClickLikedViewButton() {
    this.pageIndex = 3;
    this.watchController.updateLikedView();
  }

  onClickMinNavInner() {
    this.pageIndex = (this.pageIndex + 1) % 3;

    switch (this.pageIndex) {
      case 0:
        this.watchController.updateWatchLaterView();
        break;
      case 1:
        this.watchController.updateWatchedView();
        break;
      case 2:
        this.watchController.updateLikedView();
    }
  }

  onClickSaveButton(e) {
    if (!e.target.dataset.videoId) {
      return;
    }

    this.watchController.updateWatchLaterView();
  }
}
