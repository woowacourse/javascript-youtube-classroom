import { $, $$ } from '../util';
import SearchModalView from './SearchModalView';
import { template } from './template';

export default class HomeView {
  constructor(searchVideoManager, saveVideoManager) {
    this.saveVideoManager = saveVideoManager;
    this.modalView = new SearchModalView(searchVideoManager, this.saveVideoManager);

    this.bindEvents();
    this.initializeHomepage();
  }

  bindEvents() {
    $('#search-modal-button').addEventListener('click', this.openModal.bind(this));
    $('#will-watch-button').addEventListener('click', this.openWillWatchPage.bind(this));
    $('#watched-button').addEventListener('click', this.openWatchedPage.bind(this));
    $('#search-modal').addEventListener('saveVideo', this.render.bind(this));
  }

  openModal() {
    $('#modal-container').classList.remove('hide');
  }

  initializeHomepage() {
    const savedVideo = this.saveVideoManager.getVideoData();

    savedVideo.forEach((video) => {
      if (!video.watched) {
        $('#will-watch-video-list').insertAdjacentHTML('afterbegin', template.watchVideoListItem(video));
      } else {
        $('#watched-video-list').insertAdjacentHTML('afterbegin', template.watchVideoListItem(video));
      }
    });

    if ($('#will-watch-video-list').children.length === 0) {
      this.showNoWillWatchVideo();
    }

    $$('.watch-delete-button').forEach((element) => {
      element.addEventListener('click', (e) => {
        const { action } = e.target.dataset;
        if (action) {
          this[action](e);
        }
      });
    });
  }

  openWillWatchPage() {
    $('#will-watch-button').classList.add('selected');
    $('#watched-button').classList.remove('selected');

    $('#watched-video-list').classList.add('hide');
    $('.no-watched-video__image').classList.add('hide');
    if ($('#will-watch-video-list').children.length === 0) {
      $('.no-saved-video__image').classList.remove('hide');
      return;
    }
    $('#will-watch-video-list').classList.remove('hide');
  }

  openWatchedPage() {
    $('#will-watch-button').classList.remove('selected');
    $('#watched-button').classList.add('selected');
    $('#will-watch-video-list').classList.add('hide');

    $('.no-saved-video__image').classList.add('hide');
    if ($('#watched-video-list').children.length === 0) {
      this.showNoWatchedVideo();
      return;
    }
    $('#watched-video-list').classList.remove('hide');
  }

  render(e) {
    this.modalView.onClickVideoSaveButton(e);
    const savedVideo = this.saveVideoManager.getVideoData();
    if (savedVideo.length !== $('#will-watch-video-list').children.length) {
      if ($('#will-watch-video-list').children.length === 0) {
        $('.no-saved-video__image').classList.add('hide');
        $('#will-watch-video-list').classList.remove('hide');
      }
      $('#will-watch-video-list').insertAdjacentHTML(
        'afterbegin',
        template.watchVideoListItem(savedVideo[savedVideo.length - 1])
      );
      $('#will-watch-video-list').firstElementChild.lastElementChild.addEventListener('click', (e) => {
        const { action } = e.target.dataset;
        if (action) {
          this[action](e);
        }
      });
    }
  }

  changeWatchState(e) {
    const parent = e.target.parentNode.parentNode;
    e.target.classList.add('selected');
    this.saveVideoManager.changeWatchState(parent.dataset.videoId);
    $('#watched-video-list').insertAdjacentElement('afterbegin', parent);
  }

  deleteVideo(e) {
    const target = e.target.parentNode.parentNode;
    $('#confirm-container').classList.remove('hide');
    $('.confirm-dimmer').addEventListener('click', this.closeConfirmModal());
    $('#yes-button').addEventListener('click', this.onClickYesButton(target));
    $('#no-button').addEventListener('click', this.closeConfirmModal());
  }

  onClickYesButton(target) {
    this.saveVideoManager.removeVideo(target.dataset.videoId);
    target.remove();
    if ($('#will-watch-video-list').children.length === 0 && !$('#will-watch-video-list').classList.contains('hide')) {
      this.showNoWillWatchVideo();
    }
    if ($('#watched-video-list').children.length === 0 && !$('#watched-video-list').classList.contains('hide')) {
      this.showNoWatchedVideo();
    }
    $('#confirm-container').classList.add('hide');
  }

  closeConfirmModal() {
    $('#confirm-container').classList.add('hide');
  }

  showNoWillWatchVideo() {
    $('.no-saved-video__image').classList.remove('hide');
    $('#will-watch-video-list').classList.add('hide');
  }

  showNoWatchedVideo() {
    $('.no-watched-video__image').classList.remove('hide');
    $('#watched-video-list').classList.add('hide');
  }
}
