import { $, event } from '../util';
import { template } from './template';

export default class HomeView {
  constructor() {
    $('#unwatched-video-list-button').addEventListener('click', this.onClickUnwatchedVideoListButton.bind(this));
    $('#watched-video-list-button').addEventListener('click', this.onClickWatchedVideoListButton.bind(this));
    $('#search-modal-button').addEventListener('click', this.openModal.bind(this));

    $('#unwatched-video-list').addEventListener('click', this.onClickIconButton.bind(this));
    $('#watched-video-list').addEventListener('click', this.onClickIconButton.bind(this));

    event.addListener('updateOnVideoList', this.updateOnVideoList.bind(this));
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

  toggleVideoList() {
    $('#unwatched-video-list').classList.toggle('hide');
    $('#watched-video-list').classList.toggle('hide');
    $('#unwatched-video-list-button').classList.toggle('selected');
    $('#watched-video-list-button').classList.toggle('selected');
  }

  onClickIconButton(e) {
    if (e.target.id === 'check-watched-button') {
      this.onClickCheckWatchedButton(e);
    }
    if (e.target.id === 'delete-button') {
      console.log(e.target.id);
    }
  }

  onClickCheckWatchedButton(e) {
    const { id } = e.target.parentNode.dataset;
    event.dispatch('changeWatchedInfo', { id });
  }

  updateOnVideoList(e) {
    const { unwatchedVideos, watchedVideos } = e.detail;
    const unwatchedVideoListItems = unwatchedVideos.map((video) => template.savedVideoListItem(video)).join('');
    const watchedVideoListItems = watchedVideos.map((video) => template.savedVideoListItem(video)).join('');
    $('#unwatched-video-list').innerHTML = unwatchedVideoListItems;
    $('#watched-video-list').innerHTML = watchedVideoListItems;
  }

  openModal() {
    $('#modal-container').classList.remove('hide');
  }
}
