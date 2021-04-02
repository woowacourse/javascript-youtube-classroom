import WatchController from './WatchController.js';
import WatchView from './WatchView.js';

import elements from '../../utils/elements.js';

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
      if (e.target.tagName !== 'BUTTON') return;

      this.onClickWatchLaterViewClipButton(e.target);
    });
    elements.$watchedVideos.addEventListener('click', (e) => {
      if (e.target.tagName !== 'BUTTON') return;

      this.onClickWatchedViewClipButton(e.target);
    });
    elements.$likedVideos.addEventListener('click', (e) => {
      if (e.target.tagName !== 'BUTTON') return;

      this.onClickLikedViewClipButton(e.target);
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

  onClickWatchLaterViewClipButton(button) {
    if (button.dataset.watchedButton) {
      this.watchController.toggleWatchedButton(button);
      this.watchController.showWatchLaterView();
    }

    if (button.dataset.likedButton) {
      this.watchController.toggleLikedButton(button);
    }

    if (button.dataset.deleteButton) {
      this.watchController.deleteVideo(button.dataset.deleteButton);
      this.watchController.showWatchLaterView();
    }
  }

  onClickWatchedViewClipButton(button) {
    if (button.dataset.watchedButton) {
      this.watchController.toggleWatchedButton(button);
      this.watchController.showWatchedView();
    }

    if (button.dataset.likedButton) {
      this.watchController.toggleLikedButton(button);
    }

    if (button.dataset.deleteButton) {
      this.watchController.deleteVideo(button.dataset.deleteButton);
      this.watchController.showWatchedView();
    }
  }

  onClickLikedViewClipButton(button) {
    if (button.dataset.watchedButton) {
      this.watchController.toggleWatchedButton(button);
    }

    if (button.dataset.likedButton) {
      this.watchController.toggleLikedButton(button);
      this.watchController.showLikedVideos();
    }

    if (button.dataset.deleteButton) {
      this.watchController.deleteVideo(button.dataset.deleteButton);
      this.watchController.showLikedVideos();
    }
  }
}
