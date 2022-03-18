import { $, $$, hideElement, showElement, showSnackbar } from '../dom';
import SearchModalView from './SearchModalView';
import { template } from './template';
import { ALERT_MESSAGE } from '../constants';

export default class HomeView {
  constructor(searchVideoManager, saveVideoManager) {
    this.saveVideoManager = saveVideoManager;
    this.modalView = new SearchModalView(searchVideoManager, this.saveVideoManager);

    this.tab = 'willWatch';
    this.willWatchVideoList = $('#will-watch-video-list');
    this.watchedVideoList = $('#watched-video-list');

    this.bindEvents();
    this.initializeHomepage();
  }

  bindEvents() {
    $('#search-modal-button').addEventListener('click', this.openModal.bind(this));
    $('#will-watch-button').addEventListener('click', this.openWillWatchPage.bind(this));
    $('#watched-button').addEventListener('click', this.openWatchedPage.bind(this));
    $('#search-modal').addEventListener('saveVideo', this.saveVideo.bind(this));
    window.addEventListener('offline', () => {
      showSnackbar(ALERT_MESSAGE.OFFLINE);
    });
  }

  openModal() {
    showElement($('#modal-container'));
  }

  initializeHomepage() {
    const savedVideo = this.saveVideoManager.getVideoData();

    savedVideo.forEach((video) => {
      if (!video.watched) {
        this.addWillWatchVideo(video);
      } else {
        this.addWatchedVideo(video);
      }
    });

    $$('.watch-delete-button').forEach((element) => {
      element.addEventListener('click', (e) => {
        const { action } = e.target.dataset;
        if (action) {
          this[action](e);
        }
      });
    });
    this.openWillWatchPage();
  }

  openWillWatchPage() {
    this.tab = 'willWatch';
    $('#will-watch-button').classList.add('selected', 'block-toggle');
    $('#watched-button').classList.remove('selected', 'block-toggle');

    this.watchedVideoList.classList.add('hide');
    $('.no-watched-video__image').classList.add('hide');
    if ($('#will-watch-video-list').children.length === 0) {
      this.emptyWillWatchVideo();
      return;
    }
    this.showWillWatchVideo();
  }

  openWatchedPage() {
    this.tab = 'watched';
    $('#will-watch-button').classList.remove('selected', 'block-toggle');
    $('#watched-button').classList.add('selected', 'block-toggle');

    hideElement(this.willWatchVideoList);
    hideElement($('.no-saved-video__image'));
    if (this.watchedVideoList.children.length === 0) {
      this.emptyWatchedVideo();
      return;
    }
    showElement(this.watchedVideoList);
  }

  saveVideo(e) {
    const { target } = e.detail;

    try {
      this.saveVideoManager.saveVideo(target.parentNode);
    } catch ({ message }) {
      return alert(message);
    }

    showSnackbar(ALERT_MESSAGE.SAVED);
    const savedVideo = this.saveVideoManager.getVideoData();
    this.addWillWatchVideo(savedVideo[savedVideo.length - 1]);
    this.willWatchVideoList.firstChild.lastElementChild.addEventListener('click', (e) => {
      const { action } = e.target.dataset;
      if (action) {
        this[action](e);
      }
    });
    hideElement(target);
    if (this.tab === 'willWatch') {
      this.showWillWatchVideo();
    }
  }

  changeWatchState(e) {
    const target = e.target.parentNode.parentNode;
    e.target.classList.toggle('selected');
    this.saveVideoManager.changeWatchState(target.dataset.videoId);
    if (this.tab === 'watched') {
      showSnackbar(ALERT_MESSAGE.CHANGED_TO_WILL_WATCH);
      this.willWatchVideoList.insertAdjacentElement('afterbegin', target);
      this.isWatchedVideoEmpty();
    }
    if (this.tab === 'willWatch') {
      showSnackbar(ALERT_MESSAGE.CHANGED_TO_WATCHED);
      this.watchedVideoList.insertAdjacentElement('afterbegin', target);
      this.isWillWatchVideoEmpty();
    }
  }

  deleteVideo(e) {
    const target = e.target.parentNode.parentNode;
    showElement($('#confirm-container'));
    $('.confirm-dimmer').addEventListener('click', this.closeConfirmModal);
    $('#yes-button').addEventListener('click', () => this.onClickYesButton(target));
    $('#no-button').addEventListener('click', this.closeConfirmModal);
  }

  onClickYesButton(target) {
    this.saveVideoManager.removeVideo(target.dataset.videoId);
    this.modalView.addSaveButton(target.dataset.videoId);

    target.remove();

    this.isWatchedVideoEmpty();
    this.isWillWatchVideoEmpty();
    hideElement($('#confirm-container'));
  }

  addWillWatchVideo(video) {
    this.willWatchVideoList.insertAdjacentHTML('afterbegin', template.watchVideoListItem(video));
  }

  addWatchedVideo(video) {
    this.watchedVideoList.insertAdjacentHTML('afterbegin', template.watchVideoListItem(video));
  }

  closeConfirmModal() {
    hideElement($('#confirm-container'));
  }

  showWillWatchVideo() {
    hideElement($('.no-saved-video__image'));
    showElement(this.willWatchVideoList);
  }

  emptyWillWatchVideo() {
    hideElement(this.willWatchVideoList);
    showElement($('.no-saved-video__image'));
  }

  emptyWatchedVideo() {
    hideElement(this.watchedVideoList);
    showElement($('.no-watched-video__image'));
  }

  isWillWatchVideoEmpty() {
    if (this.willWatchVideoList.children.length === 0 && this.tab === 'willWatch') {
      this.emptyWillWatchVideo();
    }
  }

  isWatchedVideoEmpty() {
    if (this.watchedVideoList.children.length === 0 && this.tab === 'watched') {
      this.emptyWatchedVideo();
    }
  }
}
