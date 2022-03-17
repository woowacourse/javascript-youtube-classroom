import { GUIDE_MESSAGE } from '../constants';
import { $, event } from '../util';
import { template } from './template';

export default class HomeView {
  constructor() {
    $('#unwatched-video-list-button').addEventListener('click', this.onClickUnwatchedVideoListButton.bind(this));
    $('#watched-video-list-button').addEventListener('click', this.onClickWatchedVideoListButton.bind(this));
    $('#search-modal-button').addEventListener('click', this.openModal.bind(this));
    $('#unwatched-video-list').addEventListener('click', this.onClickIconButton.bind(this));
    $('#watched-video-list').addEventListener('click', this.onClickIconButton.bind(this));

    event.addListener('updateSavedVideoList', this.updateOnSavedVideoList.bind(this));
  }

  onClickUnwatchedVideoListButton() {
    if ($('#unwatched-video-list').classList.contains('hide')) {
      this.toggleVideoList();
    }
  }

  onClickWatchedVideoListButton() {
    if ($('#watched-video-list').classList.contains('hide')) {
      this.toggleVideoList();
    }
  }

  onClickIconButton(e) {
    if (e.target.id === 'check-watched-button') {
      this.onClickCheckWatchedButton(e);
    }
    if (e.target.id === 'delete-button') {
      this.onClickDeleteButton(e);
    }
  }

  onClickCheckWatchedButton(e) {
    const { id } = e.target.parentNode.dataset;
    event.dispatch('changeWatchedInfo', { id });
  }

  onClickDeleteButton(e) {
    if (window.confirm(GUIDE_MESSAGE.CONFIRM_DELETE)) {
      const { id } = e.target.parentNode.dataset;
      event.dispatch('deleteVideo', { id });
    }
  }

  updateOnSavedVideoList(e) {
    this.updateOnUnwatchedVideoList(e);
    this.updateOnWatchedVideoList(e);
  }

  updateOnUnwatchedVideoList(e) {
    const { unwatchedVideos } = e.detail;
    if (unwatchedVideos.length === 0) {
      $('#unwatched-video-list').innerHTML = template.noUnwatchedVideo;
      return;
    }
    const unwatchedVideoListItems = unwatchedVideos.map((video) => template.savedVideoListItem(video)).join('');
    $('#unwatched-video-list').innerHTML = unwatchedVideoListItems;
  }

  updateOnWatchedVideoList(e) {
    const { watchedVideos } = e.detail;
    if (watchedVideos.length === 0) {
      $('#watched-video-list').innerHTML = template.noWatchedVideo;
      return;
    }
    const watchedVideoListItems = watchedVideos.map((video) => template.savedVideoListItem(video)).join('');
    $('#watched-video-list').innerHTML = watchedVideoListItems;
  }
    
  toggleVideoList() {
    $('#unwatched-video-list').classList.toggle('hide');
    $('#watched-video-list').classList.toggle('hide');
    $('#unwatched-video-list-button').classList.toggle('selected');
    $('#watched-video-list-button').classList.toggle('selected');
  }

  openModal() {
    $('#modal-container').classList.remove('hide');
  }
}
