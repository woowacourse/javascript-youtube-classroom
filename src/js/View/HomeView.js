import { $, $$ } from '../util';
import SearchModalView from './SearchModalView';
import { template } from './template';

export default class HomeView {
  constructor(searchVideoManager, saveVideoManager) {
    this.saveVideoManager = saveVideoManager;
    this.modalView = new SearchModalView(searchVideoManager, this.saveVideoManager);
    this.tab = 'willWatch';

    this.bindEvents();
    this.initializeHomepage();
  }

  bindEvents() {
    $('#search-modal-button').addEventListener('click', this.openModal.bind(this));
    $('#will-watch-button').addEventListener('click', this.openWillWatchPage.bind(this));
    $('#watched-button').addEventListener('click', this.openWatchedPage.bind(this));
    $('#search-modal').addEventListener('saveVideo', this.addSaveVideo.bind(this));
  }

  openModal() {
    $('#modal-container').classList.remove('hide');
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

    $('#watched-video-list').classList.add('hide');
    $('.no-watched-video__image').classList.add('hide');
    if ($('#will-watch-video-list').children.length === 0) {
      this.showEmptyWillWatchVideo();
      return;
    }
    this.showWillWatchVideo();
  }

  openWatchedPage() {
    this.tab = 'watched';
    $('#will-watch-button').classList.remove('selected', 'block-toggle');
    $('#watched-button').classList.add('selected', 'block-toggle');
    $('#will-watch-video-list').classList.add('hide');

    $('.no-saved-video__image').classList.add('hide');
    if ($('#watched-video-list').children.length === 0) {
      this.showEmptyWatchedVideo();
      return;
    }
    $('#watched-video-list').classList.remove('hide');
  }

  addSaveVideo(e) {
    const { target } = e.detail;
    try {
      this.saveVideoManager.saveVideo(target.parentNode);
    } catch ({ message }) {
      return alert(message);
    }
    const savedVideo = this.saveVideoManager.getVideoData();
    this.addWillWatchVideo(savedVideo[savedVideo.length - 1]);
    $('#will-watch-video-list').firstChild.lastElementChild.addEventListener('click', (e) => {
      const { action } = e.target.dataset;
      if (action) {
        this[action](e);
      }
    });
    this.modalView.onClickVideoSaveButton(e);
    if (this.tab === 'willWatch') {
      this.openWillWatchPage();
    }
  }

  changeWatchState(e) {
    const target = e.target.parentNode.parentNode;
    e.target.classList.toggle('selected');
    this.saveVideoManager.changeWatchState(target.dataset.videoId);
    if (this.tab === 'watched') {
      $('#will-watch-video-list').insertAdjacentElement('afterbegin', target);
      if ($('#watched-video-list').children.length === 0) {
        this.showEmptyWatchedVideo();
      }
    }
    if (this.tab === 'willWatch') {
      $('#watched-video-list').insertAdjacentElement('afterbegin', target);
      if ($('#will-watch-video-list').children.length === 0) {
        this.showEmptyWillWatchVideo();
      }
    }
  }

  deleteVideo(e) {
    const target = e.target.parentNode.parentNode;
    $('#confirm-container').classList.remove('hide');
    $('.confirm-dimmer').addEventListener('click', this.closeConfirmModal);
    $('#yes-button').addEventListener('click', () => this.onClickYesButton(target));
    $('#no-button').addEventListener('click', this.closeConfirmModal);
  }

  onClickYesButton(target) {
    this.saveVideoManager.removeVideo(target.dataset.videoId);
    this.modalView.addSaveButton(target.dataset.videoId);

    target.remove();

    if ($('#will-watch-video-list').children.length === 0 && !$('#will-watch-video-list').classList.contains('hide')) {
      this.showEmptyWillWatchVideo();
    }
    if ($('#watched-video-list').children.length === 0 && !$('#watched-video-list').classList.contains('hide')) {
      this.showEmptyWatchedVideo();
    }
    $('#confirm-container').classList.add('hide');
  }

  addWillWatchVideo(video) {
    $('#will-watch-video-list').insertAdjacentHTML('afterbegin', template.watchVideoListItem(video));
  }

  addWatchedVideo(video) {
    $('#watched-video-list').insertAdjacentHTML('afterbegin', template.watchVideoListItem(video));
  }

  closeConfirmModal() {
    $('#confirm-container').classList.add('hide');
  }

  showWillWatchVideo() {
    $('.no-saved-video__image').classList.add('hide');
    $('#will-watch-video-list').classList.remove('hide');
  }

  showEmptyWillWatchVideo() {
    $('.no-saved-video__image').classList.remove('hide');
    $('#will-watch-video-list').classList.add('hide');
  }

  showEmptyWatchedVideo() {
    $('.no-watched-video__image').classList.remove('hide');
    $('#watched-video-list').classList.add('hide');
  }
}
