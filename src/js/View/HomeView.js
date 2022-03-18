import { $ } from '../util';
import SavedVideoListView from './SavedVideoListView';

export default class HomeView {
  constructor() {
    this.savedVideoListView = new SavedVideoListView();

    $('#unwatched-video-list-button').addEventListener('click', this.onClickUnwatchedVideoListButton.bind(this));
    $('#watched-video-list-button').addEventListener('click', this.onClickWatchedVideoListButton.bind(this));
    $('#search-modal-button').addEventListener('click', this.openModal.bind(this));
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

  openModal() {
    $('#modal-container').classList.remove('hide');
  }
}
