import { $, hideElement, showElement, showSnackbar } from '../dom';
import SearchModalView from './SearchModalView';
import { template } from './template';
import { ALERT_MESSAGE } from '../constants';

export default class HomeView {
  constructor(searchVideoManager, saveVideoManager) {
    this.saveVideoManager = saveVideoManager;
    this.modalView = new SearchModalView(searchVideoManager, this.saveVideoManager);

    this.tab = 'will-watch';
    this.willWatchVideoList = $('#will-watch-video-list');
    this.watchedVideoList = $('#watched-video-list');

    this.bindEvents();
    this.sortSavedVideo();
  }

  bindEvents() {
    $('#search-modal-button').addEventListener('click', this.openModal);
    $('.button-group').addEventListener('click', this.changePageTo.bind(this));
    $('#search-modal').addEventListener('saveVideo', this.saveVideo.bind(this));
    this.willWatchVideoList.addEventListener('click', this.watchDeleteButtonHandler.bind(this));
    this.watchedVideoList.addEventListener('click', this.watchDeleteButtonHandler.bind(this));
    window.addEventListener('offline', () => {
      showSnackbar(ALERT_MESSAGE.OFFLINE);
    });
  }

  openModal() {
    showElement($('#modal-container'));
  }

  watchDeleteButtonHandler(e) {
    if (e.target.tagName === 'BUTTON') {
      const { action } = e.target.dataset;
      if (action) {
        this[action](e);
      }
    }
  }

  sortSavedVideo() {
    const savedVideo = this.saveVideoManager.getVideoData();

    savedVideo.forEach((video) => {
      if (!video.watched) {
        this.addWillWatchVideo(video);
      } else {
        this.addWatchedVideo(video);
      }
    });

    $(`#${this.tab}`).classList.add('selected', 'block-toggle');
    this.openPage(`${this.tab}-video-list`);
  }

  changePageTo(event) {
    $(`#${this.tab}`).classList.remove('selected', 'block-toggle');
    this.tab = event.target.id;
    $(`#${this.tab}`).classList.add('selected', 'block-toggle');

    const tabListId = event.target.dataset.toggleId;
    this.openPage(tabListId);
  }

  openPage(tabListId) {
    for (const element of $('#main-page').children) {
      hideElement(element);
    }

    if ($(`#${tabListId}`).children.length === 0) {
      const noImageClassName = $(`#${tabListId}`).dataset.noImageClass;
      return showElement($(`.${noImageClassName}`));
    }
    $(`#${tabListId}`).classList.remove('hide');
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
    hideElement(target);
    this.openPage(`${this.tab}-video-list`);
  }

  changeWatchState(e) {
    const target = e.target.closest('.video-item');
    e.target.classList.toggle('selected');
    this.saveVideoManager.changeWatchState(target.dataset.videoId);
    if (this.tab === 'watched') {
      showSnackbar(ALERT_MESSAGE.CHANGED_TO_WILL_WATCH);
      this.willWatchVideoList.insertAdjacentElement('afterbegin', target);
      this.openPage(`${this.tab}-video-list`);
    }
    if (this.tab === 'will-watch') {
      showSnackbar(ALERT_MESSAGE.CHANGED_TO_WATCHED);
      this.watchedVideoList.insertAdjacentElement('afterbegin', target);
      this.openPage(`${this.tab}-video-list`);
    }
  }

  deleteVideo(e) {
    const target = e.target.parentNode.parentNode;
    showElement($('#confirm-container'));
    $('#confirm-dimmer').addEventListener('click', this.closeConfirmModal);
    $('#yes-button').addEventListener('click', () => this.onClickYesButton(target));
    $('#no-button').addEventListener('click', this.closeConfirmModal);
  }

  onClickYesButton(target) {
    this.saveVideoManager.removeVideo(target.dataset.videoId);
    this.modalView.addSaveButton(target.dataset.videoId);

    target.remove();

    this.openPage(`${this.tab}-video-list`);
    hideElement($('#confirm-container'));
  }

  closeConfirmModal() {
    hideElement($('#confirm-container'));
  }

  addWillWatchVideo(video) {
    this.willWatchVideoList.insertAdjacentHTML('afterbegin', template.watchVideoListItem(video));
  }

  addWatchedVideo(video) {
    this.watchedVideoList.insertAdjacentHTML('afterbegin', template.watchVideoListItem(video));
  }
}
