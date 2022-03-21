import { $ } from '../util';
import SavedVideoListView from './SavedVideoListView';

export default class HomeView {
  constructor({ saveVideoManager }) {
    this.savedVideoListView = new SavedVideoListView({ saveVideoManager });

    this.bindEvents();
  }

  bindEvents() {
    $('#unwatched-video-list-button').addEventListener('click', this.onClickUnwatchedVideoListButton);
    $('#watched-video-list-button').addEventListener('click', this.onClickWatchedVideoListButton);
    $('#search-modal-button').addEventListener('click', this.openModal);
  }

  onClickUnwatchedVideoListButton = () => {
    if ($('#unwatched-video-list').classList.contains('hide')) {
      this.toggleVideoList();
    }
  }

  onClickWatchedVideoListButton = () => {
    if ($('#watched-video-list').classList.contains('hide')) {
      this.toggleVideoList();
    }
  }
    
  toggleVideoList = () => {
    $('#unwatched-video-list').classList.toggle('hide');
    $('#watched-video-list').classList.toggle('hide');
    $('#unwatched-video-list-button').classList.toggle('selected');
    $('#watched-video-list-button').classList.toggle('selected');
  }

  openModal = () => {
    $('#modal-container').classList.remove('hide');
  }
}
