import { $, event } from '../util';
import { template } from './template';

export default class HomeView {
  constructor() {
    $('#unwatched-video-list-button').addEventListener('click', this.onClickUnwatchedVideoListButton.bind(this));
    $('#watched-video-list-button').addEventListener('click', this.onClickWatchedVideoListButton.bind(this));
    $('#search-modal-button').addEventListener('click', this.openModal.bind(this));
    event.addListener('updateOnUnwatchedVideoList', this.updateOnUnwatchedVideoList.bind(this));
    event.addListener('updateOnWatchedVideoList', this.updateOnUnwatchedVideoList.bind(this));

    this.onClickUnwatchedVideoListButton();
  }

  onClickUnwatchedVideoListButton() {
    console.log('clickUnwatchedVideoListButton');
    event.dispatch('clickUnwatchedVideoListButton');
  }

  onClickWatchedVideoListButton() {
    console.log('clickWatchedVideoListButton');
    event.dispatch('clickWatchedVideoListButton');
  }

  updateOnUnwatchedVideoList(e) {
    const { videos } = e.detail;
    const listItems = videos.map((video) => template.savedVideoListItem(video)).join('');
    $('#unwatched-video-list').innerHTML = listItems;
  }

  updateOnWatchedVideoList(e) {
    const { videos } = e.detail;
    const listItems = videos.map((video) => template.savedVideoListItem(video)).join('');
    $('#watched-video-list').innerHTML = listItems;
  }

  openModal() {
    $('#modal-container').classList.remove('hide');
  }
}
