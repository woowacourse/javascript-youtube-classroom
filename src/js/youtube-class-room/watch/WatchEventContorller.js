import WatchController from './WatchController.js';
import WatchView from './WatchView.js';

import elements from '../../utils/elements.js';
import { DOM_CONSTANTS } from '../../utils/constants.js';

import videos from '../../state/videos.js';
export default class WatchEventController {
  constructor() {
    this.watchController = new WatchController();
    this.watchView = new WatchView();
  }

  bindEvents() {
    window.addEventListener('load', this.onLoadApp.bind(this));

    this.bindNavEvents();
    this.bindSaveVideoEvents();
    this.bindClipButtonEvents();
  }

  bindNavEvents() {
    elements.$watchLaterViewButton.addEventListener(
      'click',
      this.onClickWatchLaterViewButton.bind(this)
    );
    elements.$watchedViewButton.addEventListener(
      'click',
      this.onClickWatchedViewButton.bind(this)
    );
    elements.$likedViewButton.addEventListener(
      'click',
      this.onClickLikedViewButton.bind(this)
    );
  }

  bindSaveVideoEvents() {
    elements.$searchResults.addEventListener(
      'click',
      this.onClickSaveButton.bind(this)
    );
  }

  bindClipButtonEvents() {
    elements.$watchLaterVideos.addEventListener('click', (e) => {
      this.onClickWatchedButton(e);
      this.onClickLikedButton(e);
      this.onClickDeleteButton(e, false);
    });
    elements.$watchedVideos.addEventListener('click', (e) => {
      this.onClickClearWatchLogButton(e);
      this.onClickLikedButton(e);
      this.onClickDeleteButton(e, true);
    });
    elements.$likedVideos.addEventListener('click', (e) => {
      this.onClickWatchButton(e);
      this.onClickLikeButton(e);
      this.onClickDeleteButton(e);
    });
  }

  onLoadApp() {
    videos.initSavedVideos();
    this.watchController.updateWatchLaterView();
  }

  onClickWatchLaterViewButton() {
    this.watchController.updateWatchLaterView();
  }

  onClickWatchedViewButton() {
    this.watchController.updateWatchedView();
  }

  onClickLikedViewButton() {
    this.watchController.updateLikedView();
  }

  onClickSaveButton(e) {
    if (!e.target.dataset.videoId) {
      return;
    }

    this.watchController.updateWatchLaterView();
  }

  onClickWatchedButton(e) {
    const videoId = e.target.dataset.watchedButton;
    if (!videoId) {
      return;
    }

    this.watchController.watchVideo(videoId);
    this.watchController.updateWatchLaterView();
  }

  onClickClearWatchLogButton(e) {
    const videoId = e.target.dataset.watchedButton;
    if (!videoId) {
      return;
    }

    this.watchController.clearWatchedVideoLog(videoId);
    this.watchController.updateWatchedView();
  }

  onClickLikedButton(e) {
    const videoId = e.target.dataset.likedButton;
    if (!videoId) {
      return;
    }

    const targetClassList = e.target.classList;
    if (targetClassList.contains(DOM_CONSTANTS.CLASS_NAME.OPACITY_HOVER)) {
      this.watchController.toggleLikedVideo(videoId, true);
      targetClassList.remove(DOM_CONSTANTS.CLASS_NAME.OPACITY_HOVER);
    } else {
      this.watchController.toggleLikedVideo(videoId, false);
      targetClassList.add(DOM_CONSTANTS.CLASS_NAME.OPACITY_HOVER);
    }
  }

  onClickDeleteButton(e, isWatched) {
    const videoId = e.target.dataset.deleteButton;
    if (!videoId) {
      return;
    }

    this.watchController.deleteVideo(videoId);
    if (isWatched) {
      this.watchController.updateWatchedView();
    } else if (isWatched) {
      this.watchController.updateWatchLaterView();
    }
  }

  onClickLikeButton(e) {
    const videoId = e.target.dataset.likedButton;
    if (!videoId) {
      return;
    }

    const targetClassList = e.target.classList;
    if (targetClassList.contains(DOM_CONSTANTS.CLASS_NAME.OPACITY_HOVER)) {
      this.watchController.toggleLikedVideo(videoId, true);
    } else {
      this.watchController.toggleLikedVideo(videoId, false);
    }

    this.watchController.showLikedVideos();
  }

  onClickWatchButton(e) {
    const videoId = e.target.dataset.watchedButton;
    if (!videoId) {
      return;
    }

    const targetClassList = e.target.classList;
    if (targetClassList.contains(DOM_CONSTANTS.CLASS_NAME.OPACITY_HOVER)) {
      this.watchController.watchVideo(videoId);
      targetClassList.remove(DOM_CONSTANTS.CLASS_NAME.OPACITY_HOVER);
    } else {
      this.watchController.clearWatchedVideoLog(videoId);
      targetClassList.add(DOM_CONSTANTS.CLASS_NAME.OPACITY_HOVER);
    }
  }
}
